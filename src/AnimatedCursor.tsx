import React, { useRef, useEffect, useState } from "react";

const AnimatedCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // For random line equalizer
  const [lines, setLines] = useState<number[]>(Array(8).fill(8));

  // Animate the equalizer
  useEffect(() => {
    const interval = setInterval(() => {
      setLines(Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 8));
    }, 140);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);
    const click = () => {
      cursor.animate(
        [
          { transform: "scale(1)", boxShadow: "0 0 24px 12px #f472b6" },
          { transform: "scale(1.5)", boxShadow: "0 0 48px 24px #f472b6" },
          { transform: "scale(1)", boxShadow: "0 0 24px 12px #f472b6" }
        ], { duration: 300 }
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
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
        background: "rgba(236, 72, 153, 0.18)",
        border: "2.5px solid #f472b6",
        boxShadow: "0 0 32px 8px #f472b6, 0 0 0 2px #fff2",
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
        backdropFilter: "blur(3px)",
      }}
    >
      {/* Random line equalizer */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          alignItems: "end",
          height: "32px",
          width: "32px",
        }}
      >
        {lines.map((h, i) => (
          <div
            key={i}
            style={{
              width: "2.2px",
              height: `${h}px`,
              background: "linear-gradient(180deg,#f472b6 80%,#d946ef 100%)",
              borderRadius: "2px",
              transition: "height 0.12s",
              opacity: 0.86
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedCursor;
