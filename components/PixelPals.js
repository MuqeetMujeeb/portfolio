"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/* Pixel knight + pixel cat that roam the bottom of the medieval edition.
   The knight is the Herald's mascot (click → chat, per-page hints, thinks
   while the Herald answers, cheers on replies); the cat follows him, chases
   the cursor near the bottom of the screen, naps when left alone, and the two
   stop for a pet (with hearts) when they meet. Other components can make the
   knight react with:
     window.dispatchEvent(new CustomEvent("knight", { detail: { say, mood } }))  */

const PAL = {
  K: "#1a1410", S: "#e3e6ea", s: "#9aa0a8", d: "#5c626b", V: "#0e0a06", Y: "#f2d27a",
  R: "#a3303d", G: "#e0b450", B: "#5a3a1e", W: "#f2f4f7",
  k: "#3a2414", O: "#e39b4a", o: "#b56a2a", w: "#f3e8cf", e: "#1a1410", p: "#e8a0a8",
};

// Knight: head rows 0–9, body rows 10–19 (drawn separately so it can bow).
const K_HEAD = [
  "....RRR............",
  "...RRRRRKKKK.......",
  "..RR..KKSSSSK......",
  ".....KSSSSSSSK.....",
  ".....KSSSSSSSK.....",
  ".....KVVVVVVVK.W...",
  ".....KVVYVVYVK.W...",
  ".....KsVVVVVVK.W...",
  ".....KssdsdssK.W...",
  "......KKKKKKK..W...",
];
const K_BODY_TOP = [
  ".....KRRRRRRRK.W...",
  "....KsRRGGRRRsKW...",
  "....KsRGGGGRRsKW...",
  "....KsRRGGRRRsKW...",
  "....KdRRGGRRRdGGG..",
  ".....KGGGGGGGK.B...",
];
const K_LEGS = {
  stand: [".....KssK.KssK.....", ".....KssK.KssK.....", ".....KddK.KddK.....", "....KBBBK.KBBBK...."],
  stride: ["....KssK..KssK.....", "....KssK..KssK.....", "...KddK....KddK....", "..KBBBK....KBBBK..."],
};
const CAT = {
  walkA: [".k.........k.k..", "kOk.......kOkOk.", "kOk.......kOOOk.", ".kOk.....kOeOeOk", "..kOkkkkkkOOpOOk", "...kOOOOOOOOOkk.", "...kOOOwwwOOOk..", "...kOoOkkkOoOk..", "...kOkk...kOk...", "...kk......kk..."],
  walkB: [".k.........k.k..", "kOk.......kOkOk.", "kOk.......kOOOk.", ".kOk.....kOeOeOk", "..kOkkkkkkOOpOOk", "...kOOOOOOOOOkk.", "...kOOOwwwOOOk..", "...kOoOkkkOoOk..", "....kOk..kOk....", "....kk...kk....."],
  sit: ["...........k.k..", "..........kOkOk.", "..........kOOOk.", ".........kOeOeOk", "..k......kOOpOOk", ".kOk....kOOOOOk.", ".kOk...kOOwwwOk.", "..kOk.kOOOwwwOk.", "...kOkOOOOkOOOk.", "....kkkkkkkkkkk."],
};
CAT.sleep = CAT.sit.map((r) => r.replace(/e/g, "k"));

