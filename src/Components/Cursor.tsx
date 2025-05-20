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
  // Custom: Certificates and Projects tiles
  if (el.classList.contains("certificate-tile") || el.classList.contains("project-tile")) return true;
  return false;
}

// Detect if device is touch-enabled
const isTouchDevice = (): boolean =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0);

const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>();
  const [shouldShow, setShouldShow] = useState(false);
  const [isHoverClickable, setIsHoverClickable] = useState(false);
  const [showView, setShowView] = useState(false);

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
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.20);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.20);

      // Move ring
      if (ringRef.current && !showView) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 22}px, ${ring.current.y - 22}px, 0)`;
        ringRef.current.style.opacity = "1";
      }
      // Move "view" label instead of ring (when on special tiles)
      if (viewRef.current && showView) {
        viewRef.current.style.transform = `translate3d(${ring.current.x - 48}px, ${ring.current.y - 24}px, 0)`;
        viewRef.current.style.opacity = "1";
      }
      // Fade out the unused element
      if (ringRef.current) ringRef.current.style.opacity = showView ? "0" : "1";
      if (viewRef.current) viewRef.current.style.opacity = showView ? "1" : "0";

      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [shouldShow, showView]);

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

  // Hover detection for clickable elements and "special" tiles
  useEffect(() => {
    if (!shouldShow) return;
    const handleHover = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isOverClickable = isClickable(el);

      // Special: certificate/project tile (className should be set on those tiles!)
      const overSpecial =
        el?.classList.contains("certificate-tile") ||
        el?.classList.contains("project-tile");

      setIsHoverClickable(isOverClickable);
      setShowView(Boolean(overSpecial));

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
          background: "linear-gradient(135deg, rgba(255,255,255,0.20) 10%, rgba(190,190,200,0.16) 70%, rgba(100,100,120,0.10) 100%)",
          border: "2.5px solid rgba(220,220,255,0.31)",
          boxShadow: "0 2px 18px 0 rgba(120,130,155,0.13)",
          transition:
            "border-color 0.26s cubic-bezier(.33,1.02,.53,.98), background 0.24s cubic-bezier(.33,1.02,.53,.98), transform 0.16s cubic-bezier(.41,1.11,.59,.95), opacity 0.2s",
          willChange: "transform,opacity",
          pointerEvents: "none",
          mixBlendMode: "exclusion",
          opacity: 1,
          zIndex: 9999,
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
          background: "rgba(255,255,255,0.93)",
          boxShadow: "0 1px 4px 0 rgba(130,140,230,0.07)",
          willChange: "transform",
          pointerEvents: "none",
          mixBlendMode: "exclusion",
        }}
      />
      {/* "View →" label for special tiles */}
      <div
        ref={viewRef}
        className="custom-cursor-view pointer-events-none fixed z-[9999] left-0 top-0 flex items-center px-5 py-2 rounded-full"
        style={{
          fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: "1.1rem",
          background: "linear-gradient(90deg, rgba(255,255,255,0.77) 70%, rgba(200,200,220,0.28) 100%)",
          color: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          boxShadow: "0 2px 16px 0 rgba(220,220,255,0.08)",
          border: "1.5px solid rgba(190,190,220,0.21)",
          whiteSpace: "nowrap",
          opacity: 0,
          zIndex: 9999,
          transition:
            "opacity 0.18s cubic-bezier(.44,1.11,.53,.91), background 0.22s cubic-bezier(.33,1.02,.53,.98)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <span
          style={{
            background:
              "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          View
        </span>
        <span style={{
          marginLeft: 8,
          fontSize: "1.1em",
          display: "inline-block",
          transform: "translateY(2px)",
          fontWeight: 700,
        }}>→</span>
      </div>
      <style>{`
        .custom-cursor-ring {
          transition: border-color 0.26s cubic-bezier(.33,1.02,.53,.98), background 0.24s cubic-bezier(.33,1.02,.53,.98), transform 0.16s cubic-bezier(.41,1.11,.59,.95), opacity 0.2s;
          background: linear-gradient(135deg, rgba(255,255,255,0.20) 10%, rgba(190,190,200,0.16) 70%, rgba(100,100,120,0.10) 100%);
          border: 2.5px solid rgba(220,220,255,0.31);
        }
        .custom-cursor-dot {
          transition: background 0.18s cubic-bezier(.44,1.11,.53,.91);
        }
        .custom-cursor-ring.cursor-hover {
          transform: scale(1.20) !important;
          border-color: rgba(200,210,255,0.59) !important;
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 10%, rgba(220,220,255,0.22) 80%, rgba(180,180,210,0.11) 100%) !important;
          box-shadow: 0 2px 20px 0 rgba(160,170,220,0.14);
        }
        .custom-cursor-view {
          transition: opacity 0.18s cubic-bezier(.44,1.11,.53,.91), background 0.22s cubic-bezier(.33,1.02,.53,.98);
          pointer-events: none;
          user-select: none;
        }
        @media (hover: none), (pointer: coarse) {
          .custom-cursor-dot, .custom-cursor-ring, .custom-cursor-view {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Cursor;
