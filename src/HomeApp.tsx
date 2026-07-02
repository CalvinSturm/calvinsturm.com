import {
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Code2,
  FolderGit2,
  Github,
  HardDrive,
  House,
  Minimize2,
  MonitorPlay,
  PlayCircle,
  Scissors,
  ShieldCheck,
  Video,
  Wrench,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HomeHeader, HomeFooter } from './HomeChrome.tsx';

type Spotlight = {
  slug: 'fastcast' | 'fastplay';
  name: string;
  iconUrl: string;
  status: string;
  description: string;
  chips: string[];
  cta: string;
};

const spotlights: Spotlight[] = [
  {
    slug: 'fastcast',
    name: 'FastCast',
    iconUrl: '/assets/FastCast/FastCast_Icon.png',
    status: 'Open Beta',
    description:
      'Native Windows screen recorder and OBS alternative for local MP4 recording, webcam overlay, desktop/mic audio, and RTMP/RTMPS livestreaming.',
    chips: ['Local MP4 recording', 'Webcam overlay', 'RTMP/RTMPS streaming', 'Desktop + mic audio'],
    cta: 'Explore FastCast',
  },
  {
    slug: 'fastplay',
    name: 'FastPlay',
    iconUrl: '/assets/FastPlay/fastplay.png',
    status: 'Free · MIT License',
    description:
      'Fast lightweight Windows video player for local files, built for responsive playback, seeking, and simple native Windows use.',
    chips: ['Instant open', 'Responsive seek', 'Hardware decode', 'Keyboard-driven'],
    cta: 'Explore FastPlay',
  },
];

type GridProduct = {
  slug: string;
  name: string;
  Icon: LucideIcon;
  line: string;
  status: string;
  useCase: string;
};

const gridProducts: GridProduct[] = [
  {
    slug: 'fastcast',
    name: 'FastCast',
    Icon: MonitorPlay,
    line: 'Screen recording and RTMP/RTMPS livestreaming without scene setup.',
    status: 'Open Beta',
    useCase: 'Record & stream',
  },
  {
    slug: 'fastplay',
    name: 'FastPlay',
    Icon: PlayCircle,
    line: 'Lightweight local video playback with fast startup and responsive seeking.',
    status: 'Released',
    useCase: 'Playback',
  },
  {
    slug: 'fastclip',
    name: 'FastClip',
    Icon: Scissors,
    line: 'AI-assisted clip extraction for finding usable highlights from longer videos.',
    status: 'In development',
    useCase: 'Clipping',
  },
  {
    slug: 'fastcompress',
    name: 'FastCompress',
    Icon: Minimize2,
    line: 'Simple Windows video compression for smaller files without complicated setup.',
    status: 'In development',
    useCase: 'Compression',
  },
  {
    slug: 'fastshorts',
    name: 'FastShorts',
    Icon: Clapperboard,
    line: 'Local-first short-form video pipeline for faceless and creator workflows.',
    status: 'Experimental',
    useCase: 'Short-form',
  },
];

const whyPoints = [
  [
    'Native Windows where performance matters',
    'Recording, playback, and encoding sit close to the hardware. These tools are built for Windows first, not wrapped web apps.',
  ],
  [
    'Local-first when practical',
    'Your footage stays on your machine. Files, recordings, and processing are local by default; nothing depends on an account.',
  ],
  [
    'Simple workflows instead of bloated setup',
    'Open the app, do the job, close the app. No scene graphs, plugin managers, or settings mazes to learn first.',
  ],
  [
    'Clear product pages and honest limitations',
    'Every tool documents what it does, what it does not do yet, and where the rough edges are.',
  ],
  [
    'Built for real creator and media workflows',
    'Record a session, review the footage, cut the highlight, shrink the file, ship the short. The series follows the actual pipeline.',
  ],
] as const;

