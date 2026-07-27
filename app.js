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

const RECENT_BRAND_KEY = "yeongjin-market-recent-brand";

let randomizedBrands = [];
let activeCategory = "all";
let searchKeyword = "";
let toastTimer = null;

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
  const sizeClass = [
    index % 4 === 0 ? "brand-card-featured" : "",
    brand.demo ? "brand-card-demo" : ""
  ]
    .filter(Boolean)
    .join(" ");
  const location = [brand.category, brand.region].filter(Boolean).join(" · ");
  const cardClass = sizeClass ? ` ${sizeClass}` : "";

  return `
    <a
      class="brand-card${cardClass}"
      href="${getBrandPageUrl(brand)}"
      data-brand-slug="${escapeHtml(brand.slug)}"
      data-brand-name="${escapeHtml(brand.name)}"
    >
      <img
        src="${escapeHtml(image)}"
        alt="${escapeHtml(brand.name)} ${escapeHtml(brand.product)} 대표 이미지"
        ${index < 2 ? 'fetchpriority="high"' : 'loading="lazy"'}
      >
      <span class="brand-card-overlay"></span>
      <span class="brand-card-badge">
        ${brand.demo ? "<i>샘플</i>" : ""}
        ${escapeHtml(location)}
      </span>
      <span class="brand-card-copy">
        <strong>${escapeHtml(brand.name)}</strong>
        <small>${escapeHtml(brand.headline)}</small>
        <span class="brand-card-footer">
          <i>${escapeHtml(brand.product)}</i>
          <b aria-label="${escapeHtml(brand.name)} 상세 보기">→</b>
        </span>
      </span>
    </a>
  `;
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

    const initialSearch = new URL(window.location.href).searchParams.get("search");
    if (initialSearch && brandSearchInput) {
      brandSearchInput.value = initialSearch;
      searchKeyword = normalized(initialSearch);
      if (clearSearchButton) {
        clearSearchButton.hidden = false;
      }
    }

    renderBrands();
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
    renderBrands();
  }
}

loadBrands();
