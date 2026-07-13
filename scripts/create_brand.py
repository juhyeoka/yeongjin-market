#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import re
import sys
from html import escape
from pathlib import Path
from urllib.parse import urlparse

import qrcode


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data" / "brands"
ASSET_DIR = BASE_DIR / "assets" / "brands"
PAGE_DIR = BASE_DIR / "brands"
QR_DIR = BASE_DIR / "qrcodes"


CATEGORY_MAP = {
    "농산": "agriculture",
    "축산": "livestock",
    "수산": "seafood",
    "카페": "cafe",
}


def ask(label: str, default: str = "", required: bool = False) -> str:
    while True:
        default_text = f" [{default}]" if default else ""
        value = input(f"{label}{default_text}: ").strip()

        if not value:
            value = default

        if required and not value:
            print("필수 입력값입니다.")
            continue

        return value


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9가-힣_-]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")

    if not value:
        raise ValueError("slug를 만들 수 없습니다.")

    return value


def validate_url(value: str) -> str:
    if not value:
        return ""

    parsed = urlparse(value)

    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError(f"올바르지 않은 URL입니다: {value}")

    return value


def build_detail_html(brand: dict) -> str:
    name = escape(brand["name"])
    category = escape(brand["category"])
    region = escape(brand["region"])
    product = escape(brand["product"])
    headline = escape(brand["headline"])
    description = escape(brand["description"])
    main_image = escape(brand["images"]["main"])

    shop_url = escape(brand.get("shopUrl", ""))
    homepage_url = escape(brand.get("homepageUrl", ""))
    trace_url = escape(brand.get("traceUrl", ""))

    buttons = []

    if trace_url:
        buttons.append(
            f'''
            <a class="action trace" href="{trace_url}" target="_blank"
               rel="noopener noreferrer">
              농장 상태 확인
              <span>→</span>
            </a>
            '''
        )

    if shop_url:
        buttons.append(
            f'''
            <a class="action shop" href="{shop_url}" target="_blank"
               rel="noopener noreferrer">
              스마트스토어에서 구매
              <span>→</span>
            </a>
            '''
        )

    if homepage_url:
        buttons.append(
            f'''
            <a class="action homepage" href="{homepage_url}" target="_blank"
               rel="noopener noreferrer">
              공식 홈페이지 보기
              <span>→</span>
            </a>
            '''
        )

    if not buttons:
        buttons.append(
            '''
            <div class="disabled">
              공식 판매 링크를 준비하고 있습니다.
            </div>
            '''
        )

    button_html = "\n".join(buttons)

    return f'''<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, viewport-fit=cover"
  >
  <meta name="theme-color" content="#ffffff">
  <title>{name} | 영진마켓</title>

  <style>
    * {{
      box-sizing: border-box;
    }}

    html {{
      -webkit-text-size-adjust: 100%;
    }}

    body {{
      margin: 0;
      color: #172330;
      background: #f2f4f5;
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Apple SD Gothic Neo",
        "Noto Sans KR",
        sans-serif;
    }}

    img {{
      display: block;
      width: 100%;
    }}

    a {{
      color: inherit;
    }}

    .page {{
      width: min(100%, 720px);
      min-height: 100vh;
      margin: 0 auto;
      padding: 18px 18px 45px;
      background: #ffffff;
    }}

    .header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 58px;
    }}

    .back {{
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      font-size: 23px;
      text-decoration: none;
      background: #f4f5f6;
      border-radius: 50%;
    }}

    .header strong {{
      font-size: 20px;
      font-weight: 900;
    }}

    .header-space {{
      width: 44px;
    }}

    .hero {{
      position: relative;
      height: 470px;
      overflow: hidden;
      background:
        linear-gradient(145deg, #fff8dd, #ebdeaf);
      border-radius: 27px;
    }}

    .hero img {{
      height: 100%;
      object-fit: cover;
    }}

    .hero::after {{
      position: absolute;
      inset: 0;
      content: "";
      background:
        linear-gradient(
          180deg,
          transparent 40%,
          rgba(10, 22, 34, 0.78) 100%
        );
    }}

    .hero-copy {{
      position: absolute;
      right: 27px;
      bottom: 27px;
      left: 27px;
      z-index: 2;
      color: #ffffff;
    }}

    .badge {{
      display: inline-flex;
      margin-bottom: 11px;
      padding: 7px 11px;
      color: #172330;
      font-size: 11px;
      font-weight: 900;
      background: rgba(255, 255, 255, 0.94);
      border-radius: 999px;
    }}

    .hero h1 {{
      margin: 0 0 7px;
      font-size: 38px;
      font-weight: 900;
      letter-spacing: -2px;
    }}

    .hero p {{
      margin: 0;
      color: rgba(255, 255, 255, 0.87);
      font-size: 14px;
      font-weight: 700;
    }}

    .intro {{
      padding: 34px 3px;
      border-bottom: 1px solid #e8eaec;
    }}

    .label {{
      margin: 0 0 9px;
      color: #f24d42;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 1.8px;
    }}

    .intro h2 {{
      margin: 0 0 17px;
      font-size: 28px;
      font-weight: 900;
      line-height: 1.45;
      letter-spacing: -1.4px;
    }}

    .intro > p:last-child {{
      margin: 0;
      color: #66717b;
      font-size: 14px;
      line-height: 1.9;
    }}

    .information {{
      margin-top: 25px;
      overflow: hidden;
      border: 1px solid #e7e9eb;
      border-radius: 20px;
    }}

    .row {{
      display: grid;
      grid-template-columns: 105px 1fr;
      gap: 18px;
      min-height: 58px;
      padding: 14px 18px;
      border-bottom: 1px solid #eceeef;
    }}

    .row:last-child {{
      border-bottom: 0;
    }}

    .row span {{
      color: #8a929a;
      font-size: 12px;
    }}

    .row strong {{
      font-size: 13px;
      font-weight: 800;
    }}

    .actions {{
      display: grid;
      gap: 11px;
      margin-top: 23px;
    }}

    .action,
    .disabled {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 58px;
      padding: 15px 19px;
      font-size: 14px;
      font-weight: 900;
      text-decoration: none;
      border-radius: 18px;
    }}

    .trace {{
      color: #ffffff;
      background: #1b7d4a;
    }}

    .shop {{
      color: #ffffff;
      background: #03c75a;
    }}

    .homepage {{
      color: #ffffff;
      background: #172330;
    }}

    .disabled {{
      justify-content: center;
      color: #8b9298;
      background: #eceeef;
    }}

    .notice {{
      margin-top: 19px;
      padding: 18px;
      color: #737b83;
      font-size: 11px;
      line-height: 1.7;
      background: #f6f7f8;
      border-radius: 17px;
    }}

    @media (max-width: 600px) {{
      .page {{
        padding: 13px 14px 35px;
      }}

      .hero {{
        height: 365px;
        border-radius: 23px;
      }}

      .hero-copy {{
        right: 21px;
        bottom: 22px;
        left: 21px;
      }}

      .hero h1 {{
        font-size: 30px;
      }}

      .intro {{
        padding: 29px 2px;
      }}

      .intro h2 {{
        font-size: 23px;
      }}

      .row {{
        grid-template-columns: 85px 1fr;
      }}
    }}
  </style>
</head>

<body>
  <main class="page">
    <header class="header">
      <a class="back" href="../../index.html" aria-label="영진마켓 홈">
        ←
      </a>

      <strong>{name}</strong>
      <div class="header-space"></div>
    </header>

    <section class="hero">
      <img
        src="../../{main_image}"
        alt="{name} 대표 이미지"
        onerror="
          this.style.display='none';
          this.parentElement.style.background=
          'linear-gradient(145deg,#fff8dd,#ebdeaf)';
        "
      >

      <div class="hero-copy">
        <span class="badge">{category} · {product}</span>
        <h1>{name}</h1>
        <p>{region}</p>
      </div>
    </section>

    <section class="intro">
      <p class="label">BRAND STORY</p>
      <h2>{headline}</h2>
      <p>{description}</p>
    </section>

    <section class="information">
      <div class="row">
        <span>브랜드</span>
        <strong>{name}</strong>
      </div>

      <div class="row">
        <span>분류</span>
        <strong>{category} · {product}</strong>
      </div>

      <div class="row">
        <span>지역</span>
        <strong>{region}</strong>
      </div>
    </section>

    <section class="actions">
      {button_html}
    </section>

    <div class="notice">
      상품 가격, 배송, 교환 및 환불은 연결되는 각 업체의
      공식 판매처 정책을 기준으로 합니다.
    </div>
  </main>
</body>
</html>
'''


