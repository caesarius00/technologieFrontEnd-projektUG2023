import './App.css';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DarkMode from './components/DarkMode';
import Cart from './components/Cart';
import ProductsList from './components/ProductsList';

const Home = () => (
  <div>
    <Link class to="/summary">Podsumowanie zamówienia</Link>
    <DarkMode />
    <MainPage />
</div>
);

const Products = () => (
  <div>
    <Link class to="/summary">Podsumowanie zamówienia</Link>
    <DarkMode />
    <ProductsList />
  </div>
);

const Summary = () => (
  <div>
    <DarkMode />
    <Cart />
  </div>
);

const NotFound = () => (
  <div>
    <DarkMode />
    <h1>404 - Nie znaleziono strony</h1>
    <Link to="/">Wróć do strony głównej</Link>
  </div>
);

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <Router>
          <div className="App">
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
