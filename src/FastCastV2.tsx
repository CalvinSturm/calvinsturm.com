import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  ChevronDown,
  CircleDot,
  Download,
  Github,
  LockKeyhole,
  Mic,
  MonitorUp,
  Radio,
  ShieldCheck,
  Sparkles,
  Video,
  Webcam,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { guides as fastCastGuides, guidePath as fastCastGuidePath, fastCastProCheckoutUrl } from './fastcast-guides/guides-data';
import { trackCtaClick } from './lib/analytics';
import './fastcast-v2.css';

const downloadUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases/download/v0.5.1/FastCast-0.5.1-win-x64.zip';
const latestReleaseUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases/latest';
const allReleasesUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases';

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
    label: 'Capture',
    eyebrow: '01 · Choose the picture',
    title: 'Your screen. Your window. Ready.',
    body: 'Pick a monitor or a single window, set the frame rate, and choose where the finished MP4 should land.',
    Icon: MonitorUp,
    focus: { left: '3.25%', top: '66.25%', width: '29.9%', height: '20.7%' },
  },
  {
    label: 'Audio',
    eyebrow: '02 · Build the mix',
    title: 'Desktop, mic, and camera together.',
    body: 'Capture system audio, add your microphone, and bring in a webcam without assembling a scene graph first.',
    Icon: AudioLines,
    focus: { left: '5.45%', top: '77.15%', width: '25.45%', height: '6.7%' },
  },
  {
    label: 'Live',
    eyebrow: '03 · Record or go live',
    title: 'One setup. Two destinations.',
    body: 'Save a local MP4 or send the same focused setup to YouTube, Twitch, Kick, or a custom RTMP/RTMPS endpoint.',
    Icon: Radio,
    focus: { left: '34.7%', top: '66.25%', width: '30%', height: '20.7%' },
  },
  {
    label: 'Control',
    eyebrow: '04 · Start with confidence',
    title: 'Recording controls stay close.',
    body: 'Start a local recording or go live from one command bar, with the current FastCast plan and upgrade path always visible.',
    Icon: CircleDot,
    focus: { left: '3.25%', top: '88.35%', width: '93.1%', height: '8.85%' },
  },
];

// These mirror the FAQPage JSON-LD in fastcast.html one for one. Structured
// data has to match content that is actually on the page, so edit both together.
const fastCastFaqs = [
  {
    question: 'What is FastCast?',
    answer:
      'FastCast is a native Windows screen recorder and live streaming app for local MP4 recording, monitor or window capture, desktop audio, microphone capture, webcam overlay, and RTMP/RTMPS streaming.',
  },
  {
    question: 'Is FastCast an OBS alternative?',
    answer:
      'FastCast is a simpler OBS alternative for focused single-scene recording and streaming workflows. OBS is still better for advanced scenes, filters, plugins, multistreaming, or complex broadcast production.',
  },
  {
    question: 'Does FastCast save stream keys?',
    answer: 'No. Stream keys are not saved to disk.',
  },
  {
    question: 'Is FastCast free?',
    answer:
      'FastCast Free is free during the Open Beta and covers 1080p30 recording and streaming. A one-time FastCast Pro license unlocks 1440p and 4K recording, 60 fps capture, and advanced encoder controls. No subscription and no account.',
  },
  {
    question: 'Is FastCast signed?',
    answer:
      'FastCast is currently unsigned during Open Beta, so Windows SmartScreen may show an Unknown Publisher warning.',
  },
];

const capabilityCards = [
  { metric: '1080p30', label: 'included in FastCast Free', Icon: Video },
  { metric: '4 layouts', label: 'screen, camera, and combined views', Icon: Webcam },
  { metric: 'RTMPS', label: 'secure streaming to custom destinations', Icon: Radio },
  { metric: '0 accounts', label: 'local-first activation and capture', Icon: LockKeyhole },
];

/** Fraction of a chapter's scroll band spent crossfading into the next one. */
const CHAPTER_FADE = 0.18;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function trackDownload(location: string, href = downloadUrl) {
  trackCtaClick('fastcast', 'download_clicked', location, href);
}

