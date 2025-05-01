import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import ThemeToggle from './ThemeToggle';

export default function NavBar({ isMenuOpen, setIsMenuOpen, isDarkMode, setIsDarkMode, time }) {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    gsap.fromTo(
      '.nav-link',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    section.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <motion.a
          href="#home"
          className="text-2xl font-bold font-poppins text-purple-500"
          onClick={(e) => handleNavClick(e, '#home')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          aria-label="Tanu Home"
        >
          Tanu
        </motion.a>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link text-lg font-inter text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={link.name}
            >
              {link.name}
            </motion.a>
          ))}
          <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <div className="text-lg font-inter text-gray-600 dark:text-gray-300" aria-live="polite">
            {time}
          </div>
        </div>
        <button
          className="md:hidden text-purple-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <motion.ul
          className="md:hidden glassmorphic flex flex-col items-center py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <li key={link.name} className="py-3">
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-inter text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors"
                aria-label={link.name}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="py-3">
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </li>
        </motion.ul>
      )}
    </nav>
  );
}
