# Tailwind CSS

## 1. 설치

- 안정화 버전 설치

```bash
npm i -D tailwindcss@3.4.10 postcss@8.4.38 autoprefixer@10.4.20
```

- 만약 이미 prettier 를 세팅했다면 아래로 추가 설치 필요

```bash
npm i -D prettier@3.3.3 prettier-plugin-tailwindcss@0.6.8
```

## 2. 기본 환경 파일 자동 생성

```bash
npx tailwindcss init -p
```

### 2.1. tailwind.config.js

- Tailwind CSS 의 여러가지 옵션들을 정의함.
- Tailwind CSS 에 전역 변수 및 기능 설정
- 색상, 폰트, 다크 모드 등을 설정함

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
};
```

### 2.2. postcss.config.js

- 웹브라우저 호환성 관련한 세팅

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 3. index.css 수정

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 프로젝트 공통 유틸(선택) */
:root {
  --app-max-w: 720px;
}

html,
body,
#root {
  height: 100%;
}

.container-app {
  @apply mx-auto max-w-[var(--app-max-w)] px-4;
}
```
