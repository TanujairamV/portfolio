import { useTheme } from './ThemeContext';

const NavBar = () => {
  const { toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-40 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
          Tanu
        </a>
        <div className="space-x-6 flex items-center">
          <a href="#hero" className="text-subheading hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Home</a>
          <a href="#about" className="text-subheading hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">About</a>
          <a href="#skills" className="text-subheading hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Skills</a>
          <a href="#projects" className="text-subheading hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Projects</a>
          <button onClick={toggleTheme} className="text-subheading hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
            Toggle Theme
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
