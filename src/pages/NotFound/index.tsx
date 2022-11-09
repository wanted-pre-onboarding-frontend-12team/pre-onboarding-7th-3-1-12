import { Header } from '@src/components';
import { useLocation } from 'react-router-dom';
import * as S from './styled';

const NotFound = () => {
	const locator = useLocation();

	return (
		<div>
			<Header />
			<S.InnerContainer>
				<p className="error-message-default">존재하지 않는 페이지입니다.</p>
				<p className="error-message-url">{`URL: ${location.protocol}//${location.hostname}:${location.port}${locator.pathname}`}</p>
			</S.InnerContainer>
		</div>
	);
};

export default NotFound;
