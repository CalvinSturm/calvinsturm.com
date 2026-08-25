import { MonitorPlay } from 'lucide-react';
import { createProductGuides } from '../product-guides/ProductGuides.tsx';
import type { TocEntry } from '../product-guides/ProductGuides.tsx';
import {
  fastCastAllReleasesUrl,
  fastCastDownloadUrl,
  fastCastPath,
  guidePath,
  guides,
  guidesIndexPath,
} from './guides-data';

// FastCast binding of the shared product-guide system (src/product-guides).
// Renders inside the product-landing-fastcast theme so guides share the
// FastCast product page's dark blue identity.

const fastCastGuides = createProductGuides({
  variant: 'fastcast',
  brand: 'FastCast',
  brandIconUrl: '/assets/FastCast/FastCast_Icon.png',
  productPath: fastCastPath,
  guidesIndexPath,
  downloadUrl: fastCastDownloadUrl,
  downloadLabel: 'Download FastCast',
  secondaryCtaLabel: 'See what FastCast does',
  SecondaryCtaIcon: MonitorPlay,
  navLinks: [
    { href: guidesIndexPath, label: 'Guides' },
    { href: fastCastPath, label: 'Product' },
    { href: fastCastAllReleasesUrl, label: 'Releases', external: true },
    { href: fastCastDownloadUrl, label: 'Download', external: true },
  ],
  footer: (
    <>
      <p>
        FastCast is a native Windows screen recorder and live streamer, currently in Open Beta. 1080p60 recording and streaming will stay free.
      </p>
      <p>
        <a href={fastCastPath}>FastCast</a>
        <span aria-hidden="true"> · </span>
        <a href={guidesIndexPath}>All guides</a>
        <span aria-hidden="true"> · </span>
        <a href={fastCastAllReleasesUrl} target="_blank" rel="noopener noreferrer">Releases on GitHub</a>
        <span aria-hidden="true"> · </span>
        <a href="https://github.com/CalvinSturm" target="_blank" rel="noopener noreferrer">Calvin Sturm</a> / Sturm Technologies LLC
      </p>
    </>
  ),
  topCtaMeta: 'Free 1080p60 · Windows 10/11 x64 · No account · No watermark',
  finalCtaMeta: 'Free 1080p60 · Windows installer · No telemetry · No account',
  authorName: 'Calvin Sturm',
  guides,
  guidePath,
  indexEyebrow: 'FastCast guides',
  indexTitle: 'FastCast Guides: Windows Recording and Live Streaming',
  indexLede:
    'Practical guides to recording and live streaming on Windows: capture your screen, desktop audio, microphone, and webcam; stream to YouTube, Twitch, or Kick; improve performance; and fix black, silent, or unstable output. Each guide explains the general workflow and shows where FastCast fits.',
  indexFinalCtaHeading: 'Record without the setup maze',
  indexFinalCtaBody:
    'FastCast is a native Windows screen recorder and streamer: pick a monitor or window, choose your audio, add an optional webcam overlay, and record MP4 or go live over RTMP. The 1080p60 recording and streaming tier will stay free.',
});

export const { GuideLayout, GuideSection, InlineCta, TopCta, DownloadCta, GuidesIndexPage } = fastCastGuides;
export type { TocEntry };
