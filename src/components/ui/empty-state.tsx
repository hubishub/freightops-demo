import { Inbox } from "lucide-react";

/** Empty state — FO-010 */
export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface-raised px-6 py-16 text-center">
      <Inbox className="mb-3 h-10 w-10 text-fg-subtle" />
      <h3 className="text-base font-semibold text-fg">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-fg-muted">{description}</p>
      )}
    </div>
  );
}
