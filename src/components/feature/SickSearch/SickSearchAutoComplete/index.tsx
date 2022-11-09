import { Sick } from '@src/types/sick';
import { isNotEmptyArray } from '@src/utils/arrayUtils';
import * as S from './styled';

type Props = {
	items: Sick[];
};

const SickSearchAutoComplete = (props: Props) => {
	return (
		<S.Container>
			{isNotEmptyArray(props.items) ? (
				<>
					<S.Caption>추천 검색어</S.Caption>
					{props.items.map((item) => {
						return <S.AutoCompleteItemWrapper key={item.sickCd}>🔍 {item.sickNm}</S.AutoCompleteItemWrapper>;
					})}
				</>
			) : (
				<S.AutoCompleteItemWrapper>🔍 추천 검색어 존재하지 않습니다.</S.AutoCompleteItemWrapper>
			)}
		</S.Container>
	);
};

export default SickSearchAutoComplete;
