import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../util/localstorage';
import { useAuthContext } from '../context/authprovider';
import { config } from '../util/config'; 
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [userCart, setUserCart] = useState([]);
    const [guestCart, setGuestCart] = useState([]);

    useEffect(() => {
        if (user) {
            fetchUserCart();
        } else {
            const savedGuestCart = getLocalStorage('guestCart', []);
            setGuestCart(savedGuestCart);
        }
    }, [user]);

    const fetchUserCart = async () => {
        try {
            const response = await fetch(`${config.API_URL}/user/cart/${user.id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const cartItems = await response.json();
            setUserCart(cartItems);
        } catch (error) {
            console.error('Failed to fetch user cart:', error.message);
        }
    };

    const fetchProductById = async (productId) => {
      const response = await fetch(`${config.API_URL}/products/getbyid/${parseInt(productId, 10)}`);
        const product = await response.json();
        return product;
    };

    const updateGuestLocalStorage = (updatedCart) => {
        if (!user) {
            setLocalStorage('guestCart', updatedCart);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (user) {
            try {
                const response = await fetch(`${config.API_URL}/user/cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user.id, productId: parseInt(productId, 10), quantity }),
                    credentials: 'include',
                });
                const result = await response.json();

                const existingItem = userCart.find(item => item.id === productId);
                let updatedCart;
                if (existingItem) {
                    updatedCart = userCart.map(item =>
                        item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
                    );
                } else {
                    const product = await fetchProductById(productId);
                    updatedCart = [...userCart, { ...product, quantity }];
                }
                setUserCart(updatedCart);
            } catch (error) {
                console.error('Failed to add to cart:', error.message);
            }
        } else {
            const existingItem = guestCart.find(item => item.id === productId);
            let updatedCart;
            if (existingItem) {
                updatedCart = guestCart.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                const product = await fetchProductById(productId);
                updatedCart = [...guestCart, { ...product, quantity }];
            }
            setGuestCart(updatedCart);
            updateGuestLocalStorage(updatedCart);
        }
    };

    const removeFromCart = async (productId) => {
        if (user) {
            try {
                const updatedCart = userCart.filter(item => item.id !== productId);
                setUserCart(updatedCart);

                await fetch(`${config.API_URL}/user/cart`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user.id, productId }),
                    credentials: 'include',
                });
            } catch (error) {
                console.error('Failed to remove from cart:', error.message);
            }
        } else {
            const updatedCart = guestCart.filter(item => item.id !== productId);
            setGuestCart(updatedCart);
            updateGuestLocalStorage(updatedCart);
        }
    };

    const incrementCartItem = async (productId) => {
      if (user) {
          try {
              const existingItem = userCart.find(item => item.id === productId);
              if (existingItem) {
                  await addToCart(productId, existingItem.quantity + 1);
                  const updatedCart = userCart.map(item =>
                      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                  );
                  setUserCart(updatedCart);
              } else {
                  const product = await fetchProductById(productId);
                  await addToCart(productId, 1);
                  const updatedCart = [...userCart, { ...product, quantity: 1 }];
                  setUserCart(updatedCart);
              }
          } catch (error) {
              console.error('Error incrementing cart item:', error.message);
          }
      } else {
          const existingItem = guestCart.find(item => item.id === productId);
          if (existingItem) {
              const updatedCart = guestCart.map(item =>
                  item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
              );
              setGuestCart(updatedCart);
              updateGuestLocalStorage(updatedCart);
          } else {
              try {
                  const product = await fetchProductById(productId);
                  const updatedCart = [...guestCart, { ...product, quantity: 1 }];
                  setGuestCart(updatedCart);
                  updateGuestLocalStorage(updatedCart);
              } catch (error) {
                  console.error('Error fetching product:', error.message);
              }
          }
      }
  };
  

  const decrementCartItem = async (productId) => {
    if (user) {
        try {
            const existingItem = userCart.find(item => item.id === productId);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    
                    const response = await fetch(`${config.API_URL}/user/cart`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: user.id, productId, quantity: existingItem.quantity - 1 }),
                        credentials: 'include',
                    });

                    if (response.ok) {
                        
                        const updatedCart = userCart.map(item =>
                            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                        );
                        setUserCart(updatedCart);
                    } else {
                        console.error('Failed to update item quantity in the backend.');
                    }
                } else {
                    
                    const response = await fetch(`${config.API_URL}/user/cart`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: user.id, productId }),
                        credentials: 'include',
                    });

                    if (response.ok) {
                        
                        const updatedCart = userCart.filter(item => item.id !== productId);
                        setUserCart(updatedCart);
                    } else {
                        console.error('Failed to remove item from the backend.');
                    }
                }
            }
        } catch (error) {
            console.error('Error decrementing cart item:', error.message);
        }
    } else {
        const existingItem = guestCart.find(item => item.id === productId);
        if (existingItem) {
            if (existingItem.quantity > 1) {
                
                const updatedCart = guestCart.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
                setGuestCart(updatedCart);
                updateGuestLocalStorage(updatedCart);
            } else {
               
                const updatedCart = guestCart.filter(item => item.id !== productId);
                setGuestCart(updatedCart);
                updateGuestLocalStorage(updatedCart);
            }
        }
    }
};



    return (
        <CartContext.Provider
            value={{ cart: user ? userCart : guestCart, addToCart, removeFromCart, incrementCartItem, decrementCartItem }}
        >
            {children}
        </CartContext.Provider>
    );
};
