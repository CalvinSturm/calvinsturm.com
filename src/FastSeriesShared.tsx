import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Code2,
  ExternalLink,
  Github,
  House,
  Menu,
  Minimize2,
  MonitorPlay,
  Moon,
  PlayCircle,
  Scissors,
  Sparkles,
  Sun,
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
