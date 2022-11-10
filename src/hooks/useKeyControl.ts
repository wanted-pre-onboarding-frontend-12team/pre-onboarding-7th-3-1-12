import { useState } from 'react';
import { Sick } from '../types/sick';

const useKeyControl = (cacheData: Sick[]) => {
	const [focusIndex, setFocusIndex] = useState<number>(-1);

	const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (cacheData) {
			const { key } = e;

			switch (key) {
				case 'ArrowDown':
					setFocusIndex((prev) => (prev + 1) % cacheData.length);
					break;
				case 'ArrowUp':
					setFocusIndex((prev) => (prev - 1 + cacheData.length) % cacheData.length);
					break;
				case 'Escape':
					setFocusIndex(-1);
					break;
			}
		}
	};

	return { focusIndex, keyHandler };
};

export default useKeyControl;
