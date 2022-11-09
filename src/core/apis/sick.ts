import { API_PATH, HttpMethod } from '@src/core/apis/common';
import requester from '@src/core/apis/requester';
import { Sick } from '@src/types/sick';

export const getSick = async () => {
	const {
		sick: { index },
	} = API_PATH;

	const { payload } = await requester<Sick[]>({
		method: HttpMethod.GET,
		url: index,
	});

	return payload;
};
