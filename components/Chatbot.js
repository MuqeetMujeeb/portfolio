"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";
import { Icon } from "@/components/Icons";

const SUGGESTIONS = [
  "What does Muqeet do?",
  "Tell me about his projects",
  "What's his tech stack?",
  "How can I reach him?",
];

const GREETING = {
  role: "bot",
  text: `Greetings. I'm ${profile.shortName}'s assistant — ask me anything about his work, projects, or skills.`,
};

export default function Chatbot({ open, onOpen, onClose }) {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, busy, open]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setInput("");
    const next = [...messages, { role: "user", text: content }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Send prior turns (exclude the static greeting) for context.
          history: next
            .slice(1)
            .map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text:
            data.reply ||
            data.error ||
            "My apologies — I couldn't reach the archives just now.",
        },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text:
            "The ravens failed to deliver that message. Please try again, or email me at " +
            profile.contact.email +
            ".",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  if (!open) {
    return (
      <button
        className="chat-fab"
        onClick={onOpen}
        aria-label="Open chat with Muqeet's AI assistant"
      >
        <Icon.chat />
      </button>
    );
  }

  return (
    <div className="chat-window" role="dialog" aria-label="Chat with Muqeet's AI assistant">
      <div className="chat-header">
        <div className="seal">{profile.shortName[0]}</div>
        <div>
          <div className="ch-title">Ask the assistant</div>
          <div className="ch-sub">{profile.shortName}&apos;s AI assistant</div>
        </div>
        <button className="ch-close" onClick={onClose} aria-label="Close chat">
          ×
        </button>
      </div>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.text}
          </div>
        ))}
        {busy && (
          <div className="msg bot typing" aria-label="assistant is typing">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="chat-suggest">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask about Muqeet's work…"
          aria-label="Type your message"
        />
        <button onClick={() => send()} disabled={busy || !input.trim()} aria-label="Send">
          <Icon.send />
        </button>
      </div>
    </div>
  );
}
