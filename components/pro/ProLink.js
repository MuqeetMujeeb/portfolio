"use client";

import Link from "next/link";
import { emit } from "@/lib/pro/fx";

// Internal link that plays the page's lift-out transition before navigating.
// Modified clicks (new tab etc.) behave like a normal link.
export default function ProLink({ href, onClick, ...props }) {
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        emit("navigate", href);
      }}
    />
  );
}
