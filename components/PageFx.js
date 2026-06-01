"use client";

import { useEffect } from "react";
import gsap from "gsap";

// Per-page entrance animation (reveal-in) + gentle background parallax.
// Replaces the old single-page ScrollTrigger system now that each section
// is its own route.
export default function PageFx({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveals = gsap.utils.toArray(".reveal");
    let tween;
    if (reduce) {
      gsap.set(reveals, { opacity: 1, y: 0 });
    } else {
      gsap.set(reveals, { opacity: 0, y: 38 });
      tween = gsap.to(reveals, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.15,
      });
    }

    // Subtle parallax on the section background as the page scrolls.
    const bgs = gsap.utils.toArray("[data-parallax]");
    bgs.forEach((b) => (b.style.transform = "scale(1.08)"));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        bgs.forEach((b) => {
          b.style.transform = `scale(1.08) translateY(${y * 0.12}px)`;
        });
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (tween) tween.kill();
    };
  }, []);

  return children;
}
