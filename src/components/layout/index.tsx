import { PropsWithChildren } from 'react';
import * as S from './styled';

const Layout = (props: PropsWithChildren) => {
	return <S.Container>{props.children}</S.Container>;
};

export default Layout;
