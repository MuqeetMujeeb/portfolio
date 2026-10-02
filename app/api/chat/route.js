import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemPrompt, profile } from "@/lib/profile";

export const runtime = "nodejs";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

// Best-effort per-IP rate limit, kept in memory. On serverless each warm
// instance has its own map, so this caps abuse rather than enforcing a hard
// global quota — swap for a shared store (e.g. Upstash Redis) if ever needed.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map(); // ip -> timestamps within the window

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // keep the map from growing unbounded
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.length || now - v[v.length - 1] >= WINDOW_MS) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      {
        error:
          "Too many messages at once — please wait a minute and try again, or email " +
          profile.contact.email +
          ".",
      },
      { status: 429 }
    );
  }

  let history = [];
  try {
    const body = await req.json();
    history = Array.isArray(body.history) ? body.history : [];
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!history.length) {
    return Response.json({ error: "No message provided." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Graceful fallback so the site still works before a key is configured.
  if (!apiKey || apiKey === "your_key_here") {
    return Response.json({
      reply:
        `(Demo mode — no AI key set yet.) I'm ${profile.shortName}'s assistant. ` +
        `Muqeet is an AI Engineer in ${profile.location} working on LLMs, RAG ` +
        `pipelines and voice agents. Add a free GEMINI_API_KEY in .env.local to ` +
        `unlock full conversations. Reach him at ${profile.contact.email}.`,
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: buildSystemPrompt(),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 400,
      },
    });

    // Map our roles to Gemini's; keep only the most recent turns.
    const contents = history.slice(-12).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: String(m.text || "").slice(0, 2000) }],
    }));

    const result = await model.generateContent({ contents });
    const reply = result.response.text().trim();

    return Response.json({
      reply: reply || "I'm not certain how to answer that — try rephrasing?",
    });
  } catch (err) {
    console.error("Gemini error:", err?.message || err);
    return Response.json(
      {
        error:
          "My connection to the archives faltered. Please try again, or email " +
          profile.contact.email +
          ".",
      },
      { status: 200 }
    );
  }
}
