# 원티드 프리온보딩 7차 4차 과제

## 과제 설명

> [Assignment 5](https://www.notion.so/3-4-53e29b4ca3f34fb6ab1e14010ade3f8f) 주제 : 검색어 추천 기능을 포함한 검색창 UI를 구현합니다.

- 진행 기간 : 2022-11-08 ~ 2022-11-11

<br />

## 데모

[🚀 GO TO DEMO]()

1. 결과물 1

- 첨부 파일을 올려주세요.

<br />

## 실행 방법


서버 실행 - [저장소 링크](https://github.com/walking-sunset/assignment-api_7th)

```
npm install
npm start
```

### Local

```bash
# Clone Repo
https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12.git

# Install Dependency
yarn run install

# Run Project
yarn run dev

# Build Project
yarn run build
```

<br />

## 과제 달성 사항 및 해결 방법

### 필수 구현 범위

- [x] 1. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
    - [x] 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
    - [x] 검색어가 없을 시 “검색어 없음” 표출

- [x] 2. API 호출 최적화
    - [ ] API 호출별로 로컬 캐싱 구현
    - [x] 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
    - [x] API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
    
- [x] 3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현


### 필수 요구 사항

- [ ] 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
- [ ] API 호출 횟수를 줄이는 전략 내용 README에 기술
- [ ] 키보드만으로 추천 검색어들로 이동한 방법 README에 기술

<br />

## 기술스택 & 레포지토리 구조

<br />

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react-router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">

<img src="https://img.shields.io/badge/eslint-181717?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E">

<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

<br />

```jsx
📦src
 ┣ 📂assets
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜close.svg
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜search.svg
 ┃ ┃ ┣ 📜sick-search-img1.svg
 ┃ ┃ ┣ 📜sick-search-img2.svg
 ┃ ┃ ┗ 📜sick-search-img3.svg
 ┃ ┗ 📂images
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜symbol.png
 ┣ 📂components
 ┃ ┣ 📂feature
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styled.ts
 ┃ ┃ ┣ 📂Navigation
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styled.ts
 ┃ ┃ ┗ 📂SickSearch
 ┃ ┃ ┃ ┣ 📂SickSearchAutoComplete
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜styled.ts
 ┃ ┃ ┃ ┣ 📂SickSearchForm
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜styled.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styled.ts
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styled.ts
 ┃ ┣ 📂shared
 ┃ ┃ ┗ 📂Typography
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styled.ts
 ┃ ┗ 📜index.ts
 ┣ 📂constants
 ┣ 📂core
 ┃ ┗ 📂apis
 ┃ ┃ ┣ 📜common.ts
 ┃ ┃ ┣ 📜requester.ts
 ┃ ┃ ┗ 📜sick.ts
 ┣ 📂pages
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styled.ts
 ┃ ┣ 📂NotFound
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styled.ts
 ┃ ┗ 📜index.ts
 ┣ 📂router
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜routePaths.ts
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.tsx
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜styled.d.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┗ 📜sick.ts
 ┣ 📂utils
 ┃ ┣ 📜arrayUtils.ts
 ┃ ┣ 📜lazyUtils.ts
 ┃ ┗ 📜stringUtils.ts
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜vite-env.d.ts

```

<br />

## 12팀 소개

| <img src="https://avatars.githubusercontent.com/u/40523487?v=4"/> | <img src="https://avatars.githubusercontent.com/u/50790145?v=4"/> | <img src="https://avatars.githubusercontent.com/u/108744804?v=4"> | <img src="https://avatars.githubusercontent.com/u/97100045?v=4"/> | <img src="https://avatars.githubusercontent.com/u/92246102?v=4"> | <img src="https://avatars.githubusercontent.com/u/96763714?v=4"> |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| <a href="https://github.com/od-log">[팀장] 오다영</a>             | <a href="https://github.com/youngminss">[부팀장] 위영민</a>       | <a href="https://github.com/jong6598">김종현</a>                  | <a href="https://github.com/hopak-e">박상호</a>                   | <a href="https://github.com/forest-6">임승민</a>                 | <a href="https://github.com/kyunghee47">피경희</a>               |

<br />

## 12팀이 동료학습으로 협업하는 방식

1. [Convention Rule](https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-2-2-12/wiki) 을 정의 & 모든 팀원이 실천합니다.

- 1시부터 6시까지는 12팀이 집중해서 작업하는 코어 시간입니다. 멀리 떨어져 있지만 옆에 있는 것처럼 화면을 공유하고 서로 자유롭게 의견을 나누면서 과제를 해결하기 위해 협업합니다.

- 12팀은 git flow 방식으로 개발하고 있습니다. devlop branch에 자신이 작업한 branch를 merge하려면 최소 두 명 이상의 팀원이 리뷰를 하고, 요청을 수락해야 합니다. 그래서 12팀은 pull request 요청이 오는 즉시 12팀의 디스코드에 알람으로, 메일로 각 팀원들에게 전달되어 빠르게 피드백이 가능하면서도 작업하는 branch의 변경사항을 공유할 수 있는 환경을 구성했습니다.

2. 피그잼 or 피그마에서 요구사항을 동료 학습을 기반으로 논의하고 정의합니다.

- [🚀 Assignment 5 - Figjam 요구 사항 분석 보러가기](https://www.figma.com/file/8rcVgEmafVSF00quZg1rM5/Assignment-5---%EA%B2%80%EC%83%89%EC%96%B4-%EC%9E%90%EB%8F%99%EC%99%84%EC%84%B1-%EA%B8%B0%EB%8A%A5%EC%9D%84-%ED%8F%AC%ED%95%A8%ED%95%9C-%EA%B2%80%EC%83%89%EC%B0%BD-%EA%B5%AC%ED%98%84?node-id=4%3A92)

<br />

## BEST PRACTICE

### 1. API 호출 최적화

- debounce 적용

```jsx
export function useDebounce<T extends any[]>(callback: (...params: T) => void, delay: number) {
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	return (...params: T) => {
		if (timer.current) clearTimeout(timer.current);

		timer.current = setTimeout(() => {
			callback(...params);
			timer.current = null;
		}, delay);
	};
}
```

### 2. 검색어 추천 및 키보드 이동

1. 검색어 창에 검색어를 입력합니다.  

2. 검색어 추천 목록이 나오면 키보드 방향키중 위, 아래 키로 탐색할 수 있습니다.  


### 3. 검색 키워드 볼드 처리
- 유틸함수를 이용하여 검색어와 일치하는 텍스트 찾기
  - 배열 중에 일치하는 텍스트가 있으면 볼드처리를 합니다.
  -
```jsx


```

### 4. 데이터 캐싱 방법

-

## 추가 구현 

