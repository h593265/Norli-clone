import React, { useEffect } from 'react';
import '../style/shoppingcart.css';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/cartitem';
import { useCart } from '../context/cartcontext';
import Breadcrumbs from '../components/breadcrumbs';
import ProductListShort from '../list/product-list-short';
import {loadStripe} from "@stripe/stripe-js"
import { useAuthContext } from '../context/authprovider';
import { useMain } from '../context/maincontext';
import { config } from '../util/config'; 

function ShoppingCart({showpopup}) {
  const { cart, removeFromCart, incrementCartItem, decrementCartItem } = useCart();
  const { user} = useAuthContext();
  const navigate = useNavigate();
  const {setMainProp} = useMain();
  useEffect(() => {
    setMainProp('cart');
  }, [setMainProp]);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  async function makePayment ()  {

    const stripe = await loadStripe("pk_test_51PikrLRoAat1huuYqiOY8zXtphwjoCmuxvjf1BvFSKHNvNBaelpXmaQjBBCP6dyHYdyZx2ROsrj6fKsBENqzu8o500cfDbn6RT")

    const body = {
      products: cart,
      userid: user?.id
    }

    const headers = {
      "Content-Type":"application/json"
    }

    const response = await fetch(`${config.API_URL}/payment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Payment Error:", error);
      return;
    }

    if (session.id) {
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.log(result.error);
      }
    } else {
      console.error("Session ID is missing.");
    }

    if(result.error) {
      console.log(result.error)
    }
  }


  return (
    <div  className="shoppingcart-wrapper-complete">
      {cart.length > 0 ? (
        <div className="shoppingcart-wrapper">
          <Breadcrumbs />
         
          <div className="shoppingcart-wrapper-container">
            <div className="shoppingcart-products-container-wrapper">
              <div className="shoppingcart-products-container">
                {cart.map((item) => (
                  <div className="product" key={item.id}>
                    <CartItem
                      item={item}
                      removeFromCart={removeFromCart}
                      incrementCartItem={incrementCartItem}
                      decrementCartItem={decrementCartItem}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="shoppingcart-container2-wrapper">
              <div className="shoppingcart-container2">
                <div className="shoppingcart-buy-header">Kjøp på nett</div>
                <div className="shoppingcart-buy-sheet-container">
                  <div className="shoppingcart-buy-sheet-flex">
                    <div>Produkter x {totalQuantity}</div>
                    <div>{totalPrice.toFixed(2)},-</div>
                  </div>

                  <div className="shoppingcart-buy-sheet-flex">
                    <div className="shoppingcart-buy-sheet-total">Totalt</div>
                    <div className="shoppingcart-buy-sheet-total">
                      {totalPrice.toFixed(2)},-
                    </div>
                  </div>
                </div>

                <div className="productpage-info-section">
                  <div className="productpage-product-info">
                    Rabattkode <div className="productpage-arrow">+</div>
                  </div>
                  <div className="productpage-product-info">
                    Gavekort <div className="productpage-arrow">+</div>
                  </div>
                </div>
                <div className="shoppingcart-buy-button-flex">
                  <button >Betal med vipps</button>
                  <button onClick = {makePayment}>Betal med kort</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="shoppingcart-empty">
          <div className="shoppingcart-empty-container-flex">
            <div className="shoppingcart-empty-h1">Handlekurven er tom...</div>
            <div className="shoppingcart-empty-h2">Sjekk ut utvalget vårt!</div>
            <button className="shoppingcart-empty-button" onClick={() => navigate('/')}>
              Fortsett å handle
            </button>
          </div>
        </div>
      )}
      <div
        style={{
          color: 'black',
          fontSize: '30px',
          fontWeight: '500',
          width: '80%',
          display: 'flex',
          margin: '40px auto',
          justifyContent: 'center',
        }}
      >
        Sjekk noen av våre andre produkter under
        
      </div>
      <div style={{ color: 'black', maxWidth: '1800px', margin: 'auto', width:"85%"}}>
        <ProductListShort product="tilbud" message="Produkter på tilbud" allowinteractives={true} showpopup={showpopup}/>
      </div>
      
    </div>
  );
}

export default ShoppingCart;
