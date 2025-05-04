import { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <section className="p-8">
            <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
            <p className="mt-4 text-lg">Hi, I'm [Your Name], a passionate developer.</p>
          </section>
        );
      case 'about':
        return (
          <section className="p-8">
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="mt-4">I specialize in building web applications with React and TypeScript.</p>
          </section>
        );
      case 'projects':
        return (
          <section className="p-8">
            <h2 className="text-3xl font-bold">Projects</h2>
            <ul className="mt-4 list-disc pl-5">
              <li>Project 1: A web app built with React and Tailwind CSS.</li>
              <li>Project 2: A TypeScript-based API client.</li>
            </ul>
          </section>
        );
      case 'contact':
        return (
          <section className="p-8">
            <h2 className="text-3xl font-bold">Contact</h2>
            <p className="mt-4">Email: your.email@example.com</p>
            <p>GitHub: github.com/yourusername</p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <ul className="flex space-x-4 justify-center">
          <li>
            <button onClick={() => setActiveSection('home')} className="hover:underline">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection('about')} className="hover:underline">
              About
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection('projects')} className="hover:underline">
              Projects
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection('contact')} className="hover:underline">
              Contact
            </button>
          </li>
        </ul>
      </nav>
      {renderSection()}
    </div>
  );
};

export default App;
