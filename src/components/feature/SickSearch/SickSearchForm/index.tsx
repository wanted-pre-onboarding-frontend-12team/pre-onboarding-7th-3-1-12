import * as S from './styled';
import { CloseIcon, SearchIcon } from '@src/assets/icons';

type Props = {
	sickSearchInputRef: React.MutableRefObject<HTMLInputElement>;
	sickKeyword: string;
	onSickSearchFormFousedChange: (newFocusedStatus: boolean) => void;
	onSickKeywordChange: (newSickKeyowrd: string) => void;
	onSickKeywordReset: () => void;
	onSickSearchInputKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const SickSearchForm = (props: Props) => {
	const handleSickSearchInputFocus = () => {
		props.onSickSearchFormFousedChange(true);
	};

	const handleSickSearchInputBlur = () => {
		props.onSickSearchFormFousedChange(false);
	};

	const handleSickSearchInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		props.onSickKeywordChange(event.currentTarget.value);
	};

	const handleSickSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<S.SickSearchForm onSubmit={handleSickSearchFormSubmit}>
			<S.SickSearchInput
				type="text"
				placeholder="π μ§νλͺμ μλ ₯ν΄ μ£ΌμΈμ."
				value={props.sickKeyword}
				ref={props.sickSearchInputRef}
				onChange={handleSickSearchInputChange}
				onKeyDown={props.onSickSearchInputKeydown}
				onFocus={handleSickSearchInputFocus}
				onBlur={handleSickSearchInputBlur}
			/>

			{props.sickKeyword && (
				<S.SickSearchResetButton type="button" onClick={props.onSickKeywordReset}>
					<img src={CloseIcon} alt="κ²μμ΄ μ΄κΈ°ν" className="search-reset" />
				</S.SickSearchResetButton>
			)}

			<S.SickSearchButton type="submit">
				<img src={SearchIcon} alt="κ²μ" className="search-submit" />
			</S.SickSearchButton>
		</S.SickSearchForm>
	);
};

export default SickSearchForm;
