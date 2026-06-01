"use client";

import { useEffect, useState } from "react";
import GateLoader from "@/components/GateLoader";
import PageFx from "@/components/PageFx";
import Home from "@/components/sections/Home";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);

  // Show the castle gate once per browsing session (not on in-app navigation).
  useEffect(() => {
    const done = sessionStorage.getItem("entered") === "1";
    setEntered(done);
    setReady(true);
    if (!done) document.body.classList.add("gate-locked");
    return () => document.body.classList.remove("gate-locked");
  }, []);

  function handleEnter() {
    sessionStorage.setItem("entered", "1");
    document.body.classList.remove("gate-locked");
    setEntered(true);
  }

  return (
    <>
      {ready && !entered && <GateLoader onEnter={handleEnter} />}
      <PageFx>
        <Home />
      </PageFx>
    </>
  );
}
