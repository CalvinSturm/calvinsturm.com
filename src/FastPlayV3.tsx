import { useEffect, useRef } from 'react';
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
  HardDrive,
  Keyboard,
  ShieldCheck,
  Subtitles,
  Sun,
} from 'lucide-react';
import { fastPlayControls } from './fastplay-controls.mjs';
import { fastPlayFaqs } from './fastplay-faqs.mjs';
import { guides as fastPlayGuides, guidePath as fastPlayGuidePath } from './fastplay-guides/guides-data';
import { trackCtaClick } from './lib/analytics';
import './fastplay-v3-base.css';
import './fastplay-v3.css';

const currentVersion = '0.4.6';
const downloadUrl = `https://github.com/CalvinSturm/FastPlay/releases/download/v${currentVersion}/fastplay-${currentVersion}-x86_64.msi`;
const latestReleaseUrl = 'https://github.com/CalvinSturm/FastPlay/releases/latest';
const sourceUrl = 'https://github.com/CalvinSturm/FastPlay';
const releaseNotesUrl = `https://github.com/CalvinSturm/FastPlay/releases/tag/v${currentVersion}`;

// Two framings of the same capture. Desktop gets the landscape one, where the
// window sizing itself is legible against the desktop around it; narrow screens
// keep the portrait crop, which would otherwise shrink to nothing.
//
// This query string is the single source of truth for the switch: it is used
// verbatim both here, in the <source media> attributes, and in the matching
// @media block in fastplay-v3.css, so the CSS slot and the chosen file can
// never disagree about which framing is on screen.
const heroWideQuery = '(min-width: 761px)';
const heroWideSrc = '/assets/FastPlay/fastplay-hero-wide.mp4';
const heroWidePoster = '/assets/FastPlay/fastplay-hero-wide-poster.jpg';
const heroTallSrc = '/assets/FastPlay/fastplay-hero.mp4';
const heroTallPoster = '/assets/FastPlay/fastplay-hero-poster.jpg';

