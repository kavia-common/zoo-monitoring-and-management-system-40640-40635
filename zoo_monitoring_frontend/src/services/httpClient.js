//// Lightweight HTTP client with base URL and simple logging

import { getEnv, getLogLevel, isMockMode } from "./config";

// Basic logger honoring REACT_APP_LOG_LEVEL
function log(level, ...args) {
  const levels = ["error", "warn", "info", "debug"];
  const current = getLogLevel();
  if (levels.indexOf(level) <= levels.indexOf(current)) {
    // eslint-disable-next-line no-console
    console[level === "debug" ? "log" : level](...args);
  }
}

// PUBLIC_INTERFACE
export async function httpGet(path, options = {}) {
  /** Performs a GET request to backend or mock, based on configuration. */
  const { apiBase } = getEnv();
  if (isMockMode()) {
    log("debug", "[HTTP][MOCK][GET]", path);
    throw new Error(
      "httpGet should not be called in mock mode directly. Use service modules which call mockApi."
    );
  }
  const url = path.startsWith("http") ? path : `${apiBase}${path}`;
  log("info", "[HTTP][GET]", url);
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    log("error", "[HTTP][GET][ERR]", url, res.status, text);
    throw new Error(`GET ${url} failed: ${res.status} ${text}`);
  }
  const data = await res.json().catch(() => ({}));
  log("debug", "[HTTP][GET][OK]", url, data);
  return data;
}

// PUBLIC_INTERFACE
export async function httpPost(path, body, options = {}) {
  /** Performs a POST request to backend or mock, based on configuration. */
  const { apiBase } = getEnv();
  if (isMockMode()) {
    log("debug", "[HTTP][MOCK][POST]", path, body);
    throw new Error(
      "httpPost should not be called in mock mode directly. Use service modules which call mockApi."
    );
  }
  const url = path.startsWith("http") ? path : `${apiBase}${path}`;
  log("info", "[HTTP][POST]", url);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    body: JSON.stringify(body || {}),
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    log("error", "[HTTP][POST][ERR]", url, res.status, text);
    throw new Error(`POST ${url} failed: ${res.status} ${text}`);
  }
  const data = await res.json().catch(() => ({}));
  log("debug", "[HTTP][POST][OK]", url, data);
  return data;
}
