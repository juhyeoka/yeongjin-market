const menuButton = document.querySelector("#menuButton");
const mobileMenu = document.querySelector("#mobileMenu");
const mobileMenuLinks = document.querySelectorAll("#mobileMenu a");
const headerSearchButton = document.querySelector("#headerSearchButton");
const bottomSearchButton = document.querySelector("#bottomSearchButton");
const brandSearchForm = document.querySelector("#brandSearchForm");
const brandSearchInput = document.querySelector("#brandSearchInput");
const clearSearchButton = document.querySelector("#clearSearchButton");
const resetSearchButton = document.querySelector("#resetSearchButton");
const brandGrid = document.querySelector("#brandGrid");
const categoryFilter = document.querySelector("#categoryFilter");
const resultSummary = document.querySelector("#resultSummary");
const emptyResult = document.querySelector("#emptyResult");
const onboardingSlots = document.querySelector("#onboardingSlots");
const recentBrandButton = document.querySelector("#recentBrandButton");
const toast = document.querySelector("#toast");
const mapCategoryFilter = document.querySelector("#mapCategoryFilter");
const mapRegionPanel = document.querySelector("#mapRegionPanel");
const mapLoading = document.querySelector("#mapLoading");
const brandTicker = document.querySelector("#brandTicker");

const RECENT_BRAND_KEY = "yeongjin-market-recent-brand";
const BRAND_ROTATION_INTERVAL = 10000;
const BRAND_CARD_LAYOUTS = [
  "tall",
  "compact",
  "standard",
  "compact",
  "tall",
  "standard",
  "tall",
  "standard",
  "compact"
];

let randomizedBrands = [];
let activeCategory = "all";
let searchKeyword = "";
let toastTimer = null;
let brandRotationTimer = null;
let brandGridInteractionActive = false;
let brandRotationPauseUntil = 0;
let brandMap = null;
let brandMapGeocoder = null;
let brandMapOverlays = [];
let brandMapResizeObserver = null;
let activeMapCategory = "all";
let mapRenderSequence = 0;
const regionPositionCache = new Map();

function setMenuOpen(open) {
  if (!menuButton || !mobileMenu) {
    return;
  }

  menuButton.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  mobileMenu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
}

menuButton?.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

document.addEventListener("click", (event) => {
  if (
    mobileMenu?.hidden === false &&
    !event.target.closest("#mobileMenu") &&
    !event.target.closest("#menuButton")
  ) {
    setMenuOpen(false);
  }
});

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function randomInteger(maximum) {
  if (maximum <= 0) {
    return 0;
  }

  if (window.crypto?.getRandomValues) {
    const randomValue = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / maximum) * maximum;

    do {
      window.crypto.getRandomValues(randomValue);
    } while (randomValue[0] >= limit);

    return randomValue[0] % maximum;
  }

  return Math.floor(Math.random() * maximum);
}

