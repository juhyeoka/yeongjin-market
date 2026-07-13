const categoryInformation = {
  agriculture: {
    title: "농산",
    icon: "♧",
    label: "자연이 키운 건강한 먹거리",
    heroTitle: "영진관광이 엄선한 농산",
    description: "전국 농부들의 정성과 진심을 담은\n신선한 농산물을 만나보세요.",
    heroImage: "https://loremflickr.com/1400/700/vegetables,farm?lock=301",
    subcategories: ["전체", "과일", "채소", "쌀·잡곡", "계란", "견과·가공"]
  },
  livestock: {
    title: "축산",
    icon: "♨",
    label: "정직하게 키운 건강한 먹거리",
    heroTitle: "믿을 수 있는 우리 축산물",
    description: "생산 과정과 산지를 확인할 수 있는\n안심 축산 브랜드를 만나보세요.",
    heroImage: "https://loremflickr.com/1400/700/cattle,meat,farm?lock=302",
    subcategories: ["전체", "한우", "돼지고기", "닭·오리", "계란"]
  },
  seafood: {
    title: "수산",
    icon: "≋",
    label: "깨끗한 바다에서 온 신선함",
    heroTitle: "영진관광이 발견한 수산",
    description: "전국 어민들의 정성과 신선함을 담은\n수산 브랜드를 만나보세요.",
    heroImage: "https://loremflickr.com/1400/700/fish,seafood,sea?lock=303",
    subcategories: ["전체", "생선", "해산물", "건어물", "수산가공"]
  },
  cafe: {
    title: "카페",
    icon: "♨",
    label: "지역의 이야기가 담긴 한 잔",
    heroTitle: "특별한 로컬 카페와 디저트",
    description: "지역의 재료와 감성을 담아 만든\n카페와 베이커리를 만나보세요.",
    heroImage: "https://loremflickr.com/1400/700/coffee,cafe,bakery?lock=304",
    subcategories: ["전체", "커피", "디저트", "베이커리", "전통차"]
  }
};

const brandData = {
  agriculture: [
    {
      name: "i4",
      location: "충남 홍성",
      description: "QR로 농장의 사육 환경과 생산 정보를 직접 확인할 수 있는 프리미엄 계란 브랜드",
      tag: "계란",
      type: "계란",
      image: "assets/i4-eggs.png",
      url: "https://smartstore.naver.com/i4company/products/13640294223",
      new: true
    },

    {
      name: "청도복숭아농장",
      location: "경북 청도",
      description: "30년 경력의 복숭아 장인이 정성껏 키운 달콤한 복숭아",
      tag: "복숭아",
      type: "과일",
      image: "https://loremflickr.com/800/520/peach,fruit?lock=111",
      new: true
    },
    {
      name: "샤인머스켓가든",
      location: "충북 영동",
      description: "당도 높은 샤인머스켓을 직접 재배하는 농장",
      tag: "샤인머스켓",
      type: "과일",
      image: "https://loremflickr.com/800/520/grapes,fruit?lock=112",
      new: true
    },
    {
      name: "햇살쌀방앗간",
      location: "전남 나주",
      description: "올해 수확한 햅쌀만 고집하는 정직한 쌀 전문 농가",
      tag: "쌀",
      type: "쌀·잡곡",
      image: "https://loremflickr.com/800/520/rice,grain?lock=113",
      new: false
    },
    {
      name: "완숙토마토팜",
      location: "전북 익산",
      description: "자연 그대로 키워 더 맛있는 완숙 토마토 농장",
      tag: "토마토",
      type: "채소",
      image: "https://loremflickr.com/800/520/tomato,farm?lock=114",
      new: true
    },
    {
      name: "포슬감자농원",
      location: "강원 평창",
      description: "해발 600m 청정지역에서 재배하는 포슬한 감자",
      tag: "감자",
      type: "채소",
      image: "https://loremflickr.com/800/520/potato,farm?lock=115",
      new: false
    },
    {
      name: "초당옥수수마을",
      location: "강원 강릉",
      description: "아침에 수확해 당일 발송하는 달콤한 초당옥수수",
      tag: "옥수수",
      type: "채소",
      image: "https://loremflickr.com/800/520/corn,farm?lock=116",
      new: false
    },
    {
      name: "산골고구마농원",
      location: "경남 고성",
      description: "황토밭에서 키워 더욱 달콤한 꿀고구마 전문 농원",
      tag: "고구마",
      type: "채소",
      image: "https://loremflickr.com/800/520/sweetpotato,farm?lock=117",
      new: false
    },
    {
      name: "의성마늘농장",
      location: "경북 의성",
      description: "마늘 주산지 의성에서 키운 알싸하고 건강한 마늘",
      tag: "마늘",
      type: "채소",
      image: "https://loremflickr.com/800/520/garlic,farm?lock=118",
      new: false
    }
  ],

  livestock: [
    {
      name: "한우마을목장",
      location: "강원 횡성",
      description: "깨끗한 환경에서 건강하게 키운 프리미엄 한우",
      tag: "한우",
      type: "한우",
      image: "https://loremflickr.com/800/520/beef,cattle?lock=121",
      new: true
    },
    {
      name: "바른돼지농장",
      location: "충남 홍성",
      description: "철저한 관리와 깨끗한 사육 환경을 지키는 양돈 농장",
      tag: "돼지고기",
      type: "돼지고기",
      image: "https://loremflickr.com/800/520/pork,meat?lock=122",
      new: true
    },
    {
      name: "행복한계란농장",
      location: "경기 이천",
      description: "건강한 닭이 낳은 신선한 무항생제 계란",
      tag: "계란",
      type: "계란",
      image: "https://loremflickr.com/800/520/egg,farm?lock=123",
      new: false
    },
    {
      name: "푸른들오리농장",
      location: "전남 나주",
      description: "넓은 들판에서 건강하게 자란 국내산 오리",
      tag: "오리",
      type: "닭·오리",
      image: "https://loremflickr.com/800/520/duck,farm?lock=124",
      new: false
    }
  ],

  seafood: [
    {
      name: "동해바다수산",
      location: "강원 속초",
      description: "매일 아침 동해에서 잡아 올린 신선한 생선",
      tag: "생선",
      type: "생선",
      image: "https://loremflickr.com/800/520/fish,market?lock=131",
      new: true
    },
    {
      name: "통영굴마을",
      location: "경남 통영",
      description: "청정 통영 앞바다에서 자란 신선하고 탱글한 굴",
      tag: "굴",
      type: "해산물",
      image: "https://loremflickr.com/800/520/oyster,seafood?lock=132",
      new: true
    },
    {
      name: "남해멸치상회",
      location: "경남 남해",
      description: "남해 바다의 신선함을 담은 국물용 멸치",
      tag: "멸치",
      type: "건어물",
      image: "https://loremflickr.com/800/520/driedfish,seafood?lock=133",
      new: false
    },
    {
      name: "완도전복마을",
      location: "전남 완도",
      description: "청정 바다에서 건강하게 자란 프리미엄 전복",
      tag: "전복",
      type: "해산물",
      image: "https://loremflickr.com/800/520/abalone,seafood?lock=134",
      new: false
    }
  ],

  cafe: [
    {
      name: "산들로스터리",
      location: "강원 강릉",
      description: "지역의 감성과 향을 한 잔에 담은 로컬 로스터리",
      tag: "커피",
      type: "커피",
      image: "https://loremflickr.com/800/520/coffee,cafe?lock=141",
      new: true
    },
    {
      name: "소담베이커리",
      location: "충남 공주",
      description: "지역 농산물로 매일 아침 굽는 건강한 빵",
      tag: "베이커리",
      type: "베이커리",
      image: "https://loremflickr.com/800/520/bread,bakery?lock=142",
      new: true
    },
    {
      name: "달빛디저트",
      location: "전북 전주",
      description: "전주의 재료와 감성을 담은 수제 디저트",
      tag: "디저트",
      type: "디저트",
      image: "https://loremflickr.com/800/520/cake,dessert?lock=143",
      new: false
    },
    {
      name: "차향다원",
      location: "전남 보성",
      description: "보성 찻잎으로 정성껏 만든 깊고 향긋한 전통차",
      tag: "전통차",
      type: "전통차",
      image: "https://loremflickr.com/800/520/tea,green?lock=144",
      new: false
    }
  ]
};

