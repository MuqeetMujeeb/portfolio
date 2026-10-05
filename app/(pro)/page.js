import HomeHero from "@/components/pro/HomeHero";
import { Page, NextLink } from "@/components/pro/PageParts";

export default function HomePage() {
  return (
    <Page id="home">
      <HomeHero />
      <NextLink id="home" />
    </Page>
  );
}
