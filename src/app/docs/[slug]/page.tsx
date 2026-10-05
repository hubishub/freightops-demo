import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { DOCS, getDoc } from "@/data/docs";
import { DOC_BODIES } from "@/data/doc-bodies";

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const meta = getDoc(params.slug);
  const body = DOC_BODIES[params.slug];
  if (!meta || !body) notFound();

  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-16">
        <Link href="/docs" className="text-sm text-sky-700 dark:text-sky-400 hover:underline">
          ← All docs
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-fg">{meta.title}</h1>
        <p className="mt-2 text-fg-muted">
          {meta.description} · ~{meta.readingMinutes} min read · Demo documentation
        </p>
        <div
          className="prose-docs mt-10"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-fg-subtle">More docs</p>
          <ul className="mt-2 space-y-1">
            {DOCS.filter((d) => d.slug !== meta.slug).map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/docs/${d.slug}`}
                  className="text-sky-700 dark:text-sky-400 hover:underline"
                >
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </MarketingShell>
  );
}
