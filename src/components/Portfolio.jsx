import { useState, useEffect, useMemo, Component } from 'react';
import { motion } from 'framer-motion';
import particlesJS from 'particles.js';
import Scrambler from './Scrambler';
import Cursor from './Cursor';
import NavBar from './NavBar';
import ContactForm from './ContactForm';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  // Detect mobile devices
  useEffect(() => {
    const handleResize = () => {
      const newMobile = window.innerWidth <= 768;
      setIsMobile(newMobile);
      console.log('Portfolio: Window resized, isMobile:', newMobile, 'Width:', window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main effect for time, theme, particles, and loader
  useEffect(() => {
    console.log('Portfolio: useEffect running for main setup');
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    const savedMode = localStorage.getItem('darkMode');
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedMode ? savedMode === 'true' : systemDarkMode;
    setIsDarkMode(initialDarkMode);
    console.log('Portfolio: Initial theme:', initialDarkMode ? 'dark' : 'light', 'System prefers dark:', systemDarkMode);
    document.documentElement.classList.toggle('dark', initialDarkMode);
    try {
      console.log('Portfolio: Initializing particles.js');
      particlesJS('particles-js', particleConfigs[initialDarkMode ? 'dark' : 'light']);
      document.getElementById('particles-js').style.backgroundColor = initialDarkMode ? '#100b16' : '#F5F3FF';
    } catch (error) {
      console.error('Portfolio: Particles.js initialization failed:', error);
    }

    console.log('Portfolio: Requesting fullscreen');
    document.documentElement.requestFullscreen().catch((err) => console.log('Portfolio: Fullscreen error:', err));
    setTimeout(() => {
      console.log('Portfolio: Hiding loader');
      setIsLoading(false);
      document.exitFullscreen().catch((err) => console.log('Portfolio: Exit fullscreen error:', err));
    }, 3000);

    return () => {
      console.log('Portfolio: Cleaning up main useEffect');
      clearInterval(timer);
    };
  }, [particleConfigs]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative">
        {/* Particles Background */}
        <div id="particles-js" className="absolute inset-0 z-0"></div>

        {/* Loader */}
        {isLoading && (
          <div id="loader" className="fixed inset-0 bg-black flex items-center justify-center z-[10000] transition-opacity duration-500">
            <Scrambler text="Tanujairam" />
          </div>
        )}

        {/* Frosted Background Wrapper */}
        <div className="frosted-bg min-h-screen text-text-primary relative z-10">
          {/* Custom Cursor */}
          <Cursor isMobile={isMobile} isDarkMode={isDarkMode} />

          {/* Navigation Bar */}
          <NavBar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            particleConfigs={particleConfigs}
            time={time}
          />

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
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
                }}
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
              <ContactForm isDarkMode={isDarkMode} />
            </div>
          </motion.section>
        </div>
      </div>
    </ErrorBoundary>
  );
}
