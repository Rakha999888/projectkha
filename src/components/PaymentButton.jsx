import React, { useState } from 'react';
import { FaSpinner, FaShoppingCart } from 'react-icons/fa';

const PaymentButton = ({ item, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    if (!item) {
      alert('Item tidak valid');
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      alert('Pembayaran untuk ' + item.name + ' berhasil diproses (demo mode)');
    }, 1000);
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={`flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className} ${
        isLoading ? 'opacity-75 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin mr-2" />
          Memproses...
        </>
      ) : (
        <>
          <FaShoppingCart className="mr-2" />
          Bayar Sekarang
        </>
      )}
    </button>
  );
};

export default PaymentButton;
