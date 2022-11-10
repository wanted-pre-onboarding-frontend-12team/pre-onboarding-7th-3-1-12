import { PATH } from '../constants/api';
import axios from 'axios';

const base = axios.create({
	baseURL: import.meta.env.VITE_BASE_API_URL,
});

export const getSearchData = async (params: string) => {
	const {
		sick: { index },
	} = PATH;
	const res = await base.get(`${index}?sickNm_like=${params}`);
	console.log('api calling');
	return res.data;
};
