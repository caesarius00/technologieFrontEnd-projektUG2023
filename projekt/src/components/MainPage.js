import React, { useState, useEffect, useContext } from 'react';
import ProductsList from './ProductsList';
import Cart from './Cart';
import DarkMode from './DarkMode';
import { CartContext } from '../contexts/CartContext';

const Page = () => {
  const [isContentVisible, setContentVisible] = useState(false);
  const {emptyCart} = useContext(CartContext);

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       setContentVisible(true);
//     }
//   };

//   const handleMouseClick = () => {
//     setContentVisible(true);
//   };

  useEffect(() => {
    let timeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setContentVisible(false);
        emptyCart();
        // Przeniesienie użytkownika na stronę startową
        window.location.href = '/';
      }, 30000); // Czas bez aktywności w milisekundach (30 sekundy)

      document.addEventListener('mousemove', resetTimeout);
      document.addEventListener('keydown', resetTimeout);
    };

    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousemove', resetTimeout);
      document.removeEventListener('keydown', resetTimeout);
    };
  }, []);

//   const handleButtonClick = () => {
//     setContentVisible(true);
//   };

  return (
    <div>
      {!isContentVisible ? (
        <button onClick={() => setContentVisible(true)}>
          Złóż zamówienie
        </button>
      ) : (
        <div>
            <DarkMode />
            <ProductsList />
        </div>
      )}
    </div>
  );
}

export default Page;