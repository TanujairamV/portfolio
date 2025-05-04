import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('intro');
  const [introComplete, setIntroComplete] = useState(false);

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Custom cursor with inverted view
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scramble text animation
  const scrambleText = 'Tanujairam'.split('');
  const scrambleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  // Transition to home after intro
  useEffect(() => {
    if (activeSection === 'intro') {
      const timer = setTimeout(() => {
        setIntroComplete(true);
        setActiveSection('home');
      }, 2000); // Adjust duration as needed
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  const SocialsButton = () => (
    <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
      <a href="https://github.com/TanujairamV" className="text-blue-600 dark:text-blue-400 font-roboto hover:underline text-base sm:text-lg">
        GitHub
      </a>
      <a hrefmeailto:tanujairam.v@gmail.com" className="text-blue-600 dark:text-blue-400 font-roboto hover:underline text-base sm:text-lg">
        Email
      </a>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'intro':
        return (
          <motion.section
            className="flex flex-col items-center justify-center px-4 py-12 min-h-screen w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex">
              {scrambleText.map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-5xl sm:text-6xl font-montserrat font-bold text-gray-800 dark:text-gray-200"
                  custom={index}
                  variants={scrambleVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.section>
        );
      case 'home':
        return (
          <motion.section
            className="flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center min-h-[calc(100vh-80px)] w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl font-montserrat font-bold">Tanujairam</h1>
            <p className="text-lg sm:text-xl font-roboto text-gray-600 dark:text-gray-300 mt-2">
              Student Developer | Open Source Enthusiast
            </p>
            <p className="mt-4 max-w-xl font-roboto text-base sm:text-lg text-gray-500 dark:text-gray-400">
              A high school student crafting Python tools and automation scripts, passionate about open source and late-night coding.
            </p>
            <div className="mt-6">
              <SocialsButton />
            </div>
          </motion.section>
        );
      case 'about':
        return (
          <motion.section
            className="px-4 py-12 sm:py-16 max-w-3xl mx-auto w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-center">About</h2>
            <p className="mt-4 font-roboto text-gray-500 dark:text-gray-400 text-base sm:text-lg text-center">
              I'm a 16-year-old developer focused on Python and automation. I maintain custom Android ROMs and create tools like userbots and Telegram scripts. I’ve contributed to open-source projects and built automation for Instagram signups using temp mail APIs.
            </p>
            <h3 className="mt-6 text-xl sm:text-2xl font-montserrat text-center">Skills</h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 font-roboto">
              {['Python', 'Bash', 'Git', 'Linux', 'Selenium', 'Tkinter', 'Basic Web Dev'].map(skill => (
                <li key={skill} className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  {skill}
                </li>
              ))}
            </ul>
          </motion.section>
        );
      case 'projects':
        return (
          <motion.section
            className="px-4 py-12 sm:py-16 max-w-4xl mx-auto w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-center">Projects</h2>
            <div className="mt-6 space-y-6">
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
                  className="block border-b border-gray-200 dark:border-gray-700 py-4"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-gray-800 dark:text-gray-200">{project.name}</h3>
                  <p className="mt-1 font-roboto text-gray-500 dark:text-gray-400 text-sm sm:text-base">{project.desc}</p>
                </motion.a>
              ))}
            </div>
          </motion.section>
        );
      case 'contact':
        return (
          <motion.section
            className="px-4 py-12 sm:py-16 max-w-lg mx-auto w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-center">Contact</h2>
            <div className="mt-6 space-dot-1 flex flex-col gap-2 text-center">
              <SocialsButton />
            </div>
          </motion.section>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-pearl' : 'bg-gradient-dark'} font-roboto flex flex-col w-full`}>
      {/* Custom Cursor with Inverted View */}
      <motion.div
        className="fixed w-6 h-6 bg-white dark:bg-black rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ x: cursorPos.x - 12, y: cursorPos.y - 12 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10 bg-pearl dark:bg-gray-900 w-full">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xl font-montserrat font-bold text-gray-800 dark:text-gray-200">Tanujairam</div>
          {introComplete && (
            <>
              <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
                {['home', 'about', 'projects', 'contact'].map(section => (
                  <li key={section}>
                    <button
                      onClick={() => setActiveSection(section)}
                      className={`capitalize font-roboto text-base ${activeSection === section ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'} hover:text-blue-600 dark:hover:text-blue-400 transition`}
                    >
                      {section}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="text-blue-600 dark:text-blue-400 font-roboto hover:underline text-base"
              >
                {theme === 'light' ? 'Dark' : 'Light'}
              </button>
            </>
          )}
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-grow w-full">
        <AnimatePresence>{renderSection()}</AnimatePresence>
      </main>
      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 p-4 text-center bg-pearl dark:bg-gray-900 w-full">
        <p className="font-roboto text-gray-500 dark:text-gray-400 text-sm">
          © 2025 Tanujairam
        </p>
      </footer>
    </div>
  );
};

export default App;
