import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import dayjs from "dayjs";

/**
 * UI State schema
 * - dateRange: { preset: '24h'|'7d'|'30d'|'custom', from?: string, to?: string }
 * - breadcrumbs: array of { label, to } items (optional override; by default computed from route)
 * - user: { id?: string, name?: string, email?: string } | null
 * - theme: 'light' | 'dark'
 * - lastView: pathname of the last visited route (string)
 */

const STORAGE_KEY = "vizai-ui-state";

const initialDateRange = () => {
  // default to 7d window
  return { preset: "7d", from: dayjs().subtract(7, "day").format("YYYY-MM-DD"), to: dayjs().format("YYYY-MM-DD") };
};

const initialState = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        dateRange: parsed.dateRange || initialDateRange(),
        breadcrumbs: Array.isArray(parsed.breadcrumbs) ? parsed.breadcrumbs : [],
        user: parsed.user || null,
        theme: parsed.theme || "light",
        lastView: parsed.lastView || "/dashboard",
      };
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("[uiState] Failed to parse localStorage. Using defaults.");
  }
  return {
    dateRange: initialDateRange(),
    breadcrumbs: [],
    user: null,
    theme: "light",
    lastView: "/dashboard",
  };
})();

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATE_RANGE":
      return { ...state, dateRange: action.payload };
    case "SET_BREADCRUMBS":
      return { ...state, breadcrumbs: Array.isArray(action.payload) ? action.payload : [] };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload === "dark" ? "dark" : "light" };
    case "SET_LAST_VIEW":
      return { ...state, lastView: action.payload || state.lastView };
    default:
      return state;
  }
}

const UIStateContext = createContext(undefined);

// PUBLIC_INTERFACE
export function UIStateProvider({ children }) {
  /** Provider for global UI state, persisting to localStorage. */
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("[uiState] Failed to persist to localStorage.");
    }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  // Apply theme at document level for future expansion
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = state.theme;
    }
  }, [state.theme]);

  return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>;
}

// PUBLIC_INTERFACE
export function useUIState() {
  /** Returns the UI state context (state, dispatch). */
  const ctx = useContext(UIStateContext);
  if (!ctx) {
    throw new Error("useUIState must be used within UIStateProvider");
  }
  return ctx;
}

// PUBLIC_INTERFACE
export function useDateRange() {
  /** Shorthand hook to get and set date range */
  const { state, dispatch } = useUIState();
  const setDateRange = (dateRange) => dispatch({ type: "SET_DATE_RANGE", payload: dateRange });
  return [state.dateRange, setDateRange];
}

// PUBLIC_INTERFACE
export function useBreadcrumbs() {
  /** Shorthand hook to get/set breadcrumbs array */
  const { state, dispatch } = useUIState();
  const setBreadcrumbs = (items) => dispatch({ type: "SET_BREADCRUMBS", payload: items });
  return [state.breadcrumbs, setBreadcrumbs];
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Shorthand hook to get/set theme */
  const { state, dispatch } = useUIState();
  const setTheme = (theme) => dispatch({ type: "SET_THEME", payload: theme });
  return [state.theme, setTheme];
}

// PUBLIC_INTERFACE
export function useLastView() {
  /** Shorthand hook to get/set last visited route */
  const { state, dispatch } = useUIState();
  const setLastView = (path) => dispatch({ type: "SET_LAST_VIEW", payload: path });
  return [state.lastView, setLastView];
}

// PUBLIC_INTERFACE
export function getDateRangeFromPreset(preset, customFrom, customTo) {
  /** Utility: compute a date range object from preset|custom. */
  if (preset === "custom") {
    return {
      preset,
      from: customFrom || dayjs().subtract(7, "day").format("YYYY-MM-DD"),
      to: customTo || dayjs().format("YYYY-MM-DD"),
    };
  }
  let from;
  if (preset === "24h") from = dayjs().subtract(24, "hour");
  else if (preset === "30d") from = dayjs().subtract(30, "day");
  else from = dayjs().subtract(7, "day"); // default 7d
  return { preset, from: from.format("YYYY-MM-DD"), to: dayjs().format("YYYY-MM-DD") };
}
