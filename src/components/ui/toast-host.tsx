"use client";

import { useOpsStore } from "@/store/ops-store";
import { X } from "lucide-react";

export function ToastHost() {
  const toasts = useOpsStore((s) => s.toasts);
  const dismiss = useOpsStore((s) => s.dismissToast);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-2 rounded-lg border px-4 py-3 shadow-lg text-sm backdrop-blur ${
            t.type === "success"
              ? "border-emerald-500/40 bg-emerald-950/90 text-emerald-100"
              : t.type === "error"
                ? "border-rose-500/40 bg-rose-950/90 text-rose-100"
                : "border-sky-500/40 bg-surface-raised text-fg"
          }`}
        >
          <span className="flex-1">{t.message}</span>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            className="opacity-70 hover:opacity-100"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
