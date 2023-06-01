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
 {console.log(cartItems)} 
      {cartItems.length === 0 ? (
        <div>
        <h2>Koszyk</h2>
          <p>Brak produktów w koszyku!</p>
          <Link to="/products"><button>Złóż zamówienie tu</button></Link>
        </div>
      ) : (
        <div>
        
        <Link to="/products"><button>Wróć do składania zamówienia</button></Link><br />
      <h2>Koszyk ({cartItems.length})</h2>
      <p>Suma: {countTotal} zł</p>
        <button onClick={emptyCart}>Wyczyść koszyk</button>
      </div>
      )}

      <ul>
        {cartItems.map((item, number) => (
          <li key={number}>
            {item.name} - {item.price} zł
            <button onClick={() => removeItem(number)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
