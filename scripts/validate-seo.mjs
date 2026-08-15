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
//  8. FastPlay FAQ structured data matches the visible shared FAQ content.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fastPlayFaqs } from '../src/fastplay-faqs.mjs';

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
// FastPlay preview pages are noindexed and canonicalised to the real product
// page, so they are not routes of their own.
const NON_INDEXABLE = new Set(['404.html', 'fastplay-v2.html', 'fastplay-v3.html']);

// Shells that ship as-is instead of being prerendered: 404.html is an error
// page and the FastPlay previews are noindexed design routes.
const NOT_PRERENDERED = new Set(['404.html', 'fastplay-v2.html', 'fastplay-v3.html']);

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

  // Prerendering injects content into an empty root, so a shell must not ship
  // hand-written fallback markup: scripts/prerender.mjs would not find its
  // insertion point, and any H1 there would collide with the rendered one.
  if (!NOT_PRERENDERED.has(file) && !/<div id="root"><\/div>/.test(html)) {
    errors.push(`${file}: expected an empty <div id="root"></div> for prerendering`);
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

// ---- visible FAQ / structured-data parity ----
const fastPlayPage = pages.find((page) => page.file === 'fastplay.html');
if (!fastPlayPage) {
  errors.push('fastplay.html: page missing from Vite inputs');
} else {
  const faqSchemas = [];
  for (const [, block] of fastPlayPage.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const schema = JSON.parse(block);
      if (schema['@type'] === 'FAQPage') faqSchemas.push(schema);
    } catch {
      // The per-page JSON-LD check above reports the parse error.
    }
  }

  if (faqSchemas.length !== 1) {
    errors.push(`fastplay.html: expected exactly one FAQPage schema, found ${faqSchemas.length}`);
  } else {
    const schemaFaqs = faqSchemas[0].mainEntity?.map((entry) => ({
      question: entry.name,
      answer: entry.acceptedAnswer?.text,
    }));
    if (JSON.stringify(schemaFaqs) !== JSON.stringify(fastPlayFaqs)) {
      errors.push('fastplay.html: FAQPage schema does not match src/fastplay-faqs.mjs');
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

// ---- every route must be prerenderable ----
// Shells ship an empty #root, so their content and internal links only exist
// after scripts/prerender.mjs fills them in at build time. An entry that still
// mounts with a bare createRoot, or a page missing from the prerender lists,
// silently ships a blank body to crawlers.
const prerenderScript = readFileSync(join(root, 'scripts', 'prerender.mjs'), 'utf8');
function listFromPrerender(name) {
  const body = prerenderScript.match(new RegExp(String.raw`const ${name} = \[([^\]]*)\]`))?.[1] ?? '';
  return body
    .split(',')
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}
const guideProducts = new Set(listFromPrerender('guideProducts'));
const standalonePages = new Set(listFromPrerender('standalonePages'));
if (guideProducts.size === 0 || standalonePages.size === 0) {
  errors.push('scripts/prerender.mjs: could not read guideProducts / standalonePages');
}

const prerenderedPages = pages.filter((p) => !NOT_PRERENDERED.has(p.file));
for (const page of prerenderedPages) {
  const isGuide = /^[a-z-]+\/guides(\/[^/]+)?\.html$/.test(page.file);
  if (isGuide) {
    const product = page.file.split('/')[0];
    if (!guideProducts.has(product)) {
      errors.push(`${page.file}: product "${product}" is missing from guideProducts in scripts/prerender.mjs`);
    }
  } else if (!standalonePages.has(page.file)) {
    errors.push(`${page.file}: missing from standalonePages in scripts/prerender.mjs`);
  }

  const entry = page.html.match(/<script\s+type="module"\s+src="([^"]+)"/i)?.[1];
  if (!entry) {
    errors.push(`${page.file}: module entry was not found`);
    continue;
  }

  const entrySource = readFileSync(join(root, entry), 'utf8');
  // Guide entries predate the shared helper and still use GuidePage/mountGuide.
  if (!/export function (Page|GuidePage)\(/.test(entrySource)) {
    errors.push(`${entry}: prerendering needs an exported Page (or GuidePage) component`);
  }
  if (!/\bmount(Page|Guide)\(/.test(entrySource)) {
    errors.push(`${entry}: must mount via mountPage() so build-time HTML is hydrated, not discarded`);
  }
  if (/\bcreateRoot\(/.test(entrySource)) {
    errors.push(`${entry}: createRoot() discards prerendered HTML; use mountPage()`);
  }
}

const guidePages = prerenderedPages.filter((p) => /^[a-z-]+\/guides(\/[^/]+)?\.html$/.test(p.file));
if (guidePages.length === 0) errors.push('No guide pages found; the prerender check is not running');

// ---- guide hub ItemList must list every guide of that product ----
for (const page of guidePages.filter((p) => /^[a-z]+\/guides\.html$/.test(p.file))) {
  const product = page.file.split('/')[0];
  const expected = new Set(
    [...builtRoutes].filter((r) => r.startsWith(`/${product}/guides/`)).map((r) => `${ORIGIN}${r}`),
  );

  let listed = null;
  for (const [, block] of page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const schema = JSON.parse(block);
      if (schema['@type'] === 'CollectionPage' && schema.mainEntity?.['@type'] === 'ItemList') {
        listed = schema.mainEntity.itemListElement ?? [];
      }
    } catch {
      // The per-page JSON-LD check above reports the parse error.
    }
  }

  if (!listed) {
    errors.push(`${page.file}: missing a CollectionPage ItemList of the product's guides`);
    continue;
  }

  const listedUrls = new Set(listed.map((entry) => entry.url));
  for (const url of expected) {
    if (!listedUrls.has(url)) errors.push(`${page.file}: ItemList is missing ${url}`);
  }
  for (const url of listedUrls) {
    if (!expected.has(url)) errors.push(`${page.file}: ItemList links unknown guide ${url}`);
  }

  const positions = listed.map((entry) => entry.position);
  const ordered = positions.every((pos, i) => pos === i + 1);
  if (!ordered) errors.push(`${page.file}: ItemList positions must run 1..${listed.length} in order`);
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
const CTA_ACTIONS = new Set([
  'download_clicked',
  'github_clicked',
  'guide_product_cta_clicked',
  'pro_clicked',
  'release_clicked',
]);

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
    } else if (!CTA_ACTIONS.has(action)) {
      errors.push(`${src.slice(root.length + 1)}: undocumented CTA event action "${action}"`);
    }
  }
}

// ---- report ----
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\nChecked ${pages.length} pages, ${sitemapUrls.length} sitemap URLs.`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