const homePage = document.querySelector("#homePage");
const categoryPage = document.querySelector("#categoryPage");
const mapPage = document.querySelector("#mapPage");
const brandDetailPage = document.querySelector("#brandDetailPage");
const newBrandList = document.querySelector("#newBrandList");
const brandGrid = document.querySelector("#brandGrid");
const brandCount = document.querySelector("#brandCount");
const categorySearchArea = document.querySelector("#categorySearchArea");
const categorySearchInput = document.querySelector("#categorySearch");
const bottomNavItems = document.querySelectorAll(".bottom-nav-item");

let currentCategory = "agriculture";
let currentSubcategory = "전체";
let currentSort = "추천순";
let favoriteBrands = new Set();

function getAllBrands() {
  return Object.values(brandData).flat();
}

function renderNewBrands() {
  const brands = getAllBrands()
    .filter((brand) => brand.new)
    .slice(0, 4);

  newBrandList.innerHTML = brands.map((brand) => `
    <article
      class="new-brand-card"
      data-brand="${brand.name}"
      ${brand.url ? `data-url="${brand.url}" role="link" tabindex="0"` : ""}
    >
      <div class="new-brand-image">
        <img src="${brand.image}" alt="${brand.name}">
        <span class="new-badge">NEW</span>
      </div>

      <div class="new-brand-copy">
        <h3>${brand.name}</h3>
        <p>${brand.description}</p>
        <span>#${brand.tag}</span>
      </div>
    </article>
  `).join("");
}

function renderSubcategories() {
  const categories = categoryInformation[currentCategory].subcategories;
  const container = document.querySelector("#subcategoryList");

  container.innerHTML = categories.map((category) => `
    <button
      class="subcategory-button ${category === currentSubcategory ? "active" : ""}"
      data-subcategory="${category}"
    >
      ${category}
    </button>
  `).join("");

  container.querySelectorAll(".subcategory-button").forEach((button) => {
    button.addEventListener("click", () => {
      currentSubcategory = button.dataset.subcategory;
      renderSubcategories();
      renderBrandGrid();
    });
  });
}

function renderBrandGrid() {
  const keyword = categorySearchInput.value.trim().toLowerCase();

  let brands = [...brandData[currentCategory]];

  if (currentSubcategory !== "전체") {
    brands = brands.filter((brand) => brand.type === currentSubcategory);
  }

  if (keyword) {
    brands = brands.filter((brand) => {
      const searchableText = `
        ${brand.name}
        ${brand.location}
        ${brand.description}
        ${brand.tag}
        ${brand.type}
      `.toLowerCase();

      return searchableText.includes(keyword);
    });
  }

  if (currentSort === "이름순") {
    brands.sort((a, b) => a.name.localeCompare(b.name, "ko"));
  }

  brandCount.textContent = brands.length;

  if (brands.length === 0) {
    brandGrid.innerHTML = `
      <div style="
        grid-column: 1 / -1;
        padding: 70px 20px;
        text-align: center;
        color: #7d858e;
        background: #f8f9fa;
        border-radius: 20px;
      ">
        검색 결과가 없습니다.
      </div>
    `;
    return;
  }

  brandGrid.innerHTML = brands.map((brand) => `
    <article
      class="brand-card"
      data-brand="${brand.name}"
      ${brand.url ? `data-url="${brand.url}" role="link" tabindex="0"` : ""}
    >
      <div class="brand-card-image">
        <img src="${brand.image}" alt="${brand.name}">
        ${brand.new ? '<span class="brand-card-badge">NEW</span>' : ""}
      </div>

      <div class="brand-card-copy">
        <h3>
          ${brand.name}
          <span class="brand-location">⌖ ${brand.location}</span>
        </h3>

        <p>${brand.description}</p>

        <button
          class="favorite-button ${favoriteBrands.has(brand.name) ? "active" : ""}"
          data-brand="${brand.name}"
          aria-label="찜하기"
        >
          ${favoriteBrands.has(brand.name) ? "♥" : "♡"}
        </button>
      </div>
    </article>
  `).join("");

  brandGrid.querySelectorAll(".favorite-button").forEach((button) => {
    button.addEventListener("click", () => {
      const brandName = button.dataset.brand;

      if (favoriteBrands.has(brandName)) {
        favoriteBrands.delete(brandName);
      } else {
        favoriteBrands.add(brandName);
      }

      renderBrandGrid();
    });
  });
}

function setActiveBottomNavigation(navName) {
  bottomNavItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.nav === navName);
  });
}

