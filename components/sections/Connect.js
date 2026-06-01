import { profile } from "@/lib/profile";
import { FlourishDivider, Icon } from "@/components/Icons";

export default function Connect() {
  const { contact } = profile;
  const ghHandle = "github.com/" + contact.github.split("/").filter(Boolean).pop();
  const liHandle = contact.linkedin.replace("https://" ,"")
  
  const links = [
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: Icon.email,
    },
    {
      label: "GitHub",
      value: ghHandle,
      href: contact.github,
      icon: Icon.github,
      ext: true,
    },
    {
      label: "LinkedIn",
      value: liHandle,
      href: contact.linkedin,
      icon: Icon.linkedin,
      ext: true,
    },
    {
      label: "Call",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      icon: Icon.phone,
    },
  ];
  return (
    <section id="connect" className="section" data-nav="Connect">
      <div
        className="section-bg"
        style={{ backgroundImage: "url('/images/connect.png')" }}
        data-parallax
      />
      <div className="section-scrim" />
      <div className="container">
        <div className="connect-inner">
          <span className="eyebrow reveal">The Crossing</span>
          <h2 className="section-title reveal">Questions & Connect</h2>
          <FlourishDivider className="divider" style={{ margin: "1.4rem auto" }} />
          <p className="lead reveal">
            Have a question, or a collaboration in mind? Cross the
            bridge — or ask my AI assistant in the corner anything about my work.
          </p>
          <div className="connect-links">
            {links.map((l) => {
              const IconComp = l.icon;
              return (
                <a
                  key={l.label}
                  className="connect-card reveal"
                  href={l.href}
                  {...(l.ext
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="ico">
                    <IconComp />
                  </span>
                  <span className="ct-text">
                    <span className="ct-label">{l.label}</span>
                    <span className="ct-value">{l.value}</span>
                  </span>
                </a>
              );
            })}
          </div>
          <p className="connect-foot reveal">
            {profile.name} · {profile.title} · {profile.location}
          </p>
        </div>
      </div>
    </section>
  );
}
