import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from './Portfolio.jsx';

function NavBar() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <nav className="navbar-glass fixed top-4 left-0 right-0 z-10">
      <div className="flex items-center justify-between w-full">
        <motion.div
          className="signature text-white dark:text-white light:text-black"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tanujairam
        </motion.div>
        <div className="flex space-x-4">
          <a href="#hero" className="text-link font-inter text-sm">Home</a>
          <a href="#about" className="text-link font-inter text-sm">About</a>
          <a href="#projects" className="text-link font-inter text-sm">Projects</a>
          <a href="#skills" className="text-link font-inter text-sm">Skills</a>
          <a href="#contact" className="text-link font-inter text-sm">Contact</a>
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="bg-transparent text-white dark:text-white light:text-black font-inter text-sm"
          >
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
