import React, { createContext, useContext, useState } from 'react';


const SidebarContext = createContext();


export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState(null);
  const [data, setData] = useState(null);

  const openSidebar = (content, data) => {
    setSidebarContent(content);
    setData(data)
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
   
    setSidebarOpen(false);
    setSidebarContent(null);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, sidebarContent, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
