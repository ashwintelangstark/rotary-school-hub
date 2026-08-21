import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, "../.output/public");
const indexHtmlPath = path.join(publicDir, "index.html");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("Index HTML file not found in build output!");
  process.exit(1);
}

const routes = [
  "about",
  "admissions",
  "calendar",
  "faculty",
  "gallery",
  "organizations"
];

console.log("Generating static route fallbacks...");
const indexContent = fs.readFileSync(indexHtmlPath, "utf-8");

routes.forEach((route) => {
  const routeDir = path.join(publicDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  const routeHtmlPath = path.join(routeDir, "index.html");
  fs.writeFileSync(routeHtmlPath, indexContent, "utf-8");
  console.log(`Created fallback for route: /${route}`);
});

console.log("Static SPA build post-processing complete!");
