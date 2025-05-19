import React from "react";
import Navbar from "./Components/NavBar";
import ParticlesBackground from "./Components/Particles";
import Footer from "./Components/Footer";
import SkillChip from "./Sections/Skills";
import Projects from "./Sections/Projects";
import Cursor from "./Components/Cursor";
import IntroScreen from "./Components/Intro";
import NowPlaying from "./Components/NowPlaying";
import Hero from "./Sections/Hero";
import Education from "./Sections/Education";
import Experience from "./Sections/Experience";
import Certificates from "./Sections/Certificates";
import "./Styles.css";

// Gradient text style helpers
const gradientText = {
  background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const divider = (
  <hr className="my-12 border-t-2 border-yellow-400 opacity-30" />
);

const Portfolio: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-x-hidden font-sans">
      <IntroScreen />
      <ParticlesBackground />
      <Cursor />
      <Navbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto pt-24 pb-16 px-4 md:px-8 flex flex-col gap-10">
        {/* Hero Section */}
        <Hero />

        {/* Now Playing */}
        <div className="flex justify-center mb-12">
          <NowPlaying />
        </div>

        {/* Skills */}
        <section id="skills" className="mb-16">
          <div>
            <span
              className="text-2xl font-bold mb-4 block font-hatton"
              style={{ ...gradientText, fontFamily: "'Hatton', serif" }}
            >
              Skills
            </span>
          </div>
          <SkillChip />
        </section>

        {divider}

        {/* Experience */}
        <Experience />

        {divider}

        {/* Education - Wrapped in extra visible box */}
        <div id="education" className="mb-16">
          <div className="rounded-xl border-2 border-yellow-400/80 bg-black/70 shadow-lg p-6">
            <Education />
          </div>
        </div>

        {divider}

        {/* Certificates */}
        <Certificates />

        {divider}

        {/* Projects */}
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
