// Small client-side helpers shared by the professional edition's components.

// A tiny event bus so pages can talk to the persistent shell (ripple the
// fabric, open the chat, make the robot speak, show a toast, navigate).
const bus = typeof window !== "undefined" ? new EventTarget() : null;
export function emit(type, detail) {
  bus?.dispatchEvent(new CustomEvent(type, { detail }));
}
export function on(type, fn) {
  const h = (e) => fn(e.detail);
  bus?.addEventListener(type, h);
  return () => bus?.removeEventListener(type, h);
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Text fill wave: each word (rendered as span.fw by <FillText>) gets a delay
// based on its line and x position, so a tilted bright band sweeps across the
// headline line by line before the letters settle.
export function fillWave(el) {
  if (!el || prefersReducedMotion()) return;
  const words = Array.from(el.querySelectorAll(".fw"));
  words.forEach((w) => w.classList.remove("fw-run"));
  const lines = [];
  const v = 1.15, base = 160, beat = 260;
  let end = 0;
  words.forEach((w) => {
    const top = Math.round(w.offsetTop);
    let line = lines.find((l) => Math.abs(l.top - top) < 8);
    if (!line) { line = { top, left: Infinity, words: [] }; lines.push(line); }
    line.left = Math.min(line.left, w.offsetLeft);
    line.words.push(w);
  });
  lines.sort((a, b) => a.top - b.top);
  lines.forEach((l, li) => {
    l.words.forEach((w) => {
      const dur = (3 * w.offsetWidth) / v;
      const dl = base + li * beat + (w.offsetLeft - l.left) / v;
      w.style.setProperty("--d", `${dur.toFixed(0)}ms`);
      w.style.setProperty("--dl", `${dl.toFixed(0)}ms`);
      end = Math.max(end, dur + dl);
    });
  });
  void el.offsetWidth;
  words.forEach((w) => w.classList.add("fw-run"));
  clearTimeout(el.__fwT);
  el.__fwT = setTimeout(() => words.forEach((w) => w.classList.remove("fw-run")), end + 80);
}

// Count numbers up from 0 to their data-count value.
export function countUp(root) {
  const reduce = prefersReducedMotion();
  const raf = [];
  root.querySelectorAll("[data-count]").forEach((el) => {
    const end = +el.dataset.count, pre = el.dataset.pre || "", suf = el.dataset.suf || "";
    if (reduce) { el.textContent = pre + end + suf; return; }
    const t0 = performance.now(), dur = 1700;
    const step = (now) => {
      const k = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + Math.round(end * e) + suf;
      if (k < 1) raf.push(requestAnimationFrame(step));
    };
    raf.push(requestAnimationFrame(step));
  });
  return () => raf.forEach(cancelAnimationFrame);
}
