# Backlink and off-page SEO

Off-page counterpart to `seo-content-backlog.md` (which covers on-page guide
content). Written 2026-08-20; updated 2026-08-21 for FastCast v0.7.0. Current against
FastCast v0.7.0 and FastPlay v0.4.6.

Backlinks cannot be created from this repository. What the repo controls is
whether a page is *easy and safe to link to*: one canonical URL, an accurate
description, a share card that renders, and enough factual detail that a
directory editor or reviewer can write about the product without emailing to
ask. Everything below is split into those two halves.

## Ground rules

Do not pursue paid link placements, link exchanges, private blog networks,
mass directory blasts, or comment/forum link drops. They are the tactics
search engines discount or penalise, and a site this small has no margin for
that. Every target below is either an editorial listing people actually read
or a place where the product genuinely belongs.

Never submit a claim the product does not support. The honesty constraints in
`seo-content-backlog.md` apply to outreach copy too: no "fastest player"
claim without benchmark data, no chroma key for FastCast, no FastShorts
listings while it has no public download.

## Canonical product URLs

Link to these and nothing else. Every submission, README, release note, and
profile field should use the exact form below (`www`, no trailing slash).

| Product | Canonical URL |
| --- | --- |
| FastCast | `https://www.calvinsturm.com/fastcast` |
| FastPlay | `https://www.calvinsturm.com/fastplay` |
| Fast Series hub | `https://www.calvinsturm.com/fast-series` |
| Company | `https://www.calvinsturm.com/` |

Send links to the product page, not the homepage. The product pages carry the
`SoftwareApplication` and `FAQPage` structured data, the download CTA, and the
guide hub, so a link there is worth more than one to the root and converts
better.

## Part 1: repository work (done)

Completed in this pass, all verified by `npm run validate:seo` and `npm run build`:

- **Off-domain share images removed.** All 17 FastCast guide pages pointed
  `og:image`, `twitter:image`, and schema `image` at
  `calvinsturm.github.io/FastCast-releases/assets/fastcast-gui-v0.3.2.png`: a
  stale v0.3.2 screenshot hosted on the duplicate GitHub Pages domain. Now on
  `www.calvinsturm.com`.
- **Oversized share images replaced.** FastPlay's product page, guide hub, and
  8 guides used a 5.8 MB animated GIF as the card image, past the 5 MB ceiling
  several scrapers enforce and slow enough for others to give up. Now a 238 KB
  1280x720 JPEG.
- **FastCast card is landscape.** Was a 728x790 portrait PNG, which
  `summary_large_image` crops badly. Now the 1600x900 demo poster, with
  `og:image:width`/`height`/`alt`.
- **FastCast pricing is accurate in structured data.** The schema advertised a
  single free offer while the page sells a $49 Pro licence. Now a two-offer
  array (Free $0, Pro $49 one-time), so directories categorise it as freemium
  rather than free.
- **FastCast entity linked** to its public releases repo via `sameAs`
  (FastPlay already had `codeRepository`).
- **Origin normalised.** `tech-support.html` and `build.html` used the apex
  domain in structured data and share images while their canonicals used
  `www`.
- **Internal links.** Both product page footers now link the Fast Series hub,
  so `/fastcast` and `/fastplay` are no longer crawl dead ends.
- **Regression guard.** `scripts/validate-seo.mjs` now fails the build if any
  `og:image`/`twitter:image` is off-origin, missing from `public/`, or over
  5 MB. This is the check that would have caught the stale guide images.

## Part 2: external work (Calvin)

### Priority 0: stop competing with yourself (done 2026-08-21)

Two GitHub Pages sites duplicated the product pages and split their link
equity, each with a self-referencing canonical:

- `https://calvinsturm.github.io/FastCast-releases/` (serves from `main` at `/`)
- `https://calvinsturm.github.io/FastPlay/` (serves from `main` at `/docs`)

Both now carry a cross-domain canonical pointing at the calvinsturm.com
product page, with `og:url` (and FastPlay's `SoftwareApplication` schema
`url`, which also claimed the `github.io` address) updated to match. The pages
still work as download destinations; search engines just consolidate the
signals onto the product page now.

Remaining, and it needs a decision because it means deleting files:
`FastCast-releases` ships its own `robots.txt` and `sitemap.xml`, and that
sitemap lists `https://calvinsturm.github.io/FastCast-releases/` as a URL to
index. A sitemap asserting a non-canonical URL works against the canonical tag
just added. Deleting `sitemap.xml` and the `Sitemap:` line in `robots.txt` is
the clean fix. FastPlay has no such files.

