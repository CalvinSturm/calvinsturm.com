import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Cpu,
  Download,
  Gauge,
  Github,
  Layers,
  Maximize2,
  Move,
  Music,
  ShieldCheck,
  Sun,
  Zap,
} from 'lucide-react';
import { fastPlayFaqs } from './fastplay-faqs.mjs';
import { guides, guidePath } from './fastplay-guides/guides-data';
import { trackCtaClick } from './lib/analytics';
import { useReducedMotion } from './lib/useReducedMotion';
import './fastplay-v2.css';

const VERSION = '0.4.6';
const DOWNLOAD_URL = `https://github.com/CalvinSturm/FastPlay/releases/download/v${VERSION}/fastplay-${VERSION}-x86_64.msi`;
const SOURCE_URL = 'https://github.com/CalvinSturm/FastPlay';
const RELEASE_NOTES_URL = `https://github.com/CalvinSturm/FastPlay/releases/tag/v${VERSION}`;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ hooks */

/** Adds `is-in` to every `.fpv2-reveal` once it scrolls into view. */
function useRevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.fpv2-reveal'));
    if (prefersReducedMotion()) {
      nodes.forEach((node) => node.classList.add('is-in'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

/** Scroll progress of the whole document, 0 to 1, written straight to the DOM. */
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}

/** Tracks which section id is currently under the nav. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.01, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/** Counts a number up once its element enters the viewport. */
function useCountUp(target: number, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(prefersReducedMotion() ? target : 0);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(target * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target]);

  return { ref, display: value.toFixed(decimals) };
}

/* ------------------------------------------------------------------ nav */

const NAV_SECTIONS = [
  { id: 'hdr', label: 'HDR' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'controls', label: 'Controls' },
  { id: 'vlc', label: 'vs VLC' },
  { id: 'guides', label: 'Guides' },
  { id: 'faq', label: 'FAQ' },
];

function Nav() {
  const [stuck, setStuck] = useState(false);
  const ids = useMemo(() => NAV_SECTIONS.map((section) => section.id), []);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fpv2-nav${stuck ? ' is-stuck' : ''}`}>
      <div className="fpv2-nav-inner">
        <a className="fpv2-brand" href="/fastplay">
          <img src="/assets/FastPlay/fastplay.png" alt="" width={22} height={22} />
          FastPlay
        </a>
        <div className="fpv2-nav-links">
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={active === section.id ? 'is-active' : undefined}
            >
              {section.label}
            </a>
          ))}
        </div>
        <a
          className="fpv2-btn fpv2-btn-primary fpv2-btn-sm"
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCtaClick('fastplay', 'download_clicked', 'top', DOWNLOAD_URL)}
        >
          <Download size={15} />
          Download
        </a>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ hero */

const TOTAL_FRAMES = 580;
/** Matches the sticky nav height and `top` on .fpv2-film-stage in the stylesheet. */
const NAV_HEIGHT = 60;

/**
 * Scroll-scrubbed hero. The section is taller than the viewport with a pinned
 * stage inside it; scroll position through that range maps directly onto the
 * video's currentTime, so the wheel drives the footage frame by frame.
 *
 * The source is encoded all-intra (every frame a keyframe) so seeking to an
 * arbitrary time never has to decode forward from a distant keyframe.
 */
function Film() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const frameLabelRef = useRef<HTMLElement>(null);
  const cueRef = useRef<HTMLParagraphElement>(null);
  const isStatic = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (isStatic) {
      video.loop = false;
      video.pause();
      return;
    }

    // Some browsers refuse to seek until the element has been told to play at
    // least once. Priming it muted and immediately pausing unlocks scrubbing.
    let primed = false;
    const prime = () => {
      if (primed) return;
      primed = true;
      void video
        .play()
        .then(() => video.pause())
        .catch(() => {});
    };

    let raf = 0;
    let currentTime = 0;
    let targetTime = 0;
    let running = false;

    const stage = section.firstElementChild as HTMLElement | null;

    const progress = () => {
      const rect = section.getBoundingClientRect();
      // The pinned stage is shorter than the section, and the leftover height
      // is exactly the scroll range that drives the film.
      const distance = section.offsetHeight - (stage?.offsetHeight ?? window.innerHeight);
      if (distance <= 0) return 0;
      return Math.min(1, Math.max(0, (NAV_HEIGHT - rect.top) / distance));
    };

    const paint = (p: number) => {
      railRef.current?.style.setProperty('--fill', p.toFixed(4));

      if (frameLabelRef.current) {
        const frame = Math.min(TOTAL_FRAMES, Math.round(p * TOTAL_FRAMES) + 1);
        frameLabelRef.current.textContent = String(frame).padStart(3, '0');
      }
      if (cueRef.current) {
        cueRef.current.style.opacity = p > 0.04 ? '0' : '1';
      }
    };

    // Eased chase toward the scroll target: the wheel sets the destination and
    // the video glides to it instead of snapping.
    const tick = () => {
      const delta = targetTime - currentTime;
      if (Math.abs(delta) < 0.004) {
        currentTime = targetTime;
        running = false;
        raf = 0;
      } else {
        currentTime += delta * 0.16;
        raf = requestAnimationFrame(tick);
      }
      if (video.readyState >= 1 && Number.isFinite(currentTime)) {
        try {
          video.currentTime = currentTime;
        } catch {
          // Seeking before the media is ready is not fatal; the next frame retries.
        }
      }
    };

    const onScroll = () => {
      prime();
      const p = progress();
      paint(p);
      const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 19.33;
      // Stop a hair short of the end so the last frame stays on screen rather
      // than the browser clamping past it.
      targetTime = p * (duration - 0.05);
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onReady = () => {
      video.pause();
      onScroll();
    };

    video.addEventListener('loadedmetadata', onReady);
    if (video.readyState >= 1) onReady();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    paint(progress());

    return () => {
      video.removeEventListener('loadedmetadata', onReady);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isStatic]);

  return (
    <section className={`fpv2-film${isStatic ? ' is-static' : ''}`} ref={sectionRef}>
      <div className="fpv2-film-stage">
        <div className="fpv2-film-glow" aria-hidden="true" />

        <div className="fpv2-film-grid">
          <div className="fpv2-film-copy">
            <p className="fpv2-eyebrow">FastPlay v{VERSION} for Windows</p>
            <h1 className="fpv2-film-title">
              Open it.
              <br />
              It&apos;s already
              <br />
              <span className="fpv2-film-title-accent">playing.</span>
            </h1>
            <p className="fpv2-lede fpv2-film-lede">
              A native Windows video player built around one idea: the time between double-clicking a
              file and seeing a frame should be as close to zero as the hardware allows. No media
              library, no plugin maze, no waiting.
            </p>
            <div className="fpv2-film-actions">
              <a
                className="fpv2-btn fpv2-btn-primary"
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick('fastplay', 'download_clicked', 'hero', DOWNLOAD_URL)}
              >
                <Download size={17} />
                Download the MSI
              </a>
              <a
                className="fpv2-btn fpv2-btn-ghost"
                href={SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={17} />
                View source
              </a>
            </div>
            <p className="fpv2-film-meta">
              Windows 10 and later, 64-bit. Free and open source under the MIT License.
            </p>
          </div>

          <div className="fpv2-film-panel">
            <video
              ref={videoRef}
              src="/assets/FastPlay/fastplay-demo-scrub.mp4"
              poster="/assets/FastPlay/fastplay-demo-poster.jpg"
              width={544}
              height={988}
              muted
              playsInline
              preload="auto"
              aria-label="FastPlay demo: a sunset beach video opens instantly, plays with timeline scrubbing, and ends on the keyboard controls overlay."
            />
            <p className="fpv2-film-readout" aria-hidden="true">
              <span>
                frame <b ref={frameLabelRef}>001</b>
              </span>
              <span>/ {TOTAL_FRAMES}</span>
            </p>
          </div>
        </div>

        <div className="fpv2-film-rail" aria-hidden="true">
          <span className="fpv2-film-tick" ref={railRef}>
            <i />
          </span>
          <p className="fpv2-film-cue" ref={cueRef}>
            Scroll to play
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ stats */

type Stat = { value: number; decimals?: number; suffix?: string; prefix?: string; label: string };

const STATS: Stat[] = [
  { value: 120, suffix: 'fps', label: 'High-frame-rate video presents at full cadence on a high-refresh display' },
  { value: 1, suffix: 'exe', label: 'One Rust crate, one coordinator, one process. No runtime to install' },
  { value: 13, suffix: 'formats', label: 'Everyday local video and audio containers, plus sidecar .srt subtitles' },
  { value: 0, prefix: '$', label: 'Free and open source under the MIT License, with no Pro tier' },
];

function StatBand() {
  return (
    <section className="fpv2-stats" aria-label="FastPlay at a glance">
      {STATS.map((stat, index) => (
        <StatCell key={stat.label} stat={stat} index={index} />
      ))}
    </section>
  );
}

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const { ref, display } = useCountUp(stat.value, stat.decimals ?? 0);
  return (
    <div className="fpv2-stat fpv2-reveal" style={{ '--d': `${index * 90}ms` } as React.CSSProperties}>
      <p className="fpv2-stat-value">
        {stat.prefix}
        <span ref={ref}>{display}</span>
        {stat.suffix ? <sub>{stat.suffix}</sub> : null}
      </p>
      <p className="fpv2-stat-label">{stat.label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ HDR compare */

function HdrCompare() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(0.5);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSplit(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (event: PointerEvent) => setFromClientX(event.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dragging, setFromClientX]);

  return (
    <section id="hdr" className="fpv2-section">
      <div className="fpv2-shell">
        <div className="fpv2-reveal">
          <p className="fpv2-eyebrow">HDR and color</p>
          <h2 className="fpv2-title" style={{ marginTop: '1rem', maxWidth: '22ch' }}>
            HDR10 and HLG, without the washed-out look.
          </h2>
          <p className="fpv2-lede" style={{ marginTop: '1.25rem' }}>
            PQ and HLG content presents natively when the display is HDR-active, and tone-maps to SDR
            when it is not. Full-range PQ files, including exports from tools such as Topaz Video AI,
            open through the HDR path instead of failing. Drag the divider.
          </p>
        </div>

        <div
          ref={frameRef}
          className="fpv2-compare fpv2-reveal"
          style={{ marginTop: '3rem' }}
          role="slider"
          tabIndex={0}
          aria-label="Compare naive HDR playback against FastPlay tone mapping"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split * 100)}
          onPointerDown={(event) => {
            setDragging(true);
            setFromClientX(event.clientX);
          }}
          onKeyDown={(event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            setSplit((value) => Math.min(1, Math.max(0, value + (event.key === 'ArrowRight' ? 0.06 : -0.06))));
          }}
        >
          <img
            className="fpv2-compare-flat"
            src="/assets/FastPlay/fastplay-demo-poster.jpg"
            alt="HDR footage played without tone mapping, appearing flat and washed out"
            draggable={false}
          />
          <div
            className="fpv2-compare-clip"
            style={{ clipPath: `inset(0 ${(1 - split) * 100}% 0 0)` }}
          >
            <img
              src="/assets/FastPlay/fastplay-demo-poster.jpg"
              alt="The same footage tone-mapped by FastPlay, with contrast and saturation preserved"
              draggable={false}
            />
          </div>
          <div className="fpv2-compare-handle" style={{ left: `${split * 100}%` }} aria-hidden="true">
            <span className="fpv2-compare-knob">
              <Move size={17} />
            </span>
          </div>
          <span className="fpv2-compare-tag" style={{ left: '1rem' }}>
            FastPlay
          </span>
          <span className="fpv2-compare-tag" style={{ right: '1rem' }}>
            No tone mapping
          </span>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--ink-faint)' }}>
          Illustrative comparison. HDR output on your machine depends on the display and the Windows
          HDR setting.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ capabilities */

const CAPABILITIES = [
  {
    Icon: Zap,
    title: 'Instant first frame',
    body: 'Files open and reach the first visible frame as fast as the hardware allows, with hardware decode keeping video on the GPU from decode to present.',
  },
  {
    Icon: Gauge,
    title: '120 fps pacing',
    body: 'A smoothly advancing audio clock lets high-frame-rate video present at full cadence instead of losing one frame in six between hardware counter updates.',
  },
  {
    Icon: Sun,
    title: 'Native HDR or SDR',
    body: 'HDR10 (PQ) and HLG present natively on HDR-active displays and tone-map otherwise, with safety checks for unsupported color combinations.',
  },
  {
    Icon: Layers,
    title: 'Queue without playlists',
    body: 'Drop several files or a folder to build a temporary queue. Step through it manually or let end-of-file advance to the next item. Nothing is saved as a library.',
  },
  {
    Icon: Clapperboard,
    title: 'Recent files and resume',
    body: 'Reopen recent files from the overlay and pick each one back up near the last watched position, without a persistent media database.',
  },
  {
    Icon: Maximize2,
    title: 'Viewing controls',
    body: 'Cursor-centered zoom, drag-to-pan, 90-degree rotation, borderless fullscreen, playback speed control, and in/out point looping.',
  },
  {
    Icon: ShieldCheck,
    title: 'Robust on real Windows',
    body: 'Handles resize, DPI changes, audio endpoint churn, and device recovery, falling back to software decode while keeping the D3D11 present path.',
  },
  {
    Icon: Music,
    title: 'Audio files too',
    body: 'MP3, FLAC, WAV, OGG, AAC, M4A, and OPUS play with the same fast open, responsive seek, and queue behavior as video.',
  },
  {
    Icon: Cpu,
    title: 'Written in Rust',
    body: 'A single crate with one coordinator, bounded queues, and an explicit state machine. One executable, no runtime to install alongside it.',
  },
];

function Capabilities() {
  return (
    <section id="capabilities" className="fpv2-section">
      <div className="fpv2-shell">
        <div className="fpv2-reveal">
          <p className="fpv2-eyebrow">Capabilities</p>
          <h2 className="fpv2-title" style={{ marginTop: '1rem', maxWidth: '20ch' }}>
            Everything it does. Nothing it does not.
          </h2>
        </div>
        <div className="fpv2-features">
          {CAPABILITIES.map((item, index) => (
            <article
              key={item.title}
              className="fpv2-feature fpv2-reveal"
              style={{ '--d': `${(index % 3) * 90}ms` } as React.CSSProperties}
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
              }}
            >
              <span className="fpv2-feature-icon">
                <item.Icon size={19} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ formats */

const FORMATS = [
  '.mp4',
  '.mkv',
  '.mov',
  '.avi',
  '.webm',
  '.m4v',
  '.wmv',
  '.mp3',
  '.flac',
  '.wav',
  '.ogg',
  '.m4a',
  '.opus',
  '.srt subtitles',
];

function Formats() {
  return (
    <section className="fpv2-section" style={{ paddingBlock: 'clamp(3rem, 7vh, 5rem)' }}>
      <div className="fpv2-shell fpv2-reveal" style={{ textAlign: 'center' }}>
        <p className="fpv2-eyebrow">Format support</p>
        <h2 className="fpv2-title" style={{ marginTop: '0.9rem', fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)' }}>
          FFmpeg-backed, for the files you actually have.
        </h2>
      </div>
      <div className="fpv2-marquee fpv2-reveal" style={{ marginTop: '2.25rem' }} aria-hidden="true">
        <div className="fpv2-marquee-row">
          {[...FORMATS, ...FORMATS].map((format, index) => (
            <span key={`${format}-${index}`} className="fpv2-chip">
              {format}
            </span>
          ))}
        </div>
      </div>
      <p className="fpv2-shell" style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.82rem', color: 'var(--ink-faint)' }}>
        Subtitles load from sidecar .srt files placed next to the media. Embedded subtitle tracks and
        other subtitle formats are not read.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ controls */

const CONTROLS: Array<[string, string]> = [
  ['Space', 'Pause, resume, replay'],
  ['Left / Right', 'Seek 5s, hold for 15s steps'],
  ['Ctrl+F / Ctrl+B', 'One frame forward or backward'],
  ['Ctrl+O', 'Open media file'],
  ['Ctrl+Shift+O', 'Recent files overlay'],
  ['PageUp / PageDown', 'Previous or next file in the queue'],
  ['Ctrl+S', 'Save screenshot'],
  ['[ / ]', 'Decrease or increase playback speed'],
  ['\\', 'Reset speed to 1x'],
  ['I / O', 'Set in-point or out-point'],
  ['Shift+I / Shift+O', 'Clear in-point or out-point'],
  ['R', 'Toggle loop range or auto-replay'],
  ['S', 'Toggle subtitles'],
  ['Mouse wheel', 'Volume'],
  ['Ctrl+Mouse wheel', 'Zoom at cursor'],
  ['Ctrl+Drag', 'Pan when zoomed'],
  ['Ctrl+0', 'Reset zoom, pan, rotation'],
  ['Ctrl+R / Ctrl+E', 'Rotate clockwise or counter-clockwise'],
  ['Ctrl+H', 'Borderless fullscreen'],
  ['Esc', 'Exit fullscreen'],
  ['Ctrl+W', 'Fit window to video'],
  ['Ctrl+Q', 'Half-resolution window'],
  ['Backspace', 'Cancel scrub'],
  ['H (hold)', 'Show controls overlay'],
  ['`', 'Toggle hardware or software decode in the title bar'],
];

function Controls() {
  const [lit, setLit] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || prefersReducedMotion()) return;
    let timer = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          timer = window.setInterval(() => {
            setLit(Math.floor(Math.random() * CONTROLS.length));
          }, 700);
        } else {
          window.clearInterval(timer);
          setLit(-1);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section id="controls" className="fpv2-section" ref={sectionRef}>
      <div className="fpv2-shell">
        <div className="fpv2-reveal">
          <p className="fpv2-eyebrow">Keyboard first</p>
          <h2 className="fpv2-title" style={{ marginTop: '1rem', maxWidth: '18ch' }}>
            Every action has a keybind.
          </h2>
          <p className="fpv2-lede" style={{ marginTop: '1.25rem' }}>
            Hold H inside the player to bring up the full overlay. Nothing here is buried in a
            preferences tree.
          </p>
        </div>
        <div className="fpv2-controls-wrapper fpv2-reveal">
          <table className="fpv2-controls-table">
            <thead>
              <tr>
                <th scope="col">Key</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {CONTROLS.map(([key, action], index) => (
                <tr key={key} className={lit === index ? 'is-lit' : undefined}>
                  <td className="fpv2-controls-key">{key}</td>
                  <td className="fpv2-controls-action">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ vs VLC + specs */

const GOOD_FIT = [
  'A fast Windows player for local files',
  'Playback without a media-library workflow',
  'Smooth scrubbing and responsive seek',
  'Resume-friendly everyday viewing',
  'Hardware-accelerated playback on Windows',
  'Simple controls without plugin clutter',
];

const VLC_BETTER = [
  'Advanced codec tooling',
  'Network streams',
  'Disc playback',
  'Filters and plugins',
  'Cross-platform support',
  'Deep media troubleshooting',
];

const SPECS: Array<[string, string]> = [
  ['Version', `v${VERSION}`],
  ['Platform', 'Windows 10 and later, 64-bit'],
  ['License', 'MIT License, free and open source'],
  ['Technology', 'Rust, FFmpeg, D3D11, DXGI, WASAPI'],
  ['Video path', 'FFmpeg demux, D3D11 hardware decode, GPU surface, DXGI flip-model present'],
  ['Audio path', 'FFmpeg decode, WASAPI shared-mode sink'],
  ['Fallback path', 'FFmpeg demux, software decode, D3D11 upload, DXGI present'],
  ['Subtitles', 'External sidecar .srt only, minimal styling'],
  ['Not designed for', 'Network streaming, disc playback, broadcast workflows, plugin ecosystems'],
];

function Positioning() {
  return (
    <section id="vlc" className="fpv2-section">
      <div className="fpv2-shell">
        <div className="fpv2-reveal">
          <p className="fpv2-eyebrow">Where it fits</p>
          <h2 className="fpv2-title" style={{ marginTop: '1rem', maxWidth: '22ch' }}>
            A smaller player, on purpose.
          </h2>
          <p className="fpv2-lede" style={{ marginTop: '1.25rem' }}>
            FastPlay is not trying to out-feature VLC. It covers the case most people open a player
            for, and it says no to the rest.
          </p>
        </div>

        <div className="fpv2-split">
          <article className="fpv2-split-card is-accent fpv2-reveal">
            <h3>Reach for FastPlay when you want</h3>
            <ul>
              {GOOD_FIT.map((item) => (
                <li key={item}>
                  <ArrowRight size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="fpv2-split-card fpv2-reveal" style={{ '--d': '110ms' } as React.CSSProperties}>
            <h3>Keep VLC when you need</h3>
            <ul>
              {VLC_BETTER.map((item) => (
                <li key={item}>
                  <ArrowRight size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <dl className="fpv2-specs fpv2-reveal">
          {SPECS.map(([label, value]) => (
            <div className="fpv2-spec-row" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <p style={{ marginTop: '1.5rem' }}>
          <a
            className="fpv2-btn fpv2-btn-ghost fpv2-btn-sm"
            href={RELEASE_NOTES_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the v{VERSION} release notes
            <ArrowUpRight size={15} />
          </a>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ guides */

function Guides() {
  return (
    <section id="guides" className="fpv2-section">
      <div className="fpv2-shell">
        <div className="fpv2-reveal">
          <p className="fpv2-eyebrow">Guides</p>
          <h2 className="fpv2-title" style={{ marginTop: '1rem', maxWidth: '20ch' }}>
            Fix Windows playback problems.
          </h2>
          <p className="fpv2-lede" style={{ marginTop: '1.25rem' }}>
            HDR that looks washed out, MOV files that will not open, missing HEVC codecs, playback
            that stutters, and reviewing long footage faster.
          </p>
        </div>
        <div className="fpv2-guides">
          {guides.map((guide, index) => (
            <a
              key={guide.slug}
              className="fpv2-guide fpv2-reveal"
              href={guidePath(guide.slug)}
              style={{ '--d': `${(index % 3) * 90}ms` } as React.CSSProperties}
            >
              <p className="fpv2-guide-cat">{guide.category}</p>
              <h3>{guide.shortTitle}</h3>
              <p>{guide.description}</p>
              <span className="fpv2-guide-more">
                Read the guide
                <ArrowRight size={14} />
              </span>
            </a>
          ))}
        </div>
        <p style={{ marginTop: '2rem' }}>
          <a className="fpv2-btn fpv2-btn-ghost fpv2-btn-sm" href="/fastplay/guides">
            Browse all FastPlay guides
            <ArrowUpRight size={15} />
          </a>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ faq */

function Faq() {
  return (
    <section id="faq" className="fpv2-section">
      <div className="fpv2-shell">
        <div className="fpv2-reveal">
          <p className="fpv2-eyebrow">FAQ</p>
          <h2 className="fpv2-title" style={{ marginTop: '1rem' }}>
            Questions, answered.
          </h2>
        </div>
        <div className="fpv2-faq fpv2-reveal">
          {fastPlayFaqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p className="fpv2-faq-body">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

export default function FastPlayV2() {
  const progressRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll();
  useScrollProgress(progressRef);

  return (
    <div className="fpv2">
      <div className="fpv2-progress" ref={progressRef} aria-hidden="true" />
      <Nav />
      <main>
        <Film />
        <StatBand />
        <HdrCompare />
        <Capabilities />
        <Formats />
        <Controls />
        <Positioning />
        <Guides />
        <Faq />

        <section className="fpv2-cta">
          <div className="fpv2-cta-glow" aria-hidden="true" />
          <div className="fpv2-shell fpv2-reveal" style={{ position: 'relative' }}>
            <p className="fpv2-eyebrow">Free, forever</p>
            <h2 className="fpv2-display" style={{ marginTop: '1.25rem' }}>
              Stop waiting on
              <br />
              your video player.
            </h2>
            <div className="fpv2-cta-actions">
              <a
                className="fpv2-btn fpv2-btn-primary"
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick('fastplay', 'download_clicked', 'final', DOWNLOAD_URL)}
              >
                <Download size={17} />
                Download FastPlay v{VERSION}
              </a>
              <a className="fpv2-btn fpv2-btn-ghost" href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
                <Github size={17} />
                GitHub repository
              </a>
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--ink-faint)' }}>
              MSI installer. Windows 10 and later, 64-bit. MIT License.
            </p>
          </div>
        </section>
      </main>

      <footer className="fpv2-footer">
        <div className="fpv2-shell">
          <div className="fpv2-footer-links">
            <a href="/fastplay">FastPlay</a>
            <a href="/fastplay/guides">Guides</a>
            <a href="/fast-series">Fast Series</a>
            <a href="/roadmap">Roadmap</a>
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
              Source on GitHub
            </a>
          </div>
          <p style={{ marginTop: '0.9rem' }}>
            FastPlay by{' '}
            <a href="https://github.com/CalvinSturm" target="_blank" rel="noopener noreferrer">
              Calvin Sturm
            </a>
            . Sturm Technologies LLC. MIT License.
          </p>
        </div>
      </footer>
    </div>
  );
}
