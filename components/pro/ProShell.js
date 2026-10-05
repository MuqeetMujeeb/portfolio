"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import FabricBackground from "@/components/pro/FabricBackground";
import FlyField from "@/components/pro/FlyField";
import Assistant from "@/components/pro/Assistant";
import ProLink from "@/components/pro/ProLink";
import { PRO_PAGES, pageForPath } from "@/lib/pro/pages";
import { emit, on, prefersReducedMotion } from "@/lib/pro/fx";

// Persistent chrome for the professional edition: fabric background, fly-in
// field (home only), header with the spotlight nav and edition toggle, the
// robot assistant and toasts. Pages render inside <main>.
export default function ProShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const page = pageForPath(pathname);
  const [sheet, setSheet] = useState(false);
  const [toast, setToast] = useState("");
  const [medieval, setMedieval] = useState(false);
  const navRef = useRef(null), glowRef = useRef(null), busy = useRef(false);

  // Navigate with the lift-out transition, then ripple the fabric.
  useEffect(() => on("navigate", (href) => {
    if (busy.current || href === pathname) return;
    busy.current = true;
    setSheet(false);
    emit("ripple");
    const current = document.querySelector("main .page");
    if (current && !prefersReducedMotion()) current.classList.add("is-leaving");
    setTimeout(() => { router.push(href); busy.current = false; }, prefersReducedMotion() ? 0 : 330);
  }), [pathname, router]);

  // Arrow keys move between pages.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea, [role=dialog]") || e.metaKey || e.ctrlKey || e.altKey) return;
      const i = PRO_PAGES.findIndex((p) => p.id === page.id);
      if (e.key === "ArrowRight" && PRO_PAGES[i + 1]) emit("navigate", PRO_PAGES[i + 1].path);
      if (e.key === "ArrowLeft" && i > 0) emit("navigate", PRO_PAGES[i - 1].path);
      if (e.key === "Escape") setSheet(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page.id]);

  // Toasts from pages.
  useEffect(() => {
    let t = 0;
    const off = on("toast", (msg) => { setToast(msg); clearTimeout(t); t = setTimeout(() => setToast(""), 2600); });
    return () => { off(); clearTimeout(t); };
  }, []);

  // Slide the spotlight glow under the active nav item.
  useEffect(() => {
    const place = () => {
      const active = navRef.current?.querySelector('[aria-current="page"]');
      if (!active || !glowRef.current) return;
      glowRef.current.style.left = `${active.offsetLeft}px`;
      glowRef.current.style.width = `${active.offsetWidth}px`;
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [pathname]);

  function toMedieval(e) {
    e.preventDefault();
    setMedieval(true);
    setTimeout(() => { window.location.href = "/classic"; }, prefersReducedMotion() ? 0 : 380);
  }

  return (
    <>
      <FabricBackground />
      <FlyField active={page.id === "home"} />

      <header className="top">
        <ProLink className="brand" href="/" aria-label="Go to home">
          <span className="wordmark">muqeet<i>.</i></span>
        </ProLink>
        <nav className="nav" aria-label="Pages" ref={navRef}>
          <span className="glow" ref={glowRef} aria-hidden="true" />
          {PRO_PAGES.map((p) => (
            <ProLink key={p.id} href={p.path} data-label={p.label} aria-current={p.id === page.id ? "page" : undefined}>
              {p.label}
            </ProLink>
          ))}
        </nav>
        <div className="top-right">
          <a className="ed-toggle" href="/classic" role="switch" aria-checked={medieval} aria-label="Medieval edition" onClick={toMedieval}>
            <span className="ed-thumb" aria-hidden="true" />
            <span className="ed-opt pro">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></svg>
              <span className="lbl">Professional</span>
            </span>
            <span className="ed-opt med">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 21V9l4-3 4 3 4-3 4 3v12" /><path d="M4 13h16M10 21v-4a2 2 0 0 1 4 0v4" /></svg>
              <span className="lbl">Medieval</span>
            </span>
          </a>
          <button className="menu-btn" type="button" aria-label="Open menu" aria-expanded={sheet} onClick={() => setSheet((v) => !v)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
          </button>
        </div>
      </header>

      {sheet && (
        <div className="sheet">
          {PRO_PAGES.map((p) => (
            <ProLink key={p.id} className="link" href={p.path} aria-current={p.id === page.id ? "page" : undefined}>
              {p.label}
            </ProLink>
          ))}
        </div>
      )}

      <main>{children}</main>

      <Assistant hint={page.hint} />
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
