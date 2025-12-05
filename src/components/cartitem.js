import { useEffect, useState } from 'react';
import { ReactComponent as DeleteIcon } from '../icons/delete.svg';

function CartItem({ item, removeFromCart, decrementCartItem, incrementCartItem }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

       
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <><div className='shoppingcart-products'>
            <div className="shoppingcart-basket">
                <div>
                <div className="shoppingcart-image"><img src={item.image_url} alt={item.title} /></div>
                {windowWidth < 1024 && (<div style={{width:"18vh"}}>
                    <div className='shoppingcart-products-interactive-flex2'>
                        <button className="cart-button" onClick={() => decrementCartItem(item.id)}>
                            {item.quantity > 1 ? '-' : <DeleteIcon />}
                        </button>
                        <div>{item.quantity}</div>
                        <button className="cart-button" onClick={() => incrementCartItem(item.id)}>+</button>
                    </div> 
                </div>)} </div>
                <div className='shoppingcart-products-text'>
                    <div className="shoppingcart-title">{item.title}</div>
                    <div className="shoppingcart-status">lagerstatus</div>

                    {windowWidth < 1250 && (
                        <div className='shoppingcart-products-price'>{item.price},-</div>
                    )}
                </div>
            </div>

            {windowWidth >= 1024 && (
                <div className='shoppingcart-products-interactive-flex'>
                    <div className='shoppingcart-products-interactive-flex2'>
                        <button className="cart-button" onClick={() => decrementCartItem(item.id)}>
                            {item.quantity > 1 ? '-' : <DeleteIcon />}
                        </button>
                        <div>{item.quantity}</div>
                        <button className="cart-button" onClick={() => incrementCartItem(item.id)}>+</button>
                    </div>

                    {windowWidth >= 1250 && (
                        <div className='shoppingcart-products-price'>{item.price},-</div>
                    )}
                </div>
            )}


        </div>
               </>
    );
}

export default CartItem;