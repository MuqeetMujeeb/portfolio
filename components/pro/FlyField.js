"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/pro/fx";

// Home-page "image fly-in": small voice/AI cards spawn deep in the scene and
// drift toward the viewer, never crossing the hero text, the buttons or the
// "Next" link (measured from the page each time a card respawns).
const bars = (n) => Array.from({ length: n }, (_, i) => `<i style="--k:${i}"></i>`).join("");
const MOTIFS = [
  [`<div class="art m-wave">${bars(16)}</div>`, "Voice waveform"],
  ['<div class="art m-mic"><span class="ring"></span><span class="ring"></span><svg width="30" height="38" viewBox="0 0 24 30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="8" y="2" width="8" height="15" rx="4"/><path d="M4 13a8 8 0 0 0 16 0M12 21v6M8 27h8"/></svg></div>', "Speech-to-text"],
  ['<div class="art m-type"><span class="bubble"><i></i><i></i><i></i></span></div>', "Agent replying"],
  ['<div class="art"><svg width="120" height="60" viewBox="0 0 120 60"><g stroke="rgba(232,230,224,0.22)" stroke-width="1"><path d="M15 12 60 8M15 12 60 30M15 12 60 52M15 30 60 8M15 30 60 30M15 30 60 52M15 48 60 8M15 48 60 30M15 48 60 52M60 8 105 20M60 30 105 20M60 52 105 20M60 8 105 40M60 30 105 40M60 52 105 40"/></g><g fill="#cdbb93"><circle class="pulse" style="--k:0" cx="15" cy="12" r="4"/><circle class="pulse" style="--k:1" cx="15" cy="30" r="4"/><circle class="pulse" style="--k:2" cx="15" cy="48" r="4"/><circle class="pulse" style="--k:3" cx="60" cy="8" r="4"/><circle class="pulse" style="--k:4" cx="60" cy="30" r="4"/><circle class="pulse" style="--k:5" cx="60" cy="52" r="4"/><circle class="pulse" style="--k:6" cx="105" cy="20" r="4"/><circle class="pulse" style="--k:7" cx="105" cy="40" r="4"/></g></svg></div>', "Neural network"],
  ['<div class="art"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle class="spin" cx="32" cy="32" r="28" stroke="#cdbb93" stroke-opacity=".5" stroke-dasharray="10 6"/><circle class="spin r" cx="32" cy="32" r="21" stroke="#cdbb93" stroke-opacity=".8" stroke-dasharray="18 8"/><circle cx="32" cy="32" r="12" fill="#cdbb93" fill-opacity=".18" stroke="#cdbb93"/></svg></div>', "Voice agent"],
  [`<div class="art"><div class="m-spec">${bars(48)}</div></div>`, "Spectrogram"],
  ['<div class="art m-stream"><span>Sure, I can help with</span><b></b></div>', "Token stream"],
  ['<div class="art m-lat"><b>~800 ms</b><span class="bar"><i></i></span></div>', "Turn latency"],
  ['<div class="art"><svg width="130" height="56" viewBox="0 0 130 56" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 8h18l8 8v32H8z"/><path d="M26 8v8h8M13 26h14M13 33h14M13 40h9" stroke-opacity=".6"/><path class="dash" d="M42 28h30"/><path d="M68 23l5 5-5 5"/><g fill="#cdbb93" stroke="none"><circle class="pulse" style="--k:0" cx="88" cy="16" r="3"/><circle class="pulse" style="--k:1" cx="102" cy="26" r="3"/><circle class="pulse" style="--k:2" cx="94" cy="38" r="3"/><circle class="pulse" style="--k:3" cx="114" cy="14" r="3"/><circle class="pulse" style="--k:4" cx="116" cy="40" r="3"/><circle class="pulse" style="--k:5" cx="106" cy="48" r="3"/></g></svg></div>', "Retrieval (RAG)"],
  ['<div class="art"><svg width="140" height="58" viewBox="0 0 140 58" fill="none"><g font-family="JetBrains Mono, monospace" font-size="9" fill="rgba(232,230,224,0.7)" text-anchor="middle"><text x="20" y="10">voice</text><text x="70" y="10">agent</text><text x="120" y="10">calls</text><text x="20" y="56">voice</text><text x="70" y="56">agent</text><text x="120" y="56">calls</text></g><g stroke="#cdbb93" stroke-linecap="round"><path class="pulse" style="--k:0" d="M20 15C20 30 70 30 70 45" stroke-width="2.4"/><path class="pulse" style="--k:2" d="M20 15C20 30 120 30 120 45" stroke-width="1"/><path class="pulse" style="--k:4" d="M20 15V45" stroke-width="1.6"/></g></svg></div>', "Self-attention"],
  ['<div class="art m-pipe"><span style="--k:0">STT</span><svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="#cdbb93"><path class="dash" d="M0 4h12"/></svg><span style="--k:1">LLM</span><svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="#cdbb93"><path class="dash" d="M0 4h12"/></svg><span style="--k:2">TTS</span></div>', "Voice pipeline"],
  ['<div class="art m-call"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg><span class="live"></span><span>LIVE CALL</span></div>', "SIP / PSTN"],
];

