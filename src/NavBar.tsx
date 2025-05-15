import { FaHome, FaUser, FaTools, FaProjectDiagram } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="fixed top-4 w-full z-40 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-lg border border-white/20 rounded-full py-1 px-2 md:py-2 md:px-4 shadow-lg">
        <a
          href="/"
          className="text-xl md:text-2xl font-dancing-script text-white scale-105 hover:scale-110 transition-transform duration-200 invert-on-hover"
        >
          Tanu
        </a>
        <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-6 mt-1 md:mt-0">
          {/* Text links for desktop */}
          <a
            href="#hero"
            className="hidden md:inline text-sm md:text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
          >
            Home
          </a>
          <a
            href="#about"
            className="hidden md:inline text-sm md:text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
          >
            About
          </a>
          <a
            href="#skills"
            className="hidden md:inline text-sm md:text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="hidden md:inline text-sm md:text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
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
      </div>
    </nav>
  );
};

export default NavBar;
