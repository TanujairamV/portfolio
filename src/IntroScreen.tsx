import React, { useEffect, useState } from "react";

// Scramble animation settings
const SCRAMBLE_TEXT = "Tanujairam V";
const SCRAMBLE_DURATION = 1600; // ms
const INTRO_DURATION = 2300; // ms

// Scramble logic
function scramble(text: string, progress: number) {
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
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#000",
        overflow: "hidden"
      }}
    >
      {/* Box-blur effect background */}
      <div
        className="absolute inset-0"
        style={{
          background: "#000",
          filter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          backdropFilter: "blur(32px)",
          zIndex: 1,
        }}
        aria-hidden
      />
      {/* Scrambled name only, aesthetic font, gradient */}
      <div
        className="relative z-10"
        style={{
          padding: "2.8rem 3.2rem",
          borderRadius: "2.2rem",
          background: "rgba(10,10,10,0.50)",
          boxShadow: "0 8px 60px 0 #111a, 0 1px 10px #fff1",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}
      >
        <h1
          className="text-4xl md:text-5xl"
          style={{
            background: "linear-gradient(90deg, #fff 60%, #b0b0b0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Outfit', 'Plus Jakarta Sans', 'Montserrat', 'Quicksand', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.07em",
            userSelect: "none",
            textShadow: "0 4px 40px #000a"
          }}
        >
          {scramble(SCRAMBLE_TEXT, scrambleProgress)}
        </h1>
      </div>
    </div>
  );
};

export default IntroScreen;
