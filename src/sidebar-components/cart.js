
import { useEffect, useState } from 'react';
import '../style/cart.css';
import '../style/sidebar-components.css';
import { ReactComponent as CheckIcon } from '../icons/check.svg'; 

function Cart({setClose}) {

 
  
  return (

    <>
    
    <div className='greenie'><CheckIcon/></div>
    
    <div className="cart-wrapper">

      <div className='cart-head-flex'>
        
        <div className='sidebar-exit' onClick={() => setClose(true)}>X</div>

      </div>


      <div className="cart-container-wrapper">


        <div className='cart-img-container'><img src='/shopping-cart.png' /></div>

        <div className='cart-header'>Produktet ble lagt til i handlekurven!</div>

      </div>


    </div></>
  );
}

export default Cart;
