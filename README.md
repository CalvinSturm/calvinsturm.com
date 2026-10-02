# calvinsturm.com

Website for Sturm Technologies LLC: the Fast Series store (FastCast, FastPlay, FastClip, FastCompress, FastShorts), product guides, roadmap, projects, and build services.

## Stack

- React 19
- TypeScript
- Vite 6 (multi-page app, every route prerendered by `scripts/prerender.mjs`)
- Tailwind CSS 4
- `lucide-react` for icons
- `@react-three/fiber` and `@react-three/drei` for the 3D store shelf
- `motion` for UI animation

## Project structure

```text
*.html, fastcast/, ...   Page shells, one per route (registered in vite.config.ts)
src/                     Page entries (*.tsx) and React components
scripts/prerender.mjs    Prerenders every route after the Vite build
api/marketplace/         FastMedia account + entitlement service
public/                  Static assets, sitemap, downloads
docs/                    Marketing, pricing, SEO and account-service notes
```

## Development

Prerequisite: Node.js 18+

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

The Vite dev server is configured in `package.json` to run on port `3000` and bind to `0.0.0.0`.

## Available scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run clean
```

`npm run lint` runs TypeScript with `--noEmit`.

## Environment variables

The marketing site requires no runtime environment variables.

The FastMedia account API requires production secrets described in `docs/FASTMEDIA_ACCOUNT_SERVICE.md`. Do not commit service-role database credentials or the Ed25519 signing seed.

There is a leftover `GEMINI_API_KEY` define in `vite.config.ts`, but the current codebase does not use the Gemini SDK at runtime.

## Notes

- `metadata.json` still contains earlier wireframe metadata and is not the main source of truth for the site behavior.
