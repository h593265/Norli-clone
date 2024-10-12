import React, { useState, useEffect } from 'react';
import '../style/productlist.css';
import Product from '../components/product';
import { filterProducts, sortProducts } from '../util/sorting';
import CartPopup from '../components/cartpopup';
import { useCart } from '../context/cartcontext';
import Sidebar from '../navbar/navbar-sidebar';
import { useParams } from 'react-router-dom';
import { useSidebar } from '../context/sidebarcontext';
function ProductListSearch({ products, allowinteractives , showpopup}) {
 
  const [openSort, setOpenSort] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [sortOption, setSortOption] = useState('Alle');
  const [filteredData, setFilteredData] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { sidebarOpen, openSidebar} = useSidebar();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    
      

    
    const sortedProducts = sortProducts(products, sortOption); 
    setFilteredData(sortedProducts)
  

   
    
  }, [sortOption, products]);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setOpenSort(false); 
  };

  const handleShowCartPopup = (item) => {
    setSelectedProduct(item); 
    setShowCartPopup(true); 
  };

  const handleCloseCartPopup = () => {
    setShowCartPopup(false);
  };

  const handleCartAccept = () => {
    if (selectedProduct) {
      addToCart(selectedProduct.id);
      setShowCartPopup(false);
      openSidebar("Handlekurv", selectedProduct);
    }
  };

  const handleCartDecline = () => {
    setShowCartPopup(false); 
  };

  return (
    <>
      {sidebarOpen && <Sidebar content={"Handlekurv"} onClose={openSidebar} />}
      <div className='productlist-wrapper-complete' style={{fontSize:"25px", width:"85%", margin:"auto", color:"black"}}>
        <div className="main-interact" >
        
          {width > 1024 && <div className="main-interact-text" style={{}}>{products.length} resultater</div>}
          <div className='main-interact-btn' onClick={() => setOpenSort(!openSort)}>
            <img src='../down-arrow.png' alt="Sort icon" />
            Sortering
            {openSort && (
              <div className='sorting-wrapper'>
                <div className='sorting'>
                  <div onClick={() => handleSortOptionClick('Alle')}>Alle</div>
                  <div onClick={() => handleSortOptionClick('Pris lav-høy')}>Pris lav-høy</div>
                  <div onClick={() => handleSortOptionClick('Pris høy-lav')}>Pris høy-lav</div>
                  <div className='sorting-last' onClick={() => handleSortOptionClick('Nyheter')}>Nyheter</div>
                </div>
              </div>
            )}
          </div>
          
          {width <= 1024 && <div className="main-interact-text">{products.length} resultater</div>}
        </div>

     

        <div className='productlist-wrapper'>
          
          {filteredData.map((item) => (
            <div className='productlist-product' key={item.id}>
               <Product product={item} allowinteractives={allowinteractives} 
              showCartpopup={() => handleShowCartPopup(item)} 
              showpopup={showpopup}
              />
            </div>
          ))}
        </div>

        <div className='productlist-endscroller-flex'>
          <div className='productlist-endscroller-centered-flex'>
          <div className='productlist-endscroller-centered-bubble'>1</div>
          <div className='productlist-endscroller-centered-bubble'>2</div>
            <div className='productlist-endscroller-centered-bubble'>3</div>
            <div className='productlist-endscroller-centered-bubble'>4</div>
            <div className='productlist-endscroller-centered-bubble'>5</div>
          </div>
        </div>

        {showCartPopup && (
          <CartPopup
            onClose={handleCloseCartPopup}
            onConfirm={handleCartAccept}
            onDecline={handleCartDecline}
            product={selectedProduct}
          />
        )}
      </div>
    </>
  );
}

export default ProductListSearch;
