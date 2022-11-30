import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './css/reset.scss';
import './css/main.scss';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <App />
  // </React.StrictMode>
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
