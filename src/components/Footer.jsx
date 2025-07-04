import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tentang Kami */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-amber-500">Warkop</span>
              <span className="text-white">Khaa</span>
            </h3>
            <p className="mb-3 text-sm">Menghadirkan kopi berkualitas terbaik dengan suasana yang nyaman.</p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>

          {/* Jam Buka */}
          <div className="mb-8">
            <h4 className="text-base font-semibold text-white mb-3">Jam Operasional</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <FaClock className="text-amber-500 mr-2" />
                Senin - Jumat: 07.00 - 22.00 WIB
              </li>
              <li className="flex items-center">
                <FaClock className="text-amber-500 mr-2" />
                Sabtu - Minggu: 08.00 - 23.00 WIB
              </li>
              <li className="mt-4 text-sm text-gray-400">
                *Jam operasional dapat berubah pada hari libur nasional
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="mb-8">
            <h4 className="text-base font-semibold text-white mb-3">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                <span>Jl. Contoh No. 123, Kec. Contoh, Kota Bandung, Jawa Barat 40123</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-amber-500 mr-2" />
                <a href="tel:+6281234567890" className="hover:text-amber-400 transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-amber-500 mr-2" />
                <a href="mailto:info@warkopkhaa.com" className="hover:text-amber-400 transition-colors">
                  info@warkopkhaa.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mb-8">
            <h4 className="text-base font-semibold text-white mb-3">Newsletter</h4>
            <p className="mb-3 text-sm">Dapatkan info terbaru dari kami</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Alamat email Anda"
                className="px-3 py-1.5 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-colors"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-4 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {currentYear} WarkopKhaa. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
