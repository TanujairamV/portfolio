import { motion } from 'framer-motion';
import { FaHome, FaUser, FaTools, FaProjectDiagram } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState("11:23");
  const [period, setPeriod] = useState("pm");
  const [isVisible, setIsVisible] = useState(false);

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
    const interval = setInterval(fetchTime, 60000); // Update time every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.nav
      className="fixed top-6 w-full max-w-4xl mx-auto px-4 md:px-6 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between bg-black/20 backdrop-blur-2xl border border-white/30 rounded-3xl py-2 px-3 shadow-lg hover:scale-[1.01] transition-transform duration-300">
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
          <div className="hidden md:block text-sm text-gray-200">
            {currentTime} <sup className="text-[10px]">{period}</sup>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
