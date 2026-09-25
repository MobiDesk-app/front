"use client";

import Link from "next/link";
import { useRelay } from "@/lib/relayContext";

export default function DevicesPage() {
  const { devices, connect, forgetSettings } = useRelay();

  return (
    <main className="flex-1 px-6 py-8 max-w-2xl w-full mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Your PCs</h1>
          <p className="text-sm text-[#8a93a3] mt-1">
            {devices.length === 0 ? "Waiting for a PC agent to come online…" : `${devices.length} PC(s) reporting in`}
          </p>
        </div>
        <button onClick={forgetSettings} className="text-xs text-[#6b7280] hover:text-[#b7bec9] whitespace-nowrap pt-1">
          Change backend
        </button>
      </div>

      {devices.length === 0 ? (
        <div className="mt-12 text-center text-sm text-[#6b7280] leading-relaxed">
          No PCs yet. Make sure the agent is running and pointed at the same backend as this page.
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {devices.map((pc) => (
            <li key={pc.id}>
              <Link
                href={`/remote/${pc.id}`}
                onClick={() => connect(pc.id)}
                className="block rounded-2xl bg-[#171b22] border border-[#262b35] p-4 hover:border-[#3a4150] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{pc.name}</span>
                  <span
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      pc.online ? "bg-[#123227] text-[#d7dbe3]" : "bg-[#262b35] text-[#d7dbe3]"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: pc.online ? "#3ee6ab" : "#6b7280" }}
                    />
                    {pc.online ? "Online" : "Offline"}
                  </span>
                </div>
                <p className="text-sm text-[#b7bec9] mt-2">
                  {pc.lanDevices.length} device{pc.lanDevices.length === 1 ? "" : "s"} on its network
                </p>
                <p className="text-xs text-[#6b7280] mt-0.5">
                  Last seen {new Date(pc.lastSeen).toLocaleTimeString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
