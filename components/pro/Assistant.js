"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { profile } from "@/lib/profile";
import { on, prefersReducedMotion } from "@/lib/pro/fx";

const SUGGESTIONS = [
  "What does Muqeet do?",
  "Tell me about LioraAI",
  "What's his tech stack?",
  "How can I reach him?",
];
const GREETING = {
  role: "bot",
  text: `Hello. I can answer questions about ${profile.shortName}'s work, projects and skills. What would you like to know?`,
};

// Robot mascot (bottom-right) that doubles as the chat launcher. It follows the
// cursor, blinks, gives a short hint per page, "thinks" while the assistant is
// answering and looks happy when an answer arrives.
export default function Assistant({ hint }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [bubble, setBubble] = useState("");
  const [mood, setMoodState] = useState(""); // "" | is-happy | is-wave
  const [blink, setBlink] = useState(false);
  const botRef = useRef(null), headRef = useRef(null), lookRef = useRef(null);
  const bodyRef = useRef(null), inputRef = useRef(null);
  const bubbleT = useRef(0), moodT = useRef(0), openRef = useRef(false);
  openRef.current = open;

  const say = useCallback((text) => {
    if (!text || openRef.current) return;
    setBubble(text);
    clearTimeout(bubbleT.current);
    bubbleT.current = setTimeout(() => setBubble(""), 4200);
  }, []);
  const setMood = useCallback((cls, ms) => {
    setMoodState(cls);
    clearTimeout(moodT.current);
    moodT.current = setTimeout(() => setMoodState(""), ms);
  }, []);

  // page hint on each page change; on first load also wave hello
  const first = useRef(true);
  useEffect(() => {
    const t = setTimeout(() => {
      say(hint);
      if (first.current && !prefersReducedMotion()) setMood("is-wave", 1900);
      first.current = false;
    }, first.current ? 1400 : 500);
    return () => clearTimeout(t);
  }, [hint, say, setMood]);

  // events from pages: open chat, speak, mood
  useEffect(() => {
    const offs = [
      on("chat:open", () => setOpen(true)),
      on("robot:say", (t) => say(t)),
      on("robot:mood", ({ cls, ms }) => setMood(cls, ms)),
    ];
    return () => offs.forEach((f) => f());
  }, [say, setMood]);

  // head turns and eyes follow the pointer
  useEffect(() => {
    const reduce = prefersReducedMotion();
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const move = (e) => {
      const r = botRef.current?.getBoundingClientRect(); if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.35);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(d / 260, 1);
      tx = (dx / d) * k; ty = (dy / d) * k;
    };
    const track = () => {
      cx += (tx - cx) * (reduce ? 1 : 0.12); cy += (ty - cy) * (reduce ? 1 : 0.12);
      lookRef.current?.setAttribute("transform", `translate(${(cx * 6).toFixed(2)} ${(cy * 4).toFixed(2)})`);
      headRef.current?.setAttribute("transform", `rotate(${(cx * 8).toFixed(2)} 60 78)`);
      raf = requestAnimationFrame(track);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(track);
    let bt = 0;
    const blinkLoop = () => { bt = setTimeout(() => { setBlink(true); setTimeout(() => setBlink(false), 130); blinkLoop(); }, 2200 + Math.random() * 3400); };
    blinkLoop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); clearTimeout(bt); };
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, busy, open]);
  useEffect(() => {
    if (open) { setBubble(""); setMood("is-happy", 900); inputRef.current?.focus(); }
  }, [open, setMood]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && openRef.current) { setOpen(false); botRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setInput("");
    const next = [...messages, { role: "user", text: content }];
    setMessages(next);
    setBusy(true);
    let reply;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // prior turns, excluding the static greeting
        body: JSON.stringify({ history: next.slice(1).map((m) => ({ role: m.role, text: m.text })) }),
      });
      const data = await res.json();
      reply = data.reply || data.error;
    } catch {
      reply = null;
    }
    setMessages((m) => [...m, { role: "bot", text: reply || `I couldn't reach the assistant just now. Please try again, or email ${profile.contact.email}.` }]);
    setBusy(false);
    setMood("is-happy", 1200);
  }

  const botClass = ["robot", mood, busy ? "is-thinking" : "", blink ? "blink" : ""].filter(Boolean).join(" ");

  return (
    <>
      <div className="bot-wrap">
        <button
          className={`bot-bubble${bubble ? "" : " hide"}`}
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setOpen(true)}
        >
          {bubble}
        </button>
        <button
          ref={botRef}
          className={botClass}
          type="button"
          aria-label={`Ask ${profile.shortName}'s assistant`}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 120 140" aria-hidden="true">
            <defs>
              <linearGradient id="botMetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#55575d" /><stop offset="1" stopColor="#2a2c30" /></linearGradient>
              <linearGradient id="botBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#43454a" /><stop offset="1" stopColor="#222427" /></linearGradient>
              <radialGradient id="botGlow"><stop offset="0" stopColor="#f3e3bd" /><stop offset="1" stopColor="#cdbb93" stopOpacity="0" /></radialGradient>
            </defs>
            <ellipse className="shadow" cx="60" cy="134" rx="26" ry="4" fill="#000000" opacity="0.5" />
            <g className="float">
              <rect x="52" y="74" width="16" height="12" rx="3" fill="#2c2e32" />
              <rect x="22" y="90" width="10" height="26" rx="5" fill="#3a3c41" />
              <rect className="arm-r" x="88" y="90" width="10" height="26" rx="5" fill="#3a3c41" />
              <rect x="32" y="84" width="56" height="40" rx="14" fill="url(#botBody)" stroke="rgba(255,255,255,0.12)" />
              <circle cx="60" cy="101" r="7" fill="#0e0f11" stroke="rgba(205,187,147,0.55)" />
              <circle className="core" cx="60" cy="101" r="2.8" fill="#cdbb93" />
              <path d="M41 116 h38" stroke="rgba(205,187,147,0.45)" strokeDasharray="3 3" fill="none" />
              <g ref={headRef}>
                <line x1="60" y1="21" x2="60" y2="9" stroke="#6b6d72" strokeWidth="2.5" strokeLinecap="round" />
                <circle className="ant-glow" cx="60" cy="7" r="10" fill="url(#botGlow)" />
                <circle className="ant" cx="60" cy="7" r="4" />
                <rect x="13" y="38" width="9" height="20" rx="4.5" fill="#3a3c41" />
                <rect x="98" y="38" width="9" height="20" rx="4.5" fill="#3a3c41" />
                <rect x="20" y="20" width="80" height="58" rx="19" fill="url(#botMetal)" stroke="rgba(255,255,255,0.14)" />
                <rect x="29" y="30" width="62" height="38" rx="13" fill="#0e0f11" />
                <g ref={lookRef}>
                  <g className="eyes">
                    <rect className="eye" x="41" y="40" width="10" height="15" rx="5" fill="#cdbb93" />
                    <rect className="eye" x="69" y="40" width="10" height="15" rx="5" fill="#cdbb93" />
                    <path className="happy" d="M40 50 q6 -8 12 0 M68 50 q6 -8 12 0" stroke="#cdbb93" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </g>
                </g>
                <path d="M55 61 q5 3 10 0" stroke="#55575d" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </button>
      </div>

      {open && (
        <div className="chat" role="dialog" aria-label={`Chat with ${profile.shortName}'s assistant`}>
          <div className="chat-h">
            <span className="chat-mark" aria-hidden="true">m<i>.</i></span>
            <div>
              <div className="t">{profile.shortName}&apos;s assistant</div>
              <div className="s">Answers about his work and experience</div>
            </div>
            <button className="x-btn" type="button" aria-label="Close chat" onClick={() => { setOpen(false); botRef.current?.focus(); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <div className="chat-b" ref={bodyRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>{m.text}</div>
            ))}
            {busy && <div className="msg bot typing-dots" aria-label="Assistant is typing"><i /><i /><i /></div>}
          </div>
          {messages.length <= 1 && (
            <div className="sugs">
              {SUGGESTIONS.map((q) => (
                <button key={q} className="sug" type="button" onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}
          <form className="chat-f" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <label htmlFor="chatInput">Your question</label>
            <input
              id="chatInput"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about his work…"
              autoComplete="off"
              maxLength={2000}
            />
            <button type="submit" aria-label="Send" disabled={busy || !input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
