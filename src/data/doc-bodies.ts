export const DOC_BODIES: Record<string, string> = {
  architecture: `
<h2>Purpose of this stack</h2>
<p>
  FreightOps Command Center is a <strong>portfolio product demo</strong> built with
  Next.js App Router, TypeScript, and Tailwind CSS. The goal is not to replace a
  TMS — it is to show that a dispatcher who understands dry-van operations can
  also design information architecture, ship interactive UI, and document
  trade-offs clearly.
</p>
<p>
  Client state lives in <code>Zustand</code> with <code>persist</code> to
  <code>localStorage</code> for loads and check-calls created in the browser.
  Seed data is static TypeScript modules under <code>src/data/</code>, labeled as
  demo/sample throughout. Charts use <strong>Recharts</strong> against fixed
  weekly series. There is no database, no OAuth, and no Google Sheets connector
  in this project on purpose.
</p>
<h2>Route topology</h2>
<ul>
  <li><code>/</code> — marketing narrative (US fleet ops + India hiring angle)</li>
  <li><code>/app/*</code> — authenticated-feel ops shell with demo banner</li>
  <li><code>/docs/*</code> — long-form documentation for hiring reviewers</li>
  <li><code>/markets</code> — dual-market positioning</li>
  <li><code>/about-builder</code> — Harinder Sidhu story + hire CTA</li>
</ul>
<h2>Layers</h2>
<ol>
  <li><strong>Presentation</strong> — App Router pages and shared components (shell, badges, empty states, toasts).</li>
  <li><strong>Domain types</strong> — <code>src/lib/types.ts</code> defines load status machines, priorities, stops, check-calls, drivers.</li>
  <li><strong>Mock data</strong> — fictional loads and drivers; analytics KPIs are separate demo series.</li>
  <li><strong>Client store</strong> — create/update load status, add load, append check-calls; toast feedback.</li>
</ol>
<h2>Theme &amp; UX chrome</h2>
<p>
  Dark is the default (ops floors favor dark boards). Light theme toggles via
  <code>localStorage</code> key <code>freightops-theme</code>. App pages always
  show a banner: “Demo data — not connected to live dispatch systems.” Empty
  states appear when filters wipe the list. A shortcuts help panel documents
  intended keyboard navigation patterns.
</p>
<h2>What was intentionally omitted</h2>
<p>
  Real-time GPS, ELD integration, rate confirmation PDFs, EDI, multi-tenant auth,
  and any write path to external workbooks. Those belong in a production roadmap,
  not a portfolio boundary. See <em>Demo Caveats</em> for the full exclusion list.
</p>
`,
  "data-model": `
<h2>Core entities</h2>
<p>
  The demo centers on four entities: <strong>Load</strong>, <strong>Stop</strong>,
  <strong>CheckCall</strong>, and <strong>Driver</strong>. A load owns ordered
  stops and a timeline of check-calls. A driver may optionally reference a
  current <code>loadId</code>; the board also stores <code>tractor</code> on the
  load for quick scanning without a join UI.
</p>
<h2>Load status machine</h2>
<ol>
  <li><code>planned</code> — accepted or tendered, may lack assignment</li>
  <li><code>dispatched</code> — driver told; empty to shipper or rolling</li>
  <li><code>at_shipper</code> — arrived / loading / waiting</li>
  <li><code>in_transit</code> — loaded and moving</li>
  <li><code>at_consignee</code> — arrived for delivery</li>
  <li><code>delivered</code> — POD complete</li>
  <li><code>exception</code> — break glass: equipment, cover, rejection, etc.</li>
</ol>
<p>
  Status transitions on the board are free-form in the demo (any → any) so
  reviewers can poke the UI. A production system would enforce legal transitions
  and audit reasons for jumps into <code>exception</code>.
</p>
<h2>Priority &amp; detention</h2>
<p>
  Priority is <code>hot | high | normal | low</code>. Detention is a boolean flag
  plus optional minutes — surfaced on cards so it is never only in free-text
  notes. Hot + detention is the visual pattern dispatchers already use mentally.
</p>
<h2>Stops</h2>
<p>
  Each stop has sequence, type (pickup/delivery/relay), facility, city/state,
  appointment window, and status (<code>pending | arrived | completed | missed</code>).
  Appointment times are ISO strings rendered in America/Los_Angeles for the
  portfolio owner’s local zone labeling.
</p>
<h2>Check-calls</h2>
<p>
  Typed events (dispatch, loaded, detention, breakdown, …) with notes, optional
  location, and <code>createdBy</code>. New calls from the Check-Calls form append
  to the load and persist via Zustand <code>persist</code>. Reloading the page
  keeps your demo notes unless you Reset demo on the board.
</p>
<h2>Drivers</h2>
<p>
  Roster fields include tractor, HOS remaining hours, endorsements, home base,
  and coarse current city/state. Filters on the Drivers page operate client-side
  over this array — no API.
</p>
`,
  "dispatcher-mental-model": `
<h2>How a dry-van dispatcher actually looks at a board</h2>
<p>
  A good board is not a pretty Kanban for its own sake. It is a <strong>triage
  surface</strong>. Eyes go first to exceptions and detention, then to hot
  priorities that can still be saved, then to loads that need cover before the
  appointment window collapses. Everything else is background noise until the
  phone rings.
</p>
<h2>The morning loop</h2>
<ol>
  <li>Scan <em>Exception</em> and anything with a detention flag.</li>
  <li>Confirm today’s pickups still have power and legal HOS.</li>
  <li>Chase ETAs on in-transit freights with tight delivery appointments.</li>
  <li>Pre-plan empties for tomorrow’s high-value lanes.</li>
  <li>Log check-calls so the next shift inherits truth, not Slack archaeology.</li>
</ol>
<p>
  FreightOps CC encodes that loop: columns match lifecycle, badges scream
  priority, detention is visible on the card, and check-calls form a per-load
  timeline you can open without digging through chat.
</p>
<h2>Detention is a clock, not a vibe</h2>
<p>
  Free time ends; the clock starts; someone owns the claim. If detention only
  lives in a driver’s voicemail, the fleet loses money and the customer
  relationship gets fuzzy. Surfacing the flag on the board is a product decision
  that comes from ops scars, not from a design system checklist.
</p>
<h2>HOS vs appointments</h2>
<p>
  The conflict between hours-of-service and appointment windows is the daily
  puzzle. This demo exposes HOS remaining on the driver roster and appointment
  windows on stops so a reviewer can see both sides of the trade-off in one
  product. Production would add alerts when ETA + required break cannot meet
  the window — out of scope here, but the mental model is visible.
</p>
<h2>Why builders who have dispatched are rare</h2>
<p>
  Many tools are designed by people who have never covered a broken trailer at
  2 a.m. or explained to a broker why a “simple” multi-stop became an exception.
  This portfolio piece exists to show domain empathy <em>and</em> the ability to
  ship UI. That combination is the hiring pitch for US/EU fleet teams and for
  India G&amp;A / tech-ops roles that support those teams remotely.
</p>
`,
  "demo-caveats": `
<h2>What this is</h2>
<p>
  A <strong>local portfolio demo</strong> under <code>/workspace/freightops-demo</code>.
  It demonstrates product thinking, dispatcher UX, and modern web stack fluency.
  Sample data is fictional. UI copy repeatedly labels demo/example content.
</p>
<h2>What this is not</h2>
<ul>
  <li>Not connected to any live dispatch system or TMS</li>
  <li>Not connected to Google Sheets (especially any production Dispatch workbook)</li>
  <li>Not a public production deployment as part of this build task</li>
  <li>Not a source of truth for real loads, drivers, rates, or PODs</li>
  <li>Not legal, compliance, or ELD software</li>
</ul>
<h2>Persistence boundary</h2>
<p>
  Check-calls and load edits persist only in the browser via Zustand
  <code>localStorage</code> key <code>freightops-demo-store</code>. Clearing site
  data or clicking <strong>Reset demo</strong> restores seed mocks. Server
  restarts do not wipe client storage; that is intentional for demo play.
</p>
<h2>Security &amp; privacy</h2>
<p>
  Phone numbers, shipper names, and lanes are invented. Do not treat them as
  real PII. Do not paste real customer data into the demo forms.
</p>
<h2>Build &amp; run expectations</h2>
<p>
  <code>npm run build</code> must succeed. Dev server is intended on a free port
  (prefer 3001 when 3000 is occupied). No git push and no Vercel/Netlify deploy
  are part of the constrained build instructions for this portfolio piece.
</p>
<h2>Known gaps (honest)</h2>
<ul>
  <li>No multi-user sync or conflict resolution</li>
  <li>Status transitions are not server-validated</li>
  <li>Charts are static demo series, not derived from live board mutations</li>
  <li>Keyboard shortcuts panel is illustrative; full vim-style routing is partial</li>
  <li>Mobile sidebar collapses to a compact top strip — not a full native app</li>
</ul>
`,
}
