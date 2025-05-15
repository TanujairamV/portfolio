import { useTheme } from './ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 md:w-auto z-40">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-lg border border-white/20 rounded-full py-2 px-4 md:px-6 shadow-lg">
        <a
          href="/"
          className="text-2xl font-dancing-script text-white scale-105 hover:scale-110 transition-transform duration-200"
        >
          Tanu
        </a>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mt-2 md:mt-0">
          <a
            href="#hero"
            className="text-sm md:text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-sm md:text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400"
          >
            About
          </a>
          <a
            href="#skills"
            className="text-sm md:text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="text-sm md:text-base text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400"
          >
            Projects
          </a>
          <button onClick={toggleTheme} className="text-white hover:text-accent">
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
