import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clapperboard,
  Code2,
  Cpu,
  Crop,
  Download,
  ExternalLink,
  FileDown,
  FileVideo,
  Gauge,
  Github,
  HardDrive,
  Keyboard,
  ListChecks,
  LockKeyhole,
  Menu,
  Mic,
  Minimize2,
  Music,
  MonitorPlay,
  Moon,
  PlayCircle,
  Radio,
  RotateCcw,
  ShieldCheck,
  Scissors,
  SlidersHorizontal,
  Sparkles,
  Subtitles,
  Sun,
  Target,
  Terminal,
  TriangleAlert,
  Video,
  WifiOff,
  X,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { guides as fastPlayGuides, guidePath as fastPlayGuidePath } from './fastplay-guides/guides-data';
import { guides as fastCastGuides, guidePath as fastCastGuidePath, fastCastProCheckoutUrl } from './fastcast-guides/guides-data';
import { guides as fastClipGuides, guidePath as fastClipGuidePath } from './fastclip-guides/guides-data';
import { guides as fastCompressGuides, guidePath as fastCompressGuidePath } from './fastcompress-guides/guides-data';
import { trackCtaClick } from './lib/analytics';

// Conversion tracking for release-hosted CTAs. GitHub release links are the
// closest thing to a download conversion the site can observe directly.
function isGitHubUrl(href: string): boolean {
  return href.startsWith('https://github.com/');
}

function trackProductCta(productSlug: string, ctaLocation: string, href: string): void {
  if (!isGitHubUrl(href)) return;
  const action = href.includes('/releases') ? 'download_clicked' : 'github_clicked';
  trackCtaClick(productSlug, action, ctaLocation, href);
}

// ---- Product data -----------------------------------------------------------
// External links stay product-specific: public sites/downloads are linked when
// confirmed, and source links are only shown when the source repo is public.

export type Product = {
  slug: string;
  name: string;
  Icon: LucideIcon;
  tagline: string;
  valueProp: string;
  what: string;
  status: string;
  whoFor: string[];
  whatItDoes: string[];
  siteUrl?: string;
  siteLabel?: string;
  githubUrl?: string;
  githubLabel?: string;
  releaseUrl?: string;
  releaseLabel?: string;
};

export const products: Product[] = [
  {
    slug: 'fastcast',
    name: 'FastCast',
    Icon: MonitorPlay,
    tagline: 'Screen recording and live streaming for Windows.',
    valueProp: 'Beginner-friendly Windows screen recording and live streaming.',
    what:
      'FastCast is a Windows app for recording your screen and going live without wrestling with complicated software. Set up a local recording or start a stream, and keep the setup simple.',
    status: 'Open Beta',
    whoFor: [
      'Creators making tutorials and demos',
      'Coaches and educators recording lessons',
      'Solo streamers getting started',
    ],
    whatItDoes: [
      'Record your screen locally',
      'Add a webcam overlay',
      'Capture desktop and microphone audio',
      'Stream to RTMP and RTMPS destinations',
    ],
    siteUrl: 'https://calvinsturm.github.io/FastCast-releases/',
    siteLabel: 'Visit release site',
    releaseUrl: 'https://github.com/CalvinSturm/FastCast-releases/releases/latest',
    releaseLabel: 'Download latest release',
  },
  {
    slug: 'fastplay',
    name: 'FastPlay',
    Icon: PlayCircle,
    tagline: 'A fast, lightweight video player for Windows.',
    valueProp: 'A minimal native Windows video player built for responsive playback.',
    what:
      'FastPlay is a lightweight native Windows video player focused on responsive playback and quick seeking. It opens fast and stays out of your way when you just need to review footage.',
    status: 'Released',
    whoFor: [
      'Anyone reviewing footage or media on Windows',
      'Editors doing quick playback checks',
      'People who want a light, keyboard-driven player',
    ],
    whatItDoes: [
      'Open and play local video files',
      'Seek and scrub responsively',
      'Drive playback from the keyboard',
      'Stay light on system resources',
    ],
    siteUrl: 'https://calvinsturm.github.io/FastPlay/',
    siteLabel: 'Visit site',
    githubUrl: 'https://github.com/CalvinSturm/FastPlay',
    githubLabel: 'View source',
  },
  {
    slug: 'fastclip',
    name: 'FastClip',
    Icon: Scissors,
    tagline: 'Turn long videos into vertical clips, locally.',
    valueProp: 'A fully local Windows app that finds highlights in long videos and exports ready-to-post 9:16 clips.',
    what:
      'FastClip imports a long local video, analyzes it with on-device signals, proposes ranked highlight candidates, and exports 1080×1920 vertical MP4s with optional burned-in captions. Footage never leaves your machine.',
    status: 'Open Beta',
    whoFor: [
      'Sports, action, and highlight workflows',
      'Creators repurposing long videos for social',
      'Anyone who wants clips without uploading footage',
    ],
    whatItDoes: [
      'Propose ranked highlight clips automatically',
      'Review and adjust candidates in a focused desktop UI',
      'Export 9:16 vertical MP4s with optional captions',
    ],
  },
  {
    slug: 'fastcompress',
    name: 'FastCompress',
    Icon: Minimize2,
    tagline: 'Shrink videos to fit, without learning FFmpeg.',
    valueProp: 'A dead-simple Windows video compressor with presets for Discord, email, and YouTube.',
    what:
      'FastCompress shrinks video files using readable presets. Pick where the video is going, like Discord or email, set a target size if you need one, and get a smaller file that fits. No watermark, no account, no FFmpeg know-how.',
    status: 'Beta',
    whoFor: [
      'Anyone whose video is too big to send',
      'Creators uploading to size-limited platforms',
      'People who want compression without technical setup',
    ],
    whatItDoes: [
      'Compress video with plain-English presets',
      'Hit target sizes for Discord and email',
      'Show a clear before-and-after result summary',
    ],
  },
  {
    slug: 'fastshorts',
    name: 'FastShorts',
    Icon: Clapperboard,
    tagline: 'Turn a written story into a finished vertical short.',
    valueProp: 'A local, AI-assisted pipeline that turns story packages into narrated, captioned shorts with generated visuals, music, and SFX.',
    what:
      'FastShorts is a local Windows pipeline for faceless short-form video. It takes a story package, a script with scene timing and visual prompts, and produces a finished vertical MP4: AI images per scene, image-to-video motion, narration, word-level karaoke captions, and music mixed under the voice. It is experimental and still taking shape.',
    status: 'Experimental',
    whoFor: [
      'Faceless story and narration channels',
      'Creators producing AI-assisted vertical video',
      'Anyone turning scripts into finished shorts without filming',
    ],
    whatItDoes: [
      'Generate scene visuals and animate them with local image-to-video',
      'Narrate scripts with cloud or local TTS and burn karaoke captions',
      'Compose narration, music, and SFX into a final 9:16 MP4',
    ],
  },
];

export const productBySlug: Record<string, Product> = Object.fromEntries(
  products.map((p) => [p.slug, p]),
);

// ---- Shared chrome ----------------------------------------------------------

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('theme');
      if (!saved) setIsDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { isDark, setIsDark };
}

const navLinks = [
  ['/fast-series', 'Fast Series', Zap],
  ['/projects', 'Projects', Code2],
  ['/build', 'Websites & Software', Sparkles],
] as const;

