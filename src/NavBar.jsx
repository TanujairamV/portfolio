import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
import { ThemeContext } from './Portfolio.jsx';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'system') return 'light';
      if (prev === 'light') return 'dark';
      return 'system';
    });
  };

  return (
    <nav className="fixed top-4 left-0 right-0 navbar-glass z-40">
      <div className="flex justify-between items-center h-12">
        <div className="flex">
          <a href="#hero" className="flex-shrink-0 flex items-center text-xl font-space-grotesk text-neon-blue">
            Tanujairam
          </a>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="inline-flex items-center px-1 text-sm font-manrope text-white hover:text-neon-blue transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center p-2 text-white hover:text-neon-blue"
            aria-label="Toggle theme"
          >
            {theme === 'system' && <FaDesktop />}
            {theme === 'light' && <FaSun />}
            {theme === 'dark' && <FaMoon />}
          </button>
        </div>
        <div className="-mr-2 flex items-center sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-neon-blue focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="sm:hidden navbar-glass mt-2 rounded-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block pl-3 pr-4 py-2 text-base font-manrope text-white hover:text-neon-blue hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="block pl-3 pr-4 py-2 text-base font-manrope text-white hover:text-neon-blue hover:bg-gray-800"
            >
              {theme === 'system' ? 'System Theme' : theme === 'light' ? 'Light Theme' : 'Dark Theme'}
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default NavBar;
