import React, { forwardRef } from 'react';
import { sickInfo } from '../../../type/type';

type Props = {
	data: sickInfo[];
	word: string;
	focuseIndex: number;
};

const RelatedSearchTerm = ({ data, word, focuseIndex }: Props, ref: React.Ref<HTMLUListElement>) => {
	function getBoldWord(target: string, boldWord: string) {
		return (
			<>
				{target.split(boldWord)[0]}
				<b>{target.slice(target.indexOf(boldWord), boldWord.length + target.indexOf(boldWord))}</b>
				{target.split(boldWord)[1]}
			</>
		);
	}

	return (
		<React.Fragment>
			<h6>추천 검색어</h6>
			<ul ref={ref}>
				{data &&
					data.map((item: sickInfo, index: number) => {
						return (
							<li key={item.sickCd} style={index === focuseIndex ? { backgroundColor: 'skyblue' } : {}}>
								{getBoldWord(item.sickNm, word)}
							</li>
						);
					})}
			</ul>
		</React.Fragment>
	);
};

export default forwardRef(RelatedSearchTerm);
