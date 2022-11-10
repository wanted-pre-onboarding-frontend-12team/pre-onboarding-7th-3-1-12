import { API_PATH, HttpMethod } from '@src/core/apis/common';
import requester from '@src/core/apis/requester';
import { Sick } from '@src/types/sick';

export const getSicksByIncludeKeyword = async (keyword: string, sliceCount: number = 8) => {
	console.info('calling api');

	const {
		sick: { index },
	} = API_PATH;

	const { payload: sicks } = await requester<Sick[]>({
		method: HttpMethod.GET,
		url: `${index}?sickNm_like=${keyword}`,
	});

	return sicks.slice(0, sliceCount);
};
