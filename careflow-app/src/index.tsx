// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Auth0Provider } from './mockAuth0';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Auth0Provider
    domain="dev-ni7jkmfx0oybqzdf.us.auth0.com"
    clientId="mkmVvsZQwku14qYIH34tA4kPKdTzejse"
    authorizationParams={{
      redirect_uri: 'http://localhost:3000'
    }}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Auth0Provider>
);
reportWebVitals();
