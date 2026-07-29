import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  Cpu,
  Download,
  FileVideo,
  Gauge,
  Github,
  HardDrive,
  Keyboard,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Subtitles,
  Sun,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fastPlayFaqs } from './fastplay-faqs.mjs';
import { guides as fastPlayGuides, guidePath as fastPlayGuidePath } from './fastplay-guides/guides-data';
import { trackCtaClick } from './lib/analytics';
import { useReducedMotion } from './lib/useReducedMotion';
import './fastcast-v2.css';
import './fastplay-v3.css';

const downloadUrl = 'https://github.com/CalvinSturm/FastPlay/releases/download/v0.4.4/fastplay-0.4.4-x86_64.msi';
const latestReleaseUrl = 'https://github.com/CalvinSturm/FastPlay/releases/latest';
const sourceUrl = 'https://github.com/CalvinSturm/FastPlay';
const releaseNotesUrl = 'https://github.com/CalvinSturm/FastPlay/blob/main/docs/release-notes-v0.4.4.md';

type StoryChapter = {
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  Icon: LucideIcon;
  focus: CSSProperties;
};

const storyChapters: StoryChapter[] = [
  {
    label: 'Open',
    eyebrow: '01 · First frame',
    title: 'Drop in a file. Start watching.',
    body: 'FastPlay opens local video and audio without asking you to build a library, sign in, or organize anything first.',
    Icon: Play,
    focus: { left: '2%', top: '2%', width: '96%', height: '10%' },
  },
  {
    label: 'Seek',
    eyebrow: '02 · Responsive timeline',
    title: 'Move through footage at thought speed.',
    body: 'Stale decode work is dropped during a seek, so the frame you asked for does not wait behind frames you no longer need.',
    Icon: Zap,
    focus: { left: '5%', top: '76%', width: '90%', height: '10%' },
  },
  {
    label: 'Review',
    eyebrow: '03 · Keyboard first',
    title: 'Frame-step, loop, rotate, inspect.',
    body: 'Set in and out points, change speed, save screenshots, zoom at the cursor, and keep the controls one keypress away.',
    Icon: Keyboard,
    focus: { left: '8%', top: '62%', width: '84%', height: '26%' },
  },
  {
    label: 'Resume',
    eyebrow: '04 · Pick up instantly',
    title: 'Leave now. Continue right there.',
    body: 'Recent files remember their last position locally, giving you resume-friendly playback without a permanent media-library workflow.',
    Icon: RotateCcw,
    focus: { left: '8%', top: '16%', width: '84%', height: '70%' },
  },
];

const capabilityCards = [
  { metric: '120 fps', label: 'full-cadence playback on high-refresh displays', Icon: Gauge },
  { metric: 'HDR10', label: 'native HDR output or careful SDR tone mapping', Icon: Sun },
  { metric: 'D3D11', label: 'hardware decode with a GPU-resident video path', Icon: Cpu },
  { metric: '0 accounts', label: 'local files, local resume, no media cloud', Icon: HardDrive },
];

const CHAPTER_FADE = 0.18;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function trackDownload(location: string) {
  trackCtaClick('fastplay', 'download_clicked', location, downloadUrl);
}

function AmbientVideo({
  className,
  src,
  poster,
  allowMotion,
}: {
  className?: string;
  src: string;
  poster: string;
  allowMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (allowMotion) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [allowMotion]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      autoPlay={allowMotion}
      muted
      loop={allowMotion}
      playsInline
      preload="metadata"
    />
  );
}

function usePageProgress(progressRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progressRef.current?.style.setProperty('--page-progress', clamp(window.scrollY / max).toFixed(4));
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [progressRef]);
}

