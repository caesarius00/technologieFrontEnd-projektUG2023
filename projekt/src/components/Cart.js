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

    
  //   <div className="container">
  //   <div className="site-box">
  //     <h1 className="title">MacDonut</h1>
  //     <button className="button" onClick={() => (window.location.href = '/products')}>
  //       Złóż zamówienie
  //     </button>
  //   </div>
  // </div>

  <div>
    
    <div className="left-button-container">
        <button className='button-no' onClick={() => (window.location.href='/')}>
          Anuluj zamówienie
        </button>
      </div>
    <div className="container">
    <div className="site-box">
 {console.log(cartItems)} 
      {cartItems.length === 0 ? (
        <div>
        <h1 className='title'>Koszyk</h1>
          <p>Brak produktów w koszyku!</p>
          <Link to="/products"><button className='button-yes'>Złóż zamówienie tu</button></Link>
        </div>
      ) : (
        <div>
        <br/>
        <Link to="/products"><button>Wróć do składania zamówienia</button></Link><br />
      <h1 className='title'>Koszyk ({cartItems.length})</h1>
      <p>Suma: {countTotal} zł</p>
        {/* <button  className='button' onClick={emptyCart}>Wyczyść koszyk</button> */}
        
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
  </div>
  
  <div className="right-button-container">
        <button className='button-yes' onClick={() => (window.location.href='/')}>
          Zatwierdź zamówienie
        </button>
      </div>
  </div>
  );
};

export default Cart;
