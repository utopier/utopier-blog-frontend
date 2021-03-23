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
1. Install Packaga
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
    - npm i -D cypress @testing-library/cypress start-server-and-test
   - package.json
     ```json
     "scripts": {
         //...
         "cypress": "cypress open",
         "cypress:headless": "cypress run --browser chrome --headless",
         "test:e2e": "start-server-and-test start 3000 cypress",
         "test:e2e:ci": "start-server-and-test start 300 cypress:headless"
         //...
     }
     ```
   - cypress.json
      ```json
      {
        "baseUrl": "http://localhost:3000",
        "video": false
      }
      ```
    - cypress/support/index.js
      ```javascript
      import '@testing-library/cypress/add-commands';
      ```
    - npm i -D msw

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
1. Install Package
    - cd ..
    - mkdir designSystem
    - cd designSystem
    - npm init -y
    - npx sb init
    - npm i react react-dom
    - npm run storybook
2. 스토리 경로
    - mkdir src
    - rmdir stories
    - .storybook/main.js
        ```javascript
          module.exports = {
            stories: [
            '../src/**/*.stories.mdx',
            '../src/**/*.stories.@(js|jsx|ts|tsx)',
            ],
            addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
        };
        ```
3. Addon 추가
    - **Knobs**
        - npm i -D @storybook/addon-knobs
        - .storybook/main.js
            ```javascript
            module.exports = {
                addons: ['@storybook/addon-knobs'],
            };
            ```
    - **Action**
        - 기본적으로 적용되있음
    - **Docs**
        - npm i -D @storybook/addon-docs
        - MDX도 사용할시
            - npm i - D react react-is babel-loader
        - .storybook/main.js
        ```javascript
        module.exports = {
            stories: ['../src/**/*.stories.@(js|mdx)'],
            addons: ['@storybook/addon-docs'],
        };
        ```
4. TypeScript 설정
    - npm i -D babel-preset-react-app react-docgen-typescript-loader typescript
    - tsconfig.json
        ```json
        {
            "compilerOptions": {
            "target": "es5",
            "lib": ["dom", "dom.iterable", "esnext"],
            "allowJs": true,
            "skipLibCheck": true,
            "esModuleInterop": true,
            "allowSyntheticDefaultImports": true,
            "strict": true,
            "forceConsistentCasingInFileNames": true,
            "module": "esnext",
            "moduleResolution": "node",
            "resolveJsonModule": true,
            "isolatedModules": true,
            "noEmit": true,
            "jsx": "react"
            },
            "include": ["src"]
        }
        ```
    - .storybook/main.js

    ```javascript
    const path = require('path');

    module.exports = {
        stories: ['../src/**/**/*.stories.(js|mdx|tsx)'],
        addons: [
            '@storybook/addon-docs',
            '@storybook/addon-actions',
            '@storybook/addon-links',
            '@storybook/addon-knobs',
        ],
            typescript: {
            check: false,
            checkOptions: {},
            reactDocgen: 'react-docgen-typescript',
            reactDocgenTypescriptOptions: {
                shouldExtractLiteralValuesFromEnum: true,
                propFilter: (prop) =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
            },
            },
        webpackFinal: async (config, { configType }) => {
            config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                loader: require.resolve('babel-loader'),
                options: {
                    presets: [['react-app', { flow: false, typescript: true }]],
                    plugins: [
                    [
                        require.resolve('babel-plugin-named-asset-import'),
                        {
                        loaderMap: {
                            svg: {
                            ReactComponent:
                                '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                            },
                        },
                        },
                    ],
                    ],
                },
                },
            ],
            });
            return config;
        },
    };
    ```

5. emotion
    - npm i @emotion/core
6. svg img 대신 jsx로 렌더링
7. Storybook Pattern
- Figma
- Components.tsx -> props 정의 -> Component.stories.tsx -> 구현 기능을 스토리로 작성 -> 컴포넌트에서 기능 구현 -> Storybook에서 테스트
- Button

  - state : default, hover, active, focus, disabled
  - theme : primary, default, link, dropdown, disabled, warning, delete
  - sizes
  - withIcon

- Button.tsx

  ```typescript
  /** @jsx jsx */ /** @jsxRuntime classic */
  import { jsx, css } from '@emotion/core';

  type ButtonProps = {
    /** 버튼 안의 내용 */
    children: React.ReactNode;
    /** 클릭했을 때 호출할 함수 */
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  };

  /** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다.  */
  const Button = ({ children, onClick }: ButtonProps) => {
    return (
      <button css={style} onClick={onClick}>
        {children}
      </button>
    );
  };

  const style = css``;

  export default Button;
  ```

- Button.stories.tsx

  ```typescript
  import React from 'react';
  import Button from './Button';

  export default {
    title: 'components|Button',
    component: Button,
  };

  export const button = () => {
    return <Button>BUTTON</Button>;
  };

  button.story = {
    name: 'Default',
  };

  export const primaryButton = () => {
    return <Button>PRIMARY</Button>;
  };
  ```

8. Rollup 번들 후 npm 라이브러리 배포

1. rolup package install

   - npm i -D rollup rollup-plugin-babel rollup-plugin-node-resolve rollup-plugin-peer-deps-external rollup-plugin-commonjs @svgr/rollup rollup-plugin-url

2. peerDependency 설정

   - package.json

     ```json
       "peerDependencies": {
             "@emotion/core": "^10.0.22",
             "react": "^16.12.0",
             "react-dom": "^16.12.0",
             "react-spring": "^8.0.27"
         }
     ```

3. package.json
   ```json
   {
       "name": "react-uikit-sample",
       "version": "1.0.0",
       "module": "dist/index.js",
   ```
4. rollup.config.js

   ```javascript
   import commonjs from 'rollup-plugin-commonjs';
   import resolve from 'rollup-plugin-node-resolve';
   import babel from 'rollup-plugin-babel';
   import pkg from './package.json';
   import external from 'rollup-plugin-peer-deps-external';
   import svgr from '@svgr/rollup';
   import url from 'rollup-plugin-url';
   import peerDepsExternal from 'rollup-plugin-peer-deps-external';

   const extensions = ['.js', '.jsx', '.ts', '.tsx']; // 어떤 확장자를 처리 할 지 정함

   // babel-preset-react-app를 사용한다면 BABEL_ENV를 필수로 설정해야함.
   process.env.BABEL_ENV = 'production';

   export default {
     input: './src/index.ts', // 어떤 파일부터 불러올지 정함.
     plugins: [
       peerDepsExternal() /* peerDependencies로 설치한 라이브러리들을 external 모듈로 설정
                               즉, 번들링된 결과에 포함시키지 않음 */,
       resolve({ extensions }), // node_modules 에서 모듈을 불러올 수 있게 해줌. ts/tsx 파일도 불러올 수 있게 해줌
       commonjs({
         include: 'node_modules/**',
       }), // CommonJS 형태로 만들어진 모듈도 불러와서 사용 할 수 있게 해줌. 현재 프로젝트 상황에서는 없어도 무방함
       babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }), // Babel을 사용 할 수 있게 해줌
       url(), // 미디어 파일을 dataURI 형태로 불러와서 사용 할 수 있게 해줌.
       svgr(), // SVG를 컴포넌트로 사용 할 수 있게 해줌.
     ],
     output: [
       {
         file: pkg.module, // 번들링한 파일을 저장 할 경로
         format: 'es', // ES Module 형태로 번들링함
       },
     ],
   };
   ```

5. .babelrc

```json
{
  "presets": [["react-app", { "flow": false, "typescript": true }]]
}
```

6. src/index.ts

