import React, { Dispatch, SetStateAction, useRef } from 'react';
import { AutoSearchContainer, AutoSearchWrap, AutoSearchData } from './styled';
import { Sick } from '../../../types/sick';
import { splitTargetRegardlessOfStringCase } from '../../../hooks/stringUtils';
import useKeyControl from '../../../hooks/useKeyControl';

type Props = {
	keyword: string;
	cacheData: Sick[];
	setCacheData: Dispatch<SetStateAction<Sick[]>>;
};

const AutoSearch = ({ keyword, cacheData }: Props) => {
	const autoRef = useRef<HTMLUListElement>(null);
	const { focusIndex } = useKeyControl();

	return (
		<AutoSearchContainer>
			<AutoSearchWrap ref={autoRef}>
				{cacheData ? (
					<>
						<div className="keywordDiv">
							<img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png"></img>
							<p>{keyword}</p>
						</div>
						<p className="title">추천검색어</p>
					</>
				) : (
					<p className="noDataByKeword">일치하는 검색어가 없습니다.</p>
				)}
				{cacheData &&
					cacheData.map(({ sickCd, sickNm }: Sick, idx: number) => {
						return (
							<AutoSearchData key={sickCd} isFocus={focusIndex === idx ? true : false} style={{ cursor: 'pointer' }}>
								{splitTargetRegardlessOfStringCase(sickNm, keyword).map((splitedItem, idx, splitedItems) => {
									if (splitedItems.length - 1 === idx) {
										<img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png"></img>;
										return <React.Fragment key={idx}>{splitedItem}</React.Fragment>;
									}
									return (
										<React.Fragment key={idx}>
											<img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png"></img>
											{splitedItem}
											<span className="boldText">{keyword.toUpperCase()}</span>
										</React.Fragment>
									);
								})}
							</AutoSearchData>
						);
					})}
			</AutoSearchWrap>
		</AutoSearchContainer>
	);
};

export default AutoSearch;
