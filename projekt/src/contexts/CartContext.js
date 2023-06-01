import React, { createContext, useCallback, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const removeItem = useCallback((number) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(number, 1);
      return newItems;
    });
  }, []);


  const emptyCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, emptyCart, removeItem}}>
      {children}
    </CartContext.Provider>
  );
};
