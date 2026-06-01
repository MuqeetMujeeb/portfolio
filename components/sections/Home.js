import Link from "next/link";
import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";
import HomeSocials from "@/components/HomeSocials";

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
          <HomeSocials />
        </div>
      </div>
      <Link href="/about" className="scroll-hint">
        Begin the Tale
        <span className="chev" />
      </Link>
    </section>
  );
}
