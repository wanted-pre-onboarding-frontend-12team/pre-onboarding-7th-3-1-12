import { useState } from 'react';

const useKeyControl = () => {
	const [focusIndex, setFocusIndex] = useState<number>(-1);

	const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e;

		switch (key) {
			case 'ArrowDown':
				setFocusIndex((prev) => prev + 1);
				break;
			case 'ArrowUp':
				if (focusIndex === -1) return;
				setFocusIndex((prev) => prev - 1);
				break;
			case 'Escape':
				setFocusIndex(-1);
				break;
			default:
				setFocusIndex(-1);
				break;
		}
	};

	return { focusIndex, keyHandler };
};

export default useKeyControl;
