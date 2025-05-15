import { motion } from 'framer-motion';
import { FaHome, FaUser, FaTools, FaProjectDiagram } from 'react-icons/fa';

const NavBar = () => {
  return (
    <motion.nav
      className="fixed top-4 w-full z-40 px-4 md:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-lg border border-white/20 rounded-full py-2 px-4 md:py-4 md:px-8 shadow-lg">
        <a
          href="/"
          className="text-3xl md:text-4xl font-dancing-script text-white scale-105 hover:scale-110 transition-transform duration-200 invert-on-hover"
        >
          Tanu
        </a>
        <div className="flex flex-row md:flex-row items-center space-x-4 md:space-x-8 mt-2 md:mt-0">
          {/* Text links for desktop */}
          <a
            href="#hero"
            className="hidden md:inline text-lg text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
          >
            Home
          </a>
          <a
            href="#about"
            className="hidden md:inline text-lg text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
          >
            About
          </a>
          <a
            href="#skills"
            className="hidden md:inline text-lg text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="hidden md:inline text-lg text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
          >
            Projects
          </a>
          {/* Icons for mobile */}
          <a href="#hero" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
            <FaHome size={24} />
          </a>
          <a href="#about" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
            <FaUser size={24} />
          </a>
          <a href="#skills" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
            <FaTools size={24} />
          </a>
          <a href="#projects" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
            <FaProjectDiagram size={24} />
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
