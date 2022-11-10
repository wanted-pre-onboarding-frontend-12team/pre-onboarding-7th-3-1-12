import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	position: absolute;
	flex-direction: column;
	border-radius: 15px;
	top: 90px;
	width: 100%;
	z-index: 30;
	background-color: ${({ theme }) => theme.colors.white};
	.empty-search {
		padding: 1rem;
	}
`;

export const Ulist = styled.ul`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 1rem;

	.search-icon {
		width: 25px;
	}
`;

export const SearchList = styled.li<{ isFocus?: boolean }>`
	display: flex;
	padding-left: 0.5rem;
	background-color: ${({ isFocus, theme }) => (isFocus ? theme.colors.white : theme.colors.blue[200])};
`;
