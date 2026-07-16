// Single source of truth for FastPlay guide metadata.
// Used by the guides index page, each article layout (breadcrumbs, related
// guides), and the FastPlay product page guide section. Add new guides here
// first; the index and related-guide lists pick them up automatically.

export const siteOrigin = 'https://www.calvinsturm.com';
export const fastPlayPath = '/fastplay';
export const guidesIndexPath = '/fastplay/guides';

export const fastPlayDownloadUrl = 'https://github.com/CalvinSturm/FastPlay/releases/latest';
export const fastPlaySourceUrl = 'https://github.com/CalvinSturm/FastPlay';

export type GuideCategory = 'HDR & Color' | 'Formats & Codecs' | 'Workflow';

export type GuideMeta = {
  slug: string;
  /** H1 and document title of the article. */
  title: string;
  /** Short label used in cards, breadcrumbs, and related-guide lists. */
  shortTitle: string;
  /** Card blurb; also mirrors the meta description in the HTML entry. */
  description: string;
  category: GuideCategory;
  /** ISO dates, shown on the article and mirrored in Article JSON-LD. */
  published: string;
  updated: string;
  /** Slugs of two or three genuinely related guides. */
  related: string[];
};

export const guides: GuideMeta[] = [
  {
    slug: 'hdr-video-windows',
    title: 'How to Play HDR Video on Windows',
    shortTitle: 'Play HDR video on Windows',
    description:
      'What HDR video needs to play correctly on Windows, why HDR files often look wrong in common players, and how FastPlay tone-maps HDR10 and HLG to SDR.',
    category: 'HDR & Color',
    published: '2026-07-15',
    updated: '2026-07-15',
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
    related: ['mov-not-playing-windows', 'hdr-video-windows'],
  },
  {
    slug: 'hdr-looks-washed-out',
    title: 'Why HDR Video Looks Washed Out on Windows',
    shortTitle: 'HDR looks washed out',
    description:
      'The real reasons HDR footage looks gray or faded on Windows: missing tone mapping, the Windows HDR toggle, and display limits, plus how to tell them apart.',
    category: 'HDR & Color',
    published: '2026-07-15',
    updated: '2026-07-15',
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
    related: ['hevc-player-windows', 'mov-not-playing-windows'],
  },
];

export const guideBySlug: Record<string, GuideMeta> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);

export function guidePath(slug: string): string {
  return `${guidesIndexPath}/${slug}`;
}
