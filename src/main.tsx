import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './components/App';
import './css/reset.scss';
import './css/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <App />
	// </React.StrictMode>
	<React.StrictMode>
		<HashRouter>
			<App />
		</HashRouter>
	</React.StrictMode>
);
