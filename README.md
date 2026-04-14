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

## Project structure

```text
src/
  App.tsx                Main homepage and all marketing sections
  TechHelpCarousel.tsx   3D interactive carousel
  main.tsx               App entry point
  index.css              Global styles

public/
  techWizIcon.png
  favicon.ico
  favicon.svg
  5CitiesMap.png

assets/
  Source image assets used during design
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

No environment variables are required for the current site to run locally.

There is a leftover `GEMINI_API_KEY` define in [vite.config.ts](C:\Users\Calvin\Software Projects\TECHWIZ\1\calvinsturm.com\vite.config.ts), but the current codebase does not use the Gemini SDK at runtime.

## Notes

- The request form currently shows a local success state and does not submit to a backend.
- Service area messaging is driven by lookup data inside `src/App.tsx`.
- `metadata.json` still contains earlier wireframe metadata and is not the main source of truth for the site behavior.
