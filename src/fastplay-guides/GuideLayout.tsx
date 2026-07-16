import { PlayCircle } from 'lucide-react';
import { createProductGuides } from '../product-guides/ProductGuides.tsx';
import type { TocEntry } from '../product-guides/ProductGuides.tsx';
import {
  fastPlayDownloadUrl,
  fastPlayPath,
  fastPlaySourceUrl,
  guidePath,
  guides,
  guidesIndexPath,
} from './guides-data';

// FastPlay binding of the shared product-guide system (src/product-guides).
// Guide entries import GuideLayout/GuideSection/InlineCta from here; the
// shared factory renders the same DOM the original FastPlay-specific layout
// produced, inside the product-landing-fastplay theme.

const fastPlayGuides = createProductGuides({
  variant: 'fastplay',
  brand: 'FastPlay',
  brandIconUrl: '/assets/FastPlay/fastplay.png',
  productPath: fastPlayPath,
  guidesIndexPath,
  downloadUrl: fastPlayDownloadUrl,
  downloadLabel: 'Download FastPlay',
  secondaryCtaLabel: 'See what FastPlay does',
  SecondaryCtaIcon: PlayCircle,
  navLinks: [
    { href: guidesIndexPath, label: 'Guides' },
    { href: fastPlayPath, label: 'Product' },
    { href: fastPlaySourceUrl, label: 'GitHub', external: true },
    { href: fastPlayDownloadUrl, label: 'Download', external: true },
  ],
  footer: (
    <>
      <p>
        FastPlay is free and open source under the MIT License.
      </p>
      <p>
        <a href={fastPlayPath}>FastPlay</a>
        <span aria-hidden="true"> · </span>
        <a href={guidesIndexPath}>All guides</a>
        <span aria-hidden="true"> · </span>
        <a href={fastPlaySourceUrl} target="_blank" rel="noopener noreferrer">Source on GitHub</a>
        <span aria-hidden="true"> · </span>
        <a href="https://github.com/CalvinSturm" target="_blank" rel="noopener noreferrer">Calvin Sturm</a> / Sturm Technologies LLC
      </p>
    </>
  ),
  topCtaMeta: 'Free · Open source (MIT) · Windows 10+ x64 · MSI installer',
  finalCtaMeta: 'Free · Open source (MIT) · Windows 10+ x64 · No account, no telemetry',
  authorName: 'Calvin Sturm',
  guides,
  guidePath,
  indexEyebrow: 'FastPlay guides',
  indexTitle: 'FastPlay Guides: Fix Windows Video Playback Problems',
  indexLede:
    'Practical guides to specific Windows video playback problems: HDR that looks wrong, files that refuse to open, codecs Windows does not ship with, and faster ways to review footage. Each guide explains the cause, gives fixes you can try with any player, and shows where FastPlay helps.',
  indexFinalCtaHeading: 'Skip the codec hunt',
  indexFinalCtaBody:
    'FastPlay is a free, open-source Windows video player with hardware-accelerated decode, HDR-to-SDR tone mapping, and keyboard-first controls. One MSI installer, no codec packs.',
});

export const { GuideLayout, GuideSection, InlineCta, TopCta, DownloadCta, GuidesIndexPage } = fastPlayGuides;
export type { TocEntry };
