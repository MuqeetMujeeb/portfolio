// Live GitHub data for the professional edition's GitHub page, cached for an
// hour (ISR). With GITHUB_TOKEN set (a classic token with only the read:user
// scope) the contribution calendar includes private-repo activity, matching
// what you see on your own profile; without it, public activity only.
const REVALIDATE = 3600;
const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// -> { year, total, days: [{ date, count, level }] } or null
export async function getContributions(username, year) {
  try {
    if (process.env.GITHUB_TOKEN) {
      const query = `query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) { contributionsCollection(from: $from, to: $to) {
          contributionCalendar { totalContributions
            weeks { contributionDays { date contributionCount contributionLevel } } } } } }`;
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: { login: username, from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` },
        }),
        next: { revalidate: REVALIDATE },
      });
      const json = await res.json();
      const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
      if (!cal) throw new Error(JSON.stringify(json?.errors || "no calendar"));
      return {
        year,
        total: cal.totalContributions,
        days: cal.weeks.flatMap((w) =>
          w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVELS[d.contributionLevel] ?? 0 }))
        ),
      };
    }
    // No token: public contributions via github-contributions-api (MIT, no key needed).
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const json = await res.json();
    return { year, total: json.total?.[year] ?? 0, days: json.contributions || [] };
  } catch (err) {
    console.error("GitHub contributions:", err?.message || err);
    return null;
  }
}

// -> { publicRepos, since, languages: [{ name, count }], repos: { [name]: { language, pushedAt, url } } } or null
export async function getRepoStats(username) {
  try {
    const opts = { headers: { ...authHeaders(), Accept: "application/vnd.github+json" }, next: { revalidate: REVALIDATE } };
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, opts),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=pushed`, opts),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error(`status ${userRes.status}/${reposRes.status}`);
    const user = await userRes.json();
    const repos = (await reposRes.json()).filter((r) => !r.fork && !r.private);
    const counts = {};
    repos.forEach((r) => { const l = r.language || "Other"; counts[l] = (counts[l] || 0) + 1; });
    return {
      publicRepos: user.public_repos,
      since: new Date(user.created_at).getUTCFullYear(),
      languages: Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
      repos: Object.fromEntries(repos.map((r) => [r.name, { language: r.language, pushedAt: r.pushed_at, url: r.html_url }])),
    };
  } catch (err) {
    console.error("GitHub repos:", err?.message || err);
    return null;
  }
}
