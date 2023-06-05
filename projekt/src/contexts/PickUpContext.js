import React, { useState } from 'react';
import { createContext } from 'react';

export const PickUpContext = createContext();

export const PickUpProvider = ({ children }) => {
  const [pickUp, setPickUp] = useState(null);

  return (
    <PickUpContext.Provider value={{ pickUp, setPickUp }}>
      {children}
    </PickUpContext.Provider>
  );
};
