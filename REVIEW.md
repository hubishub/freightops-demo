# FreightOps Command Center — Review

## Project path

`/workspace/freightops-demo`

## How to run

```bash
cd /workspace/freightops-demo
npm install
npm run dev    # http://localhost:3001
```

Production check:

```bash
npm run build
npm start      # also port 3001
```

## Route list

| Route | Notes |
|-------|--------|
| `/` | Marketing home (US fleet + India hiring) |
| `/app` | Redirects → `/app/board` |
| `/app/board` | Multi-column board, filters, add load, status CRUD |
| `/app/loads/[id]` | Detail + stops + check-call timeline (try `load-003`) |
| `/app/drivers` | Roster + status / HOS / search filters |
| `/app/check-calls` | Log form → Zustand/localStorage mock store |
| `/app/analytics` | Recharts: utilization, on-time, exceptions, revenue |
| `/docs` | Docs index |
| `/docs/architecture` | Architecture overview |
| `/docs/data-model` | Domain model |
| `/docs/dispatcher-mental-model` | Dispatcher mental model |
| `/docs/demo-caveats` | Scope & integrity |
| `/markets` | Dual market positioning |
| `/about-builder` | Harinder Sidhu + Open to Work CTA |

## Build status

**SUCCESS** — `npm run build` completed (Next.js 14.2.35). All listed routes generated; `/app/loads/[id]` is dynamic.

## Dev server

- **URL:** http://localhost:3001  
- **Port:** 3001 (default script; avoids Career HQ on 3000)  
- **Status:** running via `npm run dev` after build verification  
- Verified HTTP 200 on `/` and `/app/board`

## Screenshot paths

All under `/workspace/freightops-demo/preview-shots/`:

| File | Route |
|------|--------|
| `preview-shots/home.png` | `/` |
| `preview-shots/board.png` | `/app/board` |
| `preview-shots/load-detail.png` | `/app/loads/load-003` |
| `preview-shots/drivers.png` | `/app/drivers` |
| `preview-shots/check-calls.png` | `/app/check-calls` |
| `preview-shots/analytics.png` | `/app/analytics` |
| `preview-shots/docs.png` | `/docs` |
| `preview-shots/markets.png` | `/markets` |
| `preview-shots/about-builder.png` | `/about-builder` |

Regenerate: `node scripts/screenshots.mjs` (uses system Chrome).

## Gaps / honest limits

- Charts use static demo series (not live-derived from board mutations)
- Status transitions are client-only (any → any); no server validation
- Keyboard shortcuts panel is help UI; chord navigation is illustrative
- Mailto on about page uses placeholder `hire@example.com`
- Light theme is best-effort CSS overrides on a dark-first design
- No auth, multiplayer sync, ELD/GPS, or EDI
- **No git push / no public deploy** performed (per constraints)
- **No Google Sheet access** — demo JSON/TS seed only

## Integrity

Demo banner on all `/app/*` pages. Seed modules labeled “DEMO DATA ONLY”. Never touches live Dispatch sheets.
