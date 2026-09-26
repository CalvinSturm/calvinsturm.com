// The Fast Series catalog for the homepage store: the 3D shelf, the product
// tabs, the detail panel and the listing below all read from this one list.
// Every line is taken from a product page that was checked against the app
// (FastCastV2.tsx, FastPlayV3.tsx, FastSeriesShared.tsx). If a product page
// changes its price, status or version, change it here too.

import {
  fastCastDownloadUrl,
  fastCastLicenseCheckoutUrl,
  fastCastLicensePrice,
  fastCastLicensePriceAtV1,
  fastCastVersion,
} from '../fastcast-guides/guides-data';

export const fastPlayVersion = '0.4.6';
export const fastPlayDownloadUrl = `https://github.com/CalvinSturm/FastPlay/releases/download/v${fastPlayVersion}/fastplay-${fastPlayVersion}-x86_64.msi`;

export type ProductAction = {
  label: string;
  href: string;
  kind: 'download' | 'pro' | 'page' | 'source';
  external?: boolean;
};

export type Product = {
  slug: 'fastcast' | 'fastplay' | 'fastclip' | 'fastcompress' | 'fastshorts';
  name: string;
  verb: string;
  status: string;
  version?: string;
  /** Short price line printed on the box art. */
  boxPrice: string;
  /** Price as the store panel states it. */
  price: string;
  priceNote: string;
  priceTone: 'free' | 'pro' | 'muted';
  summary: string;
  points: string[];
  /** The box accent, taken from the app icon. */
  color: string;
  icon: string;
  icon384: string;
  actions: ProductAction[];
};

export const products: Product[] = [
  {
    slug: 'fastcast',
    name: 'FastCast',
    verb: 'Record and stream',
    status: 'Open Beta',
    version: fastCastVersion,
    boxPrice: `Free  /  Pro ${fastCastLicensePrice}`,
    price: 'Free at 1080p60',
    priceNote: `FastCast Pro is ${fastCastLicensePrice} until v1.0, then ${fastCastLicensePriceAtV1}. One-time purchase.`,
    priceTone: 'pro',
    summary:
      'Screen recorder and live streaming app. Pick a screen, pick your audio, press record. The same setup goes live without building a second scene.',
    points: [
      'A whole monitor or a single window, with mic and desktop audio',
      'Webcam overlay with a built-in green screen',
      'Instant Replay saves the last 15 to 300 seconds as an MP4',
      'Streams to YouTube, Twitch, Kick, or any RTMP/RTMPS service',
    ],
    color: '#3b82f6',
    icon: '/assets/FastCast/fastcast-icon-128.webp',
    icon384: '/assets/FastCast/fastcast-icon-384.webp',
    actions: [
      { label: 'Download FastCast', href: fastCastDownloadUrl, kind: 'download', external: true },
      { label: `Get Pro for ${fastCastLicensePrice}`, href: fastCastLicenseCheckoutUrl, kind: 'pro', external: true },
      { label: 'FastCast page', href: '/fastcast', kind: 'page' },
    ],
  },
  {
    slug: 'fastplay',
    name: 'FastPlay',
    verb: 'Watch it back',
    status: 'Released',
    version: fastPlayVersion,
    boxPrice: 'Free  /  MIT',
    price: 'Free',
    priceNote: 'Open source under the MIT License. No Pro tier.',
    priceTone: 'free',
    summary:
      'A lightweight video player for local files. It opens fast, seeks responsively, and stays out of the way when you just need to review footage.',
    points: [
      'First frame on screen right away',
      'Responsive seeking, driven from the keyboard',
      'D3D11 hardware decode keeps video on the GPU',
      'Recent files and resume where you left off',
    ],
    color: '#32d583',
    icon: '/assets/FastPlay/fastplay-icon-128.webp',
    icon384: '/assets/FastPlay/fastplay-icon-384.webp',
    actions: [
      { label: 'Download FastPlay', href: fastPlayDownloadUrl, kind: 'download', external: true },
      { label: 'View source', href: 'https://github.com/CalvinSturm/FastPlay', kind: 'source', external: true },
      { label: 'FastPlay page', href: '/fastplay', kind: 'page' },
    ],
  },
  {
    slug: 'fastclip',
    name: 'FastClip',
    verb: 'Find the clip',
    status: 'Open Beta',
    boxPrice: 'Free in beta',
    price: 'Free during beta',
    priceNote: 'Windows 10 and 11, 64-bit. Analysis runs on your PC.',
    priceTone: 'free',
    summary:
      'Turns long local videos into vertical clips. It proposes ranked highlight candidates; you review them and export the ones you want.',
    points: [
      'Ranked highlight candidates from a long recording',
      'Footage never leaves your machine',
      '1080×1920 vertical MP4 export',
      'Optional burned-in captions',
    ],
    color: '#ff8a2a',
    icon: '/assets/FastClip/fastclip-icon-128.webp',
    icon384: '/assets/FastClip/fastclip-icon-384.webp',
    actions: [
      {
        label: 'Download FastClip',
        href: 'https://github.com/CalvinSturm/FastClip-Releases/releases/latest',
        kind: 'download',
        external: true,
      },
      { label: 'FastClip page', href: '/fastclip', kind: 'page' },
    ],
  },
  {
    slug: 'fastcompress',
    name: 'FastCompress',
    verb: 'Shrink it',
    status: 'Beta',
    boxPrice: 'Free in beta',
    price: 'Free during beta',
    priceNote: 'No watermark and no account. Runs locally.',
    priceTone: 'free',
    summary:
      'Pick where the video is going, like Discord or email, check the plan, and get a smaller file that fits.',
    points: [
      'Presets named after where the file is going',
      'Editable target size',
      'See the plan before anything encodes',
      'A command-line mode alongside the app',
    ],
    color: '#b56bff',
    icon: '/assets/FastCompress/fastcompress-icon-128.webp',
    icon384: '/assets/FastCompress/fastcompress-icon-384.webp',
    actions: [
      {
        label: 'Download FastCompress',
        href: 'https://github.com/CalvinSturm/FastCompress-Releases/releases/latest',
        kind: 'download',
        external: true,
      },
      { label: 'FastCompress page', href: '/fastcompress', kind: 'page' },
    ],
  },
  {
    slug: 'fastshorts',
    name: 'FastShorts',
    verb: 'Make a short',
    status: 'Experimental',
    boxPrice: 'Coming later',
    price: 'Not released yet',
    priceNote: 'Experimental, with no public download yet.',
    priceTone: 'muted',
    summary:
      'A local-first pipeline that turns a written story into a narrated, captioned vertical short with visuals and music.',
    points: [
      'Written story in, vertical short out',
      'Narration and captions generated for you',
      'Runs on your Windows PC',
    ],
    color: '#ff4d4d',
    icon: '/assets/FastShorts/fastshorts-icon-128.webp',
    icon384: '/assets/FastShorts/fastshorts-icon-384.webp',
    actions: [{ label: 'FastShorts page', href: '/fastshorts', kind: 'page' }],
  },
];
