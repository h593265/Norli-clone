import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import '../style/cancel.css';

function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="cancel-page">
      <h1>Checkout Canceled</h1>
      <div className="cancel-icon">X</div> 
      <p>You have canceled the checkout process. If you need help, feel free to contact our support team.</p>
      <button onClick={() => navigate('/')}>Return to Shop</button>
      <button onClick={() => navigate('/cart')}>Go to Cart</button>
    </div>
  );
}

export default Cancel;
