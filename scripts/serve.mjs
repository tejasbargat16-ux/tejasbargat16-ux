#!/usr/bin/env node
/**
 * Lightweight local development server for the Netflix-themed portfolio.
 * Serves the production static files from site/ with
 * full MIME-type resolution, caching headers, and automatic port fallback.
 * Zero npm dependencies required.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_DIR = path.resolve(__dirname, "..", "site");

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
  let pathname;
  try {
    pathname = new URL(urlPath, "http://localhost").pathname;
  } catch {
    return null;
  }

  let relativePath;
  try {
    relativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
  } catch {
    return null;
  }

  const requestedFile = path.resolve(SITE_DIR, relativePath || "index.html");
  if (
    requestedFile.startsWith(`${SITE_DIR}${path.sep}`) &&
    fs.existsSync(requestedFile) &&
    fs.statSync(requestedFile).isFile()
  ) {
    return requestedFile;
  }

  // Only extensionless routes are application routes. Missing files must stay
  // missing so browsers do not receive HTML in place of CSS, JS, or images.
  if (!path.extname(relativePath)) {
    const routeIndex = path.resolve(SITE_DIR, relativePath, "index.html");
    if (
      routeIndex.startsWith(`${SITE_DIR}${path.sep}`) &&
      fs.existsSync(routeIndex) &&
      fs.statSync(routeIndex).isFile()
    ) {
      return routeIndex;
    }

    return path.join(SITE_DIR, "index.html");
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
let currentPort = DEFAULT_PORT;

// Register the error handler once to avoid listener accumulation when
// retrying ports (previous implementation added a new listener per retry,
// eventually triggering MaxListenersExceededWarning).
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.warn(`Port ${currentPort} in use, trying ${currentPort + 1}...`);
    currentPort += 1;
    server.listen(currentPort);
  } else {
    console.error("Server error:", err);
  }
});

server.listen(DEFAULT_PORT, () => {
  console.log(`\n\uD83C\uDF7F [TEJASFLIX] Netflix Portfolio Dev Server running at:`);
  console.log(`   \u279C Local:   http://localhost:${currentPort}/`);
  console.log(`   \u279C Assets:  http://localhost:${currentPort}/assets/`);
  console.log(`   \u279C Press Ctrl+C to stop.\n`);
});
