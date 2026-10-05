import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Globe2,
  LayoutGrid,
  Phone,
  Shield,
  Truck,
  Users,
} from "lucide-react";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { HeroBoardMock } from "@/components/marketing/hero-board-mock";

export default function HomePage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-950 to-slate-950" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-2 lg:gap-12 lg:py-28">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs text-sky-300">
              Portfolio product demo · Sample data only
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              FreightOps Command Center
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300 md:text-xl">
              A dispatcher-grade load board and ops cockpit — built to prove that
              someone who has lived dry-van fleet chaos can also{" "}
              <strong className="text-white">ship product</strong>. Dual market:
              US/EU fleet operations fluency + India G&amp;A / tech-ops hiring
              signal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/app/board"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-700 dark:bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 dark:hover:bg-sky-500"
              >
                Open the demo app <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about-builder"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              >
                Meet the builder
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm text-slate-200 hover:bg-white/10 hover:text-white"
              >
                Read the docs
              </Link>
            </div>
          </div>
          <HeroBoardMock />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-fg">What you can do in the demo</h2>
        <p className="mt-2 max-w-2xl text-fg-muted">
          This is not a thin landing page. Every route below has working filters,
          forms, or charts against an in-browser mock store. Nothing writes to
          Google Sheets or a real TMS.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: LayoutGrid,
              title: "Multi-column load board",
              body: "Status columns, priority badges, detention flags, search and filters that actually narrow the board.",
              href: "/app/board",
            },
            {
              icon: Truck,
              title: "Load detail + timeline",
              body: "Stops, appointments, and a check-call history you can extend from the Check-Calls form.",
              href: "/app/loads/load-001",
            },
            {
              icon: Users,
              title: "Driver / tractor roster",
              body: "Filter by status, HOS remaining, endorsements — the roster a dispatcher glances at before covering.",
              href: "/app/drivers",
            },
            {
              icon: Phone,
              title: "Check-call logging",
              body: "Log a call; it persists to localStorage via Zustand so reloads keep your demo notes.",
              href: "/app/check-calls",
            },
            {
              icon: BarChart3,
              title: "Ops analytics",
              body: "Utilization, on-time mix, exception breakdown, and revenue vs cost — Recharts with labeled demo series.",
              href: "/app/analytics",
            },
            {
              icon: Globe2,
              title: "Markets positioning",
              body: "US/EU dry-van fleet ops vs India back-office / tech-ops hiring angle — same builder, two buyer contexts.",
              href: "/markets",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-border bg-surface-raised p-5 transition hover:border-sky-500/40 hover:bg-surface-raised"
            >
              <card.icon className="mb-3 h-6 w-6 text-sky-700 dark:text-sky-400" />
              <h3 className="font-semibold text-fg group-hover:text-sky-700 dark:group-hover:text-sky-300">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted">{card.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface-raised">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sky-700 dark:text-sky-400">
              <Truck className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Market A — Fleet ops
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-fg">
              US &amp; EU dry-van dispatch fluency
            </h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Appointment windows, detention clocks, empty positioning, broker
              cover when equipment fails, HOS that does not care about your
              spreadsheet — this demo encodes the mental model of someone who has
              run those loops. The board is organized the way a dispatcher
              actually scans: status first, then priority and exceptions.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              <li>• Load lifecycle from Planned → Delivered (+ Exception)</li>
              <li>• Detention flags surfaced on the board, not buried in notes</li>
              <li>• Check-call timeline per load for audit and handoff</li>
            </ul>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Market B — India hiring
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-fg">
              G&amp;A / back-office / tech-ops angle
            </h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              For employers in Mohali, Chandigarh, or remote India teams supporting
              US/EU logistics: this is proof that the candidate can both{" "}
              <em>understand the domain</em> and{" "}
              <em>build the tooling</em>. Next.js, TypeScript, client state,
              charts, docs — packaged as a product demo, not a resume bullet.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              <li>• Open to Work: Mohali / Chandigarh + remote</li>
              <li>• Ops process design + software delivery in one portfolio piece</li>
              <li>• Clear demo boundaries — never confuses sample with production</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-start gap-3 rounded-xl border border-amber-600/30 bg-amber-50 p-5 dark:border-amber-500/30 dark:bg-amber-500/5">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-200">Demo integrity</h3>
            <p className="mt-1 text-sm text-fg-muted leading-relaxed">
              All data is fictional sample content labeled throughout the UI.
              This project does <strong>not</strong> read or write Google Sheets
              (including any live Dispatch workbook), does not call production
              APIs, and is not deployed publicly as part of this build. See{" "}
              <Link href="/docs/demo-caveats" className="text-sky-700 dark:text-sky-400 underline">
                Demo Caveats
              </Link>{" "}
              for the full scope statement.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-950 to-slate-900 p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to click around?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Start on the load board, open a hot detention load, log a check-call,
            then glance at analytics — that sequence is the dispatcher day in
            miniature.
          </p>
          <Link
            href="/app/board"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-700 dark:bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-600 dark:hover:bg-sky-500"
          >
            Enter Command Center <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
