"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, AlertTriangle, MapPin, Clock } from "lucide-react";
import { useOpsStore } from "@/store/ops-store";
import { PriorityBadge, StatusBadge } from "@/components/ui/badges";
import { CHECK_CALL_LABELS, BOARD_COLUMNS, LOAD_STATUS_LABELS, type LoadStatus } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";

export default function LoadDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const loads = useOpsStore((s) => s.loads);
  const drivers = useOpsStore((s) => s.drivers);
  const updateLoadStatus = useOpsStore((s) => s.updateLoadStatus);
  const load = loads.find((l) => l.id === id);

  if (!load) {
    return (
      <div className="space-y-4">
        <Link
          href="/app/board"
          className="inline-flex items-center gap-1 text-sm text-sky-700 dark:text-sky-400 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to board
        </Link>
        <EmptyState
          title="Load not found"
          description={`No demo load with id “${id}”. It may have been reset — try the board.`}
        />
      </div>
    );
  }

  const driver = drivers.find((d) => d.id === load.driverId);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/app/board"
        className="inline-flex items-center gap-1 text-sm text-sky-700 dark:text-sky-400 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to board
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-fg">{load.ref}</h1>
            <StatusBadge status={load.status} />
            <PriorityBadge priority={load.priority} />
            {load.detentionFlag && (
              <span className="inline-flex items-center gap-1 rounded-md border border-amber-600/40 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                <AlertTriangle className="h-3 w-3" /> Detention
                {load.detentionMinutes ? ` ${load.detentionMinutes}m` : ""}
              </span>
            )}
          </div>
          <p className="mt-1 text-fg-muted">{load.shipper}</p>
          {load.broker && (
            <p className="text-xs text-fg-subtle">Broker: {load.broker}</p>
          )}
        </div>
        <label className="text-xs text-fg-muted">
          Update status
          <select
            value={load.status}
            onChange={(e) =>
              updateLoadStatus(load.id, e.target.value as LoadStatus)
            }
            className="mt-1 block rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg"
          >
            {BOARD_COLUMNS.map((s) => (
              <option key={s} value={s}>
                {LOAD_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Lane",
            value: `${load.originCity}, ${load.originState} → ${load.destCity}, ${load.destState}`,
          },
          { label: "Miles / Rate", value: `${load.miles} mi · ${formatCurrency(load.rate)}` },
          { label: "Equipment", value: load.equipment.replace("_", " ") },
          { label: "Weight / Commodity", value: `${load.weight.toLocaleString()} lbs · ${load.commodity}` },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-border bg-surface-raised p-4"
          >
            <div className="text-[11px] uppercase tracking-wide text-fg-subtle">
              {c.label}
            </div>
            <div className="mt-1 text-sm text-fg">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-surface-raised p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-fg-muted">
            <MapPin className="h-4 w-4 text-sky-700 dark:text-sky-400" /> Stops
          </h2>
          <ol className="space-y-4">
            {load.stops.map((stop) => (
              <li
                key={stop.id}
                className="relative border-l-2 border-border pl-4"
              >
                <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-sky-500" />
                <div className="text-xs uppercase text-fg-subtle">
                  #{stop.sequence} {stop.type}
                </div>
                <div className="font-medium text-fg">{stop.facility}</div>
                <div className="text-sm text-fg-muted">
                  {stop.city}, {stop.state}
                </div>
                <div className="mt-1 text-xs text-fg-subtle">
                  Appt {formatDate(stop.appointmentStart)} –{" "}
                  {formatDate(stop.appointmentEnd)}
                </div>
                <div className="mt-1 text-xs capitalize text-sky-800 dark:text-sky-300">
                  {stop.status}
                </div>
                {stop.notes && (
                  <p className="mt-1 text-xs text-amber-800 dark:text-amber-200/80">{stop.notes}</p>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-xl border border-border bg-surface-raised p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-fg-muted">
            Assignment
          </h2>
          {driver ? (
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-fg-subtle">Driver:</span>{" "}
                <Link href="/app/drivers" className="text-sky-800 dark:text-sky-300 hover:underline">
                  {driver.name}
                </Link>
              </p>
              <p>
                <span className="text-fg-subtle">Tractor:</span> {load.tractor}
              </p>
              <p>
                <span className="text-fg-subtle">Phone:</span> {driver.phone}
              </p>
              <p>
                <span className="text-fg-subtle">HOS remaining:</span>{" "}
                {driver.hosRemaining}h
              </p>
              <p>
                <span className="text-fg-subtle">Location:</span>{" "}
                {driver.currentCity}, {driver.currentState}
              </p>
            </div>
          ) : (
            <p className="text-sm text-fg-muted">Unassigned — needs cover.</p>
          )}
          {load.notes && (
            <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-100/90">
              {load.notes}
            </div>
          )}
          <p className="mt-4 text-[11px] text-fg-subtle">
            Updated {formatDate(load.updatedAt)} · Demo record
          </p>
        </section>
      </div>

      <section className="rounded-xl border border-border bg-surface-raised p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-fg-muted">
            <Clock className="h-4 w-4 text-sky-700 dark:text-sky-400" /> Check-call timeline
          </h2>
          <Link
            href="/app/check-calls"
            className="text-xs text-sky-700 dark:text-sky-400 hover:underline"
          >
            Log a call →
          </Link>
        </div>
        {load.checkCalls.length === 0 ? (
          <p className="text-sm text-fg-subtle">
            No check-calls yet. Use Check-Calls to log one into this load.
          </p>
        ) : (
          <ul className="space-y-3">
            {[...load.checkCalls]
              .sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime()
              )
              .map((cc) => (
                <li
                  key={cc.id}
                  className="flex gap-3 rounded-lg border border-border bg-surface-sunken p-3"
                >
                  <div className="w-36 shrink-0 text-xs text-fg-subtle">
                    {formatDate(cc.timestamp)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-sky-800 dark:text-sky-300">
                      {CHECK_CALL_LABELS[cc.type]}
                    </div>
                    <p className="text-sm text-fg-muted">{cc.notes}</p>
                    {cc.location && (
                      <p className="text-xs text-fg-subtle">{cc.location}</p>
                    )}
                    <p className="text-[11px] text-fg-subtle">
                      by {cc.createdBy}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
