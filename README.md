# 벨로그 클론코딩

<br />

본 프로젝트는 사이트 기획과 디자인 기간 단축을 위해 클론코딩으로 이루어져 있으며 다음과 같은 기술들을 사용합니다.

- 개발 언어 : Typescript & React
- 개발 환경 : Next.js 14
- UI 스타일링 : emotion & SCSS
- 컴포넌트 관리 : Storybook
- 클라이언트 상태관리 : zustand
- 서버 상태관리 : React Query
- 사용 DB : Firebase
- API : Next.js Api Route
- 테스트 : Jest + RTL
- 형상관리 : github
- 배포 : vercel
  <br />
  <br />

## Preview

  <img src="./public/images/preview.jpg" alt="" />

## directory tree

📦 src<br />
├── 📂 test # jest로 만들어진 테스트 코드가 있습니다.<br />
├── 📂 apis # API 요청을 보내는 코드입니다
(한 디렉터리당 handler와 mutation로 이루어져 있습니다)<br />
├── 📂 app # 애플리케이션 관련 코드<br />
├── 📂 asset # 이미지, 폰트 등 정적 자산<br />
├── 📂 components # 재사용 가능한 컴포넌트<br />
├── 📂 lib # 라이브러리, 유틸 함수<br />
├── 📂 provider # Context 및 전역 상태 관리</br >
├── 📂 static # 정적 파일<br />
├── 📂 store # Zustand 상태 관리<br />
├── 📂 utils # 유틸리티 함수<br />
└── 📄 middleware.ts # Next.js 미들웨어
