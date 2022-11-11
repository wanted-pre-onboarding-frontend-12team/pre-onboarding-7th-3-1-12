# 원티드 프리온보딩 7차 5차 과제

## 과제 설명

> [Assignment 5](https://www.notion.so/3-4-53e29b4ca3f34fb6ab1e14010ade3f8f) 주제 : 검색어 추천 기능을 포함한 검색창 UI를 구현합니다.

- 진행 기간 : 2022-11-08 ~ 2022-11-11

<br />

## 데모 & 구현 방법 

<details>
<summary>사용자가 입력한 텍스트와 일치하는 부분 볼드(Bold)처리 [https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/pull/8]</summary>

### 결과물

![split_bold](https://user-images.githubusercontent.com/50790145/201189951-6c00277f-fd6e-4a0f-8ec3-ff1fe5559eeb.gif)

### 구현 방법

> 💫 현재 입력한 단어(= seperator)로 각 연관 검색어를 `split` 한 결과 -> 분리된 데이터 수 === 볼드 처리할 데이터 수 + 1 을 이용

+ 특정 문자열을 특정 구분자(seperator)로 분리한 결과를 반환하는 유틸

```ts
// src/utils/stringUtils.ts

export const splitTargetRegardlessOfStringCase = (target: string, keyword: string) => {
	const splitedByUpperCase = target.split(keyword.toUpperCase());
	const splitedByLowerCase = target.split(keyword.toLowerCase());

	return splitedByLowerCase.length > splitedByUpperCase.length ? splitedByLowerCase : splitedByUpperCase;
};
```

+ 해당 유틸 사용부

```tsx
// src/components/feature/SickSearch/SickSearchAutoComplete/index.tsx

{splitTargetRegardlessOfStringCase(recommendSick.sickNm, props.sickKeyword)
  .map((splitedItem, index, splitedItems) => {
	if (splitedItems.length - 1 === index) {
	  return <React.Fragment key={index}>{splitedItem}</React.Fragment>;
	}
	return (
	  <React.Fragment key={index}>
		{splitedItem}
		<S.HightLightText>{props.sickKeyword.toUpperCase()}</S.HightLightText>
	  </React.Fragment>
	);
  },
)}
```


</details>

<details>
<summary>키보드만으로 추천 검색어들로 이동 가능하도록 구현 [https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/pull/8]</summary>

### 결과물

> 키보드 이동은 `구글 검색창 작동 방식을 모티브로 구현`

+ 구글 검색어 자동완성 키보드 이동 형태

![google_autocomplete](https://user-images.githubusercontent.com/50790145/201188131-8fec5dee-fef0-4073-a83f-1b249e0ab052.gif)

+ 구현물 키보드 이동 형태

![autocomplete_keyboard](https://user-images.githubusercontent.com/50790145/201093613-68f7f599-44ac-4612-ab5d-7d14e3e7c7f2.gif)


### 구현 방법

> 💫 질환명 입력 요소에 대한 Keydown 이벤트(ArrowUp / ArrowDown / Backspace / Escape) 핸들링 & 그에 따른 AutoComplete Current Index 상태 조절

```tsx
// src/components/feature/SickSearch/index.tsx

...

const autoCompleteTargetKeys = {
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	ESCAPE: 'Escape',
	BACK_SPACE: 'Backspace',
} as const;

...

const [currentAutoCompleteIndex, setCurrentAutoCompleteIndex] = useState(-1);
const autoCompleteRef = useRef<HTMLUListElement>(null) as React.MutableRefObject<HTMLUListElement>;

...

const handleSickSearchInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
	if (event.key === autoCompleteTargetKeys.ESCAPE) {
		handleSickSearchFormFousedChange(false);
		return;
	}

	if (!isNotEmptyArray(recommendSicks) || !autoCompleteRef) {
		setCurrentAutoCompleteIndex(-1);
		return;
	}

	switch (event.key) {
		case autoCompleteTargetKeys.ARROW_DOWN:
			event.preventDefault();
			if (currentAutoCompleteIndex + 1 === autoCompleteRef?.current?.childElementCount - 2) {
				setCurrentAutoCompleteIndex(-1);
				break;
			}
			setCurrentAutoCompleteIndex(currentAutoCompleteIndex + 1);
			break;
		case autoCompleteTargetKeys.ARROW_UP:
			event.preventDefault();
			if (currentAutoCompleteIndex - 1 < -1) {
				setCurrentAutoCompleteIndex(autoCompleteRef?.current?.childElementCount - 3);
				break;
			}
			setCurrentAutoCompleteIndex(currentAutoCompleteIndex - 1);
			break;
		case autoCompleteTargetKeys.BACK_SPACE:
			setCurrentAutoCompleteIndex(-1);
			break;
		default:
			break;
	}
};
```


</details>

<details>
<summary>API 호출별로 로컬 캐싱 구현 [https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/pull/9]</summary>

### 결과물

`로컬 캐싱 (by. 인메모리 캐시맵) 적용 후`

![local_cache](https://user-images.githubusercontent.com/50790145/201222054-9657152f-ee96-475e-bbe0-d71896b2b2f9.gif)

### 구현 방법

> 💫 Map 자료구조를 이용한 인메모리 캐시맵 인스턴스 생성


+ 캐시맵 클래스 선언부 유틸 

```ts
// src/utils/cache.ts

import { Sick } from '@src/types/sick';

const ONE_HOUR = 1000 * 60 * 60;
const MAX_CACHE_SIZE = 10; // 테스트를 위한 캐시 임시 최대 크기;

const currentTime = () => new Date().getTime();

type ParsedSickInCache = {
	sicks: Sick[];
	expired: number;
};

type SickInCache = {
	sicks: string;
	expired: number;
};

export default class InMemoryCache {
	private _cache;

	constructor() {
		this._cache = new Map<string, string>();
	}

	get cache() {
		return this._cache;
	}

	getCacheItem = (key: string) => {
		if (!this._cache.has(key)) {
			console.error(`"${key}"로 존재하는 데이터가 없습니다.`);
			return;
		}

		try {
			const targetSicks: ParsedSickInCache = JSON.parse(this._cache.get(key) as string);
			return targetSicks.sicks;
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
		}
	};

	setCacheItem = (key: string, value: Sick[]) => {
		const serialized = {
			sicks: value,
			expired: new Date().getTime() + ONE_HOUR,
		};

		try {
			if (this.getCacheSize() > MAX_CACHE_SIZE) {
				throw new Error('Max Local Cache !!');
			}
			this._cache.set(key, JSON.stringify(serialized));
		} catch (error) {
			this.cleanCache(key, JSON.stringify(serialized));
		}
	};

	cleanCache = (key: string, value: string) => {
		let oldest;
		let oldestKey;

		const countCacheBeforeClean = this.getCacheSize();

		for (let key of this._cache.keys()) {
			const sickInCache: SickInCache = JSON.parse(this._cache.get(key) as string);
			if (sickInCache.expired <= currentTime()) {
				this._cache.delete(key);
			}

			if (!oldest || oldest > sickInCache.expired) {
				oldest = sickInCache.expired;
				oldestKey = key;
			}
		}

		if (countCacheBeforeClean >= this._cache.size && oldestKey) {
			this._cache.delete(oldestKey);
		}

		this._cache.set(key, value);
	};

	isExistingInCache = (key: string) => {
		return this._cache.has(key);
	};

	getCacheSize = () => {
		return this._cache.size;
	};
}
```

+ 인메모리 Cache 인스턴스 사용부

```tsx
// src/components/feature/SickSearch/index.tsx

...

const sickInCache = useMemo(() => new InMemoryCache(), []);

...


const handleSickKeywordChange = async (newSickKeyword: string) => {
	...

	if (newSickKeyword) {
		if (sickInCache.isExistingInCache(newSickKeyword)) {
			handleSetRecommandSicksByCache(sickInCache.getCacheItem(newSickKeyword) as Sick[]);
			return;
		}

		handleSetRecommendSicks(newSickKeyword);
	}
};


const handleSetRecommendSicks = useDebounce(async (newSickKeyword: string) => {
	const newRecommendSicks = await getSicksByIncludeKeyword(newSickKeyword);
	sickInCache.setCacheItem(newSickKeyword, newRecommendSicks);
	setRecommendSicks(newRecommendSicks);
}, 300);

const handleSetRecommandSicksByCache = useDebounce((sicksInCache: Sick[]) => {
	console.info('Local Cache Hit !');
	setRecommendSicks(sicksInCache);
}, 300);

...

```

</details>

<details>
<summary>입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행 [https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/pull/9]</summary>

### 결과물

`추천(연관) 검색어 GET API 요청 (디바운싱 처리 전)`

![before_debounce](https://user-images.githubusercontent.com/50790145/201116911-1b5347f6-7303-41f1-b236-a3d22c2901ee.gif)

`추천(연관) 검색어 GET API 요청 (디바운싱 처리 후)`

![after_debounce](https://user-images.githubusercontent.com/50790145/201116683-e9be809d-19ac-4590-b5d4-53a4c23598b8.gif)

### 구현 방법

> 💫 [Debounce](https://velog.io/@ansrjsdn/TypeScript%EC%97%90%EC%84%9C-useDebounce-useThrottle-%EB%A7%8C%EB%93%A4%EA%B8%B0) 적용

+ 디바운스 유틸 함수

```tsx
// src/utils/lazyUtils/ts

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

+ 디바운스 적용부 - 연관 질환명 리스트 데이터 GET 요청 함수 & 캐싱 데이터 업데이트

```tsx
// src/components/feature/SickSearch/index.tsx

const handleSetRecommendSicks = useDebounce(async (newSickKeyword: string) => {
	const newRecommendSicks = await getSicksByIncludeKeyword(newSickKeyword);
	sickInCache.setCacheItem(newSickKeyword, newRecommendSicks);
	setRecommendSicks(newRecommendSicks);
}, 300);


const handleSetRecommandSicksByCache = useDebounce((sicksInCache: Sick[]) => {
	console.info('Local Cache Hit !');
	setRecommendSicks(sicksInCache);
}, 300);
```


</details>


<details>
<summary>API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정</summary>

### 결과물

![console](https://user-images.githubusercontent.com/50790145/201227730-882e7f64-a889-4eb5-b49d-af33a80e136d.gif)

### 구현 방법

> 💫 연관 질환명 리스트 GET 요청 시마다 console 출력

```tsx
// src/core/apis/sick.ts

export const getSicksByIncludeKeyword = async (keyword: string, sliceCount: number = 8) => {
	console.info('calling api');

	const {
		sick: { index },
	} = API_PATH;

	const { payload: sicks } = await requester<Sick[]>({
		method: HttpMethod.GET,
		url: `${index}?sickNm_like=${keyword}`,
	});

	return sicks.slice(0, sliceCount);
};
```

</details>




<details>
<summary>+@ UI 디테일 개선 [https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/pull/9]</summary>

<br />

+ Focus, Blur 했을 경우 입력창 border 하이라이팅 처리
+ Blur, ESC Keydown 시 AutoComplete 투명도를 주어 사라짐 처리 동시에 포커싱 해제
+ AutoComplete Arrow Up or Down 시 입력창 cursor 맨 왼쪽, 오른쪽 이동 방지

### 결과물

![detail_dev](https://user-images.githubusercontent.com/50790145/201185880-0ab02cb1-6bc1-4188-8e4a-a1507dcc4cb8.gif)

### 구현 방법

> 💫 질환명 입력 요소에 `onFoucs`, `onBlur` 이벤트에 따라 `isSickSearchFormFocused` 상태(포커싱 유무(true OR false))를 

```tsx
// src/components/feature/SickSearch/index.tsx

...

const [isSickSearchFormFocused, setIsSickSearchFormFocused] = useState(false);

const handleSickSearchFormFousedChange = (newFocusedStatus: boolean) => {
	setIsSickSearchFormFocused(newFocusedStatus);
	...
};


/* ======================================= */


// src/components/feature/SickSearch/SickSearchForm/index.tsx

...

const handleSickSearchInputFocus = () => {
	props.onSickSearchFormFousedChange(true);
};

const handleSickSearchInputBlur = () => {
	props.onSickSearchFormFousedChange(false);
};

return (
	<S.SickSearchForm onSubmit={handleSickSearchFormSubmit}>
		<S.SickSearchInput
			type="text"
			placeholder="🔍 질환명을 입력해 주세요."
			value={props.sickKeyword}
			ref={props.sickSearchInputRef}
			onChange={handleSickSearchInputChange}
			onKeyDown={props.onSickSearchInputKeydown}
			onFocus={handleSickSearchInputFocus}
			onBlur={handleSickSearchInputBlur}
		/>

		...
	</S.SickSearchForm>
);

...

```
</details>




<br />


## 실행 방법


### API 서버 실행 - [저장소 링크](https://github.com/walking-sunset/assignment-api_7th)

> 🌟 API 서버가 실행되어야 정상적으로 작동하므로, 필수적으로 선행되어야 합니다.

```
# Clone API Server Repo
git conle https://github.com/walking-sunset/assignment-api_7th.git

# Install API Server Dependency
npm install

# Run API Server
npm start
```

### 프론트 실행

```bash
# Clone Front Repo
git clone https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12.git

# Install Front Dependency
yarn install

# Run Front Project
yarn run dev
```

<br />

## 과제 달성 사항 및 해결 방법

### 필수 구현 범위

- [x] 1. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
    - [x] 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
    - [x] 검색어가 없을 시 “검색어 없음” 표출

- [x] 2. API 호출 최적화
    - [x] API 호출별로 로컬 캐싱 구현
    - [x] 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
    - [x] API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
    
- [x] 3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현


### 필수 요구 사항

- [x] 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
- [x] API 호출 횟수를 줄이는 전략 내용 README에 기술
- [x] 키보드만으로 추천 검색어들로 이동한 방법 README에 기술

<br />

## 기술스택 & 레포지토리 구조

<br />

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react-router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">

<img src="https://img.shields.io/badge/styled-component-DB7093?style=for-the-badge&logo=styled-component&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">



<img src="https://img.shields.io/badge/eslint-181717?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E">

<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

<br />

```jsx
📦src
 ┣ 📂assets                    // 이미지, 아이콘, 폰트 등의 정적 리소스 저장 디렉터리
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
 ┃ ┣ 📂feature  // ----------------- 복합성 컴포넌트 디렉터리
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
 ┃ ┣ 📂layout  // ------------------ 공통 레이아웃 컴포넌트 디렉터리
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styled.ts
 ┃ ┣ 📂shared  // ------------------ 공통 컴포넌트 디렉터리
 ┃ ┃ ┗ 📂Typography
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styled.ts
 ┃ ┗ 📜index.ts
 ┣ 📂core      // ------------------ API 및 주요 도메인 로직 모음 디렉터리
 ┃ ┗ 📂apis
 ┃ ┃ ┣ 📜common.ts
 ┃ ┃ ┣ 📜requester.ts
 ┃ ┃ ┗ 📜sick.ts
 ┣ 📂pages     // ------------------ 페이지 단위 컴포넌트 디렉터리
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styled.ts
 ┃ ┣ 📂NotFound
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styled.ts
 ┃ ┗ 📜index.ts
 ┣ 📂router    // ------------------- 라우터 디렉터리
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜routePaths.ts
 ┣ 📂styles    // ------------------- 스타일링 디렉터리
 ┃ ┣ 📜GlobalStyle.tsx
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜styled.d.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types     // ------------------- 공통 타입 정의 디렉터리
 ┃ ┗ 📜sick.ts
 ┣ 📂utils     // ------------------- 범용적으로 사용하는 유틸 함수 모음 디렉터리
 ┃ ┣ 📜arrayUtils.ts
 ┃ ┣ 📜cache.ts
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

1. [Convention Rule](https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/wiki) 을 정의 & 모든 팀원이 실천합니다.

- 1시부터 6시까지는 12팀이 집중해서 작업하는 코어 시간입니다. 멀리 떨어져 있지만 옆에 있는 것처럼 화면을 공유하고 서로 자유롭게 의견을 나누면서 과제를 해결하기 위해 협업합니다.

- 12팀은 git flow 방식으로 개발하고 있습니다. devlop branch에 자신이 작업한 branch를 merge하려면 최소 두 명 이상의 팀원이 리뷰를 하고, 요청을 수락해야 합니다. 그래서 12팀은 pull request 요청이 오는 즉시 12팀의 디스코드에 알람으로, 메일로 각 팀원들에게 전달되어 빠르게 피드백이 가능하면서도 작업하는 branch의 변경사항을 공유할 수 있는 환경을 구성했습니다.

2. 피그잼 or 피그마에서 요구사항을 동료 학습을 기반으로 논의하고 정의합니다.

- [🚀 Assignment 5 - Figjam 요구 사항 분석 보러가기](https://www.figma.com/file/8rcVgEmafVSF00quZg1rM5/Assignment-5---%EA%B2%80%EC%83%89%EC%96%B4-%EC%9E%90%EB%8F%99%EC%99%84%EC%84%B1-%EA%B8%B0%EB%8A%A5%EC%9D%84-%ED%8F%AC%ED%95%A8%ED%95%9C-%EA%B2%80%EC%83%89%EC%B0%BD-%EA%B5%AC%ED%98%84?node-id=4%3A92)

3. 각자 Best Practice 를 위한 구현 이후, Wiki헤 해당 과정을 정리합니다. (단, Best Practice 구현 방식은 모든 팀원에게 사전 공유합니다.)

+ [Member. 오다영 Wiki](https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/wiki/%E2%9D%A4%EF%B8%8F-PAGE.-%EC%98%A4%EB%8B%A4%EC%98%81)
+ [Member. 위영민 Wiki](https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/wiki/%F0%9F%92%99-PAGE.-%EC%9C%84%EC%98%81%EB%AF%BC)
+ [Member. 임승민 Wiki](https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/wiki/%F0%9F%92%9A-PAGE.-%EC%9E%84%EC%8A%B9%EB%AF%BC)
+ [Member. 박상호 Wiki](https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/wiki/%F0%9F%92%9B-PAGE.-%EB%B0%95%EC%83%81%ED%98%B8)
+ [Member. 김종현 Wiki](https://github.com/wanted-pre-onboarding-frontend-12team/pre-onboarding-7th-3-1-12/wiki/%F0%9F%A7%A1-PAGE.-%EA%B9%80%EC%A2%85%ED%98%84)


