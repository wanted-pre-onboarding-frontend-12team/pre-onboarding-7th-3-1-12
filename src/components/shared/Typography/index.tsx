import { PropsWithChildren } from 'react';
import * as S from './styled';

type Props = {
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption' | 'span' | 'div';
	margin?: string;
	padding?: string;
	fontSize?: string;
	fontWeight?: number;
	lineHeight?: string;
	color?: string;
	align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
	whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap';
} & PropsWithChildren;

const Typography = ({ children, variant, ...props }: Props) => {
	return (
		<S.Component as={variant} {...props}>
			{children}
		</S.Component>
	);
};

export default Typography;
