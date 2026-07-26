const menuButton = document.querySelector("#menuButton");
const mobileMenu = document.querySelector("#mobileMenu");
const mobileMenuLinks = document.querySelectorAll("#mobileMenu a");
const bottomNavigationItems = document.querySelectorAll(
  ".bottom-navigation-item"
);
const contactCall = document.querySelector("#contactCall");
const brandDirectory = document.querySelector("#brandDirectory");
const brandDirectoryGrid = document.querySelector("#brandDirectoryGrid");

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

function activateBottomNavigation(sectionId) {
  bottomNavigationItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.section === sectionId);
  });
}

const observedSections = ["product", "story", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ("IntersectionObserver" in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        activateBottomNavigation(visibleEntry.target.id);
      } else if (window.scrollY < 240) {
        activateBottomNavigation("top");
      }
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0, 0.15, 0.35]
    }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY < 240) {
      activateBottomNavigation("top");
    }
  },
  { passive: true }
);

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

function getRandomFeaturedBrand(brands) {
  return brands[randomInteger(brands.length)];
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined && value !== null && value !== "") {
    element.textContent = value;
  }
}

function setImage(selector, source, alt) {
  const image = document.querySelector(selector);
  if (!image || !source) {
    return;
  }

  image.src = source;
  image.alt = alt;
}

function setOptionalLink(selector, url) {
  const link = document.querySelector(selector);
  if (!link) {
    return;
  }

  if (!url) {
    link.hidden = true;
    link.removeAttribute("href");
    return;
  }

  link.hidden = false;
  link.href = url;
}

function getStoreLabel(url) {
  return url?.includes("smartstore.naver.com")
    ? "네이버 스마트스토어"
    : "공식 판매처";
}

function configureContactButton(phoneValue = "") {
  if (!contactCall) {
    return;
  }

  const phone = String(phoneValue).replace(/[^\d+]/g, "");
  const buttonCopy = contactCall.querySelector(".contact-call-copy strong");
  const buttonStatus = contactCall.querySelector(".contact-call-status");

  contactCall.onclick = null;
  contactCall.dataset.phone = phoneValue;
  contactCall.classList.toggle("is-ready", Boolean(phone));
  contactCall.setAttribute("aria-disabled", String(!phone));

  if (!phone) {
    if (buttonCopy) {
      buttonCopy.textContent = "전화 문의 준비 중";
    }
    if (buttonStatus) {
      buttonStatus.textContent = "연락처 등록 대기";
    }
    return;
  }

  if (buttonCopy) {
    buttonCopy.textContent = phoneValue;
  }
  if (buttonStatus) {
    buttonStatus.textContent = "바로 통화";
  }

  contactCall.onclick = () => {
    window.location.href = `tel:${phone}`;
  };
}

function renderStoryGallery(selector, image, brandName, sequence) {
  const container = document.querySelector(selector);
  if (!container || !image) {
    return;
  }

  container.classList.add("has-image");
  container.innerHTML = `
    <img
      src="${escapeHtml(image)}"
      alt="${escapeHtml(brandName)} 브랜드 스토리 사진 ${sequence}"
      loading="lazy"
    >
    <span class="placeholder-number">${String(sequence + 1).padStart(2, "0")}</span>
    <div class="story-gallery-caption">
      <p>${escapeHtml(brandName)} 브랜드 이야기</p>
      <small>업체 제공 사진</small>
    </div>
  `;
}

