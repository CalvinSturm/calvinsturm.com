import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { StrictMode, createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const products = ['fastplay', 'fastcast', 'fastclip', 'fastcompress'];

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

const pages = products.flatMap(guideHtmlFiles);
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

    const module = await vite.ssrLoadModule(entry);
    if (typeof module.GuidePage !== 'function') {
      throw new Error(`${entry}: expected a GuidePage export`);
    }

    const rendered = renderToString(
      createElement(StrictMode, null, createElement(module.GuidePage)),
    );
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

  console.log(`Prerendered ${pages.length} guide pages across ${products.length} products.`);
} finally {
  await vite.close();
}
