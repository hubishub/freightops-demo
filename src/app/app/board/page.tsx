"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, Plus, Search, RotateCcw } from "lucide-react";
import { useOpsStore } from "@/store/ops-store";
import {
  BOARD_COLUMNS,
  LOAD_STATUS_LABELS,
  type LoadStatus,
  type Priority,
} from "@/lib/types";
import { PriorityBadge } from "@/components/ui/badges";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency } from "@/lib/utils";

export default function BoardPage() {
  const loads = useOpsStore((s) => s.loads);
  const hydrated = useOpsStore((s) => s.hydrated);
  const updateLoadStatus = useOpsStore((s) => s.updateLoadStatus);
  const addLoad = useOpsStore((s) => s.addLoad);
  const resetDemo = useOpsStore((s) => s.resetDemo);

  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState<Priority | "all">("all");
  const [detentionOnly, setDetentionOnly] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    return loads.filter((l) => {
      if (priority !== "all" && l.priority !== priority) return false;
      if (detentionOnly && !l.detentionFlag) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${l.ref} ${l.shipper} ${l.originCity} ${l.destCity} ${l.tractor || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [loads, query, priority, detentionOnly]);

  const byStatus = useMemo(() => {
    const map: Record<LoadStatus, typeof filtered> = {
      planned: [],
      dispatched: [],
      at_shipper: [],
      in_transit: [],
      at_consignee: [],
      delivered: [],
      exception: [],
    };
    for (const l of filtered) map[l.status].push(l);
    return map;
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-fg">Load Board</h1>
          <p className="text-sm text-fg-muted">
            Multi-column board · {filtered.length} of {loads.length} loads shown
            {!hydrated && " · hydrating…"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => resetDemo()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-fg-muted hover:bg-surface-sunken"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset demo
          </button>
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 dark:bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-600 dark:hover:bg-sky-500"
          >
            <Plus className="h-3.5 w-3.5" /> Add load
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface-raised p-3">
        <div className="relative min-w-[200px] flex-1">
          <label htmlFor="board-search" className="sr-only">
            Search loads
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden />
          <input
            id="board-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ref, shipper, city, tractor…"
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-sky-500"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-fg-muted">
          <span className="sr-only sm:not-sr-only sm:inline">Priority</span>
          <select
            id="board-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority | "all")}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg"
            aria-label="Filter by priority"
          >
            <option value="all">All priorities</option>
            <option value="hot">HOT</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-fg-muted">
          <input
            type="checkbox"
            checked={detentionOnly}
            onChange={(e) => setDetentionOnly(e.target.checked)}
            className="rounded border-border-strong"
          />
          Detention only
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No loads match filters"
          description="Clear search or priority / detention filters to see demo loads again."
        />
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {BOARD_COLUMNS.map((col) => (
            <div
              key={col}
              className="flex w-64 shrink-0 flex-col rounded-xl border border-border bg-surface-raised"
            >
              <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
                  {LOAD_STATUS_LABELS[col]}
                </span>
                <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[10px] text-fg-muted">
                  {byStatus[col].length}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-2">
                {byStatus[col].map((load) => (
                  <div
                    key={load.id}
                    className="rounded-lg border border-border bg-surface-overlay p-3 shadow-sm transition hover:border-sky-500/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/app/loads/${load.id}`}
                        className="text-sm font-semibold text-sky-800 dark:text-sky-300 hover:underline"
                      >
                        {load.ref}
                      </Link>
                      <PriorityBadge priority={load.priority} />
                    </div>
                    <p className="mt-1 text-xs text-fg-muted">{load.shipper}</p>
                    <p className="mt-2 text-xs text-fg">
                      {load.originCity}, {load.originState} → {load.destCity},{" "}
                      {load.destState}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-fg-muted">
                      <span>{load.miles} mi</span>
                      <span>·</span>
                      <span>{formatCurrency(load.rate)}</span>
                      {load.tractor && (
                        <>
                          <span>·</span>
                          <span>{load.tractor}</span>
                        </>
                      )}
                    </div>
                    {load.detentionFlag && (
                      <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                        <AlertTriangle className="h-3 w-3" />
                        Detention
                        {load.detentionMinutes
                          ? ` · ${load.detentionMinutes}m`
                          : ""}
                      </div>
                    )}
                    <div className="mt-2">
                      <select
                        value={load.status}
                        onChange={(e) =>
                          updateLoadStatus(load.id, e.target.value as LoadStatus)
                        }
                        className="w-full rounded border border-border bg-surface-raised px-2 py-1 text-[11px]"
                        aria-label={`Change status for ${load.ref}`}
                      >
                        {BOARD_COLUMNS.map((s) => (
                          <option key={s} value={s}>
                            Move → {LOAD_STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <AddLoadModal
          onClose={() => setShowAdd(false)}
          onSave={(data) => {
            addLoad(data);
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}

function AddLoadModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: {
    shipper: string;
    originCity: string;
    originState: string;
    destCity: string;
    destState: string;
    miles: number;
    rate: number;
    priority: Priority;
    commodity: string;
  }) => void;
}) {
  const [form, setForm] = useState({
    shipper: "Demo Shipper Co.",
    originCity: "Dallas",
    originState: "TX",
    destCity: "Austin",
    destState: "TX",
    miles: "200",
    rate: "650",
    priority: "normal" as Priority,
    commodity: "General freight (demo)",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-border bg-surface-raised p-5 shadow-2xl">
        <h2 className="text-lg font-semibold">Add demo load</h2>
        <p className="mt-1 text-xs text-fg-muted">
          Creates a Planned load in the local mock store only.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["shipper", "Shipper"],
              ["originCity", "Origin city"],
              ["originState", "Origin state"],
              ["destCity", "Dest city"],
              ["destState", "Dest state"],
              ["miles", "Miles"],
              ["rate", "Rate (USD)"],
              ["commodity", "Commodity"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-xs text-fg-muted">
              {label}
              <input
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </label>
          ))}
          <label className="block text-xs text-fg-muted">
            Priority
            <select
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value as Priority })
              }
            >
              <option value="hot">HOT</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-fg-muted hover:bg-surface-sunken"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() =>
              onSave({
                ...form,
                miles: Number(form.miles) || 0,
                rate: Number(form.rate) || 0,
              })
            }
            className="rounded-lg bg-sky-700 dark:bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 dark:hover:bg-sky-500"
          >
            Create load
          </button>
        </div>
      </div>
    </div>
  );
}
