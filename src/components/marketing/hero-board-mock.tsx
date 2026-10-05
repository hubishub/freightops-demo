import { AlertTriangle } from "lucide-react";

/** Static demo rows only — not wired to the ops store. */
const COLUMNS = [
  {
    id: "planned",
    title: "Planned",
    count: 2,
    cards: [
      {
        ref: "FO-2401",
        lane: "CHI → ATL",
        shipper: "Midwest Dry Goods",
        priority: "normal" as const,
        detention: false,
      },
      {
        ref: "FO-2407",
        lane: "DAL → PHX",
        shipper: "Sunbelt Pack",
        priority: "high" as const,
        detention: false,
      },
    ],
  },
  {
    id: "transit",
    title: "In transit",
    count: 2,
    cards: [
      {
        ref: "FO-2398",
        lane: "LAX → DEN",
        shipper: "Pacific Van Lines",
        priority: "hot" as const,
        detention: true,
      },
      {
        ref: "FO-2403",
        lane: "IND → CLT",
        shipper: "Heartland Freight",
        priority: "normal" as const,
        detention: false,
      },
    ],
  },
  {
    id: "exception",
    title: "Exception",
    count: 1,
    cards: [
      {
        ref: "FO-2388",
        lane: "MEM → MIA",
        shipper: "Gulf Coast Co-op",
        priority: "high" as const,
        detention: true,
      },
    ],
  },
] as const;

const priorityClass: Record<"hot" | "high" | "normal", string> = {
  hot: "bg-rose-100 text-rose-900 border-rose-400 dark:bg-rose-600/30 dark:text-rose-200 dark:border-rose-500/50",
  high: "bg-orange-100 text-orange-900 border-orange-400 dark:bg-orange-500/20 dark:text-orange-200 dark:border-orange-500/40",
  normal:
    "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-500/40",
};

const priorityLabel = { hot: "HOT", high: "HIGH", normal: "NORMAL" } as const;

/**
 * Decorative mini load-board for the marketing hero.
 * Uses theme surface/fg tokens so the mock reads in light and dark.
 * No store binding — sample labels only.
 */
export function HeroBoardMock() {
  return (
    <aside
      className="relative w-full max-w-md shrink-0 lg:max-w-none"
      aria-label="Sample load board preview. Demo data only."
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-2xl shadow-black/40 ring-1 ring-white/10">
        <div className="flex items-center justify-between gap-2 border-b border-border bg-surface-sunken/80 px-3 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-sky-500" aria-hidden />
            <span className="truncate text-xs font-semibold text-fg">
              Load board
            </span>
            <span className="rounded border border-amber-500/40 bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-900 dark:bg-amber-500/15 dark:text-amber-200">
              Demo
            </span>
          </div>
          <span className="shrink-0 text-[10px] text-fg-subtle">5 sample loads</span>
        </div>

        <div className="grid grid-cols-3 gap-2 p-2.5 sm:gap-2.5 sm:p-3">
          {COLUMNS.map((col) => (
            <div
              key={col.id}
              className="min-w-0 rounded-xl border border-border/80 bg-surface p-1.5 sm:p-2"
            >
              <div className="mb-1.5 flex items-center justify-between gap-1 px-0.5">
                <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-fg-muted sm:text-[11px]">
                  {col.title}
                </span>
                <span className="rounded-md bg-surface-sunken px-1.5 py-0.5 text-[10px] tabular-nums text-fg-subtle">
                  {col.count}
                </span>
              </div>
              <ul className="space-y-1.5">
                {col.cards.map((card) => (
                  <li
                    key={card.ref}
                    className="rounded-lg border border-border bg-surface-raised p-1.5 shadow-sm sm:p-2"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-mono text-[10px] font-semibold text-fg sm:text-[11px]">
                        {card.ref}
                      </span>
                      <span
                        className={`inline-flex shrink-0 items-center rounded border px-1 py-px text-[9px] font-bold uppercase tracking-wide sm:text-[10px] ${priorityClass[card.priority]}`}
                      >
                        {priorityLabel[card.priority]}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] font-medium text-fg sm:text-[11px]">
                      {card.lane}
                    </p>
                    <p className="truncate text-[9px] text-fg-muted sm:text-[10px]">
                      {card.shipper}
                    </p>
                    {card.detention ? (
                      <p className="mt-1 inline-flex items-center gap-0.5 text-[9px] font-medium text-rose-800 dark:text-rose-300 sm:text-[10px]">
                        <AlertTriangle className="h-2.5 w-2.5 shrink-0" aria-hidden />
                        Detention
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="border-t border-border px-3 py-1.5 text-center text-[10px] text-fg-subtle">
          UI mock · not live TMS data
        </p>
      </div>
    </aside>
  );
}
