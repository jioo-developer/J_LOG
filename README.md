# 벨로그 클론코딩

<br />

본 프로젝트는 사이트 기획과 디자인 기간 단축을 위해 클론코딩으로 이루어져 있으며 다음과 같은 기술들을 사용합니다.

- 개발 언어 : Typescript & React
- 개발 환경 : Next.js 14
- UI 스타일링 : emotion & SCSS
- 컴포넌트 관리 : Storybook
- library : react-hook-form, mutarial-ui(skeleton)
- 클라이언트 상태관리 : zustand
- 서버 상태관리 : React Query
- 사용 DB : Firebase
- API : Next.js Api Route
- 테스트 : Jest + RTL
- e2e 테스트 : cypress (진행중)
- 형상관리 : github
- 배포 : vercel
  <br />
  <br />

## Preview

  <img src="./public/images/preview.jpg" alt="" />

## directory tree

📦 src<br />
├── 📂 test # jest로 만들어진 테스트 코드가 있습니다. (e2e 테스트를 제외한 테스트가 이루어집니다)<br />
<br />
├── 📂 apis # API 요청을 보내는 코드입니다<br />
│ ├── 📄 api handler # api 요청을 하는 handler 입니다.<br />
│ ├── 📄 mutation # api요청을 관리하고 onSuccess와 onError를 담당합니다.<br />
│ └── 📄 query hook # react-query의 useQuery를 hook으로 만들어 사용합니다.<br />
<br />
├── 📂 asset # 공용으로 사용하는 css와 scss 등이 있습니다.<br />
<br />
├── 📂 app # 프로젝트의 Page가 있는 곳 입니다.<br />
│ ├── 📂 @modal #page를 모달 팝업으로 사용 할 수 있도록 하는 인터셉팅 라우팅 역할을 합니다<br />
│ ├── 📂 api # API route가 저장된 곳 입니다.<br />
│ │ ├── 📄 route.ts # api 요청에 대한 response를 return 합니다<br />
│ ├── 📂 page # 각 페이지의 파일이 있습니다<br />
│ │ ├── 📄 page.tsx # react-query의 prefetch를 담당하는 서버컴포넌트와 seo 함수가 있습니다.<br />
│ │ ├── 📄 Client.tsx # 파일에 useClient가 선언되며 파일의 전반적인 UI와 함수로직이 존재합니다.<br />
│ │ ├── 📄 style.(scss || ts) # page의 스타일을 구성하는 scss 파일 입니다.<br />
│ │ ├── 📂 useActions # 페이지의 Hook이 저장된 곳 입니다.<br />
│ │ ├── 📂 components # 페이지의 component가 저장된 곳 입니다.<br />
<br />
├── 📂 components # 프로젝트에서 공용으로 사용하는 components를 저장하는 곳 입니다.<br />
│ ├── 📂 atoms # 가장 작은 단계의 공용 컴포넌트를 저장하는 곳 입니다.<br />
│ │ ├── 📂 (component) # input,checkbox,button,popup,,image 등이 존재합니다.<br />
│ │ │ ├── 📄 component.tsx<br />
│ │ │ ├── 📄 component.stories.tsx<br />
│ │ │ ├── 📄 style.ts # component의 스타일을 구성하는 emotion 파일 입니다.<br />
<br />
├── 📂 lib # 라이브러리에 관련된 파일을 저장하는 곳 입니다.<br />
├── 📂 provider #Provider 파일을 저장하는 곳 입니다.</br >
├── 📂 static # 정적 파일 (상수로 선언되는 변수들을 저장하는 곳 입니다)<br />
├── 📂 store # 클라이언트로 사용되는 상태를 전역으로 관리 하는 곳 입니다.<br />
├── 📂 utils # 유틸리티 함수를 저장하는 곳 입니다.<br />
└── 📄 middleware.ts # Next.js 자체 middleware로 로그인 토큰 쿠키에 존재 여부에 따라 redirect를 담당합니다.

### 📌 주요기능

- 로그인/회원가입/SNS로그인/비밀번호 찾기
- 게시글 노출/게시글 검색/게시글 작성/댓글작성/좋아요 기능
- 게시글 수정&삭제/이미지추가&수정&삭제
- 마이페이지,내 작성글 보기
- 프로필변경/닉네임변경/회원탈퇴
- 아이템 구매 & 사용

## 트러블 슈팅 사례

## 📌 로그인 프로세스

1. **ID/PW 입력**
2. **로그인 API 요청**
3. **로그인 성공 시, HTTPOnly 쿠키 생성 (1시간 유효)**
4. **자동 로그인 유지**

### 🧑🏻‍💻 구현 시 기억에 남는 점

- form 입력시 id(state),pw(state)가 존재해야하지만 react-hook-form을 도입하여 불필요한 state를 제거
- Firebase를 이용하여 로그인할 경우, 기본적으로 로그인 정보가 `localStorage`에 저장됨.
- `localStorage`에 저장된 로그인 정보는 삭제 전까지 유지되지만, 보안 강화를 위해 `localStorage`에 저장하는 것이<br />아닌 쿠키를 발급하여 저장하고 일정 시간이 지나면 자동 로그아웃되도록 설계.
- 이를 위해 `HTTPOnly 쿠키`를 생성하여 1시간 동안 유효하게 유지하며, 쿠키가 삭제되면 자동 로그아웃되도록 구현함.
- Next.js에선 새로고침을 하거나 페이지를 나가면 다시 페이지에 접근 할 때 새로 getServerSide를 실행하는 데<br />
  파이어베이스의 로그인 상태를 체크하는 함수는 클라이언트에서 밖에 사용 할 수 없음. 그래서 재 진입시<br />login 상태를 null로 지정되는데 이때 쿠키에 저장한 토큰 값을 불러와 재인증하여 로그인 정보를 가져와 자동 로그인 구현

## 📌 좋아요 기능 프로세스

1. **좋아요는 게시글 당 1개만 가능**
2. **좋아요 선택/취소 토글 반영**

### 🧑🏻‍💻 구현 시 기억에 남는 점

- 사실 좋아요 선택/취소 토글 만들기는 쉬웠는데 게시글당 1개의 좋아요를 어떻게 인식해서 페이지 정보에 가져 올 지 고민
- firebase는 페이지(document)에 데이터를 남길수 있고 document 안에 또 컬렉션 이란 db를 만들 수 있음<br /> 원랜 페이지에 해당하는 reply이란 DB를 만들었었는데 좋아요 DB를 추가해서 사용자의 uid를 남기고 페이지에<br />접속했을 때 그것을 불러와 **유저의 uid와 기록된 uid들 중 비교해서 존재하면 좋아요 버튼을 disable 처리 함**
