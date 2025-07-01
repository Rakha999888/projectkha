import React, { useState } from 'react';
import { FaShoppingCart, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';

const menuItems = [
  {
    id: 1,
    name: 'Kopi Tubruk',
    price: 12000,
    category: 'minuman',
    description: 'Racikan kopi tradisional dengan gula aren asli',
    image: '/images/kopi.png',
    isFeatured: true
  },
  {
    id: 2,
    name: 'Nasi Goreng',
    price: 25000,
    category: 'makanan',
    description: 'Nasi goreng spesial dengan bumbu rempah pilihan',
    image: '/images/nasgor.png',
    isFeatured: true
  },
  {
    id: 3,
    name: 'Mie Bangladesh',
    price: 25000,
    category: 'makanan',
    description: 'Mie goreng dengan bumbu khas yang menggugah selera',
    image: '/images/mie.png',
    isFeatured: true
  },
  {
    id: 4,
    name: 'Es Kopi Susu Gula Aren',
    price: 18000,
    category: 'minuman',
    description: 'Paduan kopi, susu, dan gula aren yang menyegarkan',
    image: '/images/Es Kopi Susu Gula Aren.png'
  },
  {
    id: 5,
    name: 'Es Jeruk',
    price: 12000,
    category: 'minuman',
    description: 'Es jeruk segar dengan sensasi manis asam',
    image: '/images/Es Jeruk.png'
  },
  {
    id: 6,
    name: 'Teh Tarik',
    price: 10000,
    category: 'minuman',
    description: 'Teh susu khas dengan buih yang lembut',
    image: '/images/Teh Tarik.png'
  },
  {
    id: 7,
    name: 'Nasi Ayam Penyet',
    price: 25000,
    category: 'makanan',
    description: 'Nasi dengan ayam goreng penyet sambal terasi',
    image: '/images/Nasi Ayam Penyet.png'
  },
  {
    id: 8,
    name: 'Gado-gado',
    price: 20000,
    category: 'makanan',
    description: 'Sayuran segar dengan bumbu kacang khas',
    image: '/images/Gado-gado.png'
  },
  {
    id: 9,
    name: 'Pisang Goreng',
    price: 12000,
    category: 'snack',
    description: 'Pisang goreng krispi dengan taburan keju',
    image: '/images/Pisang Goreng.png'
  },
  {
    id: 10,
    name: 'Cappuccino',
    price: 20000,
    category: 'minuman',
    description: 'Kopi espresso dengan buih susu lembut dan taburan bubuk coklat',
    image: '/images/Cappuccino.png'
  },
  {
    id: 11,
    name: 'Jus Alpukat',
    price: 18000,
    category: 'minuman',
    description: 'Jus alpukat segar dengan susu kental manis',
    image: '/images/Jus Alpukat.png'
  },
  {
    id: 12,
    name: 'Kentang Goreng',
    price: 15000,
    category: 'snack',
    description: 'Kentang goreng renyah dengan bumbu spesial',
    image: '/images/Kentang Goreng.png'
  },
  {
    id: 13,
    name: 'Martabak Manis',
    price: 25000,
    category: 'snack',
    description: 'Martabak manis dengan berbagai topping pilihan',
    image: '/images/Martabak Manis.png'
  },
  {
    id: 14,
    name: 'Roti Bakar',
    price: 15000,
    category: 'snack',
    description: 'Roti bakar dengan olesan mentega dan berbagai topping',
    image: '/images/Roti Bakar.png'
  }
];

const categories = [
  { id: 'semua', name: 'Semua Menu' },
  { id: 'minuman', name: 'Minuman' },
  { id: 'makanan', name: 'Makanan' },
  { id: 'snack', name: 'Snack' },
];

const Menu = () => {
  const navigate = useNavigate();
  const { addToCart, cartItemCount } = useCart();
  const [activeCategory, setActiveCategory] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        duration: 0.3
      }
    }
  };

  const imageHover = {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  };

  const buttonTap = {
    scale: 0.95
  };

  const bounce = {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.3
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'semua' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch; // Include all matching items, including featured ones
  });

  // Get featured items
  const featuredItems = menuItems.filter(item => item.isFeatured);

  // Fungsi untuk menangani penambahan ke keranjang
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} ditambahkan ke keranjang`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-amber-900 mb-4">Menu Kami</h1>
          <p className="text-xl text-amber-800">Pilih menu favorit Anda</p>
        </motion.div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-center mb-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-full"
          >
            <FaFilter /> Filter Kategori
          </motion.button>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={false}
          className={`flex flex-wrap justify-center gap-2 mb-10 ${!isFilterOpen ? 'hidden lg:flex' : 'flex'}`}
        >
          {['semua', 'makanan', 'minuman'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(category);
                if (window.innerWidth < 1024) setIsFilterOpen(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-w-md mx-auto"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Cari menu..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence>
          {filteredItems.length > 0 ? (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((menuItem) => (
                <motion.div
                  key={menuItem.id}
                  variants={item}
                  whileHover="hover"
                  className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer"
                  layout
                >
                  <motion.div className="h-48 overflow-hidden">
                    <motion.img
                      src={menuItem.image}
                      alt={menuItem.name}
                      className="w-full h-full object-cover"
                      whileHover={imageHover}
                    />
                  </motion.div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900">{menuItem.name}</h3>
                      <span className="text-amber-600 font-bold">
                        Rp {menuItem.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{menuItem.description}</p>
                    <motion.button
                      onClick={() => {
                        addToCart({ ...menuItem, price: Number(menuItem.price) });
                        toast.success(`${menuItem.name} ditambahkan ke keranjang`, {
                          position: 'bottom-center',
                          style: {
                            background: '#10B981',
                            color: '#fff',
                          },
                          iconTheme: {
                            primary: '#fff',
                            secondary: '#10B981',
                          },
                        });
                      }}
                      whileTap={buttonTap}
                      whileHover={{ scale: 1.03 }}
                      className="mt-4 w-full flex items-center justify-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-all"
                    >
                      <motion.span 
                        key={`cart-${menuItem.id}`}
                        animate={bounce}
                      >
                        <FaShoppingCart />
                      </motion.span>
                      <span>Tambah ke Keranjang</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 col-span-3">
              <p className="text-gray-500">Tidak ada menu yang ditemukan. Coba kata kunci lain atau pilih kategori berbeda</p>
            </div>
          )}
        </AnimatePresence>

        {/* Floating Cart Button */}
        {cartItemCount > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/cart')}
            className="fixed bottom-6 right-6 bg-amber-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
          >
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {cartItemCount}
            </span>
          </motion.button>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 col-span-3">
            <p className="text-gray-500">Tidak ada menu yang ditemukan. Coba kata kunci lain atau pilih kategori berbeda</p>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Menu;
