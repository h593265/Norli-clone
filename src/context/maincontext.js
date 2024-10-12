import React, { createContext, useContext, useState, useEffect } from 'react';

const MainContext = createContext();

export function MainProvider({ children }) {
  const [mainProp, setMainProp] = useState(() => {
    
    return localStorage.getItem('mainProp') || '';
  });

  useEffect(() => {
    
    if (mainProp) {
      localStorage.setItem('mainProp', mainProp);
    }
  }, [mainProp]);

  return (
    <MainContext.Provider value={{ mainProp, setMainProp }}>
      {children}
    </MainContext.Provider>
  );
}

export function useMain() {
  return useContext(MainContext);
}
