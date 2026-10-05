"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useOpsStore } from "@/store/ops-store";
import {
  CHECK_CALL_LABELS,
  type CheckCallType,
} from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

const CALL_TYPES = Object.keys(CHECK_CALL_LABELS) as CheckCallType[];

export default function CheckCallsPage() {
  const loads = useOpsStore((s) => s.loads);
  const drivers = useOpsStore((s) => s.drivers);
  const addCheckCall = useOpsStore((s) => s.addCheckCall);

  const [loadId, setLoadId] = useState(loads[0]?.id || "");
  const [driverId, setDriverId] = useState("");
  const [type, setType] = useState<CheckCallType>("check_in");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const allCalls = useMemo(() => {
    return loads
      .flatMap((l) =>
        l.checkCalls.map((cc) => ({
          ...cc,
          loadRef: l.ref,
        }))
      )
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  }, [loads]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!loadId || !notes.trim()) return;
    addCheckCall({
      loadId,
      driverId: driverId || undefined,
      type,
      location: location || undefined,
      notes: notes.trim(),
    });
    setNotes("");
    setLocation("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-fg">Check-Calls</h1>
        <p className="text-sm text-fg-muted">
          Log writes into the in-browser Zustand + localStorage mock store —
          demo only.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <form
          onSubmit={onSubmit}
          className="space-y-3 rounded-xl border border-border bg-surface-raised p-5 lg:col-span-2"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">
            Log a call
          </h2>
          <label className="block text-xs text-fg-muted">
            Load
            <select
              required
              value={loadId}
              onChange={(e) => setLoadId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            >
              {loads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.ref} — {l.originCity}→{l.destCity}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-fg-muted">
            Driver (optional)
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            >
              <option value="">—</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.tractor})
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-fg-muted">
            Call type
            <select
              value={type}
              onChange={(e) => setType(e.target.value as CheckCallType)}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            >
              {CALL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {CHECK_CALL_LABELS[t]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-fg-muted">
            Location
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, ST"
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs text-fg-muted">
            Notes
            <textarea
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="What did the driver report?"
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-sky-700 dark:bg-sky-600 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 dark:hover:bg-sky-500"
          >
            Save check-call
          </button>
        </form>

        <div className="lg:col-span-3">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-fg-muted">
            Recent log ({allCalls.length})
          </h2>
          {allCalls.length === 0 ? (
            <EmptyState
              title="No check-calls yet"
              description="Use the form to add a demo call to any load."
            />
          ) : (
            <ul className="max-h-[70vh] space-y-2 overflow-y-auto">
              {allCalls.map((cc) => (
                <li
                  key={cc.id}
                  className="rounded-lg border border-border bg-surface-overlay p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link
                      href={`/app/loads/${cc.loadId}`}
                      className="text-sm font-semibold text-sky-800 dark:text-sky-300 hover:underline"
                    >
                      {cc.loadRef}
                    </Link>
                    <span className="text-xs text-fg-subtle">
                      {formatDate(cc.timestamp)}
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase text-violet-700 dark:text-violet-300">
                    {CHECK_CALL_LABELS[cc.type]}
                  </div>
                  <p className="mt-1 text-sm text-fg-muted">{cc.notes}</p>
                  {cc.location && (
                    <p className="text-xs text-fg-subtle">{cc.location}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
