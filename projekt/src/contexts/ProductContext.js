import React, {useContext, useEffect} from 'react';
import ProductData from '../data/product-data.json';
import axios from 'axios';

const ProductContext = React.createContext();

const ProductProvider = ({children}) => {
    const [products, setProducts] = React.useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const productsData = await ProductData;
    //             setProducts(productsData);
    //         }
    //         catch (error) {
    //             console.error("Błąd podczas wczytywania menu",error);
    //         }
    //     };
    //     fetchProducts();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/products/');
            setProducts(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    );
};

const useProductContext = () => useContext(ProductContext);

export {ProductProvider, useProductContext,};

