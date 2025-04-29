import React, { useState, useEffect } from 'react';
import './index.css';

const Portfolio = () => {
  const [currentTime, setCurrentTime] = useState('');

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      }).format(now);
      setCurrentTime(timeString);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen bg-dark-gray text-white font-montserrat">
      {/* Translucent Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-dark-gray/80 backdrop-blur-md py-4 px-6 flex items-center justify-between">
        {/* Logo/Name on Left */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-accent-yellow flex items-center justify-center text-dark-gray text-2xl font-bold transform hover:scale-105 transition-transform">
            J
          </div>
          <span className="text-xl font-bold">John Doe</span>
        </div>

        {/* Navigation Links in Center */}
        <ul className="flex space-x-8 text-lg">
          <li>
            <a
              href="#home"
              className="hover:text-accent-yellow transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-accent-yellow transition-colors duration-300"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-accent-yellow transition-colors duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-accent-yellow transition-colors duration-300"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Current Time on Right */}
        <div className="text-lg font-medium">
          {currentTime}
        </div>
      </nav>

      {/* Rest of Your Portfolio Content */}
      <main className="container mx-auto px-4 py-8">
        <section id="home" className="min-h-screen">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
          <p className="text-lg">Showcasing my creative work with a modern, minimalistic design.</p>
        </section>
        <section id="projects" className="min-h-screen">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Add your project cards here */}
          </div>
        </section>
        <section id="about" className="min-h-screen">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg">A passionate developer and designer.</p>
        </section>
        <section id="contact" className="min-h-screen">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="text-lg">Reach out to collaborate!</p>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
