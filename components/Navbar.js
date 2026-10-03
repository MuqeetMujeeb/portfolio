"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/classic", label: "Home" },
  { href: "/classic/about", label: "About" },
  { href: "/classic/skills", label: "Skills" },
  { href: "/classic/projects", label: "Projects" },
  { href: "/classic/connect", label: "Connect" },
];

export default function Navbar({ onSummon }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) =>
    href === "/classic" ? pathname === "/classic" : pathname.startsWith(href);

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Desktop links with an animated active indicator */}
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${isActive(l.href) ? "active" : ""}`}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              <span className="nav-link-label">{l.label}</span>
              <span className="nav-link-underline" />
            </Link>
          ))}
        </nav>

        {/* Switch to the professional edition (a plain link: the editions use
            separate root layouts, so this is a full page load) */}
        <a className="edition-switch" href="/">
          Professional edition
        </a>

        {/* Interactive CTA — summons the AI herald
        <button className="nav-summon" onClick={onSummon}>
          <span className="nav-summon-ico">
            <Icon.chat width="18" height="18" />
          </span>
          <span className="nav-summon-text">Ask the Herald</span>
          <span className="nav-summon-spark" />
        </button> */}

        {/* Mobile toggle */}
        <button
          className={`nav-burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div className={`nav-overlay ${menuOpen ? "open" : ""}`}>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-overlay-link ${isActive(l.href) ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <button
          className="nav-overlay-link summon"
          onClick={() => {
            setMenuOpen(false);
            onSummon();
          }}
        >
          Ask the Herald
        </button>
        <a className="nav-overlay-link" href="/">
          Professional edition
        </a>
      </div>
    </header>
  );
}
