import { motion } from 'framer-motion';

export default function Portfolio() {
  return (
    <div className="w-full bg-gradient-to-br from-blue-100/50 to-purple-200/50">
      {/* Hero Section */}
      <motion.div
        id="home"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="section w-[90%] md:w-[600px] mx-auto mt-20 flex flex-col items-center text-center"
        role="banner"
        aria-label="Portfolio introduction"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Hey, I'm Tanujairam
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Developer. Creator. Explorer.
        </p>
        <div className="flex gap-4 mb-6">
          <a
            href="#projects"
            className="btn-primary"
            aria-label="View my projects"
          >
            See Projects
          </a>
          <a
            href="#contact"
            className="btn-secondary"
            aria-label="Contact me"
          >
            Contact Me
          </a>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/tanujairam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <svg
              className="w-6 h-6 text-gray-900 hover:text-purple-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49v-1.71c-2.78.6-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.564 9.564 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.56.84.56 1.69v2.5c0 .27.16.59.67.5A10.013 10.013 0 0022 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/tanujairam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <svg
              className="w-6 h-6 text-gray-900 hover:text-purple-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9.36h3.41v1.52h.05c.48-.91 1.65-1.87 3.39-1.87 3.62 0 4.29 2.38 4.29 5.48v6.96zM5.34 7.83c-1.15 0-2.08-.93-2.08-2.08s.93-2.08 2.08-2.08 2.08.93 2.08 2.08-.93 2.08-2.08 2.08zm1.78 12.62H3.56V9.36h3.56v11.09zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
            </svg>
          </a>
        </div>
      </motion.div>

      {/* Projects Section */}
      <section
        id="projects"
        className="section w-[90%] md:w-[800px] mx-auto mt-10"
        role="region"
        aria-label="Projects"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="section p-6">
            <h3 className="text-xl font-semibold mb-2">Project 1</h3>
            <p className="text-gray-700 mb-4">
              A web application built with React and Node.js, showcasing modern UI/UX.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:underline"
            >
              View on GitHub
            </a>
          </div>
          <div className="section p-6">
            <h3 className="text-xl font-semibold mb-2">Project 2</h3>
            <p className="text-gray-700 mb-4">
              A mobile app developed with Flutter, focusing on performance.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="section w-[90%] md:w-[800px] mx-auto mt-10 mb-10"
        role="region"
        aria-label="Contact"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Contact</h2>
        <form
          className="flex flex-col gap-4 max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Form submission placeholder');
          }}
        >
          <input
            type="text"
            placeholder="Name"
            aria-label="Name"
            required
          />
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            required
          />
          <textarea
            placeholder="Message"
            rows="4"
            aria-label="Message"
            required
          ></textarea>
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
