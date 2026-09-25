"use client";

import React, { useState } from "react";
import { useRelay } from "@/lib/relayContext";

/**
 * Gates every page behind a one-time "enter your backend URL + token" form.
 * See connectionSettings.ts for why this lives in localStorage rather than
 * being baked into the build like the agent/mobile-app's env vars are.
 */
export function ConnectionGate({ children }: { children: React.ReactNode }) {
  const { settings, setSettings } = useRelay();
  const [backendUrl, setBackendUrl] = useState("ws://localhost:8080");
  const [authToken, setAuthToken] = useState("");

  if (settings) return <>{children}</>;

  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <form
        className="w-full max-w-sm flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!backendUrl.trim() || !authToken.trim()) return;
          setSettings({ backendUrl: backendUrl.trim(), authToken: authToken.trim() });
        }}
      >
        <div>
          <h1 className="text-2xl font-semibold">Connect to your backend</h1>
          <p className="text-sm text-[#8a93a3] mt-1">
            Stored only in this browser&apos;s local storage — never sent anywhere except your backend.
          </p>
        </div>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-[#b7bec9]">Backend WebSocket URL</span>
          <input
            className="rounded-lg bg-[#171b22] border border-[#262b35] px-3 py-2.5 outline-none focus:border-[#5b8def]"
            placeholder="ws://192.168.1.50:8080"
            value={backendUrl}
            onChange={(event) => setBackendUrl(event.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-[#b7bec9]">Auth token</span>
          <input
            className="rounded-lg bg-[#171b22] border border-[#262b35] px-3 py-2.5 outline-none focus:border-[#5b8def]"
            placeholder="matches the backend's AUTH_TOKEN"
            type="password"
            value={authToken}
            onChange={(event) => setAuthToken(event.target.value)}
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-[#2f6fed] hover:bg-[#4b82f0] transition-colors py-2.5 font-semibold text-sm"
        >
          Connect
        </button>
      </form>
    </div>
  );
}
