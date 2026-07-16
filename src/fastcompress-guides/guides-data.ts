// Single source of truth for FastCompress guide metadata.
// Used by the guides index page, each article layout (breadcrumbs, related
// guides), and the FastCompress product page guide section. Add new guides
// here first; the index and related-guide lists pick them up automatically.

import type { GuideMeta } from '../product-guides/ProductGuides.tsx';

export const fastCompressPath = '/fastcompress';
export const guidesIndexPath = '/fastcompress/guides';

export const fastCompressDownloadUrl = 'https://github.com/CalvinSturm/FastCompress-Releases/releases/latest';
export const fastCompressAllReleasesUrl = 'https://github.com/CalvinSturm/FastCompress-Releases/releases';

export type GuideCategory = 'Size Limits';

export const guides: Array<GuideMeta & { category: GuideCategory }> = [
  {
    slug: 'compress-video-for-discord',
    title: 'How to Compress a Video for Discord (Under 10 MB)',
    shortTitle: 'Compress a video for Discord',
    description:
      'Discord upload limits explained, why quality collapses when you squeeze a long video, and three practical ways to get under the cap, including a one-click preset.',
    category: 'Size Limits',
    published: '2026-07-16',
    updated: '2026-07-16',
    related: ['compress-video-for-email'],
  },
  {
    slug: 'compress-video-for-email',
    title: 'How to Compress a Video for Email Without Destroying Quality',
    shortTitle: 'Compress a video for email',
    description:
      'Why a 25 MB email limit really means about 18 MB, when to compress versus link, and how to shrink a video to an attachment-safe size without turning it to mush.',
    category: 'Size Limits',
    published: '2026-07-16',
    updated: '2026-07-16',
    related: ['compress-video-for-discord'],
  },
];

export const guideBySlug: Record<string, GuideMeta> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);

export function guidePath(slug: string): string {
  return `${guidesIndexPath}/${slug}`;
}
