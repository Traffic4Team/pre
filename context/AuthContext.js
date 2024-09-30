import React, { createContext, useContext, useState, useEffect } from 'react';

// AuthContext와 AuthProvider 정의
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [tokens, setTokens] = useState({
    accessToken: null,
    refreshToken: null,
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('userId');
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedRefreshToken = localStorage.getItem('refreshToken');
    
    if (savedAuth) {
      setAuth(savedAuth);
    }
    if (savedAccessToken && savedRefreshToken) {
      setTokens({ accessToken: savedAccessToken, refreshToken: savedRefreshToken });
    }
  }, []);

  const updateAuth = (userId, accessToken, refreshToken) => {
    setAuth(userId);
    setTokens({ accessToken, refreshToken });
    localStorage.setItem('userId', userId);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const clearAuth = () => {
    setAuth(null);
    setTokens({ accessToken: null, refreshToken: null });
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ auth, tokens, updateAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
