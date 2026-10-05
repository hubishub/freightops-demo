import { MarketingNav } from "@/components/layout/marketing-nav";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-fg">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <MarketingNav />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-fg-subtle">
        FreightOps Command Center · Portfolio demo by Harinder Sidhu · Demo data
        only — not a live TMS
      </footer>
    </div>
  );
}
