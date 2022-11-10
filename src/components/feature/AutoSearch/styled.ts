import styled from 'styled-components';

export const AutoSearchContainer = styled.div`
	position: absolute;
	z-index: 3;
	height: 50vh;
	width: 100%;
	top: 110px;
	border-radius: 30px;
	background-color: #fff;
	padding: 15px;
	box-shadow: 3px 3px 3px 3px grey;
	color: black;
`;

export const AutoSearchWrap = styled.ul`
	display: flex;
	flex-direction: column;
	text-align: start;
	padding-left: 24px;
	margin-top: 1rem;
	width: 100%;
	font-size: 14px;
	.title {
		margin-top: 1rem;
		padding: 0;
		font-size: 10px;
		color: ${({ theme }) => theme.colors.gray};
	}
	.keywordDiv {
		padding: 0;
		padding-left: 18px;
		font-weight: bold;
		&:hover {
			background-color: #edf5f5;
			cursor: pointer;
		}
		img {
			position: absolute;
			width: 18px;
			left: 24px;
			color: ${({ theme }) => theme.colors.gray};
		}
	}
`;

export const AutoSearchData = styled.li<{ isFocus?: boolean }>`
	padding-left: 1rem;
	margin-top: 1rem;
	z-index: 4;
	color: black;
	background-color: ${(props) => (props.isFocus ? '#edf5f5' : '#fff')};
	&:hover {
		background-color: #edf5f5;
		cursor: pointer;
	}
	position: relative;
	img {
		position: absolute;
		width: 18px;
		left: 0;
		color: ${({ theme }) => theme.colors.gray};
	}
	.boldText {
		font-weight: 700;
	}
`;
