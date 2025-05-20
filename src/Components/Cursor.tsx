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
  const [isCursorVisible, setIsCursorVisible] = useState(false); // Start invisible

  // Mouse/ring positions
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number | null>(null);

  // Log ref initialization
  useEffect(() => {
    console.log("Refs initialized:", {
      dotRef: !!dotRef.current,
      ringRef: !!ringRef.current,
      viewRef: !!viewRef.current,
    });
  }, []);

  // Detect touch device and set shouldShow
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0);

    console.log("Touch detection:", { isTouch, shouldShow: !isTouch });
    setShouldShow(!isTouch);

    const handleTouch = () => {
      console.log("Touch detected, disabling custom cursor");
      setShouldShow(false);
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  // Mousemove: update positions and states
  const handleMove = useCallback((e: MouseEvent) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;

    // Initialize ring position and show cursor
    if (!isCursorVisible) {
      ring.current.x = e.clientX;
      ring.current.y = e.clientY;
      setIsCursorVisible(true);
      console.log("First move, initializing ring:", {
        x: e.clientX,
        y: e.clientY,
        isCursorVisible: true,
      });
    }

    // Update view and hover states
    const el = document.elementFromPoint(e.clientX, e.clientY);
    setShowView(isSpecialTile(el));

    if (ringRef.current) {
      if (isClickable(el)) {
        ringRef.current.classList.add("cursor-hover");
      } else {
        ringRef.current.classList.remove("cursor-hover");
      }
    }

    console.log("Mouse move:", {
      mouseX: mouse.current.x,
      mouseY: mouse.current.y,
      ringX: ring.current.x,
      ringY: ring.current.y,
      showView,
    });
  }, [isCursorVisible]);

  useEffect(() => {
    if (!shouldShow) return () => {};
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [shouldShow, handleMove]);

  // Animate the trailing ring, dot, and label
  useEffect(() => {
    if (!shouldShow || !isCursorVisible) {
      // Immediately hide elements
      if (dotRef.current && ringRef.current && viewRef.current) {
        dotRef.current.style.opacity = "0";
        ringRef.current.style.opacity = "0";
        viewRef.current.style.opacity = "0";
        dotRef.current.style.transform = `translate3d(-9999px, -9999px, 0)`;
        ringRef.current.style.transform = `translate3d(-9999px, -9999px, 0)`;
        viewRef.current.style.transform = `translate3d(-9999px, -9999px, 0)`;
      }
      console.log("Animation stopped: shouldShow=", shouldShow, "isCursorVisible=", isCursorVisible);
      return () => {
        if (animFrame.current) cancelAnimationFrame(animFrame.current);
        animFrame.current = null;
      };
    }

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      if (!ringRef.current || !dotRef.current || !viewRef.current) {
        console.log("Animation aborted: refs missing");
        return;
      }

      // Update ring position with lerp
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.2);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.2);

      // Update dot position (instant)
      dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0)`;
      dotRef.current.style.opacity = "1";

      // Update ring position
      ringRef.current.style.transform = `translate3d(${ring.current.x - 22}px, ${ring.current.y - 22}px, 0)`;
      ringRef.current.style.opacity = showView ? "0" : "1";

      // Update view label position
      viewRef.current.style.transform = `translate3d(${ring.current.x - 48}px, ${ring.current.y - 24}px, 0)`;
      viewRef.current.style.opacity = showView ? "1" : "0";

      console.log("Animation frame:", {
        mouseX: mouse.current.x,
        mouseY: mouse.current.y,
        ringX: ring.current.x,
        ringY: ring.current.y,
        dotOpacity: dotRef.current.style.opacity,
        ringOpacity: ringRef.current.style.opacity,
        dotTransform: dotRef.current.style.transform,
        ringTransform: ringRef.current.style.transform,
      });

      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      animFrame.current = null;
    };
  }, [shouldShow, showView, isCursorVisible]);

  // Hide browser cursor when custom cursor is active
  useEffect(() => {
    if (shouldShow && isCursorVisible) {
      document.body.setAttribute("data-custom-cursor", "yes");
    } else {
      document.body.removeAttribute("data-custom-cursor");
    }
    console.log("Cursor attribute:", {
      shouldShow,
      isCursorVisible,
      dataCustomCursor: document.body.getAttribute("data-custom-cursor"),
    });
    return () => document.body.removeAttribute("data-custom-cursor");
  }, [shouldShow, isCursorVisible]);

  // Handle mouse leave/enter
  useEffect(() => {
    if (!shouldShow) return () => {};

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
      // Immediately hide elements
      if (dotRef.current && ringRef.current && viewRef.current) {
        dotRef.current.style.opacity = "0";
        ringRef.current.style.opacity = "0";
        viewRef.current.style.opacity = "0";
        dotRef.current.style.transform = `translate3d(-9999px, -9999px, 0)`;
        ringRef.current.style.transform = `translate3d(-9999px, -9999px, 0)`;
        viewRef.current.style.transform = `translate3d(-9999px, -9999px, 0)`;
      }
      console.log("Mouse left: isCursorVisible=false");
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
      console.log("Mouse entered: isCursorVisible=true");
    };

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
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      />
      <div
        ref={viewRef}
        className="custom-cursor-view"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        <span>View</span>
        <span>→</span>
      </div>
    </>
  );
};

export default Cursor;
