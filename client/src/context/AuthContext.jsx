// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Login function
  const login = (userData) => {
    try {
      // Update state with user data
      setUser({
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
        role: userData.role || 'user',
        token: userData.token
      });
      setIsAuthenticated(true);

      console.log('User logged in successfully:', userData.username);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout function
  const logout = (redirectTo = '/auth/login') => {
    try {
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      // Redirect to login
      navigate(redirectTo);
      
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Set auth status (for compatibility with your existing code)
  const setAuthStatus = (status) => {
    setIsAuthenticated(status);
    if (!status) {
      setUser(null);
    }
  };

  // Update user profile
  const updateUser = (updatedData) => {
    try {
      const newUserData = { ...user, ...updatedData };
      setUser(newUserData);

      console.log('User data updated:', newUserData);
      return true;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Get current user ID
  const getUserId = () => {
    return user?.userId;
  };

  // Get auth token
  const getToken = () => {
    return user?.token;
  };

  // Get auth headers for API calls
  const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Check auth status
  const checkAuthStatus = () => {
    return isAuthenticated && user !== null;
  };

  // Get user info
  const getUserInfo = () => {
    return user;
  };

  // Context value
  const contextValue = {
    // State
    user,
    isAuthenticated,
    isLoading,
    
    // Actions
    login,
    logout,
    updateUser,
    setAuthStatus, // For compatibility with your existing Authentication component
    
    // Utilities
    hasRole,
    isAdmin,
    getUserId,
    getToken,
    getAuthHeaders,
    checkAuthStatus,
    getUserInfo
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// HOC for protected routes
export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate('/auth/login');
      }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null; // Will redirect to login
    }

    return <Component {...props} />;
  };
};

// HOC for admin-only routes
export const withAdminAuth = (Component) => {
  return function AdminAuthenticatedComponent(props) {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          navigate('/auth/login');
        } else if (!isAdmin()) {
          navigate('/dashboard'); // Redirect non-admin users
        }
      }
    }, [isAuthenticated, isAdmin, isLoading, navigate]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated || !isAdmin()) {
      return null; // Will redirect
    }

    return <Component {...props} />;
  };
};

export default AuthContext;