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

// Error Boundary for production safety
function withErrorBoundary(Component: React.ComponentType) {
  return class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null as any };

    static getDerivedStateFromError(error: any) {
      return { hasError: true, error };
    }

    // Remove unused parameters to fix TS6133
    componentDidCatch() {
      // Optionally log error to an external service here
    }

    render() {
      if (this.state.hasError) {
        return (
          <div style={{ color: "red", background: "#181824", padding: 24, borderRadius: 12 }}>
            <h2>Something went wrong rendering this section.</h2>
            <pre style={{ fontSize: 14 }}>{String(this.state.error)}</pre>
          </div>
        );
      }
      return <Component {...this.props} />;
    }
  };
}

const gradientText = {
  background: "linear-gradient(90deg, #fff 70%, #8080ff 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

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
      {/* Intro, particles, cursor, and navigation */}
      <IntroScreen />
      <ParticlesBackground />
      <Cursor />
      <Navbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto pt-24 pb-16 px-4 md:px-8 flex flex-col gap-14">
        <Hero />

        {/* Now Playing */}
        <div className="flex justify-center mb-12">
          <NowPlaying />
        </div>

        {/* Skills */}
        <section id="skills" className="mb-20">
          {sectionHeading("Skills")}
          <SkillChip />
        </section>

        {/* Experience */}
        <section id="experience" className="mb-20">
          {sectionHeading("Experience")}
          <Experience />
        </section>

        {/* Education */}
        <section id="education" className="mb-20">
          {sectionHeading("Education")}
          <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-md shadow-xl p-6">
            <Education />
          </div>
        </section>

        {/* Certificates */}
        <section id="certificates" className="mb-20">
          {sectionHeading("Certificates")}
          <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-md shadow-xl p-6">
            <Certificates />
          </div>
        </section>

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

export default withErrorBoundary(Portfolio);
