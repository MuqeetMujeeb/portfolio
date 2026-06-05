"use client";

import { useRef, useState } from "react";
import { profile } from "@/lib/profile";

export default function GateLoader({ onEnter, onFinish }) {
  const videoRef = useRef(null);
  const enteredRef = useRef(false);
  const [phase, setPhase] = useState("idle"); // idle | playing | exiting
  const [light, setLight] = useState(0); // white overlay opacity 0..1

  function start() {
    if (phase !== "idle") return;
    setPhase("playing");
    const v = videoRef.current;
    if (!v) return finishSequence();
    v.playbackRate = 2; // play the door-opening at 2x
    v.play().catch(() => finishSequence()); // if play is blocked, skip ahead
  }

  // Intensify the light over the last ~45% of the clip.
  function handleTime() {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const p = v.currentTime / v.duration;
    const ramp = (p - 0.55) / 0.45;
    setLight(Math.max(0, Math.min(1, ramp)));
  }

  function finishSequence() {
    if (enteredRef.current) return;
    enteredRef.current = true;
    setLight(1); // peak white flash
    onEnter?.(); // reveal + unlock the home page behind the gate
    // dissolve the whole gate (flash -> home), then remove it
    setTimeout(() => setPhase("exiting"), 140);
    setTimeout(() => onFinish?.(), 600);
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
        onTimeUpdate={handleTime}
        onEnded={finishSequence}
      />
      <div className="video-gate-light" style={{ opacity: light }} />

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
