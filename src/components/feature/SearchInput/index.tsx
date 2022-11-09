import { useState } from 'react';
import Recommend from '../Recommend';
import { getRecommend } from '../../../api/recommend';
import * as S from './styled';
import { RecObj } from '../../../types/recommend';

const SearchInput = () => {
	const [onRecommend, setOnRecommend] = useState(false);
	const [recWord, setRecWord] = useState([]);

	const change = () => {
		setOnRecommend((prev) => !prev);
	};

	const inputSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchWord = e.target.value;

		searchWord.length !== 0
			? getRecommend(searchWord).then((data) => {
					setRecWord(
						data.filter((item: RecObj) => {
							return item.sickNm.startsWith(searchWord);
						}),
					);
			  })
			: setRecWord([]);
	};

	return (
		<S.InputWrap>
			<S.Input placeholder="질환명을 입력해 주세요." onChange={inputSearchWord} onFocus={change} onBlur={change} />
			{onRecommend && <Recommend recWord={recWord} />}
		</S.InputWrap>
	);
};

export default SearchInput;
