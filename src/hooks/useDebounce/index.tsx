import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay = 800) => {
	const [debounceVal, setDebounceVal] = useState<string>(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebounceVal(value);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, delay]);

	return debounceVal;
};

export default useDebounce;
