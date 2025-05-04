import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <motion.section
            className="p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-seafoam-200 dark:bg-seafoam-800 rounded-full px-4 py-2 text-2xl font-montserrat">
              T
            </div>
            <h1 className="text-4xl font-montserrat font-bold mt-4">Tanujairam</h1>
            <p className="text-lg font-roboto text-gray-600 dark:text-gray-300">
              Student Developer | Open Source Enthusiast
            </p>
            <p className="mt-4 max-w-2xl mx-auto font-roboto">
              Hey, I'm Tanujairam — a high school student building cool stuff with Python and automation scripts. I love open source, coding late at night, and black coffee.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <a href="https://github.com/TanujairamV" className="bg-seafoam-500 text-white px-4 py-2 rounded-full font-roboto hover:bg-seafoam-600">
                GitHub
              </a>
              <a href="mailto:tanujairam.v@gmail.com" className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full font-roboto hover:bg-gray-300 dark:hover:bg-gray-600">
                Email
              </a>
            </div>
          </motion.section>
        );
      case 'about':
        return (
          <motion.section
            className="p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-montserrat font-bold">About Me</h2>
            <p className="mt-4 font-roboto text-gray-600 dark:text-gray-300">
              I'm a 16-year-old developer passionate about Python, automation, and open source. I maintain custom ROMs for Android devices and build tools like userbots and Telegram scripts. My achievements include contributing to open-source repos and automating Instagram signups using temp mail APIs.
            </p>
            <h3 className="mt-6 text-2xl font-montserrat">Skills</h3>
            <ul className="mt-2 flex flex-wrap gap-2 font-roboto">
              {['Python', 'Bash', 'Git', 'Linux', 'Selenium', 'Tkinter', 'Basic Web Dev'].map(skill => (
                <li key={skill} className="bg-seafoam-100 dark:bg-seafoam-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </motion.section>
        );
      case 'projects':
        return (
          <motion.section
            className="p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-montserrat font-bold">Projects</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'gr11prctl',
                  desc: 'A library of Python programs for CBSE Grade 11 Computer Science',
                  link: 'https://github.com/TanujairamV/gr11prctl',
                },
                {
                  name: 'rupi',
                  desc: 'A quirky Python library with FLAMES, Tic-Tac-Toe GUI, and Chess beta',
                  link: 'https://github.com/TanujairamV/rupi',
                },
                {
                  name: 'Userbots',
                  desc: 'WhatsApp/Telegram userbots and automation tools',
                  link: 'https://github.com/TanujairamV',
                },
              ].map(project => (
                <motion.a
                  key={project.name}
                  href={project.link}
                  className="block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-montserrat font-bold">{project.name}</h3>
                  <p className="mt-2 font-roboto text-gray-600 dark:text-gray-300">{project.desc}</p>
                </motion.a>
              ))}
            </div>
          </motion.section>
        );
      case 'contact':
        return (
          <motion.section
            className="p-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-montserrat font-bold">Contact</h2>
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
              <p className="font-roboto text-gray-600 dark:text-gray-300">
                Email: <a href="mailto:tanujairam.v@gmail.com" className="text-seafoam-500 hover:underline">tanujairam.v@gmail.com</a>
              </p>
              <p className="mt-2 font-roboto text-gray-600 dark:text-gray-300">
                GitHub: <a href="https://github.com/TanujairamV" className="text-seafoam-500 hover:underline">TanujairamV</a>
              </p>
            </div>
          </motion.section>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} font-roboto relative overflow-hidden`}>
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-seafoam-500 rounded-full pointer-events-none z-50"
        style={{ x: cursorPos.x - 8, y: cursorPos.y - 8 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-xl font-montserrat font-bold text-seafoam-500">Tanujairam</div>
          <ul className="flex space-x-4">
            {['home', 'about', 'projects', 'contact'].map(section => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section)}
                  className={`capitalize font-roboto ${activeSection === section ? 'text-seafoam-500' : 'text-gray-600 dark:text-gray-300'} hover:text-seafoam-500`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            className="bg-seafoam-500 text-white px-3 py-1 rounded-full font-roboto"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </nav>
      {/* Main Content */}
      <AnimatePresence>{renderSection()}</AnimatePresence>
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 p-4 mt-8 text-center">
        <p className="font-roboto text-gray-600 dark:text-gray-300">
          &copy; 2025 Tanujairam. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
