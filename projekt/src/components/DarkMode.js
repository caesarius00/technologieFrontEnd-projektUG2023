import React, { useLayoutEffect, useState, useReducer, useContext, createContext, useCallback } from 'react';
import '../themes.scss';

// Tworzenie kontekstu dla trybu ciemnego
const DarkModeContext = createContext();

// Reducer dla trybu ciemnego
const darkModeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return !state;
    default:
      return state;
  }
};

// Komponent dostarczający kontekstu trybu ciemnego
function DarkModeProvider({ children }) {
  const [isDarkMode, dispatch] = useReducer(darkModeReducer, localStorage.getItem('isDarkMode') === 'true');

  useLayoutEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
    const body = document.querySelector('body');

    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Komponent wykorzystujący tryb ciemny
function DarkMode() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className='right-bottom-button-container'>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Light mode' : 'Dark mode'}
      </button>
    </div>
  );
}

export { DarkModeProvider, DarkMode };
