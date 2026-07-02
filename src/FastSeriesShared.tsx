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
  Download,
  ExternalLink,
  FileVideo,
  Github,
  HardDrive,
  House,
  Keyboard,
  LockKeyhole,
  Menu,
  Mic,
  Minimize2,
  MonitorPlay,
  Moon,
  PlayCircle,
  Radio,
  ShieldCheck,
  Scissors,
  Sparkles,
  Sun,
  TriangleAlert,
  Video,
  X,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
    status: 'Early build',
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
    tagline: 'Find and export highlight clips from longer videos.',
    valueProp: 'A creator workflow for pulling highlights out of long videos.',
    what:
      'FastClip helps you review long recordings and pull out the moments worth keeping. Mark highlights as you go, then export them for editing or sharing.',
    status: 'In development',
    whoFor: [
      'Sports, action, and highlight workflows',
      'Creators repurposing long videos for social',
      'Anyone clipping moments from long footage',
    ],
    whatItDoes: [
      'Review long videos quickly',
      'Mark and collect highlight moments',
      'Export clips for editing or sharing',
    ],
  },
  {
    slug: 'fastcompress',
    name: 'FastCompress',
    Icon: Minimize2,
    tagline: 'Simple video compression for Windows.',
    valueProp: 'Shrink video files with clear presets, no FFmpeg required.',
    what:
      'FastCompress reduces video file sizes using readable presets, so you can get a smaller file without learning FFmpeg. Pick a preset, see the estimated result, and export.',
    status: 'In development',
    whoFor: [
      'Anyone who needs smaller video files',
      'Creators uploading to size-limited platforms',
      'People who want compression without technical setup',
    ],
    whatItDoes: [
      'Compress video with simple presets',
      'See readable size estimates and results',
      'Reduce file size without FFmpeg know-how',
    ],
  },
  {
    slug: 'fastshorts',
    name: 'FastShorts',
    Icon: Clapperboard,
    tagline: 'A workflow for building short-form vertical videos.',
    valueProp: 'A local, AI-assisted pipeline for short-form vertical video.',
    what:
      'FastShorts is a local, AI-assisted pipeline for generating and assembling vertical short-form videos. It is experimental and still taking shape.',
    status: 'Experimental',
    whoFor: [
      'Creators producing short-form vertical video',
      'People assembling shorts from existing footage',
      'Anyone experimenting with an AI-assisted shorts workflow',
    ],
    whatItDoes: [
      'Assemble vertical short-form videos',
      'Assist the workflow with local, AI-assisted steps',
      'Prepare clips for short-form platforms',
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
  ['/', 'Websites & Software', Sparkles],
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
            <a
              href="/tech-support"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              <House className="h-4 w-4 text-amber-500" />
              In-home tech support
            </a>
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
        <div className="grid gap-10 md:grid-cols-3">
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
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/projects" className="hover:text-slate-900">Projects</a></li>
              <li><a href="/" className="hover:text-slate-900">Websites &amp; software</a></li>
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

const fastCastReleaseUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases/tag/v0.3.2';
const fastCastAllReleasesUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases';
const fastPlayReleaseUrl = 'https://github.com/CalvinSturm/FastPlay/releases/latest';
const fastPlaySourceUrl = 'https://github.com/CalvinSturm/FastPlay';
const fastPlayReleaseNotesUrl = 'https://github.com/CalvinSturm/FastPlay/blob/main/docs/release-notes-v0.4.1.md';

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

type ProductLandingVariant = 'fastcast' | 'fastplay';

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
  preview: ReactNode;
};

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
            <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="product-button product-button-primary cta-primary">
              <Download className="h-5 w-5" />
              {primaryLabel}
            </a>
            <a href={secondaryHref} target="_blank" rel="noopener noreferrer" className="product-button product-button-secondary cta-secondary">
              <Github className="h-5 w-5" />
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
  { title: 'Webcam picture-in-picture overlay', Icon: Video },
  { title: 'Local MP4 recording', Icon: HardDrive },
  { title: 'RTMP and RTMPS livestreaming', Icon: Radio },
  { title: 'Hardware H.264 tested on NVIDIA and AMD', Icon: Cpu },
  { title: 'Passthrough, 1080p, or 720p output', Icon: FileVideo },
  { title: 'Global Start/Stop hotkey: Ctrl+Alt+F9', Icon: Keyboard },
];

