# Blog Frontend
---
## Chapter
1. TS + React + Nextjs
    - Install Packages
    - Nextjs Structure
    - TS + React
    - React Policy
2. CodeStyle(Eslint, Prettier, VSC, Naming)
    - ESLint
    - Prettier
    - VSC
    - Naming
3. Testing(jest, react-testing-library, cypress)
4. Routing(Nextjs)
5. Bundler(Babel, Webpack, next.config.js)
6. DataContainer(Redux, Redux Saga)
7. PWA(ServiceWorker, Web Notification, Install App, IndexedDB, CacheAPI, Nextjs)
8. AMP(GoogleCodelab, Nextjs)
9. SEO(schema.org, robots.txt, sitemap.xml, Nextjs)
10. SSR,CSR,SPA(Nextjs)
11. Figma
12. Storybook
13. CSS In Js(emotion)
14. 2d DataVisual(D3)
15. Accessibility
16. UIUX
17. Responsive
18. AppShell
19. CrossBrowser
20. Performance
21. Security
22. AWS
23. Devops
---
## 1. TS + React + Nextjs
1. Install Packages
    - npm init -y
    - npm i react react-dom next
    - package.json scripts 수정
    - touch tsconfig.json
    - mkdir pages
    - cd pages
    - touch index.tsx
    - npm run dev
    - npm install --save-dev typescript @types/react @types/node
    - localhost:3000 접속
