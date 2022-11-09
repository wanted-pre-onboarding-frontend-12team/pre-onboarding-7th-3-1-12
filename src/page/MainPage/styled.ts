import styled from 'styled-components';

export const MainPageWrap = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	overflow-y: auto;
	padding: 120px 0 50px;
	background-color: ${({ theme }) => theme.color.skyblue};
`;
