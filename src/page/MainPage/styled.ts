import styled from 'styled-components';

export const MainPageWrap = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	padding-top: 120px;
	background-color: ${({ theme }) => theme.color.skyblue};
`;
