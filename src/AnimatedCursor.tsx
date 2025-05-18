import React, { useRef, useEffect, useState } from "react";

// SVG for the 45-degree soft arrow
const Arrow45 = () => (
  <svg width="21" height="21" viewBox="0 0 21 21">
    <polyline
      points="6,16 16,16 16,6"
      fill="none"
      stroke="#fff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        filter: "drop-shadow(0 2px 8px #fff5)",
        opacity: 0.87
      }}
    />
  </svg>
);

const AnimatedCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let raf: number;

    const animate = () => {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      raf = requestAnimationFrame(animate);
    };

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    // Detect hover on clickable elements
    const mouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      // Consider a, button, elements with role=button, .ripple, .nav-link
      if (
        el.closest("a, button, [role=button], .ripple, .nav-link")
      ) {
        setHovering(true);
      }
    };
    const mouseOut = (e: MouseEvent) => {
      setHovering(false);
    };

    document.addEventListener("mouseover", mouseOver);
    document.addEventListener("mouseout", mouseOut);

    // Hide when mouse leaves window or tab switches
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);
    window.addEventListener("mousemove", move);

    // Animate on click
    const click = () => {
      cursor.animate(
        [
          { transform: cursor.style.transform, boxShadow: "0 0 24px 12px #b0b0b0" },
          { transform: `${cursor.style.transform} scale(1.34)`, boxShadow: "0 0 48px 24px #b0b0b0" },
          { transform: cursor.style.transform, boxShadow: "0 0 24px 12px #b0b0b0" }
        ],
        { duration: 310 }
      );
    };
    window.addEventListener("mousedown", click);

    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
      document.removeEventListener("mouseover", mouseOver);
      document.removeEventListener("mouseout", mouseOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Style changes for hover/clickable
  const cursorStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    width: hovering ? 48 : 40,
    height: hovering ? 48 : 40,
    pointerEvents: "none",
    borderRadius: "50%",
    background: hovering
      ? "rgba(255,255,255,0.18)"
      : "rgba(255,255,255,0.08)",
    border: hovering ? "2.5px solid #fff" : "2px solid rgba(255,255,255,0.55)",
    boxShadow: "0 2px 12px 0 rgba(255,255,255,0.07)",
    mixBlendMode: "lighten",
    zIndex: 9999,
    transform: `translate(-50%, -50%) scale(${hovering ? 1.15 : 1})`,
    transition:
      "border 0.22s, background 0.22s, width 0.18s, height 0.18s, transform 0.15s cubic-bezier(.6,.2,.1,1.2)",
    willChange: "transform, border, background, width, height",
    opacity: visible ? 1 : 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    backdropFilter: "blur(2.5px)",
  };

  return (
    <div ref={cursorRef} id="custom-cursor" style={cursorStyle}>
      {hovering && (
        <span className="arrow45" style={{
          position: "absolute",
          left: "50%", top: "50%",
          width: 21, height: 21,
          transform: "translate(-50%,-50%) rotate(45deg)",
          pointerEvents: "none"
        }}>
          <Arrow45 />
        </span>
      )}
    </div>
  );
};

export default AnimatedCursor;
