import AutoSearch from '../AutoSearch';
import { SearchContainer, SearchInput } from './styled';
import useSearch from '../../../hooks/useSearch';
import useKeyControl from '../../../hooks/useKeyControl';

const Search = () => {
	const { keyword, debouncedKeyword, cacheData, onChangeKeyword, resetKeyword } = useSearch();
	const { focusIndex, keyHandler } = useKeyControl(cacheData);

	return (
		<SearchContainer>
			<SearchInput value={keyword} onChange={onChangeKeyword} placeholder="질환명을 입력해주세요" onKeyDown={keyHandler} />
			{keyword && (
				<button className="reset-button" onClick={() => resetKeyword()}>
					x
				</button>
			)}
			<button>
				<svg viewBox="0 0 16 16" fill="currentColor" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"></path>
				</svg>
			</button>
			{keyword && <AutoSearch keyword={debouncedKeyword} cacheData={cacheData} focusIndex={focusIndex} />}
		</SearchContainer>
	);
};

export default Search;
