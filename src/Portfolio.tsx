import ParticlesBackground from './ParticlesBackground';
import IntroScreen from './IntroScreen';
import NavBar from './NavBar';
import Cursor from './Cursor';
import { ThemeProvider } from './context/ThemeContext';

const Portfolio = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <IntroScreen />
        <ParticlesBackground />
        <Cursor />
        <NavBar />
        <main className="container mx-auto px-4 py-12">
          <section id="hero" className="text-center py-16">
            <h1 className="mb-4">Hi, I'm Tanuj</h1>
            <p className="text-subheading">A passionate developer building modern web experiences.</p>
            <button className="material-btn mt-6">Get in Touch</button>
          </section>
          <section id="about" className="py-16">
            <h2 className="text-center mb-8">About Me</h2>
            <div className="material-card">
              <p>I'm a developer with a focus on React, TypeScript, and Tailwind CSS.</p>
            </div>
          </section>
          <section id="projects" className="py-16">
            <h2 className="text-center mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="material-card">
                <h3 className="text-xl">Project 1</h3>
                <p>A cool project built with modern tech.</p>
              </div>
              <div className="material-card">
                <h3 className="text-xl">Project 2</h3>
                <p>Another awesome project showcasing my skills.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
