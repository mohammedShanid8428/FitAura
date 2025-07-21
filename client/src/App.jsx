import React from 'react';
import UserRoutes from './routes/UserRoutes';
import { ToastProvider } from './components/ui/Use-Toast';
import { AuthProvider } from '../context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Header/>
        <UserRoutes />
        <Footer/>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
