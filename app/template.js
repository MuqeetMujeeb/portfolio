"use client";

// Re-mounts on every route change, giving each page a gentle fade-in.
export default function Template({ children }) {
  return <div className="route-fade">{children}</div>;
}
