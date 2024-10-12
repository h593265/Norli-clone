import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/navbar.css';
import Dropdown from './navbar-pulldown';
import Sidebar from './navbar-sidebar';
import { ReactComponent as LocationIcon } from '../icons/location.svg';
import { ReactComponent as HeartIcon } from '../icons/HeartIconOutline.svg';
import { ReactComponent as PersonIcon } from '../icons/person.svg';
import { ReactComponent as CartIcon } from '../icons/cart.svg';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as MenuIcon } from '../icons/menu.svg';
import { useCart } from '../context/cartcontext';
import { useFavorite } from '../context/favoritecontext';
import { useAuthContext } from '../context/authprovider';
import { useSidebar } from '../context/sidebarcontext';
import { useMain } from '../context/maincontext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();  
  const { guestFavorites, userFavorites } = useFavorite();
  const { cart = [] } = useCart();
  const { user } = useAuthContext();
  const { mainProp, setMainProp } = useMain();
  const { sidebarOpen, sidebarContent, openSidebar, closeSidebar } = useSidebar();

  const cartAmount = cart.reduce((totalQuantity, currentItem) => totalQuantity + parseFloat(currentItem.quantity || 0), 0);
  const favoriteCount = user ? userFavorites?.length : guestFavorites?.length;

  const [isActive, setIsActive] = useState(false);
  const [currentActive, setCurrentActive] = useState(null);
  const [data, setData] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [searchValue, setSearchValue] = useState('');
  const previousPageRef = useRef('/');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/product-desc.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const filter = jsonData.filter(item => item.main);
        setData(filter);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (user) {
      closeSidebar();
    }
  }, [user]);

  useEffect(() => {
    if (!sidebarOpen) {
      setCurrentActive(null);
    }
  }, [sidebarOpen]);

  
  useEffect(() => {
    
    if(location.pathname.split("/")[1] !== "search" && searchValue.length > 0) setSearchValue('');
    
  }, [location.pathname]);

  const handleMouseEnter = (element) => {
    setIsActive(true);
    setCurrentActive(element);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setCurrentActive(null);
  };

  const handleLinkClick = (category) => {
    setIsActive(false);
    if (category === 'norli') {
      setMainProp('');
      navigate('/');
    } else if (category === 'Tilbud') {
      setMainProp(category);
      navigate(`/${category}`, { state: category });
    } else {
      setMainProp(category);
      navigate(`/${category}`, { state: category });
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim()) {
      previousPageRef.current = window.location.pathname;
      navigate(`/search/${encodeURIComponent(value.trim())}`);
    } else {
      navigate("/");
    }
  };

  const handleOpenSidebar = (element) => {
    if (sidebarOpen && sidebarContent === element) {
      closeSidebar();
    } else {
      openSidebar(element, data, 0, setMainProp);
    }
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div onClick={() => handleLinkClick('norli')} className="navbar-left">Norli</div>
        {width > 768 &&
          <div className="navbar-search-flex">
            <SearchIcon />
            <input
              className="navbar-search"
              placeholder='Søk etter produkter...'
              onChange={handleSearchChange}
              value={searchValue}
            />
          </div>
        }
        <div className="navbar-right">
          <div onClick={() => handleOpenSidebar('Finn butikk')} className="nav-img">
            <LocationIcon className="nav-img" />
            <div className="nav-img-text">Butikker</div>
          </div>
          <div onClick={() => handleOpenSidebar('Favoritter')} className="nav-img">
            <HeartIcon />
            <div className="nav-img-text">Favoritter</div>
            {favoriteCount > 0 && <div className='favorite-counter'>{favoriteCount}</div>}
          </div>
          {user ? (
            <div className="nav-img" onClick={() => handleOpenSidebar('Profile')}>
              <PersonIcon />
              <div className="nav-img-text">Profil</div>
            </div>
          ) : (
            <div onClick={() => handleOpenSidebar('Logg inn')} className="nav-img">
              <PersonIcon />
              <div className="nav-img-text">Logg inn</div>
            </div>
          )}
          <div onClick={() => navigate('/cart')} className="nav-img">
            <CartIcon />
            <div className="nav-img-text">Handlekurv</div>
            {cartAmount > 0 && <div className='cart-counter'>{cartAmount}</div>}
          </div>
          {width <= 1050 &&
            <div onClick={() => handleOpenSidebar('Hamburger')} className="nav-img">
              <MenuIcon />
              <div className="nav-img-text">Meny</div>
            </div>
          }
        </div>
      </div>

      {width <= 768 &&
        <div className="navbar-search-flex-mobile">
          <SearchIcon />
          <input
            className="navbar-search"
            placeholder='Søk etter produkter...'
            onChange={handleSearchChange}
            value={searchValue}
          />
        </div>
      }

      

      <div className="sub-navbar-container">
        {data && data.map((item, index) => (
          <div key={index} style={{position:"relative"}}>
            <div 
              
              className="sub-navbar-buttons"
              onClick={() => handleLinkClick((item.title.toLowerCase()))}
              id={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
            >
              {item.alttitle ? item.alttitle : item.title}
            </div>
            {isActive && currentActive === item.id && (
              <Dropdown prop={item} onClose={handleMouseLeave} onclick={handleLinkClick} />
            )}
          </div>
        ))}
      </div>
      {typeof setMainProp === "function" && (
        <Sidebar setMainProp={setMainProp} />
      )}
    </div>
  );
}

export default Navbar;
