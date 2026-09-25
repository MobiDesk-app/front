// Unlike the mobile app (installed only by the person running it) or the
// Electron agent (runs on the user's own PC), a website's URL can end up in
// anyone's browser. Baking AUTH_TOKEN into the build via NEXT_PUBLIC_* the
// way the agent/mobile-app do would ship the shared secret to every visitor.
// Instead, the backend URL and token are entered once at runtime and kept
// only in this browser's localStorage — never in the served JS bundle.
const STORAGE_KEY = "home-relay-connection-settings";

export interface ConnectionSettings {
  backendUrl: string;
  authToken: string;
}

export function loadConnectionSettings(): ConnectionSettings | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConnectionSettings>;
    if (typeof parsed.backendUrl !== "string" || typeof parsed.authToken !== "string") return null;
    return { backendUrl: parsed.backendUrl, authToken: parsed.authToken };
  } catch {
    return null;
  }
}

export function saveConnectionSettings(settings: ConnectionSettings): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function clearConnectionSettings(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
