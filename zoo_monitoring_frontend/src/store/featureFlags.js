/**
 * Lightweight feature flags reader for the frontend.
 * Parses:
 *  - REACT_APP_FEATURE_FLAGS: JSON string like {"mockApi": true, "newNav": false}
 *  - REACT_APP_EXPERIMENTS_ENABLED: "1" | "true" enables experiments bundle-wide
 */

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  /** Returns a plain object of feature flags parsed from env. */
  const { REACT_APP_FEATURE_FLAGS, REACT_APP_EXPERIMENTS_ENABLED } = process.env || {};
  let flags = {};
  try {
    flags = REACT_APP_FEATURE_FLAGS ? JSON.parse(REACT_APP_FEATURE_FLAGS) : {};
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("Invalid REACT_APP_FEATURE_FLAGS JSON. Using empty flags.");
    flags = {};
  }
  const experimentsEnabled =
    REACT_APP_EXPERIMENTS_ENABLED === "1" || REACT_APP_EXPERIMENTS_ENABLED === "true";
  return { ...flags, experimentsEnabled };
}

// PUBLIC_INTERFACE
export function isExperimentEnabled(name) {
  /** Returns true if experiments are globally enabled and the named flag is true, else false. */
  const flags = getFeatureFlags();
  if (!flags.experimentsEnabled) return false;
  return Boolean(flags[name]);
}
