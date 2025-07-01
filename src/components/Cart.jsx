import React, { useState } from 'react';
import { useMenu } from '../contexts/MenuContext';

const Cart = () => {
  const {
    cart,
    tableNumber,
    setTableNumber,
    customerName,
    setCustomerName,
    totalPrice,
    removeFromCart,
    updateQuantity,
    createOrder,
    processPayment,
    clearCart,
  } = useMenu();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      // Create order first
      const order = await createOrder();
      setOrderId(order.data._id);
      
      // Process payment
      const payment = await processPayment(paymentMethod, order.data._id);
      setPaymentStatus(payment.status);
      
      // If payment is successful, clear the cart
      if (payment.status === 'completed') {
        clearCart();
      }
      
      // Redirect to payment URL if available (for non-cash payments)
      if (payment.paymentUrl) {
        window.location.href = payment.paymentUrl;
      }
      
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Terjadi kesalahan saat memproses pembayaran');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Keranjang Belanja</h3>
        <p className="text-gray-500">Keranjang belanja kosong</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Keranjang Belanja</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-600">
                Rp {item.price.toLocaleString('id-ID')} x {item.quantity}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between font-medium mb-4">
          <span>Total:</span>
          <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
        </div>

        {!isCheckingOut ? (
          <button
            onClick={() => setIsCheckingOut(true)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Checkout
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Meja
              </label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Contoh: A1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Pelanggan
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Nama Anda"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metode Pembayaran
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="cash">Tunai</option>
                <option value="transfer">Transfer Bank</option>
                <option value="e-wallet">E-Wallet</option>
              </select>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setIsCheckingOut(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                disabled={isProcessing}
              >
                Batal
              </button>
              <button
                onClick={handleCheckout}
                disabled={isProcessing || !tableNumber || !customerName}
                className={`flex-1 py-2 px-4 rounded-md transition ${
                  isProcessing || !tableNumber || !customerName
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
