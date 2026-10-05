import { Cormorant_Garamond, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./pro.css";
import { profile } from "@/lib/profile";
import ProShell from "@/components/pro/ProShell";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#1a1b1e",
  width: "device-width",
  initialScale: 1,
};

// Root layout for the professional edition (the default site). The medieval
// edition lives under /classic with its own root layout, so switching between
// them is a full page load and their styles never mix.
export default function ProLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <body>
        <ProShell>{children}</ProShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
