import styled from 'styled-components';

export const SickSearchForm = styled.form`
	position: relative;
	flex: 1;
	display: flex;
	align-items: center;
`;

export const SickSearchInput = styled.input`
	flex: 1;
	height: 100%;
	padding: 0 2em 0 0.5em;
	border: none;
	background-color: transparent;
	font-size: 1.1rem;
	&:focus {
		outline: none;
	}
`;

export const SickSearchResetButton = styled.button`
	position: absolute;
	right: 4.25em;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 22px;
	height: 22px;
	border: none;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.gray};
	cursor: pointer;

	& > .search-reset {
		width: 10px;
		height: auto;
	}
`;

export const SickSearchButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	border: none;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: 50%;
	cursor: pointer;

	& > .search-icon {
		width: 21px;
		height: auto;
	}
`;
