import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../style/product.css';
import { calculateDiscountedPrice } from '../util/utils';
import { ReactComponent as HeartIcon } from '../icons/HeartIconOutline.svg';
import { ReactComponent as CartIcon } from '../icons/cart.svg';
import { useFavorite } from '../context/favoritecontext';
import { useCart } from '../context/cartcontext';
import { useSidebar } from '../context/sidebarcontext';
import Cartpopup from './cartpopup';
import Sidebar from '../navbar/navbar-sidebar';
import { useAuthContext } from '../context/authprovider';

function Product({ product, allowinteractives, showpopup, showCartpopup }) { 
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const { addToFavorite, removeFromFavorite, guestFavorites, userFavorites } = useFavorite();
  const {user} = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

 
  useEffect(() => {
    if (user) {
      
      if (userFavorites) {
        const isFavorite = userFavorites.some(el => el.id === product.id);
        setLiked(isFavorite);
      }
    } else {
      
      if (guestFavorites) {
        const isFavorite = guestFavorites.some(el => el.id === product.id);
        setLiked(isFavorite);
      }
    }
  }, [guestFavorites, userFavorites, user, product.id]);

  const openProductPage = () => {
    // Navigate to product page with category and ID
    // ProductPage component will fetch the data using the ID
    navigate(`/${product.category}/${product.id}`);
  };

  const handleHeartClick = (event) => {
    event.stopPropagation();
    if (liked) {
      showpopup(true, false)
      removeFromFavorite(product.id);
    } else {
      showpopup(true, true)
      addToFavorite(product.id);
    }
    setLiked(!liked);
  };

  const handleCartClick = (event) => {
    event.stopPropagation();
    showCartpopup();
  };

  const openSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div>
        {sidebarOpen && <Sidebar content={"Handlekurv"} onClose={openSidebar} />}
      </div>
      <div className='product-card-wrapper'>
        <div className='product-card-container'>
          <div className='product-card-image-wrapper' onClick={openProductPage}>
            {product.discount && (
              <div className='product-image-section-saletag'>
                <div>Salg</div>
              </div>
            )}
            <div
              className='product-card-image-container'
              style={{ backgroundImage: `url(${product.image_url})` }}
            ></div>

            {allowinteractives && (
              <div className='product-card-interactive'>
                <div className='interactive-left' onClick={handleHeartClick} aria-label="Add to Favorites">
                  {liked ? (
                    <HeartIcon style={{ fill: 'red',  transition: 'ease 1s', stroke:"none" }} />
                  ) : (
                    <HeartIcon />
                  )}
                </div>
                <div className='interactive-right-wrapper'>
                  <div className='interactive-right' onClick={handleCartClick} aria-label="Add to Cart">
                    <CartIcon />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='product-text-section' onClick={openProductPage}>
          <div className='product-text-section-divider'>
            <div className='product-author'>{product.author}</div>
            <div className='product-title'>{product.title}</div>
          </div>
          <div className='product-price'>
            {product.discount ? (
              <div className='product-price-discount-flex'>
                <div className='product-price-discount'>
                  {calculateDiscountedPrice(product.price, product.discount)},-
                </div>
                <div className='product-price-original'>{product.price},-</div>
              </div>
            ) : (
              <div>{product.price},-</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
