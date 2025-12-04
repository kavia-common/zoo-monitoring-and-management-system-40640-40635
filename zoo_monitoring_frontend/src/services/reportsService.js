//// Reports service

import { isMockMode } from "./config";
import { httpGet } from "./httpClient";
import { fetchReports } from "./mockApi";

// PUBLIC_INTERFACE
export async function getReports() {
  /** Fetches reports metadata from backend or mock data source. */
  if (isMockMode()) {
    return fetchReports();
  }
  return httpGet("/api/reports");
}
