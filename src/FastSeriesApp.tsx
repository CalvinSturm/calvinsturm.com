import {
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Github,
  Minimize2,
  MonitorPlay,
  PlayCircle,
  Scissors,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HomeHeader, HomeFooter } from './HomeChrome.tsx';

type PipelineStep = {
  verb: string;
  name: string;
  href: string;
  desc: string;
  status: string;
  Icon: LucideIcon;
};

const pipeline: PipelineStep[] = [
  {
    verb: 'Record',
    name: 'FastCast',
    href: '/fastcast',
    desc: 'Capture your screen locally or stream to RTMP/RTMPS.',
    status: 'Open Beta',
    Icon: MonitorPlay,
  },
  {
    verb: 'Play',
    name: 'FastPlay',
    href: '/fastplay',
    desc: 'Review footage with instant open and responsive seeking.',
    status: 'Released',
    Icon: PlayCircle,
  },
  {
    verb: 'Clip',
    name: 'FastClip',
    href: '/fastclip',
    desc: 'Pull usable highlights out of long recordings.',
    status: 'Open Beta',
    Icon: Scissors,
  },
  {
    verb: 'Compress',
    name: 'FastCompress',
    href: '/fastcompress',
    desc: 'Shrink files with readable presets, no FFmpeg know-how.',
    status: 'Beta',
    Icon: Minimize2,
  },
  {
    verb: 'Create shorts',
    name: 'FastShorts',
    href: '/fastshorts',
    desc: 'Assemble vertical short-form video locally.',
    status: 'Experimental',
    Icon: Clapperboard,
  },
];

type Flagship = {
  slug: string;
  name: string;
  iconUrl: string;
  status: string;
  description: string;
  chips: string[];
  meta: string;
  cta: string;
};

const flagships: Flagship[] = [
  {
    slug: 'fastcast',
    name: 'FastCast',
    iconUrl: '/assets/FastCast/FastCast_Icon.png',
    status: 'Open Beta',
    description:
      'Native Windows screen recorder and OBS alternative. Choose a monitor or window, pick your audio, add a webcam overlay, then record MP4 locally or go live over RTMP/RTMPS. No scene setup required.',
    chips: [
      'Local MP4 recording',
      'Monitor or window capture',
      'Desktop + mic audio',
      'Webcam overlay',
      'RTMP/RTMPS streaming',
      'Hardware H.264 encoding',
    ],
    meta: 'v0.5.1 · Windows 10/11 x64 · Free version, optional Pro license',
    cta: 'Explore FastCast',
  },
  {
    slug: 'fastplay',
    name: 'FastPlay',
    iconUrl: '/assets/FastPlay/fastplay.png',
    status: 'Released',
    description:
      'Fast lightweight Windows video player for local files. Opens fast, seeks responsively, keeps video on the GPU with hardware decode, and stays out of your way when you just need to review footage.',
    chips: [
      'Instant first frame',
      'Responsive seek',
      'D3D11 hardware decode',
      'Keyboard-driven controls',
      'Recent files and resume',
      'Free and open source',
    ],
    meta: 'v0.4.4 · Windows 10+ · MIT License',
    cta: 'Explore FastPlay',
  },
  {
    slug: 'fastclip',
    name: 'FastClip',
    iconUrl: '/assets/FastClip/FastClip_Icon.png',
    status: 'Open Beta',
    description:
      'Turns long local videos into vertical clips. On-device signals propose ranked highlight candidates; you review them and export 1080×1920 MP4s with optional burned-in captions. Footage never leaves your machine.',
    chips: [
      'Ranked highlight candidates',
      'Local-only analysis',
      '9:16 vertical export',
      'Burned-in captions',
      'whisper.cpp transcription',
      'Hardware encoding',
    ],
    meta: 'Windows 10/11 x64 · Local-only processing · Free during beta',
    cta: 'Explore FastClip',
  },
  {
    slug: 'fastcompress',
    name: 'FastCompress',
    iconUrl: '/assets/FastCompress/FastCompress_Icon.png',
    status: 'Beta',
    description:
      'Dead-simple video compression. Pick where the video is going, like Discord or email, check the plan, and get a smaller file that fits. Runs locally through FFmpeg with no watermark and no account.',
    chips: [
      'Destination presets',
      'Editable target size',
      'Plan before encode',
      'No watermark',
      'Local FFmpeg',
      'CLI mode',
    ],
    meta: 'Windows 10/11 x64 · No watermark, no account · Free during beta',
    cta: 'Explore FastCompress',
  },
];

