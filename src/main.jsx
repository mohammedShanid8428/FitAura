import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>          {/* ✅ REQUIRED for routing to work */}
            {/* ✅ Optional if using Auth */}
        <App />
      
    </BrowserRouter>
  </React.StrictMode>
);
