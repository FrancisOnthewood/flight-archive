import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const metadataDir = resolve(root, "dist", ".openai");

await mkdir(metadataDir, { recursive: true });
await copyFile(
  resolve(root, ".openai", "hosting.json"),
  resolve(metadataDir, "hosting.json")
);
