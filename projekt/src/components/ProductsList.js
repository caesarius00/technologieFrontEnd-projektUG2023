import React, { useState, useContext, useMemo, useRef } from 'react';
import { useProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';
import Categories from './Categories';

const ProductsList = () => {
  const { products } = useProductContext();
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemRefs = useRef([]);

  const handleItemClick = (index) => {
    setIsAnimating((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = true;
      return updatedState;
    });

    setTimeout(() => {
      setIsAnimating((prevState) => {
        const updatedState = [...prevState];
        updatedState[index] = false;
        return updatedState;
      });
    }, 1000);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const toggleDescription = (id) => {
    setVisibleItemId((prevId) => (prevId === id ? null : id));
  };

  // const filteredProducts = useMemo(() => {
  //   const lowerCaseSearchTerm = searchTerm.toLowerCase();
  //   return products.filter((product) =>
  //     product.name.toLowerCase().includes(lowerCaseSearchTerm)
  //   );
  // }, [products, searchTerm]);

  const filteredProducts = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return products.filter((product) => {
      const { name, category } = product;
      return (
        name.toLowerCase().includes(lowerCaseSearchTerm) &&
        (!selectedCategory || category === selectedCategory)
      );
    });
  }, [products, searchTerm, selectedCategory]);


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [isAnimating, setIsAnimating] = useState(
    Array(filteredProducts.length).fill(false)
  );
  const [visibleItemId, setVisibleItemId] = useState(null);

  return (
    <div>
      <Categories selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
      <div className='input-container'>
      <input
        className="input-field"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Szukaj..."
      />
      </div>
      <div className="product-container" >
  {filteredProducts.map((product, number) => (
    <div key={product.id} className={isAnimating[number] ? 'bouncing product-item' : 'product-item'}>
      {product.image === null ? (
        <img></img>
        ) : ( 
        <img className="product-image" src={product.image} alt={product.name}  />

      )}
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      {visibleItemId === product.id && <p>{product.description}</p>}
      <button onClick={() => toggleDescription(product.id)}>
        {visibleItemId === product.id ? 'Hide description' : 'Show description'}
      </button>
      <p>Category: {product.category}</p>
      <button
        ref={(ref) => (itemRefs.current[product] = ref)}
        onClick={() => {
          handleAddToCart(product);
          handleItemClick(number);
        }}
      >
        Dodaj do koszyka
      </button>
    </div>
  ))}
</div>


    

    </div>
  );
};

export default ProductsList;
