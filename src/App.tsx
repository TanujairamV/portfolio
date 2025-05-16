import NavBar from './NavBar';
import LastFm from './LastFm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section id="hero" className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg text-gray-300">
            Hi, I'm Tanu. I'm a developer passionate about creating amazing web experiences.
          </p>
        </section>

        {/* Now Playing Section */}
        <section id="now-playing" className="mb-16">
          <LastFm />
        </section>

        {/* About Section */}
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-300">
            I’m a full-stack developer with experience in React, TypeScript, Node.js, and more. I love building
            intuitive and performant applications that solve real-world problems.
          </p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Skills</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
            <li className="bg-gray-800 p-3 rounded-lg text-center">JavaScript</li>
            <li className="bg-gray-800 p-3 rounded-lg text-center">React</li>
            <li className="bg-gray-800 p-3 rounded-lg text-center">TypeScript</li>
            <li className="bg-gray-800 p-3 rounded-lg text-center">Node.js</li>
          </ul>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 className="text-3xl font-semibold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Last.fm Proxy</h3>
              <p className="text-gray-300">
                A Node.js proxy server to fetch and display my currently playing music from Last.fm.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Portfolio Website</h3>
              <p className="text-gray-300">
                This very website, built with React, TypeScript, and Tailwind CSS to showcase my work.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
