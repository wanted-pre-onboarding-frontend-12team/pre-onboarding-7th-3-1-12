import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';

export const Container = styled.div`
	display: flex;
	position: relative;
	justify-content: center;
	width: 40%;
	max-height: 80px;
	height: 12%;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 50px;
`;

export const InputWrap = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0 0.7rem 0 1.8rem;
	.normal-status-search {
		display: flex;
		align-items: center;
		padding-top: 0.4rem;
		width: 90%;
		.search-small-icon {
			width: 25px;
			height: 25px;
		}
		.input-holder {
			padding-left: 1rem;
			color: ${({ theme }) => theme.colors.gray[100]};
			font-size: ${({ theme }) => theme.fontSizes.search};
			font-weight: ${({ theme }) => theme.fontWeights.fw400};
		}
	}
	.searching-status {
		display: flex;
		width: 90%;
		padding-top: 0.4rem;
		.search-input {
			width: 90%;
			height: 90%;
			outline: none;
			border: none;
			font-size: ${({ theme }) => theme.fontSizes.search};
		}
	}
`;

export const SearchIconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	border-radius: 50px;
	background-color: ${({ theme }) => theme.colors.blue[400]};
	.search-large-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25px;
		height: 25px;
	}
`;

export const CancelIcon = styled(MdCancel)`
	color: gray;
	font-size: 25px;
`;
