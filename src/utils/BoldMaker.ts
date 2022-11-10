export const boldMaker = (search: string, list: { sickNm: string; sickCd: string }[]) => {
	return list.map((el) => {
		let regex = new RegExp(search, 'gmi');
		return { sickCd: el.sickCd, sickNm: el.sickNm.replace(regex, `<b>${search}</b>`) };
	});
};
