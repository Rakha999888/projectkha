import React, { useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaWhatsapp, FaUtensils } from 'react-icons/fa';
import ReservationForm from '../components/ReservationForm';

const Contact = () => {
  const reservationRef = useRef(null);

  useEffect(() => {
    // Check if URL has #reservation hash and scroll to it
    if (window.location.hash === '#reservasi') {
      setTimeout(() => {
        reservationRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Hubungi Kami</h1>
          <p className="text-lg text-amber-800 max-w-3xl mx-auto">
            Kami siap melayani Anda dengan sepenuh hati. Jangan ragu untuk menghubungi kami melalui berbagai cara di bawah ini.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Reservation Section */}
          <div ref={reservationRef} id="reservasi" className="lg:sticky lg:top-8">
            <ReservationForm />
          </div>

          {/* Right Column - Contact Info and Map */}
          <div className="space-y-8">
            {/* Contact Information Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-amber-800 mb-6">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Alamat</h3>
                    <p className="mt-1 text-gray-600">
                      Jl. Contoh No. 123, Kelurahan Contoh,<br />
                      Kecamatan Contoh, Kota Contoh, 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <FaPhone className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Telepon</h3>
                    <p className="mt-1 text-gray-600">0821-6983-3829 (Rakha)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <FaEnvelope className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">info@warkopkhaa.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <FaClock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Jam Operasional</h3>
                    <p className="mt-1 text-gray-600">
                      Senin - Minggu: 07.00 - 22.00 WIB
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Ikuti Kami</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-amber-600 hover:text-amber-800">
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-amber-600 hover:text-amber-800">
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a href="https://wa.me/628216983829" className="text-amber-600 hover:text-amber-800">
                    <span className="sr-only">WhatsApp</span>
                    <FaWhatsapp className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-amber-800 mb-6">Lokasi Kami</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.81956108466736!3d-6.194741893798295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5392f4033d1%3A0x1b2e3d4d5c6d7e8f!2sContoh%20Alamat!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Peta Lokasi Warkop Khaa"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
