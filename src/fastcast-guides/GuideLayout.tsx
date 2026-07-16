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
        FastCast is a native Windows screen recorder and live streamer, currently free during Open Beta.
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
  topCtaMeta: 'Free during Open Beta · Windows 10/11 x64 · Portable ZIP · No account',
  finalCtaMeta: 'Free during Open Beta · Windows 10/11 x64 · No telemetry, no accounts',
  authorName: 'Calvin Sturm',
  guides,
  guidePath,
  indexEyebrow: 'FastCast guides',
  indexTitle: 'FastCast Guides: Windows Screen Recording, Explained',
  indexLede:
    'Practical guides to Windows screen recording: capturing your screen and webcam, keeping recordings smooth, understanding what 4K 60 FPS really requires, and deciding honestly between FastCast and OBS. Each guide works with any recorder and shows where FastCast fits.',
  indexFinalCtaHeading: 'Record without the setup maze',
  indexFinalCtaBody:
    'FastCast is a native Windows screen recorder and streamer: pick a monitor or window, choose your audio, add an optional webcam overlay, and record MP4 or go live over RTMP. Free during Open Beta.',
});

export const { GuideLayout, GuideSection, InlineCta, TopCta, DownloadCta, GuidesIndexPage } = fastCastGuides;
export type { TocEntry };