const fastCastFaqs = [
  {
    question: 'What is FastCast?',
    answer:
      'FastCast is a native Windows screen recorder and live streaming app for local MP4 recording, monitor or window capture, desktop audio, microphone capture, webcam overlay, and RTMP/RTMPS streaming.',
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
          </p>
        </>
      }
    >
      <ProductHero
        product={product}
        eyebrow="Native Windows screen recorder"
        title="FastCast"
        subtitle="A native Windows screen recorder and live streaming app."
        description="FastCast helps creators record locally and stream to custom RTMP/RTMPS endpoints with desktop audio, microphone capture, and a webcam overlay. It is built as a simpler OBS alternative for focused single-scene recordings: choose a monitor or window, pick your audio, and record MP4 or go live without setting up scenes first."
        primaryLabel="Download FastCast v0.3.2"
        primaryHref={fastCastReleaseUrl}
        secondaryLabel="View release notes"
        secondaryHref={fastCastReleaseUrl}
        meta="Windows 10/11 x64 · Portable ZIP · Free during Open Beta"
        heroIconUrl="/assets/FastCast/FastCast_Icon.png"
        heroIconAlt="FastCast app icon"
        preview={
          <figure className="product-preview overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-[0_30px_80px_rgba(17,24,39,0.18)]">
            <img
              src="https://calvinsturm.github.io/FastCast-releases/assets/fastcast-gui-v0.3.2.png"
              alt="FastCast Open Beta interface showing capture, audio, webcam, stream, and recording controls."
              className="h-auto w-full"
              width="700"
              height="957"
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
            <p className="product-release-name mt-3 font-display text-4xl text-slate-900">v0.3.2</p>
            <p className="product-panel-copy mt-3 text-sm leading-relaxed text-slate-600">
              The latest public build is hosted on GitHub Releases. FastCast does not download or install updates
              automatically.
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
                Download <code>FastCast-0.3.2-win-x64.zip</code> from the latest release. An optional{' '}
                <code>.sha256</code> sidecar is included for integrity checks.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Expected SHA-256</p>
              <code className="mt-2 block break-all rounded-xl bg-slate-100 p-3 text-xs text-slate-700">
                fb48f1edc0798753f8a06a2c5aca5ccf39f135b4ba4da38d20e1b7386542a29e
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
            <ProductSectionHeading eyebrow="Open Beta status" title="Free during beta, with known gaps called out" />
            <p className="product-section-description mt-5 text-base leading-relaxed text-slate-600">
              FastCast is currently free during Open Beta. A Pro version may be added later for advanced creator
              features, but there is no Pro tier, license, or account system today.
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
              <a href={fastCastReleaseUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-primary cta-primary">
                <Download className="h-5 w-5" />
                Download latest release
              </a>
              <a href={fastCastAllReleasesUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-secondary cta-secondary">
                <Github className="h-5 w-5" />
                All releases
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
];

const fastPlayControls: Array<[string, string]> = [
  ['Space', 'Pause / resume / replay'],
  ['Left / Right', 'Seek 5s, hold for 15s steps'],
  ['Ctrl+F / Ctrl+B', 'Move one frame forward / backward'],
  ['Ctrl+O (letter O)', 'Open media file'],
  ['Ctrl+Shift+O (letter O)', 'Recent files overlay'],
  ['PageUp / PageDown', 'Previous / next file in the play queue'],
  ['Ctrl+S', 'Save screenshot'],
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
        { href: '#release', label: 'v0.4.1' },
        { href: '#features', label: 'Features' },
        { href: '#architecture', label: 'Architecture' },
        { href: '#vlc', label: 'vs VLC' },
        { href: '#faq', label: 'FAQ' },
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
        primaryHref={fastPlayReleaseUrl}
        secondaryLabel="View source on GitHub"
        secondaryHref={fastPlaySourceUrl}
        meta="v0.4.1 · Windows 10+ · MIT License"
        subMeta="Windows x64 local playback. No streaming, media library, or plugin system."
        heroIconUrl="/assets/FastPlay/fastplay.png"
        heroIconAlt="FastPlay app icon"
        preview={
          <figure className="product-preview overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-[0_30px_80px_rgba(17,24,39,0.18)]">
            <img
              src="https://github.com/user-attachments/assets/ac8ae5f1-b4e3-42ca-b21e-c20c1c5de5c0"
              alt="FastPlay fast Windows video player playing a local video file with timeline scrubbing controls."
              className="h-auto w-full"
            />
          </figure>
        }
      />

      <section id="release" className="product-section product-section-release border-t border-slate-200 py-14 lg:py-20">
        <div className="section-shell">
          <article className="product-panel product-release-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)] sm:p-8">
            <ProductSectionHeading
              eyebrow="Current release"
              title="New in v0.4.1: smoother shutdown and steadier audio"
              description="A stability and playback-robustness release. FastPlay now closes instantly without the occasional shutdown stall, and keeps audio realtime on heavy 4K60 files that fall back to software video decode."
            />
            <div className="product-release-list mt-7 grid gap-4 md:grid-cols-3">
              {[
                ['Crash-free close', 'Skips fragile in-process GPU teardown at exit, so closing the window is instant instead of occasionally stalling.'],
                ['Steady 4K60 audio', 'An independent audio decode worker keeps sound realtime even when video falls back to software decode.'],
                ['Reliable resume', 'Shutdown still persists recent-file and resume state before exiting.'],
              ].map(([title, body]) => (
                <div key={title} className="product-release-item rounded-xl bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="product-panel-copy mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              ))}
            </div>
            <a href={fastPlayReleaseNotesUrl} target="_blank" rel="noopener noreferrer" className="product-panel-link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              Read v0.4.1 release notes
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
              {['.mp4', '.mkv', '.mov', '.avi', '.webm', '.m4v', '.wmv', '.mp3', '.flac', '.wav', '.srt subtitles'].map((format) => (
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
              <a href={fastPlayReleaseUrl} target="_blank" rel="noopener noreferrer" className="product-button product-button-primary cta-primary">
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
