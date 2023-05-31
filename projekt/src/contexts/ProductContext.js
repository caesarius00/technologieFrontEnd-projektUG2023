import React, {useContext, createContext, useEffect} from 'react';
import ProductData from '../data/product-data.json';

const ProductContext = React.createContext();

const ProductProvider = ({children}) => {
    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await ProductData;
                setProducts(productsData);
            }
            catch (error) {
                console.error("Błąd podczas wczytywania menu",error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    );
};

const useProductContext = () => useContext(ProductContext);

export {ProductProvider, useProductContext,};

