import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        {!isCartPage && <Navbar />}
        <main className={`flex-grow container mx-auto px-4 ${isCartPage ? 'p-0' : 'py-8'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>
        {!isCartPage && (
          <footer className="bg-amber-900 text-white py-8 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
            {/* Logo dan Nama */}
            <div className="flex flex-col items-center md:items-start space-y-1">
              <img 
                src="images/logo-project.png" 
                alt="Warkop Khaa" 
                className="h-12 w-auto object-contain" 
                style={{ maxWidth: '120px' }}
              />
              <span className="text-base font-bold text-center md:text-left mt-1">Warkop Khaa</span>
              <p className="text-amber-100 text-xs text-center md:text-left">Kopi Nikmat, Suasana Nyaman</p>
            </div>

            {/* Jam Buka */}
            <div className="text-center md:text-right">
              <h3 className="font-semibold text-amber-300 mb-2">Jam Buka</h3>
              <ul className="space-y-1">
                <li className="flex justify-between space-x-4">
                  <span>Senin - Jumat</span>
                  <span>08:00 - 22:00</span>
                </li>
                <li className="flex justify-between space-x-4">
                  <span>Sabtu - Minggu</span>
                  <span>09:00 - 23:00</span>
                </li>
              </ul>
            </div>

            {/* Kontak */}
            <div className="text-center md:text-right">
              <h3 className="font-semibold text-amber-300 mb-2">Hubungi Kami</h3>
              <div className="space-y-1">
                <div className="flex items-center justify-end">
                  <svg className="w-4 h-4 mr-2 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-right">
                    <p>Jalan Contoh No. 123</p>
                    <p>Kota Anda, 12345</p>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <svg className="w-4 h-4 mr-2 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+62 821 6983 3829</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-4 border-t border-amber-800 text-center text-xs text-amber-200">
            <p>&copy; {new Date().getFullYear()} Warkop Khaa. All rights reserved.</p>
          </div>
        </div>
          </footer>
        )}
      </div>
    </CartProvider>
  );
}

export default App;
