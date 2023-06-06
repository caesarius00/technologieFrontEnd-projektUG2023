import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { PickUpContext } from "../contexts/PickUpContext";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";
import toPdf from "html2pdf.js";
import useReactToPrint from "react-to-print";
import jsPDF from "jspdf";

const Success = () => {
  const { cartItems, emptyCart, removeItem } = useContext(CartContext);
  const { pickUp, setPickUp } = useContext(PickUpContext);

  const componentRef = useRef();

  const handlePrint = () => {
    const input = document.getElementById("print");
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("download.pdf");

    });
  };
  
  return (
    <div>
      <div className="left-button-container">
        <button
          className="button-no"
          onClick={() => (window.location.href = "/")}
        >
          Wróć na stronę główną
        </button>
      </div>
      <div className="container">
        <div className="site-box">
            <button className="button-yes" onClick={handlePrint}>
                Drukuj paragon
            </button>
          <h1 className="title">Dziękujemy za zakupy!</h1>
          <h2 className="subtitle">Twoje zamówienie zostało złożone</h2>
          {/* przewidywany czas oczekiwania */}
            <h3 className="subtitle">
                Przewidywany czas oczekiwania: 
                {pickUp.tableNumber ? (
                    <span>15 minut</span>
                ) : (
                    pickUp.street ? (
                        <span>45 minut</span>
                    ) : (
                    <span>30 minut</span>
                    )
                )}
            </h3>
            <div id="print" ref={componentRef}>
                <h3 className="subtitle">Zamówione produkty:</h3>
                <ul>
                    {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price} zł
                    </li>
                    ))}
                    Suma: {cartItems.reduce((acc, item) => acc + item.price, 0)} zł
                </ul>
            </div>
          <h3 className="subtitle">Szczegóły dostawy:</h3>
          {pickUp.tableNumber ? (
                <p>Numer stolika: {pickUp.tableNumber}</p>
                ) : (
                pickUp.street ? (
                    <>
                    <p>
                        Adres: {pickUp.street} {pickUp.houseNumber}
                        {pickUp.apartmentNumber ? `/${pickUp.apartmentNumber}, ` : ", "}
                        {pickUp.postalCode} {pickUp.city}
                    </p>
                    <p>Numer telefonu: {pickUp.phoneNumber}</p>
                    </>
                ) : (
                    <p>Odbiór przy ladzie. Numer zamówienia:
                        {/* generate unique number */}
                        {Math.floor(Math.random() * 100)}
                         </p>
                )
)}

          <h3 className="subtitle">Szczegóły płatności:</h3>
          <p>Metoda płatności: {pickUp.paymentMethod}</p>
          {pickUp.paymentMethod === "karta" && (
            <>
              <p>Imię i nazwisko na karcie: {pickUp.cardName}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;