const KS = 4, CS = 3;            // pixel scale for knight / cat
const KW = 19 * KS, KH = 20 * KS, CW = 16 * CS, CH = 10 * CS;

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
function drawKnight(canvas, pose, facingLeft) {
  paint(canvas, facingLeft, (ctx) => {
    const bow = pose === "bow" ? 1 : 0;
    drawRows(ctx, K_HEAD, KS, bow, bow * 2);
    drawRows(ctx, K_BODY_TOP, KS, 0, 10);
    drawRows(ctx, pose === "stride" ? K_LEGS.stride : K_LEGS.stand, KS, 0, 16);
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
    if (replies > lastReplies.current && st.current) st.current.k.cheer = 0.7;
    lastReplies.current = replies;
  }, [replies]);
  useEffect(() => { if (open) setBubble(""); }, [open]);

  // Reactions requested by other components (e.g. the comment form).
  useEffect(() => {
    const onKnight = (e) => {
      const { say: text, mood } = e.detail || {};
      if (mood && st.current) { st.current.k.cheer = 0.8; const k = st.current.k; hearts(k.x + KW / 2, KH, 4); }
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
      k: { x: W() - KW - 40, dir: -1, mode: "idle", t: 2, target: 0, pose: "", cheer: 0, petCool: 6, bow: 0 },
      c: { x: W() - KW - 110, dir: -1, mode: "follow", t: 0, frame: "", sitFor: 0, hop: 0 },
      pointer: { x: 0, y: 0, at: -1e9 },
    });
    const onMove = (e) => { s.pointer = { x: e.clientX, y: e.clientY, at: performance.now() }; };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0, last = performance.now(), anim = 0;
    const render = () => {
      const { k, c } = s;
      const kJump = k.cheer > 0 ? Math.abs(Math.sin(k.cheer * 9)) * 10 : 0;
      kBtn.current.style.transform = `translate(${k.x.toFixed(1)}px, ${(-kJump).toFixed(1)}px)`;
      const cJump = c.hop > 0 ? Math.sin((c.hop / 0.5) * Math.PI) * 22 : 0;
      cBtn.current.style.transform = `translate(${c.x.toFixed(1)}px, ${(-cJump).toFixed(1)}px)`;
      const kPose = k.bow > 0 ? "bow" : k.mode === "walk" && Math.floor(anim * 6) % 2 ? "stride" : "stand";
      const kKey = kPose + k.dir;
      if (kKey !== k.pose) { drawKnight(kCan.current, kPose, k.dir < 0); k.pose = kKey; }
      const moving = c.mode === "walk" || c.mode === "run";
      const cFrame = c.mode === "sleep" ? "sleep" : moving ? (Math.floor(anim * (c.mode === "run" ? 10 : 6)) % 2 ? "walkA" : "walkB") : "sit";
      const cKey = cFrame + c.dir;
      if (cKey !== c.frame) { drawCat(cCan.current, cFrame, c.dir < 0); c.frame = cKey; }
      // keep the speech bubbles over their owners, inside the viewport
      const place = (el, x, w) => { if (el) el.style.left = `${Math.max(8, Math.min(W() - el.offsetWidth - 8, x + w / 2 - el.offsetWidth / 2))}px`; };
      place(bubbleRef.current, k.x, KW);
      place(catBubbleRef.current, c.x, CW);
    };

    const step = (dt) => {
      const { k, c, pointer } = s, w = W(), now = performance.now();
      anim += dt;
      k.cheer = Math.max(0, k.cheer - dt);
      k.bow = Math.max(0, k.bow - dt);
      c.hop = Math.max(0, c.hop - dt);
      k.petCool = Math.max(0, k.petCool - dt);
      const { open: chatOpen } = live.current;

      // ---- knight ----
      if (chatOpen) {               // stand guard at the right while the chat is open
        k.target = w - KW - 30; k.mode = Math.abs(k.target - k.x) > 3 ? "walk" : "idle";
      } else if (k.mode === "idle") {
        k.t -= dt;
        if (k.t <= 0) { k.target = 20 + Math.random() * Math.max(40, w - KW - 60); k.mode = "walk"; }
      } else if (k.mode === "pet") {
        k.t -= dt;
        if (k.t <= 0) { k.mode = "idle"; k.t = 2 + Math.random() * 3; k.petCool = 14; }
      }
      if (k.mode === "walk") {
        const dx = k.target - k.x;
        k.dir = dx < 0 ? -1 : 1;
        k.x += Math.sign(dx) * Math.min(Math.abs(dx), 40 * dt);
        if (Math.abs(dx) < 1) { k.mode = "idle"; k.t = 2.5 + Math.random() * 4; }
      }
      k.x = Math.max(4, Math.min(w - KW - 4, k.x));

      // ---- cat ----
      const chasing = now - pointer.at < 1500 && pointer.y > window.innerHeight - 170 && !chatOpen;
      let goal, fast = false;
      if (chasing) { goal = pointer.x - CW / 2; fast = true; }
      else goal = k.x + (k.dir < 0 ? KW + 6 : -CW - 6); // trot just behind the knight
      const dist = goal - c.x;
      if (c.mode === "sleep") {
        if (Math.abs(dist) > 160 || chasing) { c.mode = "run"; c.sitFor = 0; }
      } else if (Math.abs(dist) > (chasing ? 6 : 24)) {
        c.mode = fast || Math.abs(dist) > 140 ? "run" : "walk";
        c.dir = dist < 0 ? -1 : 1;
        c.x += Math.sign(dist) * Math.min(Math.abs(dist), (c.mode === "run" ? 150 : 70) * dt);
        c.sitFor = 0;
      } else {
        c.mode = "sit";
        c.sitFor += dt;
        if (c.sitFor > 9 && k.mode !== "walk") c.mode = "sleep";
      }
      c.x = Math.max(2, Math.min(w - CW - 2, c.x));

      // ---- they meet: the knight stops to pet the cat ----
      const close = Math.abs((c.x + CW / 2) - (k.x + KW / 2)) < KW * 0.9;
      if (close && k.mode === "idle" && !chatOpen && (c.mode === "sit" || c.mode === "sleep") && k.petCool === 0) {
        k.mode = "pet"; k.t = 2.2;
        k.dir = c.x + CW / 2 < k.x + KW / 2 ? -1 : 1; k.pose = "";
        c.mode = "sit"; c.sitFor = 0;
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
    const onResize = () => { s.k.x = Math.min(s.k.x, W() - KW - 4); s.c.x = Math.min(s.c.x, W() - CW - 2); render(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); window.removeEventListener("resize", onResize); };
  }, [hearts, say]);

  function clickKnight() {
    if (st.current) { st.current.k.bow = 0.5; st.current.k.pose = ""; }
    onToggle();
  }
  function clickCat() {
    const s = st.current; if (!s) return;
    s.c.hop = 0.5; s.c.mode = "sit"; s.c.sitFor = 0;
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
