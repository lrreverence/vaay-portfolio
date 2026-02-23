import puppeteer from "puppeteer";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(ROOT, "public");
const PROJECTS_PATH = resolve(ROOT, "src/data/projects.json");

const VIEWPORT = { width: 1280, height: 800 };
const WAIT_MS = 3000; // wait for page to fully render

// URLs that aren't actual websites (GitHub repos, n8n workflows, etc.)
const SKIP_PATTERNS = [
  "github.com",
  "canva.com",
  "n8n.cloud",
];

function shouldCapture(href) {
  if (!href) return false;
  return !SKIP_PATTERNS.some((pattern) => href.includes(pattern));
}

function getImageFilename(imagePath) {
  // "/findingbh.png" -> "findingbh.png"
  return imagePath.replace(/^\//, "");
}

async function captureScreenshots() {
  const data = JSON.parse(readFileSync(PROJECTS_PATH, "utf-8"));
  const projects = data.projects;

  const toCapture = projects.filter(
    (p) => p.href && p.image && shouldCapture(p.href),
  );

  console.log(`Found ${toCapture.length} projects to capture screenshots for.\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const project of toCapture) {
    const filename = getImageFilename(project.image);
    const outputPath = resolve(PUBLIC, filename);

    // Check if --force flag is passed, otherwise skip existing
    const force = process.argv.includes("--force");
    if (!force && existsSync(outputPath)) {
      console.log(`⏭  Skipping "${project.name}" — ${filename} already exists. Use --force to overwrite.`);
      continue;
    }

    console.log(`📸 Capturing "${project.name}" from ${project.href}...`);

    try {
      const page = await browser.newPage();
      await page.setViewport(VIEWPORT);
      await page.goto(project.href, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // Extra wait for JS-heavy pages to finish rendering
      await new Promise((r) => setTimeout(r, WAIT_MS));

      await page.screenshot({
        path: outputPath,
        type: "png",
        fullPage: false, // only the viewport (hero area)
      });

      await page.close();
      console.log(`   ✅ Saved to ${filename}`);
    } catch (err) {
      console.error(`   ❌ Failed for "${project.name}": ${err.message}`);
    }
  }

  await browser.close();
  console.log("\nDone!");
}

captureScreenshots();
