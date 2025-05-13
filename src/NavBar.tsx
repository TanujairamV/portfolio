import { useTheme } from './context/ThemeContext';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center justify-center bg-background/30 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-foreground/10">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-dancing-script text-accent">Tanuj</h1>
          <div className="flex space-x-3">
            <a href="#hero" className="text-base text-foreground hover:text-accent hover:scale-105 transition-transform duration-200">Home</a>
            <a href="#about" className="text-base text-foreground hover:text-accent hover:scale-105 transition-transform duration-200">About</a>
            <a href="#projects" className="text-base text-foreground hover:text-accent hover:scale-105 transition-transform duration-200">Projects</a>
            <a href="#contact" className="text-base text-foreground hover:text-accent hover:scale-105 transition-transform duration-200">Contact</a>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://github.com/TanujairamV" target="_blank" rel="noopener noreferrer" className="text-xl text-subheading hover:text-accent hover:scale-105 transition-transform duration-200">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/tanujairam" target="_blank" rel="noopener noreferrer" className="text-xl text-subheading hover:text-accent hover:scale-105 transition-transform duration-200">
              <FaLinkedin />
            </a>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="material-btn rounded-full px-4 py-2 text-base"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
