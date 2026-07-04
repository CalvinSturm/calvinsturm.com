import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clapperboard,
  Code2,
  Cpu,
  FileVideo,
  Gamepad2,
  Github,
  Languages,
  LineChart,
  Menu,
  Minimize2,
  MonitorPlay,
  Moon,
  Package,
  PawPrint,
  PlayCircle,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Wand2,
  X,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type BuildCard = {
  name: string;
  status: string;
  description: string;
  tags: string[];
  pageHref: string;
  repoHref?: string;
  repoLabel?: string;
  Icon: LucideIcon;
};

// Statuses mirror the product pages: keep them in sync with FastSeriesShared.
const builds: BuildCard[] = [
  {
    name: 'FastCast',
    status: 'Open beta',
    description:
      'Native Windows screen recording and streaming. Local MP4 recording, webcam overlay, and RTMP/RTMPS output without OBS complexity.',
    tags: ['Native Windows', 'Hardware H.264', 'RTMP/RTMPS'],
    pageHref: '/fastcast',
    repoHref: 'https://github.com/CalvinSturm/FastCast-releases',
    repoLabel: 'Public releases',
    Icon: MonitorPlay,
  },
  {
    name: 'FastPlay',
    status: 'Early build',
    description:
      'Lightweight local video player for Windows. Fast startup, responsive seeking, hardware-accelerated decode. Free and open source.',
    tags: ['Rust', 'FFmpeg', 'D3D11', 'WASAPI'],
    pageHref: '/fastplay',
    repoHref: 'https://github.com/CalvinSturm/FastPlay',
    repoLabel: 'Source (MIT)',
    Icon: PlayCircle,
  },
  {
    name: 'FastClip',
    status: 'In development',
    description:
      'Turns long videos into vertical clips locally: ranked highlights, 9:16 crops, and optional captions via on-device transcription.',
    tags: ['Rust', 'Tauri', 'FFmpeg', 'whisper.cpp'],
    pageHref: '/fastclip',
    Icon: Scissors,
  },
  {
    name: 'FastCompress',
    status: 'In development',
    description:
      'Practical video compression for creators. Plain-English presets for Discord, email, and YouTube, with local FFmpeg processing.',
    tags: ['Rust', 'FFmpeg', 'Native GUI'],
    pageHref: '/fastcompress',
    Icon: Minimize2,
  },
  {
    name: 'FastShorts',
    status: 'Experimental',
    description:
      'AI-assisted short-form video pipeline: story packages in, narrated and captioned vertical MP4s out, rendered on local hardware.',
    tags: ['FFmpeg', 'ComfyUI', 'Local-first'],
    pageHref: '/fastshorts',
    Icon: Clapperboard,
  },
];

const statusStyles: Record<string, string> = {
  'Open beta': 'bg-emerald-100 text-emerald-800',
  'Early build': 'bg-amber-100 text-amber-800',
  'In development': 'bg-sky-100 text-sky-800',
  Experimental: 'bg-purple-100 text-purple-800',
};

function StatusChip({ status }: { status: string }) {
  const style = statusStyles[status] ?? 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
      <span className="h-2 w-2 rounded-full bg-current opacity-70" aria-hidden="true" />
      {status}
    </span>
  );
}

type Experiment = {
  name: string;
  tagline: string;
  language: string;
  stars: number;
  url: string;
  Icon: LucideIcon;
};

