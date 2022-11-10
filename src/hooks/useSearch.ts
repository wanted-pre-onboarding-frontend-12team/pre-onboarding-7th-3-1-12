import { useEffect, useState } from 'react';
import { Cache } from '../utils/Cache';
import { getSearchData } from '../apis/search';

const useSearch = () => {
	const [search, setSearch] = useState('');
	const [searchList, setSearchList] = useState([]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const searchedData = (value: string): void => {
		if (Cache.isCached(value)) {
			setSearchList(JSON.parse(Cache.getCache(value)));
		} else {
			getSearchData(value).then((res) => {
				Cache.setCache(value, JSON.stringify(res));
			});
		}
	};

	useEffect(() => {
		if (search.length > 0) {
			const timeout = setTimeout(() => searchedData(search), 200);
			return () => {
				clearTimeout(timeout);
			};
		}
		if (search.length === 0) {
			setSearchList([]);
		}
	}, [search]);

	return { search, searchList, onChange };
};

export default useSearch;
