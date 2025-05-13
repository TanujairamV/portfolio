import { useTheme } from './context/ThemeContext';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-dancing-script text-accent">Tanu</h1>
        <div className="flex items-center space-x-4">
          <a href="#hero" className="text-base hover:text-accent">Home 🏠</a>
          <a href="#about" className="text-base hover:text-accent">About ℹ️</a>
          <a href="#projects" className="text-base hover:text-accent">Projects 🛠️</a>
          <a href="#contact" className="text-base hover:text-accent">Contact 📬</a>
          <a href="https://github.com/TanujairamV" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-accent">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/tanujairam" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-accent">
            <FaLinkedin />
          </a>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="material-btn"
          >
            <option value="system">System 🌐</option>
            <option value="light">Light ☀️</option>
            <option value="dark">Dark 🌙</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
