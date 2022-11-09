import axios from 'axios';

export const getRecommend = async (sickNm: string) => {
	const res = await axios.get(`http://localhost:4000/sick?q=${sickNm}`);
	return res.data;
};
