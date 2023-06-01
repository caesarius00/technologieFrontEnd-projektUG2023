import React, { useState, useEffect, useContext } from 'react';
import ProductsList from './ProductsList';
import Cart from './Cart';
import DarkMode from './DarkMode';
import { CartContext } from '../contexts/CartContext';

const Page = () => {
//   const [isContentVisible, setContentVisible] = useState(false);
  const {emptyCart} = useContext(CartContext);
//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       setContentVisible(true);
//     }
//   };

//   const handleMouseClick = () => {
//     setContentVisible(true);
//   };

//   const handleButtonClick = () => {
//     setContentVisible(true);
//   };

  return (
    <div>
        <button onClick={() => window.location.href='/products' }> Złóż zamówienie </button>
    </div>
  );
}

export default Page;