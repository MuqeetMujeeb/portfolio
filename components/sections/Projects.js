"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";
import Modal from "@/components/Modal";

export default function Projects() {
  const [open, setOpen] = useState(null); // selected project object

  const columns = [
    {
      title: "SMARTnCODE Technologies",
      items: profile.projects.filter(
        (p) => p.context === "SMARTnCODE Technologies"
      ),
    },
    {
      title: "Personal Projects",
      items: profile.projects.filter((p) => p.context === "Personal Project"),
    },
  ];

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

        <div className="projects-cols">
          {columns.map((col) => (
            <div
              key={col.title}
              className="panel panel-framed projects-box reveal"
            >
              <h3 className="projects-box-title">{col.title}</h3>
              <div className="projects-box-list">
                {col.items.map((proj) => (
                  <article
                    key={proj.name}
                    className="project-entry"
                    role="button"
                    tabIndex={0}
                    aria-label={`Expand ${proj.name}`}
                    onClick={() => setOpen(proj)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpen(proj);
                      }
                    }}
                  >
                    <span className="project-expand" aria-hidden="true">
                      ⤢
                    </span>
                    <h4>{proj.name}</h4>
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
          ))}
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} label={open?.name}>
        {open && (
          <>
            <span className="project-context">{open.context}</span>
            <h3 className="proj-modal-title">{open.name}</h3>
            <FlourishDivider />
            <p className="project-blurb">{open.blurb}</p>
            <ul className="project-points">
              {open.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
            <div className="project-tech">
              {open.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
