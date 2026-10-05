"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/* Pixel knight + pixel cat that roam the bottom of the medieval edition.
   The knight is the Herald's mascot (click → chat, per-page hints, thinks
   while the Herald answers, cheers on replies); the cat follows him, chases
   the cursor near the bottom of the screen, naps when left alone, and the two
   stop for a pet (with hearts) when they meet. Other components can make the
   knight react with:
     window.dispatchEvent(new CustomEvent("knight", { detail: { say, mood } }))
   Knight sprite: "FREE - Knight 2D Pixel Art" by Mattz Art (xzany.itch.io),
   used under its licence (public/pixel/knight/LICENSE.txt).  */

const PAL = { k: "#3a2414", O: "#e39b4a", o: "#b56a2a", w: "#f3e8cf", e: "#1a1410", p: "#e8a0a8" };

// Knight sprite sheets: horizontal strips of 96x84 cells, facing right, feet on
// row 61 in every frame. Each cell is cropped to 72x52 around the knight
// (x 8–80, y 12–64) and drawn at 2x.
const SHEETS = {
  idle: { src: "/pixel/knight/idle.png", n: 7, fps: 8 },
  walk: { src: "/pixel/knight/walk.png", n: 8, fps: 10 },
  run: { src: "/pixel/knight/run.png", n: 8, fps: 14 },
  defend: { src: "/pixel/knight/defend.png", n: 6, fps: 8 },
  jump: { src: "/pixel/knight/jump.png", n: 5, fps: 10, once: true },
  attack: { src: "/pixel/knight/attack.png", n: 6, fps: 12, once: true },
};
const CELL_W = 96, CROP = { x: 8, y: 12, w: 72, h: 52 }, KSCALE = 2;
// on-screen knight box, and where his body sits inside it (for the cat and hearts)
const KW = CROP.w * KSCALE, KH = CROP.h * KSCALE, BODY_L = 40, BODY_R = 104;

const CAT = {
  walkA: [".k.........k.k..", "kOk.......kOkOk.", "kOk.......kOOOk.", ".kOk.....kOeOeOk", "..kOkkkkkkOOpOOk", "...kOOOOOOOOOkk.", "...kOOOwwwOOOk..", "...kOoOkkkOoOk..", "...kOkk...kOk...", "...kk......kk..."],
  walkB: [".k.........k.k..", "kOk.......kOkOk.", "kOk.......kOOOk.", ".kOk.....kOeOeOk", "..kOkkkkkkOOpOOk", "...kOOOOOOOOOkk.", "...kOOOwwwOOOk..", "...kOoOkkkOoOk..", "....kOk..kOk....", "....kk...kk....."],
  sit: ["...........k.k..", "..........kOkOk.", "..........kOOOk.", ".........kOeOeOk", "..k......kOOpOOk", ".kOk....kOOOOOk.", ".kOk...kOOwwwOk.", "..kOk.kOOOwwwOk.", "...kOkOOOOkOOOk.", "....kkkkkkkkkkk."],
};
CAT.sleep = CAT.sit.map((r) => r.replace(/e/g, "k"));

const CS = 3;                    // pixel scale for the cat
const CW = 16 * CS, CH = 10 * CS;

const HINTS = {
  "/classic": "Hail, traveller! I guard Muqeet's keep. Click me to ask about his work.",
  "/classic/about": "Turn the pages with the ribbons on either side.",
  "/classic/skills": "Open any card for a closer look at the armory.",
  "/classic/projects": "Select a chronicle for the full tale.",
  "/classic/connect": "Leave a comment above, or ask me anything.",
};

