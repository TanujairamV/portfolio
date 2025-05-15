import { FaHome, FaUser, FaTools, FaProjectDiagram } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="fixed top-4 w-full z-40 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-lg border border-white/20 rounded-full py-1 px-2 md:py-3 md:px-6 shadow-lg">
        <a
          href="/"
          className="text-2xl md:text-3xl font-dancing-script text-white scale-105 hover:scale-110 transition-transform duration-200"
        >
          Tanu
        </a>
        <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-8 mt-1 md:mt-0">
          {/* Text links for desktop */}
          <a
            href="#hero"
            className="hidden md:inline text-base md:text-lg text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Home
          </a>
          <a
            href="#about"
            className="hidden md:inline text-base md:text-lg text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            About
          </a>
          <a
            href="#skills"
            className="hidden md:inline text-base md:text-lg text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="hidden md:inline text-base md:text-lg text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Projects
          </a>
          {/* Icons for mobile */}
          <a href="#hero" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            <FaHome size={18} />
          </a>
          <a href="#about" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            <FaUser size={18} />
          </a>
          <a href="#skills" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            <FaTools size={18} />
          </a>
          <a href="#projects" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            <FaProjectDiagram size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
