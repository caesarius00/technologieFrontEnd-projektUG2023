import './App.css';
import './App.scss';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import { PickUpProvider } from './contexts/PickUpContext';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {DarkMode, DarkModeProvider} from './components/DarkMode';
import Cart from './components/Cart';
import ProductsList from './components/ProductsList';
import ProductsPage from './components/ProductsPage';
import PickUp from './components/PickUp';
import Payment from './components/Payment';
import Success from './components/Success';

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

const PaymentSite = () => (
  <div>
    <DarkMode />
    <Payment />
  </div>
);

const SuccessSite = () => (
  <div>
    <DarkMode />
    <Success />
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
    <DarkModeProvider>
  <PickUpProvider>
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
            <Route path="/payment" element={<PaymentSite />} />
            <Route path="/success" element={<SuccessSite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ProductProvider>
    </CartProvider>
  </PickUpProvider>
</DarkModeProvider>
  );
}

export default App;
