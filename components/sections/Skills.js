import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";

const runes = ["✦", "⚔", "⛭", "❮❯"];

export default function Skills() {
  return (
    <section id="skills" className="section" data-nav="Skills">
      <div
        className="section-bg"
        style={{ backgroundImage: "url('/images/skills.png')" }}
        data-parallax
      />
      <div className="section-scrim" />
      <div className="container">
        <div className="skills-head">
          <span className="eyebrow reveal">The Armory</span>
          <h2 className="section-title reveal">Skills &amp; Craft</h2>
          <FlourishDivider className="divider" />
          <p className="lead reveal">
            The tools, frameworks, and technologies I build with.
          </p>
          <div className="skill-legend reveal">
            <span className="legend-item">
              <i className="legend-dot core" /> Core expertise
            </span>
            <span className="legend-item">
              <i className="legend-dot familiar" /> Familiar
            </span>
          </div>
        </div>

        <div className="skills-grid">
          {profile.skillDomains.map((domain, i) => (
            <div key={domain.title} className="panel skill-card reveal">
              <h3>
                <span className="rune">{runes[i % runes.length]}</span>
                {domain.title}
              </h3>
              <div className="skill-rows">
                {domain.rows.map((row) => (
                  <div key={row.label} className="skill-row">
                    <span className="skill-row-label">{row.label}</span>
                    <div className="skill-row-chips">
                      {row.c.map((s) => (
                        <span key={s} className="chip core">
                          {s}
                        </span>
                      ))}
                      {row.f.map((s) => (
                        <span key={s} className="chip familiar">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
