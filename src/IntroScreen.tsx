import React, { useEffect, useState } from "react";

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

const SCRAMBLE_TEXT = "Tanujairam V";
const SCRAMBLE_DURATION = 1600; // ms
const INTRO_DURATION = 2300; // ms

function scramble(text: string, progress: number) {
  // progress: 0 to 1
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let scrambled = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      scrambled += " ";
    } else if (progress < i / text.length) {
      scrambled += chars.charAt(Math.floor(Math.random() * chars.length));
    } else {
      scrambled += text[i];
    }
  }
  return scrambled;
}

const IntroScreen: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [show, setShow] = useState(true);
  const [scrambleProgress, setScrambleProgress] = useState(0);

  useEffect(() => {
    let running = true;
    let start = performance.now();
    let scrambleFrame: number;

    function animate(now: number) {
      if (!running) return;
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / SCRAMBLE_DURATION);
      setScrambleProgress(progress);
      if (progress < 1) {
        scrambleFrame = requestAnimationFrame(animate);
      }
    }
    scrambleFrame = requestAnimationFrame(animate);

    // Hide after intro duration
    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, INTRO_DURATION);

    return () => {
      running = false;
      clearTimeout(timer);
      cancelAnimationFrame(scrambleFrame);
    };
  }, [onFinish]);

  if (!show) return null;

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
        <h1
          className="text-3xl md:text-4xl mb-3"
          style={{
            ...gradientTextStyle,
            fontFamily: "'Montserrat',sans-serif",
            letterSpacing: "0.05em"
          }}
        >
          {scramble(SCRAMBLE_TEXT, scrambleProgress)}
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
          className="text-base md:text-lg mb-1"
          style={{
            ...subtleGradientStyle,
            fontFamily: "'Pacifico', cursive",
            fontSize: "1.18rem"
          }}
        >
          Developer &nbsp;|&nbsp; Student &nbsp;|&nbsp; Creator
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;
