# 합성 카메라

폰 카메라로 같은 곳을 연달아 여러 장 찍어 한 장으로 합치는 웹앱. 잡음이 줄고(오래 노출한 효과) 손떨림의 미세한 어긋남으로 해상도를 올림.
계산은 모두 기기 안에서 하고 사진은 어디에도 보내지 않음 (서버 없음).

- 주소: https://dlwjdskfcl.github.io/stack-camera/ (크롬 메뉴 → 홈 화면에 추가)
- `index.html` 화면 · `stack.js` 계산(위치 맞춤 → 쌓기 → 그리기) · `sw.js` 오프라인 · `manifest.webmanifest` + 아이콘
- 바꾸면 `stack.js` 의 `VER` 과 `index.html` 의 `stack.js?v=` 를 같이 올림
