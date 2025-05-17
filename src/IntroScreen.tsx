import React, { useEffect, useState } from "react";

// Add a delay for hiding the intro (so you can trigger an exit animation if desired)
const INTRO_DURATION = 2300; // ms

const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #fff 60%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
  letterSpacing: "0.03em"
};

const subtleGradientStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #fff 35%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 500,
  opacity: 0.92
};

const IntroScreen: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, INTRO_DURATION);
    return () => clearTimeout(timer);
  }, [onFinish]);

  // Hide cursor and navbar while intro is showing via document.body
  useEffect(() => {
    if (show) {
      document.body.classList.add("intro-active");
    } else {
      document.body.classList.remove("intro-active");
    }
    return () => {
      document.body.classList.remove("intro-active");
    };
  }, [show]);

  if (!show) return null;

  // Optionally, add a fade-out animation (remove opacity-100, add transition on fade-out)
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#121212] via-[#23242b] to-[#191a1d] transition-opacity duration-700"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        pointerEvents: "all"
      }}
    >
      <div className="text-center p-8 rounded-3xl shadow-2xl"
        style={{
          background: "rgba(30,30,35,0.54)",
          border: "1.7px solid rgba(200,200,200,0.09)",
          boxShadow: "0 6px 28px 0 #b0b0b029, 0 0.5px 6px #fff1",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex justify-center mb-4">
          <img
            src="https://avatars.githubusercontent.com/u/108195209?v=4"
            alt="TanujairamV"
            className="w-24 h-24 rounded-full border-4 border-white/20 shadow-lg"
            style={{
              boxShadow: "0 4px 18px #b0b0b033"
            }}
          />
        </div>
        <h1
          className="text-3xl md:text-4xl mb-2"
          style={{
            ...gradientTextStyle,
            fontFamily: "'Montserrat',sans-serif"
          }}
        >
          Tanujairam V
        </h1>
        <div
          className="text-lg mb-2"
          style={{
            ...subtleGradientStyle,
            fontFamily: "'Roboto Mono', monospace",
            letterSpacing: "0.09em"
          }}
        >
          Portfolio
        </div>
        <p
          className="text-base md:text-lg mb-3"
          style={{
            ...subtleGradientStyle,
            fontFamily: "'Pacifico', cursive",
            fontSize: "1.18rem"
          }}
        >
          Developer &nbsp;|&nbsp; Student &nbsp;|&nbsp; Creator
        </p>
        <div className="flex justify-center gap-5 mt-4">
          <a
            href="https://github.com/TanujairamV"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path fill="url(#gh_grad)" d="M12 2C6.48 2 2 6.7 2 12.3c0 4.5 2.87 8.3 6.84 9.65.5.1.68-.22.68-.48v-1.8c-2.78.63-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.64.07-.63.07-.63 1 .07 1.52 1.06 1.52 1.06.89 1.6 2.34 1.14 2.91.87.09-.67.35-1.14.64-1.4-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.38-2.03 1.02-2.74-.1-.26-.44-1.3.1-2.7 0 0 .84-.28 2.75 1.03A9.35 9.35 0 0 1 12 7.6c.85.01 1.7.12 2.5.35 1.9-1.31 2.73-1.03 2.73-1.03.54 1.4.2 2.44.1 2.7.64.71 1.02 1.62 1.02 2.74 0 3.93-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9v2.83c0 .27.18.59.69.48C19.13 20.6 22 16.8 22 12.3 22 6.7 17.52 2 12 2Z"/>
              <defs>
                <linearGradient id="gh_grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff"/>
                  <stop offset="1" stopColor="#b0b0b0"/>
                </linearGradient>
              </defs>
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/tanujairamv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="5" fill="url(#li_grad)" />
              <path d="M7.5 9.4h2.1v7.2H7.5V9.4ZM8.6 8.4c.67 0 1.08-.46 1.08-1.03-.01-.59-.41-1.03-1.07-1.03s-1.08.44-1.08 1.03c0 .57.41 1.03 1.06 1.03h.01ZM12.2 12.2c0-.71.32-1.17 1.01-1.17.57 0 .84.41.84 1.17v4.2h2.1v-4.65c0-1.62-.87-2.37-2.04-2.37-1 0-1.44.55-1.69 1.02V9.4h-2.1c.03.67 0 7.2 0 7.2h2.1v-4.4Z" fill="#fff"/>
              <defs>
                <linearGradient id="li_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff"/>
                  <stop offset="1" stopColor="#b0b0b0"/>
                </linearGradient>
              </defs>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
