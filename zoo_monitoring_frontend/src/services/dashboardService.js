//// Dashboard stats service

import { isMockMode } from "./config";
import { httpGet } from "./httpClient";
import { fetchDashboardStats } from "./mockApi";

// PUBLIC_INTERFACE
export async function getDashboardStats() {
  /** Fetches dashboard statistics from backend or mock data source. */
  if (isMockMode()) {
    return fetchDashboardStats();
  }
  return httpGet("/api/dashboard/stats");
}
