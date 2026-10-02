# Muqeet — Medieval Portfolio 🏰

A cinematic, medieval-themed portfolio for **Syed Abdul Muqeet Mujeeb (AI Engineer)**.
Built with Next.js (App Router), GSAP animations, and an
AI chatbot ("the Herald") powered by Google Gemini.

## ✨ Features

- **Castle-gate intro** — a door-opening video plays once per browser session.
- **5 routed pages** — Home, About, Skills, Projects, Connect — each with GSAP
  entrance animations and background parallax.
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
2. Create a `.env.local` file in the project root.
3. Add your key:
   ```
   GEMINI_API_KEY=AIza...your_key...
   ```
4. Restart `npm run dev`.

Optional: override the model with `GEMINI_MODEL=...` in `.env.local` (default: `gemini-2.5-flash`).

> The key stays on the **server** (API route at `app/api/chat/route.js`) and is
> never exposed to visitors. The route has a light per-IP rate limit
> (8 messages/minute) to curb abuse.

## ✏️ Editing your content

**All text lives in one place:** [`lib/profile.js`](lib/profile.js).
Edit name, tagline, about, skills, projects, achievements, and contact links there —
it updates both the website **and** what the chatbot knows.

## 🖼️ Swapping images

Drop replacements in `public/images/` keeping these names:

- `gate.mp4` — intro door video
- `homee.mp4`, `connectt.mp4` — Home / Connect background videos
  (with `home.webp`, `connect.webp` as posters)
- `about.webp`, `skills.webp`, `projects.webp` — section backgrounds
- `ribbon-left.png`, `ribbon-right.png` — About page navigation ribbons

## ☁️ Deploy (free, recommended: Vercel)

1. Push this folder to a GitHub repo.
2. Import it at <https://vercel.com>.
3. Add the `GEMINI_API_KEY` environment variable in the Vercel project settings.
4. Deploy — done.

## 🗂️ Structure

```
app/
  layout.js          fonts, metadata, shared chrome, Vercel analytics
  template.js        per-route fade-in
  page.js            home route + once-per-session castle gate
  about/ skills/ projects/ connect/   one route per section
  globals.css        full design system
  api/chat/route.js  Gemini endpoint (rate limited)
components/
  SiteChrome.js      navbar + chatbot shared across routes
  Navbar.js          top nav + mobile menu
  PageFx.js          GSAP reveal + background parallax
  GateLoader.js      castle-gate intro video
  Chatbot.js         the Herald widget
  Modal.js           shared popup (skills, projects, about, resume)
  HomeSocials.js     hero social links + resume viewer
  RotatingTitle.js   cycling role title on the hero
  Icons.js           inline SVG icons + flourish divider
  sections/          Home, About, Skills, Projects, Connect
lib/
  profile.js         ← your content + chatbot knowledge
```
