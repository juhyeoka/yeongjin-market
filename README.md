# 영진마켓

지역 브랜드의 대표 상품과 브랜드 스토리를 소개하는 모바일 우선 정적 사이트입니다.

## 현재 구성

- 메인에는 한 번에 하나의 대표 브랜드만 소개합니다.
- 입점 브랜드가 2개 이상이면 페이지를 새로 열 때마다 대표 브랜드와 나머지 카드 순서가 무작위로 정해집니다.
- 화면이 열린 뒤에는 순서가 다시 바뀌지 않아 이용 중에 카드가 움직이지 않습니다.
- 각 업체는 독립적인 상세 주소(`/brands/<slug>/`)와 검색용 메타 정보를 가집니다.
- 전화번호가 없는 업체는 전화 버튼이 비활성화되며 임의 번호를 표시하지 않습니다.

## 새 업체 추가

터미널에서 실행:

```bash
cd /Users/jungjuhyeok/yeongjin
./create-brand.sh
```

질문에 따라 업체 정보를 입력하면 아래 파일이 자동으로 생성·갱신됩니다.

```text
data/brands/<slug>.json
data/brands/index.json
brands/<slug>/index.html
sitemap.xml
```

업체가 준 원본 사진은 다음 위치에 넣습니다.

```text
assets/brands/<slug>/main.jpg
assets/brands/<slug>/story-1.jpg
assets/brands/<slug>/story-2.jpg
```

데이터 형식 참고 파일:

```text
data/brands/brand.example.json
```

기존 데이터로 페이지와 사이트맵만 다시 만들기:

```bash
python3 scripts/create_brand.py --build-all
```

## 검색 노출

- `robots.txt`: 모든 공개 페이지 수집 허용
- `sitemap.xml`: 메인과 공개 브랜드 상세 페이지 등록
- 각 페이지에 canonical, Open Graph, Product 구조화 데이터 제공

네이버 노출 현황을 직접 확인하려면 배포 후 네이버 서치어드바이저에
`https://yeongjin-market.onrender.com`을 등록하고 `sitemap.xml`을 제출합니다.

## 로컬 확인

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.

## 배포

`main` 브랜치에 푸시하면 Render의 `yeongjin-market` 정적 사이트가 자동 배포됩니다.