function shuffled(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInteger(index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function hasSameOrder(first, second) {
  return (
    first.length === second.length &&
    first.every((brand, index) => brand.slug === second[index]?.slug)
  );
}

function shuffledWithNewOrder(items) {
  if (items.length < 2) {
    return [...items];
  }

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const nextOrder = shuffled(items);
    if (!hasSameOrder(items, nextOrder)) {
      return nextOrder;
    }
  }

  return [...items.slice(1), items[0]];
}

function canRotateBrands() {
  return (
    randomizedBrands.length > 1 &&
    activeCategory === "all" &&
    !searchKeyword &&
    !document.hidden &&
    !brandGridInteractionActive &&
    Date.now() >= brandRotationPauseUntil
  );
}

function rotateBrandOrder() {
  if (!brandGrid || !canRotateBrands()) {
    return;
  }

  const applyNewOrder = () => {
    randomizedBrands = shuffledWithNewOrder(randomizedBrands);
    renderBrands();
    renderBrandTicker(randomizedBrands);
    window.requestAnimationFrame(() => {
      brandGrid.classList.remove("is-reordering");
    });
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyNewOrder();
    return;
  }

  brandGrid.classList.add("is-reordering");
  window.setTimeout(applyNewOrder, 240);
}

function startBrandRotation() {
  window.clearInterval(brandRotationTimer);
  brandRotationTimer = window.setInterval(
    rotateBrandOrder,
    BRAND_ROTATION_INTERVAL
  );
}

function normalized(value) {
  return String(value ?? "").trim().toLocaleLowerCase("ko");
}

function searchableText(brand) {
  return normalized(
    [
      brand.name,
      brand.category,
      brand.product,
      brand.region,
      brand.headline,
      brand.description,
      ...(brand.tags || [])
    ].join(" ")
  );
}

function getBrandPageUrl(brand) {
  return `/brands/${encodeURIComponent(brand.slug)}/`;
}

function renderBrandCard(brand, index) {
  const image =
    brand.images?.main || "/assets/brands/brand-placeholder.svg";
  const location = [brand.category, brand.region].filter(Boolean).join(" · ");
  const cardClass = brand.demo ? "brand-card-demo" : "brand-card-real";
  const layoutClass =
    BRAND_CARD_LAYOUTS[index % BRAND_CARD_LAYOUTS.length];

  return `
    <a
      class="brand-card ${cardClass} brand-card-${layoutClass}"
      href="${getBrandPageUrl(brand)}"
      data-brand-slug="${escapeHtml(brand.slug)}"
      data-brand-name="${escapeHtml(brand.name)}"
    >
      <span class="brand-card-media">
        <img
          src="${escapeHtml(image)}"
          alt="${escapeHtml(brand.name)} ${escapeHtml(brand.product)} 대표 이미지"
          ${index < 3 ? 'fetchpriority="high"' : 'loading="lazy"'}
        >
        <i class="brand-card-status">
          ${brand.demo ? "화면 예시" : "입점 브랜드"}
        </i>
      </span>

      <span class="brand-card-body">
        <small>${escapeHtml(location)}</small>
        <strong>${escapeHtml(brand.name)}</strong>
        <p>${escapeHtml(brand.headline)}</p>
        <span class="brand-card-meta">
          <i>${escapeHtml(brand.product)}</i>
          <b>브랜드 보기</b>
        </span>
      </span>
    </a>
  `;
}

function renderBrandTicker(brands) {
  if (!brandTicker || !brands.length) {
    return;
  }

  const renderList = (hidden = false) => `
    <div class="brand-lineup-list"${hidden ? ' aria-hidden="true"' : ""}>
      ${brands
        .map(
          (brand) => `
            <a
              class="${brand.demo ? "" : "real"}"
              href="${getBrandPageUrl(brand)}"
              data-brand-slug="${escapeHtml(brand.slug)}"
              data-brand-name="${escapeHtml(brand.name)}"
            >
              <strong>${escapeHtml(brand.name)}</strong>
              <small>${escapeHtml(brand.product)} · ${escapeHtml(brand.region)}</small>
            </a>
          `
        )
        .join("")}
    </div>
  `;

  brandTicker.innerHTML = renderList() + renderList(true);
}

function renderCategoryButtons(brands) {
  if (!categoryFilter) {
    return;
  }

  const categories = [...new Set(brands.map((brand) => brand.category))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "ko"));

  categoryFilter.innerHTML = [
    '<button class="active" type="button" data-category="all">전체</button>',
    ...categories.map(
      (category) => `
        <button type="button" data-category="${escapeHtml(category)}">
          ${escapeHtml(category)}
        </button>
      `
    )
  ].join("");
}

function getVisibleBrands() {
  return randomizedBrands.filter((brand) => {
    const matchesCategory =
      activeCategory === "all" || brand.category === activeCategory;
    const matchesSearch =
      !searchKeyword || searchableText(brand).includes(searchKeyword);

    return matchesCategory && matchesSearch;
  });
}

