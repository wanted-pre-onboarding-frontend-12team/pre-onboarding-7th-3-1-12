import * as S from './styled';
import { RecObj } from '../../../types/recommend';

interface Props {
	recWord: RecObj[];
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	focusIdx: number;
}

const Recommend = ({ recWord, setSearchValue, focusIdx }: Props) => {
	const recommendLength = recWord.length !== 0;
	const getRecWord = (word: string) => {
		setSearchValue(word);
	};
	// const listRef = useRef<HTMLUListElement>(null);

	// useEffect(() => {
	// 	listRef.current?.children[idxNum]?.focus();
	// 	console.log('test');
	// });

	return (
		<S.RecWrap>
			<S.RecText>추천 검색어</S.RecText>
			<S.RecList>
				{recommendLength ? (
					recWord.map((item: RecObj, idx: number) => {
						return (
							<S.RecItem key={item.sickCd} onClick={() => getRecWord(item.sickNm)} focus={focusIdx === idx}>
								{item.sickNm}
							</S.RecItem>
						);
					})
				) : (
					<S.NoRecItem>검색어 없음</S.NoRecItem>
				)}
			</S.RecList>
		</S.RecWrap>
	);
};

export default Recommend;
