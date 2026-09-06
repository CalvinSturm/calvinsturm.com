// Single source of truth for FastCast guide metadata.
// Used by the guides index page, each article layout (breadcrumbs, related
// guides), and the FastCast product page guide section. Add new guides here
// first; the index and related-guide lists pick them up automatically.

import type { GuideMeta } from '../product-guides/ProductGuides.tsx';

export const fastCastPath = '/fastcast';
export const guidesIndexPath = '/fastcast/guides';

export const fastCastDownloadUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases/download/v0.8.0/FastCast-0.8.0-win-x64.msi';
export const fastCastAllReleasesUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases';
export const fastCastProCheckoutUrl = 'https://calvinstorm.gumroad.com/l/fastcast';
// Keep in step with the Gumroad listing, and with the FAQ answer duplicated in
// the FAQPage JSON-LD in fastcast.html, which cannot import this.
export const fastCastProPrice = '$0+';
export const fastCastSiteUrl = 'https://calvinsturm.github.io/FastCast-releases/';

export type GuideCategory =
  | 'Recording Basics'
  | 'HDR & Color'
  | 'Live Streaming'
  | 'Quality & Performance'
  | 'Troubleshooting'
  | 'Comparisons';

export const guides: Array<GuideMeta & { category: GuideCategory }> = [
  {
    slug: 'how-to-record-screen-windows',
    title: 'How to Record Your Screen on Windows',
    shortTitle: 'Record your screen on Windows',
    description:
      'Learn how to screen record on a Windows 11 or Windows 10 PC with microphone and desktop audio, a monitor or app window, and an optional webcam.',
    category: 'Recording Basics',
    published: '2026-07-15',
    updated: '2026-08-14',
    related: ['record-screen-and-webcam', 'how-to-stream-on-windows', 'screen-recording-without-lag'],
  },
  {
    slug: 'hdr-screen-recording-screenshots-windows',
    title: 'How to Fix Washed-Out HDR Screen Recordings and Screenshots on Windows',
    shortTitle: 'Fix washed-out HDR captures',
    description:
      'Why HDR screen recordings and screenshots look too bright on Windows, and how correct HDR-to-SDR tone mapping preserves highlights, contrast, and color.',
    category: 'HDR & Color',
    published: '2026-08-28',
    updated: '2026-08-28',
    related: ['how-to-record-screen-windows', 'screen-recording-black-screen-no-audio', 'record-4k-60fps-windows'],
  },
  {
    slug: 'record-screen-and-webcam',
    title: 'How to Record Your Screen and Webcam at the Same Time',
    shortTitle: 'Record screen and webcam together',
    description:
      'How to combine screen capture with a webcam overlay for tutorials, courses, and demos: layout choices, audio setup, framing, and how FastCast handles it.',
    category: 'Recording Basics',
    published: '2026-07-15',
    updated: '2026-08-14',
    related: ['how-to-record-screen-windows', 'stream-screen-webcam-windows', 'screen-recording-without-lag'],
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
    slug: 'how-to-stream-on-windows',
    title: 'How to Stream on Windows to YouTube, Twitch, or Kick',
    shortTitle: 'Stream on Windows',
    description:
      'Learn how to live stream on a Windows PC: choose screen, audio, and webcam sources, connect YouTube, Twitch, or Kick, test safely, and fix common failures.',
    category: 'Live Streaming',
    published: '2026-08-14',
    updated: '2026-08-14',
    related: ['stream-to-youtube-rtmps-windows', 'stream-to-twitch-windows', 'stream-to-kick-windows'],
  },
  {
    slug: 'stream-to-youtube-rtmps-windows',
    title: 'How to Stream on YouTube From Windows',
    shortTitle: 'Stream on YouTube from Windows',
    description:
      'Connect FastCast to YouTube Live securely with RTMPS and a stream key, configure screen and audio sources, and run a private test before going public.',
    category: 'Live Streaming',
    published: '2026-07-19',
    updated: '2026-08-14',
    related: ['how-to-stream-on-windows', 'test-live-stream-without-going-public', 'find-stream-key-youtube-twitch-kick'],
  },
  {
    slug: 'stream-to-twitch-windows',
    title: 'How to Stream on Twitch From Windows',
    shortTitle: 'Stream on Twitch from Windows',
    description:
      'Find your Twitch connection details, configure screen, microphone, desktop audio, and webcam in FastCast, test with Twitch Inspector, and go live.',
    category: 'Live Streaming',
    published: '2026-08-14',
    updated: '2026-08-14',
    related: ['how-to-stream-on-windows', 'test-live-stream-without-going-public', 'choose-live-streaming-bitrate'],
  },
  {
    slug: 'stream-to-kick-windows',
    title: 'How to Stream on Kick From Windows',
    shortTitle: 'Stream on Kick from Windows',
    description:
      'Get the Stream URL and Key from Kick, configure FastCast on Windows, verify video and audio, go live, and troubleshoot connection or buffering problems.',
    category: 'Live Streaming',
    published: '2026-08-14',
    updated: '2026-08-14',
    related: ['how-to-stream-on-windows', 'choose-live-streaming-bitrate', 'fix-live-stream-dropping-buffering'],
  },
  {
    slug: 'find-stream-key-youtube-twitch-kick',
    title: 'How to Find Your Stream Key on YouTube, Twitch, or Kick',
    shortTitle: 'Find your stream key',
    description:
      'Find the stream key and server URL for YouTube, Twitch, or Kick, understand what each value does, and protect or reset an exposed key.',
    category: 'Live Streaming',
    published: '2026-08-14',
    updated: '2026-08-14',
    related: ['how-to-stream-on-windows', 'stream-to-youtube-rtmps-windows', 'stream-to-twitch-windows'],
  },
  {
    slug: 'test-live-stream-without-going-public',
    title: 'How to Test a Live Stream Without Going Public',
    shortTitle: 'Test a stream privately',
    description:
      'Test live video, microphone, desktop audio, stability, and delay before an audience sees it, using the safest method each streaming platform supports.',
    category: 'Live Streaming',
    published: '2026-08-14',
    updated: '2026-08-14',
    related: ['how-to-stream-on-windows', 'stream-to-youtube-rtmps-windows', 'stream-to-twitch-windows'],
  },
  {
    slug: 'choose-live-streaming-bitrate',
    title: 'How to Choose the Right Bitrate for Live Streaming',
    shortTitle: 'Choose a streaming bitrate',
    description:
      'Choose a live-stream bitrate your upload connection and platform can sustain, balance resolution and frame rate, and recognize when bitrate is too high.',
    category: 'Live Streaming',
    published: '2026-08-14',
    updated: '2026-08-14',
    related: ['how-to-stream-on-windows', 'fix-live-stream-dropping-buffering', 'stream-to-kick-windows'],
  },
  {
    slug: 'stream-screen-webcam-windows',
    title: 'How to Stream Your Screen and Webcam at the Same Time',
    shortTitle: 'Stream screen and webcam',
    description:
      'Stream a Windows screen or app window with a webcam overlay, choose a clear layout, balance microphone and desktop audio, and avoid covering key content.',
    category: 'Live Streaming',
    published: '2026-08-14',
    updated: '2026-08-14',
    related: ['how-to-stream-on-windows', 'record-screen-and-webcam', 'stream-to-youtube-rtmps-windows'],
  },
  {
    slug: 'fix-live-stream-dropping-buffering',
    title: 'How to Fix a Live Stream That Keeps Dropping or Buffering',
    shortTitle: 'Fix dropping or buffering streams',
    description:
      'Diagnose live-stream disconnects, buffering, and dropped frames on Windows by checking upload headroom, bitrate, Wi-Fi, encoder load, and ingest settings.',
    category: 'Live Streaming',
    published: '2026-08-14',
    updated: '2026-08-14',
    related: ['how-to-stream-on-windows', 'choose-live-streaming-bitrate', 'screen-recording-without-lag'],
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
    updated: '2026-08-14',
    related: ['record-4k-60fps-windows', 'fix-live-stream-dropping-buffering', 'how-to-record-screen-windows'],
  },
  {
    slug: 'screen-recording-black-screen-no-audio',
    title: 'Screen Recording Black Screen or No Audio on Windows: Fixes',
    shortTitle: 'Fix black or silent recordings',
    description:
      'Why Windows screen recordings come out black or silent: protected content, wrong capture source, muted or wrong audio device, and the checks that catch them.',
    category: 'Troubleshooting',
    published: '2026-07-16',
    updated: '2026-08-14',
    related: ['how-to-record-screen-windows', 'how-to-stream-on-windows', 'screen-recording-without-lag'],
  },
  {
    slug: 'obs-alternative-windows',
    title: 'A Simpler OBS Alternative for Windows Screen Recording',
    shortTitle: 'A simpler OBS alternative',
    description:
      'An honest OBS and FastCast comparison: what OBS does that FastCast will not, where a simpler screen recorder is the better fit, and how to choose between them.',
    category: 'Comparisons',
    published: '2026-07-15',
    updated: '2026-08-14',
    related: ['how-to-record-screen-windows', 'how-to-stream-on-windows', 'stream-screen-webcam-windows'],
  },
];

export const guideBySlug: Record<string, GuideMeta> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);

export function guidePath(slug: string): string {
  return `${guidesIndexPath}/${slug}`;
}
