# 당뇨수첩
 일일 혈당량과 식사, 투약 기록을 입력하고 관리하세요.
- URL: https://diabetes-note.netlify.app/

## ✏️기능

1. 혈당수치를 기록할 수 있습니다. 
2. 목표범위를 벗어난 혈당 수치는 색상을 통하여 강조표시됩니다.
3. 투약기록을 기록할 수 있습니다.
4. 공공API를 이용하여 영양성분을 조회하고 식단을 기록할 수 있습니다.


## 
📦src

 ┣ 📂assets
 
 ┃ ┣ 📂svgs
 
 ┣ 📂components
 
 ┃ ┣ 📂DatePicker
 
 ┃ ┃ ┣ 📜DatePicker.tsx
 
 ┃ ┃ ┗ 📜calendar.scss
 
 ┃ ┣ 📂Modal
 
 ┃ ┃ ┣ 📜index.tsx
 
 ┃ ┃ ┗ 📜modal.module.scss
 
 ┃ ┗ 📜Portal.tsx
 
 ┣ 📂hooks
 
 ┃ ┣ 📂worker
 
 ┃ ┃ ┣ 📜index.tsx
 
 ┃ ┃ ┣ 📜useAxios.tsx
 
 ┃ ┃ ┣ 📜useAxiosCore.tsx
 
 ┃ ┃ ┗ 📜useOnClickOutside.tsx
 
 ┃ ┣ 📜.DS_Store
 
 ┃ ┗ 📜index.tsx
 
 ┣ 📂recoil
 
 ┃ ┗ 📜diabetesNote.ts
 
 ┣ 📂routes
 
 ┃ ┣ 📂BloodGlucose
 
 ┃ ┃ ┣ 📜bloodGlucose.module.scss
 
 ┃ ┃ ┗ 📜index.tsx
 
 ┃ ┣ 📂Diet
 
 ┃ ┃ ┣ 📜diet.module.scss
 
 ┃ ┃ ┣ 📜index.tsx
 
 ┃ ┃ ┣ 📜nutritionChart.tsx
 
 ┃ ┃ ┗ 📜searchList.tsx
 
 ┃ ┣ 📂Drug
 
 ┃ ┃ ┣ 📜drug.module.scss
 
 ┃ ┃ ┗ 📜index.tsx
 
 ┃ ┣ 📂Menu
 
 ┃ ┃ ┣ 📜ModalMenu.tsx
 
 ┃ ┃ ┣ 📜index.tsx
 
 ┃ ┃ ┣ 📜menu.module.scss
 
 ┃ ┃ ┗ 📜modalMenu.module.scss
 
 ┃ ┣ 📂Note
 
 ┃ ┃ ┣ 📜index.tsx
 
 ┃ ┃ ┗ 📜note.module.scss
 
 ┃ ┣ 📂_shared
 
 ┃ ┃ ┗ 📂GNB
 
 ┃ ┃ ┃ ┣ 📜gnb.module.scss
 
 ┃ ┃ ┃ ┗ 📜index.tsx
 
 ┃ ┣ 📜index.jsx
 
 ┃ ┗ 📜routes.module.scss
 
 ┣ 📂services
 
 ┃ ┗ 📜diabetesNote.ts
 
 ┣ 📂styles
 
 ┣ 📂utils
 
 ┗  📜index.tsx


## ⚒ 기술스택

- javascript
- typescript
- scss

## 🔮 라이브러리

1. axios 
2. react-query 
3. recoil
4. lodash
5. victory.js
6. day.js
7. react-calendar
8. react-toastify
