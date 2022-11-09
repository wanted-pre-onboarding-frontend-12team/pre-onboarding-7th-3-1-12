import * as S from './styled';
import { RecObj } from '../../../types/recommend';

interface Props {
	recWord: RecObj[];
	searchValue: string;
}

const Recommend = ({ recWord, searchValue }: Props) => {
	const recommendLength = recWord.length !== 0;

	return (
		<S.RecWrap>
			추천검색어
			{recommendLength ? (
				recWord.map((item: RecObj) => {
					return (
						<S.RecItem key={item.sickCd}>
							<span className="bold">{searchValue}</span>
							{item.sickNm.replace(searchValue, '')}
						</S.RecItem>
					);
				})
			) : (
				<S.RecItem>검색어 없음</S.RecItem>
			)}
		</S.RecWrap>
	);
};
// 검색어 볼드처리
// 검색어/추천검색어 분리
// UI 수정
export default Recommend;
