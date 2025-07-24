import React from 'react';
import { ToastProvider } from './components/ui/Use-Toast';
import { AuthProvider } from '../context/AuthContext';
import Header from './components/common/Header';

import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
         <Toaster position="top-right" />
        
        <AppRoutes /> {/* ✅ Single route manager */}
       
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
