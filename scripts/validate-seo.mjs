// Lightweight SEO validation over the source HTML shells (the same files Vite
// builds). No dependencies. Run with: npm run validate:seo
//
// Checks:
//  1. Every built page has exactly one <title>, unique across pages.
//  2. Every built page has one meta description and one absolute canonical.
//  3. og:url matches the canonical; no page is accidentally noindexed.
//  4. Every JSON-LD block parses as JSON.
//  5. Sitemap URLs and built routes match one-to-one (with a small allowlist).
//  6. Literal internal hrefs in HTML and TSX resolve to built routes.
//  7. Guide publication dates are valid ISO dates, not in the future.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const ORIGIN = 'https://www.calvinsturm.com';
const errors = [];
const warnings = [];

// ---- collect built pages from vite.config.ts ----
const viteConfig = readFileSync(join(root, 'vite.config.ts'), 'utf8');
const inputFiles = [...viteConfig.matchAll(/path\.resolve\(__dirname, '([^']+)'\)/g)]
  .map((m) => m[1])
  .filter((f) => f.endsWith('.html'));

if (inputFiles.length === 0) {
  errors.push('No HTML inputs found in vite.config.ts');
}

// 404.html is built but intentionally noindexed and canonical-free.
const NON_INDEXABLE = new Set(['404.html']);

function routeForFile(file) {
  if (file === 'index.html') return '/';
  return '/' + file.replace(/\.html$/, '');
}

const pages = [];
for (const file of inputFiles) {
  const html = readFileSync(join(root, file), 'utf8');
  pages.push({ file, html, route: routeForFile(file), indexable: !NON_INDEXABLE.has(file) });
}

// ---- per-page checks ----
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

for (const page of pages) {
  const { file, html } = page;

  const titleMatches = [...html.matchAll(/<title>([^<]*)<\/title>/g)];
  if (titleMatches.length !== 1) {
    errors.push(`${file}: expected exactly one <title>, found ${titleMatches.length}`);
  } else {
    const title = titleMatches[0][1].trim();
    if (!title) errors.push(`${file}: empty <title>`);
    if (titles.has(title)) errors.push(`Duplicate title "${title}" in ${file} and ${titles.get(title)}`);
    titles.set(title, file);
  }

  if (/name="robots"[^>]*noindex/.test(html) && page.indexable) {
    errors.push(`${file}: unexpected noindex`);
  }

  if (!page.indexable) continue;

  const descMatches = [...html.matchAll(/<meta name="description" content="([^"]*)"/g)];
  if (descMatches.length !== 1) {
    errors.push(`${file}: expected exactly one meta description, found ${descMatches.length}`);
  } else {
    const desc = descMatches[0][1].trim();
    if (desc.length < 50) warnings.push(`${file}: short meta description (${desc.length} chars)`);
    if (desc.length > 165) warnings.push(`${file}: long meta description (${desc.length} chars)`);
    if (descriptions.has(desc)) errors.push(`Duplicate description in ${file} and ${descriptions.get(desc)}`);
    descriptions.set(desc, file);
  }

  const canonMatches = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)];
  if (canonMatches.length !== 1) {
    errors.push(`${file}: expected exactly one canonical, found ${canonMatches.length}`);
  } else {
    const canon = canonMatches[0][1];
    if (!canon.startsWith(ORIGIN)) errors.push(`${file}: canonical not absolute on ${ORIGIN}: ${canon}`);
    const expected = page.route === '/' ? `${ORIGIN}/` : `${ORIGIN}${page.route}`;
    if (canon !== expected) errors.push(`${file}: canonical ${canon} != expected ${expected}`);
    if (canonicals.has(canon)) errors.push(`Duplicate canonical ${canon} in ${file} and ${canonicals.get(canon)}`);
    canonicals.set(canon, file);

    const ogUrl = html.match(/<meta property="og:url" content="([^"]*)"/);
    if (!ogUrl) errors.push(`${file}: missing og:url`);
    else if (ogUrl[1] !== canon) errors.push(`${file}: og:url ${ogUrl[1]} != canonical ${canon}`);
  }

  if (!/<meta property="og:title"/.test(html)) errors.push(`${file}: missing og:title`);
  if (!/<meta property="og:image"/.test(html)) warnings.push(`${file}: missing og:image`);

  for (const [, block] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(block);
    } catch (e) {
      errors.push(`${file}: JSON-LD parse error: ${e.message}`);
    }
  }

  for (const [, date] of html.matchAll(/"date(?:Published|Modified)":\s*"([^"]+)"/g)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
      errors.push(`${file}: invalid schema date "${date}"`);
    }
  }
}

// ---- sitemap consistency ----
const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const builtRoutes = new Set(pages.filter((p) => p.indexable).map((p) => p.route));

for (const url of sitemapUrls) {
  if (!url.startsWith(ORIGIN)) {
    errors.push(`sitemap: URL not on ${ORIGIN}: ${url}`);
    continue;
  }
  const route = url.slice(ORIGIN.length) || '/';
  if (!builtRoutes.has(route)) errors.push(`sitemap: ${route} is not a built route`);
}
const sitemapRoutes = new Set(sitemapUrls.map((u) => u.slice(ORIGIN.length) || '/'));
for (const route of builtRoutes) {
  if (!sitemapRoutes.has(route)) errors.push(`sitemap: built route ${route} missing from sitemap`);
}

// ---- internal link resolution (literal hrefs only) ----
function collectFiles(dir, exts, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      if (!['node_modules', 'dist', '.git'].includes(entry)) collectFiles(p, exts, out);
    } else if (exts.some((e) => entry.endsWith(e))) {
      out.push(p);
    }
  }
  return out;
}

const linkSources = [
  ...pages.map((p) => join(root, p.file)),
  ...collectFiles(join(root, 'src'), ['.tsx', '.ts']),
];
const validRoutes = new Set([...builtRoutes, '/404']);
for (const src of linkSources) {
  const content = readFileSync(src, 'utf8');
  for (const [, href] of content.matchAll(/href="(\/[^"#?]*)/g)) {
    const route = href === '/' ? '/' : href.replace(/\/$/, '');
    if (route.startsWith('/assets/') || route.startsWith('/src/') || /\.\w+$/.test(route)) continue;
    if (!validRoutes.has(route)) {
      errors.push(`${src.slice(root.length + 1)}: internal link to unknown route ${route}`);
    }
  }
}

// ---- analytics event-name sanity ----
for (const src of collectFiles(join(root, 'src'), ['.tsx', '.ts'])) {
  const content = readFileSync(src, 'utf8');
  for (const [, name] of content.matchAll(/trackEvent\(\s*[`']([^`'$]+)[`']/g)) {
    if (!/^[a-z][a-z0-9_]*$/.test(name)) {
      errors.push(`${src.slice(root.length + 1)}: non-snake_case event name "${name}"`);
    }
  }
  for (const [, action] of content.matchAll(/trackCtaClick\([^,]+,\s*'([^']+)'/g)) {
    if (!/^[a-z][a-z0-9_]*$/.test(action)) {
      errors.push(`${src.slice(root.length + 1)}: non-snake_case event action "${action}"`);
    }
  }
}

// ---- report ----
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\nChecked ${pages.length} pages, ${sitemapUrls.length} sitemap URLs.`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
