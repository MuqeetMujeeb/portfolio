import FillText from "@/components/pro/FillText";
import ProLink from "@/components/pro/ProLink";
import { PRO_PAGES, nextPage } from "@/lib/pro/pages";

export const Arrow = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// Eyebrow ("02 · Experience"), fill-wave title, and an optional lede or stitch rule.
export function PageHead({ id, title, lede }) {
  const i = PRO_PAGES.findIndex((p) => p.id === id);
  return (
    <div className="page-head">
      <div className="eyebrow" data-r style={{ "--i": 0 }}>
        {String(i).padStart(2, "0")} · {PRO_PAGES[i].label}
      </div>
      <FillText as="h1" className="page-title" text={title} data-r style={{ "--i": 1 }} />
      {lede ? (
        <p className="lede" data-r style={{ "--i": 2 }}>{lede}</p>
      ) : (
        <div className="stitch-rule" data-r style={{ "--i": 2 }} />
      )}
    </div>
  );
}

export function NextLink({ id, i = 6 }) {
  const n = nextPage(id);
  if (!n) return null;
  return (
    <ProLink className="next" href={n.path} data-r style={{ "--i": i }}>
      Next <span className="lbl">{n.label}</span>
      <Arrow />
    </ProLink>
  );
}

export function Page({ id, children }) {
  return (
    <section className="page is-active" data-page={id} aria-label={PRO_PAGES.find((p) => p.id === id)?.label}>
      {children}
    </section>
  );
}
