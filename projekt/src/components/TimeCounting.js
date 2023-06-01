import React, {useState, useRef, useEffect, useContext} from "react";
import { CartContext } from '../contexts/CartContext';

const TimeCounting = () => {
    const {emptyCart} = useContext(CartContext);

    const goHome = () => {
        window.location.href = "/";
        };

//#region TimeCounting-popup
const [isPopupVisible, setIsPopupVisible] = useState(false);
const [remainingTime, setRemainingTime] = useState(10);
const timerRef = useRef(null);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
          setRemainingTime(prevTime => {
            if (prevTime === 0) {
              clearInterval(timerRef.current);
              goHome();
            }
            return prevTime - 1;
          });
        }, 1000); // Co 1 sekundę
      };
    
      const resetTimer = () => {
        clearInterval(timerRef.current);
        setRemainingTime(15); // Resetowanie czasu
        startTimer();
      };
    
      useEffect(() => {
        if (isPopupVisible) {
          startTimer();
        } else {
          clearInterval(timerRef.current);
        }
    
        return () => {
          clearInterval(timerRef.current);
        };
      }, [isPopupVisible]);

//#endregion

//#region TimeCounting2-main
      useEffect(() => {
        let timeoutId;
    
        const resetTimeout = () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setIsPopupVisible(true);
            // Przeniesienie użytkownika na stronę startową
          }, 30000); // Czas bez aktywności w milisekundach (30 sekundy)
    
          document.addEventListener('mousemove', resetTimeout);
          document.addEventListener('keydown', resetTimeout);
            document.addEventListener('click', resetTimeout);
            document.addEventListener('scroll', resetTimeout);
            document.addEventListener('wheel', resetTimeout);
            document.addEventListener('touchmove', resetTimeout);

        };
    
        resetTimeout();
        
    return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousemove', resetTimeout);
        document.removeEventListener('keydown', resetTimeout);
        document.removeEventListener('click', resetTimeout);
        document.removeEventListener('scroll', resetTimeout);
        document.removeEventListener('wheel', resetTimeout);
        document.removeEventListener('touchmove', resetTimeout);
      };
    }, []);

//#endregion

    const handleButtonClick = () => {
        setIsPopupVisible(false);
        resetTimer();
        };

    return (
        <div>
            {isPopupVisible && (
        <div>         
                <div id="time-popup" class="modal">
                <h1>Uwaga!</h1>
                <p>Twoje zamówienie zostanie anulowane za {remainingTime} sekund.</p>
                <button onClick={() => handleButtonClick() }>JESTEM</button>  
              </div>
              
              <div class="overlay"></div>
                    
        </div>    
        )}
        </div>

    );
};

export default TimeCounting;