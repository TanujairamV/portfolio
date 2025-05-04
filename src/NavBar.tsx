import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from './Portfolio';

const NavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <nav className="material-nav fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between w-full">
        <motion.div
          className="signature text-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          Tanujairam
        </motion.div>
        <div className="flex items-center space-x-3">
          <a href="#hero" className="text-link font-inter text-[0.65rem] hover:text-accent">Home</a>
          <a href="#about" className="text-link font-inter text-[0.65rem] hover:text-accent">About</a>
          <a href="#projects" className="text-link font-inter text-[0.65rem] hover:text-accent">Projects</a>
          <a href="#skills" className="text-link font-inter text-[0.65rem] hover:text-accent">Skills</a>
          <a href="#contact" className="text-link font-inter text-[0.65rem] hover:text-accent">Contact</a>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'system' | 'dark' | 'light')}
            className="bg-transparent text-heading font-inter text-[0.65rem] focus:outline-none"
          >
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
