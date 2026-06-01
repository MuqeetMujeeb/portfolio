import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";

export default function About() {
  const { education } = profile;
  const current = profile.experience[0];
  return (
    <section id="about" className="section" data-nav="About">
      <div
        className="section-bg"
        style={{ backgroundImage: "url('/images/about.png')" }}
        data-parallax
      />
      <div className="section-scrim" />
      <div className="container">
        <div className="about-grid">
          <div className="panel panel-framed" style={{ padding: "3rem 2.6rem" }}>
            <span className="eyebrow reveal">The Tale So Far</span>
            <h2 className="section-title reveal" style={{ marginTop: "0.6rem" }}>
              About Me
            </h2>
            <FlourishDivider />
            <div className="about-body">
              {profile.about.map((para, i) => (
                <p key={i} className="reveal">
                  {para}
                </p>
              ))}
            </div>
            <div className="about-meta">
              <div className="reveal">
                <div className="label">Current Post</div>
                <div className="value">{current.role}</div>
                <div className="value" style={{ fontWeight: 400, fontSize: "0.85rem" }}>
                  {current.company}
                </div>
              </div>
              <div className="reveal">
                <div className="label">Studies</div>
                <div className="value">B.E. CSE (AI & ML)</div>
                <div className="value" style={{ fontWeight: 400, fontSize: "0.85rem" }}>
                  GPA {education.gpa} · {education.school}
                </div>
              </div>
              <div className="reveal">
                <div className="label">Seat</div>
                <div className="value">{profile.location}</div>
              </div>
              <div className="reveal">
                <div className="label">Quests Undertaken</div>
                <div className="value">6+ Hackathons</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
