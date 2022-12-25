import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './css/reset.scss';
import './css/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <App />
	// </React.StrictMode>
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
