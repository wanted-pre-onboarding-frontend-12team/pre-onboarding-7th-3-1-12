import styled from 'styled-components';

export const Container = styled.div<{ isFocused: boolean }>`
	display: flex;
	position: relative;
	padding: 0 1em;
	margin: 0 auto;
	width: 480px;
	height: 70px;
	border: 2px solid ${({ isFocused, theme }) => (isFocused ? theme.colors.primary : 'transparent')};
	border-radius: 3em;
	background-color: ${({ theme }) => theme.colors.white};
`;
