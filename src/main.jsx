import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SearchProvider } from './service/SearchContext.jsx';
import { GlobalProvider } from './service/GlobalContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </GlobalProvider>
  </React.StrictMode>,
);