const capabilityCards = [
  { metric: '120 fps', label: 'full-cadence playback on high-refresh displays', Icon: Gauge },
  { metric: 'HDR10', label: 'native HDR output or careful SDR tone mapping', Icon: Sun },
  { metric: 'D3D11', label: 'hardware decode with a GPU-resident video path', Icon: Cpu },
  { metric: '0 accounts', label: 'local files, local resume, no media cloud', Icon: HardDrive },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function trackDownload(location: string) {
  trackCtaClick('fastplay', 'download_clicked', location, downloadUrl);
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

/**
 * Keeps the hero video honest across the landscape/portrait breakpoint.
 *
 * `poster` cannot be made media-conditional in markup the way `<source>` can,
 * so it is assigned here instead of hardcoded: a landscape poster in the tall
 * slot would show as a heavily zoomed centre crop while the file loads.
 *
 * The `load()` call covers a real gap in `<source media>`: the media attribute
 * is only consulted during resource selection, so an element that has already
 * picked a file keeps it when the viewport crosses the breakpoint, leaving the
 * portrait video in the landscape slot (verified in Chrome 151). Re-running
 * selection is the documented fix. It only fires on an actual breakpoint
 * crossing, not on ordinary resizes, so playback is not disturbed.
 */
function useHeroFraming(videoRef: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const query = window.matchMedia(heroWideQuery);
    const applyPoster = () => {
      const node = videoRef.current;
      if (node) node.poster = query.matches ? heroWidePoster : heroTallPoster;
    };
    applyPoster();
    const handleChange = () => {
      applyPoster();
      videoRef.current?.load();
    };
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [videoRef]);
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

export function FastPlayV3() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  usePageProgress(pageRef);
  useHeroProgress(heroRef);
  useHeroFraming(heroVideoRef);
  useRevealOnScroll();

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
          <a href="#overview">Overview</a>
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
              <h1 id="fastplay-v3-title">The fast, keyboard-first video player for Windows.</h1>
              <p className="fastcast-v2-hero-lede">Open local videos quickly, scrub smoothly, and control playback without fighting the interface. FastPlay keeps the focus on your footage.</p>
              <div className="fastcast-v2-hero-actions">
                <a className="fastcast-v2-button fastcast-v2-button-primary" href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('hero')}>
                  Download for Windows <ArrowRight size={18} />
                </a>
                <a className="fastcast-v2-button fastcast-v2-button-ghost" href="#overview">
                  See what&apos;s new <ChevronDown size={18} />
                </a>
              </div>
              <p className="fastcast-v2-meta">v{currentVersion} · Windows 10+ x64 · MSI · MIT License</p>
            </div>
            <div className="fastcast-v2-hero-product" aria-hidden="true">
              <div className="fastcast-v2-product-glow" />
              <video
                ref={heroVideoRef}
                width="1280"
                height="720"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={heroWideSrc} type="video/mp4" media={heroWideQuery} />
                <source src={heroTallSrc} type="video/mp4" />
              </video>
            </div>
            <div className="fastcast-v2-scroll-cue" aria-hidden="true"><span>Scroll to enter FastPlay</span><i /></div>
          </div>
        </section>

        <section id="overview" className="fastplay-v3-release-summary" aria-labelledby="release-summary-title">
          <div className="fastcast-v2-shell">
            <div className="fastplay-v3-release-card" data-reveal>
              <h2 id="release-summary-title">New in v0.4.6: frameless windows and better portrait video</h2>
              <p className="fastplay-v3-release-lede">Switch between framed and frameless windows, keep your preferred style, and open rotated phone videos at the right shape.</p>
              <div className="fastplay-v3-release-grid">
                <article>
                  <h3>Frameless mode</h3>
                  <p>Press Ctrl+Shift+S to switch between framed and frameless windows.</p>
                </article>
                <article>
                  <h3>Your choice remembered</h3>
                  <p>New FastPlay windows open in the window style you last selected.</p>
                </article>
                <article>
                  <h3>Better portrait video</h3>
                  <p>Rotated phone videos now open in a correctly sized portrait window.</p>
                </article>
              </div>
              <a href={releaseNotesUrl} target="_blank" rel="noopener noreferrer">Read v{currentVersion} release notes <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="shortcuts" className="fastplay-v3-keys" aria-labelledby="shortcuts-title">
          <div className="fastcast-v2-shell">
            <div className="fastplay-v3-keys-inner">
              <div className="fastplay-v3-keys-heading" data-reveal>
                <p className="fastcast-v2-section-kicker">Keyboard controls</p>
                <h2 id="shortcuts-title">Every action has a keybind</h2>
                <p>Hold H in the player to see the full controls overlay.</p>
              </div>
              <div className="fastplay-v3-keys-body">
                <div className="fastplay-v3-keys-card" data-reveal>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Key</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fastPlayControls.map(([key, action]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="fastplay-v3-keys-media" data-reveal>
                  <video
                    src="/assets/FastPlay/fastplay-keys.mp4"
                    poster="/assets/FastPlay/fastplay-keys-poster.jpg"
                    width="540"
                    height="958"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="FastPlay playing a sunset beach video in a frameless portrait window, with the timeline scrubbed from the keyboard."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="performance" className="fastcast-v2-capabilities">
          <div className="fastcast-v2-shell">
            <div className="fastcast-v2-capability-heading" data-reveal>
              <p className="fastcast-v2-section-kicker">Lightweight app. Serious playback path.</p>
              <h2>Every frame on time.</h2>
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
              <p className="fastcast-v2-section-kicker">Current release · v{currentVersion}</p>
              <h2>Stays fast when you push it.</h2>
            </div>
            <div className="fastcast-v2-plan-grid">
              <article data-reveal>
                <p className="fastcast-v2-plan-name">Reliable every day</p>
                <h3>Open one video or a dozen.</h3>
                <p>FastPlay stays responsive and closes cleanly, even when you have several videos open.</p>
                <ul>
                  <li><Check size={16} /> Open multiple videos without slowing down Windows</li>
                  <li><Check size={16} /> Close every player without leftover processes</li>
                  <li><Check size={16} /> Tested with 12 videos open at once</li>
                </ul>
                <a href={releaseNotesUrl} target="_blank" rel="noopener noreferrer">See what’s new <ArrowUpRight size={17} /></a>
              </article>
              <article className="fastcast-v2-plan-pro" data-reveal>
                <p className="fastcast-v2-plan-name">Smooth seeking</p>
                <h3>Jump anywhere without getting stuck.</h3>
                <p>Skip forward, go back, or drag through a video without leaving the picture frozen while the audio keeps playing.</p>
                <ul>
                  <li><Check size={16} /> Move through videos quickly</li>
                  <li><Check size={16} /> Playback recovers if a video has trouble</li>
                  <li><Check size={16} /> Picture and audio stay together</li>
                </ul>
                <a className="fastplay-v3-plan-download" href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('release-card')}><Download size={17} /> Download FastPlay</a>
              </article>
            </div>
            <p className="fastcast-v2-beta-note" data-reveal>FastPlay is free for Windows 10 and 11.</p>
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
            <h2>Your video.<br />Nothing in the way.</h2>
            <p>Download FastPlay v{currentVersion} for 64-bit Windows 10 or later.</p>
            <div>
              <a className="fastcast-v2-button fastcast-v2-button-primary" href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('final')}><Download size={18} /> Download FastPlay</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="fastcast-v2-footer">
        <div className="fastcast-v2-shell">
          <p><strong>FastPlay</strong> · Fast, lightweight local video playback for Windows.</p>
          <nav aria-label="FastPlay footer links"><a href="/fastplay/guides">Guides</a><a href="/roadmap">Roadmap</a><a href={latestReleaseUrl} target="_blank" rel="noopener noreferrer">Latest release</a><a href={sourceUrl} target="_blank" rel="noopener noreferrer">Explore the source</a></nav>
          <p>Free and open source under the MIT License.</p>
        </div>
      </footer>

      <div className="fastcast-v2-floating-cta">
        <span><CircleDot size={14} /> FastPlay <b>v{currentVersion}</b></span>
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('floating')}>Download <Download size={14} /></a>
      </div>
    </div>
  );
}
