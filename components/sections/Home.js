import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";

export default function Home() {
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");
  return (
    <section id="home" className="section" data-nav="Home">
      <div
        className="section-bg"
        style={{ backgroundImage: "url('/images/home.png')" }}
        data-parallax
      />
      <div className="section-scrim" />
      <div className="container">
        <div className="home-inner">
          <span className="eyebrow reveal">Enter the realm of</span>
          <h1 className="home-name reveal">
            {first}
            <span className="accent">{last}</span>
          </h1>
          <FlourishDivider />
          <p className="home-title reveal">{profile.title}</p>
          <p className="home-tagline reveal">{profile.tagline}</p>
          <div className="home-cta reveal">
            <a className="btn btn-primary" href="#projects">
              View My Works
            </a>
            <a className="btn btn-ghost" href="#connect">
              Make Contact
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-hint">
        Scroll to journey on
        <span className="chev" />
      </div>
    </section>
  );
}
