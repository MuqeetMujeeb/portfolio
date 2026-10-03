"use client";

import { useEffect, useRef } from "react";
import { fillWave } from "@/lib/pro/fx";

// Headline rendered word by word so the text fill wave can run over it.
// `parts` is a list of { text, em } runs; `text` is a shortcut for one run.
export default function FillText({ as: Tag = "h2", text, parts, className, id, ...rest }) {
  const ref = useRef(null);
  const runs = parts || [{ text }];

  useEffect(() => {
    const el = ref.current;
    // wait for web fonts so line breaks (and so the wave timing) are final
    let cancelled = false;
    (document.fonts?.ready || Promise.resolve()).then(() => { if (!cancelled) fillWave(el); });
    return () => { cancelled = true; };
  }, []);

  const words = (str, key) =>
    str.split(/(\s+)/).filter(Boolean).map((w, i) =>
      /^\s+$/.test(w) ? " " : <span key={`${key}-${i}`} className="fw">{w}</span>
    );

  return (
    <Tag ref={ref} className={className} id={id} {...rest}>
      {runs.map((r, i) => (r.em ? <em key={i}>{words(r.text, i)}</em> : words(r.text, i)))}
    </Tag>
  );
}
