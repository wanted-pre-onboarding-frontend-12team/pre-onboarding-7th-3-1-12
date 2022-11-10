import SickSearchForm from '@src/components/feature/SickSearch/SickSearchForm';
import SickSearchAutoComplete from '@src/components/feature/SickSearch/SickSearchAutoComplete';
import * as S from './styled';
import { useRef, useState } from 'react';
import { Sick } from '@src/types/sick';
import { getSicksByIncludeKeyword } from '@src/core/apis/sick';
import { isNotEmptyArray } from '@src/utils/arrayUtils';
import { useDebounce } from '@src/utils/lazyUtils';

const autoCompleteTargetKeys = {
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	ESCAPE: 'Escape',
	BACK_SPACE: 'Backspace',
} as const;

const SickSearch = () => {
	const [sickKeyword, setSickKeyword] = useState('');
	const [recommendSicks, setRecommendSicks] = useState<Sick[]>([]);

	const handleSickKeywordChange = async (newSickKeyword: string) => {
		setSickKeyword(newSickKeyword);
		handleSetRecommendSicks(newSickKeyword);
	};

	const handleSickKeywordReset = () => {
		setSickKeyword('');
	};

	const handleSetRecommendSicks = useDebounce(async (newSickKeyword: string) => {
		const newRecommendSicks = await getSicksByIncludeKeyword(newSickKeyword);
		setRecommendSicks(newRecommendSicks);
	}, 300);

	const [currentAutoCompleteIndex, setCurrentAutoCompleteIndex] = useState(-1);
	const autoCompleteRef = useRef<HTMLUListElement>(null) as React.MutableRefObject<HTMLUListElement>;

	const handleSickSearchInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (!isNotEmptyArray(recommendSicks) || !autoCompleteRef) {
			setCurrentAutoCompleteIndex(-1);
			return;
		}

		switch (event.key) {
			case autoCompleteTargetKeys.ARROW_DOWN:
				if (currentAutoCompleteIndex + 1 === autoCompleteRef?.current?.childElementCount - 2) {
					setCurrentAutoCompleteIndex(-1);
					break;
				}
				setCurrentAutoCompleteIndex(currentAutoCompleteIndex + 1);
				break;
			case autoCompleteTargetKeys.ARROW_UP:
				if (currentAutoCompleteIndex - 1 < -1) {
					setCurrentAutoCompleteIndex(autoCompleteRef?.current?.childElementCount - 3);
					break;
				}
				setCurrentAutoCompleteIndex(currentAutoCompleteIndex - 1);
				break;
			case autoCompleteTargetKeys.BACK_SPACE:
				setCurrentAutoCompleteIndex(-1);
				break;
			case autoCompleteTargetKeys.ESCAPE:
				setCurrentAutoCompleteIndex(-1);
				break;
			default:
				break;
		}
	};

	return (
		<S.Container>
			<SickSearchForm
				sickKeyword={sickKeyword}
				onSickKeywordChange={handleSickKeywordChange}
				onSickKeywordReset={handleSickKeywordReset}
				onSickSearchInputKeydown={handleSickSearchInputKeydown}
			/>
			<SickSearchAutoComplete
				sickKeyword={sickKeyword}
				recommendSicks={recommendSicks}
				currentAutoCompleteIndex={currentAutoCompleteIndex}
				autoCompleteRef={autoCompleteRef}
			/>
		</S.Container>
	);
};

export default SickSearch;
