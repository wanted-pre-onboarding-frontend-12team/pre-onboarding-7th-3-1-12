import * as S from './styled';
import { CloseIcon, SearchIcon } from '@src/assets/icons';

const SickSearchForm = () => {
	return (
		<S.SickSearchForm onSubmit={() => {}}>
			<S.SickSearchInput type="text" placeholder="🔍 질환명을 입력해 주세요." />
			<S.SickSearchResetButton type="button">
				<img src={CloseIcon} alt="검색어 초기화" className="search-reset" />
			</S.SickSearchResetButton>
			<S.SickSearchButton type="submit">
				<img src={SearchIcon} alt="검색" className="search-submit" />
			</S.SickSearchButton>
		</S.SickSearchForm>
	);
};

export default SickSearchForm;
