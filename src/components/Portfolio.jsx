import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Portfolio() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#3A3A3A]">
      {/* Translucent Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-[rgba(26,26,26,0.9)] to-[rgba(58,58,58,0.7)] backdrop-blur-md"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo and Name */}
          <a
            href="#home"
            className="text-2xl font-montserrat font-bold text-text-primary flex items-center gap-2"
            aria-label="Tanujairam Home"
          >
            <span className="text-accent-yellow">T</span>Tanujairam
          </a>

          {/* Navigation Links (Desktop) */}
          <ul className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-text-primary font-inter text-lg hover:text-accent-yellow hover:scale-105 transition-all duration-300 relative group"
                  aria-label={link.name}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-yellow group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Current Time */}
          <div className="text-text-primary font-inter text-lg" aria-live="polite">
            {time}
          </div>

          {/* Hamburger Menu (Mobile) */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.ul
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-br from-[rgba(26,26,26,0.9)] to-[rgba(58,58,58,0.7)] backdrop-blur-md absolute top-16 left-0 right-0 flex flex-col items-center py-4"
          >
            {navLinks.map((link) => (
              <li key={link.name} className="py-2">
                <a
                  href={link.href}
                  className="text-text-primary font-inter text-lg hover:text-accent-yellow"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={link.name}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </motion.nav>

      {/* Theme Toggle */}
      <div className="fixed top-20 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <motion.div
        id="home"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section w-[90%] md:w-[600px] mx-auto mt-28 flex flex-col items-center text-center text-text-primary"
        role="banner"
        aria-label="Portfolio introduction"
      >
        <h1 className="text-4xl md:text-5xl font-bold font-inter mb-4">
          Hey, I'm Tanujairam
        </h1>
        <p className="text-lg mb-6 text-text-secondary font-inter">
          Designer. Creator. Innovator.
        </p>
        <div className="flex gap-4 mb-6">
          <a href="#projects" className="btn-primary" aria-label="View my projects">
            See Projects
          </a>
          <a href="#contact" className="btn-secondary" aria-label="Contact me">
            Contact Me
          </a>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/tanujairam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <svg
              className="w-6 h-6 text-text-primary hover:text-accent-yellow transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49v-1.71c-2.78.6-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.564 9.564 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.56.84.56 1.69v2.5c0 .27.16.59.67.5A10.013 10.013 0 0022 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/tanujairam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <svg
              className="w-6 h-6 text-text-primary hover:text-accent-yellow transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9.36h3.41v1.52h.05c.48-.91 1.65-1.87 3.39-1.87 3.62 0 4.29 2.38 4.29 5.48v6.96zM5.34 7.83c-1.15 0-2.08-.93-2.08-2.08s.93-2.08 2.08-2.08 2.08.93 2.08 2.08-.93 2.08-2.08 2.08zm1.78 12.62H3.56V9.36h3.56v11.09zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
            </svg>
          </a>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="section w-[90%] md:w-[800px] mx-auto text-text-primary"
        aria-label="About"
      >
        <h2 className="text-3xl font-bold font-inter text-center mb-6">About Me</h2>
        <p className="text-lg text-text-secondary font-inter text-center">
          I'm a passionate developer and designer with a focus on creating intuitive and visually stunning web experiences. My expertise spans React, Tailwind CSS, and modern JavaScript frameworks.
        </p>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="section w-[90%] md:w-[800px] mx-auto text-text-primary"
        aria-label="Projects"
      >
        <h2 className="text-3xl font-bold font-inter text-center mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-card-bg rounded-lg hover:shadow-lg hover:shadow-accent-yellow/20 transition-shadow">
            <h3 className="text-xl font-semibold font-inter mb-2">Project 1</h3>
            <p className="text-text-secondary font-inter mb-4">
              A web application built with React and Node.js, showcasing modern UI/UX.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-yellow hover:underline font-inter"
            >
              View on GitHub
            </a>
          </div>
          <div className="p-6 bg-card-bg rounded-lg hover:shadow-lg hover:shadow-accent-yellow/20 transition-shadow">
            <h3 className="text-xl font-semibold font-inter mb-2">Project 2</h3>
            <p className="text-text-secondary font-inter mb-4">
              A mobile app developed with Flutter, focusing on performance.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-yellow hover:underline font-inter"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="section w-[90%] md:w-[800px] mx-auto mb-10 text-text-primary"
        aria-label="Contact"
      >
        <h2 className="text-3xl font-bold font-inter text-center mb-6">Contact</h2>
        <form
          className="flex flex-col gap-4 max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Form submission placeholder');
          }}
        >
          <input
            type="text"
            placeholder="Name"
            className="p-2 rounded bg-card-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-yellow font-inter"
            aria-label="Name"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded bg-card-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-yellow font-inter"
            aria-label="Email"
            required
          />
          <textarea
            placeholder="Message"
            rows="4"
            className="p-2 rounded bg-card-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-yellow font-inter"
            aria-label="Message"
            required
          ></textarea>
          <button type="submit" className="btn-primary font-inter">
            Send Message
          </button>
        </form>
      </motion.section>
    </div>
  );
}
