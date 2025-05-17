import React from "react";
import {
  FaGithub, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaTwitter, FaInstagram,
  FaFacebook, FaGlobe, FaDiscord, FaTelegramPlane, FaYoutube, FaStackOverflow,
  FaMediumM, FaDribbble, FaRedditAlien
} from "react-icons/fa";

const gradientStyle = {
  background: "linear-gradient(90deg, #fff 80%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
};

const aboutText = `I'm a passionate developer focused on creating beautiful, performant web experiences. I love coding, learning new things, and building projects that matter.`;

const socialIcons = [
  { href: "https://github.com/TanujairamV", icon: <FaGithub size={28} />, label: "GitHub" },
  { href: "https://linkedin.com/in/tanujairam", icon: <FaLinkedinIn size={28} />, label: "LinkedIn" },
  { href: "mailto:tanujairam@email.com", icon: <FaEnvelope size={28} />, label: "Email" },
  { href: "tel:+1234567890", icon: <FaPhoneAlt size={28} />, label: "Phone" },
  { href: "https://twitter.com/tanujairam", icon: <FaTwitter size={28} />, label: "Twitter" },
  { href: "https://instagram.com/tanujairam", icon: <FaInstagram size={28} />, label: "Instagram" },
  { href: "https://facebook.com/tanujairam", icon: <FaFacebook size={28} />, label: "Facebook" },
  { href: "https://tanujairam.com", icon: <FaGlobe size={28} />, label: "Website" },
  { href: "https://discordapp.com/users/1234567890", icon: <FaDiscord size={28} />, label: "Discord" },
  { href: "https://t.me/tanujairam", icon: <FaTelegramPlane size={28} />, label: "Telegram" },
  { href: "https://youtube.com/@tanujairam", icon: <FaYoutube size={28} />, label: "YouTube" },
  { href: "https://stackoverflow.com/users/123456/tanujairam", icon: <FaStackOverflow size={28} />, label: "StackOverflow" },
  { href: "https://medium.com/@tanujairam", icon: <FaMediumM size={28} />, label: "Medium" },
  { href: "https://dribbble.com/tanujairam", icon: <FaDribbble size={28} />, label: "Dribbble" },
  { href: "https://reddit.com/user/tanujairam", icon: <FaRedditAlien size={28} />, label: "Reddit" }
];

const Hero: React.FC = () => (
  <section
    id="hero"
    className="w-full flex flex-col md:flex-row items-center md:items-center justify-start gap-8 md:gap-16 py-8 md:py-14"
  >
    {/* Image left */}
    <div className="flex-shrink-0 flex justify-center md:justify-start items-center w-full md:w-auto">
      <div className="flex items-center justify-center rounded-2xl shadow-xl bg-[rgba(255,255,255,0.07)]"
        style={{ width: 260, height: 260, maxWidth: 320, maxHeight: 320, minWidth: 200, minHeight: 200 }}>
        <img
          src="/pfp.png"
          alt="Tanujairam"
          className="rounded-2xl object-cover object-center"
          style={{
            width: "100%",
            height: "100%",
            display: "block"
          }}
        />
      </div>
    </div>
    {/* Text & socials right */}
    <div className="flex flex-col items-center md:items-start w-full max-w-2xl">
      <h1
        className="text-4xl md:text-5xl font-bold mb-2 flex flex-wrap items-center"
        style={{ fontFamily: "'Space Grotesk', 'Poppins', sans-serif", fontWeight: 700, lineHeight: 1.14 }}
      >
        <span style={gradientStyle}>hey</span>
        <span style={{ fontSize: "1.5em", margin: "0 0.18em" }}>👋</span>
        <span style={gradientStyle}>, i'm&nbsp;Tanujairam</span>
      </h1>
      <div
        className="mt-2 mb-5 text-lg md:text-xl font-medium text-center md:text-left"
        style={{ ...gradientStyle, lineHeight: 1.5, fontWeight: 500, maxWidth: 480 }}
      >
        {aboutText}
      </div>
      <div className="flex flex-row mt-2 flex-wrap gap-5 md:gap-7">
        {socialIcons.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            style={{
              ...gradientStyle,
              fontSize: "2rem",
              transition: "transform 0.14s, color 0.14s"
            }}
            className="hover:scale-110 focus:scale-110"
            title={social.label}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
