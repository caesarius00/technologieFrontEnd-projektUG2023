import React, { useLayoutEffect, useState } from 'react';

function DarkMode() {
  const [isWhite, setIsWhite] = useState(true);

  useLayoutEffect(() => {
    const body = document.querySelector('body');
    body.style.backgroundColor = isWhite ? 'white' : '#02072F';
    body.style.color = isWhite ? 'black' : 'white'

    return () => {
      body.style.backgroundColor = '';
    };
  }, [isWhite]);

  const toggleBackground = () => {
    setIsWhite((prevIsWhite) => !prevIsWhite);
  };

  return (
    <div className='right-bottom-button-container'>
      <button onClick={toggleBackground}>
        {isWhite ? 'Dark mode' : 'Light mode'}
      </button>
    </div>
  );
}

export default DarkMode;
