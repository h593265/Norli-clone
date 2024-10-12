import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../util/localstorage';
import { useAuthContext } from '../context/authprovider';
import { config } from '../util/config'; 
const FavoriteContext = createContext();

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const { user, checkAuth} = useAuthContext();
  const [userFavorites, setUserFavorites] = useState([]);
  const [guestFavorites, setGuestFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
         
          const response = await fetch(`${config.API_URL}/user/favorites/${user.id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (Array.isArray(data)) {  
            setUserFavorites(data);  
          } else {
            console.error('Invalid data format:', data);
          }
        } catch (err) {
          console.error('Failed to fetch user favorites:', err.message);
        }
      } else {
        const savedFavorites = getLocalStorage('guestFavorites', []);
        setGuestFavorites(savedFavorites);
      }
    };
  
    fetchFavorites();
  }, [user]);
  

  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`${config.API_URL}/products/getbyid/${productId}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const product = await response.json();
      return product;
    } catch (error) {
      console.error('Error fetching product by ID:', error.message);
      return null;
    }
  };

  const updateGuestLocalStorage = (updatedFavorites) => {
    if (!user) {
      setLocalStorage('guestFavorites', updatedFavorites);
    }
  };

  const addToFavorite = async (productId) => {
    if (user) {
      const isAlreadyFavorite = userFavorites.some(product => product.id === productId);
      if (!isAlreadyFavorite) {
        try {
          await fetch(`${config.API_URL}/user/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ userId: user.id, productId }),
          });
          const product = await fetchProductById(productId);
          if (product) setUserFavorites(prevFavorites => [...prevFavorites, product]);
        } catch (err) {
          console.error('Failed to add to favorites:', err);
        }
      }
    } else {
      const isAlreadyFavorite = guestFavorites.some(product => product.id === productId);
      if (!isAlreadyFavorite) {
        const product = await fetchProductById(productId);
        if (product) {
          const updatedFavorites = [...guestFavorites, product];
          setGuestFavorites(updatedFavorites);
          updateGuestLocalStorage(updatedFavorites);
        }
      }
    }
  };

  const removeFromFavorite = async (productId) => {
    if (user) {
      const updatedFavorites = userFavorites.filter(product => product.id !== productId);
      setUserFavorites(updatedFavorites);
      try {
        await fetch(`${config.API_URL}/user/favorites`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ userId: user.id, productId }),
        });
      } catch (err) {
        console.error('Failed to remove from favorites:', err);
      }
    } else {
      const updatedFavorites = guestFavorites.filter(product => product.id !== productId);
      setGuestFavorites(updatedFavorites);
      updateGuestLocalStorage(updatedFavorites);
    }
  };

  return (
    <FavoriteContext.Provider value={{ userFavorites, guestFavorites, addToFavorite, removeFromFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
