import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const publicDir = resolve(root, "public");

await mkdir(publicDir, { recursive: true });
await Promise.all([
  copyFile(resolve(root, "index.html"), resolve(publicDir, "atlas.html")),
  copyFile(resolve(root, "styles.css"), resolve(publicDir, "styles.css")),
  copyFile(resolve(root, "app.js"), resolve(publicDir, "app.js"))
]);
