import styled from 'styled-components';

export const HomeWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	background-color: ${({ theme }) => theme.colors.sky};
	div {
		padding: 40px 0px 80px 0px;
		.page-description {
			margin-top: 20px;
			margin-bottom: 20px;
			font-size: 2.125rem;
			font-weight: ${({ theme }) => theme.fontWeights.bold};
		}
	}
`;
