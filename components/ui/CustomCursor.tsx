"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches) return;
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = (e.clientX - 4) + "px";
        dotRef.current.style.top = (e.clientY - 4) + "px";
      }

      if (!visible) setVisible(true);
    };

    let rafId: number;
    const animateRing = () => {
      ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + "px";
        ringRef.current.style.top = ringPos.current.y + "px";
      }
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    document.addEventListener("mousemove", onMouseMove);

    // Hover expansion on interactive elements
    const hoverTargets = () => document.querySelectorAll("a, button, .card, [role='button']");
    const addHover = () => ringRef.current?.classList.add("hovering");
    const removeHover = () => ringRef.current?.classList.remove("hovering");

    const observer = new MutationObserver(() => {
      hoverTargets().forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });

    // Initial bind
    hoverTargets().forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
