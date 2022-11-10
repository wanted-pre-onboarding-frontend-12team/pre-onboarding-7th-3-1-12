import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 6rem;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.blue[200]};
	height: 100vh;
`;

export const Title = styled.div`
	display: flex;
	text-align: center;
	line-height: 2.8rem;
	font-size: ${({ theme }) => theme.fontSizes.title};
	font-weight: ${({ theme }) => theme.fontWeights.fw700};
	margin-bottom: 50px;
`;
