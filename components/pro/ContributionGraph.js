"use client";

import { useMemo, useState } from "react";

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// GitHub-style calendar for one year: 53 week columns, Sunday-first rows,
// month labels on the column that holds the 1st, hover for the exact count.
export default function ContributionGraph({ data }) {
  const [tip, setTip] = useState(null);

  const { cells, labels } = useMemo(() => {
    const jan1 = new Date(Date.UTC(data.year, 0, 1));
    const lead = jan1.getUTCDay();
    const out = [], labels = Array(53).fill("");
    for (let k = 0; k < lead; k++) out.push(<i key={`pad${k}`} className="pad" style={{ "--w": 0 }} />);
    data.days.forEach((d, idx) => {
      const day = new Date(`${d.date}T00:00:00Z`);
      const w = Math.floor((idx + lead) / 7);
      if (day.getUTCDate() === 1 && w < 53) labels[w] = MON[day.getUTCMonth()];
      const n = d.count;
      out.push(
        <i
          key={d.date}
          data-l={d.level}
          style={{ "--w": w }}
          data-tip={`${n || "No"} contribution${n === 1 ? "" : "s"} on ${day.getUTCDate()} ${MON[day.getUTCMonth()]}`}
        />
      );
    });
    return { cells: out, labels };
  }, [data]);

  return (
    <div className="contrib">
      <div className="contrib-head">
        <span className="eyebrow live" style={{ color: "var(--dim)" }}><i aria-hidden="true" />GitHub activity</span>
        <span className="total"><b>{data.total}</b>contributions in {data.year}</span>
      </div>
      <div className="contrib-scroll">
        <div className="contrib-cal">
          <span aria-hidden="true" />
          <div className="contrib-months" aria-hidden="true">{labels.map((l, i) => <span key={i}>{l}</span>)}</div>
          <div className="contrib-days" aria-hidden="true"><span /><span>Mon</span><span /><span>Wed</span><span /><span>Fri</span><span /></div>
          <div
            className="contrib-grid"
            role="img"
            aria-label={`GitHub contribution graph: ${data.total} contributions in ${data.year}`}
            onPointerOver={(e) => {
              const c = e.target.closest("i[data-tip]");
              if (!c) return;
              const r = c.getBoundingClientRect();
              setTip({ text: c.dataset.tip, x: r.left + r.width / 2, y: r.top });
            }}
            onPointerLeave={() => setTip(null)}
          >
            {cells}
          </div>
        </div>
      </div>
      <div className="contrib-foot">
        <span>Live from GitHub · refreshed hourly</span>
        <span className="contrib-legend" aria-hidden="true">
          Less <i style={{ background: "rgba(236,235,231,0.06)" }} /><i style={{ background: "rgba(205,187,147,0.32)" }} /><i style={{ background: "rgba(205,187,147,0.55)" }} /><i style={{ background: "rgba(205,187,147,0.8)" }} /><i style={{ background: "#ecdcb4" }} /> More
        </span>
      </div>
      {tip && <div className="contrib-tip" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>}
    </div>
  );
}
