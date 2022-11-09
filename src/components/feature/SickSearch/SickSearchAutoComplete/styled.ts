import styled from 'styled-components';

export const Container = styled.ul`
	position: absolute;
	top: 80px;
	left: 0;
	display: flex;
	flex-direction: column;
	width: 480px;
	padding: 1.5em 0;
	border-radius: 2em;
	background-color: ${({ theme }) => theme.colors.white};
	-webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
`;

export const Caption = styled.span`
	margin: 0.5em 1.8em;
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.lightgray};
`;

export const AutoCompleteItemWrapper = styled.li`
	display: block;
	align-items: center;
	width: 480px;
	padding: 1em 1.5em;
	line-height: 1.2;
	cursor: pointer;

	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	&:hover {
		background-color: ${({ theme }) => theme.colors.lightgray};
	}
`;

export const TextWrapper = styled.span`
	margin-left: 0.5rem;
`;

export const HightLightText = styled.strong`
	font-weight: ${({ theme }) => theme.fontWeights.bold};
	color: ${({ theme }) => theme.colors.primary};
`;
