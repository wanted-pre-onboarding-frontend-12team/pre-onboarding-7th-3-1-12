import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	position: relative;
	padding: 0 1em;
	margin: 0 auto;
	width: 480px;
	height: 70px;
	border-radius: 3em;
	background-color: ${({ theme }) => theme.colors.white};
`;