function openCategory(categoryName = "agriculture") {
  brandDetailPage.classList.remove("active-page");
  currentCategory = categoryName;
  currentSubcategory = "전체";
  currentSort = "추천순";
  categorySearchInput.value = "";

  const info = categoryInformation[categoryName];

  document.querySelector("#categoryTitle").textContent = info.title;
  document.querySelector("#categoryHeroLabel").textContent = info.label;
  document.querySelector("#categoryHeroTitle").textContent = info.heroTitle;
  document.querySelector("#categoryHeroDescription").innerHTML =
    info.description.replace("\n", "<br>");
  document.querySelector("#categoryHeroImage").src = info.heroImage;

  homePage.classList.remove("active-page");
  mapPage.classList.remove("active-page");
  categoryPage.classList.add("active-page");

  renderSubcategories();
  renderBrandGrid();
  setActiveBottomNavigation("search");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function openHome() {
  brandDetailPage.classList.remove("active-page");
  categoryPage.classList.remove("active-page");
  mapPage.classList.remove("active-page");
  homePage.classList.add("active-page");
  categorySearchArea.classList.remove("visible");
  setActiveBottomNavigation("home");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    openCategory(button.dataset.category);
  });
});

document.querySelector("#backButton").addEventListener("click", openHome);
document.querySelector("#logoButton").addEventListener("click", openHome);

document.querySelector("#viewAllButton").addEventListener("click", () => {
  openCategory("agriculture");
});

document.querySelector("#storyButton").addEventListener("click", () => {
  document.querySelector(".new-brand-section").scrollIntoView({
    behavior: "smooth"
  });
});

document.querySelector("#categorySearchButton").addEventListener("click", () => {
  categorySearchArea.classList.toggle("visible");

  if (categorySearchArea.classList.contains("visible")) {
    categorySearchInput.focus();
  }
});

document.querySelector("#sortButton").addEventListener("click", (event) => {
  currentSort = currentSort === "추천순" ? "이름순" : "추천순";
  event.currentTarget.firstChild.textContent = `${currentSort} `;
  renderBrandGrid();
});

categorySearchInput.addEventListener("input", renderBrandGrid);

document.querySelector("#homeSearch").addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  const keyword = event.currentTarget.value.trim();

  openCategory("agriculture");
  categorySearchInput.value = keyword;
  categorySearchArea.classList.add("visible");
  renderBrandGrid();
});

bottomNavItems.forEach((button) => {
  button.addEventListener("click", () => {
    const nav = button.dataset.nav;

    if (nav === "home") {
      openHome();
      return;
    }

    if (nav === "search") {
      openCategory(currentCategory);
      categorySearchArea.classList.add("visible");
      categorySearchInput.focus();
      return;
    }

    if (nav === "favorite") {
      alert(`찜한 브랜드는 ${favoriteBrands.size}개입니다.`);
      return;
    }

    if (nav === "map") {
      openBrandMapPage();
      return;
    }

    if (nav === "mypage") {
      alert("마이페이지 기능은 다음 단계에서 연결합니다.");
    }
  });
});


// BRAND CARD LINK HANDLER
document.addEventListener("click", (event) => {
  const card = event.target.closest(
    ".new-brand-card[data-url], .brand-card[data-url]"
  );

  if (!card) {
    return;
  }

  // 찜 버튼이나 별도의 링크를 누른 경우 카드 이동 방지
  if (event.target.closest("button, a")) {
    return;
  }

  window.location.href = card.dataset.url;
});

document.addEventListener("keydown", (event) => {
  const card = event.target.closest(
    ".new-brand-card[data-url], .brand-card[data-url]"
  );

  if (!card) {
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    window.location.href = card.dataset.url;
  }
});


// BRAND MAP CODE START

const mapCategoryLabels = {
  agriculture: "농산",
  livestock: "축산",
  seafood: "수산",
  cafe: "카페"
};

/*
 * 브랜드에 저장된 짧은 지역명을
 * 카카오 주소 검색에 적합한 행정구역명으로 변경합니다.
 */
const regionSearchQueries = {
  "충남 홍성": "충청남도 홍성군",
  "충남 공주": "충청남도 공주시",
  "충북 영동": "충청북도 영동군",

  "경기 이천": "경기도 이천시",

  "강원 횡성": "강원특별자치도 횡성군",
  "강원 평창": "강원특별자치도 평창군",
  "강원 강릉": "강원특별자치도 강릉시",
  "강원 속초": "강원특별자치도 속초시",

  "경북 청도": "경상북도 청도군",
  "경북 의성": "경상북도 의성군",

  "경남 고성": "경상남도 고성군",
  "경남 통영": "경상남도 통영시",
  "경남 남해": "경상남도 남해군",

  "전북 익산": "전북특별자치도 익산시",
  "전북 전주": "전북특별자치도 전주시",

  "전남 나주": "전라남도 나주시",
  "전남 완도": "전라남도 완도군",
  "전남 보성": "전라남도 보성군",

  /*
   * 이전 임시 데이터에 i4 지역이 다르게 저장되어 있어도
   * 홍성 지역으로 검색되도록 하는 예외 처리입니다.
   */
  "지역 계란 브랜드": "충청남도 홍성군"
};

let brandMap = null;
let mapGeocoder = null;
let activeMapCategory = "all";
let mapOverlays = [];
let mapRenderSequence = 0;

const regionCoordinateCache = new Map();

const mapStatus = document.querySelector("#mapStatus");
const mapStatusTitle = document.querySelector("#mapStatusTitle");
const mapStatusDescription = document.querySelector(
  "#mapStatusDescription"
);
const mapRegionPanel = document.querySelector("#mapRegionPanel");
const mapFilterButtons = document.querySelectorAll(
  ".map-filter-button"
);

/*
 * app.js의 기존 브랜드 데이터를 지도용 데이터로 변환합니다.
 */
function getAllMapBrands() {
  return Object.entries(brandData).flatMap(
    ([category, brands]) => {
      return brands.map((brand) => {
        let location = brand.location || "지역 미정";

        /*
         * i4는 농산 카테고리의 홍성 브랜드로 고정합니다.
         */
        if (brand.name === "i4") {
          location = "충남 홍성";
        }

        return {
          ...brand,
          category,
          location
        };
      });
    }
  );
}

/*
 * 같은 지역의 브랜드를 하나의 묶음으로 만듭니다.
 */
