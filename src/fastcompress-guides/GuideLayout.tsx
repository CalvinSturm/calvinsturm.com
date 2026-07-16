import { Minimize2 } from 'lucide-react';
import { createProductGuides } from '../product-guides/ProductGuides.tsx';
import type { TocEntry } from '../product-guides/ProductGuides.tsx';
import {
  fastCompressAllReleasesUrl,
  fastCompressDownloadUrl,
  fastCompressPath,
  guidePath,
  guides,
  guidesIndexPath,
} from './guides-data';

// FastCompress binding of the shared product-guide system (src/product-guides).
// Renders inside the product-landing-fastcompress theme so guides share the
// FastCompress product page's identity.

const fastCompressGuides = createProductGuides({
  variant: 'fastcompress',
  brand: 'FastCompress',
  brandIconUrl: '/assets/FastCompress/FastCompress_Icon.png',
  productPath: fastCompressPath,
  guidesIndexPath,
  downloadUrl: fastCompressDownloadUrl,
  downloadLabel: 'Download FastCompress',
  secondaryCtaLabel: 'See what FastCompress does',
  SecondaryCtaIcon: Minimize2,
  navLinks: [
    { href: guidesIndexPath, label: 'Guides' },
    { href: fastCompressPath, label: 'Product' },
    { href: fastCompressAllReleasesUrl, label: 'Releases', external: true },
    { href: fastCompressDownloadUrl, label: 'Download', external: true },
  ],
  footer: (
    <>
      <p>
        FastCompress is a local Windows video compressor with presets for Discord, email, and YouTube, currently
        free in beta.
      </p>
      <p>
        <a href={fastCompressPath}>FastCompress</a>
        <span aria-hidden="true"> · </span>
        <a href={guidesIndexPath}>All guides</a>
        <span aria-hidden="true"> · </span>
        <a href={fastCompressAllReleasesUrl} target="_blank" rel="noopener noreferrer">Releases on GitHub</a>
        <span aria-hidden="true"> · </span>
        <a href="https://github.com/CalvinSturm" target="_blank" rel="noopener noreferrer">Calvin Sturm</a> / Sturm Technologies LLC
      </p>
    </>
  ),
  topCtaMeta: 'Free during beta · Windows 10/11 x64 · No watermark, no account, no uploads',
  finalCtaMeta: 'Free during beta · Windows 10/11 x64 · Local FFmpeg processing',
  authorName: 'Calvin Sturm',
  guides,
  guidePath,
  indexEyebrow: 'FastCompress guides',
  indexTitle: 'FastCompress Guides: Getting Videos Under Size Limits',
  indexLede:
    'Practical guides to the too-big-to-send problem: what Discord and email limits actually are, why quality collapses when you squeeze long footage, and how to hit a target size cleanly. Each guide works with any compressor and shows where FastCompress fits.',
  indexFinalCtaHeading: 'Make it fit, without the bitrate math',
  indexFinalCtaBody:
    'FastCompress is a local Windows video compressor: pick where the video is going, like Discord or email, and get a file that fits. No watermark, no account, no uploads. Free during beta.',
});

export const { GuideLayout, GuideSection, InlineCta, TopCta, DownloadCta, GuidesIndexPage } = fastCompressGuides;
export type { TocEntry };
