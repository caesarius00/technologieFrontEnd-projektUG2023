import React, { useMemo } from 'react';
import { useProductContext } from '../contexts/ProductContext';

const Categories = ({ selectedCategory, onCategorySelect }) => {
    const { products } = useProductContext();
  
    // Pobieranie unikalnych kategorii z produktów
    const categories = useMemo(() => {
      const uniqueCategories = new Set();
      products.forEach((product) => {
        uniqueCategories.add(product.category);
      });
      return Array.from(uniqueCategories);
    }, [products]);
  
    return (
      <div className="categories">
        <h3>Kategorie</h3>
        <ul>
            <li
              key="all"
              className={selectedCategory === null ? 'active' : ''}
              onClick={() => onCategorySelect(null)}
            >
              Wszystkie produkty
            </li>
          {categories.map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default Categories;