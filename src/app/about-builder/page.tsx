import Link from "next/link";
import { MapPin, Briefcase, ArrowRight, Mail } from "lucide-react";
import { MarketingShell } from "@/components/layout/marketing-shell";

export default function AboutBuilderPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
          About the builder
        </p>
        <h1 className="mt-2 text-3xl font-bold text-fg md:text-4xl">
          Harinder Sidhu
        </h1>
        <p className="mt-2 text-lg text-fg-muted">
          Dispatcher-minded operator who builds software — proving both in this
          portfolio demo.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-200">
            <Briefcase className="h-3.5 w-3.5" /> Open to Work
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-sunken px-3 py-1 text-xs text-fg-muted">
            <MapPin className="h-3.5 w-3.5" /> Mohali / Chandigarh
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-sunken px-3 py-1 text-xs text-fg-muted">
            Remote-friendly
          </span>
        </div>

        <div className="prose-docs mt-10">
          <h2>Why this demo exists</h2>
          <p>
            Resumes compress years of freight chaos into a few bullets. Hiring
            managers still have to guess whether the candidate can{" "}
            <strong>think in loads and appointments</strong> and whether they can{" "}
            <strong>ship a coherent product</strong>. FreightOps Command Center
            collapses that guess: open the board, filter detention, change a
            status, log a check-call, read the architecture doc.
          </p>
          <h2>What I bring to US/EU fleet teams</h2>
          <p>
            Fluency with dry-van dispatch realities — priority triage, detention
            clocks, empty planning, exception language with brokers, and the
            discipline of leaving a check-call trail for the next shift. I care
            about tools that match how desks actually work, not dashboards that
            look good in a sales deck.
          </p>
          <h2>What I bring to India G&amp;A / tech-ops employers</h2>
          <p>
            The ability to sit between operations and engineering: document
            process, prototype UI, keep demo data ethics obvious, and communicate
            in the vocabulary of US/EU logistics customers. Based in the Mohali /
            Chandigarh region and open to remote roles that need that bridge.
          </p>
          <h2>Stack demonstrated here</h2>
          <ul>
            <li>Next.js App Router + TypeScript + Tailwind</li>
            <li>Zustand (persisted mock store) for interactive demo CRUD</li>
            <li>Recharts for utilization, on-time, exception, and revenue views</li>
            <li>Long-form docs: architecture, data model, dispatcher mental model, caveats</li>
          </ul>
          <h2>Integrity note</h2>
          <p>
            This project uses <strong>demo / sample data only</strong>. It does
            not connect to Google Sheets or live dispatch systems. If we talk
            about production work, we will keep sample and live environments
            strictly separated — the same discipline this demo advertises in its
            banner.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-950/40 to-slate-900 p-8">
          <h2 className="text-xl font-bold text-fg">Hire CTA</h2>
          <p className="mt-2 text-fg-muted">
            Looking for roles in fleet operations tooling, logistics G&amp;A /
            back-office leadership, or tech-ops that support US/EU freight —
            on-site in Mohali/Chandigarh or remote.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/app/board"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-700 dark:bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 dark:hover:bg-sky-500"
            >
              Review the live demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-sm text-fg hover:bg-surface-sunken"
            >
              Read the docs
            </Link>
            <a
              href="mailto:hire@example.com?subject=FreightOps%20Command%20Center%20-%20Harinder%20Sidhu"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-fg-muted hover:bg-surface-sunken hover:text-fg"
            >
              <Mail className="h-4 w-4" /> Contact (replace with real email)
            </a>
          </div>
          <p className="mt-4 text-xs text-fg-subtle">
            Mailto uses a placeholder address for the portfolio demo — swap for
            your real contact before sharing externally.
          </p>
        </div>
      </div>
    </MarketingShell>
  );
}