// Depth model: scale grows 0.6 -> 1.4 while the card drifts outward up to 1.45x its spawn offset.
const S0 = 0.6, S1 = 1.4, SPREAD = 0.45;

export default function FlyField({ active }) {
  const ref = useRef(null);

  useEffect(() => {
    const fly = ref.current;
    if (!active || !fly) return;
    const reduce = prefersReducedMotion();
    const small = innerWidth < 720, N = small ? 6 : 12;
    let rects = [], mx = 0, my = 0, tmx = 0, tmy = 0, raf = 0, last = performance.now();
    const cards = [];

    const measure = () => {
      // Keep clear of each piece of hero content (its painted extent, not the
      // full-width block) and of the "Next" link.
      const hero = document.getElementById("heroText");
      const next = document.querySelector("main .page .next");
      const range = document.createRange();
      rects = [];
      [...(hero ? hero.children : []), next].filter(Boolean).forEach((el) => {
        range.selectNodeContents(el);
        const r = range.getBoundingClientRect();
        if (r.width && r.height) rects.push({ l: r.left - 12, t: r.top - 10, r: r.right + 12, b: r.bottom + 10 });
      });
    };
    const clear = (x, y, w, h) => rects.every((rc) => x + w / 2 < rc.l || x - w / 2 > rc.r || y + h / 2 < rc.t || y - h / 2 > rc.b);
    const spawn = (c, initial) => {
      const W = innerWidth, H = innerHeight, cx = W / 2, cy = H / 2, w = c.el.offsetWidth, h = c.el.offsetHeight;
      const hw = (w * S0) / 2 + 16, hh = (h * S0) / 2 + 16;
      let x = cx, y = cy;
      for (let tries = 0; tries < 80; tries++) {
        x = hw + Math.random() * (W - hw * 2); y = 80 + hh + Math.random() * (H - 100 - hh * 2);
        const apart = cards.every((o) => o === c || o.ox === undefined || Math.hypot(cx + o.ox * (1 + SPREAD * o.p) - x, cy + o.oy * (1 + SPREAD * o.p) - y) > w * 0.9);
        if (apart && clear(x, y, w * S0, h * S0)
          && clear(cx + (x - cx) * (1 + SPREAD / 2), cy + (y - cy) * (1 + SPREAD / 2), (w * (S0 + S1)) / 2, (h * (S0 + S1)) / 2)
          && clear(cx + (x - cx) * (1 + SPREAD), cy + (y - cy) * (1 + SPREAD), w * S1, h * S1)) break;
      }
      c.ox = x - cx; c.oy = y - cy;
      c.p = initial ? Math.random() * 0.9 : 0;
      c.speed = 1 / (10000 + Math.random() * 5000);
    };
    const place = (c) => {
      const e = c.p, sc = S0 + (S1 - S0) * e, f = 1 + SPREAD * e;
      const x = innerWidth / 2 + c.ox * f + mx * 46 * sc, y = innerHeight / 2 + c.oy * f + my * 28 * sc;
      const o = c.p < 0.16 ? c.p / 0.16 : c.p > 0.72 ? Math.max(0, (1 - c.p) / 0.28) : 1;
      c.el.style.opacity = (o * (0.45 + 0.55 * Math.min(1, sc))).toFixed(3);
      c.el.style.transform = `translate(${(x - c.el.offsetWidth / 2).toFixed(1)}px,${(y - c.el.offsetHeight / 2).toFixed(1)}px) scale(${sc.toFixed(3)})`;
      c.el.style.zIndex = String(Math.round(sc * 100));
    };

    for (let i = 0; i < N; i++) {
      const el = document.createElement("div");
      const [art, cap] = MOTIFS[i % MOTIFS.length];
      el.className = "fcard";
      el.innerHTML = `${art}<div class="cap">${cap}</div>`;
      fly.appendChild(el);
      cards.push({ el });
    }
    const onMove = (e) => { tmx = (e.clientX / innerWidth) * 2 - 1; tmy = (e.clientY / innerHeight) * 2 - 1; };
    if (!small) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", measure);

    const tick = (now) => {
      const dt = Math.min(now - last, 50); last = now;
      if (!document.hidden) {
        mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
        cards.forEach((c) => { c.p += dt * c.speed; if (c.p >= 1) { measure(); spawn(c, false); } place(c); });
      }
      raf = requestAnimationFrame(tick);
    };
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      measure();
      cards.forEach((c) => { spawn(c, true); place(c); });
      if (!reduce) raf = requestAnimationFrame(tick);
    };
    // wait for fonts so the hero text has its final size before measuring
    (document.fonts?.ready || Promise.resolve()).then(() => setTimeout(start, 50));

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", measure);
      fly.textContent = "";
    };
  }, [active]);

  return <div className={`fly${active ? " is-on" : ""}`} ref={ref} aria-hidden="true" />;
}
