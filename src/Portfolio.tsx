// app/Portfolio.tsx

"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaHome, FaInfoCircle, FaLightbulb, FaMoon, FaMusic, FaPhone, FaProjectDiagram } from "react-icons/fa";
import { motion } from "framer-motion";
import clsx from "clsx"; // optional, for cleaner classNames

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // LocalStorage-powered theme persistence
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Time updater
  const getTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return {
      time: `${formattedHours}:${formattedMinutes}`,
      period,
    };
  };

  const [{ time: currentTime, period }, setTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Last.fm track fetch
  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch("/api/lastfm");
        const data = await response.json();
        setTrack(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTrack();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
      <nav className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-xl font-bold">Tanujairam</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle Theme"
            className="text-xl focus:outline-none p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
          >
            {theme === "dark" ? <FaLightbulb /> : <FaMoon />}
          </button>
          <span className="text-sm font-mono">
            {currentTime} {period}
          </span>
        </div>
      </nav>

      {/* Desktop Nav */}
      <div className="hidden md:flex justify-center space-x-6 mt-6">
        <a href="#home" className="hover:underline">Home</a>
        <a href="#about" className="hover:underline">About</a>
        <a href="#projects" className="hover:underline">Projects</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </div>

      {/* Mobile Nav */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden flex justify-around bg-gray-100 dark:bg-gray-800 py-2 border-t border-gray-300 dark:border-gray-700">
        <a href="#home" className="p-2" aria-label="Home"><FaHome size={20} /></a>
        <a href="#about" className="p-2" aria-label="About"><FaInfoCircle size={20} /></a>
        <a href="#projects" className="p-2" aria-label="Projects"><FaProjectDiagram size={20} /></a>
        <a href="#contact" className="p-2" aria-label="Contact"><FaPhone size={20} /></a>
      </div>

      {/* Sections */}
      <motion.section id="home" className="p-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-semibold mb-4">Welcome to my portfolio</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">Explore my work and projects.</p>
      </motion.section>

      <motion.section id="about" className="p-8 bg-gray-50 dark:bg-gray-800" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-semibold mb-4">About Me</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          I’m a high school student and open-source enthusiast. I build tools, automate workflows, and maintain ROMs. I drink way too much coffee ☕.
        </p>
      </motion.section>

      <motion.section id="projects" className="p-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-semibold mb-4">Projects</h2>
        <p className="text-gray-500">Projects are being added soon. Stay tuned!</p>
      </motion.section>

      <motion.section id="contact" className="p-8 bg-gray-50 dark:bg-gray-800" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Reach out to me via <a href="mailto:tanujairam.v@gmail.com" className="underline">email</a> or check out my GitHub below.
        </p>
        <a href="https://github.com/TanujairamV" className="inline-flex items-center mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition">
          <FaGithub className="mr-2" /> GitHub
        </a>
      </motion.section>

      <motion.section className="p-8 bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-semibold mb-4">Now Playing</h2>
        {loading ? (
          <p className="animate-pulse text-gray-400">Fetching current track...</p>
        ) : track ? (
          <div className="flex items-center space-x-4">
            <img
              src={track.image || "/placeholder.png"}
              alt="Album Art"
              className="w-16 h-16 rounded"
              onError={(e) => (e.currentTarget.src = "/placeholder.png")}
            />
            <div>
              <p className="font-semibold">{track.name || "Unknown Track"}</p>
              <p className="text-sm text-gray-500">by {track.artist || "Unknown Artist"}</p>
              <a href={track.url || "#"} className="text-blue-500 underline text-sm mt-1 inline-block" target="_blank" rel="noopener noreferrer">
                Listen on Last.fm
              </a>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Not listening to anything right now.</p>
        )}
      </motion.section>
    </div>
  );
}
