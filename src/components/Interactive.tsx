"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, ArrowUpRight, Code2, Database, BrainCircuit, Globe } from "lucide-react";
import { buildContributionWeeks, type GitHubActivityPayload } from "../lib/github-activity";

const nodes = [
  { label: "Frontend", detail: "Interfaces people enjoy using", icon: Globe, angle: -90 },
  { label: "AI / ML", detail: "Intelligent features and LLM integrations", icon: BrainCircuit, angle: -18 },
  { label: "Backend", detail: "APIs, application logic and services", icon: Code2, angle: 54 },
  { label: "Data", detail: "Structured storage and persistence", icon: Database, angle: 126 },
  { label: "Product", detail: "Useful outcomes, not tech for tech's sake", icon: ArrowUpRight, angle: 198 },
];

export function TechOrbit() {
  const [active, setActive] = useState(0);
  const selected = nodes[active];
  return (
    <div className="orbit-panel">
      <div className="orbit-copy">
        <div className="orbit-kicker">HOW I CONNECT THE DOTS</div>
        <h3>One product.<br /><span>Many moving parts.</span></h3>
        <p>Explore the layers I think about when building a software product.</p>
        <div className="orbit-detail">
          <selected.icon size={19} />
          <div><strong>{selected.label}</strong><span>{selected.detail}</span></div>
        </div>
        <div className="orbit-tabs">
          {nodes.map((node, i) => (
            <button key={node.label} onClick={() => setActive(i)} className={active === i ? "active" : ""}>
              {node.label}
            </button>
          ))}
        </div>
      </div>
      <div className="orbit-visual" aria-label="Interactive technology layers">
        <div className="orbit-ring ring-one" />
        <div className="orbit-ring ring-two" />
        <div className="orbit-core"><span>IDEA</span><strong>→</strong><span>IMPACT</span></div>
        {nodes.map((node, i) => {
          const angle = (node.angle * Math.PI) / 180;
          const x = 50 + Math.cos(angle) * 34;
          const y = 50 + Math.sin(angle) * 34;
          const Icon = node.icon;
          return (
            <button
              key={node.label}
              className={`orbit-node ${active === i ? "active" : ""}`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setActive(i)}
              aria-label={`Explore ${node.label}`}
            >
              <Icon size={18} /><span>{node.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function readCachedActivity(): GitHubActivityPayload | null {
  try {
    const raw = window.localStorage.getItem("github-activity-v1");
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
    const payload = value as Partial<GitHubActivityPayload>;
    if (payload.username !== "piyushaggarwal1322009-bit" || typeof payload.profileUrl !== "string" || typeof payload.fetchedAt !== "string" || !Array.isArray(payload.days)) return null;
    if (!payload.stats || typeof payload.stats.publicRepos !== "number" || typeof payload.stats.stars !== "number") return null;
    if (payload.days.some((day) => !day || typeof day.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isInteger(day.count) || day.count < 0 || !Number.isInteger(day.level) || day.level < 0 || day.level > 4)) return null;
    if (typeof payload.contributionDataAvailable !== "boolean" || (payload.totalContributions !== null && typeof payload.totalContributions !== "number")) return null;
    return { ...payload as GitHubActivityPayload, stale: true };
  } catch {
    return null;
  }
}

export function GitHubActivity() {
  const [data, setData] = useState<GitHubActivityPayload | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const cached = readCachedActivity();
    fetch("/api/github-activity", { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("GitHub request failed"); return response.json() as Promise<GitHubActivityPayload>; })
      .then((payload) => {
        const result = !payload.contributionDataAvailable && cached?.contributionDataAvailable
          ? { ...payload, days: cached.days, totalContributions: cached.totalContributions, fetchedAt: cached.fetchedAt, contributionDataAvailable: true, stale: true }
          : payload;
        setData(result);
        setError(!result.contributionDataAvailable);
        try { window.localStorage.setItem("github-activity-v1", JSON.stringify(result)); } catch { /* Browser storage may be disabled. */ }
      })
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name === "AbortError") return;
        if (cached) setData(cached);
        setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [retry]);

  const weeks = useMemo(() => buildContributionWeeks(data?.days ?? []), [data?.days]);
  const months = useMemo(() => weeks.flatMap((week, weekIndex) => {
    const firstOfMonth = week.find((day) => day && new Date(`${day.date}T00:00:00Z`).getUTCDate() === 1);
    const firstVisible = weekIndex === 0 ? week.find((day) => day !== null) : null;
    const day = firstOfMonth ?? firstVisible;
    if (!day) return [];
    const date = new Date(`${day.date}T00:00:00Z`);
    return [{ label: date.toLocaleDateString("en", { month: "short", timeZone: "UTC" }), weekIndex }];
  }), [weeks]);
  const synced = data?.fetchedAt ? new Date(data.fetchedAt).toLocaleString() : "";

  return <div className="github-dashboard">
    <div className="github-panel">
      <div className="github-panel-head">
        <div><Github size={19} /><div><strong>GitHub activity</strong><span>Public profile overview</span></div></div>
        <a href={data?.profileUrl ?? "https://github.com/piyushaggarwal1322009-bit"} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={15} /></a>
      </div>
      <div className="calendar-summary"><strong>{data?.totalContributions?.toLocaleString() ?? "—"}</strong><span>public contributions in the last 365 days</span></div>
      {loading && !data ? <div className="calendar-loading" aria-label="Loading GitHub activity"><span/><span/><span/><span/><span/><span/><span/></div> : data?.contributionDataAvailable ? <>
        <div className="calendar-overflow">
          <div className="calendar-months" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}>{months.map((month) => <span key={`${month.label}-${month.weekIndex}`} style={{ gridColumn: `${month.weekIndex + 1} / span 2` }}>{month.label}</span>)}</div>
          <div className="calendar-layout"><div className="calendar-weekdays"><span>Mon</span><span>Wed</span><span>Fri</span></div><div className="contribution-weeks" role="grid" aria-label="Daily GitHub contributions for the last 365 days">{weeks.map((week, weekIndex) => <div className="contribution-week" role="row" key={weekIndex}>{week.map((day, dayIndex) => day ? <button type="button" role="gridcell" key={day.date} className={`level-${day.level}`} title={`${day.count} contributions on ${day.date}`} aria-label={`${day.count} contributions on ${day.date}`} /> : <span key={`blank-${weekIndex}-${dayIndex}`} className="calendar-empty" aria-hidden="true" />)}</div>)}</div></div>
        </div>
        <div className="activity-foot"><span>Less <i className="level-0"/><i className="level-1"/><i className="level-2"/><i className="level-3"/><i className="level-4"/> More</span><small>{data.stale || error ? `Showing saved data · last updated ${synced}` : `Updated ${synced}`}</small></div>
      </> : <div className="calendar-state"><p>{error ? "Live contribution data is unavailable." : "Contribution data could not be loaded."}</p><button type="button" onClick={() => { setLoading(true); setRetry((value) => value + 1); }}>Retry</button><a href="https://github.com/piyushaggarwal1322009-bit" target="_blank" rel="noreferrer">Open GitHub profile <ArrowUpRight size={14} /></a></div>}
      <div className="github-stats-grid">
        <div className="github-stat"><strong>{data?.stats.publicRepos ?? "—"}</strong><span>Public repositories</span></div>
        <div className="github-stat"><strong>{data?.stats.stars ?? "—"}</strong><span>Stars on public repositories</span></div>
        <div className="github-stat language-stat"><strong>{data?.stats.topLanguage ?? "—"}</strong><span>Most common language in public repositories</span></div>
      </div>
    </div>
  </div>;
}
