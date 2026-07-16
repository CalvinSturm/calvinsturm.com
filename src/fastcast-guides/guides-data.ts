// Single source of truth for FastCast guide metadata.
// Used by the guides index page, each article layout (breadcrumbs, related
// guides), and the FastCast product page guide section. Add new guides here
// first; the index and related-guide lists pick them up automatically.

import type { GuideMeta } from '../product-guides/ProductGuides.tsx';

export const fastCastPath = '/fastcast';
export const guidesIndexPath = '/fastcast/guides';

export const fastCastDownloadUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases/latest';
export const fastCastAllReleasesUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases';
export const fastCastSiteUrl = 'https://calvinsturm.github.io/FastCast-releases/';

export type GuideCategory = 'Recording Basics' | 'Quality & Performance' | 'Comparisons';

export const guides: Array<GuideMeta & { category: GuideCategory }> = [
  {
    slug: 'how-to-record-screen-windows',
    title: 'How to Record Your Screen on Windows',
    shortTitle: 'Record your screen on Windows',
    description:
      'A practical Windows screen-recording walkthrough: picking a monitor or window, capturing mic and system audio, adding a webcam, and finding the finished MP4.',
    category: 'Recording Basics',
    published: '2026-07-15',
    updated: '2026-07-15',
    related: ['record-screen-and-webcam', 'screen-recording-without-lag', 'obs-alternative-windows'],
  },
  {
    slug: 'record-screen-and-webcam',
    title: 'How to Record Your Screen and Webcam at the Same Time',
    shortTitle: 'Record screen and webcam together',
    description:
      'How to combine screen capture with a webcam overlay for tutorials, courses, and demos: layout choices, audio setup, framing, and how FastCast handles it.',
    category: 'Recording Basics',
    published: '2026-07-15',
    updated: '2026-07-15',
    related: ['how-to-record-screen-windows', 'screen-recording-without-lag'],
  },
  {
    slug: 'record-4k-60fps-windows',
    title: 'How to Record 4K 60 FPS Video on Windows',
    shortTitle: 'Record 4K 60 FPS on Windows',
    description:
      'What 4K 60 FPS screen recording actually demands from your GPU, encoder, and disk, plus how FastCast Pro handles high-resolution, high-framerate capture.',
    category: 'Quality & Performance',
    published: '2026-07-15',
    updated: '2026-07-15',
    related: ['screen-recording-without-lag', 'how-to-record-screen-windows'],
  },
  {
    slug: 'screen-recording-without-lag',
    title: 'How to Reduce Lag While Screen Recording on Windows',
    shortTitle: 'Reduce screen-recording lag',
    description:
      'Why recordings stutter or slow the machine down: encoder choice, resolution and framerate load, disk speed, and the settings that actually reduce the strain.',
    category: 'Quality & Performance',
    published: '2026-07-15',
    updated: '2026-07-15',
    related: ['record-4k-60fps-windows', 'how-to-record-screen-windows'],
  },
  {
    slug: 'obs-alternative-windows',
    title: 'A Simpler OBS Alternative for Windows Screen Recording',
    shortTitle: 'A simpler OBS alternative',
    description:
      'An honest OBS and FastCast comparison: what OBS does that FastCast will not, where a single-scene recorder is simpler, and which tool fits which user.',
    category: 'Comparisons',
    published: '2026-07-15',
    updated: '2026-07-15',
    related: ['how-to-record-screen-windows', 'record-4k-60fps-windows'],
  },
];

export const guideBySlug: Record<string, GuideMeta> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);

export function guidePath(slug: string): string {
  return `${guidesIndexPath}/${slug}`;
}
