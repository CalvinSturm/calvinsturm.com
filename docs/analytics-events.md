# Analytics events

The site uses **Vercel Web Analytics** as its only analytics provider, wrapped
by `src/lib/analytics.ts`. The wrapper injects `/_vercel/insights/script.js`
(production builds only), queues events until the script loads, dedupes
identical events fired within one second, and swallows every failure so
analytics can never break navigation or a download click.

**Activation requirement:** Web Analytics must be enabled for the project in
the Vercel dashboard (Project → Analytics → Enable). Until then the script
returns 404 (harmless, `defer`red) and no data is collected. Custom events
additionally require a Vercel plan that includes them; pageviews work on the
free tier.

No cookies are set and no personal data is collected: event properties are
limited to product, path, CTA placement, and destination URL.

## Naming convention

`<product>_<action>` with snake_case actions, e.g. `fastcompress_download_clicked`.
Product-prefixed names keep each product's funnel visible in the Vercel events
list without needing property filters.

## Events

| Event name | Fires when | Properties |
| --- | --- | --- |
| `<product>_download_clicked` | A download CTA is clicked. On product pages this is any GitHub `/releases` link (hero, hero_secondary, final). On guide pages it is the primary guide CTA (top, inline, final). For FaceForge it is the itch.io download link. Products: `fastcast`, `fastplay`, `fastclip`, `fastcompress`, `faceforge`. | `product`, `source_path`, `cta_location`, `destination` |
| `<product>_github_clicked` | A non-release GitHub link in a product hero is clicked (e.g. FastPlay "View source"). Also `localagent_github_clicked` for the LocalAgent repo CTA. | `product`, `source_path`, `cta_location`, `destination` |
| `localagent_release_clicked` | The LocalAgent Releases CTA is clicked. | `product`, `source_path`, `cta_location`, `destination` |
| `<product>_guide_viewed` | A `/<product>/guides/*` page loads (`guide_slug` is the article slug, or `index` for the hub page). Products: `fastcast`, `fastplay`, `fastclip`, `fastcompress`. | `product`, `guide_slug`, `source_path`, `referrer_path` |
| `<product>_guide_product_cta_clicked` | The secondary CTA on a guide (link to the product page) is clicked. | `product`, `source_path`, `cta_location`, `destination` |
| `<product>_related_guide_clicked` | A guide card (related-guides list or guides index) is clicked. | `product`, `source_path`, `guide_slug` (target), `destination` |

### Property conventions

- `product`: product slug (`fastcast`, `fastplay`, `fastclip`, `fastcompress`, `faceforge`, `localagent`).
- `source_path`: `location.pathname` where the event fired.
- `cta_location`: `hero`, `hero_secondary`, `top`, `inline`, `final`, or `product_cta`.
- `destination`: the href the user was sent to.
- `guide_slug`: article slug, or `index` for a guides hub.
- `referrer_path`: `document.referrer` for view events (may be empty).

## Known measurement limitations (do not fake these)

- **Purchase completion cannot be measured from the website.** FastCast Pro
  activates inside the app via Lemon Squeezy and there is no public checkout
  URL, so there is no `checkout_opened` or purchase event. GitHub release
  download counts and itch.io dashboards are the closest conversion
  denominators.
- **`pricing_cta_clicked` is reserved but unused**: pricing sections currently
  contain no links.
- **`signup_submitted` is reserved but unused**: the site has no email or beta
  signup form.
- Download clicks measure intent, not completed installs; GitHub does the
  actual file serving.

## Wiring map

- `src/lib/analytics.ts`: provider wrapper (`trackEvent`, `trackCtaClick`).
- `src/product-guides/ProductGuides.tsx`: guide views, guide download CTAs,
  guide→product CTAs, guide-card clicks (instruments all four guide hubs at
  once).
- `src/FastSeriesShared.tsx`: product hero and final CTAs (`trackProductCta`).
- `src/FaceForgeApp.tsx`: itch.io download CTAs.
- `src/LocalAgentApp.tsx`: repo and releases CTAs.

The older per-product notes in `fastplay-analytics-events.md` and
`fastcast-analytics-events.md` predate the implementation; this file is the
canonical reference.
