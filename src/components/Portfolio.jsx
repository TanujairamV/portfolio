import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Portfolio() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Time update
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Load dark mode preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }

    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', !isDarkMode);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    section.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-text-primary">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md shadow-sm">
          <div className="container mx-auto px-4 flex items-center justify-between h-16">
            <a
              href="#home"
              className="text-2xl font-dancing text-text-primary"
              onClick={(e) => handleNavClick(e, '#home')}
              aria-label="Tanu Home"
            >
              Tanu
            </a>

            <ul className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-text-primary font-poppins text-base hover:text-accent-purple hover:scale-105 transition-all duration-300 relative group"
                    aria-label={link.name}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-purple group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="text-text-primary hover:text-accent-purple"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <div className="text-text-primary font-poppins text-base" aria-live="polite">
                {time}
              </div>
            </div>

            <button
              className="md:hidden text-text-primary focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <motion.ul
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background/90 backdrop-blur-md absolute top-16 left-0 right-0 flex flex-col items-center py-4 shadow-sm"
            >
              {navLinks.map((link) => (
                <li key={link.name} className="py-2">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-text-primary font-poppins text-base hover:text-accent-purple"
                    aria-label={link.name}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </nav>

        {/* Hero Section */}
        <motion.section
          id="home"
          className="min-h-screen flex items-center justify-center text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <h1 className="text-5xl font-poppins font-bold text-text-primary mb-2">
              Tanu
            </h1>
            <p className="text-xl font-inter text-text-secondary">
              Student | Developer
            </p>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-poppins font-bold text-text-primary text-center mb-8">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card-bg p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-poppins font-semibold text-text-primary mb-2">
                  Project 1
                </h3>
                <p className="text-base font-inter text-text-secondary mb-4">
                  A web application built with React and Node.js.
                </p>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-purple hover:underline font-inter"
                >
                  View on GitHub
                </a>
              </div>
              <div className="bg-card-bg p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-poppins font-semibold text-text-primary mb-2">
                  Project 2
                </h3>
                <p className="text-base font-inter text-text-secondary mb-4">
                  A mobile app developed with Flutter.
                </p>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-purple hover:underline font-inter"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          className="py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-poppins font-bold text-text-primary text-center mb-8">
              Skills
            </h2>
            <div className="bg-card-bg p-6 rounded-lg shadow-md">
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-base font-inter text-text-primary">
                <li>React</li>
                <li>Node.js</li>
                <li>JavaScript</li>
                <li>Tailwind CSS</li>
                <li>Flutter</li>
                <li>Git</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-poppins font-bold text-text-primary text-center mb-8">
              About Me
            </h2>
            <div className="bg-card-bg p-6 rounded-lg shadow-md">
              <p className="text-base font-inter text-text-secondary">
                I'm a passionate student and developer with a focus on creating intuitive and visually appealing web and mobile applications. I love exploring new technologies and building projects that solve real-world problems.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-poppins font-bold text-text-primary text-center mb-8">
              Contact
            </h2>
            <div className="bg-card-bg p-6 rounded-lg shadow-md max-w-md mx-auto">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Form submission placeholder');
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="p-2 rounded bg-input-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-purple font-inter"
                  aria-label="Name"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 rounded bg-input-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-purple font-inter"
                  aria-label="Email"
                  required
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="p-2 rounded bg-input-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-purple font-inter"
                  aria-label="Message"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="btn-primary font-inter"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
