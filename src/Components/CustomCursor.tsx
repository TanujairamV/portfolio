import React, { useEffect, useRef, useState } from "react";

// Utility: Returns true if device is touch/cursorless
const isNoCursorDevice = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent));

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [variant, setVariant] = useState<"default" | "ne-arrow" | "hidden">("default");

  // Follows mouse
  useEffect(() => {
    if (isNoCursorDevice()) return;
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Hide on mouseleave
  useEffect(() => {
    if (isNoCursorDevice()) return;
    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Handle variant switching
  useEffect(() => {
    if (isNoCursorDevice()) return;

    // Social icons: show NE arrow cursor
    const socialIcons = document.querySelectorAll(".social-icon");
    const navLinks = document.querySelectorAll(".nav-link");

    const handleSocialEnter = () => setVariant("ne-arrow");
    const handleSocialLeave = () => setVariant("default");
    const handleNavEnter = () => setVariant("hidden");
    const handleNavLeave = () => setVariant("default");

    socialIcons.forEach(el => {
      el.addEventListener("mouseenter", handleSocialEnter);
      el.addEventListener("mouseleave", handleSocialLeave);
    });
    navLinks.forEach(el => {
      el.addEventListener("mouseenter", handleNavEnter);
      el.addEventListener("mouseleave", handleNavLeave);
    });

    return () => {
      socialIcons.forEach(el => {
        el.removeEventListener("mouseenter", handleSocialEnter);
        el.removeEventListener("mouseleave", handleSocialLeave);
      });
      navLinks.forEach(el => {
        el.removeEventListener("mouseenter", handleNavEnter);
        el.removeEventListener("mouseleave", handleNavLeave);
      });
    };
  }, []);

  if (isNoCursorDevice()) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-neo ${variant} ${isVisible ? "" : "cursor-hidden"}`}
      style={{
        pointerEvents: "none",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
        transition:
          "opacity 0.18s, background 0.18s, border 0.18s, width 0.18s, height 0.18s, border-radius 0.17s, box-shadow 0.18s",
        // Use transform for animation
        transform: "translate(-50%, -50%)",
        opacity: isVisible && variant !== "hidden" ? 1 : 0,
      }}
    >
      {variant === "ne-arrow" && (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient id="cursorArrowGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="90%" stopColor="#fff" />
              <stop offset="100%" stopColor="#888" />
            </linearGradient>
          </defs>
          <polyline
            points="8,20 20,20 20,8"
            fill="none"
            stroke="url(#cursorArrowGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 2px 8px #fff8)", opacity: 0.92 }}
          />
        </svg>
      )}
    </div>
  );
};

export default CustomCursor;
