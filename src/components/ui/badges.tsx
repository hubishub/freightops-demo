import type { DriverStatus, LoadStatus, Priority } from "@/lib/types";
import {
  DRIVER_STATUS_LABELS,
  LOAD_STATUS_LABELS,
  PRIORITY_LABELS,
} from "@/lib/types";
import { cn } from "@/lib/utils";

/** Dual-theme badge colors — light uses opaque tints + dark text for AA (FO-005). */
const statusColors: Record<LoadStatus, string> = {
  planned:
    "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-500/40",
  dispatched:
    "bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/40",
  at_shipper:
    "bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-500/20 dark:text-violet-300 dark:border-violet-500/40",
  in_transit:
    "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/40",
  at_consignee:
    "bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/40",
  delivered:
    "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40",
  exception:
    "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40",
};

const priorityColors: Record<Priority, string> = {
  hot: "bg-rose-100 text-rose-900 border-rose-400 dark:bg-rose-600/30 dark:text-rose-200 dark:border-rose-500/50 motion-safe:animate-pulse",
  high: "bg-orange-100 text-orange-900 border-orange-400 dark:bg-orange-500/20 dark:text-orange-200 dark:border-orange-500/40",
  normal:
    "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-500/40",
  low: "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-600/20 dark:text-slate-400 dark:border-slate-600/40",
};

const driverColors: Record<DriverStatus, string> = {
  available:
    "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40",
  assigned:
    "bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/40",
  driving:
    "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/40",
  off_duty:
    "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-500/20 dark:text-slate-400 dark:border-slate-500/40",
  hometime:
    "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-200 dark:border-amber-500/40",
};

export function StatusBadge({ status }: { status: LoadStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        statusColors[status]
      )}
    >
      {LOAD_STATUS_LABELS[status]}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide",
        priorityColors[priority]
      )}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}

export function DriverStatusBadge({ status }: { status: DriverStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        driverColors[status]
      )}
    >
      {DRIVER_STATUS_LABELS[status]}
    </span>
  );
}