function groupBrandsByRegion(brands) {
  const regionGroups = new Map();

  brands.forEach((brand) => {
    if (!regionGroups.has(brand.location)) {
      regionGroups.set(brand.location, {
        location: brand.location,
        brands: []
      });
    }

    regionGroups.get(brand.location).brands.push(brand);
  });

  return Array.from(regionGroups.values());
}

function showMapStatus(title, description = "", error = false) {
  mapStatusTitle.textContent = title;
  mapStatusDescription.textContent = description;
  mapStatus.classList.toggle("error", error);
  mapStatus.hidden = false;
}

function hideMapStatus() {
  mapStatus.hidden = true;
  mapStatus.classList.remove("error");
}

function clearMapOverlays() {
  mapOverlays.forEach((overlay) => {
    overlay.setMap(null);
  });

  mapOverlays = [];
}

/*
 * 지역명을 카카오 주소 검색으로 좌표 변환합니다.
 */
function getRegionPosition(location) {
  if (regionCoordinateCache.has(location)) {
    return Promise.resolve(
      regionCoordinateCache.get(location)
    );
  }

  const searchQuery =
    regionSearchQueries[location] || location;

  return new Promise((resolve) => {
    mapGeocoder.addressSearch(
      searchQuery,
      (result, status) => {
        if (
          status === kakao.maps.services.Status.OK &&
          result.length > 0
        ) {
          const position = new kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x)
          );

          regionCoordinateCache.set(location, position);
          resolve(position);
          return;
        }

        console.warn(
          "지역 좌표 검색 실패:",
          location,
          searchQuery
        );

        resolve(null);
      }
    );
  });
}

function getRegionMarkerCategory(regionGroup) {
  const categories = new Set(
    regionGroup.brands.map((brand) => brand.category)
  );

  if (categories.size === 1) {
    return Array.from(categories)[0];
  }

  return "mixed";
}

function renderRegionBrandPanel(regionGroup) {
  const brandCards = regionGroup.brands.map((brand) => {
    const categoryLabel =
      mapCategoryLabels[brand.category] || "지역 브랜드";

    const imageClass =
      brand.name === "i4" ? " i4-image" : "";

    const imageHtml = brand.image
      ? `
        <div class="map-brand-image${imageClass}">
          <img
            src="${brand.image}"
            alt="${brand.name}"
          >
        </div>
      `
      : `
        <div class="map-brand-image"></div>
      `;

    const linkHtml = brand.url
      ? `
        <a
          class="map-brand-link"
          href="${brand.url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          브랜드 보기
        </a>
      `
      : `
        <span class="map-brand-link-disabled">
          홈페이지 준비 중
        </span>
      `;

    return `
      <article class="map-brand-card" data-brand="${brand.name}">
        ${imageHtml}

        <div class="map-brand-information">
          <span class="map-brand-category">
            ${categoryLabel} · ${brand.location}
          </span>

          <h3>${brand.name}</h3>

          <p>
            ${brand.description || "브랜드 소개를 준비하고 있습니다."}
          </p>

          ${linkHtml}
        </div>
      </article>
    `;
  }).join("");

  mapRegionPanel.innerHTML = `
    <div class="map-region-heading">
      <div>
        <p>정확한 주소가 아닌 지역 기준 위치</p>
        <h2>${regionGroup.location}</h2>
      </div>

      <span>
        ${regionGroup.brands.length}개 브랜드
      </span>
    </div>

    <div class="map-brand-list">
      ${brandCards}
    </div>
  `;
}

