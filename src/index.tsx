import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from '@src/App';
import { GlobalStyle, theme } from '@src/styles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<GlobalStyle />
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>,
);
