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
	flex-direction: column;
	width: 100%;

	.search-icon {
		width: 25px;
	}
`;

export const SearchList = styled.li<{ isFocus?: boolean }>`
	display: flex;
	align-items: center;
	border-radius: 10px;
	width: 100%;
	padding: 1rem;
	background-color: ${({ isFocus, theme }) => (isFocus ? theme.colors.gray[100] : theme.colors.white)};
	.Search-item {
		padding-left: 1rem;
	}
`;
