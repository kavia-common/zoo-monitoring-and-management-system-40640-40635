import React from "react";
import { createHealthPoller } from "../services/healthcheckService";
import { getEnv, getLogLevel } from "../services/config";

/**
 * PUBLIC_INTERFACE
 * HealthcheckStatus renders a small pill indicating backend connectivity.
 * - Polls GET to REACT_APP_HEALTHCHECK_PATH (default '/health') via httpClient.
 * - Honors REACT_APP_LOG_LEVEL for debug logging via console.
 */
export default function HealthcheckStatus({ intervalMs = 15000 }) {
  const [state, setState] = React.useState({ ok: null, ts: null, info: null });
  const logLevel = getLogLevel();
  const { healthcheckPath } = getEnv();

  React.useEffect(() => {
    const poller = createHealthPoller({
      intervalMs,
      onUpdate: (res) => {
        if (logLevel === "debug") {
          // eslint-disable-next-line no-console
          console.log("[HealthcheckStatus] update", res);
        }
        setState({
          ok: res.ok,
          ts: Date.now(),
          info: res.data || res.error || null,
        });
      },
    });
    return () => poller.stop();
  }, [intervalMs, logLevel]);

  let bg = "rgba(30,58,138,.12)";
  let text = "#1E3A8A";
  let label = "Checking…";
  if (state.ok === true) {
    bg = "rgba(5,150,105,.15)";
    text = "#065f46";
    label = "Connected";
  } else if (state.ok === false) {
    bg = "rgba(220,38,38,.15)";
    text = "#991b1b";
    label = "Disconnected";
  }

  const title = `Health path: ${healthcheckPath || "/health"}${
    state.ts ? ` • ${new Date(state.ts).toLocaleTimeString()}` : ""
  }`;

  return (
    <span
      className="badge"
      title={title}
      aria-live="polite"
      style={{
        background: bg,
        color: text,
        border: "1px solid rgba(17,24,39,0.08)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: state.ok === true ? "#059669" : state.ok === false ? "#DC2626" : "#1E3A8A",
          boxShadow: "0 0 0 2px rgba(255,255,255,.6)",
        }}
      />
      <span>{label}</span>
    </span>
  );
}
