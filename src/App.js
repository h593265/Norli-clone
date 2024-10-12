import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Main from './pages/main';
import Navbar from './navbar/navbar';
import Home from './pages/home';
import ProductPage from './pages/productpage';
import ShoppingCart from './pages/shopping-cart';
import { CartProvider } from './context/cartcontext';
import { FavoriteProvider } from './context/favoritecontext';
import SearchResults from './pages/search';
import "react-multi-carousel/lib/styles.css";
import Favoritepopup from './components/favoritepopup';
import Cancel from './pages/cancel';
import Success from './pages/success';
import { SidebarProvider } from './context/sidebarcontext';
import { AuthProvider } from './context/authprovider';
import { MainProvider } from './context/maincontext'; 
import { useState,useEffect } from 'react';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(true);

  useEffect(() => {
    if (showPopup) {
      
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  

  const handleShowPopup = (status, action) => {
    setShowPopup(status);
    setPopupAction(action);
  };

  return (
    <header className="App-header" style={{position:"relative", paddingBottom:"15%"}} >
      <AuthProvider>
        <CartProvider>
          <SidebarProvider>
            <FavoriteProvider>
              <MainProvider> 
                <Router>
                  <Navbar />
                  <Routes>
                    <Route exact path="/" element={<Home showpopup={handleShowPopup} />} />
                    <Route exact path="/search/:searchValue" element={<SearchResults showpopup={handleShowPopup}/>} />
                    <Route exact path="/:category" element={<Main showpopup={handleShowPopup} />} />
                    <Route exact path="/:category1/:category2" element={<Main showpopup={handleShowPopup} />} />
                    <Route exact path="/:category1/:category2/:productname" element={<ProductPage showpopup={handleShowPopup}/>} />
                    <Route exact path="cart" element={<ShoppingCart showpopup={handleShowPopup}/>} />
                    <Route exact path="cancel" element={<Cancel />} />
                    <Route exact path="success" element={<Success />} />
                    <Route path="/*" element={<Home />} />
                  </Routes>
                </Router>
              </MainProvider>
            </FavoriteProvider>
          </SidebarProvider>
        </CartProvider>
      </AuthProvider>
      <div className='footer'><Footer /></div>
      {showPopup && <Favoritepopup action={popupAction} />}
    </header>
  );
}

export default App;
