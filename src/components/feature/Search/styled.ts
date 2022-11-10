import styled from 'styled-components';

export const SearchContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;
	color: ${({ theme }) => theme.colors.white};
	border-radius: 42px;

	.reset-button {
		position: absolute;
		width: 24px;
		height: 24px;
		right: 65px;
		border: 0;
		border-radius: 100%;
		color: white;
		background-color: ${({ theme }) => theme.colors.grey};
	}

	button {
		position: absolute;
		width: 48px;
		height: 48px;
		right: 10px;
		border: 0;
		border-radius: 100%;
		background-color: ${({ theme }) => theme.colors.blue};

		svg {
			width: 21px;
			height: 21px;
			color: ${({ theme }) => theme.colors.white};
			border-radius: 100%;
		}
	}
`;

export const SearchInput = styled.input`
	border: 0;
	padding: 20px 10px 20px 24px;
	border-radius: 42px;
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	height: 100%;
	box-shadow: 3px 3px 3px 3px grey;

	&::placeholder {
		color: ${({ theme }) => theme.colors.gray};
		background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png);

		background-size: contain;
		background-position: 1px center;
		background-repeat: no-repeat;
		padding-left: 20px;
	}
`;
