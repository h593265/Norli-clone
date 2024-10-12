import React, { createContext, useContext, useEffect, useState } from 'react';
import { config } from '../util/config'; 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTestResult, setAuthTestResult] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {    
        const response = await fetch(`${config.API_URL}/login/protected`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    await fetch( `${config.API_URL}/login/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  };



  return (
    <AuthContext.Provider value={{ user, setUser, logout, authTestResult }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