function renderBrands() {
  if (!brandGrid) {
    return;
  }

  const brands = getVisibleBrands();

  brandGrid.innerHTML = brands
    .map((brand, index) => renderBrandCard(brand, index))
    .join("");

  brandGrid.hidden = brands.length === 0;
  if (emptyResult) {
    emptyResult.hidden = brands.length !== 0;
  }

  if (resultSummary) {
    const realCount = brands.filter((brand) => !brand.demo).length;
    const demoCount = brands.filter((brand) => brand.demo).length;
    const sampleSuffix = demoCount > 0 ? " · 화면 확인용 샘플 포함" : "";

    if (searchKeyword) {
      resultSummary.textContent = `"${brandSearchInput.value.trim()}" 검색 결과 ${brands.length}개${sampleSuffix}`;
    } else if (activeCategory !== "all") {
      resultSummary.textContent = `${activeCategory} 브랜드 ${brands.length}개${sampleSuffix}`;
    } else {
      resultSummary.textContent =
        `실제 입점 ${realCount}개` +
        (demoCount > 0 ? ` · 화면 확인용 샘플 ${demoCount}개` : "");
    }
  }

  if (onboardingSlots) {
    onboardingSlots.hidden =
      Boolean(searchKeyword) || activeCategory !== "all" || randomizedBrands.length >= 4;
  }
}

function resetFilters() {
  activeCategory = "all";
  searchKeyword = "";

  if (brandSearchInput) {
    brandSearchInput.value = "";
  }
  if (clearSearchButton) {
    clearSearchButton.hidden = true;
  }

  categoryFilter
    ?.querySelectorAll("button")
    .forEach((button) =>
      button.classList.toggle("active", button.dataset.category === "all")
    );

  const url = new URL(window.location.href);
  url.searchParams.delete("search");
  window.history.replaceState({}, "", url);
  renderBrands();
}

function applySearch(value) {
  searchKeyword = normalized(value);
  if (clearSearchButton) {
    clearSearchButton.hidden = !searchKeyword;
  }

  const url = new URL(window.location.href);
  if (value.trim()) {
    url.searchParams.set("search", value.trim());
  } else {
    url.searchParams.delete("search");
  }
  window.history.replaceState({}, "", url);
  renderBrands();
}

categoryFilter?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) {
    return;
  }

  activeCategory = button.dataset.category;
  categoryFilter.querySelectorAll("button").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  renderBrands();
});

brandSearchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  applySearch(brandSearchInput?.value || "");
  document.querySelector("#brands")?.scrollIntoView({ behavior: "smooth" });
});

brandSearchInput?.addEventListener("input", (event) => {
  applySearch(event.currentTarget.value);
});

clearSearchButton?.addEventListener("click", resetFilters);
resetSearchButton?.addEventListener("click", resetFilters);

function focusBrandSearch() {
  setMenuOpen(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(() => brandSearchInput?.focus(), 350);
}

headerSearchButton?.addEventListener("click", focusBrandSearch);
bottomSearchButton?.addEventListener("click", focusBrandSearch);

function saveRecentBrand(link) {
  try {
    localStorage.setItem(
      RECENT_BRAND_KEY,
      JSON.stringify({
        slug: link.dataset.brandSlug,
        name: link.dataset.brandName,
        url: link.getAttribute("href")
      })
    );
  } catch {
    // 저장소를 사용할 수 없는 브라우저에서는 링크 이동만 진행합니다.
  }
}

brandGrid?.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-brand-slug]");
  if (link) {
    saveRecentBrand(link);
  }
});

brandTicker?.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-brand-slug]");
  if (link) {
    saveRecentBrand(link);
  }
});

brandGrid?.addEventListener("mouseenter", () => {
  brandGridInteractionActive = true;
});

brandGrid?.addEventListener("mouseleave", () => {
  brandGridInteractionActive = false;
});

brandGrid?.addEventListener("focusin", () => {
  brandGridInteractionActive = true;
});

brandGrid?.addEventListener("focusout", (event) => {
  if (!brandGrid.contains(event.relatedTarget)) {
    brandGridInteractionActive = false;
  }
});

