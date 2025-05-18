import React, { useState } from "react";
import Navbar from "./NavBar";
import ParticlesBackground from "./ParticlesBackground";
import Footer from "./Footer";
import SkillChip from "./SkillChip";
import ProjectCard from "./ProjectCard";
import AnimatedCursor from "./AnimatedCursor";
import IntroScreen from "./IntroScreen";
import NowListening from "./NowListening";
import Hero from "./Hero";
import {
  experiences,
  education,
  certifications,
  projects,
  Experience,
  Education,
  Certification,
  Project
} from "./data";
import { useFadeInOnScroll } from "./useFadeInOnScroll";
import "./Styles.css"; // updated to use Styles.css

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

  // Fade in hooks for sections
  const mainRef = useFadeInOnScroll<HTMLDivElement>();
  const skillsRef = useFadeInOnScroll<HTMLElement>();
  const experienceRef = useFadeInOnScroll<HTMLElement>();
  const educationRef = useFadeInOnScroll<HTMLElement>();
  const certificationsRef = useFadeInOnScroll<HTMLElement>();
  const projectsRef = useFadeInOnScroll<HTMLElement>();
  const nowListeningRef = useFadeInOnScroll<HTMLDivElement>();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-x-hidden font-sans">
      <IntroScreen />
      <ParticlesBackground />
      <AnimatedCursor />
      <Navbar />

      <main
        ref={mainRef}
        className="relative z-10 w-full max-w-5xl mx-auto pt-24 pb-16 px-4 md:px-8 flex flex-col gap-10 fade-in-up"
      >
        {/* Hero Section */}
        <Hero />

        {/* Now Listening */}
        <div ref={nowListeningRef} className="flex justify-center mb-12 fade-in-up" data-fade-delay="1">
          <NowListening />
        </div>

        {/* Skills */}
        <section id="skills" ref={skillsRef} className="mb-16 fade-in-up" data-fade-delay="2">
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
        <section id="experience" ref={experienceRef} className="mb-16 fade-in-up" data-fade-delay="3">
          <div>
            <span
              className="text-2xl font-bold mb-4 block font-hatton"
              style={{ ...gradientText, fontFamily: "'Hatton', serif" }}
            >
              Experience
            </span>
          </div>
          {experiences.map((exp: Experience, i) => (
            <div key={exp.id} className="mb-6 fade-in-up" data-fade-delay={i + 1}>
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
        <section id="education" ref={educationRef} className="mb-16 fade-in-up" data-fade-delay="4">
          <div>
            <span
              className="text-2xl font-bold mb-4 block font-hatton"
              style={{ ...gradientText, fontFamily: "'Hatton', serif" }}
            >
              Education
            </span>
          </div>
          {education.map((edu: Education, i) => (
            <div key={edu.id} className="mb-6 fade-in-up" data-fade-delay={i + 1}>
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
        <section id="certifications" ref={certificationsRef} className="mb-16 fade-in-up" data-fade-delay="5">
          <div>
            <span
              className="text-2xl font-bold mb-4 block font-hatton"
              style={{ ...gradientText, fontFamily: "'Hatton', serif" }}
            >
              Certifications
            </span>
          </div>
          <ul className="list-disc ml-5">
            {certifications.map((cert: Certification, i) => (
              <li key={cert.id} className="mb-2 fade-in-up" data-fade-delay={i + 1}>
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
        <section id="projects" ref={projectsRef} className="mb-16 fade-in-up" data-fade-delay="6">
          <div>
            <span
              className="text-2xl font-bold mb-4 block font-hatton"
              style={{ ...gradientText, fontFamily: "'Hatton', serif" }}
            >
              Projects
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {(showAllProjects ? projects : projects.slice(0, 4)).map((project: Project, i) => (
              <div key={project.id} className="fade-in-up" data-fade-delay={i + 1}>
                <ProjectCard
                  project={{
                    name: project.title || "Untitled Project",
                    url: project.url ?? "https://example.com",
                    tech: project.techStack ?? [],
                    description: project.description ?? "No description available.",
                  }}
                />
              </div>
            ))}
          </div>
          {projects.length > 4 && (
            <div className="flex justify-center mt-6 fade-in-up" data-fade-delay="7">
              <button
                className="px-6 py-2 rounded-xl font-semibold shadow font-caviar"
                style={{
                  background: "linear-gradient(90deg,#fff,#b0b0b0 90%)",
                  color: "#111",
                  boxShadow: "0 2px 10px #b0b0b044",
                  fontWeight: 600,
                  fontFamily: "'Caviar Dreams',sans-serif",
                  transition: "background 0.15s, color 0.15s"
                }}
                onClick={() => setShowAllProjects(v => !v)}
              >
                {showAllProjects ? "Show Less" : "Show All"}
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
