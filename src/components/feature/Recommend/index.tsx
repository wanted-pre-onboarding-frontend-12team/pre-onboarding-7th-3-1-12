import * as S from './styled';
import { RecObj, RecArr } from '../../../types/recommend';

const Recommend = ({ recWord }: RecArr) => {
	const recommendLength = recWord.length !== 0;

	return (
		<S.RecWrap>
			추천검색어
			{recommendLength ? (
				recWord.map((item: RecObj) => {
					return <S.RecItem key={item.sickCd}>{item.sickNm}</S.RecItem>;
				})
			) : (
				<S.RecItem>검색어 없음</S.RecItem>
			)}
		</S.RecWrap>
	);
};

export default Recommend;
