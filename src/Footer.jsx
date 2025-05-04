import { FaInstagram, FaTelegram, FaDiscord, FaEnvelope, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="py-4 text-center font-inter text-subheading">
      <div className="flex justify-center space-x-2 mb-1">
        <a href="https://instagram.com/tanujairam.v" className="social-icon material-icon" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={16} />
        </a>
        <a href="https://t.me/Tanujairam" className="social-icon material-icon" target="_blank" rel="noopener noreferrer">
          <FaTelegram size={16} />
        </a>
        <a href="https://discord.com/users/Tanujairam" className="social-icon material-icon" target="_blank" rel="noopener noreferrer">
          <FaDiscord size={16} />
        </a>
        <a href="mailto:tanujairam.v@gmail.com" className="social-icon material-icon" target="_blank" rel="noopener noreferrer">
          <FaEnvelope size={16} />
        </a>
        <a href="https://github.com/TanujairamV" className="social-icon material-icon" target="_blank" rel="noopener noreferrer">
          <FaGithub size={16} />
        </a>
      </div>
      <p className="text-xs">© 2025 Tanujairam</p>
    </footer>
  );
}

export default Footer;
