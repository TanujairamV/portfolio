import { useEffect, useRef } from "react";

/**
 * React hook to add fade-in effect on scroll for any element.
 */
export function useFadeInOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function handle(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add("visible");
        } else {
          el.classList.remove("visible");
        }
      });
    }

    const observer = new window.IntersectionObserver(handle, {
      threshold: 0.12,
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return ref;
}
