import { Navigation, Typography } from '@src/components';
import * as S from './styled';
import { SymbolImage } from '@src/assets/images';

const Header = () => {
	return (
		<S.Container>
			<S.Header>
				<Typography variant="h1">
					<S.LinkLogo to="/">
						<img src={SymbolImage} alt="로고" className="logo-symbol" />
						<strong className="logo-title">한국임상정보</strong>
					</S.LinkLogo>
				</Typography>
				<Navigation />
			</S.Header>
		</S.Container>
	);
};

export default Header;
