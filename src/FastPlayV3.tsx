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
  Github,
  HardDrive,
  Keyboard,
  ShieldCheck,
  Sparkles,
  Subtitles,
  Sun,
} from 'lucide-react';
import { fastPlayControls } from './fastplay-controls.mjs';
import { fastPlayFaqs } from './fastplay-faqs.mjs';
import { guides as fastPlayGuides, guidePath as fastPlayGuidePath } from './fastplay-guides/guides-data';
import { trackCtaClick } from './lib/analytics';
import './fastplay-v3-base.css';
import './fastplay-v3.css';

const currentVersion = '0.4.5';
const downloadUrl = `https://github.com/CalvinSturm/FastPlay/releases/download/v${currentVersion}/fastplay-${currentVersion}-x86_64.msi`;
const latestReleaseUrl = 'https://github.com/CalvinSturm/FastPlay/releases/latest';
const sourceUrl = 'https://github.com/CalvinSturm/FastPlay';
const releaseNotesUrl = `https://github.com/CalvinSturm/FastPlay/releases/tag/v${currentVersion}`;

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

  usePageProgress(pageRef);
  useHeroProgress(heroRef);
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
              <img
                src="/assets/FastPlay/FastPlay_Demo.gif"
                alt=""
                width="544"
                height="988"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div className="fastcast-v2-scroll-cue" aria-hidden="true"><span>Scroll to enter FastPlay</span><i /></div>
          </div>
        </section>

        <section id="overview" className="fastplay-v3-release-summary" aria-labelledby="release-summary-title">
          <div className="fastcast-v2-shell">
            <div className="fastplay-v3-release-card" data-reveal>
              <h2 id="release-summary-title">New in v0.4.5: more reliable playback sessions</h2>
              <p className="fastplay-v3-release-lede">A reliability release that prevents resource leaks across many open players, restores video after canceled software-decoder seeks, and keeps diagnostics separate for every run.</p>
              <div className="fastplay-v3-release-grid">
                <article>
                  <h3>Clean multi-window playback</h3>
                  <p>Overlay rebuilds no longer leak GDI handles, so running many FastPlay windows does not exhaust shared Windows desktop resources.</p>
                </article>
                <article>
                  <h3>Seek recovery</h3>
                  <p>Software-decoded video now recovers when a seek cancels a decoder reopen instead of leaving audio playing over a frozen picture.</p>
                </article>
                <article>
                  <h3>Per-run diagnostics</h3>
                  <p>Concurrent players now keep separate session and crash logs, while fatal errors shut workers down cleanly before exit.</p>
                </article>
              </div>
              <a href={releaseNotesUrl} target="_blank" rel="noopener noreferrer">Read v0.4.5 release notes <ArrowUpRight size={16} /></a>
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
            </div>
          </div>
        </section>

        <section id="performance" className="fastcast-v2-capabilities">
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
              <h2>Reliable with one file—or twelve.</h2>
            </div>
            <div className="fastcast-v2-plan-grid">
              <article data-reveal>
                <p className="fastcast-v2-plan-name">Resource reliability</p>
                <h3>Every player closes cleanly.</h3>
                <p>Overlay rebuilds no longer leak GDI handles, so running many FastPlay windows does not exhaust the shared Windows desktop pool.</p>
                <ul>
                  <li><Check size={16} /> Zero GDI growth across repeated seeks</li>
                  <li><Check size={16} /> Twelve concurrent players validated</li>
                  <li><Check size={16} /> Clean shutdown on close or fatal error</li>
                </ul>
                <a href={releaseNotesUrl} target="_blank" rel="noopener noreferrer">Read release notes <ArrowUpRight size={17} /></a>
              </article>
              <article className="fastcast-v2-plan-pro" data-reveal>
                <span className="fastcast-v2-plan-badge"><Sparkles size={14} /> Free forever</span>
                <p className="fastcast-v2-plan-name">Seek recovery</p>
                <h3>Scrubbing keeps video alive.</h3>
                <p>Software-decode clips now recover when a seek cancels a decoder reopen instead of leaving audio playing over a frozen picture.</p>
                <ul>
                  <li><Check size={16} /> Dead decoder workers respawn when needed</li>
                  <li><Check size={16} /> Audio-only files avoid redundant reopen work</li>
                  <li><Check size={16} /> Per-run diagnostics survive every instance</li>
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
            <p>Download FastPlay v{currentVersion} for 64-bit Windows 10 or later.</p>
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
        <span><CircleDot size={14} /> FastPlay <b>v{currentVersion}</b></span>
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('floating')}>Download <Download size={14} /></a>
      </div>
    </div>
  );
}
