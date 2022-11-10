import styled from 'styled-components';

export const SickSearchContainer = styled.div`
	position: relative;
	padding: 80px 0 160px 0;
	background-color: ${({ theme }) => theme.colors.sky};
`;

export const SickSearchTitle = styled.h2`
	margin-bottom: 40px;
	font-size: 2.125rem;
	font-weight: ${({ theme }) => theme.fontWeights.bold};
	line-height: 1.6;
	white-space: pre-wrap;
	text-align: center;
`;

export const SearchBackgroundIconWrapper = styled.div`
	position: relative;
	width: ${({ theme }) => theme.maxWidth};
	min-width: ${({ theme }) => theme.maxWidth};
	max-width: ${({ theme }) => theme.maxWidth};
	margin: 0 auto;

	& > img {
		position: absolute;
		max-width: 128px;

		&:nth-child(1) {
			top: -100px;
			left: 20px;
		}

		&:nth-child(2) {
			top: -100px;
			right: 0;
		}

		&:nth-child(3) {
			right: 120px;
		}
	}
`;
