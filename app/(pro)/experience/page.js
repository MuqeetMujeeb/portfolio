import { profile } from "@/lib/profile";
import { Page, PageHead, NextLink } from "@/components/pro/PageParts";

export const metadata = { title: "Experience" };

// Short period labels like "Jul 2026 — Present" from "July 2026 – Present".
const shortPeriod = (p) =>
  p.replace(/\b(January|February|March|April|June|July|August|September|October|November|December)\b/g, (m) => m.slice(0, 3)).replace("–", "—");

export default function ExperiencePage() {
  return (
    <Page id="experience">
      <PageHead id="experience" title="Where I've built" />
      <div className="timeline">
        {profile.experience.map((job, i) => (
          <article className="panel job" key={job.company} data-r style={{ "--i": 3 + i }}>
            <div className="job-head"><h2>{job.role}</h2><span className="when">{shortPeriod(job.period)}</span></div>
            <div className="org">{job.company} · {job.mode}, {job.location.split(",")[0]}</div>
            <ul>{job.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
          </article>
        ))}
      </div>
      <NextLink id="experience" i={5} />
    </Page>
  );
}
