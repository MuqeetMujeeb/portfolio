// Page order for the professional edition: nav, "Next" links, arrow keys and
// the robot's per-page hints all follow this list.
export const PRO_PAGES = [
  { id: "home", path: "/", label: "Home", hint: "Hi, I'm Muqeet's assistant. Click me to ask about his work." },
  { id: "about", path: "/about", label: "About", hint: "The quick facts are on the right." },
  { id: "experience", path: "/experience", label: "Experience", hint: "Two roles so far, newest first." },
  { id: "projects", path: "/projects", label: "Projects", hint: "Select any project for the full details." },
  { id: "github", path: "/github", label: "GitHub", hint: "This activity loads live from his GitHub." },
  { id: "skills", path: "/skills", label: "Skills", hint: "Grouped by the kind of work they're used for." },
  { id: "certifications", path: "/certifications", label: "Certifications", hint: "His hackathons and practice are listed here." },
  { id: "contact", path: "/contact", label: "Contact", hint: "Prefer a quick answer? Ask me instead." },
];

export function pageForPath(pathname) {
  return PRO_PAGES.find((p) => p.path === pathname) || PRO_PAGES[0];
}

export function nextPage(id) {
  const i = PRO_PAGES.findIndex((p) => p.id === id);
  return PRO_PAGES[i + 1] || null;
}
