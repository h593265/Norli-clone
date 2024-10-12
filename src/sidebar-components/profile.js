import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authprovider';
import { useSidebar } from '../context/sidebarcontext';

function Profile({ setClose }) {
  const { user, logout } = useAuthContext();
  const { closeSidebar } = useSidebar();
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    
    const fetchPurchaseHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/payment/purchases?userid=${user.id}`);
        const data = await response.json();
        
        setPurchaseHistory(data["purchases"]);
       
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    if (user) {
      fetchPurchaseHistory();
    }
  }, [user]);
 
  return (
    <div className="stores-wrapper">
      <div className='stores-head-flex'>
      <div style={{float:"left", flex:"2"}}></div>
      <div style={{margin:"auto", flex:"2"}}>Profil</div> 
      <button onClick={() => { logout(); closeSidebar(); }} className='purchase-logout'>Logg ut</button>
      </div>
      <p>Velkommen, {user?.email}</p>
      

      <div style={{ height: "10px" }}></div>

      <h3>Tidligere kjøp</h3>
      {purchaseHistory.length > 0 ? (
        <div className='purchasehistory-wrapper'><ul>
          {purchaseHistory.map((purchase) => (
            <li key={purchase.id}>
              {purchase.product_title} - {purchase.quantity}  x {purchase.product_price},- {new Date(purchase.purchase_date).toLocaleDateString()}
            </li>
          ))}
        </ul>
        
        </div>
      ) : (
        <p>Ingen tidligere kjøp...</p>
      )}
      
    </div>
  );
}

export default Profile;
