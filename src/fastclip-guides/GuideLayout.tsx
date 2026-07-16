import { Scissors } from 'lucide-react';
import { createProductGuides } from '../product-guides/ProductGuides.tsx';
import type { TocEntry } from '../product-guides/ProductGuides.tsx';
import {
  fastClipAllReleasesUrl,
  fastClipDownloadUrl,
  fastClipPath,
  guidePath,
  guides,
  guidesIndexPath,
} from './guides-data';

// FastClip binding of the shared product-guide system (src/product-guides).
// Renders inside the product-landing-fastclip theme so guides share the
// FastClip product page's identity.

const fastClipGuides = createProductGuides({
  variant: 'fastclip',
  brand: 'FastClip',
  brandIconUrl: '/assets/FastClip/FastClip_Icon.png',
  productPath: fastClipPath,
  guidesIndexPath,
  downloadUrl: fastClipDownloadUrl,
  downloadLabel: 'Download FastClip',
  secondaryCtaLabel: 'See what FastClip does',
  SecondaryCtaIcon: Scissors,
  navLinks: [
    { href: guidesIndexPath, label: 'Guides' },
    { href: fastClipPath, label: 'Product' },
    { href: fastClipAllReleasesUrl, label: 'Releases', external: true },
    { href: fastClipDownloadUrl, label: 'Download', external: true },
  ],
  footer: (
    <>
      <p>
        FastClip is a local Windows app that finds highlights in long videos and exports 9:16 vertical clips,
        currently in open beta.
      </p>
      <p>
        <a href={fastClipPath}>FastClip</a>
        <span aria-hidden="true"> · </span>
        <a href={guidesIndexPath}>All guides</a>
        <span aria-hidden="true"> · </span>
        <a href={fastClipAllReleasesUrl} target="_blank" rel="noopener noreferrer">Releases on GitHub</a>
        <span aria-hidden="true"> · </span>
        <a href="https://github.com/CalvinSturm" target="_blank" rel="noopener noreferrer">Calvin Sturm</a> / Sturm Technologies LLC
      </p>
    </>
  ),
  topCtaMeta: 'Open beta · Windows 10/11 x64 · Local-only processing, no uploads',
  finalCtaMeta: 'Open beta · Windows 10/11 x64 · Footage never leaves your machine',
  authorName: 'Calvin Sturm',
  guides,
  guidePath,
  indexEyebrow: 'FastClip guides',
  indexTitle: 'FastClip Guides: Vertical Clips from Long Videos',
  indexLede:
    'Practical guides to short-form clipping on Windows: pulling the good moments out of long recordings, reframing for 9:16, and adding captions, all without uploading footage to a cloud service. Each guide works with any tool and shows where FastClip fits.',
  indexFinalCtaHeading: 'Find the highlights without scrubbing for an hour',
  indexFinalCtaBody:
    'FastClip analyzes long local videos, proposes ranked highlight candidates, and exports ready-to-post 1080×1920 clips with optional captions. No uploads, no subscription. Open beta on GitHub Releases.',
});

export const { GuideLayout, GuideSection, InlineCta, TopCta, DownloadCta, GuidesIndexPage } = fastClipGuides;
export type { TocEntry };
