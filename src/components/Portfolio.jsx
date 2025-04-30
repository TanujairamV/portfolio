import { useState, useEffect, useRef, useMemo, Component } from 'react';
import { motion } from 'framer-motion';
import particlesJS from 'particles.js';

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-center text-2xl mt-10">Something went wrong. Please try refreshing.</h1>;
    }
    return this.props.children;
  }
}

export default function Portfolio() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorHovering, setIsCursorHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const loaderTextRef = useRef(null);

  const particleConfigs = useMemo(() => ({
    light: {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#7C3AED" },
        shape: { type: "circle" },
        opacity: { value: 0.6, anim: { enable: true, speed: 1, opacity_min: 0.3, sync: false } },
        size: {
          value: 3.5,
          anim: { enable: true, speed: 2, size_min: 1.5, sync: true },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#7C3AED",
          opacity: 0.5,
          width: 0.8,
        },
        move: {
          enable: true,
          speed: 2.5,
          attract: { enable: true, rotateX: 1200, rotateY: 800 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "bubble" },
          resize: true,
        },
        modes: {
          bubble: { distance: 350, size: 6, duration: 0.8, opacity: 0.7, speed: 2 },
        },
      },
      retina_detect: true,
    },
    dark: {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#b392ac" },
        shape: {
          type: "polygon",
          polygon: { nb_sides: 6 },
        },
        opacity: { value: 0.75 },
        size: {
          value: 2,
          anim: { enable: true, speed: 5, size_min: 1, sync: true },
        },
        line_linked: {
          enable: true,
          distance: 125,
          color: "#ffffff",
          opacity: 0.75,
          width: 0.5,
        },
        move: {
          enable: true,
          speed: 5,
          attract: { enable: true, rotateX: 1500, rotateY: 900 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "bubble" },
          resize: true,
        },
        modes: {
          grab: { distance: 300, line_linked: { opacity: 1 } },
          bubble: { distance: 300, size: 5, duration: 0.75, opacity: 8, speed: 3 },
        },
      },
      retina_detect: true,
    },
  }), []);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

  const animateLoaderText = (element) => {
    console.log('Animating loader text');
    const value = element.dataset.value;
    let iteration = 0;

    const interval = setInterval(() => {
      element.innerText = value
        .split("")
        .map((_, index) => {
          if (index < iteration) return value[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= value.length) clearInterval(interval);
      iteration += 3 / value.length;
    }, 30);
  };

  // Cursor movement logic
  useEffect(() => {
    if (isMobile) return;

    console.log('Setting up cursor movement');
    let rafId = null;

    const handleMouseMove = (e) => {
      const scrollY = window.scrollY || window.pageYOffset;
      const newX = e.clientX;
      const newY = e.clientY + scrollY;
      setCursorPosition({ x: newX, y: newY });
      console.log('Mouse moved:', { x: newX, y: newY, scrollY });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setCursorPosition((prev) => {
        const newY = prev.y + scrollY - (window.scrollY || window.pageYOffset);
        console.log('Scrolled:', { x: prev.x, y: newY, scrollY });
        return { x: prev.x, y: newY };
      });
    };

    const updateCursor = () => {
      rafId = requestAnimationFrame(updateCursor);
    };

    const handleMouseEnter = () => setIsCursorHovering(true);
    const handleMouseLeave = () => setIsCursorHovering(false);

    document.body.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    const hoverElements = document.querySelectorAll('a, button');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    updateCursor();

    return () => {
      console.log('Cleaning up cursor movement');
      cancelAnimationFrame(rafId);
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile]);

  // Detect mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main effect for time, theme, particles, and loader
  useEffect(() => {
    console.log('useEffect running for main setup');
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    const savedMode = localStorage.getItem('darkMode');
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedMode ? savedMode === 'true' : systemDarkMode;
    setIsDarkMode(initialDarkMode);
    console.log('Initial theme:', initialDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', initialDarkMode);
    try {
      console.log('Initializing particles.js');
      particlesJS('particles-js', particleConfigs[initialDarkMode ? 'dark' : 'light']);
      document.getElementById('particles-js').style.backgroundColor = initialDarkMode ? '#100b16' : '#F5F3FF';
    } catch (error) {
      console.error('Particles.js initialization failed:', error);
    }

    console.log('Requesting fullscreen');
    document.documentElement.requestFullscreen().catch((err) => console.log('Fullscreen error:', err));
    if (loaderTextRef.current) {
      setTimeout(() => animateLoaderText(loaderTextRef.current), 500);
    }
    setTimeout(() => {
      console.log('Hiding loader');
      setIsLoading(false);
      document.exitFullscreen().catch((err) => console.log('Exit fullscreen error:', err));
    }, 3000);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      if (!localStorage.getItem('darkMode')) {
        const newMode = e.matches;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
        try {
          document.getElementById('particles-js').innerHTML = '';
          particlesJS('particles-js', particleConfigs[newMode ? 'dark' : 'light']);
          document.getElementById('particles-js').style.backgroundColor = newMode ? '#100b16' : '#F5F3FF';
          console.log('System theme changed to:', newMode ? 'dark' : 'light');
        } catch (error) {
          console.error('Particles.js reinitialization failed:', error);
        }
      }
    };
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      console.log('Cleaning up main useEffect');
      clearInterval(timer);
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [particleConfigs]);

  const toggleDarkMode = () => {
    console.log('Toggling dark mode, current state:', isDarkMode);
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.style.setProperty('--frosted-bg', newMode ? 'rgba(26, 26, 26, 0.85)' : 'rgba(255, 255, 255, 0.92)');
    document.documentElement.style.setProperty('--text-primary', newMode ? '#FFFFFF' : '#000000');
    document.body.style.color = newMode ? '#FFFFFF' : '#000000';
    try {
      const particlesDiv = document.getElementById('particles-js');
      particlesDiv.innerHTML = '';
      particlesJS('particles-js', particleConfigs[newMode ? 'dark' : 'light']);
      particlesDiv.style.backgroundColor = newMode ? '#100b16' : '#F5F3FF';
      console.log('Particles.js reinitialized for theme:', newMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Particles.js toggle failed:', error);
    }
    console.log('New dark mode state:', newMode, 'Class list:', document.documentElement.classList.toString());
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
    console.log('Navigated to:', href);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative">
        {/* Particles Background */}
        <div id="particles-js" className="absolute inset-0 z-0"></div>

        {/* Loader */}
        {isLoading && (
          <div id="loader" className="fixed inset-0 bg-black flex items-center justify-center z-[10000] transition-opacity duration-500">
            <h1
              id="loader-text"
              ref={loaderTextRef}
              data-value="Tanu"
              className="text-6xl font-poppins font-bold text-white"
            >
              Tanu
            </h1>
          </div>
        )}

        {/* Frosted Background Wrapper */}
        <div className="frosted-bg min-h-screen text-text-primary relative z-10">
          {/* Custom Cursor */}
          {!isMobile && (
            <div
              className={`follow fixed top-0 left-0 pointer-events-none z-[10001] rounded-full transition-all duration-100 ease-out will-change-transform ${
                isCursorHovering ? 'w-16 h-16 border-2 border-accent-purple' : 'w-12 h-12 border border-[rgba(128,128,128,0.3)]'
              }`}
              style={{
                transform: `translate(${cursorPosition.x - (isCursorHovering ? 32 : 24)}px, ${cursorPosition.y - (isCursorHovering ? 32 : 24)}px)`,
                mixBlendMode: 'difference',
                background: 'transparent',
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: isDarkMode ? '#FFFFFF' : '#000000', mixBlendMode: 'difference' }}
              />
            </div>
          )}

          {/* Navigation Bar */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg shadow-md">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <a
                href="#home"
                className="text-3xl font-dancing font-bold text-text-primary hover:text-accent-purple transition-colors duration-300"
                onClick={(e) => handleNavClick(e, '#home')}
                aria-label="Tanu Home"
              >
                Tanu
              </a>

              <ul className="hidden md:flex space-x-8 items-center">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-text-primary font-poppins text-lg hover:text-accent-purple hover:scale-110 transition-all duration-300 relative group"
                      aria-label={link.name}
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent-purple group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-6">
                <button
                  onClick={toggleDarkMode}
                  className="text-text-primary hover:text-accent-purple transition-colors duration-300"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
                <div className="text-text-primary font-poppins text-lg" aria-live="polite">
                  {time}
                </div>
              </div>

              <button
                className="md:hidden text-text-primary focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="md:hidden bg-background/95 backdrop-blur-lg absolute top-16 left-0 right-0 flex flex-col items-center py-6 shadow-md"
              >
                {navLinks.map((link) => (
                  <li key={link.name} className="py-3">
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-text-primary font-poppins text-lg hover:text-accent-purple transition-colors duration-300"
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
            className="min-h-screen flex items-center justify-center text-center px-6 pt-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className={`card ${isDarkMode ? 'box-blur' : 'card-light'} p-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}>
              <h1 className="text-6xl sm:text-7xl font-poppins font-extrabold text-text-primary mb-4">
                Tanu
              </h1>
              <p className="text-2xl font-inter text-text-secondary mb-8">
                Student | Developer | Innovator
              </p>
              <div className="flex justify-center gap-6 mb-8">
                <a
                  href="https://github.com/tanujairam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="text-text-primary hover:text-accent-purple transition-colors duration-300 transform hover:scale-110"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49v-1.71c-2.78.6-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.564 9.564 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.56.84.56 1.69v2.5c0 .27.16.59.67.5A10.013 10.013 0 0022 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/tanujairam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="text-text-primary hover:text-accent-purple transition-colors duration-300 transform hover:scale-110"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9.36h3.41v1.52h.05c.48-.91 1.65-1.87 3.39-1.87 3.62 0 4.29 2.38 4.29 5.48v6.96zM5.34 7.83c-1.15 0-2.08-.93-2.08-2.08s.93-2.08 2.08-2.08 2.08.93 2.08 2.08-.93 2.08-2.08 2.08zm1.78 12.62H3.56V9.36h3.56v11.09zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
                  </svg>
                </a>
              </div>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, '#projects')}
                className="btn-primary font-inter text-lg px-6 py-3"
                aria-label="View my projects"
              >
                View My Work
              </a>
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            id="projects"
            className="py-20 px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto">
              <h2 className="text-5xl font-poppins font-extrabold text-text-primary text-center mb-12">
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`card ${isDarkMode ? 'box-blur' : 'card-light'} p-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                  <h3 className="text-2xl font-poppins font-bold text-text-primary mb-3">
                    Project 1
                  </h3>
                  <p className="text-lg font-inter text-text-secondary mb-4">
                    A web application built with React and Node.js to streamline user workflows.
                  </p>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-purple hover:underline font-inter text-lg"
                  >
                    View on GitHub
                  </a>
                </div>
                <div className={`card ${isDarkMode ? 'box-blur' : 'card-light'} p-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                  <h3 className="text-2xl font-poppins font-bold text-text-primary mb-3">
                    Project 2
                  </h3>
                  <p className="text-lg font-inter text-text-secondary mb-4">
                    A mobile app developed with Flutter for seamless cross-platform performance.
                  </p>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-purple hover:underline font-inter text-lg"
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
            className="py-20 px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto">
              <h2 className="text-5xl font-poppins font-extrabold text-text-primary text-center mb-12">
                Skills
              </h2>
              <div className={`card ${isDarkMode ? 'box-blur' : 'card-light'} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-lg font-inter text-text-primary">
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
            className="py-20 px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto">
              <h2 className="text-5xl font-poppins font-extrabold text-text-primary text-center mb-12">
                About Me
              </h2>
              <div className={`card ${isDarkMode ? 'box-blur' : 'card-light'} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}>
                <p className="text-lg font-inter text-text-secondary">
                  I'm a passionate student and developer with a focus on creating intuitive and visually appealing web and mobile applications. I love exploring new technologies and building projects that solve real-world problems.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            id="contact"
            className="py-20 px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto">
              <h2 className="text-5xl font-poppins font-extrabold text-text-primary text-center mb-12">
                Contact
              </h2>
              <div className={`card ${isDarkMode ? 'box-blur' : 'card-light'} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 max-w-lg mx-auto`}>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Form submission placeholder');
                  }}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-3 rounded-lg bg-input-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-purple font-inter text-lg"
                    aria-label="Name"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-3 rounded-lg bg-input-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-purple font-inter text-lg"
                    aria-label="Email"
                    required
                  />
                  <textarea
                    placeholder="Message"
                    rows="5"
                    className="p-3 rounded-lg bg-input-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-purple font-inter text-lg"
                    aria-label="Message"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="btn-primary font-inter text-lg py-3"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </ErrorBoundary>
  );
}
