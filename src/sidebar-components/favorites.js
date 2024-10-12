import { useEffect, useState } from 'react';
import '../style/sidebar-components.css';
import { useFavorite } from '../context/favoritecontext';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authprovider';

function Favorites({ setClose }) {
  const { user } = useAuthContext(); 
  const { userFavorites, guestFavorites, removeFromFavorite } = useFavorite();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    if (user) {
      setFavorites(userFavorites);
    } else {
      setFavorites(guestFavorites);
    }
  }, [user, userFavorites, guestFavorites]);

  const openProductPage = (item) => {
    const formattedTitle = item.title.replace(/ /g, '-').toLowerCase();
    setClose(true);
    navigate(`/${item.category}/${formattedTitle}`, { state: item });
  };

  return (
    <div className="stores-wrapper">
      <div className='stores-head-flex'>
        <div className='stores-dummy'></div>
        <div className='stores-head' style={{ paddingBottom: "50px" }}>Favoritter</div>
        <div className='sidebar-exit' onClick={() => { setClose(true) }}>X</div>
      </div>

      <div className='favorite-list'>
        {favorites.length > 0 ? (
          <div className='favorite-list-wrapper'>
            {favorites.map((item, index) => (
              <div className='favorite-list-product' key={index}>
                <div className='favorite-list-product-image-container' onClick={() => openProductPage(item)}>
                  <div className="favorite-list-product-img" style={{ backgroundImage: `url(${item.image})` }}> </div>
                </div>
                <div className='product-author' style={{ marginTop: "10%" }}>{item.author}</div>
                <div className='product-title'>{item.title}</div>
                <div className='product-price' style={{ padding: "20px 0px" }}>{item.price},-</div>
                <div className='favorite-remove-link' style={{ padding: "20px 0px", color: "black" }} onClick={() => removeFromFavorite(item.id)}>Fjern fra favoritter</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: "15px", height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            Favorittliste tom...
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
