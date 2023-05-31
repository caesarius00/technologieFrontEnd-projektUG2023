import logo from './logo.svg';
import './App.css';
import ProductList from './components/ProductsList';
import {ProductProvider} from './contexts/ProductContext';
import Cart from './components/Cart';
import {CartProvider} from './contexts/CartContext';

function App() {
  return (
    <div className="App">
    <CartProvider>
      <ProductProvider>
        <ProductList />
        <Cart />
      </ProductProvider>
    </CartProvider>
    </div>
  );
}

export default App;
