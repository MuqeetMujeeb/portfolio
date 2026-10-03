import { profile } from "@/lib/profile";
import { getContributions, getRepoStats } from "@/lib/github";
import { Page, PageHead, NextLink } from "@/components/pro/PageParts";
import ContributionGraph from "@/components/pro/ContributionGraph";

export const metadata = { title: "GitHub" };
export const revalidate = 3600; // refresh live GitHub data hourly

const SWATCHES = ["#cdbb93", "#9fb3c8", "#c8c3b4", "#8f9a8a", "#b39a9a", "#6e6f73", "#a7a29a"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthYear = (iso) => { const d = new Date(iso); return `${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`; };

const RepoIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h13" /></svg>
);

export default async function GitHubPage() {
  const { username, bio, featured } = profile.github;
  const year = new Date().getUTCFullYear();
  const [contrib, stats] = await Promise.all([getContributions(username, year), getRepoStats(username)]);
  const langs = stats?.languages || [];
  const color = (name) => SWATCHES[Math.max(0, langs.findIndex((l) => l.name === name)) % SWATCHES.length];
  const profileUrl = `https://github.com/${username}`;

  return (
    <Page id="github">
      <PageHead id="github" title="Open work and experiments" />
      <div className="gh-top">
        <div className="panel stitched gh-profile" data-r style={{ "--i": 3 }}>
          <div className="handle">@{username}</div>
          <p>{bio}</p>
          {stats && (
            <div className="gh-stats">
              <div><b>{stats.publicRepos}</b><span>public repositories</span></div>
              <div><b>{stats.since}</b><span>on GitHub since</span></div>
              {langs[0] && <div><b>{langs[0].name}</b><span>primary language</span></div>}
            </div>
          )}
          <a className="btn ghost" href={profileUrl} target="_blank" rel="noopener noreferrer" style={{ alignSelf: "flex-start" }}>
            View profile
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
          </a>
        </div>
        <div className="panel langs" data-r style={{ "--i": 4 }}>
          {langs.length > 0 && (
            <>
              <div className="eyebrow" style={{ color: "var(--dim)" }}>Languages across original repositories</div>
              <div className="lang-bar" aria-hidden="true">
                {langs.map((l) => <i key={l.name} style={{ flex: l.count, background: color(l.name) }} />)}
              </div>
              <ul className="lang-list">
                {langs.map((l) => <li key={l.name}><i className="sw" style={{ background: color(l.name) }} />{l.name}<span className="n">{l.count}</span></li>)}
              </ul>
            </>
          )}
          {contrib ? (
            <ContributionGraph data={contrib} />
          ) : (
            <p className="lede" style={{ fontSize: 15 }}>
              Activity couldn&apos;t be loaded right now. <a href={profileUrl} target="_blank" rel="noopener noreferrer">See it on GitHub</a>.
            </p>
          )}
        </div>
      </div>
      <div className="repo-grid">
        {featured.map((r, i) => {
          const live = stats?.repos?.[r.name];
          return (
            <a key={r.name} className="panel repo" href={`${profileUrl}/${r.name}`} target="_blank" rel="noopener noreferrer" data-r style={{ "--i": 5 + i }}>
              <span className="name"><RepoIcon /><span>{r.name}</span></span>
              <p>{r.desc}</p>
              {live && (
                <span className="meta">
                  {live.language && <span><i className="sw" style={{ background: color(live.language) }} />{live.language}</span>}
                  <span>Updated {monthYear(live.pushedAt)}</span>
                </span>
              )}
            </a>
          );
        })}
      </div>
      <NextLink id="github" i={9} />
    </Page>
  );
}
