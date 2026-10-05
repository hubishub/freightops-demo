"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useOpsStore } from "@/store/ops-store";
import { DriverStatusBadge } from "@/components/ui/badges";
import { EmptyState } from "@/components/ui/empty-state";
import {
  DRIVER_STATUS_LABELS,
  type DriverStatus,
} from "@/lib/types";

export default function DriversPage() {
  const drivers = useOpsStore((s) => s.drivers);
  const loads = useOpsStore((s) => s.loads);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<DriverStatus | "all">("all");
  const [hosMin, setHosMin] = useState(0);

  const filtered = useMemo(() => {
    return drivers.filter((d) => {
      if (status !== "all" && d.status !== status) return false;
      if (d.hosRemaining < hosMin) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${d.name} ${d.tractor} ${d.homeBase} ${d.currentCity || ""} ${d.endorsements.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [drivers, query, status, hosMin]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-fg">Drivers &amp; Tractors</h1>
        <p className="text-sm text-fg-muted">
          Demo roster · {filtered.length} of {drivers.length} shown · Sample data
          only
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface-raised p-3">
        <div className="relative min-w-[200px] flex-1">
          <label htmlFor="drivers-search" className="sr-only">
            Search drivers
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden />
          <input
            id="drivers-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, tractor, base, endorsements…"
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-sky-500"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-fg-muted">
          <span className="sr-only sm:not-sr-only sm:inline">Status</span>
          <select
            id="drivers-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as DriverStatus | "all")}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg"
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            {(Object.keys(DRIVER_STATUS_LABELS) as DriverStatus[]).map((s) => (
              <option key={s} value={s}>
                {DRIVER_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-fg-muted">
          Min HOS
          <input
            type="range"
            min={0}
            max={11}
            step={0.5}
            value={hosMin}
            onChange={(e) => setHosMin(Number(e.target.value))}
            className="w-24"
          />
          <span className="w-10 text-xs text-fg-muted">{hosMin}h</span>
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No drivers match"
          description="Relax status or HOS filters to see the demo roster."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-raised text-xs uppercase text-fg-subtle">
              <tr>
                <th className="px-4 py-3">Driver</th>
                <th className="px-4 py-3">Tractor</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">HOS</th>
                <th className="px-4 py-3">Endorsements</th>
                <th className="px-4 py-3">Current load</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => {
                const load = loads.find((l) => l.id === d.loadId);
                return (
                  <tr
                    key={d.id}
                    className="border-b border-border hover:bg-surface-raised"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-fg">{d.name}</div>
                      <div className="text-xs text-fg-subtle">
                        {d.homeBase} · CDL {d.cdlClass}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-sky-800 dark:text-sky-300">
                      {d.tractor}
                    </td>
                    <td className="px-4 py-3">
                      <DriverStatusBadge status={d.status} />
                    </td>
                    <td className="px-4 py-3 text-fg-muted">
                      {d.currentCity
                        ? `${d.currentCity}, ${d.currentState}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          d.hosRemaining < 5
                            ? "text-amber-700 dark:text-amber-300"
                            : "text-fg-muted"
                        }
                      >
                        {d.hosRemaining}h
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-fg-muted">
                      {d.endorsements.length
                        ? d.endorsements.join(", ")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {load ? (
                        <Link
                          href={`/app/loads/${load.id}`}
                          className="text-sky-700 dark:text-sky-400 hover:underline"
                        >
                          {load.ref}
                        </Link>
                      ) : (
                        <span className="text-fg-subtle">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
