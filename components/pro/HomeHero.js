"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";
import { Icon } from "@/components/Icons";
import FillText from "@/components/pro/FillText";
import ProLink from "@/components/pro/ProLink";
import { Arrow } from "@/components/pro/PageParts";
import { countUp, prefersReducedMotion } from "@/lib/pro/fx";

function RotatingRole({ roles }) {
  const [i, setI] = useState(0);
  const [swap, setSwap] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion() || roles.length < 2) return;
    let t = 0;
    const id = setInterval(() => {
      setSwap(true);
      t = setTimeout(() => { setI((p) => (p + 1) % roles.length); setSwap(false); }, 360);
    }, 2800);
    return () => { clearInterval(id); clearTimeout(t); };
  }, [roles.length]);
  return <span className={`role-text${swap ? " swap" : ""}`}>{roles[i]}</span>;
}

export default function HomeHero() {
  const proofsRef = useRef(null);
  useEffect(() => countUp(proofsRef.current), []);
  const [first, second, ...rest] = profile.name.split(" "); // Syed Abdul Muqeet Mujeeb

  return (
    <div className="home">
      <div className="hero-center" id="heroText">
        <div className="eyebrow" data-r style={{ "--i": 0 }}>{profile.title} · {profile.location}</div>
        <FillText
          as="h1"
          parts={[{ text: `${first} ${second} ` }, { text: rest[0], em: true }, { text: ` ${rest.slice(1).join(" ")}` }]}
        />
        <div className="role" data-r style={{ "--i": 2 }}>
          <span className="dot" aria-hidden="true" />
          <RotatingRole roles={profile.proRoles} />
        </div>
        <p className="lede" data-r style={{ "--i": 3 }}>
          I build production voice AI agents, RAG systems and real-time backend pipelines, with a focus on reliability and maintainable architecture.
        </p>
        <div className="actions" data-r style={{ "--i": 4 }}>
          <ProLink className="btn primary" href="/projects">View my work <Arrow size={16} /></ProLink>
          <a className="btn ghost" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé</a>
          <a className="icon-btn" href={profile.contact.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer"><Icon.github width="19" height="19" /></a>
          <a className="icon-btn" href={profile.contact.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Icon.linkedin width="17" height="17" /></a>
        </div>
        <div className="proofs" ref={proofsRef} data-r style={{ "--i": 5 }}>
          {profile.proofs.map((p) => (
            <div className="proof" key={p.label}>
              <b data-count={p.count} data-pre={p.pre || ""} data-suf={p.suf || ""}>{`${p.pre || ""}${p.count}${p.suf || ""}`}</b>
              <span>{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
