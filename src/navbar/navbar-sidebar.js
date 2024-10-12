import React, { useRef, useEffect, useState} from 'react';
import { useSidebar } from '../context/sidebarcontext';
import '../style/sidebar.css';
import Stores from '../sidebar-components/stores';
import Favorites from '../sidebar-components/favorites';
import Login from '../sidebar-components/login';
import Cart from '../sidebar-components/cart';
import HamburgerMenu from '../components/hamburgermenu';
import Profile from '../sidebar-components/profile';

function Sidebar({ setMainProp }) {
  const sidebarRef = useRef(null);
  const { sidebarOpen, sidebarContent, closeSidebar } = useSidebar();
 
  useEffect(() => {
    if (!sidebarOpen) return;

    const html = document.getElementsByTagName('html')[0];
    html.style.overflow = "hidden";
    document.body.style.width = "99.15%";

    return () => {
      html.style.overflow = "visible";
      document.body.style.width = "100%";
    };

  }, [sidebarOpen]);



  if (!sidebarOpen) return null;


 

  const renderContent = () => {
    
    switch (sidebarContent) {
      case 'Finn butikk':
        return <Stores setClose={closeSidebar} />;
      case 'Favoritter':
        return <Favorites setClose={closeSidebar} />;
      case 'Logg inn':
        return <Login setClose={closeSidebar} />;
      case 'Handlekurv':
        return <Cart setClose={closeSidebar} />;
      case 'Profile':
        return <Profile setClose={closeSidebar} />;
      case 'Hamburger':
        
        return <HamburgerMenu  setMainProp={setMainProp} /> ;
       
      case 'product':
        return <Profile setClose={closeSidebar} />;
      default:
        return null;
    }

  };

  return (
    <>
      <div className="overlay" onClick={closeSidebar}></div>
      <div className="sidebar" ref={sidebarRef}>
        <div className='sidebar-flex'>
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
