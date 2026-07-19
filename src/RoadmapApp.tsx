import { ArrowRight, ArrowUpRight, Clapperboard, Github, Milestone, Minimize2, Scissors } from 'lucide-react';
import { HomeHeader, HomeFooter } from './HomeChrome.tsx';

// All shipped items below are backed by release tags, release notes, or
// changelog entries in the FastCast/FastPlay repos. Future items come from the
// maintained FastPlay ROADMAP.md and FastCast release-readiness docs; keep the
// language directional, not promissory.

const fastCastReleasesUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases';
const fastPlayRepoUrl = 'https://github.com/CalvinSturm/FastPlay';
const fastPlayReleasesUrl = 'https://github.com/CalvinSturm/FastPlay/releases';

type ChipTone = 'current' | 'shipped' | 'internal' | 'progress' | 'planned' | 'research';

type TimelineItem = {
  version: string;
  date: string;
  status: string;
  tone: ChipTone;
  title: string;
  body: string;
  link?: { href: string; label: string };
};

const fastCastTimeline: TimelineItem[] = [
  {
    version: 'v0.5.1',
    date: 'July 2026',
    status: 'Current release',
    tone: 'current',
    title: 'Command-line recording control',
    body: 'Added fastcastc so scripts, Stream Deck buttons, and schedulers can start or stop recording through the same guarded actions as the app and global hotkey, including optional monitor selection and script-friendly exit codes.',
    link: {
      href: 'https://github.com/CalvinSturm/FastCast-releases/releases/tag/v0.5.1',
      label: 'Release page',
    },
  },
  {
    version: 'v0.5.0',
    date: 'July 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'Live layouts and a faster interface',
    body: 'Added screen and camera layouts that can switch during recording or streaming, layout hotkeys, microphone gain, a last-recording panel, better small-screen sizing, and substantially faster software encoding.',
    link: {
      href: 'https://github.com/CalvinSturm/FastCast-releases/releases/tag/v0.5.0',
      label: 'Release page',
    },
  },
  {
    version: 'v0.4.0',
    date: 'July 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'FastCast Pro activation',
    body: 'Introduced one-time Creator Pro licenses: Pro unlocks 1440p/4K recording, 60 fps capture, and advanced encoder controls, while FastCast Free stays free for 1080p30 recording and streaming. Activation is local-first, with no accounts and no telemetry.',
    link: {
      href: 'https://github.com/CalvinSturm/FastCast-releases/releases/tag/v0.4.0',
      label: 'Release page',
    },
  },
  {
    version: 'v0.3.3',
    date: 'July 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'Webcam overlay control and UI polish',
    body: 'Added webcam overlay hide/show during active recording, refined the dark UI layout, and fixed the Stream card platform button overlap.',
    link: {
      href: 'https://github.com/CalvinSturm/FastCast-releases/releases/tag/v0.3.3',
      label: 'Release page',
    },
  },
  {
    version: 'v0.3.2',
    date: 'June 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'Packaging and licensing cleanup',
    body: 'Aligned distribution with the private-source model: the package now ships a proprietary license plus third-party notices, with no changes to recording or streaming behavior.',
    link: {
      href: 'https://github.com/CalvinSturm/FastCast-releases/releases/tag/v0.3.2',
      label: 'Release page',
    },
  },
  {
    version: 'v0.3.1',
    date: 'June 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'First public Open Beta release',
    body: 'FastCast went public as an unsigned portable ZIP on the release feed, adding a global Ctrl+Alt+F9 record hotkey, manual update checks, redacted support-bundle export, and working AMD hardware H.264 encoding.',
    link: {
      href: 'https://github.com/CalvinSturm/FastCast-releases/releases/tag/v0.3.1',
      label: 'Release page',
    },
  },
  {
    version: 'v0.3.0',
    date: 'June 2026',
    status: 'Pre-public',
    tone: 'internal',
    title: 'Crash-safe recording',
    body: 'Recordings became short, already-finalized segments stitched together on Stop, so a crash or power loss loses seconds instead of the whole take. Also added file logging, a diagnostics bundle, and CI coverage of the encode path.',
  },
  {
    version: 'v0.2.0',
    date: 'June 2026',
    status: 'Pre-public',
    tone: 'internal',
    title: 'Creator UI overhaul',
    body: 'A full dark reskin with one-click profiles, YouTube/Twitch/Kick quick setup, window capture, webcam crop with aspect presets, and live audio meters with per-source mute.',
  },
  {
    version: 'v0.1.0',
    date: 'June 2026',
    status: 'Pre-public',
    tone: 'internal',
    title: 'First working build',
    body: 'The core pipeline came alive: screen capture, desktop and microphone audio, hardware H.264 encoding to local MP4, RTMP/RTMPS streaming, and a GPU-composited webcam overlay.',
  },
];

