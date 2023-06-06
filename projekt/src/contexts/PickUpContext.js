import React, { useState } from 'react';
import { createContext } from 'react';

export const PickUpContext = createContext();

export const PickUpProvider = ({ children }) => {
  const [pickUp, setPickUp] = useState(null);

  const clearPickUp = () => {
    setPickUp(null);
  };

  return (
    <PickUpContext.Provider value={{ pickUp, setPickUp, clearPickUp }}>
      {children}
    </PickUpContext.Provider>
  );
};
