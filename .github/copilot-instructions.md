# Repository Instructions

## Project Shape

- This repository is a static, dependency-free portfolio built with vanilla HTML, CSS, and JavaScript. Keep runtime code compatible with modern browsers and avoid adding dependencies without a clear need.
- The deployed web app lives in `site/`: `index.html`, `style.css`, `app.js`, and its `assets/` and `data/` directories.
- Root `assets/` contains source visuals used by the GitHub profile README. `generate.mjs` regenerates the contribution SVG and copies root assets into `site/assets/`; avoid hand-editing generated copies in `site/assets/` when the source belongs in root `assets/`.
- `scripts/` contains standalone Node.js ES modules for serving the site, fetching contribution data, and building the heatmap. The project requires Node.js 18 or newer and has no npm dependencies.

## Commands

- `npm start` starts the local site server at `http://localhost:3000/` (or the next available port).
- `npm run build` / `npm run generate` regenerates and synchronizes visual assets. This command can modify generated files.
- `npm run build:svg` rebuilds the contribution heatmap SVG from the local data snapshot.
- `npm run contributions` fetches public GitHub contribution data and may require network access.
- There is no configured test or lint script. For JavaScript changes, use `node --check path/to/file.mjs` or `node --check site/app.js` as applicable, and run the site to verify browser-facing behavior.

## Change Guidelines

- Keep the existing Netflix-inspired visual language and responsive behavior when changing the site.
- Preserve the zero-dependency setup and use browser APIs for client-side behavior.
- Keep generated assets synchronized through the existing build script rather than duplicating manual edits.
- Treat `README.md` as the GitHub profile presentation and project documentation; keep its commands and directory overview consistent with the code.