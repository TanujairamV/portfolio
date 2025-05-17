import React, { useRef, useEffect, useState } from "react";

const AnimatedCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Equalizer state (lines inside cursor)
  const [lines, setLines] = useState<number[]>(Array(8).fill(8));

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 8));
    }, 140);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Mouse move
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      setVisible(true);
    };

    // Hide/show on entering/leaving viewport (including switching tabs)
    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    // Hide when mouse leaves window (pointer leaves document)
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    // Hide when window blurs (tab out)
    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);

    window.addEventListener("mousemove", move);

    // Animate on click
    const click = () => {
      cursor.animate(
        [
          { transform: "scale(1)", boxShadow: "0 0 24px 12px #b0b0b0" },
          { transform: "scale(1.5)", boxShadow: "0 0 48px 24px #b0b0b0" },
          { transform: "scale(1)", boxShadow: "0 0 24px 12px #b0b0b0" }
        ], { duration: 300 }
      );
    };
    window.addEventListener("mousedown", click);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 56,
        height: 56,
        pointerEvents: "none",
        borderRadius: "50%",
        background: "rgba(180, 180, 180, 0.13)",
        border: "2.5px solid #b0b0b0",
        boxShadow: "0 0 32px 8px #b0b0b0, 0 0 0 2px #fff2",
        mixBlendMode: "screen",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        transition: "background 0.25s, border 0.25s, box-shadow 0.25s, opacity 0.25s",
        opacity: visible ? 1 : 0,
        willChange: "transform, opacity",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Minimal random line equalizer */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          alignItems: "end",
          height: "26px",
          width: "26px",
        }}
      >
        {lines.map((h, i) => (
          <div
            key={i}
            style={{
              width: "2px",
              height: `${h}px`,
              background: "linear-gradient(180deg, #fff, #b0b0b0 90%)",
              borderRadius: "2px",
              transition: "height 0.14s",
              opacity: 0.9
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedCursor;
