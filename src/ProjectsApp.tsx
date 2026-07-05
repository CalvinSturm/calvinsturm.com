import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clapperboard,
  Code2,
  Cpu,
  FileVideo,
  Film,
  FolderGit2,
  Gamepad2,
  Github,
  Languages,
  LineChart,
  Minimize2,
  MonitorPlay,
  Package,
  PawPrint,
  PlayCircle,
  ScanFace,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wand2,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HomeHeader, HomeFooter } from './HomeChrome.tsx';

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
    status: 'Released',
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
    status: 'Open beta',
    description:
      'Turns long videos into vertical clips locally: ranked highlights, 9:16 crops, and optional captions via on-device transcription.',
    tags: ['Rust', 'Tauri', 'FFmpeg', 'whisper.cpp'],
    pageHref: '/fastclip',
    repoHref: 'https://github.com/CalvinSturm/FastClip-Releases',
    repoLabel: 'Public releases',
    Icon: Scissors,
  },
  {
    name: 'FastCompress',
    status: 'Beta',
    description:
      'Practical video compression for creators. Plain-English presets for Discord, email, and YouTube, with local FFmpeg processing.',
    tags: ['Rust', 'FFmpeg', 'Native GUI'],
    pageHref: '/fastcompress',
    repoHref: 'https://github.com/CalvinSturm/FastCompress-Releases',
    repoLabel: 'Public releases',
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
    url: '/localagent',
    Icon: Cpu,
  },
  {
    name: 'FaceForge',
    tagline: 'Privacy-first, local-only Windows app for AI face blur and video redaction, optimized for NVIDIA RTX GPUs. Public alpha available.',
    language: 'Python',
    stars: 0,
    url: '/faceforge',
    Icon: ScanFace,
  },
  {
    name: 'VideoForge',
    tagline: 'Local-first Windows app for cleaning up, upscaling, reframing, and exporting video on your own NVIDIA GPU. Nine-stage pipeline, three engine routes.',
    language: 'Rust + Python',
    stars: 0,
    url: '/videoforge',
    Icon: Film,
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
  return (
    <div className="home-landing">
      <HomeHeader />

      <main id="main-content">
        {/* ---- Hero ---- */}
        <section className="home-shell pj-hero">
          <p className="home-eyebrow">Sturm Technologies</p>
          <h1>Selected builds</h1>
          <p className="home-hero-sub">
            Native Windows creator tools, local-first AI workflows, and practical software shipped under Sturm
            Technologies. This page is the proof of work: what has shipped, what is in flight, and the engineering
            underneath it.
          </p>
          <div className="home-hero-actions">
            <a href="/fast-series" className="home-btn home-btn-primary">
              View the Fast Series
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/CalvinSturm"
              target="_blank"
              rel="noopener noreferrer"
              className="home-btn home-btn-ghost"
            >
              <Github className="h-4 w-4" />
              View GitHub
            </a>
          </div>
          <p className="home-hero-meta">Shipped products · Public releases · Engineering systems</p>
        </section>

        {/* ---- Featured product system ---- */}
        <section className="home-section home-shell" aria-labelledby="fast-series-heading">
          <div className="pj-featured">
            <div className="pj-featured-head">
              <span className="home-grid-icon">
                <Zap className="h-5 w-5" />
              </span>
              <div>
                <p className="home-eyebrow">The product family</p>
                <h2 id="fast-series-heading">Fast Series</h2>
              </div>
            </div>
            <p className="pj-featured-sub">
              Practical Windows tools for creators: recording, playback, clipping, compression, and short-form
              production. This is the commercial line everything else on this page feeds into.
            </p>
            <div className="pj-featured-chips">
              {fastSeriesLinks.map(({ href, label }) => (
                <a key={href} href={href}>
                  {label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            <div className="home-hero-actions">
              <a href="/fast-series" className="home-btn home-btn-primary">
                Explore the Fast Series
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ---- Product / build cards ---- */}
        <section className="home-section home-shell" aria-labelledby="builds-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Current lineup</p>
            <h2 id="builds-heading">Products in flight</h2>
            <p className="pj-section-sub">
              Every tool below has a real product page and an honest status. Four of the five are downloadable
              today, and nothing is promised before it ships.
            </p>
          </div>

          <div className="home-grid">
            {builds.map(({ name, status, description, tags, pageHref, repoHref, repoLabel, Icon }) => (
              <article key={name} className="home-grid-card">
                <div className="home-grid-top">
                  <span className="home-grid-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="home-status-chip">{status}</span>
                </div>
                <h3>{name}</h3>
                <p>{description}</p>
                <ul className="home-spot-chips">
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="pj-card-links">
                  <a href={pageHref} className="home-spot-cta">
                    Product page
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  {repoHref && (
                    <a href={repoHref} target="_blank" rel="noopener noreferrer" className="home-inline-link">
                      <Github className="h-4 w-4" />
                      {repoLabel ?? 'View code'}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
            <a href="/fast-series" className="home-grid-card home-grid-card-more">
              <div className="home-grid-top">
                <span className="home-grid-icon">
                  <Zap className="h-5 w-5" />
                </span>
              </div>
              <h3>Fast Series overview</h3>
              <p>How the five tools fit together into one recording-to-shorts workflow.</p>
              <div className="home-grid-foot">
                <span className="home-spot-cta">
                  See the series
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* ---- Engineering systems and experiments ---- */}
        <section className="home-section home-shell" aria-labelledby="experiments-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Under the hood</p>
            <h2 id="experiments-heading">Engineering systems and experiments</h2>
            <p className="pj-section-sub">
              Infrastructure, research, and side builds that inform the products. Most are public on GitHub: read
              the code, run it yourself. The bigger systems have their own pages.
            </p>
          </div>

          <div className="pj-exp-grid">
            {experiments.map(({ name, tagline, language, stars, url, Icon }) => (
              <a
                key={name}
                href={url}
                {...(url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="pj-exp-card"
              >
                <div className="pj-exp-top">
                  <span className="home-grid-icon">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="pj-exp-name">
                    {name}
                    {stars > 0 && (
                      <span className="pj-exp-stars">
                        <Star className="h-3.5 w-3.5" />
                        {stars}
                      </span>
                    )}
                  </span>
                </div>
                <p>{tagline}</p>
                <div className="pj-exp-foot">
                  <span className="pj-exp-lang">{language}</span>
                  <ArrowUpRight className="pj-exp-arrow h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ---- Capabilities ---- */}
        <section className="home-section home-shell" aria-labelledby="capabilities-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Capabilities</p>
            <h2 id="capabilities-heading">What this work demonstrates</h2>
          </div>
          <ul className="pj-cap-grid">
            {capabilities.map(({ title, Icon }) => (
              <li key={title} className="pj-cap">
                <span className="home-grid-icon">
                  <Icon className="h-5 w-5" />
                </span>
                {title}
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="home-final home-shell" aria-labelledby="final-heading">
          <div className="home-final-panel">
            <FolderGit2 className="home-final-icon h-6 w-6" aria-hidden="true" />
            <h2 id="final-heading">The products ship as the Fast Series</h2>
            <p>
              Recording, playback, clipping, compression, and short-form production for Windows. Need something
              custom built instead? Start a project on the build page.
            </p>
            <div className="home-hero-actions home-final-actions">
              <a href="/fast-series" className="home-btn home-btn-primary">
                <Zap className="h-4 w-4" />
                View the Fast Series
              </a>
              <a href="/build" className="home-btn home-btn-ghost">
                Start a project
              </a>
              <a
                href="https://github.com/CalvinSturm"
                target="_blank"
                rel="noopener noreferrer"
                className="home-btn home-btn-ghost"
              >
                <Github className="h-4 w-4" />
                View GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
