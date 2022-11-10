import React from 'react';
import { Sick } from '@src/types/sick';
import { isNotEmptyArray } from '@src/utils/arrayUtils';
import { splitTargetRegardlessOfStringCase } from '@src/utils/stringUtils';
import * as S from './styled';

type Props = {
	sickKeyword: string;
	recommendSicks: Sick[];
};

const SickSearchAutoComplete = (props: Props) => {
	return (
		<>
			{props.sickKeyword && (
				<S.Container>
					{isNotEmptyArray(props.recommendSicks) ? (
						<>
							<S.AutoCompleteItemWrapper>
								🔍
								<S.TextWrapper>
									<S.HightLightText>{props.sickKeyword}</S.HightLightText>
								</S.TextWrapper>
							</S.AutoCompleteItemWrapper>

							<S.Caption>추천 검색어</S.Caption>
							{props.recommendSicks.map((recommendSick) => {
								return (
									<S.AutoCompleteItemWrapper key={recommendSick.sickCd}>
										🔍
										<S.TextWrapper>
											{splitTargetRegardlessOfStringCase(recommendSick.sickNm, props.sickKeyword).map(
												(splitedItem, index, splitedItems) => {
													if (splitedItems.length - 1 === index) {
														return <React.Fragment key={index}>{splitedItem}</React.Fragment>;
													}
													return (
														<React.Fragment key={index}>
															{splitedItem}
															<S.HightLightText>{props.sickKeyword.toUpperCase()}</S.HightLightText>
														</React.Fragment>
													);
												},
											)}
										</S.TextWrapper>
									</S.AutoCompleteItemWrapper>
								);
							})}
						</>
					) : (
						<S.AutoCompleteItemWrapper>🔍 "{props.sickKeyword}"와(과) 연관된 추천 검색어가 없습니다.</S.AutoCompleteItemWrapper>
					)}
				</S.Container>
			)}
		</>
	);
};

export default SickSearchAutoComplete;
