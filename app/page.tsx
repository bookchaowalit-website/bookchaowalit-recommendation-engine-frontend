"use client";

import { useMemo, useState, type CSSProperties } from "react";

type Item = {
  id: string;
  title: string;
  tags: string[];
};

const ITEMS: Item[] = [
  { id: "1", title: "Local-first notes", tags: ["productivity", "local", "writing"] },
  { id: "2", title: "Kanban for freelancers", tags: ["productivity", "work"] },
  { id: "3", title: "Synth playlist", tags: ["music", "focus"] },
  { id: "4", title: "SEO checklist", tags: ["seo", "web"] },
  { id: "5", title: "Habit streaks", tags: ["health", "productivity"] },
];

const ALL_TAGS = Array.from(new Set(ITEMS.flatMap((item) => item.tags)));

export default function Home() {
  const [liked, setLiked] = useState<string[]>(["productivity"]);
  const ranked = useMemo(
    () =>
      ITEMS.map((item) => ({
        ...item,
        score: item.tags.filter((tag) => liked.includes(tag)).length,
      })).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)),
    [liked],
  );

  return (
    <main className="glyph-shell">
      <div className="glyph-frame">
        <header className="glyph-masthead">
          <div className="glyph-brand">
            <span className="glyph-led" aria-hidden="true" />
            <span>GLYPH / RANK</span>
          </div>
          <div className="glyph-status">
            <span>LOCAL SIGNAL LAB</span>
            <span className="glyph-status-dot">NO MODEL</span>
          </div>
        </header>

        <section className="glyph-intro">
          <div className="glyph-rule-label">
            <span>TAG-OVERLAP RECOMMENDER</span>
            <span>BUILD 01</span>
          </div>
          <h1>
            Find the next
            <br />
            <em>signal.</em>
          </h1>
          <p className="glyph-lede">
            Choose a few interests. The field reorders five authored records by the
            tags they share with you.
          </p>
          <div className="glyph-readout">
            <span className="readout-label">ACTIVE VECTOR</span>
            <strong>{liked.length.toString().padStart(2, "0")}</strong>
            <span>interest tags selected</span>
          </div>
        </section>

        <section className="glyph-controls" aria-labelledby="input-vector-title">
          <div className="glyph-section-head">
            <div>
              <span className="glyph-section-index">A</span>
              <h2 id="input-vector-title">Input vector</h2>
            </div>
            <span className="glyph-section-meta">{liked.length} / {ALL_TAGS.length} active</span>
          </div>
          <div className="glyph-tag-grid">
            {ALL_TAGS.map((tag) => {
              const active = liked.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={"glyph-tag " + (active ? "is-active" : "")}
                  aria-pressed={active}
                  onClick={() =>
                    setLiked((current) =>
                      active ? current.filter((value) => value !== tag) : [...current, tag],
                    )
                  }
                >
                  <span className="glyph-tag-mark" aria-hidden="true">{active ? "1" : "0"}</span>
                  <span>{tag}</span>
                  <span className="glyph-tag-state">{active ? "ON" : "OFF"}</span>
                </button>
              );
            })}
          </div>
          <p className="glyph-help">
            Toggle a tag to change the signal. A record earns one point for every
            active tag it shares.
          </p>
        </section>

        <section className="glyph-ranking" aria-labelledby="ranking-field-title">
          <div className="glyph-section-head">
            <div>
              <span className="glyph-section-index">B</span>
              <h2 id="ranking-field-title">Ranking field</h2>
            </div>
            <span className="glyph-section-meta">5 authored records / local sample</span>
          </div>
          <div className="glyph-field-labels" aria-hidden="true">
            <span>POSITION</span>
            <span>RECORD / TAG TRACE</span>
            <span>MATCH DENSITY</span>
          </div>
          <ol className="glyph-records">
            {ranked.map((item, index) => (
              <li key={item.id} className={"glyph-record " + (index === 0 ? "is-leading" : "")}>
                <span className="glyph-position">{String(index + 1).padStart(2, "0")}</span>
                <div className="glyph-record-copy">
                  <h3>{item.title}</h3>
                  <p>{item.tags.join("  /  ")}</p>
                </div>
                <div className="glyph-density" aria-label={item.score + " matching tags"}>
                  <div className="glyph-density-track">
                    <span
                      className="glyph-density-fill"
                      style={{ "--fill": (item.score * 20) + "%" } as CSSProperties}
                    />
                  </div>
                  <span className="glyph-score">{item.score} / {item.tags.length}</span>
                </div>
              </li>
            ))}
          </ol>
          <p className="glyph-honesty">
            This is a transparent tag-overlap demo, not a trained recommendation
            model. The sample records and scores stay in this browser.
          </p>
        </section>

        <footer className="glyph-footer">
          <span>BOOK / DEV TOOLS</span>
          <span>TOGGLE · TRACE · REORDER</span>
        </footer>
      </div>
    </main>
  );
}
