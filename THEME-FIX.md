# FreightOps Theme Fix (FO-001–011, FO-018)

**Date:** 2026-10-05 (PT)  
**Path:** `/workspace/freightops-demo`  
**Status:** Build SUCCESS (`npm run build`). No git push.

## What changed

Replaced the old `html.light … !important` class remaps with a real dual-theme token system.

### Token system

- `tailwind.config.ts`: `darkMode: "class"`
- Semantic colors mapped to CSS variables: `fg`, `fg-muted`, `fg-subtle`, `surface`, `surface-raised`, `surface-sunken`, `surface-overlay`, `border`, `border-strong`, `accent`, `danger`, `warning` (+ chart vars)
- `:root` = light museum-readable slate/sky palette
- `html.dark` = prior dark ops palette
- **Removed** all `html.light .bg-slate-* / .text-white !important` band-aids

### Component migration

Surfaces/text that must flip now use `bg-surface*`, `text-fg*`, `border-border*` instead of hard-coded `slate-*`.

**Kept intentional:**
- White text on sky CTAs (`text-white` on `bg-sky-700 dark:bg-sky-600`) — FO-003; CTA darkened to sky-700 in light for AA
- Logo mark icon stays `text-white` on sky chip

### FO ID coverage (theme/contrast)

| ID | Fix |
|----|-----|
| FO-001 | Board cards → `bg-surface-overlay` / `text-fg*` (no light remap of slate-400) |
| FO-002 | Hero/brand headings → `text-fg` (not remapped `text-white`) |
| FO-003 | CTAs keep `text-white`; light CTA `bg-sky-700` for AA (~4.5:1+) |
| FO-004 | Active nav → `bg-sky-100 text-sky-800 dark:bg-sky-600/20 dark:text-sky-300` |
| FO-005 | HIGH/HOT badges → opaque light tints + dark text (`rose-900` / `orange-900`) |
| FO-006 | Demo banner → `bg-amber-50 text-amber-900` / dark amber translucent |
| FO-007 | Analytics KPIs → `bg-surface-raised` + `text-fg` |
| FO-008 | Chart legend/axis/tooltip use CSS vars + darker series colors for AA |
| FO-009 | Docs/markets/about accents → `text-sky-700/800 dark:text-sky-300/400`; prose-docs updated |
| FO-010 | Empty state → `text-fg` / `border-border` / `bg-surface-raised` |
| FO-011 | Filter bars → `bg-surface-raised border-border` |
| FO-018 | Detention → `text-amber-700 dark:text-amber-300`; footer → `text-fg-subtle` |

### Explicitly NOT done (Dex owns)

FO-012 skip+#main · FO-013 labels · FO-014 help aria · FO-015 hamburger · FO-016 reduced-motion · FO-017 React #310 `/app` redirect

## Files touched (primary)

- `tailwind.config.ts`
- `src/app/globals.css`
- `src/components/theme-provider.tsx`
- `src/components/ui/badges.tsx`, `demo-banner.tsx`, `empty-state.tsx`, `toast-host.tsx`, `shortcuts-panel.tsx`
- `src/components/layout/app-shell.tsx`, `marketing-nav.tsx`, `marketing-shell.tsx`
- `src/app/page.tsx`, `markets/page.tsx`, `about-builder/page.tsx`, `docs/**`
- `src/app/app/board/page.tsx`, `drivers/page.tsx`, `check-calls/page.tsx`, `analytics/page.tsx`, `loads/[id]/page.tsx`
- `THEME-FIX.md` (this file)

## Residual risks

- Recharts pie labels may still need Tess contrast recheck on light; legend/axis wired to tokens.
- Custom `border-border` follows shadcn pattern — confirm no utility clash in Tess pass.
- Opacity modifiers on CSS-var colors (`/80`) intentionally avoided; use solid tokens or `surface-overlay`.
- Laptop Desktop copy of `freightops-demo` is stale until Jack syncs after Tess retest PASS.
