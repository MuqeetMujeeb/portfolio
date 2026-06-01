"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import GateLoader from "@/components/GateLoader";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import Home from "@/components/sections/Home";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Connect from "@/components/sections/Connect";

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const lenisRef = useRef(null);

  // Lock scrolling until the gate is opened.
  useEffect(() => {
    document.body.classList.add("gate-locked");
    return () => document.body.classList.remove("gate-locked");
  }, []);

  // Initialise smooth scroll + scroll animations once the visitor enters.
  useEffect(() => {
    if (!entered) return;

    document.body.classList.remove("gate-locked");
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- Smooth scroll (Lenis) wired into GSAP's ticker ---
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;

    let wasScrolled = false;
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      const y = e && typeof e.scroll === "number" ? e.scroll : window.scrollY;
      const now = y > 60;
      if (now !== wasScrolled) {
        wasScrolled = now;
        setScrolled(now);
      }
    });

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        ScrollTrigger.batch(".reveal", {
          start: "top 88%",
          onEnter: (els) =>
            gsap.to(els, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.12,
              overwrite: true,
            }),
        });

        // Gentle parallax on each section's background image.
        gsap.utils.toArray("[data-parallax]").forEach((bg) => {
          gsap.set(bg, { scale: 1.08, transformOrigin: "center center" });
          gsap.fromTo(
            bg,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: bg.closest(".section"),
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      } else {
        gsap.set(".reveal", { opacity: 1, y: 0 });
      }
    });

    // --- Active-section tracking for the navbar ---
    const sections = gsap.utils.toArray(".section");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.55 }
    );
    sections.forEach((s) => io.observe(s));

    const refreshT = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshT);
      io.disconnect();
      gsap.ticker.remove(raf);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [entered]);

  function jumpTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.3 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <GateLoader onEnter={() => setEntered(true)} />

      {entered && (
        <Navbar
          active={active}
          scrolled={scrolled}
          onJump={jumpTo}
          onSummon={() => setChatOpen(true)}
        />
      )}

      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Connect />
      </main>

      {entered && (
        <Chatbot
          open={chatOpen}
          onOpen={() => setChatOpen(true)}
          onClose={() => setChatOpen(false)}
        />
      )}
    </>
  );
}
