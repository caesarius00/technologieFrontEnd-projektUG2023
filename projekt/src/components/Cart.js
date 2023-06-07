import React, { useContext, useMemo } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import TimeCounting from './TimeCounting';

const Cart = () => {
  const { cartItems, emptyCart, removeItem, countTotal} = useContext(CartContext);

  // use useMemo
  


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
    <TimeCounting />
    
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
          <Link to="/products"><button className='button button-yes'>Złóż zamówienie tu</button></Link>
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
  
  {cartItems.length === 0 ? (
    <div></div>
  ) : (
  <div className="right-button-container">
    <Link to="/pickup">
        <button className='button-yes'>
          Zatwierdź zamówienie
        </button>
      </Link>
      </div>
  )}
  </div>
  );
};

export default Cart;
