import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
import { ThemeContext } from './Portfolio.jsx';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'system') return 'light';
      if (prev === 'light') return 'dark';
      return 'system';
    });
  };

  return (
    <nav className="fixed top-4 left-0 right-0 navbar-glass z-40">
      <div className="flex items-center h-12">
        <div className="flex items-center">
          <a href="#hero" className="flex-shrink-0 flex items-center font-dancing-script text-2xl italic -rotate-3 text-heading">
            Tanujairam
          </a>
        </div>
        <div className="flex-1 flex justify-center sm:ml-6 sm:space-x-6 hidden sm:flex">
          {[
            { name: 'Home', href: '#hero' },
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Skills', href: '#skills' },
            { name: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="inline-flex items-center px-2 text-sm font-inter text-white dark:text-white light:text-black hover:text-[#FFD700] transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-sm font-inter text-white dark:text-white sm:text-white">{currentTime}</span>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center p-2 text-white dark:text-white light:text-black hover:text-[#FFD700] hidden sm:flex"
            aria-label="Toggle theme"
          >
            {theme === 'system' && <FaDesktop />}
            {theme === 'light' && <FaSun />}
            {theme === 'dark' && <FaMoon />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-white dark:text-white light:text-black hover:text-[#FFD700] focus:outline-none sm:hidden"
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
            {[
              { name: 'Home', href: '#hero' },
              { name: 'About', href: '#about' },
              { name: 'Projects', href: '#projects' },
              { name: 'Skills', href: '#skills' },
              { name: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block pl-3 pr-4 py-2 text-base font-inter text-white dark:text-white light:text-black hover:text-[#FFD700] hover:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] light:hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="block pl-3 pr-4 py-2 text-base font-inter text-white dark:text-white light:text-black hover:text-[#FFD700] hover:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] light:hover:bg-gray-200"
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
