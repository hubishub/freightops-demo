"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

const SHORTCUTS = [
  { keys: "?", description: "Open this shortcuts panel" },
  { keys: "g b", description: "Go to Load Board" },
  { keys: "g d", description: "Go to Drivers" },
  { keys: "g c", description: "Go to Check-Calls" },
  { keys: "g a", description: "Go to Analytics" },
  { keys: "Esc", description: "Close dialogs / panels" },
];

export function ShortcutsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        e.preventDefault();
        if (!open) {
          // parent controls open; we only close on Esc here when open
        }
      }
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4">
      <div
        id="shortcuts-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-panel-title"
        className="w-full max-w-md rounded-xl border border-border bg-surface-raised shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 id="shortcuts-panel-title" className="text-sm font-semibold">
            Keyboard shortcuts
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-fg-muted hover:bg-surface-sunken"
            aria-label="Close shortcuts"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul className="space-y-2 p-4 text-sm">
          {SHORTCUTS.map((s) => (
            <li key={s.keys} className="flex items-center justify-between gap-4">
              <span className="text-fg-muted">{s.description}</span>
              <kbd className="rounded border border-border-strong bg-surface-sunken px-2 py-0.5 font-mono text-xs text-fg">
                {s.keys}
              </kbd>
            </li>
          ))}
        </ul>
        <p className="border-t border-border px-4 py-2 text-[11px] text-fg-subtle">
          Demo UI — shortcuts are illustrative; navigation still works via sidebar.
        </p>
      </div>
    </div>
  );
}
