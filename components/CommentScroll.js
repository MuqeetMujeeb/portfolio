"use client";

import { useRef, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// "Love the profile? Leave a comment." for the medieval Connect page. Posts to
// the same /api/comment route as the professional edition; on success a red
// wax seal stamps down and the knight reacts.
export default function CommentScroll() {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [err, setErr] = useState({ field: null, text: "" });
  const [state, setState] = useState("idle"); // idle | sending | sent
  const [sentTo, setSentTo] = useState("");
  const emailRef = useRef(null), msgRef = useRef(null), againRef = useRef(null);

  async function submit(e) {
    e.preventDefault();
    const em = email.trim(), tx = comment.trim();
    if (!EMAIL_RE.test(em)) { setErr({ field: "email", text: "Enter a valid email address so I can reply." }); emailRef.current?.focus(); return; }
    if (tx.length < 2) { setErr({ field: "comment", text: "Write a short comment before sending." }); msgRef.current?.focus(); return; }
    setState("sending");
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: em, comment: tx, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Your comment couldn't be sent just now. Please try again.");
      setSentTo(em);
      setState("sent");
      window.dispatchEvent(new CustomEvent("knight", { detail: { mood: "is-happy", say: "Thy message is delivered! He'll be glad you wrote." } }));
      setTimeout(() => againRef.current?.focus({ preventScroll: true }), 500);
    } catch (e2) {
      setState("idle");
      setErr({ field: null, text: e2.message });
    }
  }

  function reset() {
    setEmail(""); setComment(""); setErr({ field: null, text: "" }); setState("idle");
    setTimeout(() => emailRef.current?.focus(), 0);
  }

  return (
    <form className={`comment-scroll reveal${state === "sent" ? " sent" : ""}`} noValidate onSubmit={submit}>
      <div className="cs-head">
        <h3>Love the profile? Leave a comment.</h3>
        <p>Tell me what stood out, or simply say hail. I&apos;ll reply to your email.</p>
      </div>
      <div className="cs-fields">
        <label className="cs-field">
          <span>Your email</span>
          <input
            ref={emailRef} type="email" name="email" placeholder="you@company.com" autoComplete="email" required
            value={email} aria-invalid={err.field === "email" || undefined}
            onChange={(e) => { setEmail(e.target.value); setErr({ field: null, text: "" }); }}
          />
        </label>
        <label className="cs-field">
          <span>Comment</span>
          <textarea
            ref={msgRef} name="comment" rows={3} maxLength={1000} placeholder="What did you think?" required
            value={comment} aria-invalid={err.field === "comment" || undefined}
            onChange={(e) => { setComment(e.target.value); setErr({ field: null, text: "" }); }}
          />
        </label>
        {/* hidden from people; bots that fill every field get dropped */}
        <input className="cs-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div className="cs-actions">
        <span className="cs-err" role="alert">{err.text}</span>
        <button className="cs-send" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send comment"}
        </button>
      </div>

      {state === "sent" && (
        <div className="cs-thanks">
          <div className="wax" aria-hidden="true">
            <svg viewBox="0 0 80 80">
              <path d="M40 4c6 0 8 5 13 6s10-2 14 2 1 9 3 13 7 6 7 13-5 8-6 13 2 10-2 14-9 1-13 3-6 7-13 7-8-5-13-6-10 2-14-2-1-9-3-13-7-6-7-13 5-8 6-13-2-10 2-14 9-1 13-3 6-7 13-7z" fill="#8f2a2a" />
              <circle cx="40" cy="40" r="23" fill="none" stroke="#b5463f" strokeWidth="2" />
              <text x="40" y="50" textAnchor="middle" fontFamily="var(--font-title), serif" fontSize="28" fontWeight="800" fill="#e9b9a4">M</text>
            </svg>
          </div>
          <h3>Thank you!</h3>
          <p>Your words have been delivered. I&apos;ll reply to you at {sentTo}.</p>
          <button className="cs-again" type="button" ref={againRef} onClick={reset}>Leave another comment</button>
        </div>
      )}
    </form>
  );
}
