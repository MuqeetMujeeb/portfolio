import ProjectsGrid from "@/components/pro/ProjectsGrid";
import { Page, PageHead, NextLink } from "@/components/pro/PageParts";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Page id="projects">
      <PageHead
        id="projects"
        title="Selected projects"
        lede="Systems I've designed and shipped, from RAG pipelines to real-time voice agents. Select a project for details."
      />
      <ProjectsGrid />
      <NextLink id="projects" />
    </Page>
  );
}
