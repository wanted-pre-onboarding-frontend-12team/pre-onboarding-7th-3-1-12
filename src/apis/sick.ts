import { PATH, GET } from './api';
import requester from './requester';
import { Sick } from '../types/sick';

export const getSick = async (keyword: string) => {
	console.info('calling api');

	const {
		sick: { index },
	} = PATH;

	const { payload: sick } = await requester<Sick[]>({
		method: GET,
		url: `${index}?sickNm_like=${keyword}`,
	});

	return sick;
};
