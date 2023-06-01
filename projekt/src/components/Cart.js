import React, { useContext, useMemo } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, emptyCart, removeItem} = useContext(CartContext);

  // use useMemo
  const countTotal = useMemo(() => {
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    return total.toFixed(2);
  }, [cartItems]);


  return (
    <div>

      {cartItems.length === 0 ? (
        <div>
        <h2>Koszyk</h2>
          <p>Brak produktów w koszyku!</p>
          <Link to="/products">Złóż zamówienie tu</Link>
        </div>
      ) : (
        <div>
        
        <Link to="/products">Wróć do składania zamówienia</Link><br />
      <h2>Koszyk ({cartItems.length})</h2>
      <p>Suma: {countTotal} zł</p>
        <button onClick={emptyCart}>Wyczyść koszyk</button>
      </div>
      )}

      <ul>
        {cartItems.map((item, number) => (
          <li key={number}>
            {item.name} - {item.price} zł - {item.quantity} szt.
            <button onClick={() => removeItem(number)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
