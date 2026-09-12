# Tech Wiz Website

Marketing site for Tech Wiz, an in-home tech support service serving the Five Cities and nearby Central Coast areas.

## Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- `lucide-react` for icons
- `@react-three/fiber` and `@react-three/drei` for the interactive help carousel
- `motion` for UI animation

## What is in the app

- Marketing homepage with sections for trust points, process, services, pricing, service area, FAQ, and callback CTA
- Interactive service-area lookup for supported cities and ZIP codes
- Request-callback form with client-side state only
- Theme toggle with light/dark preference saved in `localStorage`
- 3D animated `TechHelpCarousel` component for common support scenarios
- FastMedia marketplace static catalog under `/fastmedia-marketplace/`
- FastMedia marketplace account API under `/api/marketplace/` plus browser device sign-in at `/fastmedia-account.html`

## Project structure

```text
src/
  App.tsx                Main homepage and all marketing sections
  TechHelpCarousel.tsx   3D interactive carousel
  main.tsx               App entry point
  index.css              Global styles

api/marketplace/         FastMedia account + entitlement service
public/
  fastmedia-account.html FastMedia browser/device authorization page
  techWizIcon.png
  favicon.ico
  favicon.svg
  5CitiesMap.png

docs/
  FASTMEDIA_ACCOUNT_SERVICE.md
  fastmedia-account-service.sql
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

- The request form currently shows a local success state and does not submit to a backend.
- Service area messaging is driven by lookup data inside `src/App.tsx`.
- `metadata.json` still contains earlier wireframe metadata and is not the main source of truth for the site behavior.
