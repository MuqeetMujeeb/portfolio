"use client";

import { useEffect, useState } from "react";

// Fades between a list of roles on a timer.
export default function RotatingTitle({ roles, interval = 2800, fade = 450 }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (roles.length < 2) return;
    const id = setInterval(() => {
      setShow(false); // fade out
      setTimeout(() => {
        setI((p) => (p + 1) % roles.length);
        setShow(true); // fade in the next role
      }, fade);
    }, interval);
    return () => clearInterval(id);
  }, [roles.length, interval, fade]);

  return (
    <span className={`rotating-title ${show ? "in" : "out"}`}>{roles[i]}</span>
  );
}
