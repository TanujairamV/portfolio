import React, { useState } from "react";
import Navbar from "./Components/NavBar";
import ParticlesBackground from "./Components/Particles";
import Footer from "./Components/Footer";
import SkillChip from "./Sections/Skills";
import Projects from "./Sections/Projects";
import Cursor from "./Components/Cursor";
import IntroScreen from "./Components/Intro";
import NowPlaying from "./Components/NowPlaying";
import Hero from "./Sections/Hero";
import {
  experiences,
  education,
  certifications,
  projects,
  Experience,
  Education,
  Certification,
  Project
} from "./Data/Data";
import "./Styles.css";

// Gradient text style helpers
const gradientText = {
  background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const subtleGradientText = {
  background: "linear-gradient(90deg, #fff 40%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const Portfolio: React.FC = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-x-hidden font-sans">
      <IntroScreen />
      <ParticlesBackground />
      <Cursor />
      <Navbar />

      <main
        className="relative z-10 w-full max-w-5xl mx-auto pt-24 pb-16 px-4 md:px-8 flex flex-col gap-10"
      >
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
          <div>
            <SkillChip />
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-16">
          <div>
            <span
              className="text-2xl font-bold mb-4 block font-hatton"
              style={{ ...gradientText, fontFamily: "'Hatton', serif" }}
            >
              Experience
            </span>
          </div>
          {experiences.map((exp: Experience) => (
            <div key={exp.id} className="mb-6">
              <div
                className="text-xl font-semibold font-caviar"
                style={subtleGradientText}
              >
                {exp.title} @ {exp.company}
              </div>
              <div className="text-gray-400 text-sm mb-1 font-caviar">
                {exp.start} — {exp.end || "Present"}
              </div>
              <ul className="list-disc ml-5" style={subtleGradientText}>
                {exp.responsibilities.map((r: string, j: number) => (
                  <li key={j}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section id="education" className="mb-16">
          <div>
            <span
              className="text-2xl font-bold mb-4 block font-hatton"
              style={{ ...gradientText, fontFamily: "'Hatton', serif" }}
            >
              Education
            </span>
          </div>
          {education.map((edu: Education) => (
            <div key={edu.id} className="mb-6">
              <div
                className="text-lg font-semibold font-caviar"
                style={subtleGradientText}
              >
                {edu.degree} - {edu.school}
              </div>
              <div className="text-gray-400 text-sm mb-1 font-caviar">
                {edu.start} — {edu.end}
              </div>
              <div style={subtleGradientText} className="font-caviar">{edu.details}</div>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section id="certifications" className="mb-16">
          <div>
            <span
              className="text-2xl font-bold mb-4 block font-hatton"
              style={{ ...gradientText, fontFamily: "'Hatton', serif" }}
            >
              Certifications
            </span>
          </div>
          <ul className="list-disc ml-5">
            {certifications.map((cert: Certification) => (
              <li key={cert.id} className="mb-2">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-caviar"
                  style={gradientText}
                >
                  {cert.name}
                </a>
                <span className="text-gray-400 ml-2 font-caviar">
                  ({cert.issuer}, {cert.date})
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-16">
          <div>
            <span
              className="text-2xl font-bold mb-4 block font-hatton"
              style={{ ...gradientText, fontFamily: "'Hatton', serif" }}
            >
              Projects
            </span>
          </div>
          {/* The actual project grid is handled in ./Sections/Projects for consistency and DRYness */}
          <Projects
            showAll={showAllProjects}
            setShowAll={setShowAllProjects}
            projects={projects}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
