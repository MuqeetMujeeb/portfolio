import { profile } from "@/lib/profile";
import { Page, PageHead, NextLink } from "@/components/pro/PageParts";

export const metadata = { title: "About" };

export default function AboutPage() {
  const [current, previous] = profile.experience;
  const { education } = profile;
  return (
    <Page id="about">
      <PageHead id="about" title="Engineering AI that holds up in production" />
      <div className="about-grid">
        <div className="prose" data-r style={{ "--i": 3 }}>
          {profile.about.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <div className="panel stitched facts" data-r style={{ "--i": 4 }}>
          <div className="fact"><div className="k">Current role</div><div className="v">{current.role}</div><div className="s">{current.company} · {current.mode}</div></div>
          {previous && (
            <div className="fact"><div className="k">Previously</div><div className="v">{previous.role}</div><div className="s">{previous.company} · {previous.location.split(",")[0]}</div></div>
          )}
          <div className="fact"><div className="k">Education</div><div className="v">{education.degree.replace("B.E. Computer Science (Artificial Intelligence & Machine Learning)", "B.E. Computer Science (AI & ML)")}</div><div className="s">{education.school} · GPA {education.gpa}</div></div>
          <div className="fact"><div className="k">Based in</div><div className="v">{profile.location}</div></div>
        </div>
      </div>
      <div className="interests" data-r style={{ "--i": 5 }}>
        <h2>Beyond work</h2>
        <div className="interest-row">
          {profile.interests.map((it) => (
            <div className="panel interest" key={it.label}><b>{it.label}</b><span>{it.note}</span></div>
          ))}
        </div>
      </div>
      <NextLink id="about" />
    </Page>
  );
}
