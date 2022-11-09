import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.nav`
	display: flex;
	height: 100%;
`;

export const NavigationList = styled.ul`
	display: flex;
`;

export const NavigationItem = styled.li`
	display: flex;
	align-items: center;
`;

export const NavigationLink = styled(Link)<{ selected: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 100%;
	border-bottom: ${({ selected, theme }) => `2px solid ${selected ? theme.colors.primary : 'transparent'}`};
	text-decoration: none;
	word-wrap: break-word; // width 이상의 컨텐츠가 담길 경우 개행
	color: ${({ selected, theme }) => (selected ? theme.colors.primary : theme.colors.black)};
`;
