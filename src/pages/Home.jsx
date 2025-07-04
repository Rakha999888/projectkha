import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/animations.css';

// Custom hook for scroll animations
const useOnScreen = (ref, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};

// Image paths (using public folder)
const coffeeBg = '/images/coffee-bg.png';
const kopiImage = '/images/kopi.png';
const nasgorImage = '/images/nasgor.png';
const mieImage = '/images/mie.png';

// Background images
const backgrounds = [
  { 
    id: 1, 
    src: coffeeBg,
    overlay: 'bg-gradient-to-br from-amber-900/80 to-amber-800/80',
    textColor: 'text-amber-50',
    highlightColor: 'text-amber-200',
    position: 'center',
    size: 'cover'
  },
  { 
    id: 2, 
    src: kopiImage,
    overlay: 'bg-gradient-to-br from-amber-800/80 to-amber-700/80',
    textColor: 'text-amber-50',
    highlightColor: 'text-amber-200',
    position: 'center',
    size: 'contain'
  },
  { 
    id: 3, 
    src: '/images/nasgor.png',
    overlay: 'bg-gradient-to-br from-amber-900/80 to-amber-800/80',
    textColor: 'text-amber-50',
    highlightColor: 'text-amber-200',
    position: 'center',
    size: 'cover'
  },
  { 
    id: 4, 
    src: '/images/mie.png',
    overlay: 'bg-gradient-to-br from-amber-800/80 to-amber-700/80',
    textColor: 'text-amber-50',
    highlightColor: 'text-amber-200',
    position: 'center',
    size: 'cover'
  }
];

