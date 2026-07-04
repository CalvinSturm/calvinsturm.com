import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  Activity,
  ArrowUpRight,
  Code2,
  Cpu,
  ExternalLink,
  Gamepad2,
  Github,
  House,
  Languages,
  LineChart,
  Menu,
  MonitorPlay,
  Moon,
  PawPrint,
  PlayCircle,
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
import { SpeedInsights } from '@vercel/speed-insights/react';

type Project = {
  name: string;
  tagline: string;
  language: string;
  stars: number;
  url: string;
  codeLabel?: string;
  demo?: string;
  demoLabel?: string;
  privateSource?: boolean;
  Icon: LucideIcon;
};

const featured: Project[] = [
  {
    name: 'FastCast',
    tagline:
      'Native Windows screen recorder and OBS alternative: local MP4 recording, webcam overlay, and RTMP/RTMPS streaming. Source is private; releases, SHA-256 checksums, and beta notes are public.',
    language: 'Private source',
    stars: 0,
    url: 'https://github.com/CalvinSturm/FastCast-releases',
    codeLabel: 'Public releases',
    demo: '/fastcast',
    demoLabel: 'Product page',
    privateSource: true,
    Icon: MonitorPlay,
  },
  {
    name: 'LocalAgent',
    tagline: 'Local-first agent runtime for MCP workflows, with explicit trust controls, replayable runs, and built-in evals.',
    language: 'Rust',
    stars: 28,
    url: 'https://github.com/CalvinSturm/LocalAgent',
    Icon: Cpu,
  },
  {
    name: 'FastPlay',
    tagline: 'The Windows video player built for fast playback. Lightweight, keyboard-driven, and quick to open.',
    language: 'Rust',
    stars: 15,
    url: 'https://github.com/CalvinSturm/FastPlay',
    demo: '/fastplay',
    demoLabel: 'Product page',
    Icon: PlayCircle,
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
    name: 'rave',
    tagline: 'A Rust-native, GPU-resident AI video engine with a bounded pipeline: decode, preprocess, inference, then encode.',
    language: 'Rust',
    stars: 3,
    url: 'https://github.com/CalvinSturm/rave',
    demo: 'https://crates.io/users/CalvinSturm',
    demoLabel: 'View on crates.io',
    Icon: Wand2,
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
    name: 'NeonSnake-ACR',
    tagline: 'A cyberpunk arcade game blending classic Snake with RPG progression, tactical combat, and boss battles.',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/CalvinSturm/NeonSnake-ACR',
    demo: 'https://neonsnakeacr.calvinsturm.workers.dev/',
    Icon: Gamepad2,
  },
];

const more: Project[] = [
  {
    name: 'trust',
    tagline: 'A trust firewall for local-first agent tool execution.',
    language: 'Rust',
    stars: 1,
    url: 'https://github.com/CalvinSturm/trust',
    Icon: ShieldCheck,
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
    name: 'redditresearcher',
    tagline: 'A CLI-first Reddit research pipeline that turns repeated pain patterns into structured product and content research.',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/CalvinSturm/redditresearcher',
    Icon: Search,
  },
  {
    name: 'VideoForge-Native',
    tagline: 'Local-first image and video enhancement with deterministic execution paths.',
    language: 'Rust',
    stars: 0,
    url: 'https://github.com/CalvinSturm/VideoForge-Native',
    Icon: Wand2,
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
    name: 'copasty',
    tagline: 'Copy and paste, made into a small focused tool.',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/CalvinSturm/copasty',
    Icon: Code2,
  },
];

const totalStars = [...featured, ...more].reduce((sum, p) => sum + p.stars, 0);
const totalProjects = [...featured, ...more].filter((p) => !p.privateSource).length;

const languageStyles: Record<string, string> = {
  Rust: 'bg-orange-100 text-orange-800',
  Python: 'bg-blue-100 text-blue-800',
  TypeScript: 'bg-indigo-100 text-indigo-800',
  'Private source': 'bg-slate-200 text-slate-700',
};

function LanguageBadge({ language }: { language: string }) {
  const style = languageStyles[language] ?? 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      <span className="h-2 w-2 rounded-full bg-current opacity-70" aria-hidden="true" />
      {language}
    </span>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const { name, tagline, language, stars, url, codeLabel, demo, demoLabel, Icon } = project;
  const demoIsInternal = demo?.startsWith('/');
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_30px_80px_rgba(17,24,39,0.16)]">
      <div className="mb-6 flex items-start justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800">
          <Icon className="h-7 w-7" />
        </span>
        {stars > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {stars}
          </span>
        )}
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h3 className="font-display text-3xl font-medium text-slate-900">{name}</h3>
        <LanguageBadge language={language} />
      </div>
      <p className="text-base leading-relaxed text-slate-600">{tagline}</p>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary text-sm py-2.5"
        >
          <Github className="h-4 w-4" />
          {codeLabel ?? 'View code'}
          <ArrowUpRight className="h-4 w-4" />
        </a>
        {demo && (
          <a
            href={demo}
            target={demoIsInternal ? undefined : '_blank'}
            rel={demoIsInternal ? undefined : 'noopener noreferrer'}
            className="cta-secondary text-sm py-2.5"
          >
            <ExternalLink className="h-4 w-4" />
            {demoLabel ?? 'Live demo'}
          </a>
        )}
      </div>
    </div>
  );
}

