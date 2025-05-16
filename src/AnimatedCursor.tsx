import React, { useEffect, useRef } from "react";

const AnimatedCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 20}px`;
        cursorRef.current.style.top = `${e.clientY - 20}px`;
      }
    };
    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        // The magic: shows inverted/blurred region under the cursor
        backdropFilter: "invert(1) blur(6px)",
        WebkitBackdropFilter: "invert(1) blur(6px)",
        mixBlendMode: "difference",
        background: "rgba(255,255,255,0.06)",
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.16)",
        border: "1.5px solid rgba(255,255,255,0.5)",
        transition: "transform 0.12s cubic-bezier(.4,2,.3,.7)",
      }}
    />
  );
};

export default AnimatedCursor;
