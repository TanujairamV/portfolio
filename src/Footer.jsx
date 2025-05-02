import { FaGithub, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 py-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Tanujairam. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6">
            <a
              href="https://github.com/TanujairamV"
              className="text-gray-400 hover:text-neon-blue transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="mailto:tanujairam.v@gmail.com"
              className="text-gray-400 hover:text-neon-blue transition-colors"
              aria-label="Email"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
