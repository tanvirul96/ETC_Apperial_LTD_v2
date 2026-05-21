import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAndSyncProfile = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          // Sync profile details with live database on load
          const response = await api.get('/auth/me');
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('role', response.data.role);
        } catch (err) {
          console.error('Error syncing profile, terminating session:', err);
          logout();
        }
      }
      setLoading(false);
    };
    verifyAndSyncProfile();
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
    localStorage.setItem('role', userData.role);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const syncUserLocal = (updatedUser) => {
    const currentLocalUser = JSON.parse(localStorage.getItem('user')) || {};
    const mergedUser = { ...currentLocalUser, ...updatedUser };
    setUser(mergedUser);
    localStorage.setItem('user', JSON.stringify(mergedUser));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAdmin, syncUserLocal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
