import styled from 'styled-components';

export const RecWrap = styled.ul`
	width: 490px;
	border-radius: 15px;
	margin-top: 10px;
	padding: 30px 40px 10px;
	color: ${({ theme }) => theme.color.gray};
	background-color: ${({ theme }) => theme.color.white};
`;

export const RecItem = styled.li`
	padding: 15px 0;
	color: ${({ theme }) => theme.color.black};
`;
