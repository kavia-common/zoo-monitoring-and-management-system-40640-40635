//// Chat service

import { isMockMode } from "./config";
import { httpPost } from "./httpClient";
import { sendChatMessage } from "./mockApi";

// PUBLIC_INTERFACE
export async function sendMessage(text) {
  /** Sends a chat message to backend or returns a mock reply. */
  if (isMockMode()) {
    return sendChatMessage(text);
  }
  return httpPost("/api/chat", { message: text });
}
