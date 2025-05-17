import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaGlobe,
  FaDiscord,
  FaTelegramPlane,
  FaYoutube,
  FaStackOverflow,
  FaMediumM,
  FaDribbble,
  FaRedditAlien
} from "react-icons/fa";

// White to grey gradient for text and icons
const gradientStyle = {
  background: "linear-gradient(90deg, #fff 80%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
};

const aboutText = `I'm a passionate developer focused on creating beautiful, performant web experiences. I love coding, learning new things, and building projects that matter.`;

const socialIcons = [
  {
    href: "https://github.com/TanujairamV",
    icon: <FaGithub size={26} />,
    label: "GitHub"
  },
  {
    href: "https://linkedin.com/in/tanujairam",
    icon: <FaLinkedinIn size={26} />,
    label: "LinkedIn"
  },
  {
    href: "mailto:tanujairam@email.com",
    icon: <FaEnvelope size={26} />,
    label: "Email"
  },
  {
    href: "tel:+1234567890",
    icon: <FaPhoneAlt size={26} />,
    label: "Phone"
  },
  {
    href: "https://twitter.com/tanujairam",
    icon: <FaTwitter size={26} />,
    label: "Twitter"
  },
  {
    href: "https://instagram.com/tanujairam",
    icon: <FaInstagram size={26} />,
    label: "Instagram"
  },
  {
    href: "https://facebook.com/tanujairam",
    icon: <FaFacebook size={26} />,
    label: "Facebook"
  },
  {
    href: "https://tanujairam.com",
    icon: <FaGlobe size={26} />,
    label: "Website"
  },
  {
    href: "https://discordapp.com/users/1234567890",
    icon: <FaDiscord size={26} />,
    label: "Discord"
  },
  {
    href: "https://t.me/tanujairam",
    icon: <FaTelegramPlane size={26} />,
    label: "Telegram"
  },
  {
    href: "https://youtube.com/@tanujairam",
    icon: <FaYoutube size={26} />,
    label: "YouTube"
  },
  {
    href: "https://stackoverflow.com/users/123456/tanujairam",
    icon: <FaStackOverflow size={26} />,
    label: "StackOverflow"
  },
  {
    href: "https://medium.com/@tanujairam",
    icon: <FaMediumM size={26} />,
    label: "Medium"
  },
  {
    href: "https://dribbble.com/tanujairam",
    icon: <FaDribbble size={26} />,
    label: "Dribbble"
  },
  {
    href: "https://reddit.com/user/tanujairam",
    icon: <FaRedditAlien size={26} />,
    label: "Reddit"
  }
];

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="w-full flex justify-center items-center min-h-[60vh] pt-10 pb-4"
      style={{
        minHeight: "54vh",
        width: "100vw",
        position: "relative",
        zIndex: 1,
        fontFamily: "'Space Grotesk', 'Poppins', sans-serif"
      }}
    >
      <div
        className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-5xl gap-8 md:gap-16 px-4 md:px-8"
        style={{ alignItems: "center" }}
      >
        {/* Text and socials */}
        <div className="flex flex-col items-center md:items-start w-full max-w-xl md:pr-4">
          <h1
            className="text-3xl md:text-4xl font-bold mb-1 flex items-center flex-wrap"
            style={{
              fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
              fontWeight: 700,
              lineHeight: 1.14
            }}
          >
            <span style={gradientStyle}>hey</span>
            <span style={{ fontSize: "1.5em", margin: "0 0.18em" }}>👋</span>
            <span style={gradientStyle}>, i'm&nbsp;Tanujairam</span>
          </h1>
          <div
            className="mt-2 mb-3 text-base md:text-lg font-medium text-center md:text-left"
            style={{
              ...gradientStyle,
              lineHeight: 1.5,
              fontWeight: 500,
              maxWidth: 420
            }}
          >
            {aboutText}
          </div>
          <div className="flex flex-row mt-3 flex-wrap gap-4 md:gap-6">
            {socialIcons.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  ...gradientStyle,
                  fontSize: "1.5rem",
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
        {/* Profile picture */}
        <div className="flex-shrink-0 flex justify-center items-center w-full md:w-auto mb-7 md:mb-0">
          <img
            src="/pfp.png"
            alt="Tanujairam"
            className="rounded-2xl shadow-xl object-cover object-center"
            style={{
              width: 170,
              height: 170,
              background: "rgba(255,255,255,0.07)",
              borderRadius: "1.5rem",
              border: "2.5px solid rgba(225,225,225,0.16)",
              minWidth: 120,
              minHeight: 120,
              maxWidth: 200,
              maxHeight: 200,
              boxShadow: "0 0 40px #fff1, 0 2px 16px #2227"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
