import { FaInstagram, FaTelegram, FaDiscord, FaEnvelope, FaGithub } from 'react-icons/fa';

const socialLinks = [
  { href: "https://instagram.com/tanujairam.v", icon: FaInstagram, label: "Instagram" },
  { href: "https://t.me/Tanujairam", icon: FaTelegram, label: "Telegram" },
  { href: "https://discord.com/users/Tanujairam", icon: FaDiscord, label: "Discord" },
  { href: "mailto:tanujairam.v@gmail.com", icon: FaEnvelope, label: "Email" },
  { href: "https://github.com/TanujairamV", icon: FaGithub, label: "GitHub" },
];

const Footer = () => (
  <footer className="py-3 text-center font-inter text-subheading">
    <nav aria-label="Social media links">
      <ul className="flex justify-center space-x-1.5 mb-1 list-none p-0 m-0">
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon material-icon inline-flex items-center"
              aria-label={label}
            >
              <Icon size={14} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <p className="text-[0.65rem] text-gray-500 select-none">© 2025 Tanujairam</p>
  </footer>
);

export default Footer;
