import { FaInstagram, FaTelegram, FaDiscord, FaEnvelope, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="py-8 text-center font-inter text-subheading">
      <div className="flex justify-center space-x-4 mb-4">
        <a href="https://instagram.com/tanujairam.v" className="social-icon glass-icon" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={20} />
        </a>
        <a href="https://t.me/Tanujairam" className="social-icon glass-icon" target="_blank" rel="noopener noreferrer">
          <FaTelegram size={20} />
        </a>
        <a href="https://discord.com/users/Tanujairam" className="social-icon glass-icon" target="_blank" rel="noopener noreferrer">
          <FaDiscord size={20} />
        </a>
        <a href="mailto:tanujairam.v@gmail.com" className="social-icon glass-icon" target="_blank" rel="noopener noreferrer">
          <FaEnvelope size={20} />
        </a>
        <a href="https://github.com/TanujairamV" className="social-icon glass-icon" target="_blank" rel="noopener noreferrer">
          <FaGithub size={20} />
        </a>
      </div>
      <p className="text-sm">© 2025 Tanujairam. Built with passion.</p>
    </footer>
  );
}

export default Footer;
