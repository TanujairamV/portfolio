import React from "react";
import {
  FaGithub, FaEnvelope, FaInstagram, FaTelegramPlane
} from "react-icons/fa";

const aboutText = `I'm a passionate developer focused on creating beautiful, performant web experiences. I love coding, learning new things, and building projects that matter.`;

const socialIcons = [
  { href: "mailto:tanujairam.v@gmail.com", icon: <FaEnvelope />, label: "Email" },
  { href: "https://github.com/TanujairamV", icon: <FaGithub />, label: "GitHub" },
  { href: "https://instagram.com/tanujairam.v", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://t.me/Tanujairam", icon: <FaTelegramPlane />, label: "Telegram" }
];

const Hero: React.FC = () => (
  <section
    id="hero"
    className="w-full flex flex-col md:flex-row items-center md:items-center justify-start gap-8 md:gap-16 py-8 md:py-14"
  >
    {/* Image left */}
    <div className="flex-shrink-0 flex justify-center md:justify-start items-center w-full md:w-auto">
      <img
        src="pfp.png"
        alt="Tanujairam"
        className="rounded-2xl shadow-xl object-cover object-center"
        style={{
          width: 380,
          height: 380,
          maxWidth: 440,
          maxHeight: 440,
          minWidth: 260,
          minHeight: 260,
          display: "block"
        }}
      />
    </div>
    {/* Text & socials right */}
    <div className="flex flex-col items-center md:items-start w-full max-w-2xl">
      {/* Main Heading with Hatton */}
      <span>
        <span
          className="text-4xl md:text-6xl font-hatton font-bold mb-2 flex flex-wrap items-center"
          style={{
            color: "#fff",
            fontWeight: 700,
            lineHeight: 1.14,
            letterSpacing: "0.01em",
            wordBreak: "break-word"
          }}
        >
          hey
          <span style={{ fontSize: "1.5em", margin: "0 0.18em" }}>👋</span>
          , i'm&nbsp;<span className="font-caviar">Tanujairam</span>
        </span>
      </span>
      {/* Subheading with Caviar Dreams */}
      <span
        className="mt-2 mb-5 text-lg md:text-2xl font-caviar font-medium text-center md:text-left"
        style={{
          color: "#b0b0b0",
          fontWeight: 500,
          lineHeight: 1.5,
          maxWidth: 480,
          display: "block",
          letterSpacing: "0.02em",
          wordBreak: "break-word"
        }}
      >
        {aboutText}
      </span>
      {/* Social Icons with Unica One */}
      <span className="flex flex-row mt-2 flex-wrap gap-5">
        {socialIcons.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            style={{
              color: "#b0b0b0",
              fontSize: "2.1rem",
              transition: "transform 0.14s, color 0.14s"
            }}
            className="hover:scale-110 focus:scale-110 font-unica"
            title={social.label}
          >
            {social.icon}
          </a>
        ))}
      </span>
    </div>
  </section>
);

export default Hero;
