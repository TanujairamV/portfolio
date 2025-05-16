import { motion } from "framer-motion";
import { FaHome, FaUser, FaTools, FaProjectDiagram } from "react-icons/fa";
import { useState, useEffect } from "react";

const navItems = [
  { href: "#hero", label: "Home", icon: <FaHome size={18} /> },
  { href: "#about", label: "About", icon: <FaUser size={18} /> },
  { href: "#skills", label: "Skills", icon: <FaTools size={18} /> },
  { href: "#projects", label: "Projects", icon: <FaProjectDiagram size={18} /> },
];

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState("12:00");
  const [period, setPeriod] = useState("am");
  const [isVisible, setIsVisible] = useState(false);

  // Real-time clock
  useEffect(() => {
    const updateClock = () => {
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

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Delay navbar visibility after intro
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl px-2"
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between bg-black/30 backdrop-blur-xl border border-white/20 rounded-full py-2 px-4 shadow-lg">
        {/* Brand */}
        <a
          href="/"
          className="text-base md:text-lg font-style-script text-white font-semibold hover:scale-110 transition-transform duration-200"
        >
          Tanu
        </a>

        {/* Navigation */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-white hover:text-accent bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile icons */}
          <div className="flex md:hidden items-center gap-3">
            {navItems.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white hover:text-accent transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Clock */}
          <div className="hidden md:block text-xs text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {currentTime} <sup className="text-[10px]">{period}</sup>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
