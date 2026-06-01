import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";

export default function Projects() {
  return (
    <section id="projects" className="section" data-nav="Projects">
      <div
        className="section-bg"
        style={{ backgroundImage: "url('/images/projects.png')" }}
        data-parallax
      />
      <div className="section-scrim" />
      <div className="container">
        <div className="projects-head">
          <span className="eyebrow reveal">The Chronicles</span>
          <h2 className="section-title reveal">Projects</h2>
          <FlourishDivider className="divider" />
          <p className="lead reveal">
            Systems I&apos;ve designed and shipped — from RAG pipelines to
            real-time voice agents.
          </p>
        </div>
        <div className="projects-grid">
          {profile.projects.map((proj) => (
            <article key={proj.name} className="panel project-card reveal">
              <span className="project-context">{proj.context}</span>
              <h3>{proj.name}</h3>
              <p className="project-blurb">{proj.blurb}</p>
              <ul className="project-points">
                {proj.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
              <div className="project-tech">
                {proj.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
