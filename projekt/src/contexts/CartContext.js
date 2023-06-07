import React, { createContext, useCallback, useState, useMemo } from 'react';

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

  const countTotal = useMemo(() => {
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    return total.toFixed(2);
  }, [cartItems]);

  const emptyCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, emptyCart, removeItem, countTotal}}>
      {children}
    </CartContext.Provider>
  );
};