function selectMapRegion(regionGroup, position) {
  brandMap.setLevel(7);
  brandMap.panTo(position);

  renderRegionBrandPanel(regionGroup);

  setTimeout(() => {
    mapRegionPanel.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, 150);
}

function createRegionOverlay(regionGroup, position) {
  const markerCategory =
    getRegionMarkerCategory(regionGroup);

  const markerButton = document.createElement("button");

  markerButton.type = "button";
  markerButton.className =
    `region-map-marker region-map-marker--${markerCategory}`;

  markerButton.setAttribute(
    "aria-label",
    `${regionGroup.location}의 브랜드 ${regionGroup.brands.length}개 보기`
  );

  markerButton.innerHTML = `
    <span>${regionGroup.location}</span>
    <strong>${regionGroup.brands.length}</strong>
  `;

  markerButton.addEventListener("click", () => {
    document
      .querySelectorAll(".region-map-marker")
      .forEach((marker) => {
        marker.classList.remove("is-selected");
      });

    markerButton.classList.add("is-selected");

    selectMapRegion(regionGroup, position);
  });

  const overlay = new kakao.maps.CustomOverlay({
    position,
    content: markerButton,
    yAnchor: 1.15,
    zIndex: 5
  });

  overlay.setMap(brandMap);
  mapOverlays.push(overlay);
}

/*
 * 선택된 카테고리에 따라 지역 마커를 다시 그립니다.
 */
async function renderMapRegions() {
  if (!brandMap || !mapGeocoder) {
    return;
  }

  const currentSequence = ++mapRenderSequence;

  clearMapOverlays();

  let brands = getAllMapBrands();

  if (activeMapCategory !== "all") {
    brands = brands.filter(
      (brand) => brand.category === activeMapCategory
    );
  }

  const regionGroups = groupBrandsByRegion(brands);

  if (regionGroups.length === 0) {
    showMapStatus(
      "표시할 브랜드가 없습니다.",
      "다른 카테고리를 선택해 주세요."
    );
    return;
  }

  showMapStatus(
    "지역 정보를 불러오고 있습니다.",
    "브랜드 지역을 지도에 표시하는 중입니다."
  );

  const resolvedRegions = await Promise.all(
    regionGroups.map(async (regionGroup) => {
      const position = await getRegionPosition(
        regionGroup.location
      );

      return {
        regionGroup,
        position
      };
    })
  );

  /*
   * 필터를 빠르게 변경한 경우
   * 이전 검색 결과는 지도에 표시하지 않습니다.
   */
  if (currentSequence !== mapRenderSequence) {
    return;
  }

  const validRegions = resolvedRegions.filter(
    (item) => item.position
  );

  if (validRegions.length === 0) {
    showMapStatus(
      "지역을 지도에서 찾지 못했습니다.",
      "브랜드 지역 정보가 올바른지 확인해 주세요.",
      true
    );
    return;
  }

  const bounds = new kakao.maps.LatLngBounds();

  validRegions.forEach(({ regionGroup, position }) => {
    createRegionOverlay(regionGroup, position);
    bounds.extend(position);
  });

  if (validRegions.length === 1) {
    brandMap.setCenter(validRegions[0].position);
    brandMap.setLevel(8);
  } else {
    brandMap.setBounds(bounds);
  }

  hideMapStatus();
}

/*
 * 카카오 지도를 최초 생성합니다.
 */
function initializeBrandMap() {
  const mapContainer = document.querySelector("#brandMap");

  if (!mapContainer) {
    return;
  }

  if (brandMap) {
    setTimeout(() => {
      brandMap.relayout();
      renderMapRegions();
    }, 80);

    return;
  }

  brandMap = new kakao.maps.Map(
    mapContainer,
    {
      center: new kakao.maps.LatLng(
        36.35,
        127.8
      ),
      level: 12
    }
  );

  mapGeocoder = new kakao.maps.services.Geocoder();

  kakao.maps.event.addListener(
    brandMap,
    "click",
    () => {
      /*
       * 지도 빈 공간을 누를 때는
       * 지역 선택 카드가 그대로 유지됩니다.
       */
    }
  );

  renderMapRegions();
}

/*
 * map-config.js의 키를 이용해
 * 카카오 지도 SDK를 불러옵니다.
 */
function loadKakaoMapSdk() {
  const javascriptKey = String(
    window.KAKAO_JAVASCRIPT_KEY || "f57a96a349d16225f9a68cfcba81cbdf"
  ).trim();

  if (
    !javascriptKey ||
    javascriptKey.includes("여기에_")
  ) {
    showMapStatus(
      "카카오 지도 키를 입력해 주세요.",
      "map-config.js 파일에 카카오 JavaScript 키를 입력하면 지도가 표시됩니다.",
      true
    );
    return;
  }

  if (
    window.kakao &&
    window.kakao.maps
  ) {
    kakao.maps.load(initializeBrandMap);
    return;
  }

  const oldScript = document.querySelector(
    "#kakaoMapSdk"
  );

  if (oldScript) {
    return;
  }

  showMapStatus(
    "카카오 지도를 불러오고 있습니다.",
    "잠시만 기다려 주세요."
  );

  const script = document.createElement("script");

  script.id = "kakaoMapSdk";
  script.async = true;

  script.src =
    "https://dapi.kakao.com/v2/maps/sdk.js" +
    `?appkey=${encodeURIComponent(javascriptKey)}` +
    "&autoload=false" +
    "&libraries=services";

  script.addEventListener("load", () => {
    kakao.maps.load(initializeBrandMap);
  });

  script.addEventListener("error", () => {
    showMapStatus(
      "카카오 지도를 불러오지 못했습니다.",
      "JavaScript 키와 등록된 웹 도메인을 확인해 주세요.",
      true
    );
  });

  document.head.appendChild(script);
}

function openBrandMapPage() {
  brandDetailPage.classList.remove("active-page");
  homePage.classList.remove("active-page");
  categoryPage.classList.remove("active-page");
  mapPage.classList.add("active-page");

  setActiveBottomNavigation("map");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  setTimeout(() => {
    loadKakaoMapSdk();

    if (brandMap) {
      brandMap.relayout();
    }
  }, 100);
}

document
  .querySelector("#mapBackButton")
  .addEventListener("click", openHome);

mapFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeMapCategory =
      button.dataset.mapCategory;

    mapFilterButtons.forEach((item) => {
      item.classList.toggle(
        "active",
        item === button
      );
    });

    mapRegionPanel.innerHTML = `
      <div class="map-region-empty">
        <strong>지도에서 지역을 선택하세요.</strong>
        <p>
          지역 마커를 누르면 해당 지역의 브랜드가 표시됩니다.
        </p>
      </div>
    `;

    renderMapRegions();
  });
});

// BRAND MAP CODE END


// BRAND DETAIL FEATURE START

const brandCategoryNames = {
  agriculture: "농산",
  livestock: "축산",
  seafood: "수산",
  cafe: "카페"
};

let previousBrandPage = "home";
let activeDetailBrand = null;

function findBrandByName(brandName) {
  for (const [category, brands] of Object.entries(brandData)) {
    const brand = brands.find((item) => item.name === brandName);

    if (brand) {
      return {
        ...brand,
        category
      };
    }
  }

  return null;
}

function getCurrentVisiblePage() {
  if (mapPage && mapPage.classList.contains("active-page")) {
    return "map";
  }

  if (categoryPage.classList.contains("active-page")) {
    return "category";
  }

  return "home";
}

function hideMainPagesForDetail() {
  homePage.classList.remove("active-page");
  categoryPage.classList.remove("active-page");

  if (mapPage) {
    mapPage.classList.remove("active-page");
  }
}