const Home = () => {
  // Dummy data for menu highlights
  const featuredMenu = [
    { id: 1, name: 'Kopi Tubruk', price: '12K', image: '/images/kopi.png' },
    { id: 2, name: 'Nasi Goreng', price: '25K', image: '/images/nasgor.png' },
    { id: 3, name: 'Mie Bangladesh', price: '25K', image: '/images/mie.png' },
  ];

  // Dummy data for testimonials
  const testimonials = [
    { id: 1, name: 'Budi Santoso', comment: 'Kopinya enak dan tempatnya nyaman!', rating: 5 },
    { id: 2, name: 'Ani Wijaya', comment: 'Pelayanan ramah, makanan enak-enak!', rating: 5 },
    { id: 3, name: 'Rudi Hartono', comment: 'Tempat nongkrong asik dengan suasana yang adem.', rating: 4 },
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const bg = backgrounds[currentBgIndex];
  
  // Refs for scroll animations
  const sectionRefs = useRef([]);
  const [visibleSections, setVisibleSections] = useState([]);
  
  // Enhanced scroll animation observer
  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.dataset.animation || 'fade-up';
          const delay = element.dataset.delay || '0';
          const duration = element.dataset.duration || '0.8';
          
          // Apply the animation
          element.style.opacity = '1';
          element.style.transform = 'translateY(0) rotateY(0) scale(1)';
          element.style.transition = `all ${duration}s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s`;
          
          // Stop observing the element after animation
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with data-animation attribute
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  // Add visible class to elements when they're in view
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right');
    elements.forEach((el) => {
      const elementId = el.id || el.className;
      if (visibleSections.includes(elementId)) {
        el.classList.add('visible');
      }
    });
  }, [visibleSections]);

  // Auto change background
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
      }
    }, 7000);
    
    // Scroll progress bar
    const updateScrollProgress = () => {
      const scrollProgress = document.querySelector('.scroll-progress');
      if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
      }
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [isHovering]);

  return (
    <div className="relative min-h-screen text-gray-800 font-sans antialiased">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress"></div>
      {/* Subtle Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0h-7.17L36.26 24.793l-10.62-10.62-3.536 3.535 10.621 10.62L24.793 36.26l-10.62-10.62-3.536 3.535 10.62 10.621L7.17 47.456 0 54.627 5.373 60l7.17-7.17L36.26 35.207l10.62 10.62 3.536-3.535-10.62-10.62L52.83 12.544 60 5.373 54.627 0z\' fill=\'%239C7B4D\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Hero Section - Split Screen */}
      
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-amber-900 to-amber-800">
        {/* Left Side - Content */}
        <div className="w-full lg:w-1/2 flex items-center relative z-10 py-20 lg:py-0 px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl mx-auto">
            {/* Since 2025 Badge */}
            <div data-animation="fade-up" data-delay="0.1" className="inline-block mb-6 lg:mb-8">
              <span className="text-amber-100 bg-amber-700/80 px-5 py-2.5 rounded-full font-medium tracking-wider text-sm uppercase shadow-lg hover:shadow-amber-900/30 transition-shadow duration-300">
                Sejak 2025
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 data-animation="fade-up" data-delay="0.2" className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-5 text-white">
              <span className="block mb-2 text-3xl md:text-4xl font-serif italic text-amber-200 font-normal">Warkop Khaa</span>
              <span className="text-2xl md:text-3xl font-normal text-white bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                Tradisi Rasa yang Autentik
              </span>
            </h1>
            
            {/* Description */}
            <p data-animation="fade-up" data-delay="0.3" className="text-base md:text-lg text-amber-50/90 mb-8 leading-relaxed max-w-xl">
              Menyajikan kopi pilihan dengan cita rasa khas nusantara dalam suasana yang hangat dan nyaman.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 lg:mb-0">
              <div data-animation="fade-up" data-delay="0.4" className="hover-scale">
                <Link 
                  to="/menu" 
                  className="group relative px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-md hover:shadow-amber-900/20"
                >
                  <span className="relative z-10">Lihat Menu</span>
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                </Link>
              </div>
              
              <div data-animation="fade-up" data-delay="0.5" className="hover-scale">
                <Link 
                  to="/contact#reservasi" 
                  className="px-6 py-2.5 bg-white/90 hover:bg-white text-gray-800 text-sm font-medium rounded-lg border border-amber-100/20 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-md hover:shadow-amber-900/5"
                >
                  Reservasi Meja
                </Link>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="pt-8 border-t border-amber-100/10">
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8">
                {/* Happy Customers */}
                <div data-animation="fade-right" data-delay="0.6" className="hover-scale">
                  <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 border border-amber-100/5">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i} 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20 overflow-hidden shadow-lg transition-all duration-300 hover:z-10 hover:scale-110 hover:border-amber-200/50"
                          style={{ 
                            transitionDelay: `${i * 0.1}s`,
                            transform: `translateX(${i * -0.5}rem)`
                          }}
                        >
                          <img 
                            src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 20}.jpg`} 
                            alt="Customer"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-left">
                      <p className="text-amber-50 text-sm font-medium">
                        Lebih dari <span className="text-amber-200 font-bold">500+</span> pelanggan puas
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Divider */}
                <div data-animation="zoom-in" data-delay="0.7" className="h-px w-16 sm:h-8 sm:w-px bg-amber-100/20"></div>
                
                {/* Rating */}
                <div data-animation="fade-left" data-delay="0.8" className="hover-scale">
                  <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 border border-amber-100/5">
                    <div className="flex -space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < 5 ? 'text-amber-400' : 'text-gray-400'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                          style={{ 
                            transitionDelay: `${i * 0.1}s`,
                            filter: 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.2))'
                          }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-amber-50 font-medium">
                      <span className="text-amber-200 font-bold">4.9</span>/5 dari <span className="text-amber-200 font-bold">120+</span> ulasan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator - Only show on mobile */}
          <div className="lg:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Right Side - Background Only */}
        <div data-animation="fade-in" data-delay="0.3" className="w-full lg:w-1/2 h-96 lg:h-auto relative bg-amber-900">
          <div className="absolute inset-0">
            <img 
              src="/images/coffee-bg.png" 
              alt="Kopi Khas Warkop Khaa"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 to-amber-800/60"></div>
          </div>
        </div>
      </section>

      {/* Menu Highlight */}
      <section ref={useRef(null)} className="relative py-24 bg-amber-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-100 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-amber-100 to-transparent z-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          <div data-animation="fade-up" data-delay="0.1" className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-4">
              <span className="text-amber-700 bg-amber-100 px-4 py-2 rounded-full font-medium tracking-wider text-sm uppercase shadow-sm">Menu Pilihan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              Kelezatan <span className="font-serif italic text-amber-700">Autentik</span>
            </h2>
            <p className="text-gray-700">
              Nikmati hidangan istimewa kami yang dibuat dengan bahan-bahan pilihan dan resep turun-temurun
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMenu.map((menuItem) => (
              <div 
                key={menuItem.id} 
                data-animation="flip-y" 
                data-delay="${menuItem.id * 0.1}"
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover-scale"
                style={{ transitionDelay: `${menuItem.id * 100}ms` }}
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={menuItem.image} 
                    alt={menuItem.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-1">{menuItem.name}</h3>
                      <p className="text-amber-200 font-medium">Rp {menuItem.price}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-medium text-gray-900">{menuItem.name}</h3>
                    <span className="text-amber-600 font-medium">Rp {menuItem.price}</span>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    {menuItem.name === 'Kopi Tubruk' && 'Racikan kopi tradisional dengan gula aren asli'}
                    {menuItem.name === 'Nasi Goreng' && 'Nasi goreng spesial dengan bumbu rempah pilihan'}
                    {menuItem.name === 'Mie Bangladesh' && 'Mie goreng pedas dengan bumbu khas Bangladesh'}
                  </p>
                  <button className="mt-4 text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center transition-colors">
                    Pesan Sekarang
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/menu" 
              className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 transition-colors duration-300"
            >
              Lihat Semua Menu
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={useRef(null)} className="relative py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div data-animation="fade-up" data-delay="0.1" className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-4">
              <span className="text-amber-700 bg-amber-100 px-4 py-2 rounded-full font-medium tracking-wider text-sm uppercase shadow-sm">Testimoni</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              Kata <span className="font-serif italic text-amber-700">Pelanggan</span> Kami
            </h2>
            <p className="text-gray-700">
              Berikut adalah beberapa kesan dan pesan dari pelanggan setia Warkop Khaa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                data-animation="flip-y"
                data-delay="${testimonial.id * 0.1}"
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-500 border border-gray-100 overflow-hidden group hover-scale"
                style={{ transitionDelay: `${testimonial.id * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-amber-600 text-xl font-medium">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.comment}"</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                <div className="bg-amber-50 px-8 py-4 border-t border-amber-100">
                  <button className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center transition-colors">
                    Baca cerita lengkapnya
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/testimoni" 
              className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 transition-colors duration-300"
            >
              Lihat Semua Testimoni
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