function renderFeaturedBrand(brand) {
  const image =
    brand.images?.main || "/assets/brands/brand-placeholder.svg";
  const productName = `${brand.name} ${brand.product}`.trim();
  const quantity = brand.quantity || "상품 구성은 공식 판매처에서 확인";
  const storyTitle = brand.storyTitle || "브랜드가 지키는 가치";
  const storyDescription = brand.storyDescription || brand.description;

  setText("#heroBrandMark", brand.name.slice(0, 4));
  const summary = document.querySelector("#heroBrandSummary");
  if (summary) {
    summary.innerHTML = `
      <strong>이번에 만난 브랜드</strong>
      ${escapeHtml(brand.region)} · ${escapeHtml(brand.product)}
    `;
  }

  setImage(
    "#heroBrandImage",
    image,
    `${brand.name} ${brand.product} 대표 상품`
  );
  setText("#heroBrandName", productName);
  setImage(
    "#productBrandImage",
    image,
    `${brand.name} ${brand.product} 상품`
  );
  setText("#productBrandStamp", brand.name.slice(0, 4));

  const labels = document.querySelector("#productLabels");
  if (labels) {
    labels.innerHTML = [brand.region, brand.category, brand.product]
      .filter(Boolean)
      .map((value) => `<span>${escapeHtml(value)}</span>`)
      .join("");
  }

  setText("#productBrandName", brand.name);
  setText("#productHeadline", brand.headline);
  setText("#productDescription", brand.description);
  setText("#productFactName", productName);
  setText("#productFactQuantity", quantity);
  setText("#productFactRegion", brand.region);
  setText("#productShopLabel", getStoreLabel(brand.shopUrl));

  setOptionalLink("#headerShopLink", brand.shopUrl);
  setOptionalLink("#productShopLink", brand.shopUrl);
  setOptionalLink("#productTraceLink", brand.traceUrl);
  setOptionalLink("#heroHomepageLink", brand.homepageUrl);
  setOptionalLink("#informationShopLink", brand.shopUrl);
  setOptionalLink("#informationTraceLink", brand.traceUrl);
  setOptionalLink("#informationHomepageLink", brand.homepageUrl);

  setText("#storyTitleAccent", storyTitle);
  setText("#storyDescription", storyDescription);
  setImage(
    "#storyMainImage",
    image,
    `${brand.name} ${brand.product} 브랜드 사진`
  );
  setText("#storyCaptionTitle", `${brand.name}에 담긴 브랜드의 약속`);
  setText("#storyCaptionDescription", brand.headline);

  const gallery = brand.images?.gallery || [];
  renderStoryGallery("#storyGalleryOne", gallery[0], brand.name, 1);
  renderStoryGallery("#storyGalleryTwo", gallery[1], brand.name, 2);
  configureContactButton(brand.phone || "");
}

function renderAdditionalBrands(brands, selectedBrand) {
  if (!brandDirectory || !brandDirectoryGrid) {
    return;
  }

  const additionalBrands = shuffled(
    brands.filter((brand) => brand.slug !== selectedBrand.slug)
  );

  if (!additionalBrands.length) {
    brandDirectory.hidden = true;
    return;
  }

  brandDirectoryGrid.innerHTML = additionalBrands
    .map((brand, index) => {
      const image =
        brand.images?.main || "/assets/brands/brand-placeholder.svg";
      const detailUrl = brand.publicUrl || `/brands/${brand.slug}/`;

      return `
        <article class="directory-card">
          <a class="directory-card-image" href="${escapeHtml(detailUrl)}">
            <img
              src="${escapeHtml(image)}"
              alt="${escapeHtml(brand.name)} ${escapeHtml(brand.product)}"
              loading="lazy"
            >
            <span>${String(index + 2).padStart(2, "0")}</span>
          </a>
          <div class="directory-card-copy">
            <p>${escapeHtml(brand.region)} · ${escapeHtml(brand.category)}</p>
            <h3>
              <a href="${escapeHtml(detailUrl)}">
                ${escapeHtml(brand.name)}
              </a>
            </h3>
            <span>${escapeHtml(brand.headline)}</span>
          </div>
        </article>
      `;
    })
    .join("");

  brandDirectory.hidden = false;
}

configureContactButton();

fetch("/data/brands/index.json", { cache: "no-cache" })
  .then((response) => {
    if (!response.ok) {
      throw new Error("브랜드 목록을 불러오지 못했습니다.");
    }
    return response.json();
  })
  .then((brands) => {
    const publishedBrands = brands.filter(
      (brand) => brand.published !== false
    );

    if (!publishedBrands.length) {
      return;
    }

    const selectedBrand = getRandomFeaturedBrand(publishedBrands);
    renderFeaturedBrand(selectedBrand);
    renderAdditionalBrands(publishedBrands, selectedBrand);
  })
  .catch((error) => {
    console.warn(error.message);
  });