function openBrandDetail(brandName) {
  const brand = findBrandByName(brandName);

  if (!brand) {
    console.warn("브랜드를 찾지 못했습니다:", brandName);
    return;
  }

  previousBrandPage = getCurrentVisiblePage();
  activeDetailBrand = brand;

  hideMainPagesForDetail();
  brandDetailPage.classList.add("active-page");

  const categoryName =
    brandCategoryNames[brand.category] || "지역 브랜드";

  const image = document.querySelector("#detailBrandImage");

  image.src = brand.image || "bus.png";
  image.alt = brand.name;

  document.querySelector("#detailBrandCategory").textContent =
    categoryName;

  document.querySelector("#detailBrandName").textContent =
    brand.name;

  document.querySelector("#detailBrandLocation").textContent =
    brand.location || "지역 정보 준비 중";

  

  document.querySelector("#detailBrandDescription").textContent =
    brand.description ||
    "브랜드 소개를 준비하고 있습니다.";

  document.querySelector("#detailInfoName").textContent =
    brand.name;

  document.querySelector("#detailInfoLocation").textContent =
    brand.location || "-";

  document.querySelector("#detailInfoCategory").textContent =
    categoryName;

  document.querySelector("#detailInfoTag").textContent =
    brand.tag || brand.type || "-";

  const externalLink = document.querySelector(
    "#detailExternalLink"
  );

  const externalDisabled = document.querySelector(
    "#detailExternalDisabled"
  );

  if (brand.url) {
    externalLink.href = brand.url;
    externalLink.hidden = false;
    externalDisabled.hidden = true;
  } else {
    externalLink.removeAttribute("href");
    externalLink.hidden = true;
    externalDisabled.hidden = false;
  }

  const detailFavoriteButton = document.querySelector(
    "#detailFavoriteButton"
  );

  const isFavorite = favoriteBrands.has(brand.name);

  detailFavoriteButton.classList.toggle(
    "active",
    isFavorite
  );

  detailFavoriteButton.textContent =
    isFavorite ? "♥" : "♡";

  setActiveBottomNavigation("search");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function closeBrandDetail() {
  brandDetailPage.classList.remove("active-page");

  if (previousBrandPage === "map" && mapPage) {
    mapPage.classList.add("active-page");
    setActiveBottomNavigation("map");

    setTimeout(() => {
      if (brandMap) {
        brandMap.relayout();
      }
    }, 100);

    return;
  }

  if (previousBrandPage === "category") {
    categoryPage.classList.add("active-page");
    setActiveBottomNavigation("search");
    return;
  }

  homePage.classList.add("active-page");
  setActiveBottomNavigation("home");
}

document
  .querySelector("#detailBackButton")
  .addEventListener("click", closeBrandDetail);

document
  .querySelector("#detailFavoriteButton")
  .addEventListener("click", () => {
    if (!activeDetailBrand) {
      return;
    }

    if (favoriteBrands.has(activeDetailBrand.name)) {
      favoriteBrands.delete(activeDetailBrand.name);
    } else {
      favoriteBrands.add(activeDetailBrand.name);
    }

    const isFavorite = favoriteBrands.has(
      activeDetailBrand.name
    );

    const button = document.querySelector(
      "#detailFavoriteButton"
    );

    button.classList.toggle("active", isFavorite);
    button.textContent = isFavorite ? "♥" : "♡";
  });

/*
 * 기존에는 카드나 홈페이지 보기 버튼을 누르면
 * 외부 주소로 바로 이동했지만,
 * 이제 캡처 단계에서 먼저 상세 페이지로 이동시킵니다.
 */
document.addEventListener(
  "click",
  (event) => {
    const clickedElement = event.target;

    const card = clickedElement.closest(
      ".new-brand-card[data-brand], " +
      ".brand-card[data-brand], " +
      ".map-brand-card[data-brand]"
    );

    const directLink = clickedElement.closest(
      ".brand-site-link, .map-brand-link"
    );

    const favoriteButton = clickedElement.closest(
      ".favorite-button"
    );

    if (favoriteButton) {
      return;
    }

    if (!card && !directLink) {
      return;
    }

    let brandName = card?.dataset.brand;

    if (!brandName && directLink) {
      const parentCard = directLink.closest(
        "[data-brand]"
      );

      brandName = parentCard?.dataset.brand;
    }

    if (!brandName) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    openBrandDetail(brandName);
  },
  true
);

document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    const card = event.target.closest(
      ".new-brand-card[data-brand], " +
      ".brand-card[data-brand], " +
      ".map-brand-card[data-brand]"
    );

    if (!card) {
      return;
    }

    event.preventDefault();
    openBrandDetail(card.dataset.brand);
  },
  true
);

// BRAND DETAIL FEATURE END


// HIERARCHICAL REGION SELECTOR START

const provinceSelect = document.querySelector("#provinceSelect");
const citySelect = document.querySelector("#citySelect");
const districtSelect = document.querySelector("#districtSelect");
const neighborhoodSelect = document.querySelector(
  "#neighborhoodSelect"
);
const regionResetButton = document.querySelector(
  "#regionResetButton"
);
const selectedRegionSummary = document.querySelector(
  "#selectedRegionSummary strong"
);

const provinceFullNames = {
  서울: "서울특별시",
  부산: "부산광역시",
  대구: "대구광역시",
  인천: "인천광역시",
  광주: "광주광역시",
  대전: "대전광역시",
  울산: "울산광역시",
  세종: "세종특별자치시",
  경기: "경기도",
  강원: "강원특별자치도",
  충북: "충청북도",
  충남: "충청남도",
  전북: "전북특별자치도",
  전남: "전라남도",
  경북: "경상북도",
  경남: "경상남도",
  제주: "제주특별자치도"
};

let selectedProvince = "";
let selectedCity = "";
let selectedDistrict = "";
let selectedNeighborhood = "";
let selectedRegionMarker = null;

/*
 * 기존 location 문자열을 자동 분리합니다.
 *
 * 예:
 * 충남 홍성 -> 시도: 충남 / 시군구: 홍성
 * 서울 강남구 역삼동 -> 시도: 서울 / 시군구: 강남구 / 동: 역삼동
 *
 * 앞으로 업체 데이터에 province, city, district,
 * neighborhood를 직접 넣으면 그 값을 우선 사용합니다.
 */
function normalizeBrandRegion(brand) {
  const locationParts = String(brand.location || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return {
    ...brand,
    province:
      brand.province ||
      locationParts[0] ||
      "지역 미정",

    city:
      brand.city ||
      locationParts[1] ||
      "",

    district:
      brand.district ||
      locationParts[2] ||
      "",

    neighborhood:
      brand.neighborhood ||
      locationParts[3] ||
      ""
  };
}

function getRegionBrands() {
  let brands = getAllMapBrands().map(normalizeBrandRegion);

  if (activeMapCategory !== "all") {
    brands = brands.filter(
      (brand) => brand.category === activeMapCategory
    );
  }

  return brands;
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "ko"));
}

function setSelectOptions(
  selectElement,
  values,
  placeholder
) {
  selectElement.innerHTML = `
    <option value="">${placeholder}</option>
    ${values.map((value) => `
      <option value="${value}">${value}</option>
    `).join("")}
  `;

  selectElement.disabled = values.length === 0;
}

function updateProvinceOptions() {
  const brands = getRegionBrands();

  const provinces = uniqueSorted(
    brands.map((brand) => brand.province)
  );

  setSelectOptions(
    provinceSelect,
    provinces,
    "전체 시·도"
  );

  provinceSelect.disabled = false;

  if (
    selectedProvince &&
    provinces.includes(selectedProvince)
  ) {
    provinceSelect.value = selectedProvince;
  } else {
    selectedProvince = "";
  }
}

function updateCityOptions() {
  const brands = getRegionBrands().filter(
    (brand) =>
      !selectedProvince ||
      brand.province === selectedProvince
  );

  const cities = uniqueSorted(
    brands.map((brand) => brand.city)
  );

  setSelectOptions(
    citySelect,
    cities,
    "전체 시·군·구"
  );

  if (
    selectedCity &&
    cities.includes(selectedCity)
  ) {
    citySelect.value = selectedCity;
  } else {
    selectedCity = "";
  }
}

