import styled from 'styled-components';

export const InnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 56px);

	line-height: 2rem;
	& > p {
		&.error-message-default {
			font-size: 1.5rem;
		}

		&.error-message-url {
			font-size: 1.25rem;
			font-weight: ${({ theme }) => theme.fontWeights.bold};
		}
	}
`;
