import React from 'react';
import { ToastProvider } from './components/ui/Use-Toast';
import Context from './context/ Context'; // ✅ No space and correctly default-exported
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
    <Context>
      <ToastProvider>
        <Toaster position="top-right" />
        <AppRoutes />
      </ToastProvider>
    </Context>
    </AuthProvider>
  );
};

export default App;
