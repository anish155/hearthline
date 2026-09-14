# Hearthline local web export

This ZIP is a self-contained frontend export of Hearthline. All project source, generated residence imagery, profile imagery, brand mark, and favicon assets are bundled under `client/public/hearthline`, so the app does not depend on hosted Manus storage paths.

## Run locally

1. Open this folder in VS Code.
2. Install Node.js 18 or newer.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite, usually `http://localhost:5173`.

The available routes include `/`, `/listings`, `/property`, `/login`, `/signup`, and `/dashboard`. The dashboard uses the included client-side demo session behavior; it is not connected to a production authentication backend.

## Build checks

Use `npm run check` for TypeScript validation and `npm run build` for a production build. The source uses the existing React, Vite, TypeScript, Wouter, and Tailwind setup from `package.json`.

## Asset note

The export intentionally uses local `/hearthline/...` asset paths instead of `/manus-storage/...` URLs. Some generated scene images are stored as WebP-encoded files with their original project filenames so the UI references remain stable; modern browsers decode them correctly during local development.
