import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartItemCount,
    subtotal,
    tax,
    total
  } = useCart();

  const [serviceType, setServiceType] = useState('dine-in'); // 'dine-in', 'takeaway', 'delivery'
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    tableNumber: '',
    address: '',
    phone: '',
    notes: ''
  });
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    // Validasi berdasarkan jenis layanan
    if (!customerInfo.name) {
      alert('Mohon isi nama Anda terlebih dahulu');
      return;
    }
    
    if (serviceType === 'dine-in' && !customerInfo.tableNumber) {
      alert('Mohon isi nomor meja terlebih dahulu');
      return;
    }
    
    if (serviceType === 'delivery' && !customerInfo.address) {
      alert('Mohon isi alamat pengiriman terlebih dahulu');
      return;
    }
    
    if (serviceType === 'delivery' && !customerInfo.phone) {
      alert('Mohon isi nomor telepon terlebih dahulu');
      return;
    }

    try {
      setIsCheckingOut(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate order number
      const newOrderNumber = `ORD-${Date.now()}`;
      setOrderNumber(newOrderNumber);
      
      // Save order to localStorage or send to backend
      const order = {
        orderNumber: newOrderNumber,
        customerName: customerInfo.name,
        serviceType,
        tableNumber: serviceType === 'dine-in' ? customerInfo.tableNumber : null,
        address: serviceType === 'delivery' ? customerInfo.address : null,
        phone: customerInfo.phone || null,
        items: cart,
        subtotal,
        tax,
        total,
        status: 'pending',
        orderTime: new Date().toISOString(),
        notes: customerInfo.notes
      };

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('warkopkhaa-orders') || '[]');
      localStorage.setItem('warkopkhaa-orders', JSON.stringify([...existingOrders, order]));
      
      // Clear cart
      clearCart();
      
      // Redirect to order confirmation
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: newOrderNumber,
          customerName: customerInfo.name,
          serviceType,
          tableNumber: customerInfo.tableNumber,
          address: customerInfo.address,
          phone: customerInfo.phone,
          notes: customerInfo.notes,
          items: cart,
          subtotal,
          tax,
          total,
          orderTime: new Date().toISOString()
        } 
      });

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Terjadi kesalahan saat memproses pesanan');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kosong</h1>
            <p className="text-gray-600 mb-6">Sepertinya Anda belum menambahkan apapun ke keranjang</p>
            <button 
              onClick={() => navigate('/menu')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Lihat Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-amber-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800 ml-4">Keranjang Belanja</h1>
        </div>
      </div>
      
      <main className="flex-grow py-4">
        <div className="container mx-auto px-4">
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Pesanan Anda</h2>
                </div>
                
                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 flex items-start">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="font-medium text-gray-900">
                            Rp {item.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.description?.substring(0, 60)}...</p>
                        
                        <div className="mt-3">
                          <div className="flex items-center border rounded-lg overflow-hidden w-fit">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 border-t">
                  <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Kosongkan Keranjang
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Ringkasan Pesanan</h2>
                
                <form onSubmit={handleCheckout} className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Layanan</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setServiceType('dine-in')}
                        className={`p-2 text-sm rounded-lg border-2 ${serviceType === 'dine-in' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 hover:border-amber-300'}`}
                      >
                        <div className="text-center">
                          <div className="text-lg">🍽️</div>
                          <div>Makan di Tempat</div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setServiceType('takeaway')}
                        className={`p-2 text-sm rounded-lg border-2 ${serviceType === 'takeaway' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 hover:border-amber-300'}`}
                      >
                        <div className="text-center">
                          <div className="text-lg">🥡</div>
                          <div>Take Away</div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setServiceType('delivery')}
                        className={`p-2 text-sm rounded-lg border-2 ${serviceType === 'delivery' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 hover:border-amber-300'}`}
                      >
                        <div className="text-center">
                          <div className="text-lg">🛵</div>
                          <div>Delivery</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItemCount} item{cartItemCount > 1 ? 's' : ''})</span>
                    <span className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">PPN (10%)</span>
                    <span className="font-medium">Rp {tax.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-amber-600">Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Pemesan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Nama lengkap Anda"
                      required
                    />
                  </div>

                  {serviceType === 'dine-in' && (
                    <div>
                      <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Nomor Meja <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="tableNumber"
                        name="tableNumber"
                        value={customerInfo.tableNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Contoh: A1, B2, dll"
                        required
                      />
                    </div>
                  )}

                  {serviceType === 'delivery' && (
                    <>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Alamat Pengiriman <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={customerInfo.address}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Alamat lengkap pengiriman"
                          required
                        ></textarea>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Nomor Telepon <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Contoh: 081234567890"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder={serviceType === 'delivery' ? 'Contoh: Jangan berdering, taruh di depan pintu' : 'Contoh: Pedas, Tanpa Bawang, dll'}
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isCheckingOut}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white ${isCheckingOut ? 'bg-amber-400' : 'bg-amber-600 hover:bg-amber-700'} transition-colors`}
                  >
                    {isCheckingOut ? 'Memproses...' : 'Pesan Sekarang'}
                  </button>
                </form>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan yang berlaku
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
