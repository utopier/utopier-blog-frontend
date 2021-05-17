## Page Rendering Policy
1. **Tech**
    - StaticSite, iframe, XMLHttpRequests, Ajax
    - SPA
    - SSR,SSG,CSR(with TTV,TTI)
    - StateManagement
        - Redux
        - Redux Saga
    - Nextjs + React
        - Pages
        - DataFetching
        - Routing
        - next.config.js
        - Custom
        - Public File Serving
    - Network
    - CICD
        - Test
            - react-testing-library
            - Cypress
        - Build
            - @sls-next/serverless-component
        - Deploy
            - Serverless
            - AWS
                - CloudFormation
                - API Gateway
                - Lambda
                - S3
                - Route53
                - CloudFront
2. **Rendering**
    1. pre-rendering Static Generation without Data
        - single HTML file per page during build time(next build)
        - SEO
        - High Performance
        - cached by CDN
        - **When solud I use Static Generation**
            - Example
                - Marketing Page
                - Blog Post
                - E-commenrce Product
                - Help
                - Documentation
    2. pre-rendering Static Generation with Data
        - build time(next build)
        - SEO
        - High Performance
        - cached by CDN
        - **When solud I use Static Generation**
            - Example
                    - Marketing Page
                    - Blog Post
                    - E-commenrce Product
                    - Help
                    - Documentation
        - **Usage**
            - getStaticProps
            - getStaticPaths
    3. pre-rendering Server-Side Rendering(SSR)
        - reqeust time
        - SEO
        - Low Performance
        - **When should I use SSR**
            - frequently updated data, and the page content changes on every request.
        - **Usage**
            - getServerSideProps
    4. CSR(Nextjs SWR)
        - **When should I use CSR**
            - frequently updated data, and the page content changes on every request.   
3. **Page Policy & Routing & Public File Serving with Nextjs App**
    - **Routing**
    - **Public File Serving**
    - **Pages Policy**
        - Static Generation without Data + CSR(useSWR)
            - [-] /
            - [-] /signup
            - [-] /login
            - [-] /trends
                - [] Pie Chart Position
                - [] Responsive
            - [] /post/create
        - Static Generation with Data (getStaticProps & get StaticPaths) + CSR(useSWR)
            - [] /user
                - [] Follow & Unfollow
                - [] Slider
            - [] /user/{userId}
                - [] Follow & Unfollow
                - [] Slider
            - [] /users
                - [] Follow & Unfollow
                - [] Infinity Scroll
            - [] /post/{postId}
                - [] Like Btn
            - [] /post/update
            - [] /tags
                - [] Pagination
            - [] /tag
        - SSR(getServerSideProps) + CSR(useSWR)
            - [] /posts
                - [] LikeBtn
                - [] Infinity Scroll
            - [-] /chat
                - [] ChatMessages
                - [] UserList
                - [] ChatMessage ScrollBar

- _app
- _document
- /_error
- /404
---

## Version 1 Pages(Dev & Production)
- [] /
- [O] /signup
- [O] /login

- [-] /user
    - [O] update nick
    - [O] update bio
    - [O] update avatar img
    - [] get load me data
    - [] Routing & Slider(posts,likeposts,followers,followings) 
- [] /users
    - [] follow
    - [] infinity scroll
- [] /user/{userId}

- [O] /post/create
    - [O] post create
    - [O] post mainimg
- [O] /post/{postId}/update 

- [-] /post/{postId}
    - [-] like post ux
    - [O] create comment 
    - [-] update comment ux
    - [-] delete comment ux
- [] /posts
    - [] like post
    - [] infinity scroll

- [] /tags
    - [] Pagination
- [] /tag

---

- [-] /chat
    - [O] auto scroll down
    - [O] Connected Clients
        - connect, disconnect 확인 및 chat user list management(backend)
    - [O] Messages Management
        - 다른 클라이언트 접속시 기존 클라이언트 메시지 다 날아감.
        - setState
            - 함수형 컴포넌트에서 상태 변화를 위한 함수
            - setState 연속적으로 사용시 React 내부적으로 Batch 처리함
            - setState는 비동기적으로 동작함
            - setState에 state 객체를 넘기거나 새로운 state를 반환하는 함수를 인자로 넘겨줄 수 있음
            - Object.assign
        - useCallback DependencyList 정의
    - [O] UIUX Responsive Mobile
        - userList Slide Navigation
    - [] Performance
    
- [-] /trends
    - [-] d3js
    - [-] bar chart
        - d3.mouse -> d3.pointer (v6)
        - useRef
        - d3.select, d3.selectAll
        - d3.append('g')
        - xAxisGroup, yAxisGroup
        - d3.csv
        - xValues, yValues
        - y, x (scale)
        - graph(mouseover,mouseout)
        - axisBottom,axisLeft
        - xAxisGroup.call
        - d3.on
    - [-] line chart
    - [] korea map
    - [] pie chart
    - [] UIUX Responsive Mobile
    - [] Refactoring

---

- [] Like Btn
- [] Follow & UnFollow Btn

- [] Infinity Scrolling
- [] Pagination
- [] Slider

- [] Pages API Test, TDD, Rendering, UIUX, Responsive 

---

## Devops
- [] Github
- [] GitFlow
- [] Jira
- [] Slack
---
## CICD (Production)
- [] Test
    - jest
    - react-testing-library
    - cypress
- [] Build
    - nextjs
    - serverless
- [] Deploy
    - SSR, CSR, SPA
    - AWS
    - DNS, CDN
    - Network(Https,Http,ws,wss)
---
## React & Nextjs (SSR,CSR,SSG,SPA)
---
## Design & UIUX & Responsive & Storybook
---
## Public Resources
---
## AppShell
---
## PWA
---
## SEO
---
## AMP
---
## CrossBrowser
---
## Accessibility
---
## Performance
---
## Security
---
## Refactoring
---
---
## API Feature(Dev & Prod)
- **User**
    - [] POST /user Sign Up
        - /signup
    - [] POST /user/login User Login
        - /login
    - [] POST /user/logout User Logout
        - TopNavigation Component
        - LeftNavigation Component
    - [] GET  /user Get Me Data
    - [] PATCH /user/nickname Update User Nickname
    - [] PATCH /user/bio Update User bio
    - [] POST /user/images Update User Avatar
    - [] DELETE /user/images Delete User Avatar
    - [] PATCH /user/{userId}/follow User Follow
    - [] DELETE /user/{userId}/follow User UnFollow
    - [] DELETE /user/followers/{userId} Delete User Follower
    - [] GET /user/followers Get User Followers
    - [] GET /user/followings Get User Followings
    - [] GET /user/{userId} Get User Data
    - [] GET /user/{userId}/posts Get User PostList 
- **Users**
    - [] GET /users Get User List
    - [] GET /users/search Get User List
- **Posts**
    - [] GET /posts Get Post List
    - [] GET /posts/search Get Post Searched List
    - [] GET /posts/{tagId} Get Post List
- **Post**
    - [] POST /post Create Post
    - [] GET /post/{postId} Get Post Data
    - [] PATCH /post/{postId} Update Post Data
    - [] DELETE /post/{postId} Delete Post
    - [] POST /post/{postId}/comment Create Post Comment
    - [] POST /post/{postId}/comment/{commentId} Create Post Comment
    - [] DELETE /post/{postId}/comment/{commentId} Delete Post Comment
    - [] PATCH /post/{postId}/like Create Post Like
    - [] DELETE /post/{postId}/like Delete Post Like
- **Tags**
    - [] GET /tags Get Tag List
    - [] GET /tags/search Get Tag List
- **Subscription**
    - [] POST /subscription