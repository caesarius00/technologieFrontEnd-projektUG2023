import React, {useEffect, useContext} from "react";
import ProductsList from "./ProductsList";
import { CartContext } from '../contexts/CartContext';
import TimeCounting from "./TimeCounting";
import { Link } from 'react-router-dom';


const ProductsPage = () => {
    return (
        <div>
            <Link id="order-summary-button" to="/summary"> <button> Przejdź do<br/>podsumowania</button></Link>
            <TimeCounting />
            <ProductsList />
        </div>
    );
    }

export default ProductsPage;
