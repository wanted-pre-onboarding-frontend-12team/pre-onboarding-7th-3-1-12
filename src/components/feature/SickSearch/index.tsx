import SickSearchForm from '@src/components/feature/SickSearch/SickSearchForm';
import SickSearchAutoComplete from '@src/components/feature/SickSearch/SickSearchAutoComplete';
import * as S from './styled';

const dummys = [
	{
		sickCd: 'A00',
		sickNm: '콜레라',
	},
	{
		sickCd: 'A01',
		sickNm: '장티푸스 및 파라티푸스',
	},
	{
		sickCd: 'A02',
		sickNm: '기타 살모넬라 감염',
	},
	{
		sickCd: 'A03',
		sickNm: '시겔라증',
	},
	{
		sickCd: 'A04',
		sickNm: '기타 세균성 장 감염',
	},
	{
		sickCd: 'A05',
		sickNm: '달리 분류되지 않는 기타 세균성 음식매개중독',
	},
	{
		sickCd: 'A06',
		sickNm: '아메바증',
	},
	{
		sickCd: 'A07',
		sickNm: '기타 원충성 장 질환',
	},
	{
		sickCd: 'A08',
		sickNm: '바이러스 및 기타 명시된 장 감염',
	},
	{
		sickCd: 'A09',
		sickNm: '감염성 및 상세불명 기원의 기타 위장염 및 결장염',
	},
];

const SickSearch = () => {
	return (
		<S.Container>
			<SickSearchForm />
			<SickSearchAutoComplete items={dummys} />
		</S.Container>
	);
};

export default SickSearch;