const fastPlayTimeline: TimelineItem[] = [
  {
    version: 'v0.4.4',
    date: 'July 2026',
    status: 'Current release',
    tone: 'current',
    title: 'Full-range PQ and 120 fps playback',
    body: 'Full-range PQ/BT.2020 video now opens and plays through the HDR path, and a smoother audio master clock removes the structural frame loss that affected 120 fps playback on high-refresh displays.',
    link: {
      href: 'https://github.com/CalvinSturm/FastPlay/blob/main/docs/release-notes-v0.4.4.md',
      label: 'Release notes',
    },
  },
  {
    version: 'v0.4.3',
    date: 'July 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'Native HDR output',
    body: 'HDR10 PQ and HLG now present natively on HDR-active displays, with HDR10 static metadata, HDR-aware overlays and screenshots, and the existing tone-map path retained for SDR displays.',
    link: {
      href: 'https://github.com/CalvinSturm/FastPlay/blob/main/docs/release-notes-v0.4.3.md',
      label: 'Release notes',
    },
  },
  {
    version: 'v0.4.2',
    date: 'July 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'HDR playback and audio-only files',
    body: 'HDR10 and HLG video is tone-mapped to SDR in a custom pixel shader, audio-only formats like MP3 and FLAC now play, and three playback bugs are fixed: silent audio after early scrubbing, stretched rotated zoom, and a crash when switching queue items quickly.',
    link: {
      href: 'https://github.com/CalvinSturm/FastPlay/blob/main/docs/release-notes-v0.4.2.md',
      label: 'Release notes',
    },
  },
  {
    version: 'v0.4.1',
    date: 'June 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'Stability and shutdown reliability',
    body: 'Fixed an intermittent crash or freeze when closing the window, and kept audio steady on heavy 4K60 files that fall back to software video decoding.',
    link: {
      href: 'https://github.com/CalvinSturm/FastPlay/blob/main/docs/release-notes-v0.4.1.md',
      label: 'Release notes',
    },
  },
  {
    version: 'v0.4.0',
    date: 'June 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'Lightweight play queue',
    body: 'Drop several files or a folder to build a temporary queue, step through it with PageUp and PageDown, and auto-advance at the natural end of each file. No playlists, no media library.',
    link: {
      href: 'https://github.com/CalvinSturm/FastPlay/blob/main/docs/release-notes-v0.4.0.md',
      label: 'Release notes',
    },
  },
  {
    version: 'v0.3.0',
    date: 'June 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'Recent files and resume',
    body: 'Added a recent-files overlay and per-file resume positions, fixed A/V desync after backward seeks, and added a local benchmark harness for open, seek, and playback metrics.',
    link: {
      href: 'https://github.com/CalvinSturm/FastPlay/blob/main/docs/release-notes-v0.3.0.md',
      label: 'Release notes',
    },
  },
  {
    version: 'v0.2.0 - v0.2.2',
    date: 'June 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'In/out clip ranges',
    body: 'Added in and out points with loop-range playback for review workflows, followed by two hotfixes that restored smooth pacing and hardened clip-boundary seeking.',
    link: { href: fastPlayReleasesUrl, label: 'All releases' },
  },
  {
    version: 'v0.1.4 - v0.1.6',
    date: 'April to June 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'Playback hardening',
    body: 'Three releases focused on D3D11 crash fixes, scrub stability under rapid seeking, a live seek preview while scrubbing, and removing per-frame overhead from the playback hot path.',
    link: { href: fastPlayReleasesUrl, label: 'All releases' },
  },
  {
    version: 'v0.1.0',
    date: 'March 2026',
    status: 'Shipped',
    tone: 'shipped',
    title: 'First tagged release',
    body: 'The starting point: a native Windows player for local files built on FFmpeg decode, D3D11 hardware acceleration, and WASAPI audio.',
    link: { href: fastPlayReleasesUrl, label: 'All releases' },
  },
];

