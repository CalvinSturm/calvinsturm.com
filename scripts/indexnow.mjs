// Submit URLs to IndexNow so participating search engines refetch them
// instead of waiting for their next crawl. No dependencies.
//
// IndexNow reaches Bing and Yandex (plus Seznam and Naver). Google does NOT
// participate: it has never joined IndexNow and ignores these submissions
// entirely. Getting a URL recrawled by Google is a separate job, done through
// the URL Inspection tool in Google Search Console or by resubmitting the
// sitemap. Nothing in this script affects Google in any way.
//
//   npm run indexnow                     preview every sitemap URL
//   npm run indexnow -- fastplay         preview specific routes
//   npm run indexnow:send                submit every sitemap URL
//   npm run indexnow:send -- fastplay    submit specific routes
//
// Previewing is the default and submitting requires --send. Do not try to
// pass that flag yourself: `npm run indexnow -- --send` silently drops it in
// PowerShell, so the run previews when you meant it to submit. The
// indexnow:send script bakes the flag into the command instead, which works
// in every shell. Positional route arguments after `--` do pass through
// reliably.
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

console.log(
  `${send ? 'Submitting' : '[preview] would submit'} ${urlList.length} URL(s) to IndexNow ` +
    '(Bing and Yandex; Google does not participate):',
);
for (const url of urlList) console.log(`  ${url}`);

if (!send) {
  console.log(`\nPOST ${ENDPOINT}\n${JSON.stringify({ ...payload, urlList: ['...'] }, null, 2)}`);
  console.log('\nNothing was sent. Run `npm run indexnow:send` to submit.');
  console.log('Do not use `npm run indexnow -- --send`: PowerShell drops the flag.');
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
