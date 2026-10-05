# Muqeet — Portfolio

Portfolio for **Syed Abdul Muqeet Mujeeb (AI Engineer)**, built with Next.js
(App Router) in two editions that share one content file and one AI assistant:

- **Professional edition** (default, `/`) — charcoal "premium fabric" design with
  page transitions, a robot assistant, live GitHub activity and a comment form.
- **Medieval edition** (`/classic`) — the original cinematic, castle-themed site.

A switch in each edition's header jumps to the other.

## ✨ Features

**Professional edition**

- **Eight pages** — Home, About, Experience, Projects, GitHub, Skills,
  Certifications, Contact — with a lift-out / rise-in transition, "Next" links
  and ← → arrow-key navigation.
- **Woven fabric background** — a WebGL shader with slow wave folds that ripples
  on every page change.
- **Text fill wave** on headlines and an **image fly-in** field of voice/AI cards
  on the home page.
- **Robot assistant** (bottom-right) — follows the cursor, gives per-page hints
  and opens the Gemini-powered chat.
- **Live GitHub page** — contribution calendar, languages and repo dates,
  refreshed hourly.
- **"Leave a comment" form** on Contact, emailed to you via Resend.

**Medieval edition**

- **Castle-gate intro** — a door-opening video plays once per browser session.
- **5 routed pages** — Home, About, Skills, Projects, Connect — with GSAP
  entrance animations and background parallax.
- **AI Herald chatbot** — the same assistant in medieval dress.

## 🚀 Run it locally

```bash
npm install
npm run dev        # http://localhost:3000  (medieval: /classic)
```

## 🔑 Environment variables

Put these in `.env.local` locally and in **Vercel → Project → Settings →
Environment Variables** for production. Everything works without them, with
the fallbacks noted.

| Variable | Used for | Without it |
|---|---|---|
| `GEMINI_API_KEY` | AI assistant replies. Free key at <https://aistudio.google.com> → **Get API key**. | Demo-mode reply |
| `GEMINI_MODEL` | Optional model override (default `gemini-2.5-flash`). | Default model |
| `GITHUB_TOKEN` | GitHub page. A **classic token with only the `read:user` scope** (<https://github.com/settings/tokens>), so the calendar includes private-repo activity like your own profile does. | Public activity only |
| `RESEND_API_KEY` | Comment form emails. Free key at <https://resend.com>. | Form shows "comments aren't switched on yet" |
| `COMMENT_TO` | Where comments are sent (default: your email in `lib/profile.js`). | Your profile email |
| `COMMENT_FROM` | Sender address (default `Portfolio <onboarding@resend.dev>`, which needs no domain setup). | Resend test sender |

> Keys stay on the **server** (API routes in `app/api/`) and are never exposed
> to visitors. The chat route allows 8 messages per minute per IP; the comment
> route allows 3 per 10 minutes and has a hidden spam trap.

## ✏️ Editing your content

**All text lives in one place:** [`lib/profile.js`](lib/profile.js) — name,
about, experience, projects, skills (`skillDomains` for medieval,
`resumeSkills` for professional), certifications, featured GitHub repos and
contact links. It also feeds what the assistant knows.

To list certifications, add entries to `certifications` as
`{ title, issuer, year, credentialId, url }`.

## 🙏 Credits

- Pixel knight (medieval edition): ["FREE - Knight 2D Pixel Art"](https://xzany.itch.io/free-knight-2d-pixel-art)
  by Mattz Art — free for personal and commercial projects; not to be resold or
  redistributed as a standalone asset (see `public/pixel/knight/LICENSE.txt`).

## 🖼️ Swapping medieval images

Drop replacements in `public/images/` keeping these names:

- `gate.mp4` — intro door video
- `homee.mp4`, `connectt.mp4` — Home / Connect background videos
  (with `home.webp`, `connect.webp` as posters)
- `about.webp`, `skills.webp`, `projects.webp` — section backgrounds
- `ribbon-left.png`, `ribbon-right.png` — About page navigation ribbons

## ☁️ Deploy (Vercel)

1. Push to GitHub and import the repo at <https://vercel.com>.
2. Add the environment variables above.
3. Deploy.

## 🗂️ Structure

```
app/
  (pro)/               professional edition (its own root layout)
    layout.js          fonts, metadata, ProShell, Vercel analytics
    pro.css            professional design system
    page.js            Home; about/ experience/ projects/ github/ skills/
                       certifications/ contact/ — one route per page
  (classic)/           medieval edition (its own root layout)
    layout.js, template.js
    classic/           /classic, /classic/about, /skills, /projects, /connect
  globals.css          medieval design system
  api/chat/route.js    Gemini endpoint (rate limited)
  api/comment/route.js comment form → email via Resend (rate limited)
components/
  pro/                 ProShell (header, nav, transitions), FabricBackground,
                       FlyField, Assistant (robot + chat), FillText,
                       ContributionGraph, ProjectsGrid, ContactPanels, …
  sections/, Navbar.js, Chatbot.js, GateLoader.js, …   medieval edition
lib/
  profile.js           ← your content + assistant knowledge
  github.js            live GitHub contributions and repo stats
  rateLimit.js         shared per-IP rate limiter
  pro/                 page list and animation helpers
```
