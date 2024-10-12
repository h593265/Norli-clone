import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/success.css'; 
import { ReactComponent as CheckIcon } from '../icons/check.svg';


function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1>Thank You for Your Purchase!</h1>
      <p >Your order has been successfully processed.</p>
      <p>You will receive an email confirmation shortly.</p>
      <div className="success-icon"><CheckIcon style={{fill:"white"}}/></div> 
      <button onClick={() => navigate('/')} >Continue Shopping</button>
    </div>
  );
}

export default Success;