brandGrid?.addEventListener(
  "touchstart",
  () => {
    brandRotationPauseUntil = Date.now() + BRAND_ROTATION_INTERVAL;
  },
  { passive: true }
);

function showToast(message) {
  if (!toast) {
    return;
  }

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

recentBrandButton?.addEventListener("click", () => {
  try {
    const recentBrand = JSON.parse(localStorage.getItem(RECENT_BRAND_KEY));
    if (recentBrand?.url) {
      window.location.href = recentBrand.url;
      return;
    }
  } catch {
    // 잘못된 저장값은 무시합니다.
  }

  showToast("아직 확인한 브랜드가 없습니다.");
});

const regionSearchQueries = {
  "충남 홍성": "충청남도 홍성군",
  "충남 예산": "충청남도 예산군",
  "전남 나주": "전라남도 나주시",
  "충남 공주": "충청남도 공주시",
  "경북 문경": "경상북도 문경시",
  "제주 제주시": "제주특별자치도 제주시",
  "세종 조치원": "세종특별자치시 조치원읍",
  "충남 천안": "충청남도 천안시",
  "대전 유성": "대전광역시 유성구",
  "충북 청주": "충청북도 청주시",
  "경남 통영": "경상남도 통영시",
  "충북 영동": "충청북도 영동군",
  "전북 고창": "전북특별자치도 고창군"
};

/*
 * 공개 지도에는 업체의 상세 주소가 아니라 시·군·구 중심 위치를 표시합니다.
 * 자주 쓰는 지역은 미리 확인한 좌표를 사용해 지도 로딩과 마커 표시를 안정화하고,
 * 새 지역이 추가된 경우에만 아래의 카카오 주소 검색을 보조 수단으로 사용합니다.
 */
const regionCoordinates = {
  "경남 통영": { lat: 34.8544448243999, lng: 128.43314921138 },
  "경북 문경": { lat: 36.5865273680411, lng: 128.186771917242 },
  "대전 유성": { lat: 36.3622851114387, lng: 127.356257593324 },
  "세종 조치원": { lat: 36.604591645707, lng: 127.298444484667 },
  "전남 나주": { lat: 34.9894649675157, lng: 126.740867401345 },
  "전북 고창": { lat: 35.4356982163474, lng: 126.702120365321 },
  "제주 제주시": { lat: 33.4995342411967, lng: 126.531171087132 },
  "충남 공주": { lat: 36.4465551158221, lng: 127.11905504092 },
  "충남 예산": { lat: 36.6826228017856, lng: 126.848642241312 },
  "충남 천안": { lat: 36.8150678816279, lng: 127.113911972591 },
  "충남 홍성": { lat: 36.6013575607948, lng: 126.66083238915 },
  "충북 영동": { lat: 36.1749928212643, lng: 127.783438619236 },
  "충북 청주": { lat: 36.6424871337285, lng: 127.489020156402 }
};

function showMapMessage(title, description) {
  if (!mapLoading) {
    return;
  }

  mapLoading.innerHTML = `
    <strong>${escapeHtml(title)}</strong>
    <span>${escapeHtml(description)}</span>
  `;
  mapLoading.hidden = false;
}

function hideMapMessage() {
  if (mapLoading) {
    mapLoading.hidden = true;
  }
}

function renderMapCategoryButtons(brands) {
  if (!mapCategoryFilter) {
    return;
  }

  const categories = [...new Set(brands.map((brand) => brand.category))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "ko"));

  mapCategoryFilter.innerHTML = [
    '<button class="active" type="button" data-map-category="all">전체</button>',
    ...categories.map(
      (category) => `
        <button type="button" data-map-category="${escapeHtml(category)}">
          ${escapeHtml(category)}
        </button>
      `
    )
  ].join("");
}

