#!/bin/bash

set -e

cd "$(dirname "$0")"

if [ ! -x ".venv-tools/bin/python" ]; then
  echo "도구용 가상환경을 생성합니다."
  python3 -m venv .venv-tools
  .venv-tools/bin/python -m pip install --upgrade pip
  .venv-tools/bin/python -m pip install qrcode pillow
fi

DEFAULT_RENDER_URL="https://yeongjin-market.onrender.com"

echo ""
read -r -p "현재 영진마켓 주소 [$DEFAULT_RENDER_URL]: " SITE_URL

if [ -z "$SITE_URL" ]; then
  SITE_URL="$DEFAULT_RENDER_URL"
fi

.venv-tools/bin/python scripts/create_brand.py \
  --base-url "$SITE_URL"
