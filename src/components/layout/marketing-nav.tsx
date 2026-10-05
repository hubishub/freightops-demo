"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, Truck, X } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/markets", label: "Markets" },
  { href: "/docs", label: "Docs" },
  { href: "/about-builder", label: "About Builder" },
  { href: "/app/board", label: "Open App" },
];

export function MarketingNav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-overlay backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-fg">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white dark:bg-sky-600">
            <Truck className="h-4 w-4" />
          </span>
          <span>
            FreightOps <span className="text-sky-700 dark:text-sky-400">CC</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition",
                pathname === l.href ||
                  (l.href !== "/" && pathname.startsWith(l.href))
                  ? "bg-surface-sunken text-fg"
                  : "text-fg-muted hover:text-fg"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
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
          <Link
            href="/app/board"
            className="hidden rounded-lg bg-sky-700 dark:bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-600 dark:hover:bg-sky-500 sm:inline-flex"
          >
            Launch demo
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-fg-muted hover:bg-surface-sunken hover:text-fg md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-surface-raised px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm",
                    pathname === l.href ||
                      (l.href !== "/" && pathname.startsWith(l.href))
                      ? "bg-surface-sunken text-fg"
                      : "text-fg-muted hover:text-fg"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/app/board"
                className="mt-1 block rounded-lg bg-sky-700 dark:bg-sky-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-sky-600 dark:hover:bg-sky-500"
                onClick={() => setMobileOpen(false)}
              >
                Launch demo
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
