//// Healthcheck service and dev logging helpers

import { getEnv, getLogLevel } from "./config";
import { httpGet } from "./httpClient";

/**
 * INTERNAL: Basic logger honoring REACT_APP_LOG_LEVEL.
 */
function log(level, ...args) {
  const levels = ["error", "warn", "info", "debug"];
  const current = getLogLevel();
  if (levels.indexOf(level) <= levels.indexOf(current)) {
    // eslint-disable-next-line no-console
    console[level === "debug" ? "log" : level]("[Healthcheck]", ...args);
  }
}

// PUBLIC_INTERFACE
export async function getHealth() {
  /** Performs a healthcheck request to the configured path and returns normalized status */
  const { apiBase, healthcheckPath } = getEnv();
  const path = healthcheckPath || "/health";
  const url = path.startsWith("http") ? path : `${apiBase}${path}`;
  try {
    const data = await httpGet(url);
    // Normalize: allow either {status:'ok'} or any payload; if ok, mark healthy
    const statusText = (data && (data.status || data.state || data.ok)) ?? null;
    const healthy =
      statusText === "ok" ||
      statusText === "healthy" ||
      statusText === true ||
      (data && data.uptime !== undefined);
    return { ok: Boolean(healthy), data };
  } catch (e) {
    log("warn", "Healthcheck failed", e?.message || e);
    return { ok: false, error: e?.message || String(e) };
  }
}

// PUBLIC_INTERFACE
export function createHealthPoller({ intervalMs = 10000, onUpdate } = {}) {
  /**
   * Creates a simple poller that calls getHealth() on a fixed interval.
   * Returns a stop() function to cancel polling.
   */
  let stopped = false;
  let timer = null;

  async function tick() {
    if (stopped) return;
    const res = await getHealth();
    try {
      onUpdate && onUpdate(res);
    } catch {
      // ignore consumer errors
    }
    if (!stopped) {
      timer = setTimeout(tick, intervalMs);
    }
  }

  timer = setTimeout(tick, 0);
  return {
    // PUBLIC_INTERFACE
    stop() {
      /** Stops the health poller interval. */
      stopped = true;
      if (timer) clearTimeout(timer);
    },
  };
}
