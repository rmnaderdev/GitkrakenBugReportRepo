import { useEffect, useState } from "react";
import type { Route } from "./+types/uptime";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Beep boop, go away" },
    { name: "description", content: "Nothing to see here. Totally fine. 🔥" },
  ];
}

const LIES = [
  "All systems nominal. 🟢",
  "Everything is fine. Completely fine. 🟢",
  "No fires detected (in this tab). 🟢",
  "Uptime: Yes. 🟢",
  "Status: We have achieved existence. 🟢",
  "Health check: Doctors said I'm fine. 🟢",
  "Errors: 0 (that we're admitting to). 🟢",
  "Latency: Fast enough that you shouldn't notice. 🟢",
];

const UPTIMES = [
  "69 years, 4 months, 20 days",
  "Since before your parents met",
  "Longer than you've been alive, probably",
  "∞ (we literally cannot go down)",
  "Since the last time we rebooted (yesterday, but shhh)",
];

export default function Uptime() {
  const [tick, setTick] = useState(0);
  const [lie, setLie] = useState(LIES[0]);
  const [uptimeStr] = useState(() => UPTIMES[Math.floor(Math.random() * UPTIMES.length)]);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setElapsed((e) => e + 1);
      setLie(LIES[Math.floor(Math.random() * LIES.length)]);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const pulseColor = tick % 2 === 0 ? "#22c55e" : "#16a34a";

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.statusDot(pulseColor)} title="We call this 'the blinky'" />

        <h1 style={styles.heading}>Nothing to see here, move along!</h1>

        <p style={styles.subheading}>
          This is an uptime endpoint. You found it. Congratulations on your achievement.{" "}
          <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>(There is no prize.)</span>
        </p>

        <img
          src="/thisisfine.gif"
          alt="This is fine dog sitting in burning room"
          style={styles.gif}
        />

        <div style={styles.statsGrid}>
          <Stat label="STATUS" value={lie} />
          <Stat label="UPTIME" value={uptimeStr} />
          <Stat label="INCIDENTS" value="0*" footnote="*that we are legally required to disclose" />
          <Stat label="YOU'VE BEEN STARING AT THIS FOR" value={`${elapsed}s`} />
        </div>

        <p style={styles.footer}>
          🤖 <em>Beep boop.</em> This page serves as proof that our servers are, in fact, turned on.
          If you expected more, we encourage you to{" "}
          <span style={{ textDecoration: "line-through" }}>lower</span> adjust your expectations.
        </p>

        <p style={{ ...styles.footer, marginTop: "0.5rem", opacity: 0.4, fontSize: "0.7rem" }}>
          HTTP 200 — {"{ status: 'ok', vibe: 'immaculate' }"}
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  footnote,
}: {
  label: string;
  value: string;
  footnote?: string;
}) {
  return (
    <div style={styles.stat}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
      {footnote && <div style={styles.statFootnote}>{footnote}</div>}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "2rem",
  } as React.CSSProperties,

  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "1.5rem",
    padding: "3rem 2.5rem",
    maxWidth: "680px",
    width: "100%",
    textAlign: "center" as const,
    backdropFilter: "blur(12px)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  },

  statusDot: (color: string) =>
    ({
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      background: color,
      margin: "0 auto 1.5rem",
      boxShadow: `0 0 12px ${color}`,
      transition: "background 0.5s, box-shadow 0.5s",
    }) as React.CSSProperties,

  heading: {
    color: "#f1f5f9",
    fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
    fontWeight: 700,
    margin: "0 0 0.75rem",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,

  subheading: {
    color: "#94a3b8",
    fontSize: "0.95rem",
    margin: "0 0 2rem",
    lineHeight: 1.6,
  } as React.CSSProperties,

  gif: {
    borderRadius: "1rem",
    maxWidth: "340px",
    width: "100%",
    margin: "0 auto 2rem",
    display: "block",
    border: "2px solid rgba(255,255,255,0.06)",
  } as React.CSSProperties,

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "1rem",
    margin: "0 0 2rem",
    textAlign: "left" as const,
  },

  stat: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "0.75rem",
    padding: "0.85rem 1rem",
  } as React.CSSProperties,

  statLabel: {
    color: "#64748b",
    fontSize: "0.65rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    marginBottom: "0.35rem",
  },

  statValue: {
    color: "#e2e8f0",
    fontSize: "0.85rem",
    fontWeight: 500,
    lineHeight: 1.4,
  },

  statFootnote: {
    color: "#475569",
    fontSize: "0.6rem",
    marginTop: "0.25rem",
    fontStyle: "italic",
  },

  footer: {
    color: "#64748b",
    fontSize: "0.82rem",
    lineHeight: 1.7,
    margin: 0,
  } as React.CSSProperties,
};
