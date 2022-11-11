import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.header`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: ${({ theme }) => theme.maxWidth};
	height: 56px;
	margin: 0 auto;
	padding: 0 20px;
`;

export const LinkLogo = styled(Link)`
	flex: 1;
	display: flex;
	align-items: center;
	text-decoration: none;

	.logo-symbol {
		width: auto;
		height: 48px;
	}

	.logo-title {
		font-size: 1.25rem;
		font-weight: ${({ theme }) => theme.fontWeights.bold};
		color: ${({ theme }) => theme.colors.primary};
	}
`;
