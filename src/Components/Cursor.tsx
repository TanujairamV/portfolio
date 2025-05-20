import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Cursor.css";

// Helper: checks if an element or its ancestors is a special tile
function isSpecialTile(el: Element | null): boolean {
  return !!el && !!el.closest(".certificate-tile, .project-tile");
}

// Helper: checks if an element or its ancestors is clickable
function isClickable(el: Element | null): boolean {
  if (!el) return false;
  const clickableTags = ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "SUMMARY", "LABEL"];
  let curr: Element | null = el;
  while (curr) {
    if (clickableTags.includes(curr.tagName)) return true;
    if (curr.getAttribute("tabindex") && curr.getAttribute("tabindex") !== "-1") return true;
    if ((curr as HTMLElement).onclick || (curr as HTMLElement).onmousedown) return true;
    if (curr.classList.contains("cursor-pointer")) return true;
    if (curr.classList.contains("certificate-tile") || curr.classList.contains("project-tile")) return true;
    if (curr.closest("a,button,[role=button],.cursor-pointer")) return true;
    curr = curr.parentElement;
  }
  return false;
}

const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  // Should show custom cursor (not on touch devices)
  const [shouldShow, setShouldShow] = useState(false);
  // Show the "View →" label
  const [showView, setShowView] = useState(false);
  // Hide custom cursor when mouse leaves window
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  // Mouse/ring positions, not state for performance
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number | null>(null);

  // Debounce helper
  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Detect touch device and set shouldShow
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0);

    setShouldShow(!isTouch);

    const handleTouch = () => setShouldShow(false);
    const handleMouse = () => setShouldShow(true);

    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  // Animate the trailing ring and label
  useEffect(() => {
    if (!shouldShow) return () => {};

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      if (!ringRef.current || !viewRef.current) return;

      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.2);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.2);

      if (!showView) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 22}px, ${ring.current.y - 22}px, 0)`;
        ringRef.current.style.opacity = isCursorVisible ? "1" : "0";
      }
      if (showView) {
        viewRef.current.style.transform = `translate3d(${ring.current.x - 48}px, ${ring.current.y - 24}px, 0)`;
        viewRef.current.style.opacity = isCursorVisible ? "1" : "0";
      }
      ringRef.current.style.opacity = showView || !isCursorVisible ? "0" : "1";
      viewRef.current.style.opacity = showView && isCursorVisible ? "1" : "0";

      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      animFrame.current = null;
    };
  }, [shouldShow, showView, isCursorVisible]);

  // Mousemove: move dot, update mouse position, set "View" and hover
  const handleMove = useCallback(
    debounce((e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
        dotRef.current.style.opacity = isCursorVisible ? "1" : "0";
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      setShowView(isSpecialTile(el));

      if (ringRef.current) {
        if (isClickable(el)) {
          ringRef.current.classList.add("cursor-hover");
        } else {
          ringRef.current.classList.remove("cursor-hover");
        }
      }
    }, 10),
    [isCursorVisible]
  );

  useEffect(() => {
    if (!shouldShow) return () => {};
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [shouldShow, handleMove]);

  // Hide browser cursor everywhere if using custom cursor
  useEffect(() => {
    if (shouldShow) {
      document.body.setAttribute("data-custom-cursor", "yes");
    } else {
      document.body.removeAttribute("data-custom-cursor");
    }
    return () => document.body.removeAttribute("data-custom-cursor");
  }, [shouldShow]);

  // Hide custom cursor when mouse leaves window, show when enters
  useEffect(() => {
    if (!shouldShow) return () => {};

    const handleMouseLeave = () => setIsCursorVisible(false);
    const handleMouseEnter = () => setIsCursorVisible(true);

    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={viewRef} className="custom-cursor-view">
        <span>View</span>
        <span>→</span>
      </div>
    </>
  );
};

export default Cursor;
