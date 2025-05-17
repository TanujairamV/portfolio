import React, { useRef, useEffect } from "react";

const AnimatedCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const hide = () => cursor.style.opacity = "0";
    const show = () => cursor.style.opacity = "1";
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
        width: 44,
        height: 44,
        pointerEvents: "none",
        borderRadius: "50%",
        background: "rgba(236, 72, 153, 0.16)",
        border: "2px solid #f472b6",
        boxShadow: "0 0 32px 8px #f472b6, 0 0 0 2px #fff2",
        mixBlendMode: "screen",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        transition: "background 0.25s, border 0.25s, box-shadow 0.25s, opacity 0.25s",
        opacity: 1,
        willChange: "transform, opacity"
      }}
    />
  );
};

export default AnimatedCursor;
