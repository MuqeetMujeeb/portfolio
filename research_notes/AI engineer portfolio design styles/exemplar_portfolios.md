# Exemplar Portfolios of AI/ML, LLM and Backend Engineers: Visual Design Styles (as of Oct 2026)

Method note: every site below was fetched live on 2026-10-02 (HTTP 200) with curl/WebFetch. Fonts and colors were pulled from the live HTML and CSS bundles (theme-color meta, @font-face names, most frequent hex/rgb values). Because the fetches were text-only, I could not see screenshots. Motion and interaction details that I could not confirm from markup are marked **[unverified]**.

## Q1: Which portfolio sites of AI/ML engineers and LLM/agent builders are widely cited or admired, and what do they look like?

### Takeaway
The most respected AI/ML people (Karpathy, Lilian Weng, Chip Huyen, Eugene Yan, Simon Willison, Hamel Husain, Jason Liu, Sebastian Raschka, Shreya Shankar, Vicki Boykis, Jay Alammar) mostly run plain sites built around their writing. Their credibility comes from the content: books, posts, OSS, talks. The polished "designed" portfolios that people admire for their visuals come from design engineers (Brittany Chiang, Lee Robinson, Rauno Freiberg, Paco Coursey, Emil Kowalski, Shu Ding, Delba).

### Cited Findings

**Catalogue (19 sites, all live 2026-10-02)**

| # | Site | Person / current role (self-stated) | Style category |
|---|------|------------------------------|----------------|
| 1 | karpathy.ai | Andrej Karpathy, AI educator (ex-OpenAI, Tesla) | Research/academic, hand-coded |
| 2 | lilianweng.github.io | Lilian Weng, "learning notes since 2017" | Research blog (Hugo PaperMod) |
| 3 | huyenchip.com | Chip Huyen, writer/computer scientist, "bringing AI into production" | Editorial bio + resources |
| 4 | eugeneyan.com | Eugene Yan, Member of Technical Staff at Anthropic | Editorial/writing-first, markdown aesthetic |
| 5 | simonwillison.net | Simon Willison, weblog (Datasette, LLM tools) | Classic weblog / tag-dense |
| 6 | hamel.dev | Hamel Husain, ML engineer, evals teacher | Docs-style (Quarto) + course funnel |
| 7 | jxnl.co | Jason Liu, Developer Experience Engineer on Codex team at OpenAI; creator of Instructor | Docs-style (MkDocs Material) |
| 8 | sebastianraschka.com | Sebastian Raschka, PhD, LLM Research Engineer | Academic/author hub |
| 9 | sh-reya.com | Shreya Shankar, researcher (CMU email) | Academic homepage |
| 10 | vickiboykis.com | Vicki Boykis, ML engineer/writer | Minimal blog index |
| 11 | jalammar.github.io | Jay Alammar, "Visualizing ML one concept at a time" | Illustrated explainer blog (frozen; moved to Substack) |
| 12 | brittanychiang.com | Brittany Chiang, Senior Frontend Engineer, Accessibility at Klaviyo | Dark technical two-column (the most-cloned dev portfolio) |
| 13 | leerob.com | Lee Robinson, "work on ML at SpaceX (formerly at Cursor)", ex-Vercel | Minimal editorial/typographic |
| 14 | paco.me | Paco Coursey, "Webmaster at Linear", ex-Vercel design system | Minimal editorial/typographic |
| 15 | emilkowal.ski | Emil Kowalski, Design Engineer, Web team at Linear | Minimal editorial + craft |
| 16 | rauno.me | Rauno Freiberg, interaction designer (Vercel, Devouring Details) | Experimental/interaction-led |
| 17 | shud.in | Shu Ding, designer/developer at Vercel (Next.js, AI SDK, v0) | Minimal editorial |
| 18 | swyx.io | Shawn "swyx" Wang, "Building in public at the frontier of AI" | Warm editorial "notebook" |
| 19 | bruno-simon.com | Bruno Simon, creative developer | Interactive/3D (Three.js) |
| (+) | terminal.satnaing.dev, henryheffernan.com, delba.dev, nan.fyi | Terminal / 3D-retro / Next.js docs person / interactive explainer | Supplementary examples |

