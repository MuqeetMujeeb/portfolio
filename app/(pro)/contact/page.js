import ContactPanels from "@/components/pro/ContactPanels";
import { Page, PageHead } from "@/components/pro/PageParts";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Page id="contact">
      <PageHead
        id="contact"
        title="Let's build something together"
        lede="Open to AI engineering roles and collaborations on voice agents, RAG systems and real-time backends."
      />
      <ContactPanels />
    </Page>
  );
}
