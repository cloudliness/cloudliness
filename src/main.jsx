import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext.jsx';
import { StripeProvider } from './contexts/StripeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StripeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </StripeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
