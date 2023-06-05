import './App.css';
import './App.scss';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DarkMode from './components/DarkMode';
import Cart from './components/Cart';
import ProductsList from './components/ProductsList';
import ProductsPage from './components/ProductsPage';
import PickUp from './components/PickUp';

const Home = () => (
  <div>
    <DarkMode />
    <MainPage />
</div>
);

const Products = () => (
  <div>
    <DarkMode />
    <ProductsPage />
  </div>
);

const Summary = () => (
  <div>
    <DarkMode />
    <Cart />
  </div>
);

const PickUpSite = () => (
  <div>
    <DarkMode />
    <PickUp />
  </div>
);

const NotFound = () => (
<div className="container">
<div className="site-box">
<DarkMode />

  <h1 className="title">404 - Nie znaleziono strony</h1>
  <Link to="/">Wróć do strony głównej</Link>

</div>
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
            <Route path="/pickup" element={<PickUpSite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
