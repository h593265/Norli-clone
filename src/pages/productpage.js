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
import {config} from '../util/config'
function ProductPage({showpopup}) {
  const  product  = useLocation();
  
  const { addToCart } = useCart();
  const { userFavorites, guestFavorites,  addToFavorite, removeFromFavorite} = useFavorite();
  const { user } = useAuthContext();
  const { sidebarOpen, openSidebar} = useSidebar();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [width, setWidth] = useState(0);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 

      try {
        let response;
        const pathParts = product.pathname.split("/");
        const productId = pathParts[pathParts.length - 1];
        console.log('Fetching product with id:', productId);
        response = await fetch(`${config.API_URL}/products/getbyid?id=${encodeURIComponent(productId)}`);
        
        if (!response.ok) {
          console.error('Response not OK:', response.status, response.statusText);
          throw new Error('Failed to fetch products');
        }
        
        const jsonData = await response.json();
        console.log('Product data received:', jsonData);
        
        if (!jsonData || (Array.isArray(jsonData) && jsonData.length === 0)) {
          console.error('No product found for id:', productId);
          setData(null);
        } else {
          setData(jsonData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setData(null);
      } finally {
        setLoading(false); 
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
      
      if(user) {
       
        setLiked(userFavorites.some((item) => item.id === data?.id))
      } else{
        
        setLiked(guestFavorites.some((item) => item.id === data?.id))
       
      }
      
    }

    

    checkLiked()
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
      <div className="productpage-image-container">
        <img src={data.image_url} alt={data.title} />
      </div>
      <div className="productpage-text-section">
        <div className="productpage-title">{data.title}</div>
        <div className="productpage-author">{data.author}</div>
        {data.description && data.category.split("/")[0] === "boker" ? (<div
          className={
            showMore
              ? 'productpage-description-showmore'
              : 'productpage-description-showless'
          }
        >
          {data.description }
          <div className={showMore ? 'showmore' : 'showless'}>
           
          </div>
        
        </div>) : (data.description) }
        {
          data.category.split("/")[0] === "boker"&&
          <div className="showmore-text" onClick={() => setShowMore(!showMore)}>
             {showMore ? 'Vis mindre' : 'Vis mer'}
            </div>}
        <div className='productpage-info-section'>
        <div className='productpage-product-info'>Produktegenskaper <div className='productpage-arrow'>&#62;</div></div>
        <div className='productpage-product-info'>Kundeanmeldelser <div className='productpage-arrow'>&#62;</div></div>
        <div className='productpage-product-info'>Frakt og levering <div className='productpage-arrow'>&#62;</div></div>
      </div>
      </div>
      <div className="productpage-interactive-section">
        <div className="productpage-interactive-section-container">
          <div className="productpage-interactive-stars-flex">
            <div className="productpage-favorite" onClick={handleFavoriteClick}>
              {liked ? (
                <HeartIconFilled style={{stroke:"red", fill:"red"}} />
              ) : (
                <HeartIconOutline  />
              )}
            </div>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          <div className="productpage-price">{data.price},-</div>
          <button className="productpage-buybutton" onClick={handleBuyButton}>
            Legg i handlekurven
          </button>
          <div className="productpage-interactive-medal">
            <div className="circle-green"></div>På nettlager. Sendes innen 1-2
            virkedager
          </div>
          <div className="productpage-interactive-medal">
            <div className="circle-green"></div>Gratis frakt på ordre fra 299,-
          </div>
          <div className="productpage-interactive-medal">
            <div className="circle-green"></div>Bytt i 200 butikker
          </div>
          <div style={{ height: '10px' }}></div>
          <button className="productpage-buybutton" onClick={() => {}}>
            Klikk og hent
          </button>
          <div className="productpage-interactive-medal">
            <div className="circle-green"></div>På lager i 110 butikker
          </div>
        </div>
      </div>
    </div>
  );

  const smallLayout = () => (
    <div className="productpage-flex-small">
      <div className="productpage-image-container">
        <img src={data.image_url} alt={data.title} />
      </div>
      <div className="productpage-title">{data.title}</div>
      <div className="productpage-author">{data.author}</div>
      <div style={{ height: '40px' }}></div>
      <div className="productpage-interactive-section" style={{ width: '111%' }}>
        <div className="productpage-interactive-section-container">
          <div className="productpage-interactive-stars-flex">
            <div className="productpage-favorite" onClick={handleFavoriteClick}>
            {liked ? (
                <HeartIconFilled style={{stroke:"red", fill:"red"}} />
              ) : (
                <HeartIconOutline  />
              )}
            </div>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          <div className="productpage-price">{data.price},-</div>
          <button className="productpage-buybutton" onClick={handleBuyButton}>
            Legg i handlekurven
          </button>
          <div className="productpage-interactive-medal">
            <div className="circle-green"></div>På nettlager. Sendes innen 1-2
            virkedager
          </div>
          <div className="productpage-interactive-medal">
            <div className="circle-green"></div>Gratis frakt på ordre fra 299,-
          </div>
          <div className="productpage-interactive-medal">
            <div className="circle-green"></div>Bytt i 200 butikker
          </div>
          <div style={{ height: '10px' }}></div>
          <button className="productpage-buybutton" onClick={() => {}}>
            Klikk og hent
          </button>
          <div className="productpage-interactive-medal">
            <div className="circle-green"></div>På lager i 110 butikker
          </div>
        </div>
      </div>
      <div style={{ height: '40px' }}></div>
      {data.description && data.category.split("/")[0] === "boker" ? (<div
          className={
            showMore
              ? 'productpage-description-showmore'
              : 'productpage-description-showless'
          }
        >
          {data.description }
          <div className={showMore ? 'showmore' : 'showless'}>
           
          </div>
        
        </div>) : (data.description) }

        {
          data.category.split("/")[0] === "boker"&&
          <div className="showmore-text" onClick={() => setShowMore(!showMore)}>
             {showMore ? 'Vis mindre' : 'Vis mer'}
            </div>}
      
      <div className='productpage-info-section'>
        <div className='productpage-product-info'>Produktegenskaper <div className='productpage-arrow'>&#62;</div></div>
        <div className='productpage-product-info'>Kundeanmeldelser <div className='productpage-arrow'>&#62;</div></div>
        <div className='productpage-product-info'>Frakt og levering <div className='productpage-arrow'>&#62;</div></div>
      </div>
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
