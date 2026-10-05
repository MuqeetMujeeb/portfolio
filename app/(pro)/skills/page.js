import { profile } from "@/lib/profile";
import { Page, PageHead, NextLink } from "@/components/pro/PageParts";

export const metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <Page id="skills">
      <PageHead id="skills" title="Tools I build with" />
      <div className="skill-grid">
        {profile.resumeSkills.map((g, i) => (
          <div className="panel skill-card" key={g.title} data-r style={{ "--i": 3 + i }}>
            <h2>{g.title}</h2>
            <p className="desc">{g.desc}</p>
            <div className="chips">{g.items.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          </div>
        ))}
      </div>
      <NextLink id="skills" i={7} />
    </Page>
  );
}
