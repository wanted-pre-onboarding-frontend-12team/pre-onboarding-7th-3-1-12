import Typography from '../Typography';
import { HeaderWrap } from './styled';

const Header = () => {
	return (
		<HeaderWrap>
			<Typography variant="h1">
				<img></img>
				<p className="header-title">한국임상정보</p>
			</Typography>
		</HeaderWrap>
	);
};

export default Header;
