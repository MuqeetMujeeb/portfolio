"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";

const ROMAN = ["I", "II", "III"];

export default function About() {
  const [active, setActive] = useState(0);
  const { education } = profile;
  const current = profile.experience[0];

  const pages = [
    { tab: "About", render: () => <AboutPage education={education} current={current} /> },
    { tab: "Experience", render: () => <ExperiencePage exp={profile.experience} /> },
    { tab: "Interests", render: () => <InterestsPage interests={profile.interests} /> },
  ];

  const go = (i) => setActive(Math.max(0, Math.min(pages.length - 1, i)));

  return (
    <section id="about" className="section" data-nav="About">
      <div
        className="section-bg"
        style={{ backgroundImage: "url('/images/about.png')" }}
        data-parallax
      />
      <div className="section-scrim" />
      <div className="container">
        <div className="about-grid reveal">
          {/* Stack of parchment sheets */}
          <div className="paper-stack">
            {pages.map((page, i) => {
              const diff = i - active;
              return (
                <article
                  key={i}
                  className={`paper ${diff === 0 ? "is-active" : diff < 0 ? "is-read" : "is-stacked"}`}
                  style={{
                    zIndex: 10 - Math.abs(diff),
                    // upcoming sheets peek out behind the active one
                    transform:
                      diff <= 0
                        ? diff === 0
                          ? "none"
                          : "translateX(-128%) rotate(-10deg)"
                        : `translate(${diff * 7}px, ${diff * 12}px) rotate(${diff * 1.6}deg) scale(${1 - diff * 0.035})`,
                    opacity: diff < 0 ? 0 : diff > 2 ? 0 : 1,
                    pointerEvents: diff === 0 ? "auto" : "none",
                  }}
                  aria-hidden={diff !== 0}
                >
                  <div className="paper-body">{page.render()}</div>
                </article>
              );
            })}
          </div>

          {/* Flip controls */}
          <div className="paper-nav reveal">
            <button
              className="paper-arrow"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous page"
            >
              ‹
            </button>
            <div className="paper-tabs">
              {pages.map((p, i) => (
                <button
                  key={i}
                  className={`paper-tab ${i === active ? "active" : ""}`}
                  onClick={() => go(i)}
                >
                  <span className="paper-tab-num">{ROMAN[i]}</span>
                  <span className="paper-tab-label">{p.tab}</span>
                </button>
              ))}
            </div>
            <button
              className="paper-arrow"
              onClick={() => go(active + 1)}
              disabled={active === pages.length - 1}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Page 1: the original About content ---- */
function AboutPage({ education, current }) {
  return (
    <>
      <span className="eyebrow">The Tale So Far</span>
      <h2 className="section-title paper-title">About Me</h2>
      <FlourishDivider />
      <div className="about-body">
        {profile.about.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <div className="about-meta">
        <div>
          <div className="label">Current Post</div>
          <div className="value">{current.role}</div>
          <div className="value subtle">{current.company}</div>
        </div>
        <div>
          <div className="label">Studies</div>
          <div className="value">B.E. CSE (AI &amp; ML)</div>
          <div className="value subtle">
            GPA {education.gpa} · {education.school}
          </div>
        </div>
        <div>
          <div className="label">Seat</div>
          <div className="value">{profile.location}</div>
        </div>
        <div>
          <div className="label">Quests Undertaken</div>
          <div className="value">6+ Hackathons</div>
        </div>
      </div>
    </>
  );
}

/* ---- Page 2: experience ---- */
function ExperiencePage({ exp }) {
  return (
    <>
      <span className="eyebrow">The Campaign</span>
      <h2 className="section-title paper-title">Experience</h2>
      <FlourishDivider />
      {exp.map((e, i) => (
        <div key={i} className="exp-entry">
          <div className="exp-head">
            <h3>{e.role}</h3>
            <span className="exp-period">{e.period}</span>
          </div>
          <div className="exp-company">
            {e.company} · {e.mode}, {e.location}
          </div>
          <ul className="project-points">
            {e.points.map((pt, j) => (
              <li key={j}>{pt}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

/* ---- Page 3: interests ---- */
function InterestsPage({ interests }) {
  return (
    <>
      <span className="eyebrow">Beyond the Keep</span>
      <h2 className="section-title paper-title">Interests</h2>
      <FlourishDivider />
      <ul className="interest-list">
        {interests.map((it) => (
          <li key={it.label} className="interest-item">
            <span className="interest-rune">❖</span>
            <div>
              <div className="interest-label">{it.label}</div>
              <div className="interest-note">{it.note}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