function SiteHeader() {
  const { isDark, setIsDark } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-[#fbf8f3]/80 backdrop-blur-md">
      <div className="section-shell">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2.5" aria-label="Calvin Sturm home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Code2 className="h-5 w-5" />
            </span>
            <span className="font-display text-xl text-slate-900">Calvin Sturm</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            {navLinks.map(([href, label, Icon]) => (
              <a key={href} href={href} className="nav-link inline-flex items-center gap-1.5 text-slate-700">
                <Icon className="h-3.5 w-3.5 text-amber-500" />
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a
              href="https://github.com/CalvinSturm"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary text-sm py-2.5"
            >
              <Github className="h-4 w-4" />
              GitHub Profile
            </a>
          </div>

          <button
            className="rounded-lg p-2 text-slate-600 md:hidden hover:bg-slate-100"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-[#fbf8f3] md:hidden">
          <div className="section-shell py-4 space-y-1">
            {navLinks.map(([href, label, Icon]) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                <Icon className="h-4 w-4 text-amber-500" />
                {label}
              </a>
            ))}
            <div className="pt-4 pb-2 space-y-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <a
                href="https://github.com/CalvinSturm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
              >
                <Github className="h-4 w-4" />
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 py-14">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Code2 className="h-5 w-5" />
              </span>
              <span className="font-display text-xl text-slate-900">Calvin Sturm</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-600">
              Developer and founder of Sturm Technologies LLC. The Fast Series is a family of practical
              native Windows tools built on California&apos;s Central Coast.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Fast Series</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/fast-series" className="hover:text-slate-900">Overview</a></li>
              {products.map((p) => (
                <li key={p.slug}>
                  <a href={`/${p.slug}`} className="hover:text-slate-900">{p.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Guides</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/fastcast/guides" className="hover:text-slate-900">Screen recording</a></li>
              <li><a href="/fastplay/guides" className="hover:text-slate-900">Video playback</a></li>
              <li><a href="/fastclip/guides" className="hover:text-slate-900">Vertical clips</a></li>
              <li><a href="/fastcompress/guides" className="hover:text-slate-900">Video compression</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/projects" className="hover:text-slate-900">Projects</a></li>
              <li><a href="/build" className="hover:text-slate-900">Websites &amp; software</a></li>
              <li><a href="/tech-support" className="hover:text-slate-900">Local tech support</a></li>
              <li><a href="https://github.com/CalvinSturm" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">GitHub profile</a></li>
              <li><a href="mailto:calvinsturm@gmail.com" className="hover:text-slate-900">calvinsturm@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Sturm Technologies LLC.
        </div>
      </div>
    </footer>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
      {status}
    </span>
  );
}

// ---- Hub page ---------------------------------------------------------------

export function FastSeriesHub() {
  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content" className="pt-16">
        <section className="section-shell py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow-amber">Fast Series</p>
            <h1 className="font-display mt-5 text-[2.75rem] leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl">
              Practical Windows tools for media work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              The Fast Series is a family of native Windows tools for creators and media workflows: recording,
              playback, clipping, compression, and short-form production. Each one is small, focused, and built to
              do one job well.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Four tools are downloadable today: FastCast, FastClip, and FastCompress in public beta, and FastPlay
              free under the MIT License. FastShorts is experimental and still taking shape.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
              Built by Calvin Sturm through Sturm Technologies LLC. GitHub remains the source and release backend.
            </p>
          </div>
        </section>

        <section aria-labelledby="products-heading" className="border-t border-slate-200 py-16 lg:py-24">
          <div className="section-shell">
            <div className="mb-8 lg:mb-10">
              <p className="eyebrow-amber">The tools</p>
              <h2 id="products-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                Five tools, one series.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <a
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(17,24,39,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(17,24,39,0.14)]"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800">
                      <p.Icon className="h-6 w-6" />
                    </span>
                    <StatusBadge status={p.status} />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-slate-900">{p.name}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{p.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-slate-900">
                    View {p.name}
                    <ArrowRight className="h-4 w-4 text-amber-500 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900">
          <div className="section-shell py-16 text-center lg:py-24">
            <h2 className="font-display text-3xl text-white sm:text-4xl">Read the code, run it yourself.</h2>
            <p className="mt-4 text-lg text-slate-400">
              Public pages, repositories, and release metadata are linked where each product has them.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://github.com/CalvinSturm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 font-semibold text-[#1f1003] transition-colors hover:bg-amber-300"
              >
                <Github className="h-5 w-5" />
                See all repositories
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Code2 className="h-5 w-5" />
                More projects
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

// ---- Product page -----------------------------------------------------------

export function ProductPage({ product }: { product: Product }) {
  const {
    name,
    Icon,
    valueProp,
    what,
    status,
    whoFor,
    whatItDoes,
    siteUrl,
    siteLabel,
    githubUrl,
    githubLabel,
    releaseUrl,
    releaseLabel,
  } = product;

  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content" className="pt-16">
        <section className="section-shell py-16 lg:py-24">
          <a href="/fast-series" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
            <ArrowLeft className="h-4 w-4" />
            Fast Series
          </a>

          <div className="mt-8 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800">
              <Icon className="h-8 w-8" />
            </span>
            <StatusBadge status={status} />
          </div>

          <h1 className="font-display mt-6 text-[2.5rem] leading-[1.05] text-slate-900 sm:text-6xl">{name}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-700">{valueProp}</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{what}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {siteUrl ? (
              <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="cta-primary text-sm py-2.5">
                <ExternalLink className="h-4 w-4" />
                {siteLabel ?? 'Visit site'}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-500">
                {status}
              </span>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="cta-secondary text-sm py-2.5">
                <Github className="h-4 w-4" />
                {githubLabel ?? 'View on GitHub'}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {releaseUrl && (
              <a href={releaseUrl} target="_blank" rel="noopener noreferrer" className="cta-secondary text-sm py-2.5">
                <Github className="h-4 w-4" />
                {releaseLabel ?? 'View releases'}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </section>

        <section className="border-t border-slate-200 py-16 lg:py-20">
          <div className="section-shell grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow-amber">Who it&apos;s for</p>
              <ul className="mt-5 space-y-3">
                {whoFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-slate-700">
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow-amber">What it does</p>
              <ul className="mt-5 space-y-3">
                {whatItDoes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-slate-700">
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 py-16 lg:py-20">
          <div className="section-shell">
            <p className="text-sm text-slate-500">
              {name} is part of the{' '}
              <a href="/fast-series" className="font-medium text-slate-800 underline decoration-amber-400 underline-offset-4 hover:text-slate-900">
                Fast Series
              </a>{' '}
              by Calvin Sturm / Sturm Technologies LLC.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {products
                .filter((p) => p.slug !== product.slug)
                .map((p) => (
                  <a
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                  >
                    <p.Icon className="h-4 w-4 text-amber-500" />
                    {p.name}
                  </a>
                ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

const githubProfileUrl = 'https://github.com/CalvinSturm';
const fastCastDownloadUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases/download/v0.8.0/FastCast-0.8.0-win-x64.msi';
const fastCastPortableUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases/download/v0.8.0/FastCast-0.8.0-win-x64.zip';
const fastCastReleaseUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases/latest';
const fastCastAllReleasesUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases';
const fastPlayDownloadUrl = 'https://github.com/CalvinSturm/FastPlay/releases/download/v0.4.6/fastplay-0.4.6-x86_64.msi';
const fastPlayReleaseUrl = 'https://github.com/CalvinSturm/FastPlay/releases/latest';
const fastClipReleaseUrl = 'https://github.com/CalvinSturm/FastClip-Releases/releases/latest';
const fastClipAllReleasesUrl = 'https://github.com/CalvinSturm/FastClip-Releases/releases';
const fastCompressReleaseUrl = 'https://github.com/CalvinSturm/FastCompress-Releases/releases/latest';
const fastCompressAllReleasesUrl = 'https://github.com/CalvinSturm/FastCompress-Releases/releases';
const fastPlaySourceUrl = 'https://github.com/CalvinSturm/FastPlay';
const fastPlayReleaseNotesUrl = 'https://github.com/CalvinSturm/FastPlay/releases/tag/v0.4.6';

type ProductSectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

function ProductSectionHeading({ eyebrow, title, description }: ProductSectionHeadingProps) {
  return (
    <div className="product-section-heading max-w-3xl">
      {eyebrow && <p className="product-eyebrow eyebrow-amber">{eyebrow}</p>}
      <h2 className="product-section-title font-display mt-4 text-3xl leading-tight text-slate-900 sm:text-4xl">{title}</h2>
      {description && <p className="product-section-description mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>}
    </div>
  );
}

type ProductLandingVariant = 'fastcast' | 'fastplay' | 'fastclip' | 'fastcompress' | 'fastshorts';

type ProductShellProps = {
  children: ReactNode;
  variant: ProductLandingVariant;
  brand: string;
  navLinks: Array<{ href: string; label: string }>;
  footer: ReactNode;
  brandIconUrl?: string;
};

function ProductShell({ children, variant, brand, navLinks, footer, brandIconUrl }: ProductShellProps) {
  return (
    <div className={`product-landing product-landing-${variant}`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to main content
      </a>
      <header className="product-site-header" aria-label={`${brand} page navigation`}>
        <a href="#main-content" className="product-brand" aria-label={`${brand} home`}>
          {brandIconUrl && <img src={brandIconUrl} alt="" className="product-brand-mark" width="30" height="30" aria-hidden="true" />}
          <span>{brand}</span>
        </a>
        <nav className="product-nav-links" aria-label="Page sections">
          {navLinks.map((link) => (
            <a key={`${link.href}-${link.label}`} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>
      <main id="main-content">
        {children}
      </main>
      <footer className="product-site-footer">
        {footer}
      </footer>
    </div>
  );
}

function ProductBackLink() {
  return (
    <a href="/fast-series" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
      <ArrowLeft className="h-4 w-4" />
      Fast Series
    </a>
  );
}

type ProductHeroProps = {
  product: Product;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  meta: string;
  notes?: string[];
  subMeta?: string;
  heroIconUrl?: string;
  heroIconAlt?: string;
  PrimaryIcon?: LucideIcon;
  SecondaryIcon?: LucideIcon;
  preview: ReactNode;
};

function heroLinkProps(href: string) {
  return href.startsWith('http')
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};
}

function ProductHero({
  product,
  eyebrow,
  title,
  subtitle,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  meta,
  notes,
  subMeta,
  heroIconUrl,
  heroIconAlt,
  PrimaryIcon = Download,
  SecondaryIcon = Github,
  preview,
}: ProductHeroProps) {
  return (
    <section className="product-hero section-shell py-14 lg:py-20" aria-labelledby="product-hero-title">
      <div className="product-hero-grid mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)] lg:items-center">
        <div className="product-hero-copy">
          <div className="product-icon-status flex flex-wrap items-center gap-4">
            <span className="product-icon-badge flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800">
              {heroIconUrl ? (
                <img
                  src={heroIconUrl}
                  alt={heroIconAlt ?? ''}
                  aria-hidden={heroIconAlt ? undefined : true}
                  className="product-hero-logo"
                  width="64"
                  height="64"
                />
              ) : (
                <product.Icon className="h-8 w-8" />
              )}
            </span>
            <StatusBadge status={product.status} />
          </div>
          <p className="product-eyebrow eyebrow-amber mt-8">{eyebrow}</p>
          <h1 id="product-hero-title" className="product-hero-title font-display mt-4 text-[2.45rem] leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="product-hero-subtitle mt-5 max-w-2xl text-xl leading-relaxed text-slate-700">{subtitle}</p>
          <p className="product-hero-description mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>
          <div className="product-hero-actions mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={primaryHref}
              {...heroLinkProps(primaryHref)}
              className="product-button product-button-primary cta-primary"
              onClick={() => trackProductCta(product.slug, 'hero', primaryHref)}
            >
              <PrimaryIcon className="h-5 w-5" />
              {primaryLabel}
            </a>
            <a
              href={secondaryHref}
              {...heroLinkProps(secondaryHref)}
              className="product-button product-button-secondary cta-secondary"
              onClick={() => trackProductCta(product.slug, 'hero_secondary', secondaryHref)}
            >
              <SecondaryIcon className="h-5 w-5" />
              {secondaryLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="product-meta mt-4 text-sm font-medium text-slate-500">{meta}</p>
          {subMeta && <p className="product-sub-meta text-sm font-medium text-slate-500">{subMeta}</p>}
          {notes && notes.length > 0 && (
            <div className="product-note-row mt-5 flex flex-wrap gap-2">
              {notes.map((note) => (
                <span
                  key={note}
                  className="product-note-chip inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>
        {preview}
      </div>
    </section>
  );
}

type FeatureItem = {
  title: string;
  body?: string;
  Icon?: LucideIcon;
};

function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="product-feature-grid mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ title, body, Icon }) => (
        <article key={title} className="product-feature-card feature-tile p-5">
          {Icon && (
            <span className="product-feature-icon mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Icon className="h-5 w-5" />
            </span>
          )}
          <h3 className="product-card-title text-base font-semibold text-slate-900">{title}</h3>
          {body && <p className="product-card-copy mt-2 text-sm leading-relaxed text-slate-600">{body}</p>}
        </article>
      ))}
    </div>
  );
}

function BulletedList({ items }: { items: string[] }) {
  return (
    <ul className="product-bullet-list space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-slate-700">
          <ArrowRight className="product-bullet-icon mt-1 h-4 w-4 shrink-0 text-amber-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FactsTable({ rows }: { rows: Array<[string, string]> }) {
  return (
    <div className="product-facts-wrapper mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
      <table className="w-full border-collapse text-left text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-slate-100 last:border-b-0">
              <th className="product-fact-label w-36 px-4 py-4 align-top text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 sm:w-52 sm:px-6">
                {label}
              </th>
              <td className="product-fact-value px-4 py-4 align-top text-slate-700 sm:px-6">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqList({ faqs }: { faqs: Array<{ question: string; answer: ReactNode }> }) {
  return (
    <div className="product-faq-list mt-8 grid gap-3">
      {faqs.map((faq) => (
        <details key={faq.question} open className="product-faq-item faq-item rounded-2xl border border-slate-200 bg-white/80 p-5">
          <summary className="product-faq-summary flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900">
            {faq.question}
            <span className="faq-marker" aria-hidden="true" />
          </summary>
          <div className="product-faq-answer mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}

const fastCastFeatures: FeatureItem[] = [
  { title: 'Monitor or window capture', Icon: MonitorPlay },
  { title: 'Desktop audio plus microphone', Icon: Mic },
  { title: 'Live layouts: screen, camera, or both, switchable mid-recording', Icon: Video },
  { title: 'Local MP4 recording', Icon: HardDrive },
  { title: 'RTMP and RTMPS livestreaming', Icon: Radio },
  { title: 'Hardware H.264 tested on NVIDIA and AMD', Icon: Cpu },
  { title: 'Passthrough, 1080p, or 720p output', Icon: FileVideo },
  { title: 'Hotkeys: Ctrl+Alt+F9 record, Ctrl+Alt+1-4 layouts', Icon: Keyboard },
  { title: 'Command-line recording control with fastcastc', Icon: Terminal },
  { title: 'Instant Replay: save the last 15–300 seconds with Ctrl+Alt+F8', Icon: RotateCcw },
];

const fastCastFaqs = [
  {
    question: 'What is FastCast?',
    answer:
      'FastCast is a native Windows screen recorder and live streaming app for local MP4 recording, Instant Replay clips, monitor or window capture, desktop audio, microphone capture, webcam overlay, and RTMP/RTMPS streaming.',
  },
  {
    question: 'What is Instant Replay?',
    answer:
      'Instant Replay keeps the last 15 to 300 seconds in memory and saves it as an MP4 when you press Ctrl+Alt+F8. Nothing is written until you save a clip.',
  },
  {
    question: 'Is FastCast an OBS alternative?',
    answer:
      'FastCast is a simpler OBS alternative for focused single-scene recording and streaming workflows. OBS is still better when you need advanced scenes, filters, plugins, multistreaming, or complex broadcast production.',
  },
  {
    question: 'Does FastCast save stream keys?',
    answer: 'No. Stream keys are not saved to disk.',
  },
  {
    question: 'Is FastCast free?',
    answer:
      'FastCast Free covers 1080p30 recording and streaming, and those capabilities will stay free. A one-time FastCast Pro license unlocks 1440p and 4K recording, 60 fps capture, and advanced encoder controls. No subscription and no account.',
  },
  {
    question: 'Is FastCast signed?',
    answer:
      'FastCast is currently unsigned during Open Beta, so Windows SmartScreen may show an Unknown Publisher warning.',
  },
];

export function FastCastProductPage() {
  const product = productBySlug.fastcast;

  return (
    <ProductShell
      variant="fastcast"
      brand="FastCast"
      brandIconUrl="/assets/FastCast/FastCast_Icon.png"
      navLinks={[
        { href: '#privacy', label: 'Privacy' },
        { href: '#verify', label: 'Verify' },
        { href: '#beta', label: 'Open Beta' },
        { href: '#guides', label: 'Guides' },
        { href: '/roadmap', label: 'Roadmap' },
        { href: fastCastAllReleasesUrl, label: 'Releases' },
      ]}
      footer={
        <>
          <p>Source code is private.</p>
          <p>This repository hosts public downloads and version metadata only.</p>
          <p>
            <a href={fastCastAllReleasesUrl} target="_blank" rel="noopener noreferrer">All releases</a>
            <span aria-hidden="true"> / </span>
            <a href={fastCastReleaseUrl} target="_blank" rel="noopener noreferrer">Latest release</a>
            <span aria-hidden="true"> / </span>
            <a href="/fastcast/guides">FastCast guides</a>
          </p>
        </>
      }
    >
      <ProductHero
        product={product}
        eyebrow="FastCast · Native Windows screen recorder"
        title="Record or stream without setting up OBS scenes"
        subtitle="FastCast is a native Windows recorder for local MP4 capture, webcam overlay, desktop and microphone audio, and RTMP/RTMPS livestreaming."
        description="Built as a simpler OBS alternative for focused single-scene recordings: choose a monitor or window, pick your audio, add an optional webcam overlay, and record MP4 or go live without setting up scenes first."
        primaryLabel="Download FastCast for Windows"
        primaryHref={fastCastDownloadUrl}
        secondaryLabel="View release notes"
        secondaryHref={fastCastReleaseUrl}
        meta="v0.8.0 · Windows 10/11 x64 · MSI or portable ZIP · Free version, optional Pro license"
        heroIconUrl="/assets/FastCast/FastCast_Icon.png"
        heroIconAlt="FastCast app icon"
        preview={
          <figure className="product-preview overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-[0_30px_80px_rgba(17,24,39,0.18)]">
            <img
              src="/assets/FastCast/fastcast-app-v0.5.png"
              alt="FastCast v0.5 in Ready state: live preview of a captured browser window, with capture, stream, audio and webcam, and advanced encoder panels."
              className="h-auto w-full"
              width="700"
              height="1107"
            />
          </figure>
        }
      />

      <section className="product-section product-section-intro border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-split-grid grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div>
            <ProductSectionHeading
              eyebrow="Workflow"
              title="Quick captures without scene setup"
              description="FastCast focuses on the common path: choose a screen or window, choose audio, add an optional webcam overlay, then record or stream. It is designed for lightweight Windows capture workflows during Open Beta."
            />
          </div>
          <aside className="product-panel product-release-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
            <h3>Current release</h3>
            <p className="product-release-name mt-3 font-display text-4xl text-slate-900">v0.8.0</p>
            <p className="product-panel-copy mt-3 text-sm leading-relaxed text-slate-600">
              This release adds Instant Replay, which keeps the last 15 to 300 seconds in memory and saves a clip with
              <code>Ctrl+Alt+F8</code>. It also adds notification-area controls and recent-file clip access. FastCast
              does not download or install updates automatically.
            </p>
            <a href={fastCastReleaseUrl} target="_blank" rel="noopener noreferrer" className="product-panel-link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              Open release page
              <ArrowUpRight className="h-4 w-4 text-amber-500" />
            </a>
          </aside>
        </div>
      </section>

      <section className="product-section product-section-features border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading eyebrow="Open Beta features" title="Screen recording, audio, webcam, and streaming in one focused app" />
          <FeatureGrid items={fastCastFeatures} />
        </div>
      </section>

      <section id="privacy" className="product-section product-section-trust border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-split-grid grid gap-8 lg:grid-cols-2">
          <div className="product-copy-block">
            <ProductSectionHeading eyebrow="Privacy and trust" title="Local-first behavior, explicit checks" />
            <div className="product-prose mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">
                No telemetry. No accounts. No crash upload. No background polling. No automatic updates.
              </p>
              <p>Stream keys are not saved to disk.</p>
              <p>
                The manual Check for Updates action only checks the public release feed. It does not download or install
                updates.
              </p>
              <p>
                Support bundles are created only when you click Save Support Bundle. They are saved locally and redacted
                before being written.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <article id="verify" className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Verify the download</h3>
              <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-600">
                Download <code>FastCast-0.8.0-win-x64.zip</code> from the latest release. An optional{' '}
                <code>.sha256</code> sidecar is included for integrity checks.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Expected SHA-256</p>
              <code className="mt-2 block break-all rounded-xl bg-slate-100 p-3 text-xs text-slate-700">
                b03291c8e820b192a229b1f7874ef5c55ed7e7ede05128c87da080eb1f8648a6
              </code>
            </article>
            <article className="product-panel product-warning-panel rounded-2xl border border-amber-200/70 bg-amber-50 p-6">
              <TriangleAlert className="h-6 w-6 text-amber-700" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Unsigned Open Beta</h3>
              <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-700">
                FastCast is currently unsigned, so Windows SmartScreen may show an "Unknown Publisher" warning. If you
                trust the download source, click More info -&gt; Run anyway. If that is a dealbreaker, do not run it yet.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="beta" className="product-section product-section-beta border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-split-grid grid gap-8 lg:grid-cols-2">
          <div className="product-copy-block">
            <ProductSectionHeading eyebrow="Open Beta status" title="FastCast Free stays free. Pro unlocks more." />
            <p className="product-section-description mt-5 text-base leading-relaxed text-slate-600">
              FastCast Free covers simple 1080p30 recording and streaming: monitor or window capture, mic and desktop
              audio, webcam overlay, and custom RTMP/RTMPS streaming. A one-time FastCast Pro license unlocks
              higher-resolution recording (1440p and 4K), 60 fps capture where your hardware supports it, and advanced
              encoder controls. Activation is local-first: no accounts, no telemetry.
            </p>
            <p className="mt-5">
              <a
                href={fastCastProCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="product-panel-link inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900"
                onClick={() => trackCtaClick('fastcast', 'pro_clicked', 'pricing', fastCastProCheckoutUrl)}
              >
                Buy a FastCast Pro license
                <ArrowUpRight className="h-4 w-4 text-amber-500" />
              </a>
            </p>
            <div className="product-panel mt-7 rounded-2xl border border-slate-200 bg-white p-6">
              <LockKeyhole className="h-6 w-6 text-slate-700" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Private source</h3>
              <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-600">
                FastCast source code is private and proprietary. The public repository hosts downloads and version
                metadata only.
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Known limitations</h3>
            <div className="mt-5">
              <BulletedList
                items={[
                  'No scene system / multiple sources yet',
                  'No chroma key or filters yet',
                  'No multistream / simulcast yet',
                  'No platform OAuth yet',
                  'Intel hardware encoding is not broadly validated yet; software fallback is included',
                  'App is unsigned during Open Beta',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="guides" className="product-section product-section-guides border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-guide">
          <ProductSectionHeading
            eyebrow="Guides"
            title="Learn Windows screen recording"
            description="Focused guides to the recording questions FastCast gets asked about most: capturing screen and webcam together, what 4K 60 FPS really requires, keeping recordings smooth, fixing black or silent recordings, and an honest comparison with OBS."
          />
          <div className="guide-grid">
            {fastCastGuides.map((guide) => (
              <a key={guide.slug} href={fastCastGuidePath(guide.slug)} className="guide-card">
                <p className="guide-card-category">{guide.category}</p>
                <h3>{guide.shortTitle}</h3>
                <p className="guide-card-copy">{guide.description}</p>
                <span className="guide-card-more">
                  Read the guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-8">
            <a href="/fastcast/guides" className="product-panel-link inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              Browse all FastCast guides
              <ArrowUpRight className="h-4 w-4 text-amber-500" />
            </a>
          </p>
        </div>
      </section>

      <section className="product-section product-section-faq border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading eyebrow="FAQ" title="FastCast questions" />
          <FaqList faqs={fastCastFaqs} />
        </div>
      </section>

      <section className="product-section product-section-cta border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <div className="product-cta-panel cta-panel p-8 text-center sm:p-10">
            <h2 className="product-section-title font-display text-3xl text-slate-900 sm:text-4xl">Download the current Open Beta</h2>
            <p className="product-section-description mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              If something breaks, click Save Support Bundle in FastCast and send the generated ZIP with a short
              description of what happened.
            </p>
            <div className="product-hero-actions mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={fastCastDownloadUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-primary cta-primary" onClick={() => trackProductCta('fastcast', 'final', fastCastDownloadUrl)}>
                <Download className="h-5 w-5" />
                Download latest release
              </a>
              <a href={fastCastAllReleasesUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-secondary cta-secondary">
                <Github className="h-5 w-5" />
                All releases
              </a>
              <a href={fastCastPortableUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-secondary cta-secondary">
                <Download className="h-5 w-5" />
                Portable ZIP
              </a>
            </div>
          </div>
        </div>
      </section>
    </ProductShell>
  );
}

const fastPlayFeatures: FeatureItem[] = [
  {
    title: 'Instant first frame',
    body: 'Opens files and reaches the first visible frame as fast as the hardware allows. D3D11 hardware decode keeps video on the GPU from decode to present.',
    Icon: Zap,
  },
  {
    title: 'Responsive seek',
    body: 'Generation-based stale-work dropping means old frames never delay new ones. Scrub the timeline and see results immediately.',
    Icon: BadgeCheck,
  },
  {
    title: 'GPU-resident video path',
    body: 'Decoded video stays on the GPU through a DXGI flip-model swap chain. No CPU copy-back during normal playback.',
    Icon: Cpu,
  },
  {
    title: 'Recent files and resume',
    body: 'Open recent files from the overlay and resume each file near the last watched position without building a persistent library.',
    Icon: FileVideo,
  },
  {
    title: 'Queue without playlists',
    body: 'Drop several files or one folder to create a temporary queue. Step through it manually or let natural end-of-file advance to the next item.',
    Icon: PlayCircle,
  },
  {
    title: 'Viewing controls',
    body: 'Cursor-centered zoom, drag-to-pan, 90-degree rotation, borderless fullscreen, playback speed control, and in/out point looping.',
    Icon: Keyboard,
  },
  {
    title: 'Robust Windows playback',
    body: 'Handles resize, DPI, audio endpoint churn, device recovery, and software decode fallback while preserving the D3D11 present path.',
    Icon: ShieldCheck,
  },
  {
    title: 'Native HDR and SDR tone mapping',
    body: 'HDR10 (PQ) and HLG present natively on HDR-active displays and tone-map to SDR on regular displays. Full-range PQ files are supported.',
    Icon: Sun,
  },
  {
    title: 'High-frame-rate playback',
    body: 'A smoothly advancing audio clock lets 120 fps video present at full cadence on a high-refresh display instead of dropping one frame in six.',
    Icon: Gauge,
  },
  {
    title: 'Audio-only files',
    body: 'MP3, FLAC, WAV, OGG, AAC, M4A, and OPUS files play with the same fast open, responsive seek, and queue behavior as video.',
    Icon: Music,
  },
];

const fastPlayControls: Array<[string, string]> = [
  ['Space', 'Pause / resume / replay'],
  ['Left / Right', 'Seek 5s, hold for 15s steps'],
  ['Ctrl+F / Ctrl+B', 'Move one frame forward / backward'],
  ['Ctrl+O (letter O)', 'Open media file'],
  ['Ctrl+Shift+O (letter O)', 'Recent files overlay'],
  ['PageUp / PageDown', 'Previous / next file in the play queue'],
  ['Ctrl+S', 'Save screenshot'],
  ['Ctrl+Shift+S', 'Toggle framed/frameless windowed mode'],
  ['[ / ]', 'Decrease / increase playback speed'],
  ['\\', 'Reset speed to 1x'],
  ['I / O', 'Set in-point / out-point'],
  ['Shift+I / Shift+O', 'Clear in-point / out-point'],
  ['R', 'Toggle loop range or auto-replay'],
  ['S', 'Toggle subtitles'],
  ['Mouse wheel', 'Volume'],
  ['Ctrl+Mouse wheel', 'Zoom at cursor'],
  ['Ctrl+Drag', 'Pan when zoomed'],
  ['Ctrl+0 (zero)', 'Reset zoom, pan, rotation'],
  ['Ctrl+R / Ctrl+E', 'Rotate CW / CCW'],
  ['Ctrl+H', 'Borderless fullscreen'],
  ['Esc', 'Exit fullscreen'],
  ['Ctrl+W', 'Fit window to video'],
  ['Ctrl+Q', 'Half-resolution window'],
  ['Backspace', 'Cancel scrub'],
  ['H (hold)', 'Show controls overlay'],
  ['`', 'Toggle HW/SW decode mode in title bar'],
];

const fastPlayFaqs = [
  {
    question: 'What is FastPlay?',
    answer:
      'FastPlay is a fast, lightweight native Windows video player built for local video playback, responsive seeking, hardware-accelerated decode, and simple controls.',
  },
  {
    question: 'Is FastPlay a VLC alternative?',
    answer:
      'FastPlay can be used as a lightweight VLC alternative for Windows users who mainly want simple local file playback, fast startup, smooth scrubbing, and responsive controls. VLC is still better for advanced streaming, disc playback, filters, plugins, and cross-platform use.',
  },
  {
    question: 'What platforms does FastPlay support?',
    answer: 'FastPlay is built for Windows 10 and later, 64-bit.',
  },
  {
    question: 'Is FastPlay free?',
    answer: 'Yes. FastPlay is free and open source under the MIT License.',
  },
  {
    question: 'What makes FastPlay fast?',
    answer:
      'FastPlay is built around native Windows playback, FFmpeg demux/decode, D3D11 hardware decode, DXGI presentation, bounded queues, stale-work dropping during seek, and WASAPI audio.',
  },
  {
    question: 'Does FastPlay support subtitles?',
    answer:
      'FastPlay supports external sidecar .srt subtitle files placed next to the media file. Embedded subtitle tracks and other subtitle formats are not loaded, and styling is intentionally minimal.',
  },
  {
    question: 'Is FastPlay the fastest video player?',
    answer:
      'FastPlay is designed for fast local playback, but "fastest" claims require benchmark data. The benchmark page covers planned startup, seek, resume, memory, and playback comparisons.',
  },
];

export function FastPlayProductPage() {
  const product = productBySlug.fastplay;

  return (
    <ProductShell
      variant="fastplay"
      brand="FastPlay"
      brandIconUrl="/assets/FastPlay/fastplay.png"
      navLinks={[
        { href: '#release', label: 'v0.4.6' },
        { href: '#features', label: 'Features' },
        { href: '#architecture', label: 'Architecture' },
        { href: '#vlc', label: 'vs VLC' },
        { href: '#guides', label: 'Guides' },
        { href: '#faq', label: 'FAQ' },
        { href: '/roadmap', label: 'Roadmap' },
        { href: fastPlaySourceUrl, label: 'GitHub' },
      ]}
      footer={
        <>
          <p className="product-intent-links">
            <span>Fast Windows video player</span>
            <span aria-hidden="true"> · </span>
            <span>Play videos fast on Windows</span>
            <span aria-hidden="true"> · </span>
            <span>Lightweight video player for Windows</span>
            <span aria-hidden="true"> · </span>
            <span>VLC alternative for Windows</span>
            <span aria-hidden="true"> · </span>
            <span>FastPlay benchmarks</span>
          </p>
          <p>
            FastPlay by <a href="https://github.com/CalvinSturm" target="_blank" rel="noopener noreferrer">Calvin Sturm</a>
            <span aria-hidden="true"> · </span>
            <a href="/fastplay/guides">Guides</a>
            <span aria-hidden="true"> · </span>
            <a href={fastPlaySourceUrl} target="_blank" rel="noopener noreferrer">Source on GitHub</a>
            <span aria-hidden="true"> · </span>
            MIT License
          </p>
        </>
      }
    >
      <ProductHero
        product={product}
        eyebrow="Fast lightweight Windows video player"
        title="A fast Windows video player for local files"
        subtitle="FastPlay opens local videos quickly, seeks responsively, uses hardware-accelerated decode, and stays out of the way."
        description="FastPlay is a simple native Windows app for local file playback. It is not trying to replace every advanced VLC feature; it focuses on fast startup, smooth scrubbing, responsive controls, and a lightweight everyday playback experience."
        primaryLabel="Download FastPlay for Windows"
        primaryHref={fastPlayDownloadUrl}
        secondaryLabel="View source on GitHub"
        secondaryHref={fastPlaySourceUrl}
        meta="v0.4.6 · Windows 10+ · MIT License"
        subMeta="Windows x64 local playback. No streaming, media library, or plugin system."
        heroIconUrl="/assets/FastPlay/fastplay.png"
        heroIconAlt="FastPlay app icon"
        preview={
          <figure className="product-preview overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-[0_30px_80px_rgba(17,24,39,0.18)]">
            <video
              src="/assets/FastPlay/fastplay-demo.mp4"
              poster="/assets/FastPlay/fastplay-demo-poster.jpg"
              className="h-auto w-full"
              width="544"
              height="988"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="FastPlay demo: a sunset beach video opens instantly, plays with timeline scrubbing, and ends on the keyboard controls overlay."
            />
          </figure>
        }
      />

      <section id="release" className="product-section product-section-release border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <article className="product-panel product-release-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)] sm:p-8">
            <ProductSectionHeading
              eyebrow="Current release"
              title="New in v0.4.6: frameless windows and better portrait video"
              description="Switch between framed and frameless windows, keep your preferred style across new instances, and open rotated phone videos in a correctly sized portrait window."
            />
            <div className="product-release-list mt-7 grid gap-4 md:grid-cols-3">
              {[
                ['Frameless mode', 'Press Ctrl+Shift+S to switch between framed and frameless windows without changing the normal playback controls.'],
                ['Your choice remembered', 'New FastPlay windows open in the window style you last selected.'],
                ['Better portrait video', 'Rotated phone videos now open in a correctly sized portrait window without empty side space.'],
              ].map(([title, body]) => (
                <div key={title} className="product-release-item rounded-xl bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              ))}
            </div>
            <a href={fastPlayReleaseNotesUrl} target="_blank" rel="noopener noreferrer" className="product-panel-link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              Read v0.4.6 release notes
              <ArrowUpRight className="h-4 w-4 text-amber-500" />
            </a>
          </article>
        </div>
      </section>

      <section id="features" className="product-section product-section-overview border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="At a glance"
            title="A native Windows video player for fast local playback"
            description="FastPlay focuses on startup speed, responsive seeking, smooth playback, hardware-accelerated decode, and simple controls. No media library. No plugin maze. Just fast open, clean playback, and responsive controls."
          />
          <FeatureGrid items={fastPlayFeatures} />
        </div>
      </section>

      <section id="architecture" className="product-section product-section-architecture border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="Architecture"
            title="Rust, FFmpeg, D3D11, DXGI, and WASAPI"
            description="Single crate, single coordinator, bounded queues, and an explicit state machine keep the playback path focused."
          />
          <div className="mt-8 grid gap-4">
            {[
              ['Video path (hardware decode)', 'FFmpeg demux -> D3D11 hw decode -> GPU surface -> DXGI flip-model present'],
              ['Audio path', 'FFmpeg decode -> WASAPI shared-mode sink'],
              ['Fallback path (software decode)', 'FFmpeg demux -> Software decode -> D3D11 upload -> DXGI present'],
            ].map(([label, path]) => (
              <div key={label} className="product-arch-path rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
                <p className="product-arch-label text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">{label}</p>
                <p className="product-arch-copy mt-3 break-words font-mono text-sm leading-relaxed text-slate-200">{path}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vlc" className="product-section product-section-formats border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-format-audience-grid grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <ProductSectionHeading
              eyebrow="Format support"
              title="Common local video and audio formats"
              description="FFmpeg-backed demux and decode support for everyday local media files."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {['.mp4', '.mkv', '.mov', '.avi', '.webm', '.m4v', '.wmv', '.mp3', '.flac', '.wav', '.ogg', '.m4a', '.opus', '.srt subtitles'].map((format) => (
                <span key={format} className="product-format-tag rounded-full border border-slate-200 bg-white px-4 py-2 font-mono text-sm text-slate-600">
                  {format}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="product-panel product-audience-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">FastPlay is a good fit if you want</h3>
              <div className="mt-5">
                <BulletedList
                  items={[
                    'A fast Windows video player for local files',
                    'A lightweight media player without a media-library workflow',
                    'Smooth scrubbing and responsive seek behavior',
                    'Resume-friendly everyday playback',
                    'Hardware-accelerated playback on Windows',
                    'Simple controls without plugin or settings clutter',
                  ]}
                />
              </div>
            </article>
            <article className="product-panel product-audience-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">VLC is still better if you need</h3>
              <div className="mt-5">
                <BulletedList
                  items={[
                    'Advanced codec tools',
                    'Network streams',
                    'Disc playback',
                    'Filters and plugins',
                    'Cross-platform support',
                    'Deep media troubleshooting tools',
                  ]}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="facts" className="product-section product-section-facts border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading eyebrow="Facts" title="FastPlay facts" description="A quick reference for the essentials." />
          <FactsTable
            rows={[
              ['Product', 'FastPlay'],
              ['Developer', 'Calvin Sturm'],
              ['Category', 'Windows video player'],
              ['Platform', 'Windows 10 and later, 64-bit'],
              ['License', 'MIT License (free and open source)'],
              ['Primary use', 'Local video playback'],
              ['Main benefits', 'Fast startup, responsive seeking, hardware-accelerated decode, simple controls'],
              ['Technology', 'Rust, FFmpeg, D3D11, DXGI, WASAPI'],
              ['Best for', 'Users who want a fast lightweight Windows video player for local files'],
              ['Not designed for', 'Advanced network streaming, disc playback, broadcast workflows, or replacing every VLC power-user feature'],
            ]}
          />
        </div>
      </section>

      <section id="controls" className="product-section product-section-controls border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="Keyboard controls"
            title="Every action has a keybind"
            description="Hold H in the player to see the full controls overlay."
          />
          <div className="product-controls-wrapper mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Key</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {fastPlayControls.map(([key, action]) => (
                  <tr key={key} className="border-b border-slate-100 last:border-b-0">
                    <td className="whitespace-nowrap px-5 py-3 font-mono text-sm text-slate-900">{key}</td>
                    <td className="px-5 py-3 text-slate-600">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="guides" className="product-section product-section-guides border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-guide">
          <ProductSectionHeading
            eyebrow="Guides"
            title="Fix Windows playback problems"
            description="Focused guides to the problems FastPlay gets asked about most: HDR that looks washed out, MOV files that will not open, missing HEVC codecs, playback that stutters, and reviewing long footage faster."
          />
          <div className="guide-grid">
            {fastPlayGuides.map((guide) => (
              <a key={guide.slug} href={fastPlayGuidePath(guide.slug)} className="guide-card">
                <p className="guide-card-category">{guide.category}</p>
                <h3>{guide.shortTitle}</h3>
                <p className="guide-card-copy">{guide.description}</p>
                <span className="guide-card-more">
                  Read the guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-8 text-center">
            <a href="/fastplay/guides" className="product-panel-link inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              Browse all FastPlay guides
              <ArrowUpRight className="h-4 w-4 text-amber-500" />
            </a>
          </p>
        </div>
      </section>

      <section id="faq" className="product-section product-section-faq border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <FaqList faqs={fastPlayFaqs} />
        </div>
      </section>

      <section className="product-section product-section-cta border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <div className="product-cta-panel cta-panel p-8 text-center sm:p-10">
            <h2 className="product-section-title font-display text-3xl text-slate-900 sm:text-4xl">Try FastPlay</h2>
            <p className="product-section-description mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Free, open source, MIT licensed. Built for Windows 10 and later.
            </p>
            <div className="product-hero-actions mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={fastPlayDownloadUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-primary cta-primary" onClick={() => trackProductCta('fastplay', 'final', fastPlayDownloadUrl)}>
                <Download className="h-5 w-5" />
                Download MSI installer
              </a>
              <a href={fastPlaySourceUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-secondary cta-secondary">
                <Github className="h-5 w-5" />
                GitHub repository
              </a>
            </div>
          </div>
        </div>
      </section>
    </ProductShell>
  );
}

const fastClipSteps: Array<{ num: string; title: string; body: string }> = [
  {
    num: '01',
    title: 'Import',
    body: 'Point FastClip at a long local video. It probes the file and creates a resumable project without copying or modifying your source.',
  },
  {
    num: '02',
    title: 'Analyze',
    body: 'On-device signals like speech density, audio energy, and dead air find the moments worth keeping. No cloud, no credits.',
  },
  {
    num: '03',
    title: 'Review',
    body: 'A ranked candidate list shows every proposed clip. Preview them, adjust them, and pick the ones you want.',
  },
  {
    num: '04',
    title: 'Export',
    body: 'Selected clips render to 1080×1920 vertical MP4s, with captions burned in if you want them.',
  },
];

const fastClipFeatures: FeatureItem[] = [
  {
    title: 'Fully local pipeline',
    body: 'Analysis, transcription, and export all run on your machine. No uploads, no cloud services, no analytics.',
    Icon: WifiOff,
  },
  {
    title: 'Automatic candidate clips',
    body: 'Variable-duration highlight windows are proposed from acoustic and structural signals, then ranked by speech density, audio energy, dead air, duration fit, and hook openings.',
    Icon: Sparkles,
  },
  {
    title: 'Four workflow modes',
    body: 'Speech, ActionSports, MusicMontage, and ManualPrivate select scoring weights and caption defaults to match the footage.',
    Icon: ListChecks,
  },
  {
    title: 'Deterministic 9:16 export',
    body: 'Center-crop to 1080×1920 MP4 (H.264/AAC) with the same result every time. No surprise re-renders.',
    Icon: Crop,
  },
  {
    title: 'Optional burned-in captions',
    body: 'Caption plans compile to burned-in subtitles with three built-in styles, in Auto, Force, or None modes.',
    Icon: Subtitles,
  },
  {
    title: 'Local transcription',
    body: 'Captions are driven by whisper.cpp running on your hardware. Audio never leaves your machine.',
    Icon: Mic,
  },
  {
    title: 'Hardware encoding',
    body: 'Exports prefer FFmpeg h264_nvenc and fall back to libx264 automatically when NVENC is not available.',
    Icon: Cpu,
  },
  {
    title: 'Safe project folders',
    body: 'Each source gets a versioned .fastclip project folder. Source media is referenced by path, never copied or modified.',
    Icon: HardDrive,
  },
];

const fastClipModes: Array<{ name: string; body: string }> = [
  {
    name: 'Speech',
    body: 'Talking videos, podcasts, streams, and lessons. Weighs speech density and hook openings, with captions on by default.',
  },
  {
    name: 'ActionSports',
    body: 'Sports and action footage. Weighs audio energy spikes and crowd moments over dialogue.',
  },
  {
    name: 'MusicMontage',
    body: 'Music and montage sources. Favors sustained energy and rhythm over speech.',
  },
  {
    name: 'ManualPrivate',
    body: 'Makes no content assumptions and never reads transcript text. For footage you want scored with generic signals only.',
  },
];

const fastClipFaqs = [
  {
    question: 'What is FastClip?',
    answer:
      'FastClip is a Windows app that turns long local videos into ready-to-post 9:16 vertical clips. It analyzes footage on your machine, proposes ranked highlight candidates, and exports 1080×1920 MP4s with optional burned-in captions.',
  },
  {
    question: 'Does FastClip upload my footage?',
    answer:
      'No. FastClip is fully local. Analysis, transcription, and export run on your machine, with no uploads, accounts, or analytics. Source files are referenced by path and never copied or modified.',
  },
  {
    question: 'Is FastClip an alternative to cloud AI clipping tools?',
    answer:
      'FastClip is a local-first alternative to tools like OpusClip, Kapwing, and CapCut for the core clipping job: there are no per-minute credits and footage never leaves your machine. Cloud tools are still better if you need team collaboration, auto-posting, or mobile editing.',
  },
  {
    question: 'Is FastClip a video editor?',
    answer:
      'No. FastClip is intentionally not a nonlinear editor: there is no multi-track timeline and no general-purpose compositing. It does one job: find, review, and export vertical highlight clips.',
  },
  {
    question: 'How do captions work?',
    answer:
      'Captions are optional. Local transcription via whisper.cpp drives caption plans that are burned in as subtitles, with clean_white, bold_yellow, and creator_pop built-in styles and Auto, Force, and None caption modes.',
  },
  {
    question: 'When can I download FastClip?',
    answer:
      'FastClip is in open beta. The latest Windows build is available now on GitHub Releases, and updates are announced on the Fast Series page.',
  },
  {
    question: 'Will FastClip be free?',
    answer:
      'The plan is a free version for analyzing footage and previewing every candidate clip, with a one-time FastClip Pro license for bulk export and premium caption styles. No subscription and no monthly credits are planned.',
  },
];

export function FastClipProductPage() {
  const product = productBySlug.fastclip;

  return (
    <ProductShell
      variant="fastclip"
      brand="FastClip"
      brandIconUrl="/assets/FastClip/FastClip_Icon.png"
      navLinks={[
        { href: '#how', label: 'How it works' },
        { href: '#features', label: 'Features' },
        { href: '#privacy', label: 'Privacy' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#guides', label: 'Guides' },
        { href: '#faq', label: 'FAQ' },
        { href: '/fast-series', label: 'Fast Series' },
      ]}
      footer={
        <>
          <p>FastClip is in open beta. Source is currently private; public builds are on <a href={fastClipAllReleasesUrl} target="_blank" rel="noopener noreferrer">GitHub Releases</a>.</p>
          <p>
            FastClip by <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer">Calvin Sturm</a> / Sturm Technologies LLC
            <span aria-hidden="true"> · </span>
            <a href="/fastclip/guides">FastClip guides</a>
            <span aria-hidden="true"> · </span>
            <a href="/fast-series">Fast Series</a>
          </p>
        </>
      }
    >
      <ProductHero
        product={product}
        eyebrow="Local vertical clip generator for Windows"
        title="Turn long videos into vertical clips, locally"
        subtitle="FastClip scans long local videos for likely highlight moments, then lets you review and export ready-to-post 9:16 clips with optional captions."
        description="FastClip is a native Windows app that imports a source video, analyzes it with on-device signals, proposes ranked candidate clips, and lets you review and export 1080×1920 MP4s. No uploads, no accounts, no monthly credits: your footage never leaves your machine."
        primaryLabel="Download FastClip for Windows"
        primaryHref={fastClipReleaseUrl}
        secondaryLabel="View all releases"
        secondaryHref={fastClipAllReleasesUrl}
        meta="Open beta · Windows 10/11 x64 · Local-only processing"
        subMeta="Public beta builds are hosted on GitHub Releases."
        heroIconUrl="/assets/FastClip/FastClip_Icon.png"
        heroIconAlt="FastClip app icon"
        preview={
          <div
            className="fastclip-preview product-preview"
            role="img"
            aria-label="Illustration of the FastClip review workflow: a ranked list of candidate clips next to a vertical 9:16 export preview."
          >
            <div className="fastclip-preview-main">
              <div className="fastclip-preview-header">
                <span className="fastclip-preview-file">saturday-game_full.mp4</span>
                <span className="fastclip-preview-mode">ActionSports</span>
              </div>
              <ul className="fastclip-candidates">
                {[
                  ['Clip 01', '12:41 - 13:04', 92],
                  ['Clip 02', '31:17 - 31:52', 87],
                  ['Clip 03', '54:02 - 54:21', 81],
                  ['Clip 04', '1:07:48 - 1:08:11', 76],
                ].map(([name, range, score]) => (
                  <li key={name} className="fastclip-candidate">
                    <span className="fastclip-candidate-name">{name}</span>
                    <span className="fastclip-candidate-range">{range}</span>
                    <span className="fastclip-candidate-score">
                      <span style={{ width: `${score}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="fastclip-preview-footer">14 candidates found · 4 selected for export</p>
            </div>
            <div className="fastclip-phone">
              <div className="fastclip-phone-screen">
                <span className="fastclip-phone-play" />
                <span className="fastclip-phone-caption">AND HE TAKES THE LEAD</span>
              </div>
              <span className="fastclip-phone-label">1080×1920</span>
            </div>
          </div>
        }
      />

      <section id="how" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="How it works"
            title="Import, analyze, review, export"
            description="FastClip exists for creators with long recordings who need the good moments without scrubbing for an hour. It is built around one loop: it proposes the clips, you make the calls, and everything happens on your machine."
          />
          <div className="fastclip-step-grid">
            {fastClipSteps.map((step) => (
              <article key={step.num} className="fastclip-step">
                <span className="fastclip-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="Features"
            title="An automated clipping pipeline, not another editor"
            description="FastClip is intentionally not a nonlinear editor. There is no multi-track timeline and no compositing: it finds clips, you review them, and it exports clean vertical MP4s."
          />
          <FeatureGrid items={fastClipFeatures} />
        </div>
      </section>

      <section id="modes" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="Workflow modes"
            title="Scoring that matches the footage"
            description="Each mode selects highlight scoring weights and default caption behavior, so a podcast is not scored like a hockey game."
          />
          <div className="fastclip-mode-grid">
            {fastClipModes.map((mode) => (
              <article key={mode.name} className="fastclip-mode">
                <h3>{mode.name}</h3>
                <p>{mode.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="captions" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-split-grid grid gap-8 lg:grid-cols-2">
          <div className="product-copy-block">
            <ProductSectionHeading eyebrow="Captions" title="Burned-in captions, transcribed on your hardware" />
            <div className="product-prose mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Captions are optional and fully local. Transcription runs through whisper.cpp on your machine, drives a
                caption plan you can regenerate, and gets burned into the export as subtitles.
              </p>
              <p>
                Caption modes are <code>Auto</code>, <code>Force</code>, and <code>None</code>, so speech footage gets
                captions by default and montage footage stays clean.
              </p>
              <p>FastClip does not download or bundle models: you choose the local Whisper model it uses.</p>
            </div>
          </div>
          <div className="fastclip-caption-samples">
            <div className="fastclip-caption-sample">
              <span className="fastclip-caption-demo fastclip-caption-clean">Clean and readable</span>
              <span className="fastclip-caption-name">clean_white</span>
            </div>
            <div className="fastclip-caption-sample">
              <span className="fastclip-caption-demo fastclip-caption-bold">BOLD AND LOUD</span>
              <span className="fastclip-caption-name">bold_yellow</span>
            </div>
            <div className="fastclip-caption-sample">
              <span className="fastclip-caption-demo fastclip-caption-pop">
                POP THE <em>KEY</em> WORD
              </span>
              <span className="fastclip-caption-name">creator_pop</span>
            </div>
          </div>
        </div>
      </section>

      <section id="privacy" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-split-grid grid gap-8 lg:grid-cols-2">
          <div className="product-copy-block">
            <ProductSectionHeading eyebrow="Privacy" title="Local-first by design" />
            <div className="product-prose mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">
                No uploads. No cloud services. No accounts. No analytics.
              </p>
              <p>
                Source media never leaves your machine and is never copied or modified. Projects reference it by
                absolute path, and everything FastClip generates stays in a project folder you can delete.
              </p>
              <p>
                The ManualPrivate workflow mode goes further: it makes no content assumptions and never reads
                transcript text at all.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <article className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <Scissors className="h-6 w-6 text-slate-700" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">A clip generator, not an editor</h3>
              <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-600">
                There is no timeline, no compositing, and no general-purpose editing model. If a clip needs real
                editing, export it and finish it in the editor you already use.
              </p>
            </article>
            <article className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <LockKeyhole className="h-6 w-6 text-slate-700" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Open beta</h3>
              <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-600">
                FastClip is built in Rust with a Tauri and React shell. The source is currently private; public beta
                builds are hosted on GitHub Releases.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="compare" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="Compare"
            title="Where FastClip fits"
            description="Cloud AI clipping tools are subscription ecosystems built around uploads and credits. FastClip keeps the core job on your machine."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <article className="product-panel product-audience-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">FastClip is a good fit if you want</h3>
              <div className="mt-5">
                <BulletedList
                  items={[
                    'Clips from long footage without uploading it anywhere',
                    'No per-minute credits or processing quotas',
                    'Sports, speech, and music-aware highlight scoring',
                    'Deterministic 9:16 exports you can rerun',
                    'Captions transcribed locally, not in the cloud',
                    'A focused tool instead of a full editor',
                  ]}
                />
              </div>
            </article>
            <article className="product-panel product-audience-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">Cloud tools are still better if you need</h3>
              <div className="mt-5">
                <BulletedList
                  items={[
                    'Team collaboration and shared workspaces',
                    'Auto-posting and publishing schedules',
                    'Editing from a phone or browser',
                    'Cloud storage for your library',
                    'AI b-roll, reframing, and effects pipelines',
                    'Mac or Linux support today',
                  ]}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="pricing" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-split-grid grid gap-8 lg:grid-cols-2">
          <div className="product-copy-block">
            <ProductSectionHeading eyebrow="Pricing" title="Free to try, pay once. No subscription planned." />
            <div className="product-prose mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                The planned model is simple: the free version analyzes your footage and shows every candidate clip it
                finds, with a per-project export limit. A one-time FastClip Pro license unlocks the rest.
              </p>
              <p>
                There are no cloud costs behind FastClip, so there is no reason to charge monthly. No credits, no
                metering, no account required.
              </p>
              <p className="text-sm text-slate-500">Final pricing will be announced when FastClip leaves beta.</p>
            </div>
          </div>
          <div className="grid gap-4">
            <article className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">Free (planned)</h3>
              <div className="mt-4">
                <BulletedList
                  items={[
                    'Import and analyze local videos',
                    'Preview every candidate clip',
                    'All four workflow modes',
                    'Export a few clips per project',
                    'clean_white caption style',
                  ]}
                />
              </div>
            </article>
            <article className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">FastClip Pro (planned)</h3>
              <div className="mt-4">
                <BulletedList
                  items={[
                    'One-time license, yours for good',
                    'Unlimited exports and bulk Export All',
                    'Premium caption styles',
                    'Same local-only processing',
                  ]}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="facts" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading eyebrow="Facts" title="FastClip facts" description="A quick reference for the essentials." />
          <FactsTable
            rows={[
              ['Product', 'FastClip'],
              ['Developer', 'Calvin Sturm (Sturm Technologies LLC)'],
              ['Category', 'Vertical clip generator / highlight clipper'],
              ['Platform', 'Windows 10 and later, 64-bit'],
              ['Status', 'Open beta, public builds on GitHub Releases'],
              ['Output', '9:16 vertical MP4, 1080×1920, H.264/AAC'],
              ['Captions', 'Optional burned-in captions via local whisper.cpp transcription'],
              ['Processing', '100% local: no uploads, no cloud services, no analytics'],
              ['Technology', 'Rust, Tauri, React, FFmpeg, whisper.cpp'],
              ['Best for', 'Creators turning long recordings into short vertical clips without uploading footage'],
              ['Not designed for', 'Multi-track editing, compositing, or replacing a full editor'],
            ]}
          />
        </div>
      </section>

      <section id="guides" className="product-section product-section-guides border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-guide">
          <ProductSectionHeading
            eyebrow="Guides"
            title="Learn the local clipping workflow"
            description="Practical guides to turning long recordings into short-form clips on Windows: finding the moments, reframing for 9:16, and adding captions without uploading footage anywhere."
          />
          <div className="guide-grid">
            {fastClipGuides.map((guide) => (
              <a key={guide.slug} href={fastClipGuidePath(guide.slug)} className="guide-card">
                <p className="guide-card-category">{guide.category}</p>
                <h3>{guide.shortTitle}</h3>
                <p className="guide-card-copy">{guide.description}</p>
                <span className="guide-card-more">
                  Read the guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-8">
            <a href="/fastclip/guides" className="product-panel-link inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              Browse all FastClip guides
              <ArrowUpRight className="h-4 w-4 text-amber-500" />
            </a>
          </p>
        </div>
      </section>

      <section id="faq" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading eyebrow="FAQ" title="FastClip questions" />
          <FaqList faqs={fastClipFaqs} />
        </div>
      </section>

      <section className="product-section product-section-cta border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <div className="product-cta-panel cta-panel p-8 text-center sm:p-10">
            <h2 className="product-section-title font-display text-3xl text-slate-900 sm:text-4xl">Try the FastClip open beta</h2>
            <p className="product-section-description mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              The first public FastClip beta for Windows is available now on GitHub Releases. FastCast and FastPlay
              are also available today: both are free, native Windows
              tools from the same Fast Series.
            </p>
            <div className="product-hero-actions mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={fastClipReleaseUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-primary cta-primary" onClick={() => trackProductCta('fastclip', 'final', fastClipReleaseUrl)}>
                <Download className="h-5 w-5" />
                Download FastClip
              </a>
              <a href="/fast-series" className="product-button product-button-secondary cta-secondary">
                <Zap className="h-5 w-5" />
                Explore the Fast Series
              </a>
            </div>
          </div>
        </div>
      </section>
    </ProductShell>
  );
}

const fastCompressSteps: Array<{ num: string; title: string; body: string }> = [
  {
    num: '01',
    title: 'Pick a video',
    body: 'Choose a local file. MP4, AVI, MOV, MKV, WebM, FLV, and WMV are supported.',
  },
  {
    num: '02',
    title: 'Pick a destination',
    body: 'Presets are named after where the video is going: Discord, Email Safe, YouTube Upload, Archive, or a plain quality level.',
  },
  {
    num: '03',
    title: 'Check the plan',
    body: 'A plan summary shows the selected file, output path, and target size before anything encodes. Unrealistic targets get a warning up front.',
  },
  {
    num: '04',
    title: 'Compress',
    body: 'FFmpeg runs locally with a progress bar and cancel. The result summary shows original size, output size, and percent saved.',
  },
];

const fastCompressFeatures: FeatureItem[] = [
  {
    title: 'Plain-English presets',
    body: 'Smaller File, Balanced, and High Quality cover the size and quality tradeoff without bitrate math.',
    Icon: SlidersHorizontal,
  },
  {
    title: 'Platform presets',
    body: 'Discord, Email Safe, YouTube Upload, and Archive encode for the place the video is actually going.',
    Icon: Target,
  },
  {
    title: 'Target-size planning',
    body: 'Discord and Email Safe presets plan toward a size cap, with an editable target MB field when you need a different number.',
    Icon: Gauge,
  },
  {
    title: 'Plan before you encode',
    body: 'See the file details, output path, and target size before compression starts. No surprises at the end.',
    Icon: ListChecks,
  },
  {
    title: 'Clear results',
    body: 'Every run ends with original size, output size, and percent saved, so you know it worked before you send the file.',
    Icon: FileDown,
  },
  {
    title: 'No watermark, no account',
    body: 'The free version puts nothing on your video and never asks you to sign in.',
    Icon: BadgeCheck,
  },
  {
    title: 'Resolution presets',
    body: '1080p, 720p, and 480p at 30 fps when downscaling is the right way to shrink the file.',
    Icon: FileVideo,
  },
  {
    title: 'CLI mode',
    body: 'Every preset is scriptable from the command line for quick automation.',
    Icon: Terminal,
  },
];

const fastCompressFaqs = [
  {
    question: 'What is FastCompress?',
    answer:
      'FastCompress is a dead-simple Windows video compressor. Pick where the video is going, like Discord or email, and it produces a smaller file that fits, using FFmpeg locally on your machine.',
  },
  {
    question: 'Does FastCompress upload my videos?',
    answer:
      'No. Compression runs entirely on your machine through FFmpeg. There are no uploads, no cloud services, and no account.',
  },
  {
    question: 'Does FastCompress add a watermark?',
    answer: 'No. The free version has no watermark and no account requirement.',
  },
  {
    question: 'What formats does FastCompress support?',
    answer: 'MP4, AVI, MOV, MKV, WebM, FLV, and WMV input files, compressed to H.264 output.',
  },
  {
    question: 'How does the Discord preset work?',
    answer:
      'Target-size presets like Discord and Email Safe plan the encode toward a size cap, and the target MB field is editable if your limit is different. FastCompress warns you up front when a target is unrealistic for the source.',
  },
  {
    question: 'Is FastCompress a HandBrake alternative?',
    answer:
      'For the common case of making a file small enough to send, yes: FastCompress trades HandBrake depth for plain-English presets. HandBrake and raw FFmpeg are still better when you need full control over codecs, filters, and batch pipelines.',
  },
  {
    question: 'When can I download FastCompress?',
    answer:
      'FastCompress is in beta. The latest Windows build is available now on GitHub Releases, and updates are announced on the Fast Series page.',
  },
  {
    question: 'Will FastCompress be free?',
    answer:
      'Basic compression stays free: one video at a time, all presets, editable target sizes, no watermark. A one-time FastCompress Pro license is planned for workflow features like batch compression, folder watch, saved presets, and GPU encoding. No subscription is planned.',
  },
];

export function FastCompressProductPage() {
  const product = productBySlug.fastcompress;

  return (
    <ProductShell
      variant="fastcompress"
      brand="FastCompress"
      brandIconUrl="/assets/FastCompress/FastCompress_Icon.png"
      navLinks={[
        { href: '#how', label: 'How it works' },
        { href: '#features', label: 'Features' },
        { href: '#compare', label: 'Compare' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#guides', label: 'Guides' },
        { href: '#faq', label: 'FAQ' },
        { href: '/fast-series', label: 'Fast Series' },
      ]}
      footer={
        <>
          <p>FastCompress is in beta. Source is currently private; public builds are on <a href={fastCompressAllReleasesUrl} target="_blank" rel="noopener noreferrer">GitHub Releases</a>.</p>
          <p>
            FastCompress by <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer">Calvin Sturm</a> / Sturm Technologies LLC
            <span aria-hidden="true"> · </span>
            <a href="/fastcompress/guides">FastCompress guides</a>
            <span aria-hidden="true"> · </span>
            <a href="/fast-series">Fast Series</a>
          </p>
        </>
      }
    >
      <ProductHero
        product={product}
        eyebrow="Simple video compression for Windows"
        title="Shrink videos to fit, without learning FFmpeg"
        subtitle="FastCompress turns a too-big video into a file that fits Discord, email, YouTube, or an archive limit. No watermark, no upload, no account."
        description="FastCompress is a dead-simple native Windows compressor. Pick where the video is going, check the plan, and compress. Presets speak plain English, target sizes are editable, and everything runs locally through FFmpeg. No watermark, no account, no uploads."
        primaryLabel="Download FastCompress for Windows"
        primaryHref={fastCompressReleaseUrl}
        secondaryLabel="View all releases"
        secondaryHref={fastCompressAllReleasesUrl}
        meta="Beta · Windows 10/11 x64 · No watermark, no account"
        subMeta="Public beta builds are hosted on GitHub Releases."
        heroIconUrl="/assets/FastCompress/FastCompress_Icon.png"
        heroIconAlt="FastCompress app icon"
        preview={
          <div
            className="fastcompress-preview product-preview"
            role="img"
            aria-label="Illustration of the FastCompress workflow: a selected video, the Discord preset with a 10 megabyte target, and a result summary showing the compressed size."
          >
            <div className="fastcompress-row fastcompress-file">
              <span className="fastcompress-file-name">raid-night_highlights.mp4</span>
              <span className="fastcompress-file-size">212.4 MB</span>
            </div>
            <div className="fastcompress-chips">
              {['Discord', 'Email Safe', 'YouTube Upload', 'Archive', 'Balanced'].map((preset) => (
                <span
                  key={preset}
                  className={preset === 'Discord' ? 'fastcompress-chip fastcompress-chip-active' : 'fastcompress-chip'}
                >
                  {preset}
                </span>
              ))}
            </div>
            <div className="fastcompress-row fastcompress-target">
              <span>Target size</span>
              <span className="fastcompress-target-value">10 MB</span>
            </div>
            <div className="fastcompress-progress">
              <span style={{ width: '100%' }} />
            </div>
            <div className="fastcompress-row fastcompress-result">
              <span className="fastcompress-result-label">Done</span>
              <span className="fastcompress-result-value">212.4 MB → 9.8 MB · saved 95%</span>
            </div>
          </div>
        }
      />

      <section id="how" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="How it works"
            title="Pick a video, pick a destination, compress"
            description="FastCompress exists for the annoying moment when a video is too large to send. No bitrate math, no codec settings, no command line required: the preset already knows what the destination needs."
          />
          <div className="fastclip-step-grid">
            {fastCompressSteps.map((step) => (
              <article key={step.num} className="fastclip-step">
                <span className="fastclip-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="Features"
            title="One job: make the file small enough"
            description="FastCompress is a compressor, not an editor. There is no trimming, no timeline, and no cloud. It takes a video that is too big and gives you one that fits."
          />
          <FeatureGrid items={fastCompressFeatures} />
        </div>
      </section>

      <section id="privacy" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-split-grid grid gap-8 lg:grid-cols-2">
          <div className="product-copy-block">
            <ProductSectionHeading eyebrow="Local-first" title="Your video never leaves your machine" />
            <div className="product-prose mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">
                No uploads. No cloud services. No account. No watermark.
              </p>
              <p>
                Online compressors make you upload the file, wait in a queue, and trust a server with your footage.
                FastCompress runs FFmpeg on your own hardware, so a private video stays private and a big file does
                not need to crawl through your upload bandwidth twice.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <article className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <Minimize2 className="h-6 w-6 text-slate-700" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">A compressor, not an editor</h3>
              <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-600">
                There is no trimming, editing, or format conversion workflow. If the clip needs cutting first, cut it
                in the tool you already use, then let FastCompress make it fit.
              </p>
            </article>
            <article className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <LockKeyhole className="h-6 w-6 text-slate-700" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Beta</h3>
              <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-600">
                FastCompress is built in Rust as a native Windows app. The source is currently private; public beta
                builds are hosted on GitHub Releases.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="compare" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="Compare"
            title="Where FastCompress fits"
            description="Online compressors want your upload. HandBrake and FFmpeg want your attention. FastCompress just wants the file to fit."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <article className="product-panel product-audience-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">FastCompress is a good fit if you want</h3>
              <div className="mt-5">
                <BulletedList
                  items={[
                    'A video under the Discord or email size cap today',
                    'Compression without uploading the file anywhere',
                    'Presets named after destinations, not codecs',
                    'An editable target size when the cap is unusual',
                    'A clear before-and-after result summary',
                    'No watermark and no account, ever',
                  ]}
                />
              </div>
            </article>
            <article className="product-panel product-audience-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">HandBrake or FFmpeg is still better if you need</h3>
              <div className="mt-5">
                <BulletedList
                  items={[
                    'Full control over codecs, filters, and containers',
                    'Batch pipelines and complex automation today',
                    'HEVC, AV1, and advanced encoder tuning',
                    'Subtitle, chapter, and audio track handling',
                    'Cross-platform support',
                    'Deep video engineering workflows',
                  ]}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="pricing" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-split-grid grid gap-8 lg:grid-cols-2">
          <div className="product-copy-block">
            <ProductSectionHeading eyebrow="Pricing" title="Compression stays free. Pro unlocks workflow." />
            <div className="product-prose mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                The planned model keeps the core job free forever: one video at a time, every preset, editable target
                sizes, and no watermark. A one-time FastCompress Pro license adds the workflow features heavy users
                want.
              </p>
              <p>
                There are no cloud costs behind FastCompress, so there is no subscription and no credit meter. Pay
                once or do not pay at all.
              </p>
              <p className="text-sm text-slate-500">Final pricing will be announced when FastCompress leaves beta.</p>
            </div>
          </div>
          <div className="grid gap-4">
            <article className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">Free (planned)</h3>
              <div className="mt-4">
                <BulletedList
                  items={[
                    'One video at a time',
                    'All platform, quality, and resolution presets',
                    'Editable target MB for size-capped presets',
                    'No watermark, no account',
                    'CLI mode',
                  ]}
                />
              </div>
            </article>
            <article className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">FastCompress Pro (planned)</h3>
              <div className="mt-4">
                <BulletedList
                  items={[
                    'One-time license, yours for good',
                    'Batch compression, queue, and folder watch',
                    'Saved and custom presets',
                    'GPU fast mode (NVENC, QSV, AMF)',
                    'Parallel processing and export reports',
                  ]}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="facts" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading eyebrow="Facts" title="FastCompress facts" description="A quick reference for the essentials." />
          <FactsTable
            rows={[
              ['Product', 'FastCompress'],
              ['Developer', 'Calvin Sturm (Sturm Technologies LLC)'],
              ['Category', 'Video compressor'],
              ['Platform', 'Windows 10 and later, 64-bit'],
              ['Status', 'Beta, public builds on GitHub Releases'],
              ['Input formats', 'MP4, AVI, MOV, MKV, WebM, FLV, WMV'],
              ['Output', 'H.264 video compressed toward the selected preset or target size'],
              ['Presets', 'Smaller File, Balanced, High Quality, Discord, Email Safe, YouTube Upload, Archive, 1080p/720p/480p 30 fps'],
              ['Processing', '100% local through FFmpeg: no uploads, no cloud, no account'],
              ['Technology', 'Rust, native Windows GUI, FFmpeg'],
              ['Best for', 'Getting a video under a size limit without learning compression'],
              ['Not designed for', 'Editing, trimming, advanced codec control, or batch pipelines (batch is planned for Pro)'],
            ]}
          />
        </div>
      </section>

      <section id="guides" className="product-section product-section-guides border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-guide">
          <ProductSectionHeading
            eyebrow="Guides"
            title="Learn how to get videos under size limits"
            description="Practical guides to the too-big-to-send problem: what Discord and email limits actually allow, why long videos collapse when squeezed, and how to hit a target size cleanly."
          />
          <div className="guide-grid">
            {fastCompressGuides.map((guide) => (
              <a key={guide.slug} href={fastCompressGuidePath(guide.slug)} className="guide-card">
                <p className="guide-card-category">{guide.category}</p>
                <h3>{guide.shortTitle}</h3>
                <p className="guide-card-copy">{guide.description}</p>
                <span className="guide-card-more">
                  Read the guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-8">
            <a href="/fastcompress/guides" className="product-panel-link inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              Browse all FastCompress guides
              <ArrowUpRight className="h-4 w-4 text-amber-500" />
            </a>
          </p>
        </div>
      </section>

      <section id="faq" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading eyebrow="FAQ" title="FastCompress questions" />
          <FaqList faqs={fastCompressFaqs} />
        </div>
      </section>

      <section className="product-section product-section-cta border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <div className="product-cta-panel cta-panel p-8 text-center sm:p-10">
            <h2 className="product-section-title font-display text-3xl text-slate-900 sm:text-4xl">Try the FastCompress beta</h2>
            <p className="product-section-description mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              The first public FastCompress beta for Windows is available now on GitHub Releases. FastCast and
              FastPlay are also available today: both are free, native Windows tools from the same Fast Series.
            </p>
            <div className="product-hero-actions mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={fastCompressReleaseUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-primary cta-primary" onClick={() => trackProductCta('fastcompress', 'final', fastCompressReleaseUrl)}>
                <Download className="h-5 w-5" />
                Download FastCompress
              </a>
              <a href="/fast-series" className="product-button product-button-secondary cta-secondary">
                <Zap className="h-5 w-5" />
                Explore the Fast Series
              </a>
            </div>
          </div>
        </div>
      </section>
    </ProductShell>
  );
}

const fastShortsSteps: Array<{ num: string; title: string; body: string }> = [
  {
    num: '01',
    title: 'Start from a story package',
    body: 'A short script with scene timing and one visual prompt per scene. That single file drives the whole pipeline.',
  },
  {
    num: '02',
    title: 'Generate scene visuals',
    body: 'One vertical image per scene, generated in the cloud or fully locally through a ComfyUI text-to-image workflow.',
  },
  {
    num: '03',
    title: 'Narrate and time the words',
    body: 'Narration comes from ElevenLabs or a local Kokoro TTS server, with word-level timing extracted for captions.',
  },
  {
    num: '04',
    title: 'Animate each scene',
    body: 'Still images become motion clips through a local ComfyUI Wan image-to-video workflow, scene by scene, with resumable checkpoints.',
  },
  {
    num: '05',
    title: 'Compose the final short',
    body: 'Clips are cut against the narration, word-level karaoke captions are burned in, and music is mixed under the voice with ducking. Out comes a finished 9:16 MP4.',
  },
];

const fastShortsFeatures: FeatureItem[] = [
  {
    title: 'Story packages in, videos out',
    body: 'The input is a script with scenes, timing, and prompts. The output is a finished vertical MP4. Everything between is pipeline.',
    Icon: ListChecks,
  },
  {
    title: 'AI images per scene',
    body: 'Scene visuals from cloud image models or a local ComfyUI text-to-image workflow when you want zero cloud dependency.',
    Icon: Sparkles,
  },
  {
    title: 'Local image-to-video motion',
    body: 'Scenes are animated on your own GPU with a ComfyUI Wan image-to-video workflow instead of a metered cloud renderer.',
    Icon: FileVideo,
  },
  {
    title: 'Cloud or local narration',
    body: 'ElevenLabs voices when you want them, or a fully local Kokoro TTS server in Docker when you do not.',
    Icon: Mic,
  },
  {
    title: 'Word-level karaoke captions',
    body: 'Captions are timed to each spoken word and burned into the video, in the style short-form viewers expect.',
    Icon: Subtitles,
  },
  {
    title: 'Music and SFX with ducking',
    body: 'Background music and effects are mixed under the narration automatically, including optional local audio generation.',
    Icon: Music,
  },
  {
    title: 'Resumable renders',
    body: 'Completed scenes are checkpointed and skipped on a rerun, so a failed scene does not restart the whole video.',
    Icon: Gauge,
  },
  {
    title: 'Built to be agent-driven',
    body: 'A companion app exposes the pipeline through a visible UI and a headless local HTTP API that an AI agent can drive end to end.',
    Icon: Terminal,
  },
];

const fastShortsFaqs = [
  {
    question: 'What is FastShorts?',
    answer:
      'FastShorts is a local Windows pipeline that turns a story package, a script with scene timing and visual prompts, into a finished short-form vertical video with AI-generated visuals, narration, word-level karaoke captions, music, and SFX.',
  },
  {
    question: 'Does FastShorts run locally?',
    answer:
      'The pipeline itself runs on your machine: composition through FFmpeg, image-to-video through ComfyUI on your own GPU, and optional local narration, image, and audio generation. Cloud services like ElevenLabs or cloud image models are optional steps, not requirements.',
  },
  {
    question: 'Is FastShorts for faceless channels?',
    answer:
      'That is the core use case: story-driven, narrated vertical videos produced without filming anything. If you have scripts and a Windows PC with a GPU, FastShorts is designed to turn them into finished shorts.',
  },
  {
    question: 'How is FastShorts different from FastClip?',
    answer:
      'FastClip starts from footage you already have and cuts it into clips. FastShorts starts from a written story and generates the video: images, motion, narration, captions, and music. They cover opposite ends of the short-form workflow.',
  },
  {
    question: 'What does FastShorts need to run?',
    answer:
      'Windows with PowerShell, FFmpeg, and a local ComfyUI install for image-to-video generation. Optional pieces include Docker for local Kokoro TTS narration and a local audio-generation setup for music and SFX.',
  },
  {
    question: 'When can I use FastShorts?',
    answer:
      'FastShorts is experimental and the source is currently private. There is no public download yet. FastCast, FastPlay, FastClip, and FastCompress are available today, and FastShorts will be announced on the Fast Series page when it is ready.',
  },
];

export function FastShortsProductPage() {
  const product = productBySlug.fastshorts;

  return (
    <ProductShell
      variant="fastshorts"
      brand="FastShorts"
      brandIconUrl="/assets/FastShorts/FastShorts_Icon.png"
      navLinks={[
        { href: '#how', label: 'How it works' },
        { href: '#features', label: 'Features' },
        { href: '#compare', label: 'Compare' },
        { href: '#faq', label: 'FAQ' },
        { href: '/fast-series', label: 'Fast Series' },
      ]}
      footer={
        <>
          <p>FastShorts is experimental. Source is currently private.</p>
          <p>
            FastShorts by <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer">Calvin Sturm</a> / Sturm Technologies LLC
            <span aria-hidden="true"> · </span>
            <a href="/fast-series">Fast Series</a>
          </p>
        </>
      }
    >
      <ProductHero
        product={product}
        eyebrow="AI short-form video pipeline for Windows"
        title="Turn a written story into a finished vertical short"
        subtitle="FastShorts takes a script with scene prompts and produces a narrated, captioned 9:16 video with generated visuals, motion, music, and SFX."
        description="FastShorts is a local Windows pipeline for faceless short-form video. Scene images come from AI image models, motion comes from local image-to-video generation, narration comes from cloud or local TTS, and the final MP4 is composed on your machine with word-level karaoke captions and ducked background music."
        primaryLabel="Explore the Fast Series"
        primaryHref="/fast-series"
        secondaryLabel="Follow on GitHub"
        secondaryHref={githubProfileUrl}
        meta="Experimental · Windows 10/11 x64 · Local pipeline, optional cloud steps"
        subMeta="No public download yet. Four other Fast Series tools are downloadable today."
        heroIconUrl="/assets/FastShorts/FastShorts_Icon.png"
        heroIconAlt="FastShorts app icon"
        PrimaryIcon={Zap}
        preview={
          <div
            className="fastshorts-preview product-preview"
            role="img"
            aria-label="Illustration of the FastShorts pipeline: a story package, generation stages for images, motion, narration, captions, and music, and a finished vertical MP4."
          >
            <div className="fastshorts-row fastshorts-file">
              <span className="fastshorts-file-name">the-mirror-was-early/story.json</span>
              <span className="fastshorts-file-size">6 scenes</span>
            </div>
            <div className="fastshorts-chips">
              {['Images', 'Motion', 'Narration', 'Captions', 'Music'].map((stage) => (
                <span key={stage} className="fastshorts-chip fastshorts-chip-done">
                  {stage}
                </span>
              ))}
            </div>
            <div className="fastshorts-caption-line" aria-hidden="true">
              <span>THE</span>
              <span>MIRROR</span>
              <span className="fastshorts-caption-active">WAS</span>
              <span>ALREADY</span>
              <span>AWAKE</span>
            </div>
            <div className="fastshorts-progress">
              <span style={{ width: '100%' }} />
            </div>
            <div className="fastshorts-row fastshorts-result">
              <span className="fastshorts-result-label">Rendered</span>
              <span className="fastshorts-result-value">the-mirror-was-early.mp4 · 9:16 · 45s</span>
            </div>
          </div>
        }
      />

      <section id="how" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="How it works"
            title="From story package to finished MP4"
            description="One script drives every stage. Each stage runs locally, checkpoints its work, and hands off to the next."
          />
          <div className="fastclip-step-grid">
            {fastShortsSteps.map((step) => (
              <article key={step.num} className="fastclip-step">
                <span className="fastclip-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="Features"
            title="A whole shorts studio, running on your PC"
            description="FastShorts is not an editor. It is a production pipeline: writing stays yours, and everything after the script is automated."
          />
          <FeatureGrid items={fastShortsFeatures} />
        </div>
      </section>

      <section id="privacy" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell product-split-grid grid gap-8 lg:grid-cols-2">
          <div className="product-copy-block">
            <ProductSectionHeading eyebrow="Local-first" title="Your renders happen on your hardware" />
            <div className="product-prose mt-6 space-y-4 text-base leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">
                No render queue. No per-video credits. No subscription meter.
              </p>
              <p>
                Cloud shorts generators charge per render and keep your pipeline on their servers. FastShorts runs
                image-to-video, caption burning, and audio mixing on your own GPU through ComfyUI and FFmpeg. Cloud
                services are optional ingredients, like ElevenLabs voices, not the factory.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <article className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <Clapperboard className="h-6 w-6 text-slate-700" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">A pipeline, not an editor</h3>
              <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-600">
                There is no timeline to drag clips around. FastShorts turns a finished script into a finished video.
                If you want to cut existing footage into clips, that is FastClip.
              </p>
            </article>
            <article className="product-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <LockKeyhole className="h-6 w-6 text-slate-700" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Experimental</h3>
              <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-600">
                FastShorts is the most experimental tool in the Fast Series. The source is currently private and the
                pipeline is still taking shape, so there is no public download yet.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="compare" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading
            eyebrow="Compare"
            title="Where FastShorts fits"
            description="Cloud generators sell renders by the credit. Editors want your time. FastShorts wants a script and a GPU."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <article className="product-panel product-audience-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">FastShorts is a good fit if you want</h3>
              <div className="mt-5">
                <BulletedList
                  items={[
                    'Story-driven faceless shorts from a written script',
                    'Renders on your own GPU instead of per-video credits',
                    'Word-level karaoke captions burned in automatically',
                    'Narration from ElevenLabs or a fully local TTS',
                    'Music and SFX mixed under the voice without an editor',
                    'A pipeline an AI agent can drive end to end',
                  ]}
                />
              </div>
            </article>
            <article className="product-panel product-audience-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">Other tools are still better if you need</h3>
              <div className="mt-5">
                <BulletedList
                  items={[
                    'Clips cut from footage you already recorded (FastClip)',
                    'A hands-on timeline editor with manual control',
                    'A finished product today: FastShorts is experimental',
                    'Mac or Linux support',
                    'A hosted, no-setup cloud service',
                    'Photorealistic long-form video generation',
                  ]}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="facts" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading eyebrow="Facts" title="FastShorts facts" description="A quick reference for the essentials." />
          <FactsTable
            rows={[
              ['Product', 'FastShorts'],
              ['Developer', 'Calvin Sturm (Sturm Technologies LLC)'],
              ['Category', 'AI short-form video pipeline'],
              ['Platform', 'Windows 10 and later, 64-bit'],
              ['Status', 'Experimental, no public download yet'],
              ['Input', 'Story packages: a script with scene timing and one visual prompt per scene'],
              ['Output', 'Vertical 9:16 MP4 with narration, word-level karaoke captions, music, and SFX'],
              ['Visuals', 'AI images per scene, animated locally with a ComfyUI Wan image-to-video workflow'],
              ['Narration', 'ElevenLabs voices or a local Kokoro TTS server'],
              ['Processing', 'Local through FFmpeg and ComfyUI on your own GPU; cloud steps are optional'],
              ['Technology', 'Windows companion app with a local HTTP API, FFmpeg, ComfyUI'],
              ['Best for', 'Faceless story channels producing narrated vertical shorts from scripts'],
              ['Not designed for', 'Editing existing footage (FastClip) or hands-on timeline editing'],
            ]}
          />
        </div>
      </section>

      <section id="faq" className="product-section border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <ProductSectionHeading eyebrow="FAQ" title="FastShorts questions" />
          <FaqList faqs={fastShortsFaqs} />
        </div>
      </section>

      <section className="product-section product-section-cta border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <div className="product-cta-panel cta-panel p-8 text-center sm:p-10">
            <h2 className="product-section-title font-display text-3xl text-slate-900 sm:text-4xl">FastShorts is taking shape</h2>
            <p className="product-section-description mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              While FastShorts is experimental, the rest of the Fast Series is downloadable today: FastCast,
              FastPlay, FastClip, and FastCompress are all available now as native Windows tools.
            </p>
            <div className="product-hero-actions mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/fast-series" className="product-button product-button-primary cta-primary">
                <Zap className="h-5 w-5" />
                Explore the Fast Series
              </a>
              <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-secondary cta-secondary">
                <Github className="h-5 w-5" />
                Follow on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </ProductShell>
  );
}
