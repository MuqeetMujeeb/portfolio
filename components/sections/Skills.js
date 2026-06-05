"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";

const runes = ["✦", "⚔", "⛭", "❮❯"];

function SkillRows({ domain }) {
  return (
    <div className="skill-rows">
      {domain.rows.map((row) => (
        <div key={row.label} className="skill-row">
          <span className="skill-row-label">{row.label}</span>
          <div className="skill-row-chips">
            {row.c.map((s) => (
              <span key={s} className="chip core">
                {s}
              </span>
            ))}
            {row.f.map((s) => (
              <span key={s} className="chip familiar">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const Legend = () => (
  <div className="skill-legend">
    <span className="legend-item">
      <i className="legend-dot core" /> Core expertise
    </span>
    <span className="legend-item">
      <i className="legend-dot familiar" /> Familiar
    </span>
  </div>
);

export default function Skills() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="skills" className="section" data-nav="Skills">
      <div
        className="section-bg"
        style={{ backgroundImage: "url('/images/skills.webp')" }}
        data-parallax
      />
      <div className="section-scrim" />
      <div className="container">
        <div className="skills-head">
          <span className="eyebrow reveal">The Armory</span>
          <h2 className="section-title reveal">Skills &amp; Craft</h2>
          <FlourishDivider className="divider" />
          <p className="lead reveal">
            The tools, frameworks, and technologies I build with.
          </p>
          <Legend />
        </div>

        <div className="skills-grid">
          {profile.skillDomains.map((domain, i) => (
            <div
              key={domain.title}
              className="panel skill-card reveal"
              role="button"
              tabIndex={0}
              aria-label={`Expand ${domain.title}`}
              onClick={() => setOpenIdx(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenIdx(i);
                }
              }}
            >
              <span className="skill-expand" aria-hidden="true">
                ⤢
              </span>
              <h3>
                <span className="rune">{runes[i % runes.length]}</span>
                {domain.title}
              </h3>
              <SkillRows domain={domain} />
            </div>
          ))}
        </div>
      </div>

      <SkillModal
        domain={openIdx != null ? profile.skillDomains[openIdx] : null}
        rune={openIdx != null ? runes[openIdx % runes.length] : ""}
        onClose={() => setOpenIdx(null)}
      />
    </section>
  );
}

function SkillModal({ domain, rune, onClose }) {
  useEffect(() => {
    if (!domain) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [domain, onClose]);

  if (!domain || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="sk-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={domain.title}
    >
      <div
        className="panel panel-framed sk-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="sk-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h3 className="sk-modal-title">
          <span className="rune">{rune}</span>
          {domain.title}
        </h3>
        <FlourishDivider />
        <SkillRows domain={domain} />
        <Legend />
      </div>
    </div>,
    document.body
  );
}