function groupMapBrands(brands) {
  const groups = new Map();

  brands.forEach((brand) => {
    const region = brand.region || "지역 미정";
    if (!groups.has(region)) {
      groups.set(region, { region, brands: [] });
    }
    groups.get(region).brands.push(brand);
  });

  return [...groups.values()];
}

function clearBrandMapOverlays() {
  brandMapOverlays.forEach((overlay) => overlay.setMap(null));
  brandMapOverlays = [];
}

function resolveRegionPosition(region) {
  if (regionPositionCache.has(region)) {
    return Promise.resolve(regionPositionCache.get(region));
  }

  const storedCoordinate = regionCoordinates[region];
  if (storedCoordinate) {
    const position = new kakao.maps.LatLng(
      storedCoordinate.lat,
      storedCoordinate.lng
    );
    regionPositionCache.set(region, position);
    return Promise.resolve(position);
  }

  const query = regionSearchQueries[region] || region;

  return new Promise((resolve) => {
    brandMapGeocoder.addressSearch(query, (result, status) => {
      if (
        status === kakao.maps.services.Status.OK &&
        Array.isArray(result) &&
        result[0]
      ) {
        const position = new kakao.maps.LatLng(
          Number(result[0].y),
          Number(result[0].x)
        );
        regionPositionCache.set(region, position);
        resolve(position);
        return;
      }

      resolve(null);
    });
  });
}

function renderMapRegionPanel(group) {
  if (!mapRegionPanel) {
    return;
  }

  const cards = group.brands
    .map(
      (brand) => `
        <a class="map-region-brand" href="${getBrandPageUrl(brand)}">
          <img
            src="${escapeHtml(brand.images?.main || "/assets/brands/brand-placeholder.svg")}"
            alt=""
            loading="lazy"
          >
          <span>
            <small>${brand.demo ? "샘플 · " : ""}${escapeHtml(brand.category)}</small>
            <strong>${escapeHtml(brand.name)}</strong>
            <i>${escapeHtml(brand.product)}</i>
          </span>
          <b aria-hidden="true">→</b>
        </a>
      `
    )
    .join("");

  mapRegionPanel.innerHTML = `
    <p class="section-kicker">REGION BRANDS</p>
    <h3>${escapeHtml(group.region)}</h3>
    <span>${group.brands.length}개 브랜드 · 지역 중심 위치</span>
    <div class="map-region-brand-list">${cards}</div>
  `;
}

function createRegionOverlay(group, position) {
  const markerButton = document.createElement("button");
  markerButton.type = "button";
  markerButton.className = "brand-region-marker";
  markerButton.setAttribute(
    "aria-label",
    `${group.region} 브랜드 ${group.brands.length}개 보기`
  );
  markerButton.innerHTML = `
    <span>${escapeHtml(group.region)}</span>
    <strong>${group.brands.length}</strong>
  `;

  markerButton.addEventListener("click", () => {
    brandMap.panTo(position);
    brandMap.setLevel(7);
    renderMapRegionPanel(group);
  });

  const overlay = new kakao.maps.CustomOverlay({
    map: brandMap,
    position,
    content: markerButton,
    yAnchor: 1.15,
    zIndex: 5
  });

  brandMapOverlays.push(overlay);
}

async function renderBrandMapMarkers() {
  if (!brandMap || !brandMapGeocoder) {
    return;
  }

  const renderSequence = ++mapRenderSequence;
  clearBrandMapOverlays();

  const mapBrands =
    activeMapCategory === "all"
      ? randomizedBrands
      : randomizedBrands.filter(
          (brand) => brand.category === activeMapCategory
        );
  const groups = groupMapBrands(mapBrands);

  showMapMessage(
    "브랜드 지역을 표시하고 있습니다.",
    "등록된 지역의 중심 위치를 확인하는 중입니다."
  );

  const positionedGroups = await Promise.all(
    groups.map(async (group) => ({
      group,
      position: await resolveRegionPosition(group.region)
    }))
  );

  if (renderSequence !== mapRenderSequence) {
    return;
  }

  const validGroups = positionedGroups.filter((item) => item.position);
  if (!validGroups.length) {
    showMapMessage(
      "표시할 지역을 찾지 못했습니다.",
      "다른 카테고리를 선택해 주세요."
    );
    return;
  }

  const bounds = new kakao.maps.LatLngBounds();
  validGroups.forEach(({ group, position }) => {
    createRegionOverlay(group, position);
    bounds.extend(position);
  });

  brandMap.setBounds(bounds);
  hideMapMessage();
}

