import { useTheme } from './context/ThemeContext';
import { FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa';

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl z-20">
      <div className="flex items-center justify-center bg-background/30 backdrop-blur-md rounded-full px-10 py-3 shadow-lg border border-foreground/10">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-dancing-script text-accent">Tanuj</h1>
          <div className="flex space-x-8">
            <a href="#hero" className="text-lg text-foreground hover:text-accent hover:scale-105 transition-transform duration-200">Home</a>
            <a href="#about" className="text-lg text-foreground hover:text-accent hover:scale-105 transition-transform duration-200">About</a>
            <a href="#projects" className="text-lg text-foreground hover:text-accent hover:scale-105 transition-transform duration-200">Projects</a>
            <a href="#contact" className="text-lg text-foreground hover:text-accent hover:scale-105 transition-transform duration-200">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/TanujairamV" target="_blank" rel="noopener noreferrer" className="text-xl text-subheading hover:text-accent hover:scale-105 transition-transform duration-200">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/tanujairam" target="_blank" rel="noopener noreferrer" className="text-xl text-subheading hover:text-accent hover:scale-105 transition-transform duration-200">
              <FaLinkedin />
            </a>
            <button
              onClick={toggleTheme}
              className="text-xl text-subheading hover:text-accent hover:scale-105 transition-transform duration-200"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
