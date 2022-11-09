import { HomeWrap } from './styled';
import Search from '../../components/feature/Search';
import Typography from '../../components/shared/Typography';

const Home = () => {
	return (
		<HomeWrap>
			<div>
				<Typography variant="h2">
					<p className="page-description">국내 모든 임상시험 검색하고</p>
					<p className="page-description">온라인으로 참여하기</p>
				</Typography>
				<Search />
			</div>
		</HomeWrap>
	);
};

export default Home;