type NextItem = {
  title: string;
  status: string;
  tone: ChipTone;
  body: string;
};

const fastCastNext: NextItem[] = [
  {
    title: 'Beta feedback loop',
    status: 'In progress',
    tone: 'progress',
    body: 'Open Beta fixes are driven by redacted support bundles that users export from the app. Nothing is uploaded automatically.',
  },
  {
    title: 'Signed releases',
    status: 'Planned',
    tone: 'planned',
    body: 'Current Open Beta builds ship unsigned by an explicit, documented decision. Signed releases remain the stated long-term preference before wider distribution.',
  },
  {
    title: 'Broader encoder qualification',
    status: 'Research',
    tone: 'research',
    body: 'Hardware H.264 encoding is validated on NVIDIA and AMD. Intel Quick Sync is not yet qualified; the software fallback covers it in the meantime.',
  },
  {
    title: 'Capture and encode performance',
    status: 'Research',
    tone: 'research',
    body: 'GPU texture pooling is scaffolded but disabled by default. Enabling it depends on wider vendor validation, so it is not part of any promised release.',
  },
];

const fastPlayNext: NextItem[] = [
  {
    title: 'Portable ZIP build',
    status: 'Planned',
    tone: 'planned',
    body: 'A no-installer build alongside the MSI, one of the remaining product basics on the maintained roadmap.',
  },
  {
    title: 'Optional file associations',
    status: 'Planned',
    tone: 'planned',
    body: 'File associations are partially present through the MSI today. The plan is an explicit, optional toggle instead of an installer side effect.',
  },
  {
    title: 'Published benchmarks',
    status: 'Planned',
    tone: 'planned',
    body: 'A local benchmark harness already measures open, seek, and playback percentiles. Cross-player speed comparisons will only be claimed once measured results are published.',
  },
];

const laterItems = [
  {
    product: 'FastPlay',
    accent: 'play',
    title: 'Creator review mode',
    body: 'Copy timestamp, timestamp notes, exporting in/out marks as JSON or CSV, and timeline hover thumbnails are candidates that build on the existing clip-range work. None are promised; each depends on testing and architecture fit.',
  },
  {
    product: 'FastCast',
    accent: 'cast',
    title: 'Pro feature expansion',
    body: 'FastCast Pro shipped in v0.4.0 as a one-time Creator Pro license unlocking 1440p/4K recording and 60 fps capture. Further Pro features are evaluated against beta feedback; nothing beyond what is in the app today is promised.',
  },
  {
    product: 'Both',
    accent: 'none',
    title: 'Deliberately not planned',
    body: 'FastPlay stays out of streaming, playlists, media libraries, plugins, and cross-platform builds. FastCast does not chase full OBS parity: no scene system, chroma key, or multistreaming is on this roadmap, and it keeps its no-telemetry, no-account, manual-update stance.',
  },
];

const principles: Array<[string, string]> = [
  [
    'Reliability before features',
    'Most releases above are stability work. Crash fixes and recording safety ship before new surface area.',
  ],
  [
    'Simple workflows first',
    'Single-scene recording and single-file playback stay the core paths. Complexity has to earn its way in.',
  ],
  [
    'Local-first',
    'Recordings and playback stay on your machine. FastCast ships with no telemetry, no accounts, and no background update polling.',
  ],
  [
    'Honest limitations',
    'Product pages state what does not exist yet: no scene system in FastCast, no media library in FastPlay, and unsigned beta builds called out plainly.',
  ],
  [
    'Release when validated',
    'FastCast public builds follow manual validation passes. FastPlay changes land as small, reviewable releases with written notes.',
  ],
  [
    'Feedback moves the roadmap',
    'Beta reports and support bundles decide what gets fixed next. Roadmap order changes when testing says it should.',
  ],
];

function StatusChip({ status, tone }: { status: string; tone: ChipTone }) {
  return <span className={`home-status-chip rm-chip rm-chip-${tone}`}>{status}</span>;
}

