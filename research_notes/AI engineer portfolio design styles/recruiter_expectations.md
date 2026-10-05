# What Recruiters, Hiring Managers, and Technical Founders Value in Software/AI Engineer Portfolio Websites

Context: early-career AI Engineer (LLMs, RAG, voice agents, real-time backend), India-based, applying globally. Research date: Oct 2026. Source quality note: much of the web content on this topic is SEO/aggregator material with unsourced stats; those are flagged below. Primary studies (Ladders, Stanford/Fogg, Lindgaard, NN/g, WebAIM, Google) are mostly about resumes or websites generally, not engineer portfolios specifically, so findings are transferred by inference.

## 1. How long do recruiters/hiring managers spend on a portfolio, and what do they look at first?

### Takeaway
No rigorous eye-tracking study of *engineer portfolio sites* was found; the best proxies are the Ladders resume eye-tracking study (~7.4 s initial screen, F/E-pattern scanning, simple layouts held attention longer) and web first-impression research (visual appeal judged in ~50 ms). Hiring managers report treating portfolios as an optional tie-breaker, often opened only for borderline or very promising candidates.

### Cited Findings
- Ladders 2018 eye-tracking study (30 professional recruiters, 10 weeks): average initial resume screen was 7.4 seconds, up from ~6 s in 2012 — [HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/); [Ladders](https://www.theladders.com/career-advice/you-only-get-6-seconds-of-fame-make-it-count) (2018, older than preferred window)
- Same study: high-performing resumes had simple layouts, clear section headings, bold titles, bulleted accomplishments, white space, and an E/F-pattern flow; poor performers had crowded designs, multiple columns, long paragraphs, missing headers — [HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/)
- Caveat: critics note the Ladders study's methodology details (sample sizes of resumes, industries) are thinly reported, so the precise 7.4 s figure should be treated as indicative — [StandOut CV](https://standout-cv.com/stats/how-long-recruiters-spend-looking-at-cv); [Distinct Recruitment](https://www.distinctrecruitment.com/uk/resources/blog/the-6-second-cv-recruitments-biggest-myth/)
- Lindgaard et al. (2006, Behaviour & Information Technology): visual appeal of web pages was assessed within 50 ms, and 50 ms ratings correlated highly with 500 ms ratings — [Semantic Scholar](https://www.semanticscholar.org/paper/Attention-web-designers:-You-have-50-milliseconds-a-Lindgaard-Fernandes/f9715b117c57d4e7064afe1c1cb95d5bf4cc1831) (older study)
- Hiring manager on Blind (2022): "I've generally only looked at portfolios of candidates I feel are borderline no or a 'I think this person might be exactly what we are looking for'" and was "generally only disappointed with the borderline no portfolios" (tutorial-derived work) — [Blind](https://www.teamblind.com/post/do-you-look-at-candidates-portfolio-zlbuydfd)
- Twitch interviewer on the same thread: "Yes but I don't expect anything. It serves only to help, not to hurt." — [Blind](https://www.teamblind.com/post/do-you-look-at-candidates-portfolio-zlbuydfd)
- Profy.dev survey of 60+ hiring managers/React leads (Aug 2021): the overwhelming majority said they would look at a personal website if provided, but most said not having one would make little to no difference ("it depends") — [DEV / Profy](https://dev.to/profydev/this-survey-among-60-hiring-managers-reveals-don-t-waste-your-time-on-a-react-portfolio-website-17ge) (older; frontend-focused)
- A practitioner checklist describes a typical ~60-second review: skim homepage, click a featured project to check for a live demo, scan code/README, check GitHub for recent activity — [DEV Community checklist](https://dev.to/_d7eb1c1703182e3ce1782/developer-portfolio-checklist-20-things-hiring-managers-look-for-388p) (opinion, not a study)

### Inferences
- Design for a ~10-60 second skim: the above-the-fold area must answer "who, what role, what proof" instantly (name, "AI Engineer — LLMs/RAG/voice agents", 1-2 quantified highlights, links to resume/GitHub/contact).
- Because many reviewers open the site only for borderline candidates, it functions as a tie-breaker; it must reduce doubt (proof of shipping), not add friction.
- F/E-pattern findings favour left-aligned headings, short bullets, and a clear vertical order over multi-column, card-heavy or horizontally scrolling layouts.

### Gaps
- No eye-tracking or time-on-page data specific to developer/AI portfolio *websites* was found.
- No reliable data on how often recruiters (vs. engineers) click portfolio links from ATS/LinkedIn.

## 2. What content structure works best for AI/ML engineers?

### Takeaway
Practitioner and hiring-oriented sources converge on: clear role statement, 3-5 deep projects over many shallow ones, each written as a case study (problem, decisions, architecture, measured results), with a live demo or video, linked code/README, and optionally technical writing. Prominent ML practitioners (Chip Huyen, Eugene Yan) emphasize public write-ups and runnable prototypes.

### Cited Findings
- Hiring managers evaluate portfolios to answer: can this person build things, work with others, communicate technical ideas, and grow — [DEV checklist](https://dev.to/_d7eb1c1703182e3ce1782/developer-portfolio-checklist-20-things-hiring-managers-look-for-388p)
- "Quality beats quantity: 3-5 polished projects outperform 10+ basic ones" and "84% of employers want to see working applications" — [DEV checklist](https://dev.to/_d7eb1c1703182e3ce1782/developer-portfolio-checklist-20-things-hiring-managers-look-for-388p). SUSPECT: the same article attributes "73% of hiring managers consider a strong portfolio more important than a perfect resume" to the Stack Overflow 2024 Developer Survey; the SO survey surveys developers, not hiring managers, and I could not verify this stat. Do not cite these numbers as fact.
- Strongest portfolios explain the problem being solved, the decisions made, and the value created — [Northeastern ISE Substack](https://northeasternise.substack.com/p/hiring-managers-look-at-three-things)
- Chip Huyen: a great portfolio often speaks louder than a resume; recommends in-depth technical blog posts/papers, open-source contributions, hackathons, sharing a learning journey — [VentureBeat](https://venturebeat.com/ai/4-ai-and-ml-job-hunting-tips-from-chip-huyen)
- Eugene Yan's own site pairs technical essays with named, linked working prototypes at equal prominence — [JobRoadmaps profile](https://jobroadmaps.com/portfolios/eugene-yan); [eugeneyan.com](https://eugeneyan.com/)
- Eugene Yan's hiring criteria for ML/AI engineers (Jul 2024): software fundamentals, data literacy, comfort with uncertainty, understanding of evals and monitoring, plus hunger, judgment and empathy; scope dimensions of ambiguity, influence, complexity, execution — [Eugene Yan](https://eugeneyan.com/writing/how-to-interview/)
- NN/g survey of 200+ UX hiring managers: expectations differ by level — juniors judged on process, seniors on scope and influence — [NN/g video](https://www.nngroup.com/videos/ux-portfolios-hiring/) (UX domain; transferable principle)
- Recommended repo/case-study presentation for AI projects: README/case-study structure, architecture diagram, tests/CI badges, live demo with seeded data, demo video/GIF, clean commit history — [GitHub issue checklist](https://github.com/hz0705-blip/ai-news-platform/issues/5) (low authority, practitioner checklist)
- Hacker News "Who is hiring" posts (2026) show employers asking candidates to send portfolios/examples of past work, keep submissions concise, and favour people who build with AI as a default way of working rather than engineers who "recently added an LLM API to their CV" — [HN Who is hiring Aug 2026](https://news.ycombinator.com/item?id=49156683) (via search summary; individual posts vary)

### Inferences
- Suggested structure for this candidate: (1) Hero: name + "AI Engineer" + one-line specialization + 1-3 proof metrics + CTA (resume PDF, GitHub, email/Calendly); (2) 3-4 featured case studies (voice agent, RAG system, real-time backend) each with problem, architecture diagram, stack, eval method, metrics (latency p50/p95, accuracy/recall, cost per call), demo video/link, what you'd do next; (3) experience timeline; (4) writing/notes; (5) contact.
- For early-career, emphasize process and judgment (NN/g junior finding) — show trade-offs and failure analysis, not just outcomes.
- Writing (blog posts on evals, latency tuning for voice agents) is high-signal per ML practitioner norms and doubles as SEO/discoverability.

### Gaps
- No controlled study comparing interview rates by portfolio structure for engineers.
- No survey data specific to technical founders hiring freelancers; inferred from general hiring sources.

## 3. Design choices that hurt credibility vs. signals of craft/seniority

### Takeaway
Visual design strongly drives credibility judgments (Fogg: "design look" was the most-cited credibility factor), but for engineers poor or gimmicky design is a risk: hiring managers warn that "most developers aren't born designers," broken links and stale content hurt, and cluttered/multi-column layouts reduce scanning effectiveness. Restraint, clarity, speed and maintenance signal craft.

### Cited Findings
- Stanford Web Credibility study (Fogg et al., 2002; 2,400+ participants, 100 sites): "design look" was mentioned in 46.1% of credibility comments — the most frequent factor; next were information structure and information focus — [Stanford PDF](http://credibility.stanford.edu/pdf/How_Do_People_Evaluate_a_Web_Site's_Credibility_v37.pdf) (older study)
- Profy.dev hiring-manager survey: concerns that "most developers aren't born designers" and poor aesthetics can look incompetent; websites need upkeep — broken links and outdated content harm candidacy; static portfolios don't demonstrate real app skills; portfolio building can become "a huge time-sink" — [DEV / Profy](https://dev.to/profydev/this-survey-among-60-hiring-managers-reveals-don-t-waste-your-time-on-a-react-portfolio-website-17ge) (2021)
- Ladders: crowded designs, multiple columns, long paragraphs and missing headers performed worst — [HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/)
- Blind hiring manager: tutorial-derived projects are a negative signal — [Blind](https://www.teamblind.com/post/do-you-look-at-candidates-portfolio-zlbuydfd)
- Red flags for AI portfolios: "ChatGPT wrapper for [industry]" with no usage numbers; zero mention of evals/monitoring suggests never shipped to real users — [hireagentic.dev guide](https://hireagentic.dev/blog/hire-ai-engineer-guide) (via search summary; vendor blog)

### Inferences
- Heavy animation, 3D/WebGL heroes, terminal/game gimmicks and scroll-jacking risk slower load and reduced scannability; keep motion subtle and respect prefers-reduced-motion.
- Seniority signals: specific numbers, explicit trade-offs, architecture diagrams, a dated/maintained feel ("last updated"), working links, consistent typography, no lorem/placeholder content.
- Unclear role is a top risk: the hero must state the target role in words recruiters search for ("AI Engineer", "LLM", "RAG", "Voice AI").

### Gaps
- No empirical study isolating effects of animations or "creative" themes on engineer hiring outcomes; claims are opinion-based.

## 4. What AI/ML hiring managers specifically want to see

### Takeaway
Evidence of shipping to production plus measurement: deployed endpoints/apps, eval methodology (golden sets, LLM-as-judge, regression tests), latency/cost/accuracy numbers, failure analysis, and system thinking beyond the model. Evals are repeatedly cited as the strongest differentiator because few candidates show them.

### Cited Findings
- "Can you ship?" — a deployed endpoint or app beats the best notebook; hiring managers ask for a production link and usage numbers — [hireagentic.dev](https://hireagentic.dev/blog/hire-ai-engineer-guide); [ai-tldr.dev](https://ai-tldr.dev/learn/building-ai-apps/ai-career-path/build-ai-portfolio/) (practitioner/vendor blogs, 2026)
- Strong answer to "how do you know your agent works in production?" covers golden datasets, LLM-as-judge scoring, regression tests, drift monitoring and feedback loops; the eval step "separates a senior-signal portfolio from a junior one. Almost nobody does this" — [hireagentic.dev](https://hireagentic.dev/blog/hire-ai-engineer-guide); [ai-tldr.dev](https://ai-tldr.dev/learn/building-ai-apps/ai-career-path/build-ai-portfolio/)
- Wanted: honest metrics, failure analysis, understanding of data pipelines, retrieval, latency, cost, monitoring — [linkfolio guide](https://linkfolio.cv/blog/ai-ml-engineer-portfolio-guide-2026); [AI Codex FDE projects](https://www.aicodex.to/articles/fde-portfolio-projects)
- Eugene Yan lists understanding of evaluations and model performance monitoring, and data literacy, as core technical signals — [Eugene Yan](https://eugeneyan.com/writing/how-to-interview/)
- Hamel Husain's "Your AI Product Needs Evals" is widely cited as the canonical eval essay, reflecting how central evals are in the AI engineering community — [awesome-agentic-engineering-resources](https://github.com/EthicalML/awesome-agentic-engineering-resources)

### Inferences
- For voice agents: show end-to-end latency budget (STT/LLM/TTS, time-to-first-audio), barge-in handling, concurrency, cost per minute. For RAG: retrieval recall@k / answer faithfulness, chunking/reranking decisions, eval set size. For real-time backend: throughput, p95 latency, failure modes.
- A short (60-90 s) demo video per project is safer than relying only on live demos that may break or incur API costs.

### Gaps
- Most AI-specific sources are 2025-2026 practitioner/vendor blogs, not surveys; no quantitative survey of AI hiring managers on portfolio content was found.

## 5. Dark vs light themes, single-page vs multi-page, AI chatbot on a portfolio

### Takeaway
Light mode has a measurable readability edge for people with normal vision (especially small text), but the effect depends on lighting; NN/g recommends light by default with a dark option. No evidence was found on single- vs multi-page for hiring outcomes. Portfolio chatbots ("ask my resume") get positive reactions and press as novelty, but quality problems are common and no outcome data exists.

### Cited Findings
- NN/g (Feb 2020): for normal-vision users light mode outperformed dark mode, with the advantage growing as font size decreases; recommends light mode for general audiences but allowing users to switch to dark — [NN/g](https://www.nngroup.com/articles/dark-mode/) (older)
- Context-dependence: in dim light (50 lux) dark mode comfort 5.82/7 vs light 4.29; in bright light (500 lux) light 5.64 vs dark 4.29; light mode supported faster reading and lower workload while dark mode felt more comfortable — [Gadget Hacks summary](https://android.gadgethacks.com/news/dark-mode-vs-light-mode-what-research-says-about-when-each-works-best/); [Springer 2025 chapter](https://link.springer.com/chapter/10.1007/978-3-032-30552-7_26) (via search summary; secondary)
- People with dyslexia or astigmatism may struggle with dark mode text — [Gadget Hacks](https://android.gadgethacks.com/news/dark-mode-vs-light-mode-what-research-says-about-when-each-works-best/)
- HN "Show HN" resume chatbot (Feb 2024, FastAPI + ChromaDB + OpenAI): positive UI comments and one AI-startup recruiter said they'd reach out; but the creator admitted real user questions often didn't get satisfactory answers from GPT-3.5 despite hundreds of prompts in 24 h — [Hacker News](https://news.ycombinator.com/item?id=39265393)
- CNBC (Apr 2026) profiled two job seekers who built chatbots on their portfolio sites to talk to recruiters, using LinkedIn/resume/portfolio data with suggested prompts like "Give me a quick summary"; one said it "opened up a lot of opportunities" — [CNBC](https://www.cnbc.com/amp/2026/04/30/these-2-job-seekers-built-ai-chatbots-to-talk-to-recruiters-for-them.html) (full article could not be fetched; details from search snippet)

### Inferences
- For an AI engineer, a chatbot is itself a demo of the claimed skill — it is a credibility asset only if fast, grounded (RAG over resume/projects with citations), guarded against prompt injection/abuse, rate-limited, and optional (never the only way to see content). A bad answer is a visible negative signal.
- Offer a theme toggle respecting prefers-color-scheme; if choosing one default for recruiters reading in offices, light or a well-contrasted dark both acceptable, but check contrast carefully on dark themes.
- Single-page home with skim summary plus dedicated case-study pages (deep links shareable in applications) is a reasonable hybrid; this is inference, not evidence.

### Gaps
- No studies found on dark vs light themes affecting perception of engineer candidates.
- No evidence on single-page vs multi-page portfolio effectiveness.
- No measured hiring outcomes for portfolio chatbots; evidence is anecdotal/press.

## 6. Accessibility and performance as credibility signals

### Takeaway
Speed and accessibility are low-cost, verifiable craft signals: Google data links each extra second of load to sharply higher bounce, Core Web Vitals give concrete targets, and low-contrast text is the most common accessibility failure on the web — so passing these is itself a differentiator.

### Cited Findings
- Google/SOASTA: bounce probability increases 32% as load time goes from 1 s to 3 s, 90% at 5 s, 106% at 6 s — [Think with Google benchmarks](https://business.google.com/ca-en/think/marketing-strategies/mobile-page-speed-new-industry-benchmarks/) (2017, older)
- "Milliseconds Make Millions" report on the business impact of mobile speed — [Think with Google PDF](https://www.thinkwithgoogle.com/_qs/documents/9757/Milliseconds_Make_Millions_report_hQYAbZJ.pdf) (2020)
- Core Web Vitals "good" thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (75th percentile) — [web.dev Web Vitals](https://web.dev/articles/vitals)
- WCAG 2 AA contrast: 4.5:1 for normal text, 3:1 for large text — [W3C Understanding SC 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- WebAIM Million: low-contrast text found on 79.1% of top 1M home pages (2025) and 83.9% (2026), averaging 34 instances per page in 2026 — the most common detected issue — [WebAIM 2026](https://webaim.org/projects/million/); [WebAIM 2025](https://webaim.org/projects/million/2025)
- Fogg: design look and information structure are leading credibility cues — [Stanford PDF](http://credibility.stanford.edu/pdf/How_Do_People_Evaluate_a_Web_Site's_Credibility_v37.pdf)

### Inferences
- Applying globally from India: recruiters may view on varied networks/devices; keep JS light, images optimized, fonts subset, and test on mid-range mobile. A Lighthouse score screenshot or "built for <1 s LCP" note can be a subtle craft signal for performance-minded reviewers.
- Dark, "glassy" AI-aesthetic themes are especially prone to grey-on-black contrast failures; verify 4.5:1.

### Gaps
- No direct evidence that recruiters consciously judge portfolios by Lighthouse/CWV scores; the link is inferred from general bounce and credibility research.
