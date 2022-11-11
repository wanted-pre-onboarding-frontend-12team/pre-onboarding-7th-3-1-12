import * as S from './styled';
import { searchIconSmall } from '../../../assets/index';

type Props = {
	status: boolean;
	string: { sickCd: string; sickNm: string }[];
	index: number;
	keyRef: React.MutableRefObject<HTMLUListElement>;
};

const Dropdown = (props: Props) => {
	return (
		<>
			{props.status === false && (
				<S.Container>
					{props.string.length ? (
						<S.Ulist ref={props.keyRef}>
							{props.string.map((el, idx) => (
								<S.SearchList className="search-list" key={el.sickCd} isFocus={props.index === idx ? true : false}>
									<img className="search-icon" src={searchIconSmall} />
									<p className="Search-item" dangerouslySetInnerHTML={{ __html: el.sickNm }}></p>
								</S.SearchList>
							))}
						</S.Ulist>
					) : (
						<div className="empty-search">검색어 없음</div>
					)}
				</S.Container>
			)}
		</>
	);
};

export default Dropdown;
