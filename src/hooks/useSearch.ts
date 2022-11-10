import { useEffect, useState } from 'react';
import { getSick } from '../apis/sick';
import { Sick } from '../types/sick';
import useDebounce from './useDebounce';

const useSearch = () => {
	const [keyword, setKeyword] = useState<string>('');
	const [cacheData, setCacheData] = useState<Sick[]>([]);

	let sickMap = new Map<string, Sick[]>([]);
	const debouncedKeyword = useDebounce(keyword, 500);

	const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>) => {
		setKeyword(e.currentTarget.value);
	};

	const resetKeyword = () => {
		setKeyword('');
	};

	const cacheMap = async (debouncedKeyword: string) => {
		if (debouncedKeyword && sickMap.has(debouncedKeyword)) {
			setCacheData(sickMap.get(debouncedKeyword)!);
		} else if (debouncedKeyword && !sickMap.has(debouncedKeyword)) {
			const newData = await getSick(debouncedKeyword);
			if (newData.length !== 0) {
				sickMap.set(debouncedKeyword, newData.slice(0, 8));
			}
		}
		setCacheData(sickMap.get(debouncedKeyword)!);
	};

	useEffect(() => {
		cacheMap(debouncedKeyword);
	}, [debouncedKeyword]);

	return { keyword, cacheData, debouncedKeyword, setCacheData, onChangeKeyword, resetKeyword };
};

export default useSearch;
