import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';   // ← VERY IMPORTANT!
import { AuthProvider } from './contexts/AuthContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"      // 🔥 Use colored theme globally
      />
    </AuthProvider>
  </React.StrictMode>
);
