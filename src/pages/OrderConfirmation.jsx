import React, { useEffect } from 'react';
import { FaCheckCircle, FaClock, FaMapMarkerAlt, FaStore, FaClipboardList } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  
  // Get the latest order from localStorage
  const latestOrder = JSON.parse(localStorage.getItem('warkopkhaa-orders'))?.[0];
  
  // If there's no order, redirect to home
  useEffect(() => {
    if (!latestOrder) {
      navigate('/');
    }
  }, [latestOrder, navigate]);

  if (!latestOrder) {
    return null;
  }

  const { orderNumber, items, subtotal, tax, total, serviceType, address, notes, orderTime, phone } = latestOrder;
  
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaCheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Diterima!</h1>
          <p className="text-gray-600">Terima kasih telah memesan di Warkop Khaa</p>
          <p className="text-amber-700 font-medium mt-2">No. Pesanan: {orderNumber}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            {serviceType === 'delivery' 
              ? '🛵 Delivery' 
              : serviceType === 'takeaway' 
                ? '🥡 Take Away' 
                : '🍽️ Makan di Tempat'}
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Detail Pesanan</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {formatDate(orderTime || new Date().toISOString())}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaClipboardList className="mr-2" /> Pesanan
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="py-2 flex justify-between">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 ml-2">x{item.quantity}</span>
                        </div>
                        <span>Rp {item.price.toLocaleString('id-ID')}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  {serviceType === 'delivery' ? (
                    <FaMapMarkerAlt className="mr-2" />
                  ) : serviceType === 'takeaway' ? (
                    <FaStore className="mr-2" />
                  ) : (
                    <FaStore className="mr-2" />
                  )}
                  {serviceType === 'delivery' 
                    ? 'Alamat Pengiriman' 
                    : serviceType === 'takeaway' 
                      ? 'Ambil Sendiri' 
                      : 'Makan di Tempat'}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {serviceType === 'delivery' ? (
                    <div>
                      <p>{address}</p>
                      {phone && <p className="mt-1">Telp: {phone}</p>}
                    </div>
                  ) : serviceType === 'dine-in' ? (
                    `Meja: ${latestOrder.tableNumber || '-'}`
                  ) : (
                    'Jl. Contoh No. 123, Kota Bandung (Warkop Khaa)'
                  )}
                </dd>
              </div>
              {notes && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Catatan
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {notes}
                  </dd>
                </div>
              )}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Subtotal
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Rp {subtotal.toLocaleString('id-ID')}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Pajak (10%)
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Rp {tax.toLocaleString('id-ID')}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
                <dt className="text-base font-bold text-gray-900">
                  Total
                </dt>
                <dd className="mt-1 text-base font-bold text-amber-700 sm:mt-0 sm:col-span-2">
                  Rp {total.toLocaleString('id-ID')}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8 p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaClock className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Status Pesanan</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  {serviceType === 'delivery' 
                    ? 'Pesanan Anda sedang diproses. Kurir kami akan segera menuju ke lokasi Anda.'
                    : serviceType === 'takeaway'
                      ? 'Pesanan Anda sedang dipersiapkan. Silakan datang ke lokasi untuk mengambil pesanan.'
                      : 'Pesanan Anda sedang diproses. Silakan menunggu di meja Anda.'}
                </p>
                <p className="mt-2 text-amber-700 font-medium">
                  {serviceType === 'delivery' 
                    ? 'Estimasi pengiriman: 30-45 menit'
                    : serviceType === 'takeaway'
                      ? 'Pesanan akan siap dalam 15-20 menit'
                      : 'Pesanan akan diantar ke meja Anda dalam 15-20 menit'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Pesan Lagi
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
