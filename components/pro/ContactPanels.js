"use client";

import { useRef, useState } from "react";
import { profile } from "@/lib/profile";
import { Icon } from "@/components/Icons";
import FillText from "@/components/pro/FillText";
import { Arrow } from "@/components/pro/PageParts";
import { emit } from "@/lib/pro/fx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function CopyButton({ value }) {
  return (
    <button
      className="small-btn"
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(value); emit("toast", `Copied ${value}`); }
        catch { emit("toast", "Couldn't copy. Select the text and press Ctrl+C."); }
      }}
    >
      Copy
    </button>
  );
}

function CommentForm() {
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
      emit("robot:mood", { cls: "is-happy", ms: 1800 });
      emit("robot:say", "Thanks for the note! He'll be glad you wrote.");
      setTimeout(() => againRef.current?.focus({ preventScroll: true }), 400);
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
    <form className={`panel stitched note${state === "sent" ? " sent" : ""}`} noValidate onSubmit={submit} data-r style={{ "--i": 8 }}>
      <div className="note-head">
        <strong>Love the profile? Leave a comment.</strong>
        <p>Tell me what stood out, or say hello. I&apos;ll reply to your email.</p>
      </div>
      <div className="note-fields">
        <div className="field">
          <label htmlFor="noteEmail">Your email</label>
          <input
            id="noteEmail" ref={emailRef} name="email" type="email" placeholder="you@company.com" autoComplete="email" required
            value={email} aria-invalid={err.field === "email" || undefined}
            onChange={(e) => { setEmail(e.target.value); setErr({ field: null, text: "" }); }}
          />
        </div>
        <div className="field">
          <label htmlFor="noteMsg">Comment</label>
          <textarea
            id="noteMsg" ref={msgRef} name="comment" rows={1} maxLength={1000} placeholder="What did you think?" required
            value={comment} aria-invalid={err.field === "comment" || undefined}
            onChange={(e) => { setComment(e.target.value); setErr({ field: null, text: "" }); }}
          />
        </div>
        {/* hidden from people; bots that fill every field get dropped */}
        <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div className="note-actions">
        <span className="note-err" role="alert">{err.text}</span>
        <button className="btn primary" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : <>Send comment <Arrow size={16} /></>}
        </button>
      </div>
      {state === "sent" && (
        <div className="note-thanks">
          <div className="burst" aria-hidden="true">
            <svg viewBox="0 0 72 72" fill="none" stroke="#cdbb93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle className="ring" cx="36" cy="36" r="32" /><path className="tick" d="M23 37l9 9 18-19" /></svg>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <span key={a} className="spark" style={{ "--a": `${a}deg` }} />)}
          </div>
          <FillText as="h3" text="Thank you!" />
          <p>Your comment means a lot. I&apos;ll get back to you at {sentTo}.</p>
          <button className="small-btn" type="button" ref={againRef} onClick={reset}>Leave another comment</button>
        </div>
      )}
    </form>
  );
}

export default function ContactPanels() {
  const { contact } = profile;
  const cards = [
    { k: "Email", v: <>a.muqeetmujeeb<wbr />@gmail.com</>, icon: <Icon.email width="20" height="20" />, action: <CopyButton value={contact.email} /> },
    { k: "Phone", v: contact.phone, icon: <Icon.phone width="20" height="20" />, action: <CopyButton value={contact.phone} /> },
    { k: "LinkedIn", v: <>linkedin.com/in/<wbr />muqeetmujeeb</>, icon: <Icon.linkedin width="18" height="18" />, action: <a className="small-btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer">Open</a> },
    { k: "GitHub", v: <>github.com/<wbr />MuqeetMujeeb</>, icon: <Icon.github width="20" height="20" />, action: <a className="small-btn" href={contact.github} target="_blank" rel="noopener noreferrer">Open</a> },
  ];
  return (
    <div className="contact-layout">
      <div className="contact-main">
        <div className="contact-grid">
          {cards.map((c, i) => (
            <div className="panel c-card" key={c.k} data-r style={{ "--i": 3 + i }}>
              <span className="c-ico" aria-hidden="true">{c.icon}</span>
              <div className="c-body"><div className="k">{c.k}</div><div className="v">{c.v}</div></div>
              <div className="c-act">{c.action}</div>
            </div>
          ))}
        </div>
        <div className="panel stitched ask-strip" data-r style={{ "--i": 7 }}>
          <div><strong>Have a quick question?</strong><p>My assistant can answer questions about my work, projects and experience.</p></div>
          <button className="btn primary" type="button" onClick={() => emit("chat:open")}>Ask my assistant</button>
        </div>
      </div>
      <CommentForm />
    </div>
  );
}
