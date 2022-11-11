import * as S from './styled';
import SearchInput from '../../components/feature/SearchInput';
import Title from '../../components/shared/TItle';
const MainPage = () => {
	return (
		<S.MainPageWrap>
			<Title />
			<SearchInput />
		</S.MainPageWrap>
	);
};

export default MainPage;
