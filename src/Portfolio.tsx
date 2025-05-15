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
  const [listeningData, setListeningData] = useState<TrackData>({ track: '', artist: '', isPlaying: false, imageUrl: '' });

  // Fetch real-time "Now Playing" or "Last Listened" data from Last.fm
  useEffect(() => {
    const updateListeningData = async () => {
      const data = await fetchListeningData();
      setListeningData(data);
    };

    updateListeningData();
    const interval = setInterval(updateListeningData, 15000); // Reduced to 15 seconds for faster updates
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
      <div className="min-h-screen relative">
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
              className="mb-4 hero-heading"
              initial="hidden"
              animate="visible"
              variants={headingVariants}
            >
              Hi, I'm Tanuj
            </motion.h1>
            <p className="text-subheading mb-6">A passionate developer building modern web experiences.</p>
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
                  <p className="text-sm text-subheading font-space-grotesk">
                    {listeningData.isPlaying ? 'Now Listening To' : 'Last Listened'}
                  </p>
                  <p className="text-lg font-poppins text-foreground font-semibold truncate">
                    {listeningData.track && listeningData.artist
                      ? listeningData.track
                      : 'Not listening'}
                  </p>
                  <p className="text-sm text-subheading truncate">
                    {listeningData.artist || ''}
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
            <h2 className="text-center mb-8">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="material-card hover:scale-105 transition-transform duration-300">
                <p>I'm a developer with a focus on React, TypeScript, and Tailwind CSS.</p>
              </div>
              <div className="profile-card flex items-center space-x-4">
                <div>
                  <h3 className="text-2xl font-space-grotesk text-white mb-2">Tanuj</h3>
                  <p className="text-sm text-white/80">Frontend Developer</p>
                  <p className="text-sm text-white/80">Email: tanuj@example.com</p>
                  <p className="text-sm text-white/80">Based in: India</p>
                </div>
              </div>
              <div className="material-card p-6">
                <h3 className="text-xl font-space-grotesk mb-4">Contact Me</h3>
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
            <h2 className="text-center mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="material-card hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl">Project 1</h3>
                <p>A cool project built with modern tech.</p>
              </div>
              <div className="material-card hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl">Project 2</h3>
                <p>Another awesome project showcasing my skills.</p>
              </div>
            </div>
          </motion.section>
        </main>
        <footer className="bg-background/80 py-4 text-center">
          <p className="text-subheading">
            <a href="mailto:tanuj@example.com" className="hover:text-accent">tanuj@example.com</a>
          </p>
          <p className="text-subheading mt-1">2025 Tanuj. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