def update_brand_index() -> None:
    brands = []

    for json_file in sorted(DATA_DIR.glob("*.json")):
        if json_file.name == "index.json":
            continue

        try:
            data = json.loads(json_file.read_text(encoding="utf-8"))
            brands.append(data)
        except Exception as error:
            print(f"경고: {json_file.name} 읽기 실패: {error}")

    index_path = DATA_DIR / "index.json"
    index_path.write_text(
        json.dumps(brands, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def make_qr(url: str, output_path: Path) -> None:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=4,
    )

    qr.add_data(url)
    qr.make(fit=True)

    image = qr.make_image(
        fill_color="black",
        back_color="white",
    )

    image.save(output_path)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="영진마켓 업체 페이지와 QR을 자동 생성합니다."
    )

    parser.add_argument(
        "--base-url",
        default="https://yeongjin-market.onrender.com",
        help="배포된 영진마켓 기본 주소",
    )

    parser.add_argument(
        "--non-interactive",
        action="store_true",
        help="대화형 입력을 사용하지 않음",
    )

    parser.add_argument("--slug")
    parser.add_argument("--name")
    parser.add_argument("--category")
    parser.add_argument("--product")
    parser.add_argument("--region")
    parser.add_argument("--headline")
    parser.add_argument("--description")
    parser.add_argument("--shop-url", default="")
    parser.add_argument("--homepage-url", default="")
    parser.add_argument("--trace-url", default="")

    args = parser.parse_args()

    for directory in (
        DATA_DIR,
        ASSET_DIR,
        PAGE_DIR,
        QR_DIR,
    ):
        directory.mkdir(parents=True, exist_ok=True)

    if args.non_interactive:
        required = {
            "slug": args.slug,
            "name": args.name,
            "category": args.category,
            "product": args.product,
            "region": args.region,
            "headline": args.headline,
            "description": args.description,
        }

        missing = [
            key for key, value in required.items()
            if not value
        ]

        if missing:
            print(
                "필수 인자가 없습니다:",
                ", ".join(missing),
                file=sys.stderr,
            )
            return 1

        raw_slug = args.slug
        name = args.name
        category = args.category
        product = args.product
        region = args.region
        headline = args.headline
        description = args.description
        shop_url = args.shop_url
        homepage_url = args.homepage_url
        trace_url = args.trace_url

    else:
        print()
        print("====================================")
        print(" 영진마켓 신규 업체 자동 생성")
        print("====================================")
        print()

        name = ask("업체명", required=True)
        raw_slug = ask(
            "업체 영문 주소",
            default=slugify(name),
            required=True,
        )

        category = ask(
            "카테고리(농산/축산/수산/카페)",
            default="농산",
            required=True,
        )

        product = ask("주요 상품", required=True)
        region = ask("지역", required=True)
        headline = ask("한 줄 소개", required=True)
        description = ask("상세 설명", required=True)

        shop_url = ask("스마트스토어 주소")
        homepage_url = ask("공식 홈페이지 주소")
        trace_url = ask("농장 추적 또는 상태 확인 주소")

    slug = slugify(raw_slug)

    if category not in CATEGORY_MAP:
        print(
            "카테고리는 농산, 축산, 수산, 카페 중 하나여야 합니다.",
            file=sys.stderr,
        )
        return 1

    try:
        shop_url = validate_url(shop_url)
        homepage_url = validate_url(homepage_url)
        trace_url = validate_url(trace_url)
        base_url = validate_url(args.base_url.rstrip("/"))
    except ValueError as error:
        print(error, file=sys.stderr)
        return 1

    brand_asset_dir = ASSET_DIR / slug
    brand_page_dir = PAGE_DIR / slug

    brand_asset_dir.mkdir(parents=True, exist_ok=True)
    brand_page_dir.mkdir(parents=True, exist_ok=True)

    main_image_relative = f"assets/brands/{slug}/main.jpg"

    public_url = f"{base_url}/brands/{slug}/"

    brand = {
        "slug": slug,
        "name": name,
        "category": category,
        "categoryKey": CATEGORY_MAP[category],
        "product": product,
        "region": region,
        "headline": headline,
        "description": description,
        "shopUrl": shop_url,
        "homepageUrl": homepage_url,
        "traceUrl": trace_url,
        "publicUrl": public_url,
        "qrImage": f"qrcodes/{slug}.png",
        "images": {
            "main": main_image_relative,
            "gallery": [
                f"assets/brands/{slug}/gallery-1.jpg",
                f"assets/brands/{slug}/gallery-2.jpg",
                f"assets/brands/{slug}/gallery-3.jpg",
            ],
        },
    }

    brand_json_path = DATA_DIR / f"{slug}.json"
    brand_json_path.write_text(
        json.dumps(brand, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    detail_html = build_detail_html(brand)

    detail_page_path = brand_page_dir / "index.html"
    detail_page_path.write_text(
        detail_html,
        encoding="utf-8",
    )

    qr_path = QR_DIR / f"{slug}.png"
    make_qr(public_url, qr_path)

    image_guide = brand_asset_dir / "README.txt"
    image_guide.write_text(
        f"""[{name} 이미지 넣는 위치]

대표 이미지:
main.jpg

추가 사진:
gallery-1.jpg
gallery-2.jpg
gallery-3.jpg

권장 크기:
- 대표 이미지: 1200 x 1200 이상
- 추가 이미지: 가로 1200px 이상
- JPG 또는 PNG
""",
        encoding="utf-8",
    )

    update_brand_index()

    print()
    print("====================================")
    print(" 업체 생성 완료")
    print("====================================")
    print(f"업체명:       {name}")
    print(f"업체 주소:    {public_url}")
    print(f"JSON:         {brand_json_path}")
    print(f"상세페이지:   {detail_page_path}")
    print(f"이미지 폴더:  {brand_asset_dir}")
    print(f"QR 코드:      {qr_path}")
    print()
    print("대표 사진을 아래 이름으로 넣으세요.")
    print(f"  {brand_asset_dir / 'main.jpg'}")
    print()
    print("배포 명령:")
    print("  git add .")
    print(f'  git commit -m "Add {name} brand page"')
    print("  git push")
    print()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
