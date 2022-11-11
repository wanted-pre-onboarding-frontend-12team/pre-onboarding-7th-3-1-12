import styled from 'styled-components';

export const RecWrap = styled.div`
	width: 490px;
	max-height: 400px;
	overflow-y: hidden;
	border-radius: 15px;
	margin-top: 10px;
	padding: 20px 0;
	color: ${({ theme }) => theme.color.gray};
	background-color: ${({ theme }) => theme.color.white};
`;

export const RecText = styled.p`
	padding: 10px 40px 10px;
	font-size: 15px;
`;

export const RecList = styled.ul``;

export const RecItem = styled.li<{ focus: boolean }>`
	padding: 15px 40px;
	color: ${({ theme }) => theme.color.black};
	font-size: 18px;
	background-color: ${({ theme, focus }) => focus && theme.color.lightgray};
	cursor: pointer;

	:hover {
		background-color: ${({ theme }) => theme.color.lightgray};
	}
	.bold {
		font-weight: bold;
	}
`;

export const NoRecItem = styled.p`
	padding: 10px 40px 10px;
	color: ${({ theme }) => theme.color.black};
	font-size: 18px;
	font-weight: bold;
`;
