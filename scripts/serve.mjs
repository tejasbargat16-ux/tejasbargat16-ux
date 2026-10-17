#!/usr/bin/env node
/**
 * Lightweight local development server for the Netflix-themed portfolio.
 * Serves static files from the project root and site/ directory with
 * full MIME-type resolution, caching headers, and automatic port fallback.
 * Zero npm dependencies required.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SITE_DIR = path.resolve(ROOT_DIR, "site");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};

function resolvePath(urlPath) {
  const cleanUrl = urlPath.split("?")[0].split("#")[0];
  const decoded = decodeURIComponent(cleanUrl);

  // Normalize path
  let relativePath = decoded.replace(/^\/+/, "");
  if (!relativePath || relativePath === "") {
    relativePath = "index.html";
  }

  // Check in site/ first, then in project root
  const candidates = [
    path.join(SITE_DIR, relativePath),
    path.join(ROOT_DIR, relativePath),
  ];

  if (!path.extname(relativePath)) {
    candidates.unshift(path.join(SITE_DIR, relativePath, "index.html"));
    candidates.push(path.join(ROOT_DIR, relativePath, "index.html"));
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  // Fallback to site/index.html for SPA routes
  const siteIndex = path.join(SITE_DIR, "index.html");
  if (fs.existsSync(siteIndex)) {
    return siteIndex;
  }

  return null;
}

const server = http.createServer((req, res) => {
  const filePath = resolvePath(req.url);

  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`500 Server Error: ${err.message}`);
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
    });
    res.end(content);
  });
});

const DEFAULT_PORT = parseInt(process.env.PORT || "3000", 10);

function startServer(port) {
  server.listen(port, () => {
    console.log(`\n🍿 [TEJASFLIX] Netflix Portfolio Dev Server running at:`);
    console.log(`   ➜ Local:   http://localhost:${port}/`);
    console.log(`   ➜ Assets:  http://localhost:${port}/assets/`);
    console.log(`   ➜ Press Ctrl+C to stop.\n`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer(DEFAULT_PORT);
