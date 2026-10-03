"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "work", label: "Professional" },
  { id: "personal", label: "Personal" },
];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const lastFocus = useRef(null), closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  function show(p, e) { lastFocus.current = e.currentTarget; setOpen(p); }
  function close() { setOpen(null); lastFocus.current?.focus(); }

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects" data-r style={{ "--i": 3 }}>
        {FILTERS.map((f) => (
          <button key={f.id} className="filter" type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
        ))}
      </div>
      <div className="proj-grid">
        {profile.projects.map((p, i) => (
          <button
            key={p.name}
            type="button"
            className="panel proj"
            hidden={!(filter === "all" || p.kind === filter)}
            data-r
            style={{ "--i": i + 4 }}
            onClick={(e) => show(p, e)}
          >
            <span className="ctx">{p.context}</span>
            <h2>{p.name}</h2>
            <p>{p.blurb}</p>
            <span className="metric"><b>{p.metric[0]}</b><span>{p.metric[1]}</span></span>
          </button>
        ))}
      </div>

      {open && (
        <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="panel stitched modal" role="dialog" aria-modal="true" aria-labelledby="projTitle">
            <button className="x-btn" type="button" aria-label="Close" ref={closeRef} onClick={close}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            <div className="eyebrow">{open.context}</div>
            <h3 id="projTitle">{open.name}</h3>
            <p>{open.blurb}</p>
            <ul>{open.points.map((t, i) => <li key={i}>{t}</li>)}</ul>
            <div className="tags">{open.tech.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          </div>
        </div>
      )}
    </>
  );
}
