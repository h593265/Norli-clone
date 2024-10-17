import React, { useState, useEffect } from 'react';
import '../style/productpage.css';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/cartcontext';
import { useFavorite } from '../context/favoritecontext';
import Sidebar from '../navbar/navbar-sidebar';
import { ReactComponent as StarIcon } from '../icons/star.svg';
import { ReactComponent as HeartIconFilled } from '../icons/HeartIconFilled.svg';
import { ReactComponent as HeartIconOutline } from '../icons/HeartIconOutline.svg';
import Breadcrumbs from '../components/breadcrumbs';
import ProductListShort from '../list/product-list-short';
import Sideslidemenu from '../components/sideslidemenu';
import { useAuthContext } from '../context/authprovider';
import ErrorPage from './page404';
import { useSidebar } from '../context/sidebarcontext';
import { config } from '../util/config';

function ProductPage({ showpopup }) {
  const product = useLocation();
  
  const { addToCart } = useCart();
  const { userFavorites, guestFavorites, addToFavorite, removeFromFavorite } = useFavorite();
  const { user } = useAuthContext();
  const { sidebarOpen, openSidebar } = useSidebar();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [showMore, setShowMore] = useState(false);
  const [width, setWidth] = useState(0);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        let response;
        const data = product.pathname.split("/");
        const idname = data[data.length - 1];
        response = await fetch(`${config.API_URL}/products/getbytitle?idname=${encodeURIComponent(idname)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // End loading
      }
    };

    setShowMore(false);
    fetchData();
  }, [product]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function checkLiked() {
      if (user) {
        setLiked(userFavorites.some((item) => item.id === data?.id));
      } else {
        setLiked(guestFavorites.some((item) => item.id === data?.id));
      }
    }

    checkLiked();
  }, [guestFavorites, userFavorites, data]);

  const handleBuyButton = () => {
    addToCart(data.id);
    openSidebar("Handlekurv", data);
  };

  const handleFavoriteClick = async (event) => {
    event.stopPropagation();
  
    if (liked) {
      await removeFromFavorite(data.id);
      setLiked(false);
    } else {
      await addToFavorite(data.id);
      setLiked(true);
    }
  };

  const bigLayout = () => (
    <div className="productpage-flex">
      {/* Big layout content */}
    </div>
  );

  const smallLayout = () => (
    <div className="productpage-flex-small">
      {/* Small layout content */}
    </div>
  );

  return (
    <>
      <div>
        {sidebarOpen && <Sidebar content={"Handlekurv"} onClose={openSidebar} />}
      </div>
      <div className='productpage-wrapper'>
        <Breadcrumbs />
        {loading ? (
          <div className="loading-screen">
            <p>Loading...</p>
          </div>
        ) : data ? ( 
          width >= 1050 ? bigLayout() : smallLayout()
        ) : (
          <ErrorPage />
        )}

        <div style={{ color: "black", marginTop: "15%" }}>
          <ProductListShort product="boker" message="Andre kjøpte også:" allowinteractives={true} showpopup={showpopup} />
        </div>
      </div>
    </>
  );
}

export default ProductPage;
