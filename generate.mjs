#!/usr/bin/env node
/**
 * Root generation script for tejasbargat16-ux-netflix portfolio assets.
 * Re-renders the contribution snake SVG and ensures all assets are consistent.
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🎬 [TEJASFLIX] Starting asset build & generation pipeline...");

// Heatmap generation skipped when SVG assets are removed
// const heatmapScript = path.join(__dirname, "scripts", "build-heatmap-svg.mjs");

// Verify essential assets
const requiredAssets = [
  "assets/tejas-cyber-banner.png",
];

let missing = 0;
for (const rel of requiredAssets) {
  const full = path.join(__dirname, rel);
  if (!fs.existsSync(full)) {
    console.warn(`⚠️ Warning: Missing asset ${rel}`);
    missing++;
  }
}

// Sync assets to site/assets for GitHub Pages compatibility
const siteAssetsDir = path.join(__dirname, "site", "assets");
fs.mkdirSync(siteAssetsDir, { recursive: true });
const assetsDir = path.join(__dirname, "assets");
if (fs.existsSync(assetsDir)) {
  for (const file of fs.readdirSync(assetsDir)) {
    fs.copyFileSync(path.join(assetsDir, file), path.join(siteAssetsDir, file));
  }
  console.log("📦 Synced assets → site/assets/ for web deployment.");
}

if (missing === 0) {
  console.log("✅ All portfolio assets verified and ready to stream!");
} else {
  console.log(`ℹ️ Build finished with ${missing} warnings.`);
}
