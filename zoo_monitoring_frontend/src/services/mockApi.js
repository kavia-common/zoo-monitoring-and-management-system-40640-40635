//// Mock API module returning fake data with small delays

import dayjs from "dayjs";

// Utility to simulate network latency
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// PUBLIC_INTERFACE
export async function fetchDashboardStats() {
  /** Returns mock dashboard stats list */
  await wait(350);
  return [
    { label: "Activity score", value: "82", trend: "+4%" },
    { label: "Feeding events", value: "12", trend: "-1" },
    { label: "Sensor uptime", value: "99.3%", trend: "+0.1%" },
  ];
}

// PUBLIC_INTERFACE
export async function fetchAnimals() {
  /** Returns mock animals list */
  await wait(500);
  return [
    { id: 1, name: "Giant Anteater", status: "Monitored", enclosure: "Savannah 2" },
    { id: 2, name: "African Elephant", status: "Stable", enclosure: "Savannah 1" },
    { id: 3, name: "Snow Leopard", status: "Observation", enclosure: "Mountain 3" },
  ];
}

// PUBLIC_INTERFACE
export async function fetchTimeline() {
  /** Returns mock timeline/events list */
  await wait(450);
  return Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    ts: dayjs().subtract(i * 3, "hour").format("YYYY-MM-DD HH:mm"),
    text: i % 2 === 0 ? "Feeding event" : "Movement spike",
  }));
}

// PUBLIC_INTERFACE
export async function fetchReports() {
  /** Returns mock reports list */
  await wait(420);
  return [
    { id: 1, title: "Weekly Health Summary", date: dayjs().subtract(2, "day").format("YYYY-MM-DD") },
    { id: 2, title: "Behavior Analysis", date: dayjs().subtract(8, "day").format("YYYY-MM-DD") },
  ];
}

// PUBLIC_INTERFACE
export async function sendChatMessage(input) {
  /** Returns mock chat response for a given message string */
  await wait(300);
  const canned =
    "This is a placeholder response. Giant Anteater status is nominal with high activity in the last 24h.";
  return { role: "assistant", text: canned, echo: String(input || "") };
}
