export const splitTargetRegardlessOfStringCase = (target: string, keyword: string) => {
	const splitedByUpperCase = target.split(keyword.toUpperCase());
	const splitedByLowerCase = target.split(keyword.toLowerCase());

	return splitedByLowerCase.length > splitedByUpperCase.length ? splitedByLowerCase : splitedByUpperCase;
};
