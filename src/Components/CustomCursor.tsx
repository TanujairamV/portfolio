import React, { useEffect, useRef, useState } from "react";

// Utility to check if an element is clickable
function isClickable(el: Element | null): boolean {
  if (!el) return false;
  const clickableTags = ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "SUMMARY", "LABEL"];
  if (clickableTags.includes(el.tagName)) return true;
  if (el.getAttribute("tabindex") && el.getAttribute("tabindex") !== "-1") return true;
  if ((el as HTMLElement).onclick || (el as HTMLElement).onmousedown) return true;
  if (el.classList.contains("cursor-pointer")) return true;
  if (el.closest("a,button,[role=button],.cursor-pointer")) return true;
  return false;
}

const isTouchDevice = (): boolean =>
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  // @ts-ignore
  navigator.msMaxTouchPoints > 0;

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>();
  const [shouldShow, setShouldShow] = useState(false);

  // Detect touch device and show/hide cursor
  useEffect(() => {
    const handleTouch = () => setShouldShow(false);
    const handleMouse = () => setShouldShow(true);

    if (isTouchDevice()) {
      setShouldShow(false);
    } else {
      setShouldShow(true);
    }

    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  // Animate ring trailing
  useEffect(() => {
    if (!shouldShow) return;
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.18);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.18);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 22}px, ${ring.current.y - 22}px, 0)`;
      }
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [shouldShow]);

  // Mouse move handler
  useEffect(() => {
    if (!shouldShow) return;
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [shouldShow]);

  // Hover detection for clickable elements
  useEffect(() => {
    if (!shouldShow) return;
    const handleHover = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isOverClickable = isClickable(el);
      if (ringRef.current) {
        if (isOverClickable) {
          ringRef.current.classList.add("cursor-hover");
        } else {
          ringRef.current.classList.remove("cursor-hover");
        }
      }
    };
    window.addEventListener("mousemove", handleHover);
    return () => window.removeEventListener("mousemove", handleHover);
  }, [shouldShow]);

  // Hide default cursor when custom cursor is active
  useEffect(() => {
    if (shouldShow) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "";
    }
    return () => {
      document.body.style.cursor = "";
    };
  }, [shouldShow]);

  // Don't render the custom cursor on touch devices
  if (!shouldShow) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="custom-cursor-ring pointer-events-none fixed z-[9999] left-0 top-0"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "2px solid rgba(220,220,255,0.38)",
          background: "rgba(255,255,255,0.07)",
          boxShadow: "0 1px 8px 0 rgba(100,120,200,0.10)",
          transition:
            "border-color 0.24s cubic-bezier(.33,1.02,.53,.98), background 0.22s cubic-bezier(.33,1.02,.53,.98), transform 0.13s cubic-bezier(.41,1.11,.59,.95)",
          willChange: "transform",
          pointerEvents: "none",
          mixBlendMode: "exclusion",
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot pointer-events-none fixed z-[9999] left-0 top-0"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 1px 4px 0 rgba(130,140,230,0.07)",
          willChange: "transform",
          pointerEvents: "none",
          mixBlendMode: "exclusion",
        }}
      />
      <style>{`
        .custom-cursor-ring {
          transition: border-color 0.24s cubic-bezier(.33,1.02,.53,.98), background 0.22s cubic-bezier(.33,1.02,.53,.98), transform 0.13s cubic-bezier(.41,1.11,.59,.95);
        }
        .custom-cursor-dot {
          transition: background 0.18s cubic-bezier(.44,1.11,.53,.91);
        }
        .custom-cursor-ring.cursor-hover {
          transform: scale(1.3) !important;
          border-color: rgba(150,180,255,0.7) !important;
          background: rgba(150,180,255,0.13) !important;
          box-shadow: 0 2px 16px 0 rgba(120,170,255,0.13);
        }
        @media (hover: none), (pointer: coarse) {
          .custom-cursor-dot, .custom-cursor-ring {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
