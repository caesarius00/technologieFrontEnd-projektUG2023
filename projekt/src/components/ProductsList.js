import React, { useState, useContext, useMemo } from 'react';
import { useProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';

const ProductsList = () => {
  const { products } = useProductContext();
  const [visibleDescriptionId, setVisibleDescriptionId] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const toggleDescription = (id) => {
    if (visibleDescriptionId === id) {
      setVisibleDescriptionId(null);
    } else {
      setVisibleDescriptionId(id);
    }
  };

  const filteredProducts = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return products.filter((product) => {
      const { name } = product;

      return (
        name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }, [products, searchTerm]);


  return (
    <div>
        
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Szukaj..."
      />
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <img className="product-image" src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          {visibleDescriptionId === product.id && <p>{product.description}</p>}
          <button onClick={() => toggleDescription(product.id)}>
            {visibleDescriptionId === product.id ? 'Hide description' : 'Show description'}
          </button>
          <p>Category: {product.category}</p>

          <button onClick={() => handleAddToCart(product)}>Dodaj do koszyka</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
