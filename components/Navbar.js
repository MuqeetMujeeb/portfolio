"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";
import { Icon } from "@/components/Icons";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Connect" },
];

export default function Navbar({ active, scrolled, onJump, onSummon }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function go(id) {
    setMenuOpen(false);
    onJump(id);
  }

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Brand / crest
        <button className="nav-brand" onClick={() => go("home")} aria-label="Back to top">
          <span className="nav-crest">{profile.shortName[0]}</span>
          <span className="nav-brand-text">{profile.shortName}</span>
        </button> */}

        {/* Desktop links with an animated active indicator */}
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <button
              key={l.id}
              className={`nav-link ${active === l.id ? "active" : ""}`}
              aria-current={active === l.id ? "true" : undefined}
              onClick={() => go(l.id)}
            >
              <span className="nav-link-label">{l.label}</span>
              <span className="nav-link-underline" />
            </button>
          ))}
        </nav>

        {/* Interactive CTA — summons the AI herald
        <button className="nav-summon" onClick={onSummon}>
          <span className="nav-summon-ico">
            <Icon.chat width="18" height="18" />
          </span>
          <span className="nav-summon-text">Ask the Herald</span>
          <span className="nav-summon-spark" />
        </button> */}

        {/* Mobile toggle */}
        <button
          className={`nav-burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div className={`nav-overlay ${menuOpen ? "open" : ""}`}>
        {LINKS.map((l) => (
          <button
            key={l.id}
            className={`nav-overlay-link ${active === l.id ? "active" : ""}`}
            onClick={() => go(l.id)}
          >
            {l.label}
          </button>
        ))}
        <button
          className="nav-overlay-link summon"
          onClick={() => {
            setMenuOpen(false);
            onSummon();
          }}
        >
          Ask the Herald
        </button>
      </div>
    </header>
  );
}
