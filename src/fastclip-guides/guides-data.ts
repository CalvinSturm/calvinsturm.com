// Single source of truth for FastClip guide metadata.
// Used by the guides index page, each article layout (breadcrumbs, related
// guides), and the FastClip product page guide section. Add new guides here
// first; the index and related-guide lists pick them up automatically.

import type { GuideMeta } from '../product-guides/ProductGuides.tsx';

export const fastClipPath = '/fastclip';
export const guidesIndexPath = '/fastclip/guides';

export const fastClipDownloadUrl = 'https://github.com/CalvinSturm/FastClip-Releases/releases/latest';
export const fastClipAllReleasesUrl = 'https://github.com/CalvinSturm/FastClip-Releases/releases';

export type GuideCategory = 'Clipping Workflow';

export const guides: Array<GuideMeta & { category: GuideCategory }> = [
  {
    slug: 'long-video-into-vertical-clips',
    title: 'How to Turn a Long Video into Vertical Clips, Locally',
    shortTitle: 'Turn a long video into vertical clips',
    description:
      'A local workflow for cutting long recordings into 9:16 vertical clips: finding the moments, reframing for vertical, captions, and why no-upload tools are faster.',
    category: 'Clipping Workflow',
    published: '2026-07-16',
    updated: '2026-07-16',
    related: ['auto-captions-without-uploading'],
  },
  {
    slug: 'auto-captions-without-uploading',
    title: 'How to Add Auto-Generated Captions to Clips Without Uploading',
    shortTitle: 'Auto captions without uploading',
    description:
      'How on-device transcription (Whisper) makes burned-in captions possible without cloud services, why captions matter for short-form, and a local caption workflow.',
    category: 'Clipping Workflow',
    published: '2026-07-16',
    updated: '2026-07-16',
    related: ['long-video-into-vertical-clips'],
  },
];

export const guideBySlug: Record<string, GuideMeta> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);

export function guidePath(slug: string): string {
  return `${guidesIndexPath}/${slug}`;
}
