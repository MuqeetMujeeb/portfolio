"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/lib/profile";
import { Icon } from "@/components/Icons";

export default function HomeSocials() {
  const { contact } = profile;
  const [resumeOpen, setResumeOpen] = useState(false);

  const socials = [
    { label: "GitHub", href: contact.github, icon: Icon.github },
    { label: "LinkedIn", href: contact.linkedin, icon: Icon.linkedin },
    { label: "Email", href: `mailto:${contact.email}`, icon: Icon.email, internal: true },
  ];

  return (
    <>
      <div className="home-socials reveal">
        {socials.map((s) => {
          const IconComp = s.icon;
          return (
            <a
              key={s.label}
              className="home-social"
              href={s.href}
              aria-label={s.label}
              title={s.label}
              {...(s.internal
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
            >
              <IconComp />
            </a>
          );
        })}
        <button
          className="home-social"
          aria-label="Resume"
          title="Resume"
          onClick={() => setResumeOpen(true)}
        >
          <Icon.resume />
        </button>
      </div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}

function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="resume-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Resume">
      <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
        <div className="resume-head">
          <div className="resume-actions">
            <a
              className="resume-open"
              href="/resume.pdf"
              download={`${profile.shortName}-Resume.pdf`}
            >
              Download ↓
            </a>
            <a
              className="resume-open"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in new tab ↗
            </a>
          </div>
          <button className="resume-close" onClick={onClose} aria-label="Close resume">
            ×
          </button>
        </div>
        <iframe
          className="resume-frame"
          src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
          title="Resume PDF"
        />
      </div>
    </div>,
    document.body
  );
}
