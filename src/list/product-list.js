import React, { useState, useEffect } from 'react';
import '../style/productlist.css';
import Product from '../components/product';
import { filterProducts, filterByDiscount, sortProducts } from '../util/sorting';
import CartPopup from '../components/cartpopup';
import { useCart } from '../context/cartcontext';
import Sidebar from '../navbar/navbar-sidebar';
import { useSidebar } from '../context/sidebarcontext';
import {config} from '../util/config'

function ProductList({ product, allowinteractives, showpopup}) {
  const [filteredData, setFilteredData] = useState([]); 
  const [openSort, setOpenSort] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [sortOption, setSortOption] = useState('Alle');
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize] = useState(20); 
  const [totalProducts, setTotalProducts] = useState(0); 
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { sidebarOpen, openSidebar} = useSidebar();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (product === "Tilbud") {
          response = await fetch(`${config.API_URL}/products/getonsale`);
        }else {
           response = await fetch(`${config.API_URL}/products/getbycategory?category=${encodeURIComponent(product.toLowerCase())}&page=${currentPage}&limit=${pageSize}`);
        }
        

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const jsonData = await response.json();
        const sortedlist = sortProducts(jsonData, sortOption)
        setFilteredData(sortedlist);
        
       
       
        setTotalProducts(100); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [product, currentPage, pageSize, sortOption]);

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
      <div className='productlist-wrapper-complete'>
        <div className="main-interact">
          {width > 1024 && <div className="main-interact-text">{filteredData.length} resultater</div>}
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
          
          {width <= 1024 && <div className="main-interact-text">{filteredData.length} resultater</div>}
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className='productlist-wrapper'>
          {filteredData.length === 0 && !loading && !error && <p>No products found matching your search</p>}
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

export default ProductList;
