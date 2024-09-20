// src/components/protectRoute/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'your-token');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
