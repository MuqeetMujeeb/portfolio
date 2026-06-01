"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

// Shared popup: dark backdrop + parchment panel, Esc / backdrop / × to close,
// scroll-locked, portalled to <body> so the page `zoom` doesn't shrink it.
export default function Modal({ open, onClose, children, label }) {
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
    <div
      className="sk-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        className="panel panel-framed sk-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="sk-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
