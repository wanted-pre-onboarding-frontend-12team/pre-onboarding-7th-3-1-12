import { useLocation } from 'react-router-dom';
import * as S from './styled';

const navigationItems = [
	{
		id: 1,
		path: '/intro',
		content: '소개',
	},
	{
		id: 2,
		path: '/question',
		content: '질문과 답변',
	},
	{
		id: 3,
		path: '/notification',
		content: '소식받기',
	},
	{
		id: 4,
		path: '/customer',
		content: '제휴/문의',
	},
] as const;

const Navigation = () => {
	const locator = useLocation();

	return (
		<S.Container>
			<S.NavigationList>
				{navigationItems.map((navigationItem) => {
					return (
						<S.NavigationItem key={navigationItem.id}>
							<S.NavigationLink to={navigationItem.path} selected={locator.pathname === navigationItem.path}>
								{navigationItem.content}
							</S.NavigationLink>
						</S.NavigationItem>
					);
				})}
			</S.NavigationList>
		</S.Container>
	);
};

export default Navigation;
