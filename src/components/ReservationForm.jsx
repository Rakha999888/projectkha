import React, { useState } from 'react';
import { FaUser, FaUsers, FaCalendarAlt, FaClock, FaPhone, FaEnvelope } from 'react-icons/fa';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Reservation submitted:', formData);
    alert('Terima kasih! Reservasi Anda telah diterima. Kami akan segera menghubungi Anda untuk konfirmasi.');
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: '2',
      specialRequests: ''
    });
  };

  // Generate time slots from 10:00 to 21:00
  const timeSlots = [];
  for (let hour = 10; hour <= 21; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 21) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-amber-800 mb-6">Reservasi Meja</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="Nama Anda"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="0812-3456-7890"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="email@contoh.com"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Orang <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUsers className="h-5 w-5 text-amber-500" />
              </div>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Lebih dari 10'].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Orang' : 'Orang'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Waktu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaClock className="h-5 w-5 text-amber-500" />
              </div>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                required
              >
                <option value="">Pilih Waktu</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time} WIB</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
            Permintaan Khusus
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows="3"
            value={formData.specialRequests}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="Contoh: Meja dekat jendela, kursi bayi, dll."
          ></textarea>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
          >
            <span>Pesan Sekarang</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          * Wajib diisi. Kami akan mengkonfirmasi reservasi Anda melalui telepon atau email.
        </p>
      </form>
    </div>
  );
};

export default ReservationForm;
