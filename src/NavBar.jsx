import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from './Portfolio.jsx';

function NavBar() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <nav className="navbar-glass fixed top-0 left-0 right-0 z-20">
      <div className="flex items-center justify-between w-full">
        <motion.div
          className="signature text-heading"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tanujairam
        </motion.div>
        <div className="flex items-center space-x-6">
          <a href="#hero" className="text-link font-inter text-base hover:text-hover">Home</a>
          <a href="#about" className="text-link font-inter text-base hover:text-hover">About</a>
          <a href="#projects" className="text-link font-inter text-base hover:text-hover">Projects</a>
          <a href="#skills" className="text-link font-inter text-base hover:text-hover">Skills</a>
          <a href="#contact" className="text-link font-inter text-base hover:text-hover">Contact</a>
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="bg-transparent text-heading font-inter text-base focus:outline-none"
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
