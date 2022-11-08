export const isNotEmptyArray = (target: any) => {
	if (!target || !Array.isArray(target)) {
		throw new Error('Target data is not Array !');
	}

	return target.length > 0;
};
