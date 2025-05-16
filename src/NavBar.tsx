import { motion } from 'framer-motion';
import { FaHome, FaUser, FaTools, FaProjectDiagram } from 'react-icons/fa';

const NavBar = () => {
  // Use the provided date and time: 04:55 PM IST on May 16, 2025
  const currentTime = "04:55";
  const period = "pm";

  return (
    <motion.nav
      className="fixed top-6 w-full z-50 px-4 md:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-lg border border-white/20 rounded-full py-2 md:py-3 px-4 shadow-lg hover:scale-[1.01] transition-transform duration-300">
        <a
          href="/"
          className="text-2xl md:text-3xl font-style-script text-white scale-105 hover:scale-110 transition-transform duration-200 invert-on-hover"
        >
          Tanu
        </a>
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Text links for desktop */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <a
              href="#hero"
              className="hidden md:inline text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            >
              Home
            </a>
            <a
              href="#about"
              className="hidden md:inline text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            >
              About
            </a>
            <a
              href="#skills"
              className="hidden md:inline text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hidden md:inline text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            >
              Projects
            </a>
            {/* Icons for mobile */}
            <a href="#hero" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
              <FaHome size={16} />
            </a>
            <a href="#about" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
              <FaUser size={16} />
            </a>
            <a href="#skills" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
              <FaTools size={16} />
            </a>
            <a href="#projects" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
              <FaProjectDiagram size={16} />
            </a>
          </div>
          {/* Time display - hidden on mobile */}
          <div className="hidden md:block text-base text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
            {currentTime} <sup className="text-xs">{period}</sup>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
