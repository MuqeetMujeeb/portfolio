"use client";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Connect" },
];

export default function SideNav({ active, onJump }) {
  return (
    <nav className="sidenav" aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          data-label={s.label}
          className={active === s.id ? "active" : ""}
          aria-label={`Go to ${s.label}`}
          aria-current={active === s.id ? "true" : undefined}
          onClick={() => onJump(s.id)}
        />
      ))}
    </nav>
  );
}
