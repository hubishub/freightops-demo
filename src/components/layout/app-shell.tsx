"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  HelpCircle,
  LayoutGrid,
  Moon,
  Phone,
  Sun,
  Truck,
  Users,
  Home,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { DemoBanner } from "@/components/ui/demo-banner";
import { ShortcutsPanel } from "@/components/ui/shortcuts-panel";
import { ToastHost } from "@/components/ui/toast-host";
import { cn } from "@/lib/utils";
import { useState } from "react";

const nav = [
  { href: "/app/board", label: "Load Board", icon: LayoutGrid },
  { href: "/app/drivers", label: "Drivers", icon: Users },
  { href: "/app/check-calls", label: "Check-Calls", icon: Phone },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface text-fg">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-surface-raised md:flex">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white dark:bg-sky-600">
            <Truck className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">FreightOps</div>
            <div className="text-[10px] uppercase tracking-wider text-fg-subtle">
              Command Center
            </div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "bg-sky-100 text-sky-800 dark:bg-sky-600/20 dark:text-sky-300"
                    : "text-fg-muted hover:bg-surface-sunken hover:text-fg"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="my-2 border-t border-border" />
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-surface-sunken hover:text-fg"
          >
            <Home className="h-4 w-4" />
            Marketing site
          </Link>
          <Link
            href="/docs"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-surface-sunken hover:text-fg"
          >
            <BookOpen className="h-4 w-4" />
            Docs
          </Link>
        </nav>
        <div className="border-t border-border p-3 text-[10px] text-fg-subtle">
          Portfolio demo · Sample data only
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <DemoBanner />
        <header className="flex h-12 items-center justify-between gap-3 border-b border-border px-4">
          <div className="flex items-center gap-2 overflow-x-auto md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-md px-2 py-1 text-xs",
                  pathname.startsWith(item.href)
                    ? "bg-sky-100 text-sky-800 dark:bg-sky-600/20 dark:text-sky-300"
                    : "text-fg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              className="rounded-md p-2 text-fg-muted hover:bg-surface-sunken hover:text-fg"
              aria-label="Keyboard shortcuts"
              aria-expanded={helpOpen}
              aria-controls="shortcuts-panel"
              title="Keyboard shortcuts (?)"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={toggle}
              className="rounded-md p-2 text-fg-muted hover:bg-surface-sunken hover:text-fg"
              aria-label={
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </header>
        <main id="main" tabIndex={-1} className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
      <ToastHost />
      <ShortcutsPanel open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
