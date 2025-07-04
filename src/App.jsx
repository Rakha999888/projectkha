import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === '/cart' || location.pathname === '/order-confirmation';

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        {!hideLayout && <Navbar />}
        <main className={`flex-grow container mx-auto px-4 ${hideLayout ? 'p-0' : 'py-8'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>
        {!hideLayout && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;
