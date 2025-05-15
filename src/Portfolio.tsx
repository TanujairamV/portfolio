import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import IntroScreen from './IntroScreen';
import NavBar from './NavBar';
import Cursor from './Cursor';
import { ThemeProvider } from './context/ThemeContext';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaMusic } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { fetchListeningData, TrackData } from './utils/lastFmApi';

const Portfolio = () => {
  const form = useRef<HTMLFormElement>(null);
  const [listeningData, setListeningData] = useState<TrackData>({ 
    track: '', 
    artist: '', 
    isPlaying: false, 
    imageUrl: ''
  });

  useEffect(() => {
    const updateListeningData = async () => {
      const data = await fetchListeningData();
      console.log('Updated Listening Data:', data); // Debug log
      setListeningData(data);
    };

    updateListeningData();
    const interval = setInterval(updateListeningData, 15000);
    return () => clearInterval(interval);
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
        .then(
          () => {
            alert('Message sent successfully!');
            form.current?.reset();
          },
          (error) => {
            alert('Failed to send message: ' + error.text);
          }
        );
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen relative bg-black"> {/* Removed gradient, set to black for stars */}
        <IntroScreen />
        <ParticlesBackground />
        <Cursor />
        <NavBar />
        <main className="container mx-auto px-4 py-12">
          <motion.section
            id="hero"
            className="text-center py-16"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <motion.h1
              className="mb-4 hero-heading bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400"
              initial="hidden"
              animate="visible"
              variants={headingVariants}
            >
              Hi, I'm Tanuj
            </motion.h1>
            <p className="text-subheading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
              A passionate developer building modern web experiences.
            </p>
            <div className="flex justify-center space-x-4 mb-6">
              <a href="https://github.com/TanujairamV" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200">
                <FaInstagram />
              </a>
              <a href="https://facebook.com/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200">
                <FaFacebook />
              </a>
            </div>
            <div className="flex justify-center mb-6">
              <div className="listening-widget bg-background/80 backdrop-blur-md rounded-lg p-4 shadow-lg flex items-center space-x-4 w-full max-w-md">
                <img
                  src={listeningData.imageUrl}
                  alt="Album Art"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-subheading font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
                    Now Listening To
                  </p>
                  <p className="text-lg font-poppins text-foreground font-semibold truncate bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
                    {listeningData.track || 'No Track'}
                  </p>
                  <p className="text-sm text-subheading truncate bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
                    {listeningData.artist || 'No Artist'}
                  </p>
                </div>
                <FaMusic className="text-xl text-subheading" />
              </div>
            </div>
            <button className="material-btn mt-6">Get in Touch</button>
          </motion.section>
          <motion.section
            id="about"
            className="py-16"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h2 className="text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="material-card hover:scale-105 transition-transform duration-300">
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
                  I'm a developer with a focus on React, TypeScript, and Tailwind CSS.
                </p>
              </div>
              <div className="profile-card flex items-center space-x-4">
                <div>
                  <h3 className="text-2xl font-space-grotesk text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
                    Tanuj
                  </h3>
                  <p className="text-sm text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Frontend Developer</p>
                  <p className="text-sm text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Email: tanuj@example.com</p>
                  <p className="text-sm text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Based in: India</p>
                </div>
              </div>
              <div className="material-card p-6">
                <h3 className="text-xl font-space-grotesk mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Contact Me</h3>
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Your Name"
                      className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-subheading"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="Your Email"
                      className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-subheading"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-subheading h-32"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="material-btn w-full">Send Message</button>
                </form>
              </div>
            </div>
          </motion.section>
          <motion.section
            id="projects"
            className="py-16"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h2 className="text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="material-card hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Project 1</h3>
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">A cool project built with modern tech.</p>
              </div>
              <div className="material-card hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Project 2</h3>
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">Another awesome project showcasing my skills.</p>
              </div>
            </div>
          </motion.section>
        </main>
        <footer className="bg-background/80 py-4 text-center">
          <p className="text-subheading bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
            <a href="mailto:tanuj@example.com" className="hover:text-accent">tanuj@example.com</a>
          </p>
          <p className="text-subheading mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 dark:from-white dark:to-gray-400">
            2025 Tanuj. All rights reserved.
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
