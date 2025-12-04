//// Animals data service

import { isMockMode } from "./config";
import { httpGet } from "./httpClient";
import { fetchAnimals } from "./mockApi";

// PUBLIC_INTERFACE
export async function getAnimals() {
  /** Fetches animals from backend or mock data source. */
  if (isMockMode()) {
    return fetchAnimals();
  }
  return httpGet("/api/animals");
}
