"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";
import Modal from "@/components/Modal";

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
  return (
    <Modal open={!!domain} onClose={onClose} label={domain?.title}>
      {domain && (
        <>
          <h3 className="sk-modal-title">
            <span className="rune">{rune}</span>
            {domain.title}
          </h3>
          <FlourishDivider />
          <SkillRows domain={domain} />
          <Legend />
        </>
      )}
    </Modal>
  );
}
