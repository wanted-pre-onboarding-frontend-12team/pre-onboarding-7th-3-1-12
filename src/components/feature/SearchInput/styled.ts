import styled from 'styled-components';

export const InputWrap = styled.div`
	display: flex;
`;

export const Input = styled.input`
	width: 410px;
	height: 70px;
	padding: 12px 30px;
	border: none;
	border-radius: 50px 0 0 50px;
	font-size: 17px;
	:focus {
		outline: none;
	}
`;

export const SearchBtn = styled.button`
	width: 90px;
	height: 70px;
	border: none;
	border-radius: 0 50px 50px 0;
	background-color: ${({ theme }) => theme.color.blue};
	color: ${({ theme }) => theme.color.white};
	font-size: 18px;
	font-weight: bold;
`;
