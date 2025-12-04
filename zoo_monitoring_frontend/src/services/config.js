//// Environment-aware configuration and feature flags for API services

// PUBLIC_INTERFACE
export const getEnv = () => {
  /** Returns normalized environment configuration for the frontend app. */
  const {
    REACT_APP_API_BASE,
    REACT_APP_BACKEND_URL,
    REACT_APP_FRONTEND_URL,
    REACT_APP_WS_URL,
    REACT_APP_NODE_ENV,
    REACT_APP_NEXT_TELEMETRY_DISABLED,
    REACT_APP_ENABLE_SOURCE_MAPS,
    REACT_APP_PORT,
    REACT_APP_TRUST_PROXY,
    REACT_APP_LOG_LEVEL,
    REACT_APP_HEALTHCHECK_PATH,
    REACT_APP_FEATURE_FLAGS,
    REACT_APP_EXPERIMENTS_ENABLED,
  } = process.env;

  const apiBase =
    (REACT_APP_API_BASE && REACT_APP_API_BASE.trim()) ||
    (REACT_APP_BACKEND_URL && REACT_APP_BACKEND_URL.trim()) ||
    "";

  // Parse feature flags JSON if provided; fallback to empty object.
  let featureFlags = {};
  try {
    featureFlags = REACT_APP_FEATURE_FLAGS
      ? JSON.parse(REACT_APP_FEATURE_FLAGS)
      : {};
  } catch (e) {
    // Keep empty flags if parsing fails
    // eslint-disable-next-line no-console
    console.warn("Invalid REACT_APP_FEATURE_FLAGS JSON. Using empty flags.");
    featureFlags = {};
  }

  // Determine mock mode: feature flag mockApi or explicit "mock" string
  const mockApiEnabled =
    featureFlags.mockApi === true ||
    String(REACT_APP_API_BASE || "").toLowerCase() === "mock";

  const logLevel = (REACT_APP_LOG_LEVEL || "info").toLowerCase();
  const healthcheckPath = REACT_APP_HEALTHCHECK_PATH || "/healthz";

  return {
    apiBase,
    wsUrl: REACT_APP_WS_URL || "",
    frontendUrl: REACT_APP_FRONTEND_URL || "",
    nodeEnv: REACT_APP_NODE_ENV || process.env.NODE_ENV || "development",
    telemetryDisabled:
      REACT_APP_NEXT_TELEMETRY_DISABLED === "1" ||
      REACT_APP_NEXT_TELEMETRY_DISABLED === "true",
    sourceMaps:
      REACT_APP_ENABLE_SOURCE_MAPS === "1" ||
      REACT_APP_ENABLE_SOURCE_MAPS === "true",
    port: REACT_APP_PORT || "3000",
    trustProxy:
      REACT_APP_TRUST_PROXY === "1" || REACT_APP_TRUST_PROXY === "true",
    logLevel,
    healthcheckPath,
    featureFlags,
    experimentsEnabled:
      REACT_APP_EXPERIMENTS_ENABLED === "1" ||
      REACT_APP_EXPERIMENTS_ENABLED === "true",
    mockApiEnabled,
  };
};

// PUBLIC_INTERFACE
export const isMockMode = () => {
  /** Returns true if mock API mode is enabled. */
  return getEnv().mockApiEnabled;
};

// PUBLIC_INTERFACE
export const getLogLevel = () => {
  /** Returns normalized log level string (e.g., "info", "debug"). */
  return getEnv().logLevel;
};

// PUBLIC_INTERFACE
export const getHealthcheckPath = () => {
  /** Returns healthcheck path for the app (default: "/healthz"). */
  return getEnv().healthcheckPath;
};