The GitHub repo **Website** fields were already set correctly on both repos
(`/fastcast` and `/fastplay`), so nothing was needed there.

### Priority 1: repo-side links back (cheap, immediate)

All in the product repos, not this one:

- Open the README with a line linking the canonical product page and the guide
  hub. `github.com/CalvinSturm/FastPlay` is a real source repo, so its README
  is the single most credible inbound link the project has.
- Add the product page link to each **release body** going forward. Release
  notes get syndicated and scraped more than any other page.
- Add the site to the **GitHub profile** (`github.com/CalvinSturm`) website
  field, and to `github.com/CalvinSturm/CalvinSturm` if a profile README exists.

### Priority 2: software directories

Ordered by realistic value per unit of effort. All are free listings that a
human editor or the community curates, which is why they count.

| Target | Product | Notes |
| --- | --- | --- |
| **AlternativeTo** | Both | Highest value here by a wide margin. FastCast files naturally under "OBS Studio alternatives" and FastPlay under "VLC alternatives", which is exactly how both pages already position themselves. Community-editable, so submit accurately and let it accrue votes. |
| **Product Hunt** | FastPlay first | Launch FastPlay: it is v0.4.6, released (not beta), free, open source, and MIT, which is the easiest story to land. Hold FastCast until it is out of Open Beta and code signed. One shot per product, so do not waste it. |
| **Softpedia** | Both | Editor-reviewed, gives a genuine dofollow listing and often a "100% clean" award page. Expect a review lead time. Requires a stable download URL, which the releases repo provides. |
| **MajorGeeks** | FastCast | Windows-tools audience that matches FastCast precisely. Editorially picky, so submit after code signing if possible. |
| **SourceForge** | FastPlay only | Only meaningful for open source. FastPlay (MIT, Rust) qualifies; FastCast's source is private, so do not list it. |
| **Slant / Awesome lists** | Both | `awesome-windows` and similar curated GitHub lists accept genuine PRs. Read each list's contribution rules first. |
| Windows-focused sites | FastCast | Neowin, Ghacks, and similar cover small Windows utilities. These are pitches, not submissions: see below. |

Submit each product once, to the correct category, with the description block
below. Do not submit FastShorts, FastClip, or FastCompress to directories yet
unless the product has a public download and a stable version.

### Priority 3: editorial pitches

Lower hit rate, much higher value when they land. Pitch the *guide*, not the
product. The guide hub is the asset built for this: `/fastcast/guides` has 16
problem-focused articles and `/fastplay/guides` has 8.

- OBS-alternative and screen-recorder roundups: pitch FastCast with the
  `obs-alternative-windows` guide as evidence the positioning is honest about
  where OBS still wins. v0.7.0 multistreaming is a genuine news hook here:
  publishing one encode to three destinations is the feature these roundups
  actually compare, and it is worth a re-pitch to anyone who passed before.
- Lightweight-video-player roundups: pitch FastPlay, but only once benchmarks
  exist. Without them the "fast" claim is unsupported and a reviewer will say so.
- Creator-tool newsletters and streaming publications: the streaming guides
  (Twitch, Kick, YouTube RTMPS, stream keys, bitrate) are the hook.
- Relevant subreddits and forums: only where a link genuinely answers the
  question asked, and never as a first post. This is a slow, reputational
  channel, not a link tactic.

## At each release

Submit to directories *after* a release ships, not before. Softpedia and
MajorGeeks review the actual binary and their listing records the version, so
a submission made days before a bump starts life stale and needs a re-submit.

The version lives in exactly three places:

1. `src/FastCastV2.tsx`: the `currentVersion` constant (the download URL and
   all three on-page version strings derive from it).
2. `fastcast.html`: `softwareVersion` in the `SoftwareApplication` schema.
3. `fastcast.html`: `downloadUrl` in the same schema.

FastPlay follows the same shape: `currentVersion` in `src/FastPlayV3.tsx`
plus `softwareVersion`, `downloadUrl`, and `releaseNotes` in `fastplay.html`.

Then:

- Bump `<lastmod>` for the product page in `public/sitemap.xml`.
- Run `npm run validate:seo` and `npm run build`.
- After the deploy is live, run `npm run indexnow:send -- fastcast`. This
  reaches Bing and Yandex only. Google does not participate in IndexNow, so
  request a recrawl separately in Search Console.