function updateDistrictOptions() {
  const brands = getRegionBrands().filter((brand) => {
    return (
      (!selectedProvince ||
        brand.province === selectedProvince) &&
      (!selectedCity ||
        brand.city === selectedCity)
    );
  });

  const districts = uniqueSorted(
    brands.map((brand) => brand.district)
  );

  setSelectOptions(
    districtSelect,
    districts,
    "전체 구·읍·면"
  );

  if (
    selectedDistrict &&
    districts.includes(selectedDistrict)
  ) {
    districtSelect.value = selectedDistrict;
  } else {
    selectedDistrict = "";
  }
}

function updateNeighborhoodOptions() {
  const brands = getRegionBrands().filter((brand) => {
    return (
      (!selectedProvince ||
        brand.province === selectedProvince) &&
      (!selectedCity ||
        brand.city === selectedCity) &&
      (!selectedDistrict ||
        brand.district === selectedDistrict)
    );
  });

  const neighborhoods = uniqueSorted(
    brands.map((brand) => brand.neighborhood)
  );

  setSelectOptions(
    neighborhoodSelect,
    neighborhoods,
    "전체 동·리"
  );

  if (
    selectedNeighborhood &&
    neighborhoods.includes(selectedNeighborhood)
  ) {
    neighborhoodSelect.value =
      selectedNeighborhood;
  } else {
    selectedNeighborhood = "";
  }
}

function getSelectedRegionText() {
  const values = [
    selectedProvince,
    selectedCity,
    selectedDistrict,
    selectedNeighborhood
  ].filter(Boolean);

  return values.length > 0
    ? values.join(" ")
    : "전국";
}

function filterBrandsBySelectedRegion() {
  return getRegionBrands().filter((brand) => {
    return (
      (!selectedProvince ||
        brand.province === selectedProvince) &&
      (!selectedCity ||
        brand.city === selectedCity) &&
      (!selectedDistrict ||
        brand.district === selectedDistrict) &&
      (!selectedNeighborhood ||
        brand.neighborhood === selectedNeighborhood)
    );
  });
}

function renderSelectedRegionBrands() {
  const brands = filterBrandsBySelectedRegion();
  const regionText = getSelectedRegionText();

  selectedRegionSummary.textContent = regionText;

  if (brands.length === 0) {
    mapRegionPanel.innerHTML = `
      <div class="region-no-result">
        <strong>등록된 브랜드가 없습니다.</strong>
        <p>
          다른 지역이나 카테고리를 선택해 주세요.
        </p>
      </div>
    `;

    return;
  }

  const brandCards = brands.map((brand) => {
    const categoryLabel =
      mapCategoryLabels[brand.category] ||
      "지역 브랜드";

    const imageClass =
      brand.name === "i4" ? " i4-image" : "";

    return `
      <article
        class="map-brand-card"
        data-brand="${brand.name}"
        role="button"
        tabindex="0"
      >
        <div class="map-brand-image${imageClass}">
          <img
            src="${brand.image || ""}"
            alt="${brand.name}"
            onerror="this.style.display='none'"
          >
        </div>

        <div class="map-brand-information">
          <span class="map-brand-category">
            ${categoryLabel} · ${brand.location}
          </span>

          <h3>${brand.name}</h3>

          <p>
            ${brand.description ||
              "브랜드 소개를 준비하고 있습니다."}
          </p>

          <span class="map-brand-link">
            브랜드 상세 보기
          </span>
        </div>
      </article>
    `;
  }).join("");

  mapRegionPanel.innerHTML = `
    <div class="map-region-heading">
      <div>
        <p>선택한 지역의 브랜드</p>
        <h2>${regionText}</h2>
      </div>

      <span>${brands.length}개 브랜드</span>
    </div>

    <div class="map-brand-list">
      ${brandCards}
    </div>
  `;
}

function buildRegionSearchQuery() {
  const parts = [
    provinceFullNames[selectedProvince] ||
      selectedProvince,
    selectedCity,
    selectedDistrict,
    selectedNeighborhood
  ].filter(Boolean);

  return parts.join(" ");
}

function updateMapForSelectedRegion() {
  if (
    !brandMap ||
    !mapGeocoder
  ) {
    return;
  }

  if (selectedRegionMarker) {
    selectedRegionMarker.setMap(null);
    selectedRegionMarker = null;
  }

  const query = buildRegionSearchQuery();

  if (!query) {
    brandMap.setCenter(
      new kakao.maps.LatLng(36.35, 127.8)
    );
    brandMap.setLevel(12);
    return;
  }

  mapGeocoder.addressSearch(
    query,
    (result, status) => {
      if (
        status !== kakao.maps.services.Status.OK ||
        result.length === 0
      ) {
        console.warn(
          "선택 지역 좌표 검색 실패:",
          query
        );
        return;
      }

      const position = new kakao.maps.LatLng(
        Number(result[0].y),
        Number(result[0].x)
      );

      selectedRegionMarker = new kakao.maps.Marker({
        position,
        map: brandMap
      });

      brandMap.panTo(position);

      if (selectedNeighborhood) {
        brandMap.setLevel(5);
      } else if (selectedDistrict) {
        brandMap.setLevel(6);
      } else if (selectedCity) {
        brandMap.setLevel(8);
      } else {
        brandMap.setLevel(10);
      }
    }
  );
}

function refreshRegionSelector() {
  updateProvinceOptions();
  updateCityOptions();
  updateDistrictOptions();
  updateNeighborhoodOptions();
  renderSelectedRegionBrands();
  updateMapForSelectedRegion();
}

provinceSelect.addEventListener("change", () => {
  selectedProvince = provinceSelect.value;
  selectedCity = "";
  selectedDistrict = "";
  selectedNeighborhood = "";

  updateCityOptions();
  updateDistrictOptions();
  updateNeighborhoodOptions();
  renderSelectedRegionBrands();
  updateMapForSelectedRegion();
});

citySelect.addEventListener("change", () => {
  selectedCity = citySelect.value;
  selectedDistrict = "";
  selectedNeighborhood = "";

  updateDistrictOptions();
  updateNeighborhoodOptions();
  renderSelectedRegionBrands();
  updateMapForSelectedRegion();
});

