# FreightOps Command Center

**Portfolio product demo** by Harinder Sidhu — dispatcher + builder proof for US/EU dry-van fleet ops and India G&A / tech-ops hiring.

> **Demo data only.** Not connected to live dispatch systems, Google Sheets, or any production TMS.

## Path

```
/workspace/freightops-demo
```

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Zustand (persisted mock store for loads / check-calls)
- Recharts (analytics)
- Dark / light theme

## Run locally

```bash
cd /workspace/freightops-demo
npm install
npm run dev          # http://localhost:3001
npm run build        # production build check
npm start            # serve production build on 3001
```

Port **3001** is the default so it does not collide with Career HQ on 3000.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Product marketing (US fleet + India hiring angle) |
| `/app/board` | Multi-column load board, filters, add load, status updates |
| `/app/loads/[id]` | Load detail, stops, check-call timeline |
| `/app/drivers` | Driver/tractor roster + filters |
| `/app/check-calls` | Log + form (persists to localStorage mock store) |
| `/app/analytics` | Utilization, on-time, exceptions, revenue charts |
| `/docs` | Docs index |
| `/docs/[slug]` | architecture, data-model, dispatcher-mental-model, demo-caveats |
| `/markets` | Dual market positioning |
| `/about-builder` | Harinder story + Open to Work CTA |

## Screenshots

See `preview-shots/` and `REVIEW.md`.

## Constraints

- No git push / public deploy as part of the constrained build
- No Google Sheet access
- All sample data clearly labeled

## License

Private portfolio demo — not open-sourced as a product.
