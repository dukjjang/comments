# ✉️ Comments

댓글 서비스



## 사용한 기술

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/> 
        <img src="https://img.shields.io/badge/tailwindcss-18324F?style=for-the-badge&logo=tailwindcss&logoColor=white"/> 
        
        
## 기술구현
- 댓글 조회,수정,삭제 기능 구현
- redux toolkit을 활용한 state management
- redux thunk 미들웨어를 활용한 비동기 처리
- pagination 기능구현 


## 폴더구조 
```
📦 src
├─ .gitignore
├─ README.md
├─ db.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
├─ server
│  └─ db.json
├─ src
│  ├─ App.tsx
│  ├─ components
│  │  ├─ CommentForm.tsx
│  │  ├─ CommentItem.tsx
│  │  ├─ Comments.tsx
│  │  └─ Pagination.tsx
│  ├─ constants
│  │  └─ index.tsx
│  ├─ index.css
│  ├─ index.tsx
│  ├─ interfaces
│  │  └─ index.ts
│  ├─ pages
│  │  └─ Home.tsx
│  └─ store
│     ├─ commentSlice
│     │  ├─ actions.ts
│     │  ├─ extraReducers.ts
│     │  ├─ index.ts
│     │  └─ reducers.ts
│     └─ index.ts
├─ tailwind.config.js
├─ tsconfig.json
└─ yarn.lock
```



---

![화면 기록 2023-01-19 오후 6 38 10](https://user-images.githubusercontent.com/102455275/213408079-302fdab2-0cdf-4a5f-bc32-19f0393b3d1e.gif)


