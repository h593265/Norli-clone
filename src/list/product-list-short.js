import React, { useState, useEffect } from 'react';
import '../style/productlistshort.css';
import Product from '../components/product';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from 'react-router-dom';
import CartPopup from '../components/cartpopup';
import Sidebar from '../navbar/navbar-sidebar';
import { useCart } from '../context/cartcontext';
import { useSidebar } from '../context/sidebarcontext';
import { useMain } from '../context/maincontext';
import {config} from '../util/config'

function ProductListShort({ product, message, allowinteractives, showpopup}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const { sidebarOpen, openSidebar} = useSidebar();
  const { setMainProp} = useMain();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        
        if (product === "tilbud") {
          response = await fetch(`${config.API_URL}/products/getonsale`);
        } else {
          response = await fetch(`${config.API_URL}/products/getbycategory?category=${encodeURIComponent(product.toLowerCase())}`);
        }
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [product]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isUnderLaptopSize = windowWidth < 1024;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  const handleShowCartPopup = (item) => {
    setSelectedProduct(item);
    setShowCartPopup(true);
  };

  const handleCartAccept = () => {
    if (selectedProduct) {
      addToCart(selectedProduct.id);
      setShowCartPopup(false);
      openSidebar("Handlekurv", selectedProduct);
      
    }
  };

  const handleCloseCartPopup = () => {
    setShowCartPopup(false);
  };

  const handleCartDecline = () => {
    setShowCartPopup(false);
  };

 

  return (
    <>
      {sidebarOpen && <Sidebar content={"Handlekurv"} onClose={openSidebar} />}
      <div className='lol'>
        <div className='productlist-header'>
          {message}
          <div className='productlist-header-btn' onClick={() => {navigate("/" + product); setMainProp(product);}}>Se alle</div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <Carousel arrows={!isUnderLaptopSize} responsive={responsive} containerClass="carousel-container" infinite={true} swipeable={true}>
          {data.map((item, index) => (
            <div key={index} className="carousel-item">
              <Product key={item.id} product={item} allowinteractives={allowinteractives} 
              showCartpopup={() => handleShowCartPopup(item)}
              showpopup={showpopup} />
            </div>
          ))}
        </Carousel>

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

export default ProductListShort;
