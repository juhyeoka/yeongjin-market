# 로컬온 홈페이지

지역 농산·축산·수산·건강·카페 브랜드를 큐레이션하는 반응형 정적 홈페이지입니다.

## 구성

- `index.html`: 메인 화면
- `styles.css`: 전체 디자인 및 반응형 스타일
- `app.js`: 카테고리/지역/검색 필터와 UI 동작
- `render.yaml`: Render Blueprint 배포 설정
- `assets/favicon.svg`: 파비콘

## 로컬 확인

파일을 직접 열어도 되지만, 아래처럼 간단한 서버로 확인하는 것을 권장합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속

## Render 배포

1. 이 폴더의 파일을 GitHub 저장소에 업로드합니다.
2. Render에서 **New > Static Site**를 선택합니다.
3. GitHub 저장소를 연결합니다.
4. 수동 설정 시:
   - Build Command: `echo "Static site ready"`
   - Publish Directory: `.`
5. 또는 저장소의 `render.yaml`을 이용해 Blueprint로 배포합니다.

## 이미지 교체

현재 이미지는 외부 샘플 이미지입니다. `app.js`의 각 브랜드 `image` 주소와 `index.html`의 히어로/스토리 이미지 주소를 실제 생성 이미지 또는 자체 파일 경로로 교체하면 됩니다.
