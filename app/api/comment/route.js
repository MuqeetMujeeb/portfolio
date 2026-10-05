import { profile } from "@/lib/profile";
import { createRateLimiter, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

// "Leave a comment" form on the Contact page. Comments are emailed to you via
// Resend's REST API (https://resend.com/docs/api-reference/emails/send-email).
// Set RESEND_API_KEY to enable it; optionally COMMENT_TO (defaults to your
// email) and COMMENT_FROM (defaults to Resend's test sender, which needs no
// verified domain).
const rateLimited = createRateLimiter({ windowMs: 10 * 60_000, max: 3 });
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req) {
  if (rateLimited(clientIp(req))) {
    return Response.json(
      { error: "You've sent a few comments already. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let email = "", comment = "", website = "";
  try {
    const body = await req.json();
    email = String(body.email || "").trim().slice(0, 254);
    comment = String(body.comment || "").trim().slice(0, 1000);
    website = String(body.website || ""); // honeypot: real visitors leave it empty
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (website) return Response.json({ ok: true }); // quietly drop bots
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Enter a valid email address so I can reply." }, { status: 400 });
  }
  if (comment.length < 2) {
    return Response.json({ error: "Write a short comment before sending." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: `Comments aren't switched on yet. Please email ${profile.contact.email} instead.` },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.COMMENT_FROM || "Portfolio <onboarding@resend.dev>",
        to: [process.env.COMMENT_TO || profile.contact.email],
        subject: `New portfolio comment from ${email}`,
        text: `From: ${email}\n\n${comment}\n\n— Sent from the comment form on your portfolio.`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      throw new Error("send failed");
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: `Your comment couldn't be sent just now. Please try again, or email ${profile.contact.email}.` },
      { status: 502 }
    );
  }
}
