import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "preview-shots");
const base = "http://127.0.0.1:3001";

const shots = [
  ["home", "/"],
  ["board", "/app/board"],
  ["load-detail", "/app/loads/load-003"],
  ["drivers", "/app/drivers"],
  ["check-calls", "/app/check-calls"],
  ["analytics", "/app/analytics"],
  ["docs", "/docs"],
  ["markets", "/markets"],
  ["about-builder", "/about-builder"],
];

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/google-chrome-stable",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

for (const [name, route] of shots) {
  const url = base + route;
  console.log("shot", name, url);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  const file = path.join(out, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log("wrote", file);
}

await browser.close();
console.log("done");
