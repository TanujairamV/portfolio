import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from './Portfolio.jsx';

function NavBar() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <nav className="material-nav fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between w-full">
        <motion.div
          className="signature text-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Tanujairam
        </motion.div>
        <div className="flex items-center space-x-4">
          <a href="#hero" className="text-link font-inter text-sm hover:text-accent">Home</a>
          <a href="#about" className="text-link font-inter text-sm hover:text-accent">About</a>
          <a href="#projects" className="text-link font-inter text-sm hover:text-accent">Projects</a>
          <a href="#skills" className="text-link font-inter text-sm hover:text-accent">Skills</a>
          <a href="#contact" className="text-link font-inter text-sm hover:text-accent">Contact</a>
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="bg-transparent text-heading font-inter text-sm focus:outline-none"
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
