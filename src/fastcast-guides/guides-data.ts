// Single source of truth for FastCast guide metadata.
// Used by the guides index page, each article layout (breadcrumbs, related
// guides), and the FastCast product page guide section. Add new guides here
// first; the index and related-guide lists pick them up automatically.

import type { GuideMeta } from '../product-guides/ProductGuides.tsx';

export const fastCastPath = '/fastcast';
export const guidesIndexPath = '/fastcast/guides';

export const fastCastDownloadUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases/latest';
export const fastCastAllReleasesUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases';
export const fastCastProCheckoutUrl = 'https://sturmtech.lemonsqueezy.com/checkout/buy/2f7a5399-c954-43e3-9361-f33fb6853484';
export const fastCastSiteUrl = 'https://calvinsturm.github.io/FastCast-releases/';

export type GuideCategory = 'Recording Basics' | 'Quality & Performance' | 'Troubleshooting' | 'Comparisons';

export const guides: Array<GuideMeta & { category: GuideCategory }> = [
  {
    slug: 'how-to-record-screen-windows',
    title: 'How to Record Your Screen on Windows',
    shortTitle: 'Record your screen on Windows',
    description:
      'A practical Windows screen-recording walkthrough: picking a monitor or window, capturing mic and system audio, adding a webcam, and finding the finished MP4.',
    category: 'Recording Basics',
    published: '2026-07-15',
    updated: '2026-07-19',
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
    updated: '2026-07-19',
    related: ['how-to-record-screen-windows', 'screen-recording-without-lag'],
  },
  {
    slug: 'record-4k-60fps-windows',
    title: 'How to Record 4K 60 FPS Video on Windows',
    shortTitle: 'Record 4K 60 FPS on Windows',
    description:
      'What your computer needs for smooth 4K 60 FPS recording, and how to choose settings that avoid dropped frames.',
    category: 'Quality & Performance',
    published: '2026-07-15',
    updated: '2026-07-16',
    related: ['screen-recording-without-lag', 'how-to-record-screen-windows'],
  },
  {
    slug: 'screen-recording-without-lag',
    title: 'How to Reduce Lag While Screen Recording on Windows',
    shortTitle: 'Reduce screen-recording lag',
    description:
      'Why recordings stutter or slow the machine down: recording quality, frame rate, hardware load, storage speed, and the settings that reduce strain.',
    category: 'Quality & Performance',
    published: '2026-07-15',
    updated: '2026-07-19',
    related: ['record-4k-60fps-windows', 'screen-recording-black-screen-no-audio', 'how-to-record-screen-windows'],
  },
  {
    slug: 'screen-recording-black-screen-no-audio',
    title: 'Screen Recording Black Screen or No Audio on Windows: Fixes',
    shortTitle: 'Fix black or silent recordings',
    description:
      'Why Windows screen recordings come out black or silent: protected content, wrong capture source, muted or wrong audio device, and the checks that catch them.',
    category: 'Troubleshooting',
    published: '2026-07-16',
    updated: '2026-07-16',
    related: ['how-to-record-screen-windows', 'screen-recording-without-lag'],
  },
  {
    slug: 'obs-alternative-windows',
    title: 'A Simpler OBS Alternative for Windows Screen Recording',
    shortTitle: 'A simpler OBS alternative',
    description:
      'An honest OBS and FastCast comparison: what OBS does that FastCast will not, where a simpler screen recorder is the better fit, and how to choose between them.',
    category: 'Comparisons',
    published: '2026-07-15',
    updated: '2026-07-19',
    related: ['how-to-record-screen-windows', 'record-4k-60fps-windows'],
  },
  {
    slug: 'command-line-screen-recording-windows',
    title: 'How to Start and Stop Screen Recording from the Command Line',
    shortTitle: 'Command-line screen recording',
    description:
      'Start and stop FastCast recordings from PowerShell or a script with fastcastc, select a monitor, check exit codes, and troubleshoot controller errors.',
    category: 'Recording Basics',
    published: '2026-07-19',
    updated: '2026-07-19',
    related: ['how-to-record-screen-windows', 'screen-recording-without-lag', 'screen-recording-black-screen-no-audio'],
  },
  {
    slug: 'stream-to-youtube-rtmps-windows',
    title: 'How to Stream to YouTube with RTMPS on Windows',
    shortTitle: 'Stream to YouTube with RTMPS',
    description:
      'Set up a YouTube Live stream with a custom encoder, paste the RTMPS ingest URL and stream key into FastCast, and run a safe private test.',
    category: 'Recording Basics',
    published: '2026-07-19',
    updated: '2026-07-19',
    related: ['how-to-record-screen-windows', 'screen-recording-without-lag', 'record-screen-and-webcam'],
  },
];

export const guideBySlug: Record<string, GuideMeta> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);

export function guidePath(slug: string): string {
  return `${guidesIndexPath}/${slug}`;
}
