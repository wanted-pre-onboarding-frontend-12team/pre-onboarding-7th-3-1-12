import axios from 'axios';

export const getRelatedKeywords = async (keyword: string) => {
	const response = await axios.get(`http://localhost:4000/sick?sickNm_like=${keyword}`, {
		headers: { 'Cache-Control': 'max-age=604800' },
	});
	return response.data;
};
