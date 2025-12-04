import React from "react";
import { getEnv, getLogLevel } from "../services/config";
import { getHealth } from "../services/healthcheckService";
import { useLastView } from "../store/uiState";

/**
 * PUBLIC_INTERFACE
 * EnvDebug displays runtime environment details and a manual healthcheck.
 * Only renders any UI when NODE_ENV is development (for safety).
 */
export default function EnvDebug({ onClose }) {
  const [lastView] = useLastView();
  const [health, setHealth] = React.useState({ ok: null, info: null });
  const env = getEnv();
  const logLevel = getLogLevel();
  const isDev =
    (env?.nodeEnv || process.env.NODE_ENV || "development") === "development";

  React.useEffect(() => {
    if (!isDev) return;
    let cancelled = false;
    getHealth().then((res) => {
      if (!cancelled) setHealth({ ok: res.ok, info: res.data || res.error });
    });
    return () => {
      cancelled = true;
    };
  }, [isDev]);

  if (!isDev) return null;

  const pretty = (value) => {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  };

  const healthColor =
    health.ok === true ? "#065f46" : health.ok === false ? "#991b1b" : "#374151";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Environment Debug"
      className="card"
      style={{
        position: "fixed",
        right: 16,
        top: 72,
        width: 420,
        maxWidth: "calc(100% - 32px)",
        maxHeight: "70vh",
        overflow: "auto",
        zIndex: 1200,
        boxShadow: "var(--shadow-lg)",
        border: "1px solid rgba(17,24,39,0.12)",
      }}
    >
      <div className="row" style={{ justifyContent: "space-between" }}>
        <strong>Env Debug</strong>
        <button className="btn ghost" onClick={onClose} aria-label="Close debug">
          Close
        </button>
      </div>
      <div className="mt-16" style={{ fontSize: 12, color: "#6b7280" }}>
        NODE_ENV: <strong>{env.nodeEnv || process.env.NODE_ENV}</strong>
        <br />
        Log level: <strong>{logLevel}</strong>
        <br />
        API base: <strong>{env.apiBase || "(empty)"}</strong>
        <br />
        Health path: <strong>{env.healthcheckPath}</strong>
        <br />
        Mock API: <strong>{String(env.mockApiEnabled)}</strong>
        <br />
        Experiments: <strong>{String(env.experimentsEnabled)}</strong>
        <br />
        Last view: <strong>{lastView}</strong>
      </div>

      <div className="mt-16">
        <div style={{ color: "#374151", fontWeight: 600 }}>Feature flags</div>
        <pre
          style={{
            background: "#f3f4f6",
            padding: 10,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{pretty(env.featureFlags)}
        </pre>
      </div>

      <div className="mt-16">
        <div style={{ color: "#374151", fontWeight: 600 }}>Healthcheck (on open)</div>
        <div className="row" style={{ color: healthColor }}>
          <span aria-hidden="true">
            {health.ok === true ? "✅" : health.ok === false ? "⛔" : "ℹ️"}
          </span>
          <span>
            {health.ok === true
              ? "Healthy"
              : health.ok === false
              ? "Unhealthy"
              : "Unknown"}
          </span>
        </div>
        <pre
          style={{
            background: "#f3f4f6",
            padding: 10,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{pretty(health.info)}
        </pre>
      </div>
    </div>
  );
}
