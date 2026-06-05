"use client";

import { useRef, useState } from "react";
import { profile } from "@/lib/profile";

export default function GateLoader({ onEnter, onFinish }) {
  const videoRef = useRef(null);
  const enteredRef = useRef(false);
  const [phase, setPhase] = useState("idle"); // idle | playing | exiting

  function start() {
    if (phase !== "idle") return;
    setPhase("playing");
    const v = videoRef.current;
    if (!v) return finishSequence();
    v.playbackRate = 2; // play the door-opening at 2x
    v.play().catch(() => finishSequence()); // if play is blocked, skip ahead
  }

  function finishSequence() {
    if (enteredRef.current) return;
    enteredRef.current = true;
    onEnter?.(); // reveal + unlock the home page behind the gate
    // gentle cross-dissolve: fade the gate out into the home page, then remove
    setTimeout(() => setPhase("exiting"), 60);
    setTimeout(() => onFinish?.(), 1000);
  }

  return (
    <div className={`video-gate ${phase === "exiting" ? "exiting" : ""}`}>
      <video
        ref={videoRef}
        className="video-gate-vid"
        src="/images/gate.mp4"
        muted
        playsInline
        preload="auto"
        onEnded={finishSequence}
      />

      {phase === "idle" && (
        <div className="gate-enter">
          <div className="gate-crest">{profile.shortName}</div>
          <div className="gate-sub">
            {profile.title} · {profile.location}
          </div>
          <button className="gate-knock" onClick={start}>
            Enter the Keep
          </button>
        </div>
      )}
    </div>
  );
}
