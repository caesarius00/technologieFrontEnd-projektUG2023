import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { PickUpContext } from "../contexts/PickUpContext";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";
import toPdf from "html2pdf.js";
import useReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import 'bootstrap/dist/css/bootstrap.css'
import TimeCounting from "./TimeCounting";

const Success = () => {
  const { cartItems, emptyCart, removeItem, countTotal} = useContext(CartContext);
  const { pickUp, setPickUp } = useContext(PickUpContext);

  const componentRef = useRef();

  const handlePrint = () => {
    const input = document.getElementById("print");
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        pdf.save("receipt.pdf");
    });
  };
  
  return (
    <div>
        <TimeCounting />
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
                <ul className="paragonowa-czcionka d-flex flex-column">
                    {cartItems.map((item) => (
                    <li className="text-custom2 w-100 d-flex justify-content-between" key={item.id}>
                        <span>{item.name}</span> <span>{item.price} zł</span>
                    </li>
                    ))}
                    <strong className="text-custom w-90 text-end">Suma: {countTotal} zł</strong>
                </ul>
            </div>
          <h3 className="subtitle">Szczegóły dostawy:</h3>
          {pickUp.tableNumber ? (
                <span>Numer stolika: {pickUp.tableNumber}</span>
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
            <p>Metoda płatności: <strong>{pickUp.paymentMethod}</strong></p>
            {pickUp.paymentMethod === "karta" && (
                <>
                <p>Imię i nazwisko na karcie: {pickUp.cardName}</p>
                </>
            )}
            
            <button className="button-yes" onClick={handlePrint}>
                Drukuj paragon
            </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
