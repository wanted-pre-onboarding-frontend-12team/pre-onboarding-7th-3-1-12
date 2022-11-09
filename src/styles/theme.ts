const BASE_FONT_SIZE_PIXEL = 16;
const pixelToRem = (px: number) => `${px / BASE_FONT_SIZE_PIXEL}rem`;

const theme = {
	maxWidth: pixelToRem(1040),
	fontWeights: {
		normal: 400,
		bold: 700,
	},
	colors: {
		primary: '#007BE9',
		lightgray: '#D1D8DC',
		gray: '#94A2AD',
		black: '#000000',
		white: '#FFFFFF',
	},
} as const;

export default theme;
