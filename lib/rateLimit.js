// Best-effort per-IP rate limit, kept in memory. On serverless each warm
// instance has its own map, so this caps abuse rather than enforcing a hard
// global quota — swap for a shared store (e.g. Upstash Redis) if ever needed.
export function createRateLimiter({ windowMs, max }) {
  const hits = new Map(); // ip -> timestamps within the window

  return function rateLimited(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);
    // keep the map from growing unbounded
    if (hits.size > 5000) {
      for (const [k, v] of hits) {
        if (!v.length || now - v[v.length - 1] >= windowMs) hits.delete(k);
      }
    }
    return recent.length > max;
  };
}

export function clientIp(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