2. Nextjs Setting & Policy
    - **Folder Structure**
        - /node_modules
        - /.next
        - /components
        - /hooks
        - /interfaces
        - /pages
            - index.tsx
            - _app.tsx
            - _document.tsx
            - _error.tsx
            - 404.tsx
        - /public
        - /store
        - /styles
        - /utils
        - package.json
        - package-lock.json
        - tsconfig.json
        - next-env.d.ts
        - .gitignore
        - .env.local
    - **pages**
        1. pages directory의 각 page는 file name에 따라 route와 연결됨
            - /pages/about.tsx -> localhost:3000/about
        2. Dynamic Routes 지원
            - /pages/post/[id].tsx -> localhost:3000/post/2
        3. Pre-Rendering
            - 기본적으로 Nextjs는 모든 페이지를 사전렌더링함.
            - 각 페이지에 대한 HTML 미리 생성해 SEO와 성능을 향상시킴
            - 생성된 페이지 로드 -> 필요한 JavaScript 코드 실행 -> 상호작용
            - 두가지 형태(정적 생성, 서버 측 렌더링)로 Hybrid App을 만들수 있음
            - 정적 생성, 서버 측 렌더링과 함께 클라이언트 측 렌더링을 사용할 수도 있음(페이지 일부는 클라이언트에서 JavaScript로 렌더링, Data Fetching)
        4. Pre-Rendering1 (Static Generation)
            - 빌드시 HTML 페이지 생성되며 각 요청에 재사용됨
            - CDN에 의해 캐시될 수 있음
            - **데이터 없는 정적 생성**
                - 기본적으로 Nextjs는 데이터를 가져오지 않고 정적 생성을 사용해 빌드할때 단일 HTML 파일을 생성함.
            - **데이터를 사용한 정적 생성**
                - getStaticProps, getStaticPaths
                - getStaticProps(페이지 콘텐츠가 외부 데이터에 의존)
                    - 빌드시 호출되며 사전 렌더링시 가져온 데이터를 props로 넣어줌
                - getStaticPaths(페이지 경로가 외부 데이터에 의존)
                    - 빌드시 호출되며 사전 렌더링할 경로를 지정할 수 있음
            - **정적생성 사용여부 판단**
                - 사용자 요청에 앞서 페이지를 미리 렌더링 할 수 있을 경우 정적생성 사용
                    - 블로그 게시물, 마케팅 페이지, 도움말 및 문서
                - 페이지가 자주 업데이트 되는 데이터가 표시되고 모든 요청에 따라 페이지 콘텐츠가 변경될 경우
                    1. CSR
                        - 페이지 일부 사전 렌더링을 하지 않고 클라이언트 측에서 JavaScript로 렌더링
                    2. SSR
                        - CND에서 페이지를 캐시할 수 없어서 속도가 느리나 사전 렌더링 된 페이지는 항상 최신 상태
        5. Pre-Rendering2 (Server-Side Rendering)
            - 각 요청에 대해 HTML 생성
            - 정적 생성보다 성능이 느리기 때문에 반드시 필요한 경우에 사용
            - getServerSideProps
                - getStaticProps와의 차이점은 빌드할때가 아닌 요청에서 실행된다는 점
    - **Custom Server**
    - **Custom App**
        - Nextjs는 App으로 페이지를 초기화함. 모든 페이지에 적용됨
            - 레이아웃 유지
            - 상태 유지
            - 사용자 정의 오류 처리
            - 페이지에 추가 데이터 삽입
            - 전역 CSS 추가
        - pages/_app.js
    - **Custom Document**
        - Nextjs 페이지가 문서 마크업 정의를 건너뛰기 때문에 Document를 사용해 html, body 태그를 보강하는데 사용함.
        - pages/_document.js
    - **Custom Error Page**
        - 404 page
            - 기본적으로 Nextjs가 정적 404 페이지를 제공함
            - 사용자 지정 404 페이지 -> pages/404.js
                - 빌드시 정적 생성됨
        - 500 page
            - 기본적으로 Nextjs가 정적 500 페이지 제공
            - 사용자 지정 500 페이지 -> pages/500.js
                - 빌드시 정적 생성됨
        - 고급 Error Page 사용자 정의
            - pages/_error.js
                - 프로덕션에서만 사용됨
    - **Static File Serving**
        - 루트 디렉토리 아래의 public 폴더로 정적 파일을 제공
        - 기본 URL('/')에서 시작
        - robots.txt, favicon.ico 파일 포함
    - **Environment Variables**
        - .gitignore에 포함되어야함
        - .env.local 파일에서 환경변수 설정 후 process.env로 접근
        - 브라우저에 환경변수 노출시
            - 기본적으로 .env.local의 모든 환경변수는 nodejs환경에서만 사용 가능
            - 변수 앞에 NEXT_PUBLIC_ 접두사
        - 기본환경변수
            - .env.local(항상 기본값 설정 재정의)
            - .env(모든 환경),.env.development(개발환경),.env.production(프로덕션환경),.env.test(테스트 환경)
    - **Routing**
        1. 소개
            - pages에 기반한 파일 시스템 기반 라우터
            - pages 디렉토리에 파일이 추가되면 자동으로 경로로 사용
            - 색인 경로
                - pages/index.js -> '/'
                - pages/blog/index.js -> '/blog'
            - 중첩 경로
                - pages/blog/intro.js -> '/blog/intro'
            - 동적 경로 세그먼트
                - pages/[username]/settings.js -> '/:username/settings.js'('/lee/settings')
            - 페이지 간 연결
                - next/link의 Link 컴포넌트를 사용해 클라이언트 측 경로 전환
            - 동적 경로 연결
                - 보간을 사용해 경로를 생성
            - 라우터 삽입
                - useRouter 또는 withRouter
        2. Dynamic Routes
        3. Imperatively
        4. Shallow Routing
            - 동일한 페이지 URL 변경에서 Data Fetching을 하지 않고 URL 변경
    - **Data Fetching**
        1. getStaticProps(정적 생성)
            - 빌드시 데이터 가져옴
            - 서버 측 코드 직접 작성
            - HTML, JSON 모두 정적 생성
            - 페이지에서만 허용
            - 개발 중인 모든 요청에서 실행
            - 미리보기 모드
            - ```javascript
              export async function getStaticProps(context) {
                const res = await fetch(`https://...`)
                const data = await res.json()

                if (!data) {
                    return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                    }
                }

                return {
                    props: { data }, // will be passed to the page component as props
                }
              }
              ```
            - Incremental Static Regeneration
                ```javascript
                export async function getStaticProps() {
                    const res = await fetch('https://.../posts')
                    const posts = await res.json()

                    return {
                        props: {
                        posts,
                        },
                        // Next.js will attempt to re-generate the page:
                        // - When a request comes in
                        // - At most once every second
                        revalidate: 1, // In seconds
                    }
                }
                ```
                - 블로그 게시물 목록이 1초에 한번씩 재검증됨.
                - 기존 SSR과 달리 증분 정적 생성은 정적생성의 장점을 유지함
                    - 페이지가 지속적으로 빠르게 제공됨
                    - 페이지 재생성 실패시 이전 페이지가 변경되지 않아 오프라인되지 않음
                    - 낮은 DB 및 서버 로드. 페이지는 동시에 최대 한 번 재계산됨
        2. getStaticPaths(정적 생성)
            - 데이터를 기반으로 페이지를 사전 렌더링 할 동적 경로 지정
        3. getServerSideProps(서버 측 렌더링)
            - 각 요청에서 데이터를 가져옴
        4. SWR(클라이언트 렌더링)
    - **Image Optimization**
        - 브라우저가 WebP를 지원하는 경우 이미지 크기 조정 및 최적화
            - 뷰포트가 더 작은 장치로 큰 이미지가 전송되는 것 방지
        - 이미지 형식을 자동 채택해 해당 형식을 지원하는 브라우저에 제공
        - 이미지는 기본적으로 지연로드됨. 뷰포트로 스크롤 될 때 로드됨.
    - **Supported Browsers and Features**
        - IE11 및 모든 최신브라우저를 필수 구성 없이 지원.
        - 폴리필
            - Nextjs가 IE11 호환성에 필요한 폴리필을 추가해줌
            - 다른 종속성에 폴리필이 포함된 경우 프로덕션 빌드에서 자동 제거
            - 번들 크기를 줄이기 위해 필요한 브라우저에서만 폴리필을 로드함
        - 서버 측 폴리필
        - 맞춤형 폴리필
        - 최신 JavaScript 
        - TypeScript
        - Babel Configuration
    - **Authentication**
    - **Preview Mode**
    - **Dynamic Import**
    - **Automatic Static Optimization**
    - **Static HTML Export**
    - **Measuring performance**
        - Nextjs Analytics를 사용해 다양한 메트릭으로 페이지 성능 분석 및 측정
        - reportWebVitals
            - pages/_app.js
        - 측정되는 두가지 유형 메트릭
            1. Web Vitals
            2. Custom Metrics
        - 분석 결과 내보내기
    - **Debugging**
    - **Source Maps**
        - 개발 중에 기본적으로 활성화. 프로덕션 빌드 중에는 소스 맵 생성이 생성되는 동안 빌드시간과 메모리 사용량을 크게 증가시킬 수 있으므로 비활성화됨.
    - **Codemods**
    - **Internationalized Routing**
        - Nextjs는 i18n을 기본적으로 지원함. 자동으로 라우팅 처리함.
        1. 시작하기
        2. 로케일 전략
            - 하위 경로 라우팅
            - 도메인 라우팅
        3. 자동 로케일 감지
            - 자동 로케일 감지 비활성화
        4. 로케일 정보 액세스
        5. 로케일 간 전환
        6. NEXT_LOCALE 쿠키 활용
        7. SEO
        8. 정적 생성과 동작 방식
    - **API**
3. TypeCheck with TypeScript(React,Nextjs)
    - interface
    - function
    ```typescript
    interface MyComponentProps {
        name: string;
        age?: number;
    }

    const MyComponent: React.FC<MyComponentProps> = ({name}) => {
        const [count, setCount] = useState<number>(0);

        return (<div>hello, {name} {age && age}</div>);
    }

    export default App;
    ```
    - ctrl + space
4. React + Nextjs Dev Policy
    - 함수형 컴포넌트, Hooks 사용
    - 컴포넌트 생명주기는 useEffect로 관리
    - 리스트 사용시 key 전달하기
    - &&, condition ? true : false 활용
    - Form 처리는 formik
    - **useState**
    - **useEffect**
    - **useContext**
    - **useReducer**
    - **useCallback**
    - **useMemo**
    - **useRef**
    - **Accessibility**
    - **Code Splitting**
    - **Error Boundary**
    - **Ref**
    - **Fragment**
    - **HOC**
    - **JSX**
    - **성능 최적화**
    - **Portal**
    - **Profiler**
    - **Reconciliation**
    - **Render props**
    - **Strict Mode**
    - **비제어 컴포넌트**
    - **웹 컴포넌트**
## 2. CodeStyle(Eslint, Prettier, VSC, Naming)
1. ESLint
    - npm i -D eslint eslint-config-airbnb
        - react 규칙 제외시 eslint-config-airbnb-base
    - npm info "eslint-config-airbnb@latest" peerDependencies
    - npm v5 이상 : npx install-peerdeps --dev eslint-config-airbnb
    - npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
    - .eslintrc
    ```json
    {
        "parser": "@typescript-eslint/parser",
        "plugins": ["@typescript-eslint"],
        "extends": [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/eslint-recommended"
        ],
            "env": {
        "browser": true
        }
    }
    ```
    - package.json scripts
    ```json
    {
        //...
        "scripts": {
        "lint": "eslint './src/**/*.{ts,tsx,js,jsx}'",
        "lint:fix": "eslint --fix './src/**/*.{ts,tsx,js,jsx}'"
        }
        //...
    }
    ```

2. Prettier
    - npm install -D prettier eslint-config-prettier eslint-plugin-prettier
    - .prettierrc
    ```json
    {
        "singleQuote": true,
        "parser": "typescript",
        "semi": true,
        "useTabs": true,
        "printWidth": 120
    }
    ```
    - package.json scripts
    ```json
    "scripts": {
    //...
        "prettier": "prettier --write --config ./.prettierrc './src/**/*.{ts,tsx}'",
    //...
    }
    ```
    - .eslintrc

    ```json
    {
        "parser": "@typescript-eslint/parser",
        "plugins": ["@typescript-eslint"],
        "extends": [
        "prettier",
        "airbnb",
        "airbnb/hooks",
        "prettier/react",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
        ]
    }
    ```

    - VSC 코드 저장시 자동 수정 안했을시
    - 코드입력 -> prettier -> eslint -> 코드수정
    - npm run prettier : 코드스타일 수정
    - npm run lint : 규칙 검사

3. VSC
    - Extensions 설치
        - ESLint, Prettier
    - Prettier Extensions 사용
        - 설정 -> Format JavaScript 체크 해제
        - F1 -> Format Documents로 코드스타일 수정 가능
    - 코드 저장시 자동 코드 정리
        - 설정 -> Format On Save 체크 활성화
        - 설정 -> ESLint -> Auto Fix On Save 체크 활성화
4. Naming
    - https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%94%EB%94%A9-%EB%B0%8F-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-1%ED%8E%B8
    - https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%ED%83%80%EC%9D%BC-%EA%B0%80%EC%9D%B4%EB%93%9C-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-%ED%8E%B8

## 3. Testing(jest, react-testing-library, cypress)
1. jest & react-testing-library
    - npm i -D @testing-library/react @testing-library/dom @testing-library/jest-dom jest @types/jest babel-jest
    - .babelrc
    ```json
    {
        "presets": ["next/babel"]
    }
    ```
    - jest.config.js
    ```javascript
    module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    }
    };
    ```
    - package.json scripts에 "test":"jest" 추가
2. cypress
## 4. Routing(Nextjs)
1. pages Structure
    - /chat
        - index.tsx
    - /login
        - index.tsx
    - /post
        - /[postId]
            - index.tsx
            - update.tsx
        - create.tsx
    - /posts
        - index.tsx
    - /signup
        - index.tsx
    - /tag
        - [tagId].tsx
    - /tags
        - index.tsx
    - /trends
        - index.tsx
    - /user
        - [userId].tsx
        - index.tsx
    - /users
        - index.tsx
    - _app.tsx
    - _document.tsx
    - _error.tsx
    - 404.tsx
    - index.tsx
## 5. Bundler(Babel, Webpack, next.config.js)
1. babel
2. webpack
3. next.config.js
    - **소개**
        - next.config.js는 Nextjs 서버 및 빌드 단계에서 사용되며 브라우저 빌드에는 포함되지 않음
    - **환경변수**
        - env
        - 객체 형태로 환경변수 추가후 process.env 접두사로 사용
    - **Base Path**
        - basePath
        - 기본적으로 '/'이며 경로 설정시 전체 애플리케이션에 적용됨.
    - **Rewrites**
        - 재작성을 사용해 수신 요청 경로를 다른 대상 경로에 매핑.
        - Nodejs 환경에서만 사용가능하며 클라이언트 측 라우팅에는 영향을 주지 않음.
    - **Redirects**
        - 리디렉션을 사용해 수신 요청 경로를 다른 대상 경로에 매핑.
        - Nodejs 환경에서만 사용가능하며 클라이언트 측 라우팅에는 영향을 주지 않음.
    - **Custom Headers**
        - 사용자 지정 헤더를 사용해 수신 요청 경로에 대해 사용자 지정 HTTP 헤더를 설정.
    - **Custom Page Extensions**
    - **CDN Support with Asset Prefix**
        - CDN을 설정하기 위해 자산 접두사를 설정하고 Nextjs가 호스팅되는 도메인으로 확인되도록 CDN 오리진 구성.
    - **Custom Webpack Config**
    - **Compression**
        - 콘텐츠와 정적 파일을 압축하기 위해 gzip 압축을 제공함. 
        - nginx와 같은 HTTP 프록시에서 압축을 활성화해 nodejs 프로세스에서 로드를 오프로드 할 수 있음.
    - **Runtime Configuration**
    - **Disabling x-powered-by**
        - 기본적으로 Nextjs는 x-powered-by 헤더를 추가함.
    - **Disabling ETag Generation**
         - 기본적으로 Nextjs는 모든 페이지에 ETag를 생성함.
    - **Setting a custom build directory**
        - .next 폴더 대신 사용할 사용자 빌드 폴더 지정가능.
    - **Configuring the Build ID**
        - 빌드시 생성된 상수 ID를 사용해 애플리케이션 버전을 식별함.
        - 이로인해 모든 서버에서 실행될 때 다중 서버 배포에서 문제가 발생할 수 있음.
        - 빌드간에 정적 빌드 ID를 유지하기 위해 자체 빌드 ID를 제공할 수 있음.
    - **Configuring onDemandEntries**
        - 서버가 개발시 메모리 빌드 페이지를 처리하거나 유지하는 방법을 제어할 수 있는 몇가지 옵션을 제공함.
    - **Ignoring Typescript Errors**
        - 프로덕션 빌드에서 TypeScript 에러 발생시 빌드에 실패하게 되는데 이를 비활성화 할 수 있음.
    - **exportPathMap**
    - **Trailing Slash**
    - **React String Mode**
## 6. DataContainer(Redux, Redux Saga) with Nextjs
1. DataContainer
2. Redux
3. ReduxSaga
4. Nextjs with Redux & Redux Saga
    - npm i axios redux react-redux redux-saga immer next-redux-wrapper redux-devtools-extension
    - /store
        - index.ts
        - /reducers
            - index.ts
            - user.ts
            - post.ts
        - /sagas
            - index.ts
            - user.ts
            - post.ts
## 11. Figma
## 12. Storybook
## 13. CSS In Js(emotion)
## 14. 2d DataVisual(D3)
## 7. PWA(ServiceWorker, Web Notification, Install App, IndexedDB, CacheAPI, Nextjs)
## 8. AMP(GoogleCodelab, Nextjs)
## 9. SEO(schema.org, robots.txt, sitemap.xml, Nextjs)
## 10. SSR,CSR,SPA(Nextjs)
## 16. UIUX
1. UX 기본
    - 더블 다이아몬드
    - 무대 설정
    - 문제확인
        - 이해 관계자와의 내부 인터뷰, 번개회담, 사용자 인터뷰, 현장 조사
    - 프로젝트 맵
    - 와이어 프레임 및 스토리 보드
        - Crazy 8s -> 디자인 수정 -> 아이디어 스토리 보드
    - 프로토 타입 생성
    - 디자인 유용성 테스트
    - 디자인 재검토 및 테스트
2. Good Mobile Site
    - https://developers.google.com/web/fundamentals/design-and-ux/principles
3. Variable font
    - https://web.dev/variable-fonts/
4. Additional Colors and Icons
    - **Icon & Tile**
        1. Chrome & Opera
        2. Safari
        3. IE & Windows Phone
        4. IE Tile
    - **Browser Color**
        1. Chrome & Opera
        2. Safari
## 17. Responsive
## 18. Animation
## 18. AppShell
1. AppShell Model이란
    - 사용자 인터페이스를 위한 최소한의 HTML,CSS,JavaScript이며 오프라인으로 캐시 된 경우 반복 방문시 성능 보장.
        - 방문 할 때마다 네트워크에서 AppShell 로드 되지 않음.
        - 네트워크에서 필요한 콘텐츠만 필요함.
    - 네트워크 없이 초기 HTML을 화면에 빠르게 표시.
        - Shell을 캐싱한 후 JavaScript를 사용해 각 페이지에 동적 콘텐츠 로드.
    - UI 골격과 앱을 시작하는데 필요한 핵심구성요소이나 데이터가 포함되어 있지 않을 가능성이 높음.
2. AppShell Model을 사용하는 경우
    - 탐색은 변경되지 않으나 콘텐츠는 변경되는 앱과 사이트에 가장 적합함.
3. 장점
    - 지속적으로 빠른 안정적인 성능
    - 네이티브와 유사한 상호작용
    - 데이터의 경제적 사용
4. 요구사항
    - 빠른 로드
    - 가능한 한 적은 데이터 사용
    - 로컬 캐시에서 정적 자산 사용
    - 탐색에서 콘텐츠 분리
    - 페이지 별 콘텐츠 검색 및 표시
    - 선택적으로 동적 콘텐츠 캐시
5. AppShell Caching
    - 수동 ServiceWorker 코드 또는 sw-precache를 활용한 ServiceWorker로 AppShell을 캐시 할 수 있음.
    - **수동으로 앱 셸 캐싱**
        - 서비스워크 이벤트를 사용해 AppShell의 정적 리소스를 CacheAPI로 캐시하는 서비스 워커
    - **sw-precache를 사용해 앱 셸 캐시**
        - 빌드 프로세스(ex:gulp)의 일부로 구성한 리소스를 캐시하고 제공함.
        - 정적 리소스 오프라인 캐싱 : sw-precache
        - 런타임/동적 리소스 : sw-toolbox
## 15. Accessibility
## 19. CrossBrowser
## 20. Performance
## 21. Security
## 22. CICD
## 23. AWS
## 24. Devops
---