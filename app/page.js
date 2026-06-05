"use client";

import { useEffect, useState } from "react";
import GateLoader from "@/components/GateLoader";
import PageFx from "@/components/PageFx";
import Home from "@/components/sections/Home";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [showGate, setShowGate] = useState(false);

  // Show the castle gate once per browsing session (not on in-app navigation).
  useEffect(() => {
    const done = sessionStorage.getItem("entered") === "1";
    setReady(true);
    if (!done) {
      setShowGate(true);
      document.body.classList.add("gate-locked");
    }
    return () => document.body.classList.remove("gate-locked");
  }, []);

  // Called at the light's peak — reveal & unlock the home page behind the gate.
  function handleEnter() {
    sessionStorage.setItem("entered", "1");
    document.body.classList.remove("gate-locked");
  }

  // Called after the gate has fully dissolved into the home page.
  function handleFinish() {
    setShowGate(false);
  }

  return (
    <>
      {ready && showGate && (
        <GateLoader onEnter={handleEnter} onFinish={handleFinish} />
      )}
      <PageFx>
        <Home />
      </PageFx>
    </>
  );
}