function FeaturedIndex() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const range = reduceMotion ? 0 : 1;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 140, damping: 18, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 18, mass: 0.4 });
  const translateX = useTransform(springX, [-0.5, 0.5], [-18 * range, 18 * range]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-18 * range, 18 * range]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7 * range, 7 * range]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [7 * range, -7 * range]);
  const glowX = useTransform(springX, [-0.5, 0.5], ['30%', '70%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['30%', '70%']);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const active = featured[activeIndex];

  const previewVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.92, filter: 'blur(14px)', y: 18 },
        animate: { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 },
        exit: { opacity: 0, scale: 1.04, filter: 'blur(10px)', y: -12 },
      };

  return (
    <>
      {/* Desktop: cinematic hover-reveal index */}
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        className="hidden lg:grid lg:grid-cols-[1fr_minmax(360px,420px)] lg:items-start lg:gap-14"
      >
        <ul className="-mt-2">
          {featured.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={project.name} className="border-t border-slate-100 first:border-t-0">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className="group flex items-baseline gap-5 py-4 outline-none"
                >
                  <span
                    className={`font-mono text-sm tabular-nums transition-colors duration-300 ${
                      isActive ? 'text-amber-500' : 'text-slate-400'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display font-medium leading-none transition-all duration-300 ${
                      isActive
                        ? 'translate-x-2 text-slate-900'
                        : 'text-slate-400 group-hover:text-slate-500'
                    }`}
                    style={{ fontSize: 'clamp(1.9rem, 3vw, 2.9rem)' }}
                  >
                    {project.name}
                  </span>
                  <span
                    className={`ml-auto flex items-center gap-3 transition-all duration-300 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-500">{project.language}</span>
                    <ArrowUpRight
                      className={`h-5 w-5 transition-colors ${
                        isActive ? 'text-amber-500' : 'text-slate-400'
                      }`}
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="sticky top-24" style={{ perspective: 1200 }}>
          <motion.div
            style={{ x: translateX, y: translateY, rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative min-h-[400px]"
          >
            <motion.span
              aria-hidden="true"
              style={{ left: glowX, top: glowY }}
              className="pointer-events-none absolute -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/30 blur-[90px]"
            />
            <AnimatePresence initial={false}>
              <motion.div
                key={active.name}
                variants={previewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <ProjectPreview project={active} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Mobile / touch: every project visible as a card */}
      <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
        {featured.map((project) => (
          <ProjectPreview key={project.name} project={project} />
        ))}
      </div>
    </>
  );
}

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
              <a href="/tech-support" className="nav-link inline-flex items-center gap-1.5 text-slate-700">
                <House className="h-3.5 w-3.5 text-amber-500" />
                In-home tech support
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

      <main id="main-content" className="pt-16">
        <section className="section-shell py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow-amber">Open source</p>
            <h1 className="font-display mt-5 text-[2.75rem] leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl">
              Things I&apos;ve built.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              A selection of my open-source projects: local-first AI tooling, Rust performance work, and a few things
              built purely for fun. Most are public on GitHub, so you can read the code and run it yourself. The most
              polished tools ship as the{' '}
              <a href="/fast-series" className="font-medium text-slate-900 underline decoration-amber-400 underline-offset-4 hover:text-amber-700">
                Fast Series
              </a>
              .
            </p>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
              <div>
                <dt className="font-display text-3xl text-slate-900">{totalProjects}</dt>
                <dd className="mt-0.5 text-sm text-slate-500">open-source projects</dd>
              </div>
              <div>
                <dt className="font-display flex items-center gap-1.5 text-3xl text-slate-900">
                  <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                  {totalStars}
                </dt>
                <dd className="mt-0.5 text-sm text-slate-500">stars on GitHub</dd>
              </div>
              <div>
                <dt className="font-display text-3xl text-slate-900">Rust · Python · TS</dt>
                <dd className="mt-0.5 text-sm text-slate-500">primary languages</dd>
              </div>
            </dl>
          </div>
        </section>

        <section aria-labelledby="featured-heading" className="border-t border-slate-200 py-16 lg:py-24">
          <div className="section-shell">
            <div className="mb-8 lg:mb-10">
              <p className="eyebrow-amber">Featured</p>
              <h2 id="featured-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                Projects I&apos;m proud of.
              </h2>
              <p className="mt-3 hidden text-sm text-slate-500 lg:block">
                Hover a project to bring it into focus.
              </p>
            </div>

            <FeaturedIndex />
          </div>
        </section>

        <section aria-labelledby="more-heading" className="border-t border-slate-200 py-16 lg:py-24">
          <div className="section-shell">
            <div className="mb-8 lg:mb-10">
              <p className="eyebrow-amber">More on GitHub</p>
              <h2 id="more-heading" className="font-display mt-4 text-3xl text-slate-900 sm:text-4xl">
                Other things I&apos;ve been tinkering with.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {more.map(({ name, tagline, language, stars, url, Icon }) => (
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

        <section className="bg-slate-900">
          <div className="section-shell py-16 text-center lg:py-24">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              From prototypes to products.
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              These projects grow into the Fast Series: finished Windows tools for creator and media workflows. Need
              something custom built instead?{' '}
              <a href="/build" className="text-amber-300 underline decoration-amber-400/50 underline-offset-4 hover:text-amber-200">
                Start a project
              </a>
              .
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/fast-series" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 font-semibold text-[#1f1003] transition-colors hover:bg-amber-300">
                <Zap className="h-5 w-5" />
                Explore the Fast Series
              </a>
              <a
                href="https://github.com/CalvinSturm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Github className="h-5 w-5" />
                See all repositories
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
                Developer and founder of Sturm Technologies LLC. Open-source projects, custom software, and AI built on California&apos;s Central Coast.
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
                <li><a href="/tech-support" className="hover:text-slate-900">In-home tech support</a></li>
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
      <SpeedInsights />
    </div>
  );
}
