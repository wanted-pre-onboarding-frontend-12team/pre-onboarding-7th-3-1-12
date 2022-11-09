import { useEffect, useState } from 'react';
import Recommend from '../Recommend';
import { getRecommend } from '../../../api/recommend';
import * as S from './styled';
import { RecObj } from '../../../types/recommend';

const SearchInput = () => {
	const [onRecommend, setOnRecommend] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');

	const [recWord, setRecWord] = useState([]);

	const change = () => {
		setOnRecommend((prev) => !prev);
	};

	const filterHandler = () => {
		searchValue.length === 0
			? setRecWord([])
			: getRecommend(searchValue).then((data) => {
					setRecWord(
						data.filter((item: RecObj) => {
							return item.sickNm.startsWith(searchValue);
						}),
					);
			  });
	};

	const inputSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	useEffect(filterHandler, [searchValue]);

	return (
		<S.InputWrap>
			<S.Input placeholder="질환명을 입력해 주세요." onChange={inputSearchWord} onFocus={change} onBlur={change} />
			{onRecommend && <Recommend recWord={recWord} searchValue={searchValue} />}
		</S.InputWrap>
	);
};

export default SearchInput;
