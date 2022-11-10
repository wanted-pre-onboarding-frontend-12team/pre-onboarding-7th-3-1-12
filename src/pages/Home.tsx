import * as S from './styled';
import SearchInput from '../components/feature/SearchInput';

const Home = () => {
	return (
		<S.Container>
			<S.Title>
				국내 모든 임상시험 검색하고
				<br /> 온라인으로 참여하기
			</S.Title>
			<SearchInput />
		</S.Container>
	);
};

export default Home;
