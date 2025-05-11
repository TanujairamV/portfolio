import { useTheme } from './context/ThemeContext';

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-space-grotesk">Portfolio</h1>
        <div className="flex items-center space-x-4">
          <a href="#hero" className="text-lg hover:text-accent">Home</a>
          <a href="#about" className="text-lg hover:text-accent">About</a>
          <a href="#projects" className="text-lg hover:text-accent">Projects</a>
          <a href="#contact" className="text-lg hover:text-accent">Contact</a>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="material-btn"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
