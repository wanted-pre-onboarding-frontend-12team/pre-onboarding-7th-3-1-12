import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		maxWidth: string;
		fontWeights: {
			normal: 400;
			bold: 700;
		};
		colors: {
			primary: '#007BE9';
			sky: '#cae9ff';
			lightgray: '#D1D8DC';
			gray: '#94A2AD';
			black: '#000000';
			white: '#FFFFFF';
		};
	}
}