**Per-site details**

1. **karpathy.ai**: a single hand-written page with one `style.css` whose only font declaration is generic `sans-serif` and whose only named color is `#cfcfcf`. Top to bottom: profile photo, a one-line tagline ("I like to train deep neural nets on large datasets 🧠🤖💥"), a tongue-in-cheek "Order of the Unicorn" paragraph, then a reverse-chronological timeline (2024 YouTube education, and so on) with org logos (Eureka, OpenAI, Tesla). Icons for Twitter/GitHub/RSS, plus an email that is revealed on click ("click to reveal"). Why it works: zero design overhead and pure signal, with a sense of humor. Why it won't work for a junior: it depends entirely on fame. — [karpathy.ai](https://karpathy.ai); [style.css](https://karpathy.ai/style.css)
2. **Lil'Log (lilianweng.github.io)**: Hugo PaperMod theme. System font stack (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto…`), theme-color `#2e2e33` (dark mode), link blue `#286ee0`, light bg white or `rgb(245,245,245)`. Nav: Posts, Archive, Search, Tags, FAQ. The homepage is a welcome line plus long-form post excerpts. Effective because the long, deep technical posts (math, diagrams) are the portfolio. — [lilianweng.github.io](https://lilianweng.github.io); [stylesheet](https://lilianweng.github.io/assets/css/stylesheet.min.8e2f522e170c601ef0b359b6e27078d17e3020e1f4d928afdff4dae588c1e9e4.css)
3. **huyenchip.com**: Jekyll-style `main.css` with Font Awesome icons. Top nav (Blog, Books, Events) and an "AI Guide" link group (AI Roadmap, Good AI List, ML Interviews). Profile photo, then a narrative bio covering roles (NVIDIA NeMo, Snorkel AI, Netflix) and books with social proof: *Designing ML Systems* "Amazon #1 bestseller in AI", *AI Engineering* "most read book on the O'Reilly platform in 2025". Contact links sit at the bottom. — [huyenchip.com](https://huyenchip.com)
4. **eugeneyan.com**: Merriweather (Google Fonts) and Raleway, black-on-white. Section headers use literal markdown-style `=====` underlines that give it a "technical" feel. Nav: Start Here, Writing, Speaking, Prototyping, About, plus search. Homepage order: intro/role → latest → "More than 50k reads" trending → talks → favorites → selected prototypes (e.g. "AI Reading Club", "AlignEval") → resources → socials. Read counts used as social proof are worth copying. — [eugeneyan.com](https://eugeneyan.com)
5. **simonwillison.net**: Georgia serif body with Helvetica Neue UI, a purple accent `rgb(100,56,127)` / `#2d2640`, and green tag chips (`#4dbb7a`). Dense header with tag counts ("ai 2,258", "datasette 1,547", "coding-agents 253"), then Entries/Links/Quotes/Notes/Guides and a date-stamped stream. It works through sheer volume and recency (a post dated Oct 1 2026). It is not a portfolio in the hiring sense. — [simonwillison.net](https://simonwillison.net); [CSS](https://simonwillison.net/static/css/all.4c8b64889a46.css)
6. **hamel.dev**: built with Quarto (has `quarto-html` syntax-highlighting CSS for light and dark). A promo banner ("Join 5,000+ engineers & PMs in mastering AI Evals… 25% off") sits above the nav (Blog, Notes, OSS, Teaching). Bio: 20+ yrs, Airbnb/GitHub, "early LLM research used by OpenAI". It positions him around one niche ("evals"). — [hamel.dev](https://hamel.dev)
7. **jxnl.co**: MkDocs Material (Roboto / Roboto Mono). Tabs: Home, Investments, User Manual, Books, Resume, Writing. The intro gives the role (OpenAI Codex DX) and creator of Instructor, which "OpenAI cited as inspiration for their structured output feature". It mixes technical topics (RAG, agents, evals) with personal ones. It reads like docs and shows its consulting heritage. — [jxnl.co](https://jxnl.co)
8. **sebastianraschka.com**: author hub with a dark-mode toggle (🌙), search, and nav (Blog, Books, AI Newsletter, Courses, LLM Gallery, LLMs From Scratch, Reasoning Models, Talks, Research). The hero reads "Hello, I'm Sebastian Raschka, PhD… LLM Research Engineer". Plain curl got HTTP 406 and a browser UA got 200, which suggests bot filtering. — [sebastianraschka.com](https://sebastianraschka.com)
9. **sh-reya.com**: Inter + Lora (Google Fonts). Academic layout: Home, Blog, Scholar, CV, and a list of mentees. — [sh-reya.com](https://sh-reya.com)
10. **vickiboykis.com**: brutally simple dated post index (latest Sep 1 2026) with nav Tech Blog, Essays, RSS, GitHub, About, Changes. — [vickiboykis.com](https://vickiboykis.com)
11. **jalammar.github.io**: "Visualizing machine learning one concept at a time". The illustrated explainers (e.g. Illustrated Transformer) were his reputation. The site says "I'm freezing this blog and starting to post on my Substack". Live but **outdated/frozen**. — [jalammar.github.io](https://jalammar.github.io)
12. **brittanychiang.com**: Next.js + Tailwind (credits say designed in Figma, deployed on Vercel). Inter via next/font. theme-color `#0f172a` (Tailwind slate-900) background, slate-200 text `rgb(226,232,240)`, teal-300 accent `rgb(94,234,212)`. On large screens it is a two-column `lg:flex` layout with a `lg:sticky` left column (name, title "Frontend Engineer", tagline, in-page nav About/Experience/Projects, socials) and a scrolling right column (About → Experience 2015–present → Projects → Writing). A mouse-following radial "spotlight" glow and hover-highlight cards are widely associated with this site **[unverified: not visible in static HTML]**. The footer credits a Tardis "time travel" easter egg linking to older versions. It is very widely cloned, so a copy reads as a template. — [brittanychiang.com](https://brittanychiang.com); [CSS](https://brittanychiang.com/_next/static/css/1205f04d95fac248.css)
13. **leerob.com**: single page with Bio (Default/Long toggle), then "Notes" (Things I believe, Understanding AI, Developer experience…), then dated Blogs. Fonts: Geist Sans/Mono for UI, a local "Iowan Old Style" serif for reading, and Caveat (handwritten) as an accent. Neutral palette `#fafafa`/`#171717`/`#0a0a0a`, warm paper tones `#f8f6f0`/`#faf7f1`. theme-color `#ffffff` light / `#1b1a19` dark. HTML ~800 KB, so the content is inlined. — [leerob.com](https://leerob.com); [CSS1](https://leerob.com/_next/static/chunks/5856c06b82696be0.css); [CSS2](https://leerob.com/_next/static/chunks/b11252cb6a0dd909.css)
14. **paco.me**: Next.js. @font-face Inter, Newsreader (serif), Söhne, plus mono. Radix-style gray scale `#fcfcfc`→`#646464` with accents `#ff9f0a` (orange) and `#00c2ff` (cyan). theme-color `#ffffff` / `#1c1c1c`. Order: name + "Crafting interfaces" → Building (Craft) → Projects (⌘K/cmdk, Writer, next-themes) → Writing → Now → Connect. Tiny HTML (~10 KB). — [paco.me](https://paco.me); [CSS](https://paco.me/_next/static/chunks/6f8cd1f2e1c78e16.css)
15. **emilkowal.ski**: Next.js with custom "Serif", "serifInline", "Sans" and "Mono" faces. Near-black `#0B0B09` on off-white `#F5F4F4`, grays `#989898`/`#D6D6D6`. Order: course banner (aiforui.dev) → name/"Design Engineer"/Linear → Projects (aiforui.dev, Sonner, animations.dev, Vaul) → Writing ("Agents with Taste", "You Don't Need Animations"…). — [emilkowal.ski](https://emilkowal.ski); [CSS](https://emilkowal.ski/_next/static/css/4691d38b7dfb2187.css)
16. **rauno.me**: Next.js with JetBrains Mono, Georgia serif, and a custom font "X" (`/dd.woff2`). The CSS holds saturated accents (`rgb(244,40,0)` red, `rgb(5,111,247)` blue, `#FFFF02` yellow, `#FF6100` orange). Homepage: short bio, bracketed nav ([Devouring Details], Craft, History of Software Design, Projects, Field Notes, 2023/2022 archives), and the manifesto "Make it fast. Make it beautiful. Make it consistent… Make it." The rich interactions live in the Craft sub-pages **[motion details unverified]**. — [rauno.me](https://rauno.me); [CSS](https://rauno.me/_next/static/css/e621362aa87785a2.css)
17. **shud.in**: theme-color `#fcfcfc`. Nav: About, Thoughts, Projects, Images. Narrative bio (Fudan → Microsoft → Vercel; Next.js, AI SDK, v0). — [shud.in](https://shud.in)
18. **swyx.io**: SvelteKit (not Next). Fonts Cardo + Newsreader (serif display) and Inter. Warm cream theme-color `#f5f0e7` light / navy `#111523` dark, blue accent `#2563eb`. ⌘K "Search the notebook…", dark toggle, decorative glyphs (✶ ✧ ✥), sections "Learn in Public", a "note to self" credo, essays. — [swyx.io](https://swyx.io); [CSS](https://swyx.io/_app/immutable/assets/0.CLuX_zNv.css)
19. **bruno-simon.com**: a Three.js world you drive a vehicle through ("Please drive around to learn more about me… And don't break anything!"). Amatic SC + Nunito, audio/quality toggles, "I'm stuck!" respawn. Very memorable, but heavy and not skimmable for recruiters. — [bruno-simon.com](https://bruno-simon.com)

Supplementary:
- **terminal.satnaing.dev**: a JS-rendered terminal portfolio using IBM Plex Mono (Google Fonts). The static HTML only shows the title, so the commands are **[unverified]**. His main site satnaing.dev uses Jost and a conventional hero ("PASSIONATE PROGRAMMER / FREELANCER / FULL-STACK DEVELOPER"). — [terminal.satnaing.dev](https://terminal.satnaing.dev); [satnaing.dev](https://satnaing.dev)
- **henryheffernan.com**: title "Henry Heffernan - Portfolio 2022", a single JS bundle (WebGL 3D retro-computer scene **[unverified from markup]**). Its 2022 label suggests it hasn't been updated since. — [henryheffernan.com](https://henryheffernan.com)
- **delba.dev**: a "Portfolio" page that is a plain list of work items (Next.js Docs, Next.js Learn, diagram system, Vercel KB, v0 docs), Geist Mono, dark `#121212`, and a hiring CTA ("I'm looking for my next role… Let's talk"). It shows a job-seeker framing done tastefully. — [delba.dev](https://delba.dev)
- **nan.fyi (Nanda Syahrasyad)**: "Interactive blog posts on computer science", e.g. "Build Your Own Database". Interactive explainers are the portfolio. — [nan.fyi](https://www.nan.fyi)

### Inferences
- Among elite AI/ML practitioners, a "designed" portfolio is rare. Their sites are blogs or docs (Hugo, Jekyll, Quarto, MkDocs) where depth of writing, books and OSS is the proof. An early-career engineer can't rely on reputation, so they need the clarity of the design-engineer sites and the proof density of the AI blogs.
- Lee Robinson's and Eugene Yan's moves (Vercel → Cursor → SpaceX ML; Amazon → Anthropic) show the "minimal editorial" style is now the default for AI-adjacent builders.

### Gaps
- No screenshots were possible, so animation and hover behavior (Brittany's spotlight, Rauno's craft demos, the terminal commands) is not confirmed from source.
- Could not confirm a specific widely-admired *early-career* AI engineer portfolio. Search results for "AI engineer portfolio" were dominated by AI site-builder marketing (Manus, Wix, Framer), not real exemplars.

## Q2: Which design styles recur among strong engineer portfolios (2024-2026)?

### Takeaway
Six styles recur. (A) Minimal editorial/typographic, the dominant prestige style. (B) Dark technical two-column, the Brittany Chiang lineage. (C) Research/academic or blog-as-portfolio. (D) Docs-site style. (E) Interactive/3D/OS-emulation. (F) Terminal/CLI. Bento-grid is common in templates but I found no prominent respected engineer using it.

### Cited Findings
- **A. Minimal editorial/typographic** (leerob.com, paco.me, emilkowal.ski, shud.in, swyx.io). Defining traits: a single narrow column; a serif+sans pairing (Iowan Old Style + Geist; Newsreader + Inter; Cardo + Inter; custom Serif + Sans); neutral grays with near-white/near-black and at most one accent; light and dark theme-color metas; the order runs bio → projects → writing → contact. — [leerob CSS](https://leerob.com/_next/static/chunks/5856c06b82696be0.css); [paco CSS](https://paco.me/_next/static/chunks/6f8cd1f2e1c78e16.css); [emil CSS](https://emilkowal.ski/_next/static/css/d54e455ee7d8468f.css); [swyx CSS](https://swyx.io/_app/immutable/assets/0.CLuX_zNv.css)
- **B. Dark technical, sticky two-column** (brittanychiang.com). Slate-900 bg, teal accent, Inter, sticky left identity/nav, scrolling right column with Experience cards and tech tags. — [brittanychiang.com](https://brittanychiang.com)
- **C. Research/academic and blog-as-portfolio** (karpathy.ai, lilianweng.github.io, huyenchip.com, sh-reya.com, sebastianraschka.com, simonwillison.net, vickiboykis.com, eugeneyan.com). System or serif fonts, default link blue or one accent, timeline/publication lists, social proof via books, read counts and logos. — sources in Q1 table
- **D. Docs-site style** (hamel.dev on Quarto, jxnl.co on MkDocs Material). Left/top tabs, search, TOC, code highlighting. It suits technical consultants. — [hamel.dev](https://hamel.dev); [jxnl.co](https://jxnl.co)
- **E. Interactive/3D/experimental** (bruno-simon.com Three.js, rauno.me craft, henryheffernan.com, nan.fyi interactive explainers). In a 2026 "Share your personal website" thread, HN users praised a desktop-OS emulator (dustinbrett.com), canvas animations (simonsarris.com) and an A-Frame 3D site (plackett.co.uk). One commenter wrote "It felt like using someone else's computer and exploring their bedroom." (The fetch tool reported the thread's age inconsistently; the item ID suggests early 2026.) — [HN thread](https://news.ycombinator.com/item?id=46618714); [bruno-simon.com](https://bruno-simon.com)
- **F. Terminal/CLI** (terminal.satnaing.dev, IBM Plex Mono). — [terminal.satnaing.dev](https://terminal.satnaing.dev)
- **Bento grid**: shows up mainly as templates and GitHub repos (Next.js + Tailwind + Motion bento templates, Figma/Framer kits). It is also bundled with RAG chatbots in some repos (medevs/smart-portfolio: "Next.js 15 … RAG … bento grid layout"). — [GitHub topic bento-grid](https://github.com/topics/bento-grid?o=desc&s=forks); [medevs/smart-portfolio](https://github.com/medevs/smart-portfolio); [Framer bento template](https://hallof.framer.website/resources/bento-grid-website-portfolio-template)
- Older HN threads show a lasting preference for minimal, content-first sites. One comment noted "a lot of nostalgia, either utter minimalism or vaporwave", and another said "I don't need fancy graphics to show I am a good engineer". — [HN 17673352](https://news.ycombinator.com/item?id=17673352); [HN 17671490](https://news.ycombinator.com/item?id=17671490)

### Inferences
- **Style summary:**
  - **A (minimal editorial)** signals taste and confidence. It is cheap to build in Next.js with next/font, and it is the safest choice to look senior.
  - **B (dark two-column)** is effective but over-cloned. It needs a distinct palette and type to avoid looking like a template.
  - **C (research/blog)** is earned by content volume, and juniors can borrow parts of it: dated writing, read counts.
  - **D (docs-style)** fits consultants selling expertise.
  - **E and F (interactive, 3D, terminal)** are memorable but costly and less skimmable for recruiters. They are best used as an easter egg or a secondary route, not the main path.
  - **Bento** looks "product-style" and modern, but because it is template-heavy it can read as generic.
- A Next.js AI engineer could use a hybrid: A as the base, with one AI-specific interactive element (see Q3).

### Gaps
- Galleries (godly.website, siteinspire, awwwards, minimal.gallery, bestfolios) were not fetched within the tool budget. I have no gallery citations for which of these sites are featured.

## Q3: How do AI-specific portfolios showcase work?

### Takeaway
Respected AI people showcase work through writing, open-source tools, books, talks, courses and small live prototypes, not embedded chatbots. "Ask-my-resume" RAG chatbots are very common in junior/GitHub portfolios. None of the elite sites I checked embedded one.

### Cited Findings
- Eugene Yan has a "Prototyping" section with live prototypes (AI Reading Club, AlignEval) plus read-count social proof. — [eugeneyan.com](https://eugeneyan.com)
- Jason Liu leads with a named OSS artifact (Instructor) and third-party validation ("OpenAI cited as inspiration"). — [jxnl.co](https://jxnl.co)
- Hamel Husain anchors his whole site on one niche ("evals") with a course CTA banner. — [hamel.dev](https://hamel.dev)
- Chip Huyen and Sebastian Raschka lead with books and include quantified accolades. Raschka has an "LLM Gallery" and "LLMs From Scratch" nav. — [huyenchip.com](https://huyenchip.com); [sebastianraschka.com](https://sebastianraschka.com)
- Simon Willison uses tag counts (ai 2,258) to signal sustained depth. — [simonwillison.net](https://simonwillison.net)
- Jay Alammar built a reputation on visual, illustrated explanations of ML architectures. — [jalammar.github.io](https://jalammar.github.io)
- Many GitHub repos implement RAG "Ask Me Anything" portfolio chatbots: some with guardrails and LLM evals on Azure (kerilpatel), Next.js 15 + bento (medevs), and FastAPI + vector search (dennisglouki). — [kerilpatel/portfolio-ai-chatbot](https://github.com/kerilpatel/portfolio-ai-chatbot); [medevs/smart-portfolio](https://github.com/medevs/smart-portfolio); [dennisglouki/Chatbot_CV](https://github.com/dennisglouki/Chatbot_CV)

### Inferences
- For an early-career voice/RAG/real-time engineer, the strongest moves are:
  - Case studies with architecture diagrams and latency/cost metrics (borrow Alammar's visuals, Yan's prototypes).
  - Clearly named OSS or demos (borrow Liu).
  - One niche headline (borrow Husain).
- A chatbot is only distinctive if it shows real engineering, such as streaming, citations, evals or voice. A generic one is now commodity.

### Gaps
- Found no well-known AI engineer site with an embedded voice agent demo, so I couldn't cite a precedent.
- No quantitative data (recruiter studies) on which style converts better.
