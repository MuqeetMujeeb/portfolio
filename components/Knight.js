"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const HINTS = {
  "/classic": "Hail, traveller! I guard Muqeet's keep. Click me to ask about his work.",
  "/classic/about": "Turn the pages with the ribbons on either side.",
  "/classic/skills": "Open any card for a closer look at the armory.",
  "/classic/projects": "Select a chronicle for the full tale.",
  "/classic/connect": "Leave a comment below, or ask me anything.",
};

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Knight mascot for the medieval edition (bottom-right). It opens the Herald
// chat, follows the cursor through its visor, blinks, salutes, gives a hint on
// each page, "thinks" while the Herald answers and cheers when a reply lands.
// Other components can make it react with:
//   window.dispatchEvent(new CustomEvent("knight", { detail: { say, mood } }))
export default function Knight({ open, busy, replies, onToggle }) {
  const pathname = usePathname();
  const [bubble, setBubble] = useState("");
  const [mood, setMoodState] = useState(""); // "" | is-happy | is-salute
  const [blink, setBlink] = useState(false);
  const btnRef = useRef(null), headRef = useRef(null), lookRef = useRef(null);
  const bubbleT = useRef(0), moodT = useRef(0), openRef = useRef(open);
  openRef.current = open;

  const say = useCallback((text) => {
    if (!text || openRef.current) return;
    setBubble(text);
    clearTimeout(bubbleT.current);
    bubbleT.current = setTimeout(() => setBubble(""), 4600);
  }, []);
  const setMood = useCallback((cls, ms) => {
    setMoodState(cls);
    clearTimeout(moodT.current);
    moodT.current = setTimeout(() => setMoodState(""), ms);
  }, []);

  // Hint per page (waits until the castle gate has opened); salute on first visit.
  const first = useRef(true);
  useEffect(() => {
    let t = 0, cancelled = false;
    const attempt = () => {
      if (cancelled) return;
      if (document.body.classList.contains("gate-locked")) { t = setTimeout(attempt, 600); return; }
      say(HINTS[pathname]);
      if (first.current && !reduceMotion()) setMood("is-salute", 1900);
      first.current = false;
    };
    t = setTimeout(attempt, first.current ? 1500 : 500);
    return () => { cancelled = true; clearTimeout(t); };
  }, [pathname, say, setMood]);

  // Cheer when a new reply arrives.
  const lastReplies = useRef(replies);
  useEffect(() => {
    if (replies > lastReplies.current) setMood("is-happy", 1300);
    lastReplies.current = replies;
  }, [replies, setMood]);

  useEffect(() => { if (open) { setBubble(""); setMood("is-happy", 900); } }, [open, setMood]);

  // Reactions requested by other components (e.g. the comment form).
  useEffect(() => {
    const onKnight = (e) => {
      const { say: text, mood: m } = e.detail || {};
      if (m) setMood(m, 1800);
      if (text) say(text);
    };
    window.addEventListener("knight", onKnight);
    return () => window.removeEventListener("knight", onKnight);
  }, [say, setMood]);

  // Helmet turns and the eyes in the visor follow the pointer; periodic blink.
  useEffect(() => {
    const reduce = reduceMotion();
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, bt = 0;
    const move = (e) => {
      const r = btnRef.current?.getBoundingClientRect(); if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.35);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(d / 260, 1);
      tx = (dx / d) * k; ty = (dy / d) * k;
    };
    const track = () => {
      cx += (tx - cx) * (reduce ? 1 : 0.12); cy += (ty - cy) * (reduce ? 1 : 0.12);
      lookRef.current?.setAttribute("transform", `translate(${(cx * 7).toFixed(2)} ${(cy * 1.6).toFixed(2)})`);
      headRef.current?.setAttribute("transform", `rotate(${(cx * 7).toFixed(2)} 60 84)`);
      raf = requestAnimationFrame(track);
    };
    const blinkLoop = () => { bt = setTimeout(() => { setBlink(true); setTimeout(() => setBlink(false), 130); blinkLoop(); }, 2400 + Math.random() * 3400); };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(track);
    blinkLoop();
    return () => { cancelAnimationFrame(raf); clearTimeout(bt); window.removeEventListener("pointermove", move); };
  }, []);

  const cls = ["knight", mood, busy ? "is-thinking" : "", blink ? "blink" : ""].filter(Boolean).join(" ");

  return (
    <div className="knight-wrap">
      <button className={`knight-bubble${bubble ? "" : " hide"}`} type="button" aria-hidden="true" tabIndex={-1} onClick={onToggle}>
        {bubble}
      </button>
      <button ref={btnRef} className={cls} type="button" aria-label="Ask the Herald about Muqeet" aria-expanded={open} onClick={onToggle}>
        <svg viewBox="0 0 120 150" aria-hidden="true">
          <defs>
            <linearGradient id="kSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e3e6ea" /><stop offset=".55" stopColor="#9aa0a8" /><stop offset="1" stopColor="#5c626b" /></linearGradient>
            <linearGradient id="kTabard" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7a2433" /><stop offset="1" stopColor="#481420" /></linearGradient>
            <radialGradient id="kGlow"><stop offset="0" stopColor="#f6dc94" /><stop offset="1" stopColor="#e7c97a" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse className="k-shadow" cx="60" cy="145" rx="28" ry="4" fill="#000000" opacity="0.5" />
          <g className="k-float">
            {/* sword arm (salutes) */}
            <g className="k-sword">
              <rect x="25" y="62" width="4" height="46" rx="1" fill="#e8ebef" stroke="#8a9098" strokeWidth=".6" />
              <rect x="20" y="106" width="14" height="3.5" rx="1.5" fill="#cda44d" />
              <rect x="25.5" y="109" width="3" height="9" rx="1.2" fill="#5b3a1c" />
              <circle cx="27" cy="120" r="2.4" fill="#cda44d" />
              <rect x="22" y="96" width="10" height="26" rx="5" fill="url(#kSteel)" opacity=".9" />
            </g>
            {/* gorget + tabard */}
            <rect x="49" y="80" width="22" height="11" rx="4" fill="#7d838c" />
            <path d="M38 98c0-8 6-12 12-12h20c6 0 12 4 12 12v26c0 6-4 10-10 10H48c-6 0-10-4-10-10z" fill="url(#kTabard)" stroke="#cda44d" strokeWidth="1.2" />
            <path d="M60 96v26M51 107h18" stroke="#e7c97a" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M40 124h40" stroke="#cda44d" strokeWidth="1.4" strokeDasharray="3 3" />
            {/* shield */}
            <path d="M80 98h24v15c0 11-6 17-12 21-6-4-12-10-12-21z" fill="#2a2017" stroke="#cda44d" strokeWidth="1.6" />
            <path d="M84 102l16 20" stroke="#cda44d" strokeWidth="3" strokeLinecap="round" />
            {/* helmet */}
            <g ref={headRef}>
              <path className="k-plume" d="M60 22C62 6 80 1 94 9c-10 0-17 5-22 15z" fill="#9c3a3a" />
              <circle className="k-glow" cx="60" cy="54" r="30" fill="url(#kGlow)" opacity="0" />
              <path d="M30 54C30 32 44 20 60 20s30 12 30 34v16c0 8-8 14-16 14H46c-8 0-16-6-16-14z" fill="url(#kSteel)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M60 21v24" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
              <rect x="35" y="47" width="50" height="12" rx="6" fill="#0e0a06" />
              <g ref={lookRef}>
                <g className="k-eyes">
                  <rect className="k-eye" x="45" y="50" width="9" height="6" rx="3" fill="#e7c97a" />
                  <rect className="k-eye" x="66" y="50" width="9" height="6" rx="3" fill="#e7c97a" />
                  <path className="k-happy" d="M45 56q4.5-5 9 0M66 56q4.5-5 9 0" stroke="#e7c97a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                </g>
              </g>
              <g fill="#3a3f46">
                <circle cx="52" cy="68" r="1.5" /><circle cx="60" cy="68" r="1.5" /><circle cx="68" cy="68" r="1.5" />
                <circle cx="56" cy="74" r="1.5" /><circle cx="64" cy="74" r="1.5" />
              </g>
              <circle cx="34" cy="62" r="2" fill="#cda44d" /><circle cx="86" cy="62" r="2" fill="#cda44d" />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}
