//// Timeline/events service

import { isMockMode } from "./config";
import { httpGet } from "./httpClient";
import { fetchTimeline } from "./mockApi";

// PUBLIC_INTERFACE
export async function getTimeline() {
  /** Fetches timeline events from backend or mock data source. */
  if (isMockMode()) {
    return fetchTimeline();
  }
  return httpGet("/api/timeline");
}
