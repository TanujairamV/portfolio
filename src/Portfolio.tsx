import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaTools, FaProjectDiagram, FaSun, FaMoon } from 'react-icons/fa';
import { fetchRecentTrack, LastFMTrack } from './lastFmApi';

function Portfolio() {
  // Theme state (light/dark mode)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Navbar states
  const [currentTime, setCurrentTime] = useState("11:33");
  const [period, setPeriod] = useState("pm");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Last.fm states
  const [track, setTrack] = useState<LastFMTrack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Scroll state for navbar animation
  const [isScrolled, setIsScrolled] = useState(false);

  // Fetch current time
  useEffect(() => {
    const fetchTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const periodValue = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedTime = `${formattedHours}:${formattedMinutes}`;
      setCurrentTime(formattedTime);
      setPeriod(periodValue);
    };

    fetchTime();
    const interval = setInterval(fetchTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Delay navbar visibility for intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNavVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Fetch Last.fm track
  useEffect(() => {
    const loadTrack = async () => {
      try {
        const trackData = await fetchRecentTrack();
        setTrack(trackData);
        setError(null);
        setImageLoaded(false); // Reset image loading state
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error fetching Last.fm data:', errorMessage);
        setError('Unable to fetch track data');
      }
    };

    loadTrack();
    const interval = setInterval(loadTrack, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Handle scroll for navbar animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-black text-white' : 'bg-gradient-to-br from-gray-100 to-white text-gray-900'}`}>
      {/* Navbar */}
      <motion.nav
        className={`fixed top-6 w-full max-w-3xl mx-auto px-4 md:px-6 z-50 transition-all duration-300 ${isScrolled ? 'bg-opacity-90 backdrop-blur-lg shadow-xl' : 'bg-opacity-20 backdrop-blur-2xl'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={isNavVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between bg-black/20 border border-white/30 rounded-3xl py-2 px-3 shadow-lg hover:scale-[1.01] transition-transform duration-300">
          <a
            href="/"
            className="text-xl font-semibold tracking-wide text-white hover:text-blue-300 transition-colors duration-200"
          >
            Tanu
          </a>
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="flex items-center space-x-4 md:space-x-6">
              <a
                href="#hero"
                className="hidden md:inline text-sm text-gray-200 hover:text-blue-300 transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#about"
                className="hidden md:inline text-sm text-gray-200 hover:text-blue-300 transition-colors duration-200"
              >
                About
              </a>
              <a
                href="#skills"
                className="hidden md:inline text-sm text-gray-200 hover:text-blue-300 transition-colors duration-200"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="hidden md:inline text-sm text-gray-200 hover:text-blue-300 transition-colors duration-200"
              >
                Projects
              </a>
              <a href="#hero" className="md:hidden text-gray-200 hover:text-blue-300 transition-colors duration-200">
                <FaHome size={14} />
              </a>
              <a href="#about" className="md:hidden text-gray-200 hover:text-blue-300 transition-colors duration-200">
                <FaUser size={14} />
              </a>
              <a href="#skills" className="md:hidden text-gray-200 hover:text-blue-300 transition-colors duration-200">
                <FaTools size={14} />
              </a>
              <a href="#projects" className="md:hidden text-gray-200 hover:text-blue-300 transition-colors duration-200">
                <FaProjectDiagram size={14} />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-sm text-gray-200">
                {currentTime} <sup className="text-[10px]">{period}</sup>
              </div>
              <button
                onClick={toggleTheme}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FaSun size={14} className="text-yellow-400" /> : <FaMoon size={14} className="text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          id="hero"
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Welcome to My Portfolio
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Hi, I'm Tanu. I'm a developer passionate about creating amazing web experiences.
          </p>
        </motion.section>

        {/* Now Playing Section */}
        <motion.section
          id="now-playing"
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="lastfm-section bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Now Playing</h3>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : !track ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 rounded-lg animate-pulse">
                      <p className="text-gray-400 text-xs">Loading...</p>
                    </div>
                  )}
                  <img
                    src={track.image}
                    alt={`${track.name} by ${track.artist}`}
                    className={`w-20 h-20 object-cover rounded-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      setImageLoaded(true);
                    }}
                  />
                </div>
                <div>
                  <p className="text-lg font-medium">{track.name}</p>
                  <p className="text-gray-400">by {track.artist}</p>
                  <p className="text-sm text-gray-500">Album: {track.album}</p>
                  <a
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    Listen on Last.fm
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-semibold mb-4">About Me</h2>
          <p className={`text-gray-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            I’m a full-stack developer with experience in React, TypeScript, Node.js, and more. I love building
            intuitive and performant applications that solve real-world problems. My journey in tech started with a curiosity
            for how things work, and now I’m dedicated to crafting seamless digital experiences.
          </p>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-semibold mb-4">Skills</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
            <li className="bg-gray-800 p-3 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200">JavaScript</li>
            <li className="bg-gray-800 p-3 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200">React</li>
            <li className="bg-gray-800 p-3 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200">TypeScript</li>
            <li className="bg-gray-800 p-3 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200">Node.js</li>
            <li className="bg-gray-800 p-3 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200">Tailwind CSS</li>
            <li className="bg-gray-800 p-3 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200">Express</li>
            <li className="bg-gray-800 p-3 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200">Git</li>
            <li className="bg-gray-800 p-3 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200">Docker</li>
          </ul>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-semibold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-medium mb-2">Last.fm Proxy</h3>
              <p className="text-gray-300 mb-2">
                A Node.js proxy server to fetch and display my currently playing music from Last.fm, deployed on Koyeb.
              </p>
              <a
                href="https://inquisitive-gamefowl-tanujairam-tg-e1360444.koyeb.app/api/lastfm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
              >
                View API
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-medium mb-2">Portfolio Website</h3>
              <p className="text-gray-300 mb-2">
                This very website, built with React, TypeScript, and Tailwind CSS to showcase my work and skills.
              </p>
              <a
                href="#"
                className="text-blue-400 hover:underline text-sm"
              >
                You’re already here!
              </a>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className={`text-gray-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            I’m always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="mt-4 flex space-x-4">
            <a
              href="mailto:your.email@example.com"
              className="text-blue-400 hover:underline"
            >
              Email Me
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Tanu. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Portfolio;
