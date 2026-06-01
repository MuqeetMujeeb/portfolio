import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemPrompt, profile } from "@/lib/profile";

export const runtime = "nodejs";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

export async function POST(req) {
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
        `(Demo mode — no AI key set yet.) I'm ${profile.shortName}'s herald. ` +
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
