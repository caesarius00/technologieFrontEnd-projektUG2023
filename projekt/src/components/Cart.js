import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, emptyCart } = useContext(CartContext);

  return (
    <div>
      <h2>Koszyk</h2>

      {cartItems.length === 0 ? (
        <div>
          <p>Brak produktów w koszyku!</p>
          <Link to="/products">Złóż zamówienie tu</Link>
        </div>
      ) : (
        <div>
        
        <Link to="/products">Wróć do składania zamówienia</Link><br />
        <button onClick={emptyCart}>Wyczyść koszyk</button>
      </div>
      )}

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
