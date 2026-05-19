/**
 * Exports all 76 presentation slides to a single PDF.
 * Usage: npm run preview  (in a separate terminal, then)
 *        npx tsx scripts/export-pdf.ts
 *
 * Or run standalone which starts its own preview server:
 *        npx tsx scripts/export-pdf.ts --serve
 */

import puppeteer from "puppeteer-core";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import { spawn, ChildProcess } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const CHROME_PATH =
  process.env.CHROME_PATH ??
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:4173/farmpredict-presentation/";
const TOTAL_SLIDES = 76;
const SLIDE_SETTLE_MS = 1200; // ms to wait after ArrowRight for animations
const OUTPUT = path.join(ROOT, "..", "presentation-slides.pdf");

async function startPreviewServer(): Promise<ChildProcess> {
  console.log("Starting vite preview server…");
  const proc = spawn("npm", ["run", "preview"], {
    cwd: ROOT,
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  // Wait until server is ready
  await new Promise<void>((resolve) => {
    proc.stdout?.on("data", (d: Buffer) => {
      if (d.toString().includes("localhost")) resolve();
    });
    setTimeout(resolve, 4000);
  });
  return proc;
}

async function main() {
  const serve = process.argv.includes("--serve");
  let server: ChildProcess | null = null;
  if (serve) {
    server = await startPreviewServer();
  }

  console.log(`Launching Chrome from: ${CHROME_PATH}`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      "--window-size=1920,1080",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  console.log(`Navigating to ${BASE_URL}…`);
  await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 30000 });

  // Allow initial mount + first slide animations to complete
  await new Promise((r) => setTimeout(r, 2500));

  const screenshots: Uint8Array[] = [];

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    const buf = await page.screenshot({ type: "png" });
    screenshots.push(buf as Uint8Array);
    process.stdout.write(`  slide ${i + 1}/${TOTAL_SLIDES}\r`);

    if (i < TOTAL_SLIDES - 1) {
      await page.keyboard.press("ArrowRight");
      await new Promise((r) => setTimeout(r, SLIDE_SETTLE_MS));
    }
  }

  process.stdout.write("\n");
  await browser.close();
  if (server) server.kill();

  console.log("Building PDF…");
  const pdf = await PDFDocument.create();
  for (const data of screenshots) {
    const img = await pdf.embedPng(data);
    const pg = pdf.addPage([1920, 1080]);
    pg.drawImage(img, { x: 0, y: 0, width: 1920, height: 1080 });
  }

  const bytes = await pdf.save();
  fs.writeFileSync(OUTPUT, bytes);
  console.log(`Done → ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
