import SickSearchForm from '@src/components/feature/SickSearch/SickSearchForm';
import SickSearchAutoComplete from '@src/components/feature/SickSearch/SickSearchAutoComplete';
import * as S from './styled';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Sick } from '@src/types/sick';
import { getSicksByIncludeKeyword } from '@src/core/apis/sick';
import { isNotEmptyArray } from '@src/utils/arrayUtils';
import { useDebounce } from '@src/utils/lazyUtils';
import InMemoryCache from '@src/utils/cache';

const autoCompleteTargetKeys = {
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	ESCAPE: 'Escape',
	BACK_SPACE: 'Backspace',
} as const;

const SickSearch = () => {
	const sickInCache = useMemo(() => new InMemoryCache(), []);
	const [sickKeyword, setSickKeyword] = useState('');
	const [recommendSicks, setRecommendSicks] = useState<Sick[]>([]);

	const handleSickKeywordChange = async (newSickKeyword: string) => {
		if (!isSickSearchFormFocused) {
			setIsSickSearchFormFocused(true);
		}

		setSickKeyword(newSickKeyword);

		if (newSickKeyword) {
			if (sickInCache.isExistingInCache(newSickKeyword)) {
				handleSetRecommandSicksByCache(sickInCache.getCacheItem(newSickKeyword) as Sick[]);
				return;
			}

			handleSetRecommendSicks(newSickKeyword);
		}
	};

	const handleSickKeywordReset = () => {
		setSickKeyword('');
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

	const [currentAutoCompleteIndex, setCurrentAutoCompleteIndex] = useState(-1);
	const autoCompleteRef = useRef<HTMLUListElement>(null) as React.MutableRefObject<HTMLUListElement>;
	const sickSearchInputRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;

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

	const handleSearchKeywordChangeByKeydown = () => {
		const currentFocusedAutoCompleteItem = autoCompleteRef?.current?.getElementsByTagName('li')[currentAutoCompleteIndex + 1];
		if (!currentFocusedAutoCompleteItem) return;

		if (currentFocusedAutoCompleteItem.textContent) {
			setSickKeyword(currentFocusedAutoCompleteItem.textContent?.slice(2));
		}
	};

	useEffect(() => {
		handleSearchKeywordChangeByKeydown();
	}, [currentAutoCompleteIndex]);

	const [isSickSearchFormFocused, setIsSickSearchFormFocused] = useState(false);

	const handleSickSearchFormFousedChange = (newFocusedStatus: boolean) => {
		setIsSickSearchFormFocused(newFocusedStatus);
		setCurrentAutoCompleteIndex(-1);
	};

	return (
		<S.Container isFocused={isSickSearchFormFocused}>
			<SickSearchForm
				sickSearchInputRef={sickSearchInputRef}
				sickKeyword={sickKeyword}
				onSickSearchFormFousedChange={handleSickSearchFormFousedChange}
				onSickKeywordChange={handleSickKeywordChange}
				onSickKeywordReset={handleSickKeywordReset}
				onSickSearchInputKeydown={handleSickSearchInputKeydown}
			/>
			<SickSearchAutoComplete
				autoCompleteRef={autoCompleteRef}
				sickKeyword={sickKeyword}
				recommendSicks={recommendSicks}
				isAutoCompleteShow={isSickSearchFormFocused}
				currentAutoCompleteIndex={currentAutoCompleteIndex}
			/>
		</S.Container>
	);
};

export default SickSearch;