districtSelect.addEventListener("change", () => {
  selectedDistrict = districtSelect.value;
  selectedNeighborhood = "";

  updateNeighborhoodOptions();
  renderSelectedRegionBrands();
  updateMapForSelectedRegion();
});

neighborhoodSelect.addEventListener("change", () => {
  selectedNeighborhood =
    neighborhoodSelect.value;

  renderSelectedRegionBrands();
  updateMapForSelectedRegion();
});

regionResetButton.addEventListener("click", () => {
  selectedProvince = "";
  selectedCity = "";
  selectedDistrict = "";
  selectedNeighborhood = "";

  refreshRegionSelector();
});

/*
 * 기존 지도 전체 마커 출력 함수를 교체합니다.
 * 이제 지도에는 다수 마커를 그리지 않고,
 * 선택한 지역 한 곳만 표시합니다.
 */
renderMapRegions = async function() {
  clearMapOverlays();
  refreshRegionSelector();
};

/*
 * 카테고리 버튼을 누르면 지역 목록도 자동 재구성됩니다.
 */
mapFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTimeout(() => {
      selectedProvince = "";
      selectedCity = "";
      selectedDistrict = "";
      selectedNeighborhood = "";
      refreshRegionSelector();
    }, 0);
  });
});

refreshRegionSelector();

// HIERARCHICAL REGION SELECTOR END


// FAST REGION MAP START

/*
 * 정확한 주소 검색을 매번 호출하지 않고
 * 지역 중심 좌표를 바로 사용합니다.
 */
const fastRegionCoordinates = {
  "전국": [36.35, 127.8, 12],

  "서울": [37.5665, 126.9780, 9],
  "부산": [35.1796, 129.0756, 9],
  "대구": [35.8714, 128.6014, 9],
  "인천": [37.4563, 126.7052, 9],
  "광주": [35.1595, 126.8526, 9],
  "대전": [36.3504, 127.3845, 9],
  "울산": [35.5384, 129.3114, 9],
  "세종": [36.4800, 127.2890, 9],

  "경기": [37.4138, 127.5183, 10],
  "강원": [37.8228, 128.1555, 10],
  "충북": [36.6357, 127.4917, 10],
  "충남": [36.6588, 126.6728, 10],
  "전북": [35.7175, 127.1530, 10],
  "전남": [34.8679, 126.9910, 10],
  "경북": [36.4919, 128.8889, 10],
  "경남": [35.4606, 128.2132, 10],
  "제주": [33.4996, 126.5312, 10],

  "충남 홍성": [36.6012, 126.6608, 7],
  "충남 공주": [36.4465, 127.1190, 7],
  "충북 영동": [36.1750, 127.7764, 7],

  "경기 이천": [37.2720, 127.4350, 7],

  "강원 횡성": [37.4917, 127.9850, 7],
  "강원 평창": [37.3705, 128.3900, 7],
  "강원 강릉": [37.7519, 128.8761, 7],
  "강원 속초": [38.2070, 128.5918, 7],

  "경북 청도": [35.6474, 128.7340, 7],
  "경북 의성": [36.3527, 128.6971, 7],

  "경남 고성": [34.9730, 128.3220, 7],
  "경남 통영": [34.8544, 128.4330, 7],
  "경남 남해": [34.8377, 127.8926, 7],

  "전북 익산": [35.9483, 126.9576, 7],
  "전북 전주": [35.8242, 127.1480, 7],

  "전남 나주": [35.0158, 126.7108, 7],
  "전남 완도": [34.3110, 126.7550, 7],
  "전남 보성": [34.7715, 127.0800, 7]
};

let fastSelectedMarker = null;

function getFastRegionKey() {
  const values = [
    selectedProvince,
    selectedCity,
    selectedDistrict,
    selectedNeighborhood
  ].filter(Boolean);

  while (values.length > 0) {
    const key = values.join(" ");

    if (fastRegionCoordinates[key]) {
      return key;
    }

    values.pop();
  }

  return selectedProvince || "전국";
}

function moveMapImmediately() {
  if (!brandMap || !window.kakao?.maps) {
    return;
  }

  const key = getFastRegionKey();
  const info =
    fastRegionCoordinates[key] ||
    fastRegionCoordinates["전국"];

  const [latitude, longitude, level] = info;
  const position = new kakao.maps.LatLng(
    latitude,
    longitude
  );

  if (fastSelectedMarker) {
    fastSelectedMarker.setMap(null);
    fastSelectedMarker = null;
  }

  if (key !== "전국") {
    fastSelectedMarker = new kakao.maps.Marker({
      map: brandMap,
      position
    });
  }

  brandMap.setCenter(position);
  brandMap.setLevel(level);

  setTimeout(() => {
    brandMap.relayout();
    brandMap.setCenter(position);
  }, 80);
}

/*
 * 기존 주소 검색 기반 함수를 빠른 좌표 이동으로 교체합니다.
 */
updateMapForSelectedRegion = moveMapImmediately;

/*
 * 지도 생성 즉시 기본 지도를 먼저 보여줍니다.
 */
initializeBrandMap = function() {
  const container = document.querySelector("#brandMap");

  if (!container) {
    return;
  }

  if (!brandMap) {
    brandMap = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(36.35, 127.8),
      level: 12
    });

    if (
      kakao.maps.services &&
      kakao.maps.services.Geocoder
    ) {
      mapGeocoder = new kakao.maps.services.Geocoder();
    }
  }

  hideMapStatus();

  setTimeout(() => {
    brandMap.relayout();
    moveMapImmediately();
    refreshRegionSelector();
  }, 60);
};

/*
 * SDK 로딩이 끝없이 멈추는 상황 방지
 */
const originalLoadKakaoMapSdk = loadKakaoMapSdk;

loadKakaoMapSdk = function() {
  const timeoutId = setTimeout(() => {
    if (!brandMap) {
      showMapStatus(
        "지도를 불러오는 데 시간이 걸리고 있습니다.",
        "네트워크 상태를 확인한 뒤 새로고침해 주세요.",
        true
      );
    }
  }, 8000);

  originalLoadKakaoMapSdk();

  const waitForMap = setInterval(() => {
    if (brandMap) {
      clearTimeout(timeoutId);
      clearInterval(waitForMap);
    }
  }, 100);
};

// FAST REGION MAP END

renderNewBrands();
renderSubcategories();
renderBrandGrid();
