import { useEffect, useState } from 'react';
import Recommend from '../Recommend';
import { getRecommend } from '../../../api/recommend';
import * as S from './styled';

const SearchInput = () => {
	const [onRecommend, setOnRecommend] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');
	const [focusIdx, setFocusIdx] = useState(-1);
	const [recWord, setRecWord] = useState([]);
	const recLength = recWord.length;
	const maxList = 7;

	const onRecommendHandler = () => {
		setOnRecommend(true);
	};
	const offRecommendHandler = () => {
		setOnRecommend(false);
	};

	const filterHandler = () => {
		searchValue.length === 0
			? setRecWord([])
			: getRecommend(searchValue).then((data) => {
					setRecWord(data);
			  });
	};

	const inputSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		setFocusIdx(-1);
	};

	const changeIdxNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'ArrowUp') {
			recLength > 0 && recWord.length < maxList
				? setFocusIdx((prev) => (prev - 1 + recLength) % recWord.length)
				: setFocusIdx((prev) => (prev - 1 + maxList) % maxList);
		}
		if (e.key === 'ArrowDown') {
			recLength > 0 && recWord.length < maxList
				? setFocusIdx((prev) => (prev + 1) % recLength)
				: setFocusIdx((prev) => (prev + 1) % maxList);
		}
		if (e.key === 'Escape') {
			setFocusIdx(-1);
			offRecommendHandler();
		}
		if (e.key === 'Enter') {
			recLength > 0 && focusIdx >= 0 && setSearchValue(recWord[focusIdx]['sickNm']);
		}
	};

	useEffect(filterHandler, [searchValue]);

	return (
		<>
			<S.InputWrap>
				<S.Input
					placeholder="질환명을 입력해 주세요."
					value={searchValue}
					onChange={inputSearchWord}
					onKeyDown={changeIdxNum}
					onFocus={onRecommendHandler}
				/>
				<S.SearchBtn>검색</S.SearchBtn>
			</S.InputWrap>
			{onRecommend && <Recommend recWord={recWord} setSearchValue={setSearchValue} focusIdx={focusIdx} />}
		</>
	);
};

export default SearchInput;
