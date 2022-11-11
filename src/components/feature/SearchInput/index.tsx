import { useState, useRef, useEffect } from 'react';
import * as S from './styled';
import useSearch from '../../../hooks/useSearch';
import Dropdown from '../Dropdown';
import { searchIconLarge, searchIconSmall } from '../../../assets';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { boldMaker } from '../../../utils/BoldMaker';

const SearchInput = () => {
	const [isClicked, setIsClicked] = useState(true);
	const [searchingDatas, setSearchingDatas] = useState<any[]>([]);
	const clickRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const keyRef = useRef() as React.MutableRefObject<HTMLUListElement>;
	useOutsideClick(clickRef, setIsClicked);
	const { search, searchList, onChange } = useSearch();

	useEffect(() => {
		if (search) {
			const boldSearchDatas = boldMaker(search, searchList);
			setSearchingDatas(boldSearchDatas);
		}
	}, [searchList]);

	const [index, setIndex] = useState<number>(-1);

	const handleKeyEvent = (e: React.KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowDown':
				setIndex(index + 1);
				if (keyRef.current?.childElementCount === index + 1) {
					setIndex(0);
				}
				break;
			case 'ArrowUp':
				setIndex(index - 1);
				if (index <= 0) {
					setIndex(searchingDatas.length - 1);
				}
				break;
		}
	};

	return (
		<S.Container>
			<S.InputWrap ref={clickRef} onKeyDown={handleKeyEvent}>
				{isClicked ? (
					<div className="normal-status-search" onClick={() => setIsClicked(!isClicked)}>
						<img className="search-small-icon" src={searchIconSmall} />
						<p className="input-holder">질환명을 입력해 주세요.</p>
					</div>
				) : (
					<div className="searching-status">
						<input className="search-input" value={search} onChange={onChange} autoFocus />
						<S.CancelIcon />
					</div>
				)}
				<S.SearchIconWrapper>
					<img className="search-large-icon" src={searchIconLarge} />
				</S.SearchIconWrapper>
			</S.InputWrap>
			<Dropdown status={isClicked} string={searchingDatas} index={index} keyRef={keyRef} />
		</S.Container>
	);
};

export default SearchInput;
