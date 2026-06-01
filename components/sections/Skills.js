import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";

const runes = ["⚔", "✦", "⛭", "♜"];

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
          <h2 className="section-title reveal">Skills & Craft</h2>
          <FlourishDivider className="divider" />
          <p className="lead reveal">
            The tools and disciplines I wield to forge reliable, production-grade
            AI systems.
          </p>
        </div>
        <div className="skills-grid">
          {profile.skillGroups.map((group, i) => (
            <div key={group.label} className="panel skill-card reveal">
              <h3>
                <span className="rune">{runes[i % runes.length]}</span>
                {group.label}
              </h3>
              <div className="chip-row">
                {group.skills.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
