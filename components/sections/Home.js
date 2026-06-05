import Link from "next/link";
import { profile } from "@/lib/profile";
import { FlourishDivider } from "@/components/Icons";
import HomeSocials from "@/components/HomeSocials";
import RotatingTitle from "@/components/RotatingTitle";

export default function Home() {
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");
  return (
    <section id="home" className="section" data-nav="Home">
      {/* Image background — uncomment to use a still image instead of the video */}
      {/* <div
        className="section-bg"
        style={{ backgroundImage: "url('/images/home.webp')" }}
        data-parallax
      /> */}
      <div className="section-bg" data-parallax>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/home.webp"
          className="bg-video"
        >
          <source src="/images/homee.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="section-scrim" />
      <div className="container">
        <div className="home-inner">
          <span className="eyebrow reveal">Enter the realm of</span>
          <h1 className="home-name reveal">
            {first}
            <span className="accent">{last}</span>
          </h1>
          <FlourishDivider />
          <p className="home-title reveal">
            <RotatingTitle roles={profile.roles} />
          </p>
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