function initializeBrandMap() {
  const mapContainer = document.querySelector("#brandMap");
  if (!mapContainer || brandMap) {
    return;
  }

  brandMap = new kakao.maps.Map(mapContainer, {
    center: new kakao.maps.LatLng(36.35, 127.75),
    level: 12
  });
  brandMapGeocoder = new kakao.maps.services.Geocoder();

  if ("ResizeObserver" in window) {
    brandMapResizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        if (!brandMap) {
          return;
        }
        const currentCenter = brandMap.getCenter();
        const currentLevel = brandMap.getLevel();
        brandMap.relayout();
        brandMap.setCenter(currentCenter);
        brandMap.setLevel(currentLevel);
      });
    });
    brandMapResizeObserver.observe(mapContainer);
  }

  renderBrandMapMarkers();
}

function loadKakaoMapSdk() {
  const key = String(window.KAKAO_JAVASCRIPT_KEY || "").trim();
  if (!key) {
    showMapMessage(
      "카카오맵 설정을 확인해 주세요.",
      "지도 JavaScript 키가 설정되지 않았습니다."
    );
    return;
  }

  if (window.kakao?.maps) {
    kakao.maps.load(initializeBrandMap);
    return;
  }

  const script = document.createElement("script");
  script.src =
    "https://dapi.kakao.com/v2/maps/sdk.js" +
    `?appkey=${encodeURIComponent(key)}` +
    "&autoload=false&libraries=services";
  script.addEventListener("load", () => kakao.maps.load(initializeBrandMap));
  script.addEventListener("error", () => {
    showMapMessage(
      "카카오맵을 불러오지 못했습니다.",
      "잠시 후 다시 시도해 주세요."
    );
  });
  document.head.appendChild(script);
}

mapCategoryFilter?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-map-category]");
  if (!button) {
    return;
  }

  activeMapCategory = button.dataset.mapCategory;
  mapCategoryFilter.querySelectorAll("button").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  renderBrandMapMarkers();
});

async function loadBrands() {
  try {
    const response = await fetch("/data/brands/index.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`브랜드 데이터를 불러오지 못했습니다. (${response.status})`);
    }

    const brands = await response.json();
    randomizedBrands = shuffled(
      brands.filter((brand) => brand.published !== false)
    );

    renderCategoryButtons(randomizedBrands);
    renderMapCategoryButtons(randomizedBrands);

    const initialSearch = new URL(window.location.href).searchParams.get("search");
    if (initialSearch && brandSearchInput) {
      brandSearchInput.value = initialSearch;
      searchKeyword = normalized(initialSearch);
      if (clearSearchButton) {
        clearSearchButton.hidden = false;
      }
    }

    renderBrands();
    renderBrandTicker(randomizedBrands);
    startBrandRotation();
    if (document.querySelector("#brandMap")) {
      loadKakaoMapSdk();
    }
  } catch (error) {
    console.error(error);
    randomizedBrands = [
      {
        slug: "i4",
        name: "i4",
        category: "농산",
        product: "계란",
        region: "충남 홍성",
        headline: "농장 환경과 생산 과정을 직접 확인할 수 있는 계란",
        published: true,
        images: { main: "/assets/i4-eggs.png" }
      }
    ];
    renderCategoryButtons(randomizedBrands);
    renderMapCategoryButtons(randomizedBrands);
    renderBrands();
    renderBrandTicker(randomizedBrands);
    startBrandRotation();
    if (document.querySelector("#brandMap")) {
      loadKakaoMapSdk();
    }
  }
}

loadBrands();