function TimelineLane({
  accent,
  name,
  iconUrl,
  summary,
  items,
}: {
  accent: 'cast' | 'play';
  name: string;
  iconUrl: string;
  summary: string;
  items: TimelineItem[];
}) {
  return (
    <div className={`rm-lane rm-lane-${accent}`}>
      <div className="rm-lane-head">
        <img src={iconUrl} alt={`${name} app icon`} width={40} height={40} className="rm-lane-icon" />
        <div>
          <h3>{name}</h3>
          <p>{summary}</p>
        </div>
      </div>
      <ol className="rm-timeline">
        {items.map((item) => (
          <li key={item.version} className="rm-item">
            <article className="rm-card">
              <div className="rm-item-meta">
                <span className="rm-version">{item.version}</span>
                <StatusChip status={item.status} tone={item.tone} />
                <span className="rm-date">{item.date}</span>
              </div>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
              {item.link && (
                <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="rm-item-link">
                  {item.link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

function NextCard({
  accent,
  name,
  items,
}: {
  accent: 'cast' | 'play';
  name: string;
  items: NextItem[];
}) {
  return (
    <article className={`rm-next-card rm-lane-${accent}`}>
      <h3>{name}</h3>
      <ul className="rm-next-list">
        {items.map((item) => (
          <li key={item.title}>
            <div className="rm-next-top">
              <h4>{item.title}</h4>
              <StatusChip status={item.status} tone={item.tone} />
            </div>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function RoadmapApp() {
  return (
    <div className="home-landing">
      <HomeHeader />

      <main id="main-content">
        {/* ---- Hero ---- */}
        <section className="home-shell rm-hero">
          <p className="home-eyebrow">Product roadmap</p>
          <h1>Fast Series roadmap</h1>
          <p className="home-hero-sub">
            A public timeline for the native Windows creator tools in the Fast Series: what ships today, what is in
            beta, and what comes next.
          </p>
          <div className="home-hero-actions">
            <a href="/fast-series" className="home-btn home-btn-primary">
              Explore the Fast Series
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/fast-series#available" className="home-btn home-btn-ghost">
              Download available tools
            </a>
          </div>
          <p className="home-hero-meta rm-note">
            Roadmap items are directional and may change based on testing, user feedback, and release readiness.
          </p>
        </section>

        {/* ---- Product summary cards ---- */}
        <section className="home-section home-shell" aria-labelledby="rm-products-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">The five tools</p>
            <h2 id="rm-products-heading">Where each one stands today</h2>
          </div>
          <div className="home-spot-grid">
            <article className="home-spot-card home-spot-fastcast rm-summary-card">
              <div className="home-spot-top">
                <img
                  src="/assets/FastCast/FastCast_Icon.png"
                  alt="FastCast app icon"
                  width={52}
                  height={52}
                  className="home-spot-icon"
                />
                <StatusChip status="Open Beta" tone="current" />
              </div>
              <h3>FastCast</h3>
              <p className="home-spot-desc">
                Native Windows screen recorder and livestreaming app: local MP4 recording, webcam overlay, desktop
                and microphone audio, and RTMP/RTMPS streaming. Source code is private; releases, checksums, and
                notes are public.
              </p>
              <p className="fs-spot-meta">v0.5.1 · Windows 10/11 x64 · Portable ZIP · Free version, optional Pro license</p>
              <div className="rm-spot-links">
                <a href="/fastcast" className="home-spot-cta">
                  FastCast product page
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={fastCastReleasesUrl} target="_blank" rel="noopener noreferrer" className="home-inline-link">
                  <Github className="h-4 w-4" />
                  Release feed
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>

            <article className="home-spot-card home-spot-fastplay rm-summary-card">
              <div className="home-spot-top">
                <img
                  src="/assets/FastPlay/fastplay.png"
                  alt="FastPlay app icon"
                  width={52}
                  height={52}
                  className="home-spot-icon"
                />
                <StatusChip status="Released" tone="current" />
              </div>
              <h3>FastPlay</h3>
              <p className="home-spot-desc">
                Fast, lightweight native Windows video player for local files: quick open, responsive seeking,
                hardware-accelerated decode, and keyboard-driven controls. Free and open source under the MIT
                License.
              </p>
              <p className="fs-spot-meta">v0.4.4 · Windows 10+ · MSI installer · MIT License</p>
              <div className="rm-spot-links">
                <a href="/fastplay" className="home-spot-cta">
                  FastPlay product page
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={fastPlayRepoUrl} target="_blank" rel="noopener noreferrer" className="home-inline-link">
                  <Github className="h-4 w-4" />
                  Source on GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </div>

          <div className="home-grid rm-more-grid" style={{ marginTop: '20px' }}>
            {[
              {
                name: 'FastClip',
                href: '/fastclip',
                status: 'Open Beta',
                tone: 'current' as ChipTone,
                Icon: Scissors,
                desc: 'Turns long local videos into ranked highlight candidates and exports 9:16 vertical clips. Local-only processing.',
              },
              {
                name: 'FastCompress',
                href: '/fastcompress',
                status: 'Beta',
                tone: 'current' as ChipTone,
                Icon: Minimize2,
                desc: 'Shrinks videos to fit Discord, email, or upload limits with destination presets. No watermark, no account.',
              },
              {
                name: 'FastShorts',
                href: '/fastshorts',
                status: 'Experimental',
                tone: 'research' as ChipTone,
                Icon: Clapperboard,
                desc: 'Local pipeline that turns a written story into a narrated, captioned vertical short. No public download yet.',
              },
            ].map(({ name, href, status, tone, Icon, desc }) => (
              <a key={name} href={href} className="home-grid-card">
                <div className="home-grid-top">
                  <span className="home-grid-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                  <StatusChip status={status} tone={tone} />
                </div>
                <h3>{name}</h3>
                <p>{desc}</p>
                <div className="home-grid-foot">
                  <span className="home-spot-cta">
                    Product page
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ---- Shipped timeline ---- */}
        <section className="home-section home-shell" aria-labelledby="rm-shipped-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Shipped</p>
            <h2 id="rm-shipped-heading">Release timeline</h2>
            <p className="rm-section-sub">
              Newest first. Every entry below is backed by a tagged release, published release notes, or the
              project changelog. FastCast versions before v0.3.1 were internal milestones and have no public
              downloads. FastClip and FastCompress join the timeline when their first public builds land on their
              release feeds.
            </p>
          </div>
          <div className="rm-lanes">
            <TimelineLane
              accent="cast"
              name="FastCast"
              iconUrl="/assets/FastCast/FastCast_Icon.png"
              summary="Recorder and streamer · public since June 2026"
              items={fastCastTimeline}
            />
            <TimelineLane
              accent="play"
              name="FastPlay"
              iconUrl="/assets/FastPlay/fastplay.png"
              summary="Video player · shipping since March 2026"
              items={fastPlayTimeline}
            />
          </div>
        </section>

        {/* ---- Next ---- */}
        <section className="home-section home-shell" aria-labelledby="rm-next-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Next</p>
            <h2 id="rm-next-heading">What is being worked on</h2>
            <p className="rm-section-sub">
              These are the current priorities, stated without dates. Order can change as beta feedback and
              validation results come in.
            </p>
          </div>
          <div className="rm-next-grid">
            <NextCard accent="cast" name="FastCast" items={fastCastNext} />
            <NextCard accent="play" name="FastPlay" items={fastPlayNext} />
          </div>
        </section>

        {/* ---- Later / research ---- */}
        <section className="home-section home-shell" aria-labelledby="rm-later-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Later and research</p>
            <h2 id="rm-later-heading">Being evaluated, not promised</h2>
          </div>
          <div className="rm-later-grid">
            {laterItems.map((item) => (
              <article key={item.title} className={`rm-later-card rm-lane-${item.accent}`}>
                <span className="rm-later-product">{item.product}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Principles ---- */}
        <section className="home-section home-shell" aria-labelledby="rm-principles-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">How decisions get made</p>
            <h2 id="rm-principles-heading">Roadmap principles</h2>
          </div>
          <div className="rm-principles-grid">
            {principles.map(([title, body], i) => (
              <article key={title} className="rm-principle">
                <span className="rm-principle-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="home-final home-shell" aria-labelledby="rm-final-heading">
          <div className="home-final-panel">
            <Milestone className="home-final-icon h-6 w-6" aria-hidden="true" />
            <h2 id="rm-final-heading">Follow the Fast Series as it ships</h2>
            <p>
              Every tool publishes real releases with real notes. Try what exists today and watch this page as the
              rest lands.
            </p>
            <div className="home-hero-actions home-final-actions">
              <a href="/fast-series" className="home-btn home-btn-primary">
                Explore the Fast Series
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/fast-series#available" className="home-btn home-btn-ghost">
                Download available tools
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
