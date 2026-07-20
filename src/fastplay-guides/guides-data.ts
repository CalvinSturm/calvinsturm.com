// Single source of truth for FastPlay guide metadata.
// Used by the guides index page, each article layout (breadcrumbs, related
// guides), and the FastPlay product page guide section. Add new guides here
// first; the index and related-guide lists pick them up automatically.

import type { GuideMeta } from '../product-guides/ProductGuides.tsx';

export const fastPlayPath = '/fastplay';
export const guidesIndexPath = '/fastplay/guides';

export const fastPlayDownloadUrl = 'https://github.com/CalvinSturm/FastPlay/releases/latest';
export const fastPlaySourceUrl = 'https://github.com/CalvinSturm/FastPlay';

export type GuideCategory = 'HDR & Color' | 'Formats & Codecs' | 'Playback Performance' | 'Workflow';

export const guides: Array<GuideMeta & { category: GuideCategory }> = [
  {
    slug: 'videos-not-playing-on-pc',
    title: 'Videos Not Playing on PC? 9 Fixes for Windows',
    shortTitle: 'Fix videos not playing on PC',
    description:
      'Videos not playing on your PC? Diagnose files that will not open, black screens, audio-only playback, stuttering, codec errors, and damaged downloads on Windows.',
    category: 'Formats & Codecs',
    published: '2026-07-19',
    updated: '2026-07-19',
    related: ['hevc-player-windows', 'mov-not-playing-windows', 'video-stuttering-windows'],
  },
  {
    slug: 'change-video-playback-speed-windows',
    title: 'How to Change Video Playback Speed on Windows',
    shortTitle: 'Change video playback speed',
    description:
      'Learn how to speed up or slow down a video on a Windows PC, when to use each playback rate, and how to reset FastPlay to normal 1x speed.',
    category: 'Workflow',
    published: '2026-07-19',
    updated: '2026-07-19',
    related: ['video-review-workflow', 'add-srt-subtitles-video-windows', 'video-stuttering-windows'],
  },
  {
    slug: 'hdr-video-windows',
    title: 'How to Play HDR Video on Windows',
    shortTitle: 'Play HDR video on Windows',
    description:
      'What HDR video needs to play correctly on Windows, why HDR files often look wrong, and how FastPlay chooses native HDR output or SDR tone mapping.',
    category: 'HDR & Color',
    published: '2026-07-15',
    updated: '2026-07-19',
    related: ['hdr-looks-washed-out', 'hevc-player-windows', 'mov-not-playing-windows'],
  },
  {
    slug: 'mov-not-playing-windows',
    title: 'MOV File Not Playing on Windows? Causes and Fixes',
    shortTitle: 'MOV file not playing on Windows',
    description:
      'Why .MOV files fail to open or play badly on Windows: container versus codec, HEVC and HDR recordings from phones and cameras, and practical fixes.',
    category: 'Formats & Codecs',
    published: '2026-07-15',
    updated: '2026-07-15',
    related: ['hevc-player-windows', 'hdr-video-windows'],
  },
  {
    slug: 'hevc-player-windows',
    title: 'How to Play HEVC Video on Windows',
    shortTitle: 'Play HEVC (H.265) on Windows',
    description:
      'Why HEVC (H.265) video often refuses to play on Windows, how hardware decode support works, and how FastPlay plays HEVC without codec-pack setup.',
    category: 'Formats & Codecs',
    published: '2026-07-15',
    updated: '2026-07-15',
    related: ['mov-not-playing-windows', 'video-stuttering-windows', 'hdr-video-windows'],
  },
  {
    slug: 'video-stuttering-windows',
    title: 'Why Video Playback Stutters on Windows (and How to Fix It)',
    shortTitle: 'Fix stuttering video playback',
    description:
      'Why video stutters or drops frames on Windows: software decode of heavy codecs, slow drives, display judder, background load, and the fixes that work.',
    category: 'Playback Performance',
    published: '2026-07-16',
    updated: '2026-07-16',
    related: ['hevc-player-windows', 'mov-not-playing-windows', 'video-review-workflow'],
  },
  {
    slug: 'hdr-looks-washed-out',
    title: 'Why HDR Video Looks Washed Out on Windows',
    shortTitle: 'HDR looks washed out',
    description:
      'The real reasons HDR footage looks gray or faded on Windows: missing tone mapping, the Windows HDR toggle, and display limits, plus how to tell them apart.',
    category: 'HDR & Color',
    published: '2026-07-15',
    updated: '2026-07-19',
    related: ['hdr-video-windows', 'hevc-player-windows'],
  },
  {
    slug: 'video-review-workflow',
    title: 'A Faster Video Review Workflow for Windows',
    shortTitle: 'Faster video review workflow',
    description:
      'A keyboard-first workflow for reviewing long recordings on Windows: frame stepping, in/out loop ranges, speed control, screenshots, and per-file resume.',
    category: 'Workflow',
    published: '2026-07-15',
    updated: '2026-07-15',
    related: ['video-stuttering-windows', 'hevc-player-windows', 'mov-not-playing-windows'],
  },
  {
    slug: 'play-120-fps-video-windows',
    title: 'How to Play 120 FPS Video Smoothly on Windows',
    shortTitle: 'Play 120 FPS video smoothly',
    description:
      'How display refresh rate, decoding, storage, and playback timing affect 120 FPS video—and how to diagnose choppy high-frame-rate playback on Windows.',
    category: 'Playback Performance',
    published: '2026-07-19',
    updated: '2026-07-19',
    related: ['video-stuttering-windows', 'hevc-player-windows', 'video-review-workflow'],
  },
  {
    slug: 'add-srt-subtitles-video-windows',
    title: 'How to Add SRT Subtitles to a Video on Windows',
    shortTitle: 'Add SRT subtitles to a video',
    description:
      'How to load an external SRT subtitle file beside an MP4, MOV, or other local video on Windows, plus filename, encoding, and troubleshooting tips.',
    category: 'Workflow',
    published: '2026-07-19',
    updated: '2026-07-19',
    related: ['video-review-workflow', 'mov-not-playing-windows', 'hevc-player-windows'],
  },
];

export const guideBySlug: Record<string, GuideMeta> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);

export function guidePath(slug: string): string {
  return `${guidesIndexPath}/${slug}`;
}
