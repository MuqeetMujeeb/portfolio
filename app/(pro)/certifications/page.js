import { profile } from "@/lib/profile";
import { Page, PageHead, NextLink } from "@/components/pro/PageParts";

export const metadata = { title: "Certifications" };

const Seal = () => (
  <span className="seal" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" /></svg>
  </span>
);

// Achievements as headline + detail, e.g. "6+ hackathons" / "Building AI-driven…".
const ACHIEVEMENTS = [
  { head: "6+ hackathons", text: "Building AI-driven solutions under real-world time constraints, including DocHub-AI at the 48-hour CodeFest." },
  { head: "LeetCode", text: "Consistent practice in data structures and algorithms." },
];

export default function CertificationsPage() {
  const certs = profile.certifications;
  return (
    <Page id="certifications">
      <PageHead id="certifications" title="Certifications & achievements" />
      {certs.length > 0 && (
        <div className="cert-grid">
          {certs.map((c, i) => (
            <div className="panel stitched cert" key={c.title} data-r style={{ "--i": 3 + i }}>
              <Seal />
              <h2>{c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer">{c.title}</a> : c.title}</h2>
              <div className="issuer">{c.issuer}</div>
              <div className="yr">{[c.year, c.credentialId].filter(Boolean).join(" · ")}</div>
            </div>
          ))}
        </div>
      )}
      <div className="ach" style={certs.length ? undefined : { marginTop: 0 }}>
        {ACHIEVEMENTS.map((a, i) => (
          <div className="panel" key={a.head} data-r style={{ "--i": 7 + i }}><b>{a.head}</b><span>{a.text}</span></div>
        ))}
      </div>
      <NextLink id="certifications" i={9} />
    </Page>
  );
}
