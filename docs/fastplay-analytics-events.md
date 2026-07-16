> **Superseded (2026-07-16):** analytics are now implemented site-wide via
> Vercel Web Analytics. See `analytics-events.md` for the canonical event
> reference; the notes below are the original planning doc.

# FastPlay guides: recommended analytics events

The site currently has no analytics provider, so no tracking was added with the
FastPlay guides. If a provider is adopted later (for a static Vite + Vercel
site, Vercel Web Analytics or Plausible are the low-friction options), wire up
these events so guide-to-download conversion is measurable from day one.

## Events

| Event name | Fires when | Properties |
| --- | --- | --- |
| `fastplay_guide_viewed` | A `/fastplay/guides/*` page loads | `slug` (article slug or `index`), `path` |
| `fastplay_download_clicked` | Any "Download FastPlay" CTA is clicked | `source_path`, `placement` (`top`, `inline`, `final`, `hero`, `product_cta`) |
| `fastplay_pro_clicked` | Not applicable yet: FastPlay has no Pro tier (free, MIT). Reserve the name in case a Pro tier ships. | `source_path`, `placement` |
| `fastplay_related_guide_clicked` | A related-guide or guide-card link is clicked | `source_path`, `target_slug` |

## Notes

- Always include the source page path so per-article conversion can be
  compared; the CTA components in `src/product-guides/ProductGuides.tsx`
  (shared by FastPlay and FastCast guides) are the single place to add the
  click handlers.
- The download CTA points at
  `https://github.com/CalvinSturm/FastPlay/releases/latest`. GitHub release
  download counts (via the GitHub API) can serve as a rough conversion
  denominator until real analytics exist.
