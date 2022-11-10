import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.header`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 56px;
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
