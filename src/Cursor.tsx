import { useEffect, useRef, useState } from "react";

/**
 * Custom animated cursor component.
 * Enhances UI with smooth movement and dynamic styles on hover.
 */
const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHoveringInvertElement = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Store cursor position for smooth animation
  const position = useRef({ x: 0, y: 0 });

  // Mobile check on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cursor animation effect
  useEffect(() => {
    if (isMobile) return;

    let animationFrame: number | null = null;

    // Smoothly animate cursor to new position
    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    const updateCursorPosition = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };

    const applyInvertStyles = () => {
      if (!cursorRef.current) return;
      cursorRef.current.style.mixBlendMode = "difference";
      cursorRef.current.style.filter = "invert(1) brightness(1.2)";
      cursorRef.current.style.backgroundColor = "rgba(255,255,255,0.3)";
      cursorRef.current.style.borderColor = "#222";
    };

    const resetStyles = () => {
      if (!cursorRef.current) return;
      cursorRef.current.style.mixBlendMode = "normal";
      cursorRef.current.style.filter = "none";
      cursorRef.current.style.backgroundColor = "rgba(255,255,255,0.2)";
      cursorRef.current.style.borderColor = "rgba(255,255,255,0.3)";
    };

    const onMouseOver = (e: Event) => {
      if ((e.target as HTMLElement).closest(".invert-on-hover")) {
        isHoveringInvertElement.current = true;
        applyInvertStyles();
      }
    };

    const onMouseOut = (e: Event) => {
      if ((e.target as HTMLElement).closest(".invert-on-hover")) {
        isHoveringInvertElement.current = false;
        resetStyles();
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    animationFrame = requestAnimationFrame(animate);
    window.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isMobile]);

  // Hide cursor if mobile
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="
        fixed z-50 w-8 h-8 rounded-full
        bg-white/20 backdrop-invert backdrop-blur-md border border-white/30
        pointer-events-none
        transition-transform transition-opacity duration-200
        hidden md:block
      "
      style={{
        left: 0,
        top: 0,
        opacity: 0,
        transform: "translate(-50%, -50%)"
      }}
    />
  );
};

export default Cursor;
