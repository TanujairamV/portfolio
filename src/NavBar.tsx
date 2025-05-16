import { motion } from 'framer-motion';
import { FaHome, FaUser, FaTools, FaProjectDiagram } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const NavBar = () => {
  // State to store the current time and period (am/pm)
  const [currentTime, setCurrentTime] = useState("05:19");
  const [period, setPeriod] = useState("pm");

  // State to control navbar visibility after intro screen
  const [isVisible, setIsVisible] = useState(false);

  // Fetch the current time from the user's system on component mount
  useEffect(() => {
    const fetchTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Determine period (am/pm) and convert to 12-hour format
      const periodValue = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed
      const formattedTime = `${formattedHours}:${formattedMinutes}`;

      setCurrentTime(formattedTime);
      setPeriod(periodValue);
    };

    fetchTime();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Delay the navbar appearance until after the intro screen (assumed 2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Delay of 2 seconds to match intro screen duration

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <motion.nav
      className="fixed top-6 w-1/3 mx-auto z-50 px-3 md:px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between bg-black/20 backdrop-blur-2xl border border-white/30 rounded-3xl py-1 px-2 shadow-md hover:scale-[1.01] transition-transform duration-300">
        <a
          href="/"
          className="text-lg md:text-xl font-style-script text-white scale-105 hover:scale-110 transition-transform duration-200 invert-on-hover"
        >
          Tanu
        </a>
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Text links for desktop */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <a
              href="#hero"
              className="hidden md:inline text-xs text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            >
              Home
            </a>
            <a
              href="#about"
              className="hidden md:inline text-xs text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            >
              About
            </a>
            <a
              href="#skills"
              className="hidden md:inline text-xs text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hidden md:inline text-xs text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            >
              Projects
            </a>
            {/* Icons for mobile */}
            <a href="#hero" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
              <FaHome size={12} />
            </a>
            <a href="#about" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
              <FaUser size={12} />
            </a>
            <a href="#skills" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
              <FaTools size={12} />
            </a>
            <a href="#projects" className="md:hidden text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
              <FaProjectDiagram size={12} />
            </a>
          </div>
          {/* Time display - hidden on mobile */}
          <div className="hidden md:block text-xs text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
            {currentTime} <sup className="text-[10px]">{period}</sup>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