function useHeroProgress(heroRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = heroRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = node.offsetHeight - window.innerHeight;
      const progress = travel <= 1 ? 0 : clamp(-rect.top / travel);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.style.setProperty('--hero-progress', progress.toFixed(4));
      node.style.setProperty('--hero-scale', (0.66 + eased * 0.34).toFixed(4));
      node.style.setProperty('--hero-y', `${(1 - eased) * 10}vh`);
      node.style.setProperty('--hero-rotate', `${(1 - eased) * -2}deg`);
      node.style.setProperty('--hero-copy-opacity', clamp(1 - progress * 1.7).toFixed(4));
      node.style.setProperty('--hero-copy-y', `${progress * -7}vh`);
      node.style.setProperty('--hero-screen-glow', (0.3 + eased * 0.7).toFixed(4));
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [heroRef]);
}

function useStoryProgress(
  storyRef: React.RefObject<HTMLElement | null>,
  setActiveChapter: React.Dispatch<React.SetStateAction<number>>,
) {
  useEffect(() => {
    let frame = 0;
    let currentChapter = -1;
    const update = () => {
      frame = 0;
      const node = storyRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = node.offsetHeight - window.innerHeight;
      const progress = travel <= 1 ? 0 : clamp(-rect.top / travel);
      const phase = progress * storyChapters.length;
      const chapter = Math.min(storyChapters.length - 1, Math.floor(phase));
      const local = clamp(phase - chapter);
      node.style.setProperty('--story-screen-scale', (0.92 + Math.sin(progress * Math.PI) * 0.045).toFixed(4));
      const fade = local > 1 - CHAPTER_FADE ? (local - (1 - CHAPTER_FADE)) / CHAPTER_FADE : 0;
      node.querySelectorAll<HTMLElement>('[data-story-panel]').forEach((panel, index) => {
        let opacity = 0;
        let offset = 24;
        if (index === chapter) {
          opacity = clamp(1 - fade * 2);
          offset = fade * -24;
        } else if (index === chapter + 1) {
          opacity = clamp(fade * 2 - 1);
          offset = (1 - fade) * 24;
        }
        panel.style.setProperty('--panel-opacity', opacity.toFixed(3));
        panel.style.setProperty('--panel-y', `${offset}px`);
      });
      if (chapter !== currentChapter) {
        currentChapter = chapter;
        setActiveChapter(chapter);
      }
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [setActiveChapter, storyRef]);
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function StoryScreen({ activeChapter, allowMotion }: { activeChapter: number; allowMotion: boolean }) {
  return (
    <div className="fastcast-v2-story-device" aria-hidden="true">
      <div className="fastcast-v2-story-halo" />
      <div className="fastcast-v2-screen-frame">
        <AmbientVideo
          className="fastcast-v2-screen-shot"
          src="/assets/FastPlay/fastplay-demo-scrub.mp4"
          poster="/assets/FastPlay/fastplay-demo-poster.jpg"
          allowMotion={allowMotion}
        />
        <div className="fastcast-v2-screen-focus" style={storyChapters[activeChapter].focus} />
      </div>
    </div>
  );
}

export function FastPlayV3() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const isStatic = useReducedMotion();

  usePageProgress(pageRef);
  useHeroProgress(heroRef);
  useStoryProgress(storyRef, setActiveChapter);
  useRevealOnScroll();

  const jumpToChapter = (index: number) => {
    const node = storyRef.current;
    if (!node) return;
    const travel = Math.max(0, node.offsetHeight - window.innerHeight);
    if (travel <= 1 || isStatic) {
      setActiveChapter(index);
      return;
    }
    window.scrollTo({ top: node.offsetTop + travel * ((index + 0.02) / storyChapters.length), behavior: 'smooth' });
  };

  return (
    <div className="fastcast-v2 fastplay-v3" ref={pageRef}>
      <a className="fastcast-v2-skip" href="#fastplay-main">Skip to main content</a>
      <div className="fastcast-v2-progress" aria-hidden="true"><span /></div>

      <header className="fastcast-v2-nav">
        <a className="fastcast-v2-brand" href="#fastplay-main" aria-label="FastPlay home">
          <img src="/assets/FastPlay/fastplay.png" alt="" width="34" height="34" />
          <span>FastPlay</span>
          <span className="fastcast-v2-beta">Free + open source</span>
        </a>
        <nav aria-label="FastPlay page sections">
          <a href="#story">Overview</a>
          <a href="#performance">Performance</a>
          <a href="#guides">Guides</a>
          <a href="#faq">FAQ</a>
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
        <a className="fastcast-v2-nav-cta" href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('nav')}>
          Download <Download size={16} />
        </a>
      </header>

      <main id="fastplay-main">
        <section className="fastcast-v2-hero-track" ref={heroRef} aria-labelledby="fastplay-v3-title">
          <div className="fastcast-v2-hero-sticky">
            <div className="fastcast-v2-ambient" aria-hidden="true">
              <span className="fastcast-v2-orbit fastcast-v2-orbit-a" />
              <span className="fastcast-v2-orbit fastcast-v2-orbit-b" />
              <span className="fastcast-v2-orbit fastcast-v2-orbit-c" />
            </div>
            <div className="fastcast-v2-hero-copy">
              <p className="fastcast-v2-kicker"><span /> Native Windows playback</p>
              <h1 id="fastplay-v3-title">
                <span>A fast Windows</span>{' '}
                <span>video player</span>{' '}
                <span>for local files</span>
              </h1>
              <p>Fast startup. Responsive seeking. Hardware-accelerated playback. FastPlay stays out of the way so the footage can take over.</p>
              <div className="fastcast-v2-hero-actions">
                <a className="fastcast-v2-button fastcast-v2-button-primary" href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('hero')}>
                  Download for Windows <ArrowRight size={18} />
                </a>
                <a className="fastcast-v2-button fastcast-v2-button-ghost" href="#story">
                  See how it moves <ChevronDown size={18} />
                </a>
              </div>
              <p className="fastcast-v2-meta">v0.4.4 · Windows 10+ x64 · MSI · MIT License</p>
            </div>
            <div className="fastcast-v2-hero-product" aria-hidden="true">
              <div className="fastcast-v2-product-glow" />
              <AmbientVideo
                src="/assets/FastPlay/fastplay-demo.mp4"
                poster="/assets/FastPlay/fastplay-demo-poster.jpg"
                allowMotion={!isStatic}
              />
            </div>
            <div className="fastcast-v2-scroll-cue" aria-hidden="true"><span>Scroll to enter FastPlay</span><i /></div>
          </div>
        </section>

        <section className="fastcast-v2-intro" aria-label="FastPlay product summary">
          <div className="fastcast-v2-shell">
            <p className="fastcast-v2-section-kicker" data-reveal>Open. Seek. Keep moving.</p>
            <h2 data-reveal>Playback with no<br />library-shaped detour.</h2>
            <p className="fastcast-v2-intro-copy" data-reveal>Open a local file, move to the exact frame you need, and keep reviewing. No account, plugin maze, or permanent media catalog between you and the video.</p>
          </div>
        </section>

        <section id="story" className="fastcast-v2-story-track" ref={storyRef} aria-labelledby="story-title">
          <div className="fastcast-v2-story-sticky">
            <div className="fastcast-v2-story-grid fastcast-v2-shell">
              <div className="fastcast-v2-story-copy">
                <p className="fastcast-v2-section-kicker">The FastPlay flow</p>
                <h2 id="story-title" className="sr-only">The FastPlay playback and review workflow</h2>
                <div className="fastcast-v2-story-panels">
                  {storyChapters.map((chapter, index) => (
                    <article key={chapter.label} data-story-panel className={index === activeChapter ? 'is-active' : undefined} aria-hidden={!isStatic && index !== activeChapter}>
                      <chapter.Icon size={26} />
                      <p>{chapter.eyebrow}</p>
                      <h3>{chapter.title}</h3>
                      <div>{chapter.body}</div>
                    </article>
                  ))}
                </div>
              </div>
              <StoryScreen activeChapter={activeChapter} allowMotion={!isStatic} />
            </div>
            <div className="fastcast-v2-story-tabs fastcast-v2-shell" aria-label="FastPlay workflow chapters">
              {storyChapters.map((chapter, index) => (
                <button key={chapter.label} type="button" className={index === activeChapter ? 'is-active' : undefined} onClick={() => jumpToChapter(index)} aria-current={index === activeChapter ? 'step' : undefined}>
                  <span>{String(index + 1).padStart(2, '0')}</span>{chapter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="fastcast-v2-capabilities">
          <div className="fastcast-v2-shell">
            <div className="fastcast-v2-capability-heading" data-reveal>
              <p className="fastcast-v2-section-kicker">Lightweight app. Serious playback path.</p>
              <h2>Built for the frame in front of you.</h2>
            </div>
            <div className="fastcast-v2-capability-grid">
              {capabilityCards.map((card, index) => (
                <article key={card.metric} data-reveal style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}>
                  <card.Icon size={22} /><strong>{card.metric}</strong><p>{card.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="performance" className="fastcast-v2-layouts">
          <div className="fastcast-v2-layouts-sticky fastcast-v2-shell">
            <div className="fastcast-v2-layouts-copy" data-reveal>
              <p className="fastcast-v2-section-kicker">GPU-resident playback</p>
              <h2>Decode to display.<br />No scenic route.</h2>
              <p>FFmpeg feeds D3D11 hardware decode, video stays on the GPU, and DXGI presents through a flip-model swap chain. A software fallback is ready when hardware decode is not.</p>
              <div className="fastcast-v2-key-row"><span><kbd>D3D11</kbd><kbd>DXGI</kbd><kbd>WASAPI</kbd></span><span>one focused native stack</span></div>
            </div>
            <div className="fastcast-v2-layout-stack" aria-label="FastPlay playback architecture" data-reveal>
              <div className="fastcast-v2-layout-card fastcast-v2-layout-screen"><span>D3D11 decode</span></div>
              <div className="fastcast-v2-layout-card fastcast-v2-layout-camera"><span>GPU surface</span></div>
              <div className="fastcast-v2-layout-card fastcast-v2-layout-pip"><span>DXGI present</span><i /></div>
              <div className="fastcast-v2-layout-card fastcast-v2-layout-split"><span>WASAPI audio</span><i /></div>
            </div>
          </div>
        </section>

        <section id="privacy" className="fastcast-v2-privacy">
          <div className="fastcast-v2-shell fastcast-v2-privacy-grid">
            <div className="fastcast-v2-privacy-copy" data-reveal>
              <p className="fastcast-v2-section-kicker">Local files stay local</p>
              <h2>Your player does not need a cloud.</h2>
              <p>FastPlay opens media from your machine and keeps its lightweight resume state there. There is no account, hosted library, or upload step.</p>
              <ul>
                <li><Check size={17} /> No account or subscription</li>
                <li><Check size={17} /> No permanent media-library workflow</li>
                <li><Check size={17} /> Free and open source under the MIT License</li>
              </ul>
            </div>
            <div className="fastcast-v2-privacy-visual" data-reveal aria-hidden="true">
              <div className="fastcast-v2-lock-orbit">
                <span><FileVideo size={19} /></span><span><Gauge size={19} /></span><span><Subtitles size={19} /></span><span><Keyboard size={19} /></span>
                <div><ShieldCheck size={62} /></div>
              </div>
              <p>Local playback boundary</p>
            </div>
          </div>
        </section>

        <section className="fastcast-v2-beta-section">
          <div className="fastcast-v2-shell">
            <div className="fastcast-v2-beta-heading" data-reveal>
              <p className="fastcast-v2-section-kicker">Current release · v0.4.4</p>
              <h2>Full-range PQ. Full-cadence 120 fps.</h2>
            </div>
            <div className="fastcast-v2-plan-grid">
              <article data-reveal>
                <p className="fastcast-v2-plan-name">Playback correctness</p>
                <h3>HDR that lands right.</h3>
                <p>Genuine full-range PQ video now opens through the HDR path, presents natively on HDR displays, and tone-maps for SDR when needed.</p>
                <ul>
                  <li><Check size={16} /> Full-range PQ and BT.2020 signaling</li>
                  <li><Check size={16} /> Native HDR or SDR tone mapping</li>
                  <li><Check size={16} /> HLG and HDR10 playback paths</li>
                </ul>
                <a href={releaseNotesUrl} target="_blank" rel="noopener noreferrer">Read release notes <ArrowUpRight size={17} /></a>
              </article>
              <article className="fastcast-v2-plan-pro" data-reveal>
                <span className="fastcast-v2-plan-badge"><Sparkles size={14} /> Free forever</span>
                <p className="fastcast-v2-plan-name">High frame rate</p>
                <h3>120 fps means 120 fps.</h3>
                <p>A smoothly advancing audio clock lets high-frame-rate video present at full cadence on a high-refresh display.</p>
                <ul>
                  <li><Check size={16} /> Full-cadence 120 fps presentation</li>
                  <li><Check size={16} /> Hardware and software decode paths</li>
                  <li><Check size={16} /> Source available on GitHub</li>
                </ul>
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer">Explore the source <ArrowUpRight size={17} /></a>
              </article>
            </div>
            <p className="fastcast-v2-beta-note" data-reveal>FastPlay is free, open source, and built for Windows 10 or later on 64-bit hardware.</p>
          </div>
        </section>

        <section id="guides" className="fastcast-v2-guides">
          <div className="fastcast-v2-shell">
            <div className="fastcast-v2-guides-heading" data-reveal>
              <div><p className="fastcast-v2-section-kicker">FastPlay guides</p><h2>Playback with fewer surprises.</h2></div>
              <a href="/fastplay/guides">View all guides <ArrowUpRight size={17} /></a>
            </div>
            <div className="fastcast-v2-guide-grid">
              {fastPlayGuides.slice(0, 6).map((guide, index) => (
                <a key={guide.slug} href={fastPlayGuidePath(guide.slug)} data-reveal style={{ '--reveal-delay': `${index * 60}ms` } as CSSProperties}>
                  <span>{guide.category}</span><h3>{guide.shortTitle}</h3><p>{guide.description}</p><i><ArrowRight size={18} /></i>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="fastcast-v2-faq">
          <div className="fastcast-v2-shell">
            <div className="fastcast-v2-faq-heading" data-reveal><p className="fastcast-v2-section-kicker">FAQ</p><h2>FastPlay questions.</h2></div>
            <div className="fastcast-v2-faq-list" data-reveal>
              {fastPlayFaqs.map(({ question, answer }) => (
                <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="fastcast-v2-final">
          <div className="fastcast-v2-final-orb" aria-hidden="true" />
          <div className="fastcast-v2-shell" data-reveal>
            <img src="/assets/FastPlay/fastplay.png" alt="" width="68" height="68" />
            <p className="fastcast-v2-section-kicker">Ready when you are</p>
            <h2>Open fast.<br />Stay in the moment.</h2>
            <p>Download FastPlay v0.4.4 for 64-bit Windows 10 or later.</p>
            <div>
              <a className="fastcast-v2-button fastcast-v2-button-primary" href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('final')}><Download size={18} /> Download FastPlay</a>
              <a className="fastcast-v2-button fastcast-v2-button-ghost" href={sourceUrl} target="_blank" rel="noopener noreferrer"><Github size={18} /> View source</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="fastcast-v2-footer">
        <div className="fastcast-v2-shell">
          <p><strong>FastPlay</strong> · Fast, lightweight local video playback for Windows.</p>
          <nav aria-label="FastPlay footer links"><a href="/fastplay/guides">Guides</a><a href="/roadmap">Roadmap</a><a href={latestReleaseUrl} target="_blank" rel="noopener noreferrer">Latest release</a><a href={sourceUrl} target="_blank" rel="noopener noreferrer">GitHub</a></nav>
          <p>Free and open source under the MIT License.</p>
        </div>
      </footer>

      <div className="fastcast-v2-floating-cta">
        <span><CircleDot size={14} /> FastPlay <b>v0.4.4</b></span>
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('floating')}>Download <Download size={14} /></a>
      </div>
    </div>
  );
}
