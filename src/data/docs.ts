export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  readingMinutes: number;
}

export const DOCS: DocMeta[] = [
  {
    slug: "architecture",
    title: "Architecture Overview",
    description:
      "How FreightOps Command Center is structured as a Next.js App Router demo — layers, state, and intentional boundaries.",
    readingMinutes: 8,
  },
  {
    slug: "data-model",
    title: "Data Model",
    description:
      "Loads, stops, drivers, check-calls, and status machines used across the demo board and detail views.",
    readingMinutes: 7,
  },
  {
    slug: "dispatcher-mental-model",
    title: "Dispatcher Mental Model",
    description:
      "How a dry-van dispatcher thinks about the board: priority, detention, HOS, and exception triage.",
    readingMinutes: 9,
  },
  {
    slug: "demo-caveats",
    title: "Demo Caveats & Scope",
    description:
      "What this portfolio demo includes, what it deliberately excludes, and why demo data never touches live sheets.",
    readingMinutes: 6,
  },
];

export function getDoc(slug: string): DocMeta | undefined {
  return DOCS.find((d) => d.slug === slug);
}