- Put the canonical product page link in the release body.
- If the release changes anything a listing asserts (version, price, signing
  status, Open Beta), update the existing directory listings rather than
  filing new ones.

## Submission copy

Paste verbatim. These are the facts the product pages already state, so a
directory listing built from them cannot drift from the site.

### FastCast

- **Name:** FastCast
- **Publisher:** Sturm Technologies LLC
- **Version:** 0.7.0 (Open Beta)
- **Platform:** Windows 10 version 20H1 or later, or Windows 11, 64-bit
- **Delivery:** Portable ZIP, no installer. A `.sha256` checksum ships with
  each release, which some directories ask for.
- **Licence:** Freemium. Free tier covers 1080p recording and streaming at
  60 fps with no subscription and no account. Pro is a one-time $49 licence
  adding 1440p and 4K recording, 120 fps capture, multistreaming to up to
  three destinations, and advanced encoder controls.
- **Category:** Screen recorder / live streaming
- **URL:** `https://www.calvinsturm.com/fastcast`
- **Download:** `https://github.com/CalvinSturm/FastCast-releases/releases/latest`

> FastCast is a native Windows screen recorder and live streaming app for
> local MP4 recording, monitor or window capture, desktop and microphone
> audio, webcam overlay, and RTMP/RTMPS streaming. It is built as a simpler
> OBS alternative for focused single-scene work: choose a monitor or window,
> pick your audio, add an optional webcam overlay, then record or go live
> without building a scene first. Destination presets cover YouTube, Twitch,
> Kick, TikTok, Facebook, LinkedIn and custom RTMP, and Pro publishes one
> encode to up to three of them at once. Stream keys are session-only unless
> you opt in to storing them in Windows Credential Manager. A companion
> `fastcastc` command-line tool drives recording from scripts, Stream Deck
> buttons, and schedulers.

Disclose, because directory editors will find it anyway and it costs nothing:
FastCast is unsigned during Open Beta, so Windows SmartScreen may show an
Unknown Publisher warning. Its source is private; the public repo hosts
downloads and version metadata. It has no chroma key, filters, plugins, or
multi-scene production, and OBS remains the better tool for those. A
destination preset is an endpoint, not an official integration or a
certification by that platform.

### FastPlay

- **Name:** FastPlay
- **Publisher:** Sturm Technologies LLC
- **Version:** 0.4.6
- **Platform:** Windows 10 and later, 64-bit
- **Delivery:** MSI installer
- **Licence:** Free and open source, MIT
- **Source:** `https://github.com/CalvinSturm/FastPlay`
- **Category:** Video player
- **URL:** `https://www.calvinsturm.com/fastplay`
- **Download:** `https://github.com/CalvinSturm/FastPlay/releases/latest`

> FastPlay is a fast, lightweight native Windows video player for local files,
> built for responsive seeking, hardware-accelerated decode, and controls that
> stay out of the way. It is written in Rust on FFmpeg demux and decode, D3D11
> hardware decode, DXGI presentation, and WASAPI audio, with bounded queues
> and stale-work dropping so scrubbing stays responsive. It plays MP4, MKV,
> MOV, AVI, and WebM plus common audio formats, resumes where you left off,
> and loads external sidecar `.srt` subtitles.

Disclose: embedded subtitle tracks and non-SRT subtitle formats are not
loaded, and subtitle styling is intentionally minimal. FastPlay does not do
streaming, disc playback, filters, or plugins, and it is Windows only, so VLC
remains the better tool for those. Avoid "fastest" phrasing until benchmarks
are published.

## Open questions

- **Gumroad handle.** The Pro checkout URL is
  `https://calvinstorm.gumroad.com/l/fastcast` ("storm", not "sturm"). If that
  is a typo rather than the registered handle, it is breaking sales and is now
  also in FastCast's structured data. Verify before publishing it anywhere.
- **Code signing.** MajorGeeks, Softpedia, and most Windows editors weigh a
  SmartScreen warning heavily. Signing FastCast is likely the single change
  that most improves directory acceptance.
- **FastPlay share card.** The card is now a correctly sized poster frame from
  the hero video, but it shows a player window on a desktop with no branding.
  A purpose-built 1200x630 card like `og-home.png` would present better
  everywhere FastPlay gets linked.
- **Benchmarks.** Both the FastPlay FAQ and the player roundup pitch are
  blocked on benchmark data. Publishing it unblocks the highest-value FastPlay
  pitch and the `/fastplay/guides` comparison article.