const trustPoints = [
  {
    Icon: Wrench,
    title: 'Built by Calvin Sturm',
    body: 'One developer shipping under Sturm Technologies LLC. You know exactly who wrote the software you are running.',
  },
  {
    Icon: FolderGit2,
    title: 'Public releases where possible',
    body: 'FastPlay is open source under the MIT License. FastCast publishes release artifacts, SHA-256 checksums, and clear beta notes on GitHub release pages.',
  },
  {
    Icon: ShieldCheck,
    title: 'Privacy notes on every product page',
    body: 'Local-first behavior, telemetry stance, and known limitations are written down per product, not buried in a policy.',
  },
  {
    Icon: Zap,
    title: 'Focused on shipping useful tools',
    body: 'Small, practical apps that solve one problem well, released early and improved in the open.',
  },
] as const;

export default function HomeApp() {
  return (
    <div className="home-landing">
      <HomeHeader />

      <main id="main-content">
        {/* ---- Hero ---- */}
        <section className="home-hero home-shell">
          <div className="home-hero-copy">
            <p className="home-eyebrow">Sturm Technologies · The Fast Series</p>
            <h1>Practical Windows software for creators and builders</h1>
            <p className="home-hero-sub">
              Native Windows apps and local-first creator tools for recording, playback, compression, clipping, and
              short-form video workflows.
            </p>
            <div className="home-hero-actions">
              <a href="/fast-series" className="home-btn home-btn-primary">
                Explore the Fast Series
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/projects" className="home-btn home-btn-ghost">
                View Projects
              </a>
            </div>
            <p className="home-hero-meta">Windows 10/11 · Local-first tools · Releases on GitHub</p>
          </div>

          <div className="home-hero-visual" aria-hidden="true">
            <div className="home-console">
              <div className="home-console-bar">
                <span className="home-console-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="home-console-title">Fast Series</span>
                <span className="home-console-os">Windows</span>
              </div>

              <div className="home-console-body">
                <div className="home-console-card home-console-cast">
                  <img src="/assets/FastCast/FastCast_Icon.png" alt="FastCast app icon" width={38} height={38} />
                  <div className="home-console-card-text">
                    <span className="home-console-name">FastCast</span>
                    <span className="home-console-desc">Screen capture · Livestream</span>
                  </div>
                  <span className="home-rec-chip">
                    <span className="home-rec-dot" />
                    REC 00:42
                  </span>
                </div>

                <div className="home-console-card home-console-play">
                  <div className="home-console-card-top">
                    <img src="/assets/FastPlay/fastplay.png" alt="FastPlay app icon" width={38} height={38} />
                    <div className="home-console-card-text">
                      <span className="home-console-name">FastPlay</span>
                      <span className="home-console-desc">Local playback</span>
                    </div>
                    <span className="home-console-time">12:07 / 19:32</span>
                  </div>
                  <div className="home-scrub">
                    <span />
                  </div>
                </div>

                <div className="home-console-row">
                  <div className="home-console-tile">
                    <Scissors className="h-4 w-4" />
                    <span>FastClip</span>
                  </div>
                  <div className="home-console-tile">
                    <Minimize2 className="h-4 w-4" />
                    <span>FastCompress</span>
                  </div>
                  <div className="home-console-tile">
                    <Clapperboard className="h-4 w-4" />
                    <span>FastShorts</span>
                  </div>
                </div>
              </div>

              <div className="home-console-foot">
                <HardDrive className="h-3.5 w-3.5" />
                <span>Files stay on your machine</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Spotlight ---- */}
        <section className="home-section home-shell" aria-labelledby="spotlight-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Flagship tools</p>
            <h2 id="spotlight-heading">Start with the two that ship today</h2>
          </div>

          <div className="home-spot-grid">
            {spotlights.map((p) => (
              <a key={p.slug} href={`/${p.slug}`} className={`home-spot-card home-spot-${p.slug}`}>
                <div className="home-spot-top">
                  <img src={p.iconUrl} alt={`${p.name} app icon`} width={52} height={52} className="home-spot-icon" />
                  <span className="home-status-chip">{p.status}</span>
                </div>
                <h3>{p.name}</h3>
                <p className="home-spot-desc">{p.description}</p>
                <ul className="home-spot-chips">
                  {p.chips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
                <span className="home-spot-cta">
                  {p.cta}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>

          <nav className="home-start-here" aria-label="Start here">
            <span className="home-start-label">Start here</span>
            <a href="/fastcast">
              <span>Recording or streaming?</span>
              <strong>
                FastCast
                <ArrowRight className="h-3.5 w-3.5" />
              </strong>
            </a>
            <a href="/fastplay">
              <span>Playing and reviewing footage?</span>
              <strong>
                FastPlay
                <ArrowRight className="h-3.5 w-3.5" />
              </strong>
            </a>
            <a href="/fast-series">
              <span>Building a shorts workflow?</span>
              <strong>
                Fast Series
                <ArrowRight className="h-3.5 w-3.5" />
              </strong>
            </a>
          </nav>
        </section>

        {/* ---- Fast Series grid ---- */}
        <section className="home-section home-shell" aria-labelledby="series-heading">
          <div className="home-section-head home-section-head-split">
            <div>
              <p className="home-eyebrow">The Fast Series</p>
              <h2 id="series-heading">One tool per job, one pipeline overall</h2>
            </div>
            <div className="home-section-head-links">
              <a href="/fast-series" className="home-inline-link">
                View the full series
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="/roadmap" className="home-inline-link">
                Product roadmap
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="home-grid">
            {gridProducts.map((p) => (
              <a key={p.slug} href={`/${p.slug}`} className="home-grid-card">
                <div className="home-grid-top">
                  <span className="home-grid-icon">
                    <p.Icon className="h-5 w-5" />
                  </span>
                  <span className="home-usecase">{p.useCase}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.line}</p>
                <div className="home-grid-foot">
                  <span className="home-status-chip">{p.status}</span>
                  <ArrowRight className="home-grid-arrow h-4 w-4" />
                </div>
              </a>
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

        {/* ---- Why this exists ---- */}
        <section className="home-section home-shell" aria-labelledby="why-heading">
          <div className="home-why-grid">
            <div className="home-why-intro">
              <p className="home-eyebrow">Why this exists</p>
              <h2 id="why-heading">Small tools, built the way media work actually happens</h2>
              <p>
                Most creator software tries to do everything and ends up heavy. The Fast Series takes the opposite
                bet: separate, focused tools that respect your machine and your time.
              </p>
            </div>
            <ol className="home-why-list">
              {whyPoints.map(([title, body], i) => (
                <li key={title}>
                  <span className="home-why-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- Trust ---- */}
        <section className="home-section home-shell" aria-labelledby="trust-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Who is behind this</p>
            <h2 id="trust-heading">Built in the open, documented plainly</h2>
          </div>
          <div className="home-trust-grid">
            {trustPoints.map(({ Icon, title, body }) => (
              <article key={title} className="home-trust-card">
                <Icon className="home-trust-icon h-5 w-5" />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <a
            href="https://github.com/CalvinSturm"
            target="_blank"
            rel="noopener noreferrer"
            className="home-inline-link home-trust-github"
          >
            <Github className="h-4 w-4" />
            github.com/CalvinSturm
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

        {/* ---- Services (secondary) ---- */}
        <section className="home-section home-shell" aria-labelledby="services-heading">
          <div className="home-services-band">
            <div className="home-services-copy">
              <span className="home-services-icon">
                <Code2 className="h-5 w-5" />
              </span>
              <div>
                <h2 id="services-heading">Need a practical website, app, or automation built?</h2>
                <p>
                  Alongside the Fast Series, Sturm Technologies takes on a small number of custom builds: websites,
                  business software, and applied AI.
                </p>
              </div>
            </div>
            <div className="home-services-actions">
              <a href="/build" className="home-btn home-btn-ghost">
                Websites &amp; software
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/tech-support" className="home-inline-link">
                <House className="h-4 w-4" />
                In-home tech support
              </a>
            </div>
          </div>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="home-final home-shell" aria-labelledby="final-heading">
          <div className="home-final-panel">
            <Video className="home-final-icon h-6 w-6" aria-hidden="true" />
            <h2 id="final-heading">Build faster with practical creator tools</h2>
            <p>Record, play back, clip, compress, and ship short-form video with tools that stay out of your way.</p>
            <div className="home-hero-actions home-final-actions">
              <a href="/fast-series" className="home-btn home-btn-primary">
                Explore Fast Series
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/projects" className="home-btn home-btn-ghost">
                View Projects
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