const experimental = pipeline.slice(4);

export default function FastSeriesApp() {
  return (
    <div className="home-landing">
      <HomeHeader />

      <main id="main-content">
        {/* ---- Hero ---- */}
        <section className="home-shell fs-hero">
          <p className="home-eyebrow">Sturm Technologies · Product family</p>
          <h1>Five focused Windows tools, one creator workflow</h1>
          <p className="home-hero-sub">
            The Fast Series is a family of practical native Windows tools for media work: recording, playback,
            clipping, compression, and short-form production. Each one is small, does one job well, and keeps your
            files on your machine.
          </p>
          <div className="home-hero-actions">
            <a href="#available" className="home-btn home-btn-primary">
              See the available tools
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/roadmap" className="home-btn home-btn-ghost">
              View the roadmap
            </a>
          </div>
          <p className="home-hero-meta">Windows 10/11 · Local-first · Releases on GitHub</p>
        </section>

        {/* ---- Workflow chooser ---- */}
        <section className="home-section home-shell" aria-labelledby="workflow-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Pick your step</p>
            <h2 id="workflow-heading">What do you need to do right now?</h2>
          </div>
          <ol className="fs-pipeline">
            {pipeline.map((step, i) => (
              <li key={step.name}>
                <a href={step.href} className="fs-step">
                  <div className="fs-step-top">
                    <span className="fs-step-num">{String(i + 1).padStart(2, '0')}</span>
                    <step.Icon className="fs-step-icon h-5 w-5" />
                  </div>
                  <span className="fs-step-verb">{step.verb}</span>
                  <h3>{step.name}</h3>
                  <p>{step.desc}</p>
                  <span className="home-status-chip">{step.status}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* ---- Available now ---- */}
        <section id="available" className="home-section home-shell" aria-labelledby="flagship-heading">
          <div className="home-section-head home-section-head-split">
            <div>
              <p className="home-eyebrow">Available now</p>
              <h2 id="flagship-heading">Four tools ship today</h2>
            </div>
            <a href="/roadmap" className="home-inline-link">
              View the roadmap
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="home-spot-grid">
            {flagships.map((p) => (
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
                <p className="fs-spot-meta">{p.meta}</p>
                <span className="home-spot-cta">
                  {p.cta}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ---- Experimental ---- */}
        <section className="home-section home-shell" aria-labelledby="indev-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Experimental</p>
            <h2 id="indev-heading">One more tool, still taking shape</h2>
          </div>
          <div className="home-grid fs-indev-grid">
            {experimental.map((p) => (
              <a key={p.name} href={p.href} className="home-grid-card">
                <div className="home-grid-top">
                  <span className="home-grid-icon">
                    <p.Icon className="h-5 w-5" />
                  </span>
                  <span className="home-usecase">{p.verb}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="home-grid-foot">
                  <span className="home-status-chip">{p.status}</span>
                  <ArrowRight className="home-grid-arrow h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
          <p className="fs-indev-note">
            FastShorts has no public download yet and no promised launch date. Its product page says what works
            today and what does not exist yet.
          </p>
        </section>

        {/* ---- GitHub band ---- */}
        <section className="home-section home-shell">
          <div className="home-services-band">
            <div className="home-services-copy">
              <span className="home-services-icon">
                <Github className="h-5 w-5" />
              </span>
              <div>
                <h2>Releases and source live on GitHub</h2>
                <p>
                  FastPlay is open source under the MIT License. FastCast, FastClip, and FastCompress publish
                  release artifacts, SHA-256 checksums, and beta notes on public releases repositories.
                </p>
              </div>
            </div>
            <div className="home-services-actions">
              <a
                href="https://github.com/CalvinSturm"
                target="_blank"
                rel="noopener noreferrer"
                className="home-btn home-btn-ghost"
              >
                github.com/CalvinSturm
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="home-final home-shell" aria-labelledby="final-heading">
          <div className="home-final-panel">
            <h2 id="final-heading">Start with the tools that ship today</h2>
            <p>
              Record with FastCast, review with FastPlay, clip with FastClip, and shrink the file with FastCompress.
              Four native Windows tools, one workflow.
            </p>
            <div className="home-hero-actions home-final-actions">
              <a href="#available" className="home-btn home-btn-primary">
                See the available tools
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/roadmap" className="home-btn home-btn-ghost">
                View the roadmap
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
