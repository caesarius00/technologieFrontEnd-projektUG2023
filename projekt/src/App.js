import './App.css';
import ProductList from './components/ProductsList';
import {ProductProvider} from './contexts/ProductContext';
import Cart from './components/Cart';
import {CartProvider} from './contexts/CartContext';
import DarkMode from './components/DarkMode';

function App() {
  return (
    <div className="App">
    <DarkMode />
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
