import { useEffect, Dispatch, SetStateAction } from 'react';

export const useOutsideClick = (ref: React.MutableRefObject<HTMLDivElement>, callback: Dispatch<SetStateAction<boolean>>) => {
	const handleClick = (e: React.BaseSyntheticEvent | MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback(true);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick, true);

		return () => {
			document.removeEventListener('mousedown', handleClick, true);
		};
	});
};
