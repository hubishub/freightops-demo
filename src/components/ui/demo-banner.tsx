import { AlertTriangle } from "lucide-react";

/** Demo banner — FO-006: amber text AA on both themes */
export function DemoBanner() {
  return (
    <div className="flex items-center gap-2 border-b border-amber-600/30 bg-amber-50 px-4 py-2 text-xs text-amber-900 sm:text-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
      <span>
        <strong className="font-semibold">Demo data</strong> — not connected to
        live dispatch systems, Google Sheets, or production TMS. All loads,
        drivers, and check-calls are sample/fictional.
      </span>
    </div>
  );
}