function drawRows(ctx, rows, scale, ox = 0, oy = 0) {
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const c = PAL[row[x]];
      if (!c) continue;
      ctx.fillStyle = c;
      ctx.fillRect((x + ox) * scale, (y + oy) * scale, scale, scale);
    }
  });
}
function paint(canvas, facingLeft, fn) {
  const ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (facingLeft) { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
  fn(ctx);
}
function drawKnight(canvas, img, frame, facingLeft) {
  paint(canvas, facingLeft, (ctx) => {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, frame * CELL_W + CROP.x, CROP.y, CROP.w, CROP.h, 0, 0, KW, KH);
  });
}
function drawCat(canvas, frame, facingLeft) {
  paint(canvas, facingLeft, (ctx) => drawRows(ctx, CAT[frame], CS));
}

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function PixelPals({ open, busy, replies, onToggle }) {
  const pathname = usePathname();
  const [bubble, setBubble] = useState("");
  const [catSays, setCatSays] = useState("");
  const kBtn = useRef(null), cBtn = useRef(null), kCan = useRef(null), cCan = useRef(null);
  const bubbleRef = useRef(null), catBubbleRef = useRef(null), heartsRef = useRef(null);
  const st = useRef(null);            // simulation state
  const live = useRef({ open, busy }); // latest props for the loop
  live.current = { open, busy };
  const bubbleT = useRef(0);

  const say = useCallback((text) => {
    if (!text || live.current.open) return;
    setBubble(text);
    clearTimeout(bubbleT.current);
    bubbleT.current = setTimeout(() => setBubble(""), 4600);
  }, []);

  const hearts = useCallback((x, y, n = 3) => {
    const layer = heartsRef.current; if (!layer) return;
    for (let i = 0; i < n; i++) {
      const h = document.createElement("span");
      h.className = "pal-heart";
      h.textContent = "♥";
      h.style.left = `${x + (Math.random() * 24 - 12)}px`;
      h.style.bottom = `${y}px`;
      h.style.animationDelay = `${i * 160}ms`;
      layer.appendChild(h);
      setTimeout(() => h.remove(), 1600 + i * 160);
    }
  }, []);

  // Page hints (after the castle gate has opened).
  useEffect(() => {
    let t = 0, cancelled = false;
    const attempt = () => {
      if (cancelled) return;
      if (document.body.classList.contains("gate-locked")) { t = setTimeout(attempt, 600); return; }
      say(HINTS[pathname]);
    };
    t = setTimeout(attempt, 1500);
    return () => { cancelled = true; clearTimeout(t); };
  }, [pathname, say]);

  // Cheer when a new Herald reply arrives.
  const lastReplies = useRef(replies);
  useEffect(() => {
    if (replies > lastReplies.current && st.current) st.current.k.once = "jump";
    lastReplies.current = replies;
  }, [replies]);
  useEffect(() => { if (open) setBubble(""); }, [open]);

  // Reactions requested by other components (e.g. the comment form).
  useEffect(() => {
    const onKnight = (e) => {
      const { say: text, mood } = e.detail || {};
      if (mood && st.current) { const k = st.current.k; k.once = "jump"; hearts(k.x + KW / 2, KH - 10, 4); }
      if (text) say(text);
    };
    window.addEventListener("knight", onKnight);
    return () => window.removeEventListener("knight", onKnight);
  }, [say, hearts]);

  // The roaming simulation.
  useEffect(() => {
    const reduce = reduceMotion();
    const W = () => window.innerWidth;
    const s = (st.current = {
      k: { x: W() - KW - 20, dir: -1, mode: "idle", t: 2, target: 0, fast: false, drawn: "", anim: "idle", f: 0, once: null, petCool: 6 },
      c: { x: W() - KW - 110, dir: -1, mode: "sit", t: 0, frame: "", sitFor: 0, hop: 0, v: 0, moving: false, phase: 0 },
      pointer: { x: 0, y: 0, at: -1e9 },
    });
    const imgs = {};
    Object.entries(SHEETS).forEach(([name, sh]) => { const im = new Image(); im.src = sh.src; im.onload = () => { s.k.drawn = ""; render(); }; imgs[name] = im; });
    const onMove = (e) => { s.pointer = { x: e.clientX, y: e.clientY, at: performance.now() }; };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0, last = performance.now();
    const render = () => {
      const { k, c } = s;
      kBtn.current.style.transform = `translate(${Math.round(k.x)}px, 0)`;
      const cJump = c.hop > 0 ? Math.sin((c.hop / 0.5) * Math.PI) * 22 : 0;
      cBtn.current.style.transform = `translate(${Math.round(c.x)}px, ${-Math.round(cJump)}px)`;
      const sheet = SHEETS[k.anim], img = imgs[k.anim];
      const kFrame = Math.min(sheet.n - 1, Math.floor(k.f));
      const kKey = `${k.anim}${kFrame}${k.dir}`;
      if (kKey !== k.drawn && img?.complete && img.naturalWidth) { drawKnight(kCan.current, img, kFrame, k.dir < 0); k.drawn = kKey; }
      const moving = c.mode === "walk" || c.mode === "run";
      const cFrame = c.mode === "sleep" ? "sleep" : moving ? (Math.floor(c.phase) % 2 ? "walkA" : "walkB") : "sit";
      const cKey = cFrame + c.dir;
      if (cKey !== c.frame) { drawCat(cCan.current, cFrame, c.dir < 0); c.frame = cKey; }
      // keep the speech bubbles over their owners, inside the viewport
      const place = (el, x, w) => { if (el) el.style.left = `${Math.max(8, Math.min(W() - el.offsetWidth - 8, x + w / 2 - el.offsetWidth / 2))}px`; };
      place(bubbleRef.current, k.x, KW);
      place(catBubbleRef.current, c.x, CW);
    };

    const step = (dt) => {
      const { k, c, pointer } = s, w = W(), now = performance.now();
      c.hop = Math.max(0, c.hop - dt);
      k.petCool = Math.max(0, k.petCool - dt);
      const { open: chatOpen } = live.current;

      // ---- knight ----
      if (chatOpen) {               // stand guard at the right while the chat is open
        k.target = w - KW - 10; k.fast = true; k.mode = Math.abs(k.target - k.x) > 3 ? "walk" : "idle";
      } else if (k.mode === "idle") {
        k.t -= dt;
        if (k.t <= 0) { k.target = Math.random() * Math.max(40, w - KW); k.fast = false; k.mode = "walk"; }
      } else if (k.mode === "pet") {
        k.t -= dt;
        if (k.t <= 0) { k.mode = "idle"; k.t = 2 + Math.random() * 3; k.petCool = 14; }
      }
      if (k.mode === "walk") {
        const dx = k.target - k.x;
        k.dir = dx < 0 ? -1 : 1;
        k.x += Math.sign(dx) * Math.min(Math.abs(dx), (k.fast ? 110 : 46) * dt);
        if (Math.abs(dx) < 1) { k.mode = "idle"; k.fast = false; k.t = 2.5 + Math.random() * 4; }
      }
      k.x = Math.max(-BODY_L + 4, Math.min(w - BODY_R - 4, k.x));

      // knight animation: one-shots (jump / attack) win, then thinking, moving, idle
      const want = k.once || (k.mode === "walk" ? (k.fast ? "run" : "walk") : live.current.busy && chatOpen ? "defend" : "idle");
      if (want !== k.anim) { k.anim = want; k.f = 0; }
      k.f += dt * SHEETS[k.anim].fps;
      if (SHEETS[k.anim].once) { if (k.f >= SHEETS[k.anim].n) { k.once = null; k.anim = "idle"; k.f = 0; } }
      else k.f %= SHEETS[k.anim].n;

      // ---- cat ----
      const chasing = now - pointer.at < 1500 && pointer.y > window.innerHeight - 170 && !chatOpen;
      let goal, fast = false;
      if (chasing) { goal = pointer.x - CW / 2; fast = true; }
      else goal = k.dir < 0 ? k.x + BODY_R + 2 : k.x + BODY_L - CW - 2; // trot just behind the knight
      const dist = goal - c.x, ad = Math.abs(dist);
      // Separate start/stop distances so the cat doesn't flicker between
      // sitting and walking while it keeps pace with the knight.
      const startAt = chasing ? 14 : 34, stopAt = chasing ? 4 : 10;
      if (k.mode === "pet") { c.moving = false; c.v = 0; }        // stay put while being petted
      else if (c.mode === "sleep") { if (ad > 160 || chasing) c.moving = true; }
      else if (!c.moving && ad > startAt) c.moving = true;
      else if (c.moving && ad < stopAt) c.moving = false;

      if (c.moving) {
        // walk/run with a gap between the thresholds, and ease the speed
        if (c.mode !== "run" && (fast || ad > 170)) c.mode = "run";
        else if (c.mode === "run" && !fast && ad < 90) c.mode = "walk";
        else if (c.mode !== "run") c.mode = "walk";
        if (ad > 4) c.dir = dist < 0 ? -1 : 1;
        const top = c.mode === "run" ? 160 : 72;
        c.v += (top - c.v) * Math.min(1, dt * 6);
        c.x += Math.sign(dist) * Math.min(ad, c.v * dt);
        c.phase += dt * (c.mode === "run" ? 10 : 6);               // walk cycle only advances while moving
        c.sitFor = 0;
      } else if (c.mode !== "sleep") {
        c.v = 0;
        c.mode = "sit";
        c.sitFor += dt;
        if (c.sitFor > 9 && k.mode !== "walk") c.mode = "sleep";
      }
      c.x = Math.max(2, Math.min(w - CW - 2, c.x));

      // ---- they meet: the knight stops to pet the cat ----
      const close = Math.abs((c.x + CW / 2) - (k.x + KW / 2)) < (BODY_R - BODY_L) * 1.1;
      if (close && k.mode === "idle" && !chatOpen && (c.mode === "sit" || c.mode === "sleep") && k.petCool === 0) {
        k.mode = "pet"; k.t = 2.2;
        k.dir = c.x + CW / 2 < k.x + KW / 2 ? -1 : 1;
        c.mode = "sit"; c.sitFor = 0; c.moving = false; c.v = 0;
        hearts(c.x + CW / 2, CH + 6, 4);
        if (Math.random() < 0.35) say("Good kitty.");
      }
    };

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      if (!document.hidden) { step(dt); render(); }
      raf = requestAnimationFrame(loop);
    };
    render();
    if (!reduce) raf = requestAnimationFrame(loop);
    const onResize = () => { s.k.x = Math.min(s.k.x, W() - BODY_R - 4); s.c.x = Math.min(s.c.x, W() - CW - 2); render(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); window.removeEventListener("resize", onResize); };
  }, [hearts, say]);

  function clickKnight() {
    if (st.current) st.current.k.once = "attack";
    onToggle();
  }
  function clickCat() {
    const s = st.current; if (!s) return;
    s.c.hop = 0.5; s.c.mode = "sit"; s.c.sitFor = 0; s.c.moving = false; s.c.v = 0;
    hearts(s.c.x + CW / 2, CH + 10, 3);
    setCatSays(Math.random() < 0.5 ? "Mrrp!" : "Meow!");
    setTimeout(() => setCatSays(""), 1300);
  }

  return (
    <div className="pals">
      <div className="pals-hearts" ref={heartsRef} aria-hidden="true" />
      <button ref={bubbleRef} className={`pal-bubble${bubble ? "" : " hide"}`} type="button" aria-hidden="true" tabIndex={-1} onClick={onToggle}>
        {busy && open ? "…" : bubble}
      </button>
      <span ref={catBubbleRef} className={`pal-bubble cat${catSays ? "" : " hide"}`} aria-hidden="true">{catSays}</span>
      <button ref={kBtn} className={`pal knight-pal${busy ? " is-thinking" : ""}`} type="button" aria-label="Ask the Herald about Muqeet" aria-expanded={open} onClick={clickKnight}>
        <canvas ref={kCan} width={KW} height={KH} />
        {busy && <span className="pal-dots" aria-hidden="true">•••</span>}
      </button>
      <button ref={cBtn} className="pal cat-pal" type="button" aria-label="Pet the cat" onClick={clickCat}>
        <canvas ref={cCan} width={CW} height={CH} />
      </button>
    </div>
  );
}
