import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaTools, FaProjectDiagram, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState('11:33');
  const [period, setPeriod] = useState('pm');
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setPeriod(hours >= 12 ? 'pm' : 'am');
      setCurrentTime(`${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const menuLinks = [
    { href: '#hero', label: 'Home', icon: FaHome },
    { href: '#about', label: 'About', icon: FaUser },
    { href: '#skills', label: 'Skills', icon: FaTools },
    { href: '#projects', label: 'Projects', icon: FaProjectDiagram },
  ];

  return (
    <motion.nav
      className={`fixed top-6 w-full max-w-3xl mx-auto px-4 md:px-6 z-50 transition-all duration-300
        ${isScrolled ? 'bg-opacity-90 backdrop-blur-lg shadow-xl' : 'bg-opacity-20 backdrop-blur-2xl'}`}
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      aria-label="Primary navigation"
    >
      <div className="flex items-center justify-between bg-black/20 border border-white/30 rounded-3xl py-2 px-3 shadow-lg hover:scale-[1.01] transition-transform duration-300">
        <a href="/" className="text-xl font-semibold tracking-wide text-white hover:text-blue-300 transition-colors duration-200" aria-label="Go to homepage">
          Tanu
        </a>

        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6" aria-label="Desktop menu">
            {menuLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-gray-200 hover:text-blue-300 transition-colors duration-200"
                aria-label={`Go to ${label} section`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-200 hover:text-blue-300 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>

          {/* Desktop Time */}
          <div className="hidden md:block text-sm text-gray-200 select-none" aria-live="polite">
            {currentTime} <sup className="text-[10px]">{period}</sup>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            className="md:hidden bg-gray-800 mt-2 rounded-lg p-4 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Mobile menu"
          >
            {menuLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="block py-2 text-gray-200 hover:text-blue-300 transition-colors duration-200"
                onClick={toggleMobileMenu}
                aria-label={`Go to ${label} section`}
              >
                <Icon className="inline mr-2" /> {label}
              </a>
            ))}
            <div className="text-sm text-gray-200 pt-2 border-t border-gray-700 select-none">
              {currentTime} <sup className="text-[10px]">{period}</sup>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