```typescript
export { default as Button } from './Button/Button';
export { default as ButtonGroup } from './ButtonGroup/ButtonGroup';
export { default as Dialog } from './Dialog/Dialog';
export { default as Icon } from './Icon/Icon';
```

7. build

- yarn rollup -c
  - ./node_modules/rollup/dist/bin/rollup -c
- dist/index.js 생성됨

8. TypeScript declaration

- tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "jsx": "react",
    "declaration": true,
    "declarationDir": "dist/types"
  },
  "include": ["src"],
  "exclude": ["**/*.stories.tsx"]
}
```

- package.json

```json
"scripts": {
  "storybook": "start-storybook -p 6006",
  "build-storybook": "build-storybook",
  "build": "rollup -c",
  "build:types": "tsc --emitDeclarationOnly"
},
```

- npm build:types

  - dist/types/index.d.ts 생성됨

- package.json
  ```json
  {
  "name": "react-uikit-sample",
  "version": "1.0.0",
  "module": "dist/index.js",
  "license": "MIT",
  "types": "dist/types/index.d.ts",
  ```

9. npm 등록

- npm login
- .npmignore or package.json files
  - package.json
    ```json
    {
    "name": "react-uikit-sample",
    "version": "1.0.0",
    "module": "dist/index.js",
    "license": "MIT",
    "types": "dist/types/index.d.ts",
    "files": [
        "/dist"
    ],
    ```
- npm publish
- npmjs.com에서 확인

10. npm에서 패키지 받아서 사용

- npm i react-uikit-sample
- npm i react react-dom react-spring @emotion/core

## 13. CSS In Js(emotion)
1. Install Package
    - npm i @emotion/core@10.1.1 @emotion/styled@10.0.27 emotion-reset@2.0.7
2. Global Styles
    - mkdir styles
    - styles/GlobalStyles.tsx
        - css reset(emotion-reset), 공통 Design 적용, font
    - styles/Theme.ts
        - 공통 Color Theme
    - _app.tsx 공통 CSS 적용
## 14. 2d DataVisual(D3)
## 7. PWA(ServiceWorker, Web Notification, Push, Install App, IndexedDB, CacheAPI, Nextjs)
1. Nextjs PWA
    - /public/service-worker.js
    - /public/manifest.json
    - _document.tsx met tag 추가
        ```javascript
        //...
                <link rel="manifest" href="/static/manifest.json"/>
        //...
        ```
    - _app.js 
        - service worker 등록
        - noscript 추가
    - npm run dev -> Chrome DevTool -> Application -> Manifest & Service Workers
    - Build 시 .next/static 추가
        - npm run build -> npm run start -> Lighthouse -> Audit
2. manifest.json + Meta Tag
    - generator manifest
    
    - https://www.favicon-generator.org/
    - manifest.json
        ```json
        {
            "name": "Utopier DevBlog",
            "short_name": "Utopier DevBlog",
            "background_color": "#FFFFFF",
            "theme_color": "#2F3BA2",
            "description": "React + Nextjs + TS + PWA Blog",
            "display": "standalone",
            "start_url": "/",
            "icons": [{
                "src": "/static/icon_192.png",
                "type": "image/png",
                "sizes": "192x192"
            },{
                "src": "/static/icon_512.png",
                "type": "image/png",
                "sizes": "512x512"
            }]
        }
        ```
    - iOS 메타태그 및 아이콘 추가
        - _document.tsx
            ```html
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
            <meta name="apple-mobile-web-app-title" content="Weather PWA"/>
            <link rel="apple-touch-icon" href="/images/icons/icon-152x152.png"/>
            ```
    - 메타 설명 추가
        - _document.tsx
            ```html
            <meta name="description" content="A sample weather app"/>
            ```
    - 주소 표시줄 테마 색상 설정
        - _document.tsx
            ```html
            <meta name="theme-color" content="#2F3BA2" />
            ```
3. Offline App
    - public/offline.html
    - **오프라인 페이지 캐시**
        - service-worker.js
            ```javascript
            //...
            const FILES_TO_CACHE = [
                '/offline.html',
            ];
            //install
            evt.waitUntil(
                caches.open(CACHE_NAME).then((cache) => {
                    console.log('[ServiceWorker] Pre-caching offline page');
                    return cache.addAll(FILES_TO_CACHE);
                })
            );
            ```
    - **오래된 오프라인 페이지 정리**
        - service-worker.js
            ```javascript
            // activate
            evt.waitUntil(
                caches.keys().then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                    }
                }));
                })
            );
            ```
    - **실패한 네트워크 요청 처리**
        - service-worker.js
            ```javascript
            // fetch
            if (evt.request.mode !== 'navigate') {
            // Not a page navigation, bail.
            return;
            }
            evt.respondWith(
                fetch(evt.request)
                    .catch(() => {
                    return caches.open(CACHE_NAME)
                        .then((cache) => {
                            return cache.match('offline.html');
                        });
                    })
            );
            ```
    - npm run dev -> Chrome DevTool -> Application -> Cache Storage 
    - Application -> ServiceWorker -> offline
    - **앱 로직 업데이트**
    - **앱 리소스 사전캐시**
4. Install App
    - _document.tsx
        ```html
        <script src="/install.js"></script>
        ```
    - pages/index.js button 추가
    - public/install.js
        - beforeinstallprompt 이벤트 듣기
        ```javascript
        window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
        ```
        - 이벤트 저장 및 설치 버튼 표시
        ```javascript
        // saveBeforeInstallPromptEvent
        deferredInstallPrompt = evt;
        installButton.removeAttribute('hidden');
        ```
        - 프롬프트 표시 및 버튼 숨기기
        ```javascript
        // installPWA
        deferredInstallPrompt.prompt();
        evt.srcElement.setAttribute('hidden', true);
        ```
        - 결과기록
        ```javascript
        // installPWA
        deferredInstallPrompt.userChoice
            .then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt', choice);
            } else {
                console.log('User dismissed the A2HS prompt', choice);
            }
            deferredInstallPrompt = null;
            });
        ```
        - 모든 설치 이벤트 기록
        ```javascript
        window.addEventListener('appinstalled', logAppInstalled);

        //logAppInstalled
        ```
    - https://web.dev/install-criteria/ 기준 충족해야 됨.
    - npm run dev -> Chrome DevTool -> Sources -> install.js
    - Test
        - 설치 버튼 보이는지
        - 설치 버튼 작동하는지
        - iOS 설치가 제대로 작동하는지
    - https://medium.com/@donggyu9410/pwa-install-prompt-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-45ed6653627
5. Notification & Push
    - https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
    - **푸시 알림이란**
        - Notification API로 앱이 사용자에게 시스템 알림 표시
        - Push API로 서비스 워커가 앱이 활성화되지 않은 상태에서도 서버의 푸시 메시지 처리
        - Notification & Push는 백그라운드에서 푸시 메시지 이벤트에 응답하고 Service Worker API에서 작성함.
    - **웹 푸시 알림**
    - public/notification.js
    - public/push.js
    - _document.js에 script 태그 추가
6. IndexedDB
    - https://developers.google.com/web/ilt/pwa/working-with-indexeddb
## 8. AMP(GoogleCodelab, Nextjs)
1. AMP
    - https://amp.dev/documentation/?format=websites
2. Nextjs AMP
    - Nextjs AMP페이지는 CSS-in-JS만 지원함
    - 기본적으로 최신 버전의 amp component를 가져옴. 사용자 정의 버전은 next/head에 script 태그로 적용
    - AMP 페이지는 개발 중에 amphtml-validator를 사용해 자동으로 유효성 검사를 함. next.config.js에서 검사를 끄거나 커스텀 AMP 유효성 검사기를 설정할 수 있음.
    - Next.js는 HTML버전에서 페이지의 AMP버전에 대한 링크를 자동으로 삽입함
        ```html
        <link rel="amphtml" href="/about.amp.html" />
        ```
        ```html
        <link rel="canonical" href="/about" />
        ```
    - 하이브리드 AMP 페이지
        - pages/about.js
            - out/about.html
            - out/about.amp.html
    - AMP-only 페이지
        - pages/about.js
                - out/about.html
    - TypeScript 설정
        - https://github.com/ampproject/amphtml/issues/13791
        - amp.d.ts
            ```typescript
            // Any element you create will be accepted
            declare namespace JSX {
                interface IntrinsicElements {
                    [elemName: string]: any;
                }
            }

            // The elements you list here will be accepted, attributes don't matter
            declare namespace JSX {
                interface IntrinsicElements {
                    'amp-img': any;
                }
            }

            // The elements you list here will be accepted, and only with the attributes that you include here
            declare namespace JSX {
                interface AmpImg {
                    alt?: string;
                    src?: string;
                    width?: string;
                    height?: string;
                    layout?: string;
                }
                interface IntrinsicElements {
                    'amp-img': AmpImg;
                }
            }
            ```
    - 각 page별 적용
        1. AMP-only 페이지
            ```javascript
            export const config = { amp : 'hybrid' }
            ```
            - 페이지에 Next.js or React 클라이언트 측 런타임이 없음
            - 페이지는 AMP 캐시와 AMP Optimizer로 자동최적화됨(성능 42% 향상)
            - 페이지에 사용자가 액세스 할 수 있는 최적화된 버전의 페이지와 색인이 생성 될 수 있는 최적화되지 않은 버전의 페이지가 있음
        2. Hybrid 페이지
            ```javascript
            import { useAmp } from 'next/amp'

            export const config = { amp: 'hybrid' }
            
            function About(props){
                const isAmp = useAmp() // true or false

                return(
                        <div>
                            <h3>My AMP About Page!</h3>
                            {isAmp ? (
                                <amp-img
                                width="300"
                                height="300"
                                src="/my-img.jpg"
                                alt="a cool image"
                                layout="responsive"
                                />
                            ) : (
                                <img width="300" height="300" src="/my-img.jpg" alt="a cool image" />
                            )}
                        </div>
                )
            }

            export default About
            ```
            - 페이지는 기존 HTML(기본값) 및 AMP HTML(URL에 `?amp=1`추가)으로 렌더링됨.
            - 페이지는 AMP 버전에는 AMP Optimizer와 함께 적용된 유효한 최적화만 있으므로 검색 엔진에서 색인을 생성할 수 있음.
3. amp Codelab
    - https://codelabs.developers.google.com/codelabs/accelerated-mobile-pages-foundations/
    - https://codelabs.developers.google.com/codelabs/accelerated-mobile-pages/#0

## 9. SEO(schema.org, robots.txt, sitemap.xml, Nextjs)
1. robots.txt
    - **robots.txt 소개**
        1. robots.txt 파일이란
            - 검색엔진 크롤러를 제어하고 sitemap 위치를 알려줌
            - 웹페이지가 Google에 표시되지 않도록 하려면 noindex 명령어 사용 or 페이지를 비밀번호로 보호
        2. robots.txt 용도
            - 사이트의 크롤러 트래픽을 관리
            - **웹페이지**
                - robots.txt로 Google로부터 숨겨지지 않음, noindex나 비밀번호를 걸어야함
            - **미디어 파일**
                - robots.txt로 Google 검색 결과에 표시 되지 않게 할 수 있음
                - 다른 페이지에서 다른 사용자가 이미지,동영상,오디오 파일을 링크하는 것을 막을수는 없음
            - **리소스 파일**
                - robots.txt로 리소스파일이 로드되지 않도록 할 수 있음
                - 리소스 없이 Google 크롤러가 페이지를 인지하기 어렵게 되는 경우에는 차단하면 안됨
        3. 사이트 호스팅 서비스를 사용하는 경우
            - 직접 robots.txt 파일을 수정할 필요가 없거나 수정하지 못 할 수 있음
        4. robots.txt 제한사항
            - robots.txt 명령어는 일부 검색엔진에서만 지원될 수 있음
            - 크롤러마다 구문을 다르게 해석함
            - 다른 사이트에서 연결된 경우 robots.txt 파일을 사용한 페이지 색인이 생성될 수도 있음
            - 지침 구성 방법
                - https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#handling-combined-indexing-and-serving-directives
        5. 페이지의 robots.txt 차단 여부 테스트
            - robots.txt 규칙에 의해 페이지, 리소스가 차단되었는지 테스트
                - https://support.google.com/webmasters/answer/6062598
            - noindex 명령 테스트를 위해 URL 검사 도구 사용
                - https://support.google.com/webmasters/answer/9012289
    - **robots.txt 파일 생성**
        1. 시작하기
            - 사이트 루트에 위치
            - 로봇 배제 표준을 따름
                - http://en.wikipedia.org/wiki/Robots_exclusion_standard#About_the_standard
            - 하나 이상의 규칙으로 구성됨, 각 규칙은 특정 크롤러가 웹 사이트에서 지정된 파일 경로에 액세스할 권한을 차단하거나 허용함
        2. robots.txt 기본
            - **형식 및 위치**
                - 표준 UTF-8 텍스트 파일을 작성할 수 있는 텍스트 편집기 사용
                - robots.txt 테스터 도구를 사용해 사이트에 적용할 robots.txt 파일을 작성하거나 수정
            - **형식 및 위치 규칙**
                - 파일이름은 robots.txt
                - 파일위치는 루트
                - 사이트에는 파일이 하나만 있어야 함
            - **구문**
                - UTF-8로 인코딩된 텍스트 파일(ASCII 포함)
                - robots.txt 파일은 하나 이상의 그룹으로 구성됨
                - 대소문자를 구분함
                - 각 그룹은 여러 규칙 또는 명령으로 구성되며 행마다 명령이 하나씩 있음
            - **robots.txt 파일에서 사용되는 명령**
                1. User-agent
                    - 필수명령, 규칙당 하나 이상으로 검색엔진 로봇 이름
                    - 모든 규칙의 첫 행
                    - 사용자 에이전트 이름
                        - http://www.robotstxt.org/db.html
                        - https://support.google.com/webmasters/answer/1061943
                    - 별표를 사용하면 이름을 명시적으로 지정해야 하는 여러 AbsBot 크롤러를 제외한 모든 크롤러에 규칙을 적용할 수 있음
                    - Google 크롤러 이름 목록 확인
                        - https://support.google.com/webmasters/answer/1061943
                2. Disallow
                    - 규칙당 하나 이상의 Disallow 또는 Allow 항목 필수
                    - 크롤링을 하면 안되는 루트 디메인 관련 디렉토리, 페이지
                    - 페이지는 브라우저에 표시되는 전체 페이지 이름
                    - 디렉토리는 기호 /로 끝나야 함
                3. Allow
                    - 규칙당 하나 이상의 Disallow 또는 Allow 항목 필수
                    - 크롤링해야 하는 루트 도메인 관련 디렉토리, 페이지
                    - 허용되지 않은 디렉토리안에 하위 디렉터리나 페이지를 크롤링할 수 있도록 Disallow를 재정의할 때 사용
                4. Sitemap
                    - 선택사항으로 파일당 0개 이상
                    - 웹사이트의 사이트맵 위치
                    - 정규화된 URL
                    - Google에서 크롤링 할 수 있거나 할 수 없는 컨텐츠를 표시하는 것이 아니라 크롤링을 해야 하는 컨텐츠를 표시할때 좋은 방법
        3. 전체 robots.txt 구문
            - https://developers.google.com/webmasters/control-crawl-index/docs/robots_txt
        4. robots.txt 규칙
            - 전체 웹 사이트 크롤링 금지
            - 디렉토리 및 디렉토리에 포함된 내용의 크롤링 금지
            - 크롤러 하나에만 액세스 허용
            - 하나를 제외한 모든 크롤러에 액세스 허용
            - 웹페이지 하나의 크롤링 금지
            - Google 이미지의 특정 이미지 크롤링 차단
            - Google 이미지의 사이트 내 모든 이미지 크롤링 차단
            - 특정 형식의 파일 크롤링 금지
            - 전체 사이트의 크롤링을 금지하지만 페이지에 애드센스 광고를 표시하는 경우
            - 특정 문자열로 끝나는 URL에 적용
    - **robots.txt 테스터**
        - https://www.google.com/webmasters/tools/robots-testing-tool
        - robots.txt테스터도구로 robos.txt 파일이 사이트의 특정 URL에서 Google 웹 크롤러를 차단하는지 알려줌.
    - **robots.txt Google 제출**
        - robots.txt 테스터 도구의 제출 기능을 사용해 Google을 쉽게 실행시켜 사이트의 새로운 robots.txt 파일을 더욱 신속하게 크롤링하고 색인 생성하도록 요청함.
    - **파일 위치 및 유효성 범위**
        - 호스트의 최상위 디렉터리에 위치
        - 관련 프로토콜과 포트 번호를 통해 액세스할 수 있어야 함
        - Google 검색의 경우 HTTP, HTTPS로 robots.txt파일은 조건부가 아닌 HTTP GET 요청을 사용해 가져옴
    - **유효한 robots.txt URL**
    - **HTTP 결과 코드 처리**
        - robots.txt 파일을 가져오면 세가지 서로 다른 결과가 나타남
            - 전체 허용, 전체 금지, 조건부 허용
    - **파일 형식**
        - UTF-8로 인코딩된 일반 텍스트, CR, CR/LF, LF로 구분된 행으로 구성됨
        - robots.txt 파일 첫부분의 선택적 유니코드 BOM(바이트 순서 표시)은 무시됨
        - 크롤러당 최대 파일 크기가 제한될 수 있음. 최대 파일 크기를 넘는 컨텐츠는 무시됨. Google에서는 500kib로 제한됨.
        - 파일크기를 줄이기 위해 제외된 자료를 별도의 디렉토리에 배치해서 통합
    - **공식 구문/정의**
    - **행 및 규칙 그룹**
        - 하나 이상의 user-agent 행에 하나 이상의 규칙이 이어짐
        - 그룹은 user-agent 행 또는 파일의 끝으로 종료됨
    - **user-agent 우선순위**
        - 특정 크롤러에 대해 하나의 그룹만 유효함
        - googlebot/1.2와 gootglebot*은 googlebot과 같음
        - robots.txt 파일 내 그룹의 순서는 관련이 없음
        - 특정 user-agent에 두 개 이상의 그룹이 선언된 경우 특정 user-agent에 적용되는 그룹의 모든 규칙이 하나의 그룹에 결합됨
    - **group-member 규칙**
        - disallow
        - allow
    - **경로값에 의한 URL 일치**
        - *
        - $
    - **Google에서 지원하는 non-group-member행**
        - sitemap
    - **group-member 행의 우선순위**
    - **robots.txt 마크업 테스트**
        - Search Console의 robots.txt 테스터
            - https://support.google.com/webmasters/answer/6062598?hl=ko
        - Google 오픈소스 robots.txt 라이브러리
            - https://github.com/google/robotstxt
2. sitemap.xml
    - **sitemap.xml 이란?**
        - 웹사이트 내 모든 페이지 목록을 나열한 파일, 책의 목차
            - 일반 크롤링 과정에서 쉽게 발견되지 않는 웹페이지도 크롤링되고 색인됨
    - **sitemap.xml 위치**
        - robots.txt와 달리 반드시 루트에 위치하지 않아도 되나 관습적으로 루트에 위치
            - /sitemap.xml으로 다른 웹사이트의 설정 참고
    - **sitemap.xml 양식**
        - sitemap.org
        - 무료 생성 사이트
        - https://www.twinword.co.kr/blog/3-different-ways-to-generate-and-submit-sitemap/
    - **sitemap.xml SEO 영향력**
        - robots.txt와 같이 파일을 생성했다고 SEO 점수에 영향을 주지는 않음
        - 넓은 의미에서 sitemap.xml 설정시 SEO에 긍정적 영향
            - 일반 크롤링 과정에서 발견되지 않는 웹페이지에 대한 정보를 제공해 크롤링되고 색인될 수 있게 도와줌.
    - **sitemap.xml 제한사항**
        - 여러개의 사이트맵 or 사이트맵 인덱스 파일을 robots.txt에 지정할 수 있음
        - 하나의 사이트맵 인덱스 파일에 최대 5만개 사이트맵 지정 가능, 압축 전 50MB 이하여야 함
        - 하나의 사이트맵 인덱스 파일에 파일 크기 제한 등을 고려할 때 만개를 넘지 않도록 권장
        - robots.txt 파일에 3개의 사이트맵 인덱스 파일을 지정하고 만개의 사이트맵과 만개의 주소를 지정한다고 하면, 3 x 10,000 x 10,000 = 3억개의 웹페이지 색인용 주소를 지정할 수 있음
    - **사이트맵을 쉽게 만드는 3가지 방법과 제출하는 방법**
        1. sitemap.xml 만드는 3가지 방법
            - **사이트맵 제작 웹사이트**
                - https://www.xml-sitemaps.com/
                    - 웹사이트 도메인 입력
                    - More Options
                        - Page Last modification : 페이지가 마지막으로 변경된 날짜에 대한 데이터를 사이트맵에 추가하고 싶은지, 크롤러가 변경되지 않은 페이지를 재크롤링하는 것을 방지 
                        - Page Priority : 페이지별 중요도를 페이지 뎁스에 기반해 자동으로 설정, 페이지별 중요도를 설정하지 않아도 자동 산출되어 지정됨
                        - Change Frequency : 웹사이트 콘텐츠가 얼마나 자주 업데이트되는지에 대한 정보를 사이트맵에 추가할 수 있는 기능, 기본 설정으로는 비활성화되있으나 항상 ~ 전혀 되지 않음까지 선택할 수 있음
            - **크롤링 프로그램**
                - 보통 크롤링 프로그램은 웹사이트 SEO 진단을 하기 위한 툴로 사용되나 세부적인 설정을 한 사이트맵도 만들수 있음
                - https://www.screamingfrog.co.uk/seo-spider/
                - https://www.twinword.co.kr/blog/seo-tools-for-website-audit/
                - Screaming Frog
                    - 도메인 입력 후 Start
                    - Sitemap > XML Sitemap 후에 세부사항 설정
            - **Yoast SEO 플러그인**
                - 워드프레스를 기반으로 하는 웹사이트의 사이트맵 생성
                - https://wordpress.org/plugins/wordpress-seo/
        2. sitemap.xml 제출
            - 사이트맵 제출 전 생성한 사이트맵 파일을 웹사이트에 업로드
            - **구글 서치콘솔에 사이트맵 제출**
                - Google Search Console -> Sitemaps -> Enter sitemap URL -> Submit
            - **네이버 서치 어드바이저에 사이트맵 제출**
                - 구글 서치콘솔은 여러개의 사이트맵을 제출할 수 있으나 서치 어드바이저는 웹사이트당 1개의 사이트맵만 제출가능
                - Naver Search Advisor -> 요청 -> 사이트맵 제출
3. schema.org
    - https://schema.org/docs/documents.html
    - https://schema.org/Blog
    - https://www.loudnoises.us/adding-schema-data-to-next-js-sites/
    - https://www.hallaminternet.com/add-article-schema-markup-to-blog-posts/
4. Google SEO
    - https://support.google.com/webmasters/topic/9456575?hl=ko&ref_topic=9428048
    - https://developers.google.com/search?hl=ko
    - **구조화된 데이터로 리치 결과 사용 설정**
        1. 검색 갤러리
            - https://developers.google.com/search/docs/guides/search-gallery?hl=ko
        2. 구조화된 데이터 작동 방식 이해
            - 페이지에 구조화된 데이터를 포함하면 Google에 페이지의 의미에 관한 확실한 단서를 제공해 내용을 파악하는데 도움을 줌.
            - **구조화된 데이터 형식**
                - JSON-LD(권장), 마이크크로데이터, RDFa
            - **구조화된 데이터 가이드라인**
                - https://developers.google.com/search/docs/guides/sd-policies?hl=ko
            - **구조화된 데이터 빌드, 테스트, 출시**
                - https://developers.google.com/search/docs/guides/prototype?hl=ko
        3. 가이드라인 따르기
            - **기술 가이드라인**
                - 리치 결과 테스트, URL 검사 도구를 사용해 기술 가이드라인 준수 여부 테스트
                    - https://search.google.com/test/rich-results?hl=ko
                    - https://support.google.com/webmasters/answer/9012289?hl=ko
                1. 형식
                    - JSON-LD(권장), 마이크로데이터, RDFa
                2. 액세스
                    - robots.txt, noindex, 기타 액세스 제어 방법을 사용해 Googlebot이 구조화된 데이터 페이지에 액세스할 수 없도록 차단하지 않기
            - **품질 가이드라인**
                - 품질 가이드라인은 자동화된 테스트 도구가 없음
                - 품질 가이드라인을 위반하면 구조화된 데이터 구문이 올바르다 할지라도 Google 검색에 리치 결과로 표시되지 않거나 스팸으로 표시될 수 있음
                1. 콘텐츠
                    - Google 웹마스터 품질 가이드라인 따르기
                        - https://support.google.com/webmasters/answer/35769?hl=ko#quality_guidelines
                2. 관련성
                3. 완전성
                4. 위치
                5. 특수성
                6. 이미지
                7. 여러 항목이 있는 페이지
        4. 구조화된 데이터 Codelab
            - https://codelabs.developers.google.com/codelabs/structured-data/index.html#0
        5. 자바스크립트로 구조화된 데이터 생성
            - **Google 태그 관리자를 사용해 동적으로 JSON-LD 생성**
                1. Google 태그 관리자에서 변수 사용
            - **맞춤 자바스크립트로 구조화된 데이터 생성**
            - **서버 측 렌더링 사용**
            - **구현 테스트**
        6. 구조화된 데이터 빌드, 테스트 및 출시
            - **새 페이지 만들기**
            - **기존 페이지 수정하기**
            - **직접 조치가 적용된 페이지 수정하기**
                1. 구조화된 데이터와 관련된 일반적인 오류
5. next/head, _document
    - **공통 head 태그**
        - _document
            - html
                - lang
            - link
                - script
                - stylesheet
                - icon
                - font
                - manifest
            - meta
                - charset
                - viewport
                - theme-color
    - **각 페이지별 head 태그 적용**
        - next/head의 Head
            - title 
            - description metaTag
            - 소셜 미디어 태그
                - Open Graph 태그
                - 트위터 카드 태그
6. SEO 마케팅 가이드
    - https://www.twinword.co.kr/blog/search-engine-optimization-guide/
    - **검색엔진최적화란?**
        1. SEO란 
            - 검색엔진 결과 페이지에 웹페이지의 순위, 노출도를 높여 트래픽을 높이는 최적화 작업
            - 키워드 광고가 아닌 자연 검색어 결과를 개선하는 것이 목표
            - SEO시 검색엔진 시장상황 고려
                - 한국, 중국, 러시아 이외의 국가를 타겟으로 하는 회사는 구글 SEO를 먼저 고려
                - https://www.twinword.co.kr/blog/search-engine-statistics/
                - https://www.alexa.com/topsites
        2. SEO 중요성
            - 트래픽 증감에 따라 회사 매출, 수익 규모에 영향
            - https://chitika.com/의 구글 검색 결과 페이지 웹로그 분석 결과
                - 91.5%의 트래픽이 검색결과 첫 페이지
                - 첫페이지 1순위는 32%, 10순위는 2%
        3. SEO vs 검색광고
            - 검색광고는 검색엔진에 비용을 지불, 보통 클릭당비용 방식으로 책정이 됨.
            - 대부분의 사람들이 광고가 표시된 결과보다 자연스럽게 올라온 검색결과를 선호함.
            - SEO는 검색엔진에 반영되기까지 최소 3개월이 걸리나 검색광고는 광고를 등록하면 곧바로 반영됨.
            - https://www.twinword.co.kr/blog/what-is-the-difference-between-seo-and-ppc/
    - **검색엔진최적화(SEO) 방법**
        - 2017년 기준 구글 검색결과 순위 랭킹 요소는 200여가지, 모든 요소는 중요도가 다르기 때문에 가장 중요한 최적화 요소를 파악후 적용.
        1. 보안 프로토콜(HTTPS)
            - 구굴은 HTTP보다 HTTPS를 사용하는 웹 사이트에 더 높은 점수 부여
            - 2017년부터 HTTPS가 아닌 사이트 방문시 주소창에 경고 표시
        2. robots.txt & sitemap.xml
            - robots.txt는 루트에 위치해야 하며 검색엔진 로봇 접근을 제어하고 사이트맵 위치를 알려줌.
            - sitemap.xml은 웹사이트 내 모든 페이지의 목록을 나열한 파일로 일반 크롤링에서 쉽게 발견되지 않는 웹페이지도 크롤링되고 색인화시킴. 웹사이트의 구성이 복잡하고 깊이가 깊은 계층형 구조를 가진 사이트는 사이트맵을 필수로 가지고 있어야 함.
        3. title & metaTag description metaTag (SEO metaTag)
            - title
                - 웹페이지의 제목
                - 영문의 경우 공란 포함 65자, 한글은32자
                    - 적정길이가 넘어갈시 뒷부분이 잘림
            - metaTag description
                - 웹페이지의 중심 내용을 요약해 설명
                - 영문 320자, 한글 160자
                    - 적정길이가 넘어갈시 뒷부분이 잘림
            - title, description은 사용자 클릭율에 큰 영향을 미치기 때문에 적절한 키워드, 문구를 통해 태그 최적화, 구글 SEO 작업 수행
        4. 소셜 SEO metaTag
            - Open Graph 태그와 트위터 카드 태그 설정
            - 구글 웹사이트 최적화 랭킹 요소 분적자료에는 웹사이트의 소셜미디어 활동 관련 지표가 있음
                - 구글플러스에서의 공유, 페북으로 들어오는 트래픽 등
            - 웹사이트 콘텐츠를 소셜미디어에서 공유하고 퍼블리싱하는 작업도 SEO를 위해 해줘야함
            - Open Graph 태그는 페북과 같은 소셜미디어에서 웹페이지 URL이 공유될 때 웹페이지의 주요 정보가 표기되는 방식을 관리하는 역할.
                - Open Graph 태그를 사용하지 않는 페이지가 소셜미디어에서 공유되면 소셜미디어 크롤러가 임의로 제목, 이미지, 설명, 콘텐츠를 가져가서 마음대로 사용
            - https://www.twinword.co.kr/blog/sns-marketing-strategy/
        5. 이미지 태그 및 최적화
            - 구글 이미지 검색 사용률이 높아지고 있음
                - https://www.twinword.co.kr/blog/seo-for-google-image-search/
            - SEO에 가장 중요한 속성은 alt
                - alt가 잘 설정되어있으면 구글 이미지 검색에서 높은 검색순위를 차지하고 스크린리더를 사용하는 사람에게 페이지 이해를 하는데 도움을 줌
        6. 모바일 최적화
            - 반응형 웹사이트를 만들 것
            - 구글 SEO 랭킹 요소 중 모바일 최적화는 매우 중요
            - 구글 모바일 친화성 테스트
                - https://search.google.com/test/mobile-friendly
            - 모바일 최적화 2가지 방법
                1. 반응형 웹사이트
                    - 하나의 페이지 소스로 다양한 기기의 페이지 해상도, 레이아웃에 맞는 화면을 유동적으로 보여주는 사이트
                2. 모바일용 웹사이트
                    - Canonical, Alternate 태그 등을 활용해 데스크톱 웹사이트와 모바일용 웹사이트 관계를 확실히 명시
        7. 대표 주소 설정
            - https / http / with www / without www
            - SEO의 핵심은 내 도메인, URL의 최적화 점수를 높이는 것
            - 하나의 페이지에 접속 방법이 여러가지라면 하나의 대표 주소를 정하고 나머지에 대해선 리다이렉트를 설정
            - **대표 주소 설정 방법**
                - https://www.twinword.co.kr/blog/how-to-set-your-preferred-domain/
                1. 웹사이트 대표 주소란
                    - 4가지 접근 방법 중 어떤 주소를 입력하든 특정 하나의 주소로 접속을 통일해 트래픽을 제공하는 주소
                    - 대표주소설정을 통해 검색 사용자나 타깃 고객에게 일관된 주소 정보를 제공하므로 높은 인지도를 얻도록 함
                    - 4가지 접근 방법
                        - http://example.com
                        - http://www.example.com
                        - https://example.com
                        - https://www.example.com
                2. 대표 주소가 SEO에 주는 영향
                    - 접속할 수 있는 방법이 여러개인 경우 도메인 점수가 분산되어서 SEO에 좋지 않음
                    - 도메인 점수(Domain Authority)란 해당 사이트가 검색엔진에서 어느 정도의 상위 랭킹에 오를수 있을지를 예측한 점수로서, 인바운드 링크, 콘텐츠 품질, 웹사이트 운영 히스토리 등의 다양한 측면을 고려해 측정한 점수이며, 검색 순위에도 영향을 끼치는 중요한 요소. 
                3. 전체 도메인 주소별 부여되는 도메인 점수
                    - 서브도메인보다 서브폴더 방식을 사용한 주소 체계를 가질 것.
                    - 프로토콜이 다를 경우 다른 웹사이트 주소로 인식
                4. 대표 주소 설정 방법
                    - **웹서버**
                        - .htaccess
                    - **구글서치콘솔**
                        - 웹서버 설정고 다르게 별도로 검색엔진에 대표 주소를 알려 줌
                        - 구글에게 대표 백링크 정보를 알려줄 수 있기 때문에 이 설정은 중요함.
                5. 한글 주소 vs 영문 주소
                    - 사용자가 읽기 쉽고 해당 컨텐츠의 의미를 파악할 수 있도록 웹주소 정하기, 확장자가 없으면서 전체 주소가 보여지는 형태가 가장 좋음
                        - https://www.twinword.co.kr/blog/digital-marketing-forecast-2019/
                        - https://www.twinword.co.kr/blog/2019년을-이끌어-갈-5가지-디지털-마케팅-트렌드/
                    - 한글이 가독성이 높으나 소셜 미디어 공유 등을 하게되면 암호처럼 보이기때문에 SNS에서는 가독성이 떨어짐
                    - 일반적으로 영문을 추천함. 웹주소는 캐노니컬 태그와 사이트맵, 소셜 공유 등 여러 곳에 사용되면서 가능한 접근에 오류가 나지 않아야 함.
        8. 키워드 및 컨텐츠 최적화
            - 구글은 독특하고 정보가 풍부한 컨텐츠를 좋아함
                - 콘텐츠 기획시 웹사이트가 어떤 분야, 주제와 관련이 있어야 할지에 대해 고민하고 그 주제와 관련된 키워드를 찾은 후 콘텐츠 작성
            - 키워드 리서치 툴
                - 구글 키워드 플래너
                - https://www.twinword.com/ideas/
            - 회사와 관련이 있으면서 검색량이 높고 경쟁지수가 낮은 키워드를 선정해 웹사이트 콘텐츠, 타이블, 메타디스크립션 태그, 이미지 alt태그, URL 이름 등 다양한 부분에 적용시켜 최적화
            - https://www.twinword.co.kr/seo-book-by-twinword/
## 10. SSR,CSR,SPA(Nextjs)
1. CSR vs SSR
    - **CSR**
        1. 정의
            - 처음에 웹서버에 요청할 때 데이터가 없는 문서를 반환
            - HTML,static파일들이 로드되면서 데이터가 있으면 데이터 또한 서버에 요청하고 그것이 화면상에 나타나게 된다.
            - Browser가 서버에 HTML,static파일을 요청한 후 로드되면 사용자 상호작용에 따라서 javascript를 통해 동적으로 Rendering한다. 필요에 따라 데이터를 서버에 요청해서 받아와 Rendering한다.
        2. 장점
            - 첫로딩후 화면간 라우팅에서 사용자 UX가 좋음
            - 서버에 요청횟수가 적음
        3. 단점
            - 첫로딩시 시간이 오래 걸림
                - 리소스를 Chunk단위로 묶어서 요청할 때만 다운받게 하는 방식으로 완화시킬수 있으나 해결할 수 없다
            - SEO 문제 발생
                - 구글 검색엔진은 javascript까지 크롤링을 하나 다른 검색엔진은 못한다.
    - **SSR**
        1. 정의
            - 완전하게 만들어진 HTML 파일을 받아오고 Rendering
            - 웹서버에 요청할때 마다 Browser 새로고침이 일어나고 서버에 새로운 페이지에 대한 요청을 하는 방식
        2. 장점
            - 초기 로딩 속도가 빠름
            - 모든 검색엔진에 SEO 가능
        3. 단점
            - 매번 페이지 요청시 새로고침되서 사용자 UX가 떨어짐
            - 서버에 매번 요청을 해야해서 트래픽, 서버 부하가 커짐
    - **SPA, MPA**
        1. SPA
            - 단 하나의 HTML파일로 이뤄진 애플리케이션
            - 서버로부터 처음에만 페이지를 받아오고 이후에는 동적으로 DOM을 구성해서 Rendering(CSR)
        2. MPA
            - 화면마다 HTML파일이 존재하고, 사용자가 그 화면을 요청할 때마다 웹서버가 필요한 데이터와 HTML로 파싱해서 보여주는 방식의 웹 애플리케이션
            - 동적이지 않은 페이지를 상황에 맞게 클라이언트에 뿌려줌(SSR)
        3. SPA에서의 SSR구현
            - SPA에서 CSR, SSR 장점을 모두 구현할 수 있다
            - 서버, 클라이언트가 Node.js로 같으면 가능하다.(Isomorphic Javascript) 서버와 클라이언트가 동일한 코드로 동작.
            - ReactDOMServer 라이브러리를 이용해 SSR 구현 가능
            - React는 Nextjs, Vue는 Nuxtjs
2. Nextjs SSR
    - **Custom server**
        ```javascript
        // server.js
        const { createServer } = require('http')
        const { parse } = require('url')
        const next = require('next')

        const dev = process.env.NODE_ENV !== 'production'
        const app = next({ dev })
        const handle = app.getRequestHandler()

        app.prepare().then(() => {
        createServer((req, res) => {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl

            if (pathname === '/a') {
            app.render(req, res, '/a', query)
            } else if (pathname === '/b') {
            app.render(req, res, '/b', query)
            } else {
            handle(req, res, parsedUrl)
            }
        }).listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
        })
        ```
    - **getServerSideProps**
        ```typescript
        import { InferGetServerSidePropsType } from 'next'

        type Data = { ... }

        export const getServerSideProps = async () => {
        const res = await fetch('https://.../data')
        const data: Data = await res.json()

        return {
            props: {
            data,
            },
        }
        }

        function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
        // will resolve posts to type Data
        }

        export default Page
        ```
    - **SWR**   
        ```javascript
        import useSWR from 'swr'

        function Profile() {
        const { data, error } = useSWR('/api/user', fetch)

        if (error) return <div>failed to load</div>
        if (!data) return <div>loading...</div>
            return <div>hello {data.name}!</div>
        }
        ```
    3. Naver SSR
    - https://d2.naver.com/helloworld/2177909
    - **레거시 시스템 전환 전략**
        - 점진적으로 배포하기 위해 URL 단위의 배포 전략을 사용
    - **Reverse Proxy**
        - URL 단위 배포를 위해 reverse proxt 구조 사용
        - 사용자 요청이 프록시 서버를 통해 웹 서버에 전달되고 웹 서버가 처리한 응답이 다시 프록시 서버를 통해 클라이언트로 전달된다
        - reverse proxy는 주로 네트워크와 외부 네트워크 사이를 분리해 보안 이슈를 해결하기 위해 사용되나 점진적 URL 단위 배포를 위해 이를 이용
        - m.blog.naver.com/페이지로 접근시 reverse proxy에서 Nodejs SSR 전환이 완료된 페이지의 경우에 Nodejs SSR을 서빙하고 그렇지 않은 페이지의 경우 기존 블로그 페이지를 서빙
    - **Nodejs 기반의 SSR 환경 구성**
        - React + Nextjs를 사용하지 않고 Nodejs 기반의 SSR 환경을 자체 구축. 소규모 프로젝트의 경우 Nextjs 도입 권장
        - 안정성, 투명성 관점에서 보다 우위에 있는 기술 스택을 선정
    - **대국민 서비스를 위한 준비**
        1. 전세계에서 사용하는 Node.js
            - Nodejs는 이벤트 루프와 단일 스레드 모델을 사용함으로써 node-blocking I/O와 멀티 태스크가 가능한 구조로 설계된 언어. 구조적으로 조회성 서비스에서는 훌륭한 성능과 안정성을 가짐
            - 글로벌 서비스에도 Nodejs는 적용되어있음
        2. 성능 테스트
            - 성능 테스트 목적
                - 애플리케이션과 서버환경의 최적의 환경을 찾는것
                - 최적의 환경에서 어느 정도의 부하를 견뎌낼 수 있는지를 검증하고 인지하는 것. 즉, 시스템 가용량을 확인.
            - 두가지를 검증하기 위해 시스템의 임계치까지 부하를 줌. 테스트 환경을 준비하고 부하를 주어 시스템이 최대로 수용할 수 있는 TPS(Transactions Per Seconds)를 찾기로 함
            - Nodejs의 경우 단일 스레드이기 때문에 하나의 요청은 하나의 CPU core만을 사용함. 보통 서버의 core는 멀티 core를 지원하기 때문에 Nodejs 인스턴스를 몇개를 사용해야 최적의 성능을 나타낼 수 있는지 반드시 확인이 필요하다.
                - Nodejs의 인스턴스를 클러스터링할 수 있는 PM2 사용
                    - https://pm2.keymetrics.io/
        3. 에러 대응
            - Nodejs의 경우 비동기 코드 중심의 개발이기 때문에 코드구현보다 코드 안전성을 확보하는 것이 보다 더 중요함
            - Nodejs의 경우 비동기 상황에서 발생하는 에러의 경우 UncauhtException이 발생하고 이로 인해 Nodejs 프로세스가 죽는 경우도 발생함.
                - Nodejs를 사용하는 모든 애플리케이션에서는 UncaughtException에 대한 에러 처리를 해야함
            - 그러나 UncaughtException 에러처리만으로 궁극적으로 이 문제를 해결할 수 없음. Nodejs 공식 문서에서도 에러 복구보다 인스턴스 자체를 재시작하기를 권장함.
                - https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
            - Nodejs 내에서 동작하는 핵심 플로우의 에러 상황 검증을 위한 단위 테스트 도입
        4. 롤백 플랜
            - 성능테스트로 부하를 검증하고 단위테스트로 에러를 검증했어도 현실에서 예측하지 못한 상황이 발생할 수 있으므로 모든 시스템의 배포와 전환 시에는 항상 롤백 플랜이 준비되어 있어야 한다.
            - Nodejs SSR 장점은 SSR 구조이나 초기 진입 부분만 변경하면 CSR 형태의 서비스도 쉽게 제공할 수 있다. 이를 이용해 단계적 롤백 플랜을 세울 수 있다.
                - 사용자 부하를 받지 못하거나 장애가 발새아는 경우 CSR 페이지 노출
                - CSR 페이지가 장애가 발생한 경우 프론트엔드 전환 전 페이지 노출
            - Nodejs SSR을 이용하면 보다 다양한 선택지를 이용해 롤백 및 장애 대응 준비를 할 수 있다.
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
1. Overview
    - **Viewport 설정**
    - **Viewport에 맞게 컨텐츠 크기 조정**
    - **CSS Media Query**
    - **BreakPoint**
2. Patterns
    - **Fluid**
    - **Column drop**
    - **Layout shifter**
    - **Tiny tweaks**
    - **Off canvas**
3. Responsive Images
    - **Art direction**
    - **Responsive Images**
    - **Markup Image**
    - **CSS Image**
    - **SVG Icons**
    - **Image 최적화**
    - **Image 피하기**
4. Multi-Device Content
    - **사람들이 웹에서 읽는 방법**
    - **모바일용 글쓰기**
    - **10억 사용자**
    - **불필요한 콘텐츠 제거**
    - **다양한 뷰포트 크기에서 잘 작동하도록 콘텐츠 디자인**
    - **데이터 비용 이해**
## 18. Animation
1. Overview
    - **애니메이션에 적합한 항목 선택**
    - **애니메이션을 사용해 상호 작용 지원**
    - **값 비싼 속성 애니메이션 피하기**
2. CSS Versus JavaScript
    - **CSS로 애니메이션**
    - **JavaScript 및 Web Animations API를 사용해 애니메이션**
3. Easing Basic
    - **Easing Keyword**
    - **선형 애니메이션**
    - **Ease-out**
    - **Ease-in**
    - **Ease-in-out**
4. Custom Easing
    - **더 많은 제어를 위해 JavaScript 프레임 워크 사용**
5. Animating Between Views
6. Choosing the Right Easing
7. Animating Modal Views
8. Animation Timing
9. Animations and Performance
    - **will-change 속성**
    - **CSS vs Javascript Performance**
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
1. Overview
2. Focus
    - **Foucs 소개**
    - **DOM Order Matters**
    - **Using tabindex**
3. Semantics Built-in
    - **Semantics 소개**
    - **Accessibility Tree**
    - **Text Alternatives for Images**
    - **Navigating Content**
4. Semantics & ARIA
    - **ARIA 소개**
    - **ARIA Labels & Relationships**
    - **Hiding and Updating Content**
5. Accessible Styles
    - **접근 가능한 탭 타겟**
    - **색상 및 대비 접근성**
    - **접근 가능한 반응형 디자인**
    - **콘텐츠 재정렬**
6. Accessibility Review
## 19. CrossBrowser
1. Cross Browser Testing 이란
2. Test 수행 전략
3. HTML, CSS 문제 처리
4. JavaScript 문제 처리
5. Accessibility 문제 처리
6. 기능 감지 구현
7. 자동화 테스트
8. 자체 테스트 자동화 환경설정
## 20. Performance
1. Overview
2. RAIL Model
3. Loading
4. Rendering
5. Audit Site
## 21. Security
1. Overview
2. Content Security Policy
3. Encrypting Data In Transit
4. Preventing Mixed Content
5. I've been hacked
## 21. Web.dev
- https://web.dev/learn/
- **Performance**
    1. Web Vitals
    2. Metrics
    3. Fast load times
- **Build excellent websites**
    1. PWA
    2. Accessible to all
    3. Network reliability
    4. Safe and secure
    5. Easily discoverable
    6. Web Payments
    7. Media
    8. Devices
    9. Animations
- **Lighthouse**
    1. Performance audits
    2. PWA audits
    3. Best Practices audits
    4. Accessibility audits
    5. SEO audits
## 21. Chrome Dev Tool
- https://developers.google.com/web/tools/chrome-devtools?hl=ko
1. CSS
2. Console
3. Network
4. Storage
5. Issues
6. Command Menu
7. Mobile Simulation
8. DOM
9. JavaScript
10. Performance
11. Accessibility
12. Remote Debugging
13. Memory
14. Media
15. WebAuthn
16. Workspaces
17. PWA
18. Security
19. Keyboard Shortcuts
20. Resources
21. Customize
22. Extend DevTools
## 22. CICD(CircleCI(Test,Build,Deploy))
1. CICD
2. Test(jest, react-testing-library, cypress)
- 정적 분석 : eslint, prettier, typescript
- 단위 테스트 : jest
- 통합 테스트 : jest, react-testing-library
- 엔드투엔드 테스트 : cypress
3. Build & Deploy
    - serverless-nextjs
    - aws
4. CircleCI
    - https://www.serverless.com/blog/ci-cd-workflow-serverless-apps-with-circleci
    1. CICD Process Flow
    1. continuous integration
        - commit code -> build -> unit testing -> integration testing
    2. continuous delivery
        - deploy to QA -> acceptance testing
    3. continuous development
        - deploy to PRO

    2. CircleCI 계정 설정
    - 가입후 github repository와 연결

    3. AWS IAM 사용자 생성
    - https://serverless.com/blog/abcs-of-iam-permissions/
    - AWS 자격 증명으로 CircleCI 구성

    4. .circleci/config.yml
    ```yml
    jobs:
        build:
        ...

        steps:
            - checkout

            # Download and cache dependencies
            - restore_cache:
                keys:
                - dependencies-cache-{{ checksum "package.json" }}
                # fallback to using the latest cache if no exact match is found
                - dependencies-cache

            - run:
                name: Install Serverless CLI and dependencies
                command: |
                sudo npm i -g serverless
                npm install

            - run:
                name: Run tests with code coverage
                command: npm test --coverage

            - run:
                name: Deploy application
                command: sls deploy

            - save_cache:
                paths:
                - node_modules
                key: dependencies-cache-{{ checksum "package.json" }}
    ```

    5. 고급 배포 패턴 고려
    1. 다중 지역 배포
    2. 패키징 및 배포 분리
    3. 카나리아 배포
    4. 블루/그린 배포
6. CircleCI 통합 (Jira, Slack)

## 23. AWS(serverless-nextjs)
- https://falsy.me/%EC%83%88%EB%A1%9C%EC%9A%B4-%EB%B2%84%EC%A0%84-serverless-framework%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-nextjs-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-aws-lambda%EB%A5%BC-%ED%86%B5/
- https://github.com/serverless-nextjs/serverless-next.js
1. Intro
    -  @sls-next/serverless-component@1.18.0를 사용해 Cloud Front, Lambda@edge, s3에 바로 배포
2. Install Package
    - npm i -D serverless @sls-next/serverless-component
    - package.json scripts 수정
3. Serverelss
    - serverless.yml
        ```yml
        falsyExempleServerlessNext:
            component: '@sls-next/serverless-component@1.18.0'
            inputs:
                bucketName: 'p8wwk29-yw4lkv5'
                cloudfront:
                    distributionId: E32TVQDNHII1LX
                name:
                    defaultLambda: 'utopier-blog-frontend-default-lambda'
                    apiLambda: 'utopier-blog-frontend-api-lambda'        
        ```
    - bucketName은 Next 파일이 업로드 될 S3 버킷 이름
    - distributionId는 처음에 배포했던 클라우드프론트의 ID 값
    - defaultLambda, apiLambda는 serverless-next에서 생성해주는 두개의 람다 이름 
4. 배포
    - npm run deploy or npx serverless
## 24. Devops(Agile, MSA, Git, Git-flow, Github, Slack, Jira)
1. [O]github
   - git config --list
   - Git Hosting Service로 github 사용
   - New Repository 생성
     - https://github.com/utopier/utopier-blog-frontend.git
   - git init
   - git add .
   - git commit -m 'First Commit'
   - git remote add origin https://github.com/utopier/utopier-blog-frontend.git
   - git push --set-upstream origin master
   - git push -u origin master
2. [O]github + jira
   - Smart Commit (JIRA + Github)
   - Jira
     - 프로젝트 만들기 (이름: utopier-blog, 키: UB, 칸반)
     - App -> Github for Jira
     - 앱관리 -> Github -> Configuration
     - 프로젝트 -> 항목추가 -> 저장소 -> https://github.com/utopier/utopier-blog-frontend.git
     - Smart Commit Test~
3. [O]github + slack
   - Slack
     - 워크스페이스 생성 (utopier-blog)
     - App -> Github
     - Github -> /github subscribe utopier/utopier-blog-frontend -> /github subscribe list -> /github subscribe list features
   - Github
     - Accout Settings -> Applications -> Slack -> Repository access
4. [O]jira + Slack
   - Slack
     - App -> Jira Cloud
     - /jira connect
   - JIRA
     - Slack Integration -> Edit
   - Slack
     - App -> Jira -> /jira create
5. [O]Software Process(git-flow, agile, Slack, Jira, Software Engineering)
   - **git-flow strategy**
     - master
       - origin/master, Tag
       - 배포준비된 코드
       - 병합시 git hook 스크립트로 자동 배포
     - develop
       - origin/develop
       - 배포하기 위해 개발하는 코드
     - feature
       - 기능 개발 브랜치
       - 시작브랜치: feature
       - 병합대상 브랜치: develop
       - 브랜치 이름 규칙: feature/{issue-number}-{feature-name}
     - release
       - 실제 배포할 상태가 된 경우
       - 시작브랜치: develop
       - 병합대상 브랜치: develop, master
       - 브랜치이름 규칙: origin/release-..., Tag
     - hotfix
       - 배포된 운영버전에서 발생한 문제 해결
       - 시작브랜치: master
       - 병합대상 브랜치: develop, master
       - 브랜치이름 규칙: origin/hotfix-..., Tag
   - **Process**
     - 작업 시작전 JIRA 티켓 생성
     - 하나의 티켓은 하나의 커밋
     - 코드 리뷰 -> Pull Request 및 merge

---