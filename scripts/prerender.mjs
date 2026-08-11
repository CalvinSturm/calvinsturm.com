// Render every route to static HTML at build time and inject it into the Vite
// output. Run after `vite build` (see the build script in package.json).
//
// Without this, each shell ships an empty <div id="root"> and a module script:
// crawlers that do not execute JavaScript see a blank body and no internal
// links, and crawlers that do execute it have to wait for a render queue.
// Entries mount through src/lib/mountPage.tsx, which hydrates the injected
// HTML instead of discarding it.

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { StrictMode, createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

// Products whose guide hub and articles live under <product>/guides/.
const guideProducts = ['fastplay', 'fastcast', 'fastclip', 'fastcompress'];

// Standalone product and marketing routes.
const standalonePages = [
  'index.html',
  'fast-series.html',
  'fastcast.html',
  'fastplay.html',
  'fastclip.html',
  'fastcompress.html',
  'fastshorts.html',
  'roadmap.html',
  'projects.html',
  'tech-support.html',
  'build.html',
  'localagent.html',
  'faceforge.html',
  'videoforge.html',
];

// fastplay-v2.html is a noindexed design preview and 404.html is an error
// shell; neither is a route worth prerendering.

function guideHtmlFiles(product) {
  const guideDir = join(root, product, 'guides');
  return [
    `${product}/guides.html`,
    ...readdirSync(guideDir)
      .filter((name) => name.endsWith('.html'))
      .sort()
      .map((name) => `${product}/guides/${name}`),
  ];
}

const pages = [...guideProducts.flatMap(guideHtmlFiles), ...standalonePages];
const vite = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  for (const page of pages) {
    const sourceHtml = readFileSync(join(root, page), 'utf8');
    const entry = sourceHtml.match(/<script\s+type="module"\s+src="([^"]+)"/i)?.[1];
    if (!entry) throw new Error(`${page}: module entry was not found`);

    // Guide entries predate the shared mountPage helper and still export
    // GuidePage; every other route exports Page.
    const module = await vite.ssrLoadModule(entry);
    const Component = module.Page ?? module.GuidePage;
    if (typeof Component !== 'function') {
      throw new Error(`${entry}: expected a Page (or GuidePage) export`);
    }

    const rendered = renderToString(createElement(StrictMode, null, createElement(Component)));
    const h1Count = (rendered.match(/<h1(?:\s|>)/gi) ?? []).length;
    if (h1Count !== 1) {
      throw new Error(`${page}: expected exactly one prerendered H1, found ${h1Count}`);
    }
    const wordCount = rendered
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean).length;
    if (wordCount < 100) {
      throw new Error(`${page}: prerendered content is unexpectedly short (${wordCount} words)`);
    }

    const outputPath = join(dist, page);
    if (!existsSync(outputPath)) throw new Error(`${page}: Vite output was not found`);

    const outputHtml = readFileSync(outputPath, 'utf8');
    const emptyRoot = '<div id="root"></div>';
    if (!outputHtml.includes(emptyRoot)) {
      throw new Error(`${page}: expected an empty root before prerendering`);
    }

    writeFileSync(
      outputPath,
      outputHtml.replace(emptyRoot, `<div id="root">${rendered}</div>`),
      'utf8',
    );
  }

  console.log(`Prerendered ${pages.length} pages.`);
} finally {
  await vite.close();
}
