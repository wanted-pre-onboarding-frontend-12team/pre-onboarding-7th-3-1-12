import SickSearchForm from '@src/components/feature/SickSearch/SickSearchForm';
import SickSearchAutoComplete from '@src/components/feature/SickSearch/SickSearchAutoComplete';
import * as S from './styled';
import { useState } from 'react';
import { Sick } from '@src/types/sick';
import { getSicksByIncludeKeyword } from '@src/core/apis/sick';

const SickSearch = () => {
	const [sickKeyword, setSickKeyword] = useState('');
	const [recommendSicks, setRecommendSicks] = useState<Sick[]>([]);

	const handleSickKeywordChange = async (newSickKeyword: string) => {
		setSickKeyword(newSickKeyword);
		const newRecommendSicks = await getSicksByIncludeKeyword(newSickKeyword);
		setRecommendSicks(newRecommendSicks);
	};

	const handleSickKeywordReset = () => {
		setSickKeyword('');
	};

	return (
		<S.Container>
			<SickSearchForm
				sickKeyword={sickKeyword}
				onSickKeywordChange={handleSickKeywordChange}
				onSickKeywordReset={handleSickKeywordReset}
			/>
			<SickSearchAutoComplete sickKeyword={sickKeyword} recommendSicks={recommendSicks} />
		</S.Container>
	);
};

export default SickSearch;
