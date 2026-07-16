> **Superseded (2026-07-16):** analytics are now implemented site-wide via
> Vercel Web Analytics. See `analytics-events.md` for the canonical event
> reference; the notes below are the original planning doc.

# FastCast guides: recommended analytics events

The site currently has no analytics provider, so no tracking was added with the
FastCast guides. These event names follow the same `<product>_<action>`
convention as `fastplay-analytics-events.md`; if a provider is adopted later,
wire both products up at the same time so guide-to-download conversion is
comparable across the Fast Series.

## Events

| Event name | Fires when | Properties |
| --- | --- | --- |
| `fastcast_guide_viewed` | A `/fastcast/guides/*` page loads | `product`, `guide_slug` (article slug or `index`), `source_path`, `referrer_path` |
| `fastcast_download_clicked` | Any "Download FastCast" CTA is clicked | `product`, `source_path`, `cta_location` (`top`, `inline`, `final`, `hero`, `product_cta`), `destination` |
| `fastcast_pro_clicked` | A FastCast Pro CTA is clicked. Blocked for now: Pro activates inside the app via Lemon Squeezy and there is no public checkout URL to link, so no Pro CTA link exists on the site yet. Reserve the name. | `product`, `source_path`, `cta_location`, `destination` |
| `fastcast_related_guide_clicked` | A related-guide or guide-card link is clicked | `product`, `source_path`, `guide_slug` (target), `destination` |

## Shared property conventions

- `product`: `"fastcast"` (lets both product hubs share one dashboard).
- `source_path`: the page path where the click or view happened.
- `guide_slug`: the article slug, or `index` for the guides index.
- `cta_location`: which placement fired (`top`, `inline`, `final`, `hero`, `product_cta`).
- `destination`: the href the user was sent to.
- `referrer_path`: prior on-site path for view events, where available.

## Notes

- The CTA components live in `src/product-guides/ProductGuides.tsx` and are
  shared by FastPlay and FastCast, so click handlers added there instrument
  both products at once.
- The download CTA points at
  `https://github.com/CalvinSturm/FastCast-releases/releases/latest`. GitHub
  release download counts can serve as a rough conversion denominator until
  real analytics exist.
