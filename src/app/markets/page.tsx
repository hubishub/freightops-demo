import Link from "next/link";
import { Building2, Globe2, ArrowRight } from "lucide-react";
import { MarketingShell } from "@/components/layout/marketing-shell";

export default function MarketsPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
          Dual market positioning
        </p>
        <h1 className="mt-2 text-3xl font-bold text-fg md:text-4xl">
          One builder. Two hiring contexts.
        </h1>
        <p className="mt-4 text-lg text-fg-muted leading-relaxed">
          FreightOps Command Center is deliberately bilingual in audience: it
          speaks to US/EU dry-van fleet operators who need domain-credible ops
          tooling, and to India employers hiring for G&amp;A, back-office, or
          tech-ops roles that support global logistics. Same person, same
          portfolio artifact — different buyer questions answered on one site.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-sky-500/30 bg-sky-50 p-6 dark:bg-sky-950/20">
            <Globe2 className="mb-3 h-8 w-8 text-sky-700 dark:text-sky-400" />
            <h2 className="text-xl font-semibold text-fg">
              US &amp; EU — dry-van fleet ops
            </h2>
            <p className="mt-3 text-sm text-fg-muted leading-relaxed">
              Buyers here ask: <em>Do you understand our board chaos?</em>{" "}
              Detention, appointments, broker cover, HOS friction, exception
              triage — this demo’s information architecture is the answer.
              Reviewers can click into a hot detention load, read the timeline,
              and see that the product vocabulary matches the floor.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              <li>• Dry-van focused (equipment typed, commodity labeled)</li>
              <li>• Dispatcher mental model documented in /docs</li>
              <li>• Working board filters + status updates (mock store)</li>
              <li>• Analytics framed as ops KPIs, not vanity metrics</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6">
            <Building2 className="mb-3 h-8 w-8 text-emerald-400" />
            <h2 className="text-xl font-semibold text-fg">
              India — G&amp;A / back-office / tech-ops
            </h2>
            <p className="mt-3 text-sm text-fg-muted leading-relaxed">
              Buyers in Mohali, Chandigarh, and remote India teams ask:{" "}
              <em>Can this hire own process and also ship software?</em> The
              answer is a full Next.js product demo with docs, state management,
              charts, and clear demo/production boundaries — not a slide deck
              claiming “familiar with Excel.”
            </p>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              <li>• Open to Work: Mohali / Chandigarh + remote</li>
              <li>• Proof of TypeScript / React / product documentation</li>
              <li>• Ops storytelling suitable for US-facing support roles</li>
              <li>• Integrity banner: never confuses sample with live data</li>
            </ul>
          </section>
        </div>

        <section className="mt-12 rounded-xl border border-border bg-surface-raised p-6">
          <h2 className="text-lg font-semibold text-fg">
            How to pitch this demo in either market
          </h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2 text-sm text-fg-muted">
            <div>
              <h3 className="font-medium text-sky-800 dark:text-sky-300">To a US fleet ops lead</h3>
              <p className="mt-2 leading-relaxed">
                “I built a command center that mirrors how we triage a dry-van
                board. Click the detention load. The check-call form writes to a
                local store so handoffs are visible. Charts show the KPI set I
                care about when coaching a desk.”
              </p>
            </div>
            <div>
              <h3 className="font-medium text-emerald-700 dark:text-emerald-300">
                To an India hiring manager
              </h3>
              <p className="mt-2 leading-relaxed">
                “I can document process, build the tool, and keep demo vs
                production ethics clear. This repo is the interview take-home I
                already finished — architecture notes included.”
              </p>
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/app/board"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-700 dark:bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 dark:hover:bg-sky-500"
          >
            Open the app <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about-builder"
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-sm text-fg hover:bg-surface-sunken"
          >
            About the builder
          </Link>
        </div>
      </div>
    </MarketingShell>
  );
}
