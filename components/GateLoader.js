"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

export default function GateLoader({ onEnter }) {
  const [phase, setPhase] = useState("closed"); // closed -> opening -> gone
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Preload the section background images while the gate is shut.
    const imgs = [
      "home",
      "about",
      "skills",
      "projects",
      "connect",
    ].map((n) => {
      const img = new Image();
      img.src = `/images/${n}.png`;
      return img;
    });
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  function handleEnter() {
    if (phase !== "closed") return;
    setPhase("opening");
    // Reveal the site shortly after the doors begin to part.
    setTimeout(() => onEnter?.(), 900);
    // Remove the gate from the layer stack once fully open.
    setTimeout(() => setPhase("gone"), 2100);
  }

  if (phase === "gone") return null;

  return (
    <div className={`gate ${phase === "opening" ? "opening" : ""}`} aria-hidden={phase !== "closed"}>
      <div className="gate-leaf left" />
      <div className="gate-glow" />
      <div className="gate-leaf right" />
      <div className="gate-enter">
        <div className="gate-crest">{profile.shortName}</div>
        <div className="gate-sub">{profile.title} · {profile.location}</div>
        <button
          className="gate-knock"
          onClick={handleEnter}
          disabled={!ready}
        >
          {ready ? "Enter the Keep" : "Unbarring the gate…"}
        </button>
      </div>
    </div>
  );
}