const experiments: Experiment[] = [
  {
    name: 'LocalAgent',
    tagline: 'Local-first agent runtime for MCP workflows, with explicit trust controls, replayable runs, and built-in evals.',
    language: 'Rust',
    stars: 28,
    url: 'https://github.com/CalvinSturm/LocalAgent',
    Icon: Cpu,
  },
  {
    name: 'rave',
    tagline: 'A Rust-native, GPU-resident AI video engine with a bounded pipeline: decode, preprocess, inference, then encode.',
    language: 'Rust',
    stars: 3,
    url: 'https://github.com/CalvinSturm/rave',
    Icon: Wand2,
  },
  {
    name: 'VideoForge-Native',
    tagline: 'Local-first image and video enhancement with deterministic execution paths.',
    language: 'Rust',
    stars: 0,
    url: 'https://github.com/CalvinSturm/VideoForge-Native',
    Icon: FileVideo,
  },
  {
    name: 'trust',
    tagline: 'A trust firewall for local-first agent tool execution.',
    language: 'Rust',
    stars: 1,
    url: 'https://github.com/CalvinSturm/trust',
    Icon: ShieldCheck,
  },
  {
    name: 'runscope',
    tagline: 'A local-first dashboard for comparing runs, tracking regressions, and preserving provenance.',
    language: 'Rust',
    stars: 0,
    url: 'https://github.com/CalvinSturm/runscope',
    Icon: LineChart,
  },
  {
    name: 'DNA-AI',
    tagline: 'Local, privacy-focused bioinformatics. Analyzes raw DNA data against ClinVar, then a local Llama 3 model explains health risks in plain English.',
    language: 'Python',
    stars: 10,
    url: 'https://github.com/CalvinSturm/DNA-AI',
    Icon: Activity,
  },
  {
    name: 'OmniBabel',
    tagline: 'Local-first, real-time desktop translation and transcription for Windows. Nothing leaves your machine.',
    language: 'Python',
    stars: 1,
    url: 'https://github.com/CalvinSturm/OmniBabel',
    Icon: Languages,
  },
  {
    name: 'redditresearcher',
    tagline: 'A CLI-first Reddit research pipeline that turns repeated pain patterns into structured product and content research.',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/CalvinSturm/redditresearcher',
    Icon: Search,
  },
  {
    name: 'NeonSnake-ACR',
    tagline: 'A cyberpunk arcade game blending classic Snake with RPG progression, tactical combat, and boss battles.',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/CalvinSturm/NeonSnake-ACR',
    Icon: Gamepad2,
  },
  {
    name: 'opengotchi',
    tagline: 'An open-source desktop pet built with Tauri, React, TypeScript, and Rust.',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/CalvinSturm/opengotchi',
    Icon: PawPrint,
  },
  {
    name: 'copasty',
    tagline: 'Copy and paste, made into a small focused tool.',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/CalvinSturm/copasty',
    Icon: Code2,
  },
];

const capabilities: Array<{ title: string; Icon: LucideIcon }> = [
  { title: 'Native Windows app development', Icon: MonitorPlay },
  { title: 'Rust production tooling', Icon: Cpu },
  { title: 'Media capture, encode, playback, and export pipelines', Icon: FileVideo },
  { title: 'Local-first AI workflows', Icon: Sparkles },
  { title: 'Product packaging and public releases', Icon: Package },
  { title: 'Licensing and monetization infrastructure', Icon: BadgeCheck },
];

const fastSeriesLinks = [
  { href: '/fastcast', label: 'FastCast' },
  { href: '/fastplay', label: 'FastPlay' },
  { href: '/fastclip', label: 'FastClip' },
  { href: '/fastcompress', label: 'FastCompress' },
  { href: '/fastshorts', label: 'FastShorts' },
  { href: '/roadmap', label: 'Roadmap' },
];

