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

const sectionHeading = (text: string, icon?: React.ReactNode) => (
  <div className="flex items-center gap-2 mb-6">
    {icon}
    <span
      className="text-2xl font-bold font-hatton"
      style={{ ...gradientText, fontFamily: "'Hatton', serif" }}
    >
      {text}
    </span>
  </div>
);

const Portfolio: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-x-hidden font-sans">
      {/* Intro screen and backgrounds */}
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

        {divider}

        {/* Skills */}
        <section id="skills" className="mb-20">
          {sectionHeading("Skills")}
          <SkillChip />
        </section>

        {divider}

        {/* Experience */}
        <section id="experience" className="mb-20">
          {sectionHeading("Experience")}
          <Experience />
        </section>

        {divider}

        {/* Education */}
        <section id="education" className="mb-20">
          {sectionHeading("Education")}
          <div className="rounded-xl border-2 border-yellow-400/80 bg-black/70 shadow-lg p-6">
            <Education />
          </div>
        </section>

        {divider}

        {/* Certificates */}
        <section id="certificates" className="mb-20">
          {sectionHeading("Certificates")}
          <div className="rounded-xl border-2 border-yellow-400/80 bg-black/70 shadow-lg p-6">
            <Certificates />
          </div>
        </section>

        {divider}

        {/* Projects */}
        <section id="projects" className="mb-20">
          {sectionHeading("Projects")}
          <Projects />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
