import styled from 'styled-components';

type ComponentProps = {
	margin?: string;
	padding?: string;
	fontSize?: string;
	fontWeight?: number;
	lineHeight?: string;
	color?: string;
	align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
	whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap';
};

export const Component = styled.div<ComponentProps>`
	margin: ${({ margin }) => margin && margin};
	padding: ${({ padding }) => padding && padding};
	font-size: ${({ fontSize }) => fontSize && fontSize};
	font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
	line-height: ${({ lineHeight }) => lineHeight && lineHeight};
	color: ${({ color, theme }) => (color ? color : theme.colors.black)};
	text-align: ${({ align }) => align && align};
	white-space: ${({ whiteSpace }) => whiteSpace && whiteSpace};
`;