export default function ProjectsApp() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

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
              <a href="/fast-series" className="nav-link inline-flex items-center gap-1.5 text-slate-700">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                Fast Series
              </a>
              <a href="/build" className="nav-link inline-flex items-center gap-1.5 text-slate-700">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                Websites &amp; Software
              </a>
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
              <a
                href="/fast-series"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                <Zap className="h-4 w-4 text-amber-500" />
                Fast Series
              </a>
              <a
                href="/build"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                <Sparkles className="h-4 w-4 text-amber-500" />
                Websites &amp; Software
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

      <main id="main-content" className="pt-16">
        {/* ---- Hero ---- */}
        <section className="section-shell py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow-amber">Sturm Technologies</p>
            <h1 className="font-display mt-5 text-[2.75rem] leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl">
              Selected builds.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Native Windows creator tools, local-first AI workflows, and practical software shipped under Sturm
              Technologies. This page is the proof of work: what has shipped, what is in flight, and the engineering
              underneath it. If you are here for the products, start with the Fast Series.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/fast-series" className="cta-primary">
                <Zap className="h-5 w-5" />
                View the Fast Series
              </a>
              <a
                href="https://github.com/CalvinSturm"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
              >
                <Github className="h-5 w-5" />
                View GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ---- Featured product system ---- */}
        <section aria-labelledby="fast-series-heading" className="border-t border-slate-200 py-16 lg:py-24">
          <div className="section-shell">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(17,24,39,0.16)] sm:p-10">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800">
                  <Zap className="h-7 w-7" />
                </span>
                <div>
                  <p className="eyebrow-amber">The product family</p>
                  <h2 id="fast-series-heading" className="font-display mt-1 text-3xl text-slate-900 sm:text-4xl">
                    Fast Series
                  </h2>
                </div>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                Practical Windows tools for creators: recording, playback, clipping, compression, and short-form
                production. This is the commercial line everything else on this page feeds into.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {fastSeriesLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-amber-300 hover:text-amber-700"
                  >
                    {label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <div className="mt-8">
                <a href="/fast-series" className="cta-primary">
                  <Zap className="h-5 w-5" />
                  Explore the Fast Series
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Product / build cards ---- */}
        <section aria-labelledby="builds-heading" className="border-t border-slate-200 py-16 lg:py-24">
          <div className="section-shell">
            <div className="mb-8 lg:mb-10">
              <p className="eyebrow-amber">Current lineup</p>
              <h2 id="builds-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                Products in flight.
              </h2>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Every tool below has a real product page and an honest status. Nothing here is vaporware, and nothing
                is promised before it ships.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {builds.map(({ name, status, description, tags, pageHref, repoHref, repoLabel, Icon }) => (
                <article
                  key={name}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(17,24,39,0.08)]"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800">
                      <Icon className="h-6 w-6" />
                    </span>
                    <StatusChip status={status} />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-slate-900">{name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                    <a href={pageHref} className="cta-primary text-sm py-2.5">
                      Product page
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    {repoHref && (
                      <a
                        href={repoHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-secondary text-sm py-2.5"
                      >
                        <Github className="h-4 w-4" />
                        {repoLabel ?? 'View code'}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Engineering systems and experiments ---- */}
        <section aria-labelledby="experiments-heading" className="border-t border-slate-200 py-16 lg:py-24">
          <div className="section-shell">
            <div className="mb-8 lg:mb-10">
              <p className="eyebrow-amber">Under the hood</p>
              <h2 id="experiments-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                Engineering systems and experiments.
              </h2>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Infrastructure, research, and side builds that inform the products. These are public on GitHub: read
                the code, run it yourself.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {experiments.map(({ name, tagline, language, stars, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-card group"
                >
                  <div className="service-card-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-900">{name}</h3>
                      {stars > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-slate-500">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          {stars}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{tagline}</p>
                    <span className="mt-2 inline-block text-xs font-medium text-slate-400">{language}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Proof strip ---- */}
        <section aria-labelledby="capabilities-heading" className="border-t border-slate-200 py-16 lg:py-24">
          <div className="section-shell">
            <div className="mb-8 lg:mb-10">
              <p className="eyebrow-amber">Capabilities</p>
              <h2 id="capabilities-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                What this work demonstrates.
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map(({ title, Icon }) => (
                <li
                  key={title}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{title}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="bg-slate-900">
          <div className="section-shell py-16 text-center lg:py-24">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              The products ship as the Fast Series.
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Recording, playback, clipping, compression, and short-form production for Windows. Need something custom
              built instead?{' '}
              <a href="/build" className="text-amber-300 underline decoration-amber-400/50 underline-offset-4 hover:text-amber-200">
                Start a project
              </a>
              .
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/fast-series" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 font-semibold text-[#1f1003] transition-colors hover:bg-amber-300">
                <Zap className="h-5 w-5" />
                View the Fast Series
              </a>
              <a
                href="https://github.com/CalvinSturm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Github className="h-5 w-5" />
                View GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

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
                Developer and founder of Sturm Technologies LLC. Native Windows creator tools, custom software, and AI built on California&apos;s Central Coast.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Explore</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="/fast-series" className="hover:text-slate-900">Fast Series</a></li>
                <li><a href="/fastcast" className="hover:text-slate-900">FastCast</a></li>
                <li><a href="/fastplay" className="hover:text-slate-900">FastPlay</a></li>
                <li><a href="/roadmap" className="hover:text-slate-900">Product roadmap</a></li>
                <li><a href="/build" className="hover:text-slate-900">Websites &amp; software</a></li>
                <li><a href="/tech-support" className="hover:text-slate-900">Local tech support</a></li>
                <li><a href="https://github.com/CalvinSturm" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">GitHub profile</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Contact</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="mailto:calvinsturm@gmail.com" className="hover:text-slate-900">calvinsturm@gmail.com</a></li>
                <li><a href="/build" className="hover:text-slate-900">Start a project</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
            © {new Date().getFullYear()} Sturm Technologies LLC.
          </div>
        </div>
      </footer>
    </div>
  );
}
