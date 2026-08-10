// Submit URLs to IndexNow, which pushes them to Bing and Yandex instead of
// waiting for the next crawl. No dependencies.
//
//   npm run indexnow                        preview every sitemap URL
//   npm run indexnow -- fastplay            preview specific routes
//   npm run indexnow -- --send              actually submit every sitemap URL
//   npm run indexnow -- --send fastplay     actually submit specific routes
//
// Previewing is the default and submitting requires --send, because this
// reaches an external service and `npm run --` can silently swallow a
// negating flag depending on the shell.
//
// Run this AFTER a deploy is live. IndexNow tells search engines to come and
// fetch, so submitting mid-build points them at the old content.
//
// The key file must stay reachable at the keyLocation below: that is how
// IndexNow verifies the submitter controls the host. It is meant to be public.

import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://www.calvinsturm.com';
const HOST = 'www.calvinsturm.com';
const KEY = '3043e84cbab7f8cc4bb5b9a2b173baf8';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const send = args.includes('--send');
const requested = args.filter((a) => !a.startsWith('--'));

function sitemapUrls() {
  const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8');
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urlList = requested.length
  ? requested.map((u) => (u.startsWith('http') ? u : `${ORIGIN}${u.startsWith('/') ? u : `/${u}`}`))
  : sitemapUrls();

const offSite = urlList.filter((u) => !u.startsWith(`${ORIGIN}/`) && u !== `${ORIGIN}/`);
if (offSite.length) {
  console.error(`Refusing to submit URLs outside ${ORIGIN}:\n  ${offSite.join('\n  ')}`);
  process.exit(1);
}

// Git Bash rewrites a leading-slash argument into a Windows path, so
// "/fastclip/guides" arrives as "C:/Program Files/Git/fastclip/guides".
// Catch that (and any other malformed route) rather than submitting it.
const malformed = urlList.filter((u) => !/^https:\/\/[a-z.]+(\/[A-Za-z0-9._~-]+)*\/?$/.test(u));
if (malformed.length) {
  console.error(
    `Refusing to submit malformed URLs:\n  ${malformed.join('\n  ')}\n\n` +
      'If you are in Git Bash, drop the leading slash ("fastclip/guides") or run this from PowerShell.',
  );
  process.exit(1);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList,
};

console.log(`${send ? 'Submitting' : '[preview] would submit'} ${urlList.length} URL(s) to IndexNow:`);
for (const url of urlList) console.log(`  ${url}`);

if (!send) {
  console.log(`\nPOST ${ENDPOINT}\n${JSON.stringify({ ...payload, urlList: ['...'] }, null, 2)}`);
  console.log('\nNothing was sent. Re-run with --send to submit.');
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

// IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
const body = await response.text();
if (response.status === 200 || response.status === 202) {
  console.log(`\nAccepted: HTTP ${response.status}`);
} else {
  console.error(`\nFailed: HTTP ${response.status} ${response.statusText}\n${body}`);
  process.exit(1);
}
