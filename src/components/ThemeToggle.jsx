import { motion } from 'framer-motion';

export default function ThemeToggle({ isDarkMode, setIsDarkMode }) {
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      whileHover={{ scale: 1.1 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm-7.07-3.93a1 1 0 011.41 0l1.41 1.41a1 1 0 11-1.41 1.41l-1.41-1.41a1 1 0 010-1.41zm12.72 0a1 1 0 011.41 1.41l-1.41 1.41a1 1 0 11-1.41-1.41l1.41-1.41a1 1 0 010-1.41zM3 12a1 1 0 011-1h2a1 1 0 110 2H4a1 1 0 01-1-1zm16 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-3.93-7.07a1 1 0 011.41 0l1.41 1.41a1 1 0 11-1.41 1.41l-1.41-1.41a1 1 0 010-1.41zm-8.48 0a1 1 0 011.41 1.41L6.34 7.76a1 1 0 11-1.41-1.41l1.41-1.41a1 1 0 010-1.41zM12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9a6.008 6.008 0 019.21 4.9c0 4.42-3.58 8-8 8z" />
        </svg>
      )}
    </motion.button>
  );
}
