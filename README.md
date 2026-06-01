# Muqeet — Medieval Portfolio 🏰

A cinematic, medieval-themed portfolio for **Syed Abdul Muqeet Mujeeb (AI Engineer)**.
Built with Next.js, GSAP scroll animations, smooth scrolling (Lenis), and an
AI chatbot ("the Herald") powered by Google Gemini.

## ✨ Features

- **Castle-gate intro** — wooden doors swing open to reveal the site.
- **5 scroll-animated sections** — Home, About, Skills, Projects, Connect.
- **Engraved Roman capitals** (Cinzel) on an aged parchment & ink palette.
- **Smooth parallax** backgrounds using your own imagery (`public/images`).
- **AI Herald chatbot** that answers questions about Muqeet, in a professional & warm tone.

## 🚀 Run it locally

```bash
npm install        # already done
npm run dev        # http://localhost:3000
```

## 🤖 Enable the chatbot (free)

The site works in **demo mode** without a key. To unlock full AI conversations:

1. Get a free key at <https://aistudio.google.com> → **Get API key**.
2. Copy `.env.local.example` to `.env.local`.
3. Paste your key:
   ```
   GEMINI_API_KEY=AIza...your_key...
   ```
4. Restart `npm run dev`.

Optional: override the model with `GEMINI_MODEL=gemini-2.0-flash` (default) in `.env.local`.

> The key stays on the **server** (API route at `app/api/chat/route.js`) and is
> never exposed to visitors.

## ✏️ Editing your content

**All text lives in one place:** [`lib/profile.js`](lib/profile.js).
Edit name, tagline, about, skills, projects, achievements, and contact links there —
it updates both the website **and** what the chatbot knows.

## 🖼️ Swapping images

Drop replacements in `public/images/` keeping these names:
`gate.jpg` (intro doors), `home.jpg`, `about.jpg`, `skills.jpg`,
`projects.jpg`, `connect.jpg`.

## ☁️ Deploy (free, recommended: Vercel)

1. Push this folder to a GitHub repo.
2. Import it at <https://vercel.com>.
3. Add the `GEMINI_API_KEY` environment variable in the Vercel project settings.
4. Deploy — done.

## 🗂️ Structure

```
app/
  layout.js          fonts + metadata
  page.js            orchestration: gate, smooth scroll, animations
  globals.css        full design system
  api/chat/route.js  Gemini endpoint
components/
  GateLoader.js      castle-gate intro
  SideNav.js         right-side section dots
  Chatbot.js         the Herald widget
  Icons.js           inline SVG icons + flourish divider
  sections/          Home, About, Skills, Projects, Connect
lib/
  profile.js         ← your content + chatbot knowledge
```
