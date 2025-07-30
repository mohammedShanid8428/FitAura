import React from 'react';
import { ToastProvider } from './components/ui/Use-Toast';
import Context from './context/ Context'; // ✅ No space and correctly default-exported
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Context>
      <ToastProvider>
        <Toaster position="top-right" />
        <AppRoutes />
      </ToastProvider>
    </Context>
  );
};

export default App;
