import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <h2>Koszyk</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.price} zł - {item.quantity} szt.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
