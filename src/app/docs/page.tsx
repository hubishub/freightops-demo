import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { DOCS } from "@/data/docs";

export default function DocsIndexPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-bold text-fg">Documentation</h1>
        <p className="mt-3 text-fg-muted">
          Long-form notes for reviewers: architecture, domain model, dispatcher
          thinking, and explicit demo boundaries. All content describes the
          portfolio sample — not a production TMS.
        </p>
        <ul className="mt-10 space-y-4">
          {DOCS.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
                className="block rounded-xl border border-border bg-surface-raised p-5 transition hover:border-sky-500/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-sky-800 dark:text-sky-300">
                    {doc.title}
                  </h2>
                  <span className="text-xs text-fg-subtle">
                    {doc.readingMinutes} min
                  </span>
                </div>
                <p className="mt-2 text-sm text-fg-muted">{doc.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MarketingShell>
  );
}
