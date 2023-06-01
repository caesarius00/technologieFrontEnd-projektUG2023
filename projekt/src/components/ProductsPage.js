import React, {useEffect, useContext} from "react";
import ProductsList from "./ProductsList";
import { CartContext } from '../contexts/CartContext';
import TimeCounting from "./TimeCounting";



const ProductsPage = () => {
    return (
        <div>
            
            <button className='big' onClick={() => window.location.href='/summary' }>Podsumowanie zamówienia</button>
            <TimeCounting />
            <ProductsList />
        </div>
    );
    }

export default ProductsPage;