function usePageProgress(progressRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = clamp(window.scrollY / max);
      progressRef.current?.style.setProperty('--page-progress', progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

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
      const rawTravel = node.offsetHeight - window.innerHeight;
      const progress = rawTravel <= 1 ? 0 : clamp(-rect.top / rawTravel);
      const eased = 1 - Math.pow(1 - progress, 3);

      node.style.setProperty('--hero-progress', progress.toFixed(4));
      node.style.setProperty('--hero-scale', (0.72 + eased * 0.28).toFixed(4));
      node.style.setProperty('--hero-y', `${(1 - eased) * 9}vh`);
      node.style.setProperty('--hero-rotate', `${(1 - eased) * -2.8}deg`);
      node.style.setProperty('--hero-copy-opacity', clamp(1 - progress * 1.75).toFixed(4));
      node.style.setProperty('--hero-copy-y', `${progress * -7}vh`);
      node.style.setProperty('--hero-screen-glow', (0.25 + eased * 0.75).toFixed(4));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

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
      const rawTravel = node.offsetHeight - window.innerHeight;
      const progress = rawTravel <= 1 ? 0 : clamp(-rect.top / rawTravel);
      const phase = progress * storyChapters.length;
      const chapter = Math.min(storyChapters.length - 1, Math.floor(phase));
      const local = clamp(phase - chapter);

      node.style.setProperty('--story-progress', progress.toFixed(4));
      node.style.setProperty('--chapter-progress', local.toFixed(4));
      node.style.setProperty('--story-screen-scale', (0.92 + Math.sin(progress * Math.PI) * 0.045).toFixed(4));

      // Sequential crossfade rather than a distance falloff: the outgoing
      // panel clears before the incoming one arrives, so two blocks of text
      // never render on top of each other mid-transition.
      const fade =
        local > 1 - CHAPTER_FADE ? (local - (1 - CHAPTER_FADE)) / CHAPTER_FADE : 0;

      const panels = node.querySelectorAll<HTMLElement>('[data-story-panel]');
      panels.forEach((panel, index) => {
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

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function StoryScreen({ activeChapter }: { activeChapter: number }) {
  return (
    <div className="fastcast-v2-story-device" aria-hidden="true">
      <div className="fastcast-v2-story-halo" />
      <div className="fastcast-v2-screen-frame">
        <img
          className="fastcast-v2-screen-shot"
          src="/assets/FastCast/fastcast-default-view.png"
          alt=""
          width="729"
          height="792"
          loading="eager"
        />
        <div
          className="fastcast-v2-screen-focus"
          style={storyChapters[activeChapter].focus}
        />
      </div>
    </div>
  );
}

export function FastCastV2() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  // Under reduced motion every chapter is laid out at once, so none of them
  // should be hidden from assistive tech.
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    setIsStatic(prefersReducedMotion());
  }, []);

  usePageProgress(pageRef);
  useHeroProgress(heroRef);
  useStoryProgress(storyRef, setActiveChapter);
  useRevealOnScroll();

  const jumpToChapter = (index: number) => {
    const node = storyRef.current;
    if (!node) return;
    const travel = Math.max(0, node.offsetHeight - window.innerHeight);
    if (travel <= 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveChapter(index);
      return;
    }
    const target = node.offsetTop + travel * ((index + 0.02) / storyChapters.length);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div className="fastcast-v2" ref={pageRef}>
      <a className="fastcast-v2-skip" href="#fastcast-main">Skip to main content</a>
      <div className="fastcast-v2-progress" aria-hidden="true"><span /></div>

      <header className="fastcast-v2-nav">
        <a className="fastcast-v2-brand" href="#fastcast-main" aria-label="FastCast home">
          <img src="/assets/FastCast/FastCast_Icon.png" alt="" width="34" height="34" />
          <span>FastCast</span>
          <span className="fastcast-v2-beta">Open Beta</span>
        </a>
        <nav aria-label="FastCast page sections">
          <a href="#story">Overview</a>
          <a href="#privacy">Privacy</a>
          <a href="#guides">Guides</a>
          <a href="#faq">FAQ</a>
          <a href={latestReleaseUrl} target="_blank" rel="noopener noreferrer">Release notes</a>
        </nav>
        <a
          className="fastcast-v2-nav-cta"
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDownload('nav')}
        >
          Download
          <Download size={16} />
        </a>
      </header>

      <main id="fastcast-main">
        <section className="fastcast-v2-hero-track" ref={heroRef} aria-labelledby="fastcast-v2-title">
          <div className="fastcast-v2-hero-sticky">
            <div className="fastcast-v2-ambient" aria-hidden="true">
              <span className="fastcast-v2-orbit fastcast-v2-orbit-a" />
              <span className="fastcast-v2-orbit fastcast-v2-orbit-b" />
              <span className="fastcast-v2-orbit fastcast-v2-orbit-c" />
            </div>

            <div className="fastcast-v2-hero-copy">
              <p className="fastcast-v2-kicker"><span /> Native Windows capture</p>
              {/* Must stay word-for-word identical to the fallback <h1> in
                  fastcast.html so a non-JS crawl and a rendered crawl agree. */}
              <h1 id="fastcast-v2-title">
                Record or stream without <br />setting up OBS scenes
              </h1>
              <p>
                A focused screen recorder for local MP4 capture, webcam, desktop and microphone audio,
                and RTMP/RTMPS livestreaming. No OBS scenes to build first.
              </p>
              <div className="fastcast-v2-hero-actions">
                <a
                  className="fastcast-v2-button fastcast-v2-button-primary"
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDownload('hero')}
                >
                  Download for Windows
                  <ArrowRight size={18} />
                </a>
                <a className="fastcast-v2-button fastcast-v2-button-ghost" href="#story">
                  See how it works
                  <ChevronDown size={18} />
                </a>
              </div>
              <p className="fastcast-v2-meta">v0.5.1 · Windows 10/11 x64 · Portable ZIP · Free version available</p>
            </div>

            <div className="fastcast-v2-hero-product" aria-hidden="true">
              <div className="fastcast-v2-product-glow" />
              <img
                src="/assets/FastCast/fastcast-default-view.png"
                alt=""
                width="729"
                height="792"
                fetchPriority="high"
              />
            </div>

            <div className="fastcast-v2-scroll-cue" aria-hidden="true">
              <span>Scroll to enter FastCast</span>
              <i />
            </div>
          </div>
        </section>

        <section className="fastcast-v2-intro" aria-label="FastCast product summary">
          <div className="fastcast-v2-shell">
            <p className="fastcast-v2-section-kicker" data-reveal>One focused capture path</p>
            <h2 data-reveal>From desktop to destination<br />without the scene-building detour.</h2>
            <p className="fastcast-v2-intro-copy" data-reveal>
              Choose what to capture, mix the sound, add an optional camera, then record locally or go live.
              The interface keeps the whole setup visible instead of hiding it behind layers of panels.
            </p>
          </div>
        </section>

        <section id="story" className="fastcast-v2-story-track" ref={storyRef} aria-labelledby="story-title">
          <div className="fastcast-v2-story-sticky">
            <div className="fastcast-v2-story-grid fastcast-v2-shell">
              <div className="fastcast-v2-story-copy">
                <p className="fastcast-v2-section-kicker">The FastCast flow</p>
                <h2 id="story-title" className="sr-only">The FastCast recording and streaming workflow</h2>
                <div className="fastcast-v2-story-panels">
                  {storyChapters.map((chapter, index) => (
                    <article
                      key={chapter.label}
                      data-story-panel
                      className={index === activeChapter ? 'is-active' : undefined}
                      aria-hidden={!isStatic && index !== activeChapter}
                    >
                      <chapter.Icon size={26} />
                      <p>{chapter.eyebrow}</p>
                      <h3>{chapter.title}</h3>
                      <div>{chapter.body}</div>
                    </article>
                  ))}
                </div>
              </div>

              <StoryScreen activeChapter={activeChapter} />
            </div>

            <div className="fastcast-v2-story-tabs fastcast-v2-shell" aria-label="FastCast workflow chapters">
              {storyChapters.map((chapter, index) => (
                <button
                  key={chapter.label}
                  type="button"
                  className={index === activeChapter ? 'is-active' : undefined}
                  onClick={() => jumpToChapter(index)}
                  aria-current={index === activeChapter ? 'step' : undefined}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {chapter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="fastcast-v2-capabilities">
          <div className="fastcast-v2-shell">
            <div className="fastcast-v2-capability-heading" data-reveal>
              <p className="fastcast-v2-section-kicker">Small app. Real capture stack.</p>
              <h2>Everything the focused workflow needs.</h2>
            </div>
            <div className="fastcast-v2-capability-grid">
              {capabilityCards.map((card, index) => (
                <article key={card.metric} data-reveal style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}>
                  <card.Icon size={22} />
                  <strong>{card.metric}</strong>
                  <p>{card.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fastcast-v2-layouts">
          <div className="fastcast-v2-layouts-sticky fastcast-v2-shell">
            <div className="fastcast-v2-layouts-copy" data-reveal>
              <p className="fastcast-v2-section-kicker">Live layouts</p>
              <h2>Change the frame<br />while you are recording.</h2>
              <p>
                Move between screen-only, camera-only, picture-in-picture, and side-by-side layouts
                with global shortcuts. The recording keeps moving while the composition changes.
              </p>
              <div className="fastcast-v2-key-row">
                <span><kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>1–4</kbd></span>
                <span>switch layouts</span>
              </div>
            </div>
            <div className="fastcast-v2-layout-stack" aria-label="Four FastCast layout modes" data-reveal>
              <div className="fastcast-v2-layout-card fastcast-v2-layout-screen"><span>Screen</span></div>
              <div className="fastcast-v2-layout-card fastcast-v2-layout-camera"><span>Camera</span></div>
              <div className="fastcast-v2-layout-card fastcast-v2-layout-pip"><span>Picture in picture</span><i /></div>
              <div className="fastcast-v2-layout-card fastcast-v2-layout-split"><span>Side by side</span><i /></div>
            </div>
          </div>
        </section>

        <section id="privacy" className="fastcast-v2-privacy">
          <div className="fastcast-v2-shell fastcast-v2-privacy-grid">
            <div className="fastcast-v2-privacy-copy" data-reveal>
              <p className="fastcast-v2-section-kicker">Local-first by design</p>
              <h2>Your capture stays yours.</h2>
              <p>
                FastCast records to your machine. It does not require an account, collect telemetry,
                upload crashes, poll in the background, or install updates automatically.
              </p>
              <ul>
                <li><Check size={17} /> Stream keys are not saved to disk</li>
                <li><Check size={17} /> Support bundles are local, explicit, and redacted</li>
                <li><Check size={17} /> Updates are checked only when you ask</li>
              </ul>
            </div>
            <div className="fastcast-v2-privacy-visual" data-reveal aria-hidden="true">
              <div className="fastcast-v2-lock-orbit">
                <span><Mic size={19} /></span>
                <span><MonitorUp size={19} /></span>
                <span><Video size={19} /></span>
                <span><Radio size={19} /></span>
                <div><ShieldCheck size={62} /></div>
              </div>
              <p>Local capture boundary</p>
            </div>
          </div>
        </section>

        <section className="fastcast-v2-beta-section">
          <div className="fastcast-v2-shell">
            <div className="fastcast-v2-beta-heading" data-reveal>
              <p className="fastcast-v2-section-kicker">Open Beta</p>
              <h2>Start free. Unlock more when you need it.</h2>
            </div>
            <div className="fastcast-v2-plan-grid">
              <article data-reveal>
                <p className="fastcast-v2-plan-name">FastCast Free</p>
                <h3>$0</h3>
                <p>Focused 1080p30 recording and streaming for Windows.</p>
                <ul>
                  <li><Check size={16} /> Monitor or window capture</li>
                  <li><Check size={16} /> Desktop audio and microphone</li>
                  <li><Check size={16} /> Webcam and live layouts</li>
                  <li><Check size={16} /> RTMP and RTMPS streaming</li>
                </ul>
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('pricing')}>
                  Download Free <ArrowUpRight size={17} />
                </a>
              </article>
              <article className="fastcast-v2-plan-pro" data-reveal>
                <span className="fastcast-v2-plan-badge"><Sparkles size={14} /> One-time license</span>
                <p className="fastcast-v2-plan-name">FastCast Pro</p>
                <h3>More headroom</h3>
                <p>Higher resolution, faster capture, and advanced encoder control.</p>
                <ul>
                  <li><Check size={16} /> 1440p and 4K recording</li>
                  <li><Check size={16} /> 60 fps capture where supported</li>
                  <li><Check size={16} /> Advanced encoder controls</li>
                  <li><Check size={16} /> No subscription and no account</li>
                </ul>
                <a
                  href={fastCastProCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCtaClick('fastcast', 'pro_clicked', 'pricing', fastCastProCheckoutUrl)}
                >
                  Get FastCast Pro <ArrowUpRight size={17} />
                </a>
              </article>
            </div>
            <p className="fastcast-v2-beta-note" data-reveal>
              FastCast is currently unsigned during Open Beta, so Windows SmartScreen may show an Unknown Publisher warning.
            </p>
          </div>
        </section>

        <section id="guides" className="fastcast-v2-guides">
          <div className="fastcast-v2-shell">
            <div className="fastcast-v2-guides-heading" data-reveal>
              <div>
                <p className="fastcast-v2-section-kicker">FastCast guides</p>
                <h2>Record with fewer surprises.</h2>
              </div>
              <a href="/fastcast/guides">View all guides <ArrowUpRight size={17} /></a>
            </div>
            <div className="fastcast-v2-guide-grid">
              {fastCastGuides.slice(0, 6).map((guide, index) => (
                <a
                  key={guide.slug}
                  href={fastCastGuidePath(guide.slug)}
                  data-reveal
                  style={{ '--reveal-delay': `${index * 60}ms` } as CSSProperties}
                >
                  <span>{guide.category}</span>
                  <h3>{guide.shortTitle}</h3>
                  <p>{guide.description}</p>
                  <i><ArrowRight size={18} /></i>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="fastcast-v2-faq">
          <div className="fastcast-v2-shell">
            <div className="fastcast-v2-faq-heading" data-reveal>
              <p className="fastcast-v2-section-kicker">FAQ</p>
              <h2>FastCast questions.</h2>
            </div>
            <div className="fastcast-v2-faq-list" data-reveal>
              {fastCastFaqs.map(({ question, answer }) => (
                <details key={question}>
                  <summary>
                    {question}
                    <ChevronDown size={18} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="fastcast-v2-final">
          <div className="fastcast-v2-final-orb" aria-hidden="true" />
          <div className="fastcast-v2-shell" data-reveal>
            <img src="/assets/FastCast/FastCast_Icon.png" alt="" width="68" height="68" />
            <p className="fastcast-v2-section-kicker">Ready when you are</p>
            <h2>Capture the moment.<br />Skip the setup spiral.</h2>
            <p>Download FastCast v0.5.1 for Windows 10 or 11 x64.</p>
            <div>
              <a
                className="fastcast-v2-button fastcast-v2-button-primary"
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDownload('final')}
              >
                <Download size={18} /> Download FastCast
              </a>
              <a
                className="fastcast-v2-button fastcast-v2-button-ghost"
                href={allReleasesUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} /> All releases
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="fastcast-v2-footer">
        <div className="fastcast-v2-shell">
          <p><strong>FastCast</strong> · Native Windows screen recording and streaming.</p>
          <nav aria-label="FastCast footer links">
            <a href="/fastcast/guides">Guides</a>
            <a href="/roadmap">Roadmap</a>
            <a href={latestReleaseUrl} target="_blank" rel="noopener noreferrer">Latest release</a>
            <a href={allReleasesUrl} target="_blank" rel="noopener noreferrer">All releases</a>
          </nav>
          <p>Source code is private. Public repositories host downloads and version metadata.</p>
        </div>
      </footer>

      <div className="fastcast-v2-floating-cta">
        <span><CircleDot size={14} /> FastCast <b>v0.5.1</b></span>
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('floating')}>
          Download <Download size={14} />
        </a>
      </div>
    </div>
  );
}
