import * as S from './styled';
import { searchIconSmall } from '../../../assets/index';
import useKeyEvent from '../../../hooks/useKeyEvent';
type Props = {
	status: boolean;
	string: { sickCd: string; sickNm: string }[];
};

const Dropdown = (props: Props) => {
	const { handleKeyEvent } = useKeyEvent();

	return (
		<>
			{props.status === false && (
				<S.Container>
					{props.string.length ? (
						props.string.map((el) => (
							<S.Ulist key={el.sickCd}>
								<img className="search-icon" src={searchIconSmall} />
								<li className="search-list" dangerouslySetInnerHTML={{ __html: el.sickNm }} onKeyDown={handleKeyEvent}></li>
							</S.Ulist>
						))
					) : (
						<div className="empty-search">검색어 없음</div>
					)}
				</S.Container>
			)}
		</>
	);
};

export default Dropdown;
