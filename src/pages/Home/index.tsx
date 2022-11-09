import { Header, SickSearch } from '@src/components';
import * as S from './styled';
import { SickSearchIcon1, SickSearchIcon2, SickSearchIcon3 } from '@src/assets/icons';

const Home = () => {
	return (
		<div>
			<Header />
			<S.SickSearchContainer>
				<S.SickSearchTitle>국내 모든 임상시험 검색하고{'\n'}온라인으로 참여하기</S.SickSearchTitle>
				<SickSearch />
				<S.SearchBackgroundIconWrapper>
					<img src={SickSearchIcon1} alt="" />
					<img src={SickSearchIcon2} alt="" />
					<img src={SickSearchIcon3} alt="" />
				</S.SearchBackgroundIconWrapper>
			</S.SickSearchContainer>
		</div>
	);
};

export default Home;
