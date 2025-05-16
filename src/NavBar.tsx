import { motion } from 'framer-motion';
import { FaHome, FaUser, FaTools, FaProjectDiagram, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState("11:33");
  const [period, setPeriod] = useState("pm");
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const periodValue = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedTime = `${formattedHours}:${formattedMinutes}`;
      setCurrentTime(formattedTime);
      setPeriod(periodValue);
    };

    fetchTime();
    const interval = setInterval(fetchTime, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      className={`fixed top-6 w-full max-w-3xl mx-auto px-4 md:px-6 z-50 transition-all duration-300 ${isScrolled ? 'bg-opacity-90 backdrop-blur-lg shadow-xl' : 'bg-opacity-20 backdrop-blur-2xl'}`}
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between bg-black/20 border border-white/30 rounded-3xl py-2 px-3 shadow-lg hover:scale-[1.01] transition-transform duration-300">
        <a
          href="/"
          className="text-xl font-semibold tracking-wide text-white hover:text-blue-300 transition-colors duration-200"
          aria-label="Go to homepage"
        >
          Tanu
        </a>
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 md:space-x-6">
            <a
              href="#hero"
              className="text-sm text-gray-200 hover:text-blue-300 transition-colors duration-200"
              aria-label="Go to Hero section"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-sm text-gray-200 hover:text-blue-300 transition-colors duration-200"
              aria-label="Go to About section"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-sm text-gray-200 hover:text-blue-300 transition-colors duration-200"
              aria-label="Go to Skills section"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-sm text-gray-200 hover:text-blue-300 transition-colors duration-200"
              aria-label="Go to Projects section"
            >
              Projects
            </a>
          </div>
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-200 hover:text-blue-300 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
          {/* Desktop Time Display */}
          <div className="hidden md:block text-sm text-gray-200">
            {currentTime} <sup className="text-[10px]">{period}</sup>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-800 mt-2 rounded-lg p-4 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="#hero"
            className="block py-2 text-gray-200 hover:text-blue-300 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Go to Hero section"
          >
            <FaHome className="inline mr-2" /> Home
          </a>
          <a
            href="#about"
            className="block py-2 text-gray-200 hover:text-blue-300 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Go to About section"
          >
            <FaUser className="inline mr-2" /> About
          </a>
          <a
            href="#skills"
            className="block py-2 text-gray-200 hover:text-blue-300 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Go to Skills section"
          >
            <FaTools className="inline mr-2" /> Skills
          </a>
          <a
            href="#projects"
            className="block py-2 text-gray-200 hover:text-blue-300 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Go to Projects section"
          >
            <FaProjectDiagram className="inline mr-2" /> Projects
          </a>
          <div className="text-sm text-gray-200 pt-2 border-t border-gray-700">
            {currentTime} <sup className="text-[10px]">{period}</sup>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavBar;
