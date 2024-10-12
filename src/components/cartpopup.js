import React from 'react';
import '../style/cartpopup.css';

function CartPopup({ onClose, onConfirm, onDecline, product }) {
  return (
    <div className="cart-popup-overlay">
      <div className="cart-popup">
        <h2>Legg til i handlekurven</h2>
        {product && (
          <div>
            <p>{product.name}</p>
            <p>Pris: {product.price} kr</p>
          </div>
        )}
        <div className="cart-popup-actions">
          <button onClick={onConfirm}>Bekreft</button>
          <button onClick={onDecline}>Avbryt</button>
        </div>
        <button className="cart-popup-close" onClick={onClose}>Lukk</button>
      </div>
    </div>
  );
}

export default CartPopup;
