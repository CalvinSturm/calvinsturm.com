import { useEffect, useRef } from 'react';
import { CircleDot, Download } from 'lucide-react';
import {
  guides as fastCastGuides,
  guidePath as fastCastGuidePath,
  fastCastProCheckoutUrl,
  fastCastProPrice,
} from './fastcast-guides/guides-data';
import { trackCtaClick } from './lib/analytics';
import { useReducedMotion } from './lib/useReducedMotion';
import './fastcast-v2.css';

// Single source of truth for the shipped version: the download URL and every
// version string on the page derive from it, so a release bump is one edit
// here plus softwareVersion/downloadUrl in fastcast.html and the guide CTA.
const currentVersion = '0.8.0';
const installerUrl = `https://github.com/CalvinSturm/FastCast-releases/releases/download/v${currentVersion}/FastCast-${currentVersion}-win-x64.msi`;
const portableUrl = `https://github.com/CalvinSturm/FastCast-releases/releases/download/v${currentVersion}/FastCast-${currentVersion}-win-x64.zip`;
const latestReleaseUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases/latest';
const allReleasesUrl = 'https://github.com/CalvinSturm/FastCast-releases/releases';
const supportEmail = 'calvinsturm@gmail.com';
const supportUrl = `mailto:${supportEmail}?subject=FastCast%20Support`;

// The page is laid out like a rack of broadcast units, and only some bands carry
// a three-letter patch label on the left rail. A label on every band turns the
// system into wallpaper and the reader stops reading any of them, so add one
// only where the code names something the heading does not: a state (REC), a
// class of input (KEY), a boundary (LCL). Bands without one keep the rail column
// empty via .fc-unit-blank, so the content edge stays on the same line.
type Rail = { code: string; name: string };

// Setup paths for the same job: record the screen with mic and webcam, then
// keep the file. Both lists are the real click path, not a strawman. OBS gets
// its due right underneath.
const obsPath = [
  'Create a scene',
  'Add a Display Capture source',
  'Add a Video Capture Device for the webcam',
  'Add an Audio Input Capture for the mic',
  'Resize and stack the sources on the canvas',
  'Open Settings, then Output, and choose an encoder and bitrate',
  'Set the recording path and file format',
  'Close settings and check your levels',
  'Press Start Recording',
];

const fastCastPath = [
  'Pick a display or a single window',
  'Pick your mic and desktop audio, webcam if you want one',
  'Press Start recording',
];

// Plain-language capability rows. Each one names something you do, with the
// hotkey or destination that makes it real. No architecture talk.
const panelRows = [
  {
    name: 'Screen or single window',
    body: 'Record a whole monitor or just one running app, so the rest of your desktop never makes it into the file.',
    spec: 'Monitor · Window',
  },
  {
    name: 'Mic and desktop audio',
    body: 'A live level meter sits between the two mute buttons, and you can mute either one with a keyboard shortcut that works from anywhere.',
    spec: 'Ctrl+Alt+F10 / F11',
  },
  {
    name: 'Webcam on top',
    body: 'Turn the camera on and switch between screen, camera, and combined layouts while you are recording.',
    spec: '4 layouts',
  },
  {
    name: 'Built-in green screen',
    body: 'Remove a green backdrop from your webcam inside FastCast, then place yourself cleanly over your recording or stream.',
    spec: 'Live chroma key',
  },
  {
    name: 'A finished MP4',
    body: 'Recordings are saved as H.264 MP4 files, ready to upload or edit as soon as recording ends.',
    spec: 'MP4 / H.264',
  },
  {
    name: 'Instant Replay',
    body: 'Keep the last 15 to 300 seconds in memory and save the moment as an MP4 after it happens. Press Ctrl+Alt+F8 when you want the clip; nothing is written until then.',
    spec: '15–300 sec · Ctrl+Alt+F8',
  },
  {
    name: 'The same setup, live',
    body: 'Use the same setup to stream to YouTube, Twitch, Kick, or another streaming service. There is no second scene to build for going live.',
    spec: 'RTMP / RTMPS',
  },
  {
    name: 'Start and stop from anywhere',
    body: 'Recording starts and stops without switching windows, so the first and last seconds of the take are not you hunting for the button.',
    spec: 'Ctrl+Alt+F9',
  },
];

// Mirrors the registration table in the app (crates/fastcast-app/src/hotkeys.rs).
// Start/stop and the two mutes are fixed global registrations; the four layout
// keys follow the selected scheme. Re-check that file before editing these.
const globalKeys = [
  { keys: ['Ctrl', 'Alt', 'F9'], action: 'Start or stop recording' },
  { keys: ['Ctrl', 'Alt', 'F10'], action: 'Mute or unmute the microphone' },
  { keys: ['Ctrl', 'Alt', 'F11'], action: 'Mute or unmute desktop audio' },
  { keys: ['Ctrl', 'Alt', 'F8'], action: 'Save the Instant Replay clip' },
  { keys: ['Ctrl', 'Alt', '1'], action: 'Screen only' },
  { keys: ['Ctrl', 'Alt', '2'], action: 'Screen with camera' },
  { keys: ['Ctrl', 'Alt', '3'], action: 'Camera with screen' },
  { keys: ['Ctrl', 'Alt', '4'], action: 'Camera only' },
];

const windowKeys = [
  { keys: ['F2'], action: 'Switch simple or detailed view' },
  { keys: ['H'], hold: true, action: 'Show every shortcut on screen' },
];

// Spec plate under the hero copy. Reads like the label on the back of a unit.
const specPlate = [
  { key: 'Capture', value: 'Monitor · Window · Webcam' },
  { key: 'Audio', value: 'Desktop + microphone' },
  { key: 'Output', value: 'MP4 / H.264' },
  { key: 'Stream', value: 'YouTube · Twitch · Kick · RTMP/RTMPS' },
  { key: 'System', value: 'Windows 10 / 11 · 64-bit' },
];

// These mirror the FAQPage JSON-LD in fastcast.html one for one. Structured
// data has to match content that is actually on the page, so edit both together.
const fastCastFaqs = [
  {
    question: 'What is FastCast?',
    answer:
      'FastCast is a native Windows screen recorder and live streaming app for local MP4 recording, Instant Replay clips, monitor or window capture, desktop audio, microphone capture, webcam overlay, and RTMP/RTMPS streaming.',
  },
  {
    question: 'What is Instant Replay?',
    answer:
      'Instant Replay keeps the last 15 to 300 seconds of your screen in memory and saves it as an MP4 when you press Ctrl+Alt+F8. Nothing is written until you save a clip, and the buffer keeps running afterward.',
  },
  {
    question: 'Is FastCast an OBS alternative?',
    answer:
      'FastCast is a simpler OBS alternative for focused single-scene recording and streaming workflows. OBS is still better for advanced scenes, filters, plugins, or complex broadcast production.',
  },
  {
    question: 'Does FastCast save stream keys?',
    answer:
      'Not unless you ask it to. Stream keys are session-only by default. Turning on Remember stream keys in Advanced stores them in Windows Credential Manager, encrypted by Windows under your user account, and turning it back off deletes them immediately. Keys never go into settings files, logs, or support bundles.',
  },
  {
    question: 'Is FastCast free?',
    answer:
      `FastCast Free covers 1080p recording and streaming at 60 fps, and those capabilities will stay free, with no subscription and no account. FastCast Pro unlocks 1440p and 4K recording, 120 fps capture, multistreaming to up to three destinations, and advanced encoder controls, and it is now pay what you want: enter $0 at checkout for a free license key, or pay any amount you like to support development.`,
  },
  {
    question: 'Is FastCast signed?',
    answer:
      'FastCast is currently unsigned during Open Beta, so Windows SmartScreen may show an Unknown Publisher warning.',
  },
];

function trackDownload(location: string, href = installerUrl) {
  trackCtaClick('fastcast', 'download_clicked', location, href);
}

/**
 * The one live element on the page: a timecode in the tally bar counting how
 * long this tab has been open. It writes straight to the node instead of
 * through state, so the rest of the page never re-renders.
 *
 * The clock keeps running when the visitor asks for reduced motion. A numeral
 * changing in place is not motion in the vestibular sense, and this is the only
 * thing on the page that says "recorder" rather than "software". What does get
 * dropped is the frames field, and with it the 10 Hz tick: a digit flickering
 * ten times a second in a bar that is on screen for the whole visit is the
 * distraction people set that flag to avoid. Seconds still read as a counter.
 */
function useSessionTimecode(ref: React.RefObject<HTMLSpanElement | null>, frames: boolean) {
  useEffect(() => {
    const start = performance.now();
    const period = frames ? 100 : 1000;

    const pad = (value: number) => String(Math.floor(value)).padStart(2, '0');

    let timer = 0;

    const tick = () => {
      const node = ref.current;
      const elapsed = (performance.now() - start) / 1000;

      if (node) {
        const clock = `${pad(elapsed / 3600)}:${pad((elapsed / 60) % 60)}:${pad(elapsed % 60)}`;
        node.textContent = frames ? `${clock}:${pad((elapsed % 1) * 30)}` : clock;
      }

      // Re-arm against the elapsed time rather than on a fixed interval, so a
      // slow frame cannot make the counter show the same second twice or skip
      // one. At 1 Hz that would read as a broken clock.
      const drift = (performance.now() - start) % period;
      timer = window.setTimeout(tick, period - drift);
    };

    tick();
    return () => window.clearTimeout(timer);
  }, [ref, frames]);
}

function KeyCombo({ keys, hold }: { keys: string[]; hold?: boolean }) {
  return (
    <span className="fc-combo">
      {keys.map((key, index) => (
        <span key={key}>
          {index > 0 ? <i aria-hidden="true">+</i> : null}
          <kbd>{key}</kbd>
        </span>
      ))}
      {hold ? <em>hold</em> : null}
    </span>
  );
}

function RailLabel({ code, name }: Rail) {
  return (
    <p className="fc-rail" aria-hidden="true">
      <b>{code}</b>
      <span>{name}</span>
    </p>
  );
}

export function FastCastV2() {
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useSessionTimecode(timecodeRef, !reducedMotion);

  return (
    <div className={`fc${reducedMotion ? ' fc-still' : ''}`}>
      <a className="fc-skip" href="#fastcast-main">Skip to main content</a>

      <header className="fc-bar">
        <a className="fc-mark" href="#fastcast-main" aria-label="FastCast home">
          <span className="fc-tally" aria-hidden="true" />
          <img src="/assets/FastCast/FastCast_Icon.png" alt="" width="30" height="30" />
          FastCast
        </a>
        <nav aria-label="FastCast page sections">
          <a href="#compare">Vs OBS</a>
          <a href="#panel">What it does</a>
          <a href="#keys">Shortcuts</a>
          <a href="#pricing">Pricing</a>
          <a href="#guides">Guides</a>
          <a href="#support">Support</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="fc-bar-right">
          {/* Reads "Session", not "REC": red and REC are reserved for actual
              recording and live state, in the app and here. A page clock that
              labelled itself REC would be the site lying about status. */}
          <span className="fc-timecode" aria-hidden="true">
            Session <span ref={timecodeRef}>{reducedMotion ? '00:00:00' : '00:00:00:00'}</span>
          </span>
          <a
            className="fc-btn fc-btn-primary"
            href={installerUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDownload('nav')}
          >
            Download
          </a>
        </div>
      </header>

      <main id="fastcast-main">
        <section className="fc-unit fc-unit-wide fc-hero" aria-labelledby="fastcast-v2-title">
          <div className="fc-unit-inner fc-unit-blank">
            <div className="fc-hero-grid">
              <div className="fc-hero-copy">
                <p className="fc-eyebrow">A lightweight OBS alternative for Windows</p>
                {/* Must stay word-for-word identical to the fallback <h1> in
                    fastcast.html so a non-JS crawl and a rendered crawl agree. */}
                <h1 id="fastcast-v2-title">Record or stream without the complexity of OBS.</h1>
                <p className="fc-lede">
                  FastCast is a simple, native Windows recorder and streamer. Pick a display and
                  mic, then record an MP4 or go live without building scenes or configuring a
                  broadcasting suite.
                </p>
                <div className="fc-actions">
                  <a
                    className="fc-btn fc-btn-primary fc-btn-lg"
                    href={installerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackDownload('hero')}
                  >
                    Download FastCast
                  </a>
                  <a
                    className="fc-btn fc-btn-ghost fc-btn-lg"
                    href={portableUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackDownload('hero_portable', portableUrl)}
                  >
                    Portable ZIP
                  </a>
                </div>
                <ul className="fc-hero-trust" aria-label="FastCast Free highlights">
                  <li>Free 1080p60</li>
                  <li>No account</li>
                  <li>No watermark</li>
                  <li>No telemetry</li>
                  <li>Windows 10 / 11</li>
                </ul>
                <p className="fc-fineprint">v{currentVersion} · Windows installer · Instant Replay · Open Beta</p>

                <dl className="fc-plate">
                  {specPlate.map((row) => (
                    <div key={row.key}>
                      <dt>{row.key}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* The screenshot carries its own titlebar, resolution readout,
                  and level meters, so the frame around it stays a plain edge.
                  Anything more reads as a second app wrapped around the app. */}
              <figure className="fc-monitor">
                <div className="fc-monitor-frame">
                  <img
                    src="/assets/FastCast/fastcast-green-screen.png"
                    alt="FastCast recording a game with a webcam overlay and green-screen removal enabled, placing the presenter cleanly over the captured screen"
                    width="730"
                    height="792"
                    fetchPriority="high"
                  />
                </div>
                <figcaption>Built-in green screen · Live while you record or stream</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="compare" className="fc-unit fc-unit-wide fc-compare" aria-labelledby="compare-title">
          <div className="fc-unit-inner fc-unit-blank">
            <div className="fc-unit-body">
              <h2 id="compare-title">
                Same recording. <em>Two setup paths.</em>
              </h2>
              <p className="fc-unit-lede">
                Record your screen, your mic, and your webcam, then keep the file. Here is what you
                click to get there.
              </p>

              <div className="fc-ab">
                <article className="fc-ch">
                  <header>
                    <span className="fc-ch-id">CH A</span>
                    <h3>OBS Studio</h3>
                    <span className="fc-ch-count">{obsPath.length} steps</span>
                  </header>
                  <ol>
                    {obsPath.map((step, index) => (
                      <li key={step}>
                        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </article>

                <article className="fc-ch fc-ch-featured">
                  <header>
                    <span className="fc-ch-id">CH B</span>
                    <h3>FastCast</h3>
                    <span className="fc-ch-count">{fastCastPath.length} steps</span>
                  </header>
                  <ol>
                    {fastCastPath.map((step, index) => (
                      <li key={step}>
                        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p className="fc-ch-note">
                    Every one of those controls is on the first screen. Nothing is hidden in a
                    settings menu.
                  </p>
                </article>
              </div>

              <p className="fc-honest">
                <b>Keep OBS for the rest.</b> It is a full broadcast studio and it earns those steps:
                scene switching, plugins, filters, and productions with a director.
                FastCast is the lightweight OBS alternative for the recording or RTMP stream you
                want to start in the next ten seconds.{' '}
                <a className="fc-link" href="/fastcast/guides/obs-alternative-windows">Compare FastCast and OBS</a>.
              </p>
            </div>
          </div>
        </section>

        <section id="panel" className="fc-unit fc-panel" aria-labelledby="panel-title">
          <div className="fc-unit-inner fc-unit-blank">
            <div className="fc-unit-body">
              <h2 id="panel-title">
                Everything you need <em>to record</em>
              </h2>
              <p className="fc-unit-lede">
                Capture your screen, audio, and webcam without digging through menus, then save the last moment when it matters.
              </p>

              <ul className="fc-rows">
                {panelRows.map((row) => (
                  <li key={row.name}>
                    <h3>{row.name}</h3>
                    <p>{row.body}</p>
                    <span className="fc-rows-spec">{row.spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="fc-unit fc-unit-wide fc-advanced" aria-labelledby="advanced-title">
          <div className="fc-unit-inner fc-unit-blank">
            <div className="fc-unit-body fc-advanced-grid">
              <div>
                <h2 id="advanced-title">
                  Press <em>F2</em> for advanced controls
                </h2>
                <p className="fc-unit-lede">
                  FastCast starts compact. Press F2 to put every capture and streaming control on one
                  screen. Press it again to go back to the simple view.
                </p>
                <ul className="fc-ticks">
                  <li>Encoder, resolution, frame rate, and scaling</li>
                  <li>YouTube, Twitch, Kick, or a custom RTMP/RTMPS URL</li>
                  <li>Layout shortcuts, app updates, and Pro activation</li>
                </ul>
                <p className="fc-fineprint">Simple by default. Detailed on demand.</p>
              </div>
              <figure className="fc-shot">
                <div className="fc-monitor-frame">
                  <picture>
                    <source srcSet="/assets/FastCast/fastcast-advanced-view.webp" type="image/webp" />
                    <img
                      src="/assets/FastCast/fastcast-advanced-view.png"
                      alt="FastCast expanded view with capture, audio, streaming, encoder, output, and layout controls laid out on one screen"
                      width="726"
                      height="1124"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <figcaption>Expanded view · F2</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="keys" className="fc-unit fc-keys" aria-labelledby="keys-title">
          <div className="fc-unit-inner">
            <RailLabel code="KEY" name="Shortcuts" />
            <div className="fc-unit-body">
              <h2 id="keys-title">
                Control FastCast <em>without leaving your app</em>
              </h2>
              <p className="fc-unit-lede">
                Start or stop recording, mute audio, and switch layouts with shortcuts that work
                while FastCast is behind your game, your call, or your editor.
              </p>

              <div className="fc-keygrid">
                <div className="fc-keygroup">
                  <p className="fc-keygroup-name">Anywhere</p>
                  <ul>
                    {globalKeys.map((row) => (
                      <li key={row.action}>
                        <KeyCombo keys={row.keys} />
                        <span>{row.action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="fc-keygroup">
                  <p className="fc-keygroup-name">In the FastCast window</p>
                  <ul>
                    {windowKeys.map((row) => (
                      <li key={row.action}>
                        <KeyCombo keys={row.keys} hold={row.hold} />
                        <span>{row.action}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="fc-keynote">
                    If a game already uses the number keys, you can move the four layout shortcuts to
                    Ctrl+Shift+1 through 4 or turn them off. Start, stop, and the two mutes stay where
                    they are.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="privacy" className="fc-unit fc-local" aria-labelledby="local-title">
          <div className="fc-unit-inner">
            <RailLabel code="LCL" name="Local" />
            <div className="fc-unit-body">
              <h2 id="local-title">
                Nothing leaves the machine <em>unless you send it</em>
              </h2>
              <ul className="fc-facts">
                <li>
                  <b>No account required</b>
                  <span>Download FastCast and start recording without creating an account or signing in.</span>
                </li>
                <li>
                  <b>No automatic data collection</b>
                  <span>FastCast does not collect usage data, upload crash reports, or check for updates unless you ask it to.</span>
                </li>
                <li>
                  <b>Stream keys are session-only by default</b>
                  <span>FastCast uses your stream key only while the app is open. If you turn on Remember stream keys, it is stored in Windows Credential Manager, never in a settings file, log, or support bundle.</span>
                </li>
              </ul>
              <p className="fc-fineprint fc-privacy-link">
                Licensing, manual update checks, website analytics, and user-directed streaming are covered in the{' '}
                <a className="fc-link" href="/fastcast/privacy">FastCast Privacy Policy</a>.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="fc-unit fc-license" aria-labelledby="license-title">
          <div className="fc-unit-inner">
            <RailLabel code="LIC" name="License" />
            <div className="fc-unit-body">
              <h2 id="license-title">
                Free for everyday capture. <em>Name your price for the rest.</em>
              </h2>

              <div className="fc-plans">
                <article>
                  <p className="fc-plan-name">FastCast Free</p>
                  <p className="fc-plan-price">$0</p>
                  <p className="fc-plan-line">
                    1080p recording and streaming at 60 fps. Stays free with no subscription.
                  </p>
                  <ul className="fc-ticks">
                    <li>Monitor or window capture</li>
                    <li>Desktop audio and microphone</li>
                    <li>Webcam and live layouts</li>
                    <li>Streaming to YouTube, Twitch, or Kick</li>
                  </ul>
                  <a
                    className="fc-btn fc-btn-primary"
                    href={installerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackDownload('pricing')}
                  >
                    Download Free <span aria-hidden="true">→</span>
                  </a>
                </article>

                <article className="fc-plan-pro">
                  <p className="fc-plan-name">
                    FastCast Pro <span className="fc-chip">One-time</span>
                  </p>
                  <p className="fc-plan-price">{fastCastProPrice}</p>
                  <p className="fc-plan-line">
                    For recordings people will scrub through frame by frame. Pay $0 for a license key,
                    or any amount you want to support FastCast.
                  </p>
                  <ul className="fc-ticks">
                    <li>1440p and 4K recording</li>
                    <li>120 fps capture where your hardware supports it</li>
                    <li>Stream to up to three destinations at once</li>
                    <li>Fine-tune recording quality and file size</li>
                    <li>No subscription and no account</li>
                  </ul>
                  <a
                    className="fc-btn fc-btn-primary"
                    href={fastCastProCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCtaClick('fastcast', 'pro_clicked', 'pricing', fastCastProCheckoutUrl)}
                  >
                    Unlock Pro, pay what you want <span aria-hidden="true">→</span>
                  </a>
                </article>
              </div>

              <p className="fc-fineprint">
                FastCast is unsigned during the Open Beta, so Windows SmartScreen may show an Unknown
                Publisher warning the first time you run it.
              </p>
            </div>
          </div>
        </section>

        <section id="guides" className="fc-unit fc-guides" aria-labelledby="guides-title">
          <div className="fc-unit-inner fc-unit-blank">
            <div className="fc-unit-body">
              <div className="fc-unit-head">
                <h2 id="guides-title">
                  Recording problems, <em>written down</em>
                </h2>
                <a className="fc-link" href="/fastcast/guides">
                  All guides <span aria-hidden="true">→</span>
                </a>
              </div>
              <ul className="fc-doclist">
                {fastCastGuides.slice(0, 6).map((guide) => (
                  <li key={guide.slug}>
                    <a href={fastCastGuidePath(guide.slug)}>
                      <span className="fc-doc-cat">{guide.category}</span>
                      <span className="fc-doc-body">
                        <h3>{guide.shortTitle}</h3>
                        <p>{guide.description}</p>
                      </span>
                      <span className="fc-doc-arrow" aria-hidden="true">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="support" className="fc-unit" aria-labelledby="support-title">
          <div className="fc-unit-inner">
            <RailLabel code="SUP" name="Support" />
            <div className="fc-unit-body">
              <h2 id="support-title">Need help with FastCast?</h2>
              <p className="fc-unit-lede">
                Email Sturm Technologies for installation, recording, streaming, licensing, or billing support.
              </p>
              <div className="fc-actions">
                <a className="fc-btn fc-btn-primary" href={supportUrl}>Email FastCast support</a>
              </div>
              <p className="fc-fineprint">
                Include your FastCast version, Windows version, and a short description of the problem. Do not send
                passwords or stream keys. You can also write to <a className="fc-link" href={supportUrl}>{supportEmail}</a>.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="fc-unit fc-faq" aria-labelledby="faq-title">
          <div className="fc-unit-inner">
            <RailLabel code="FAQ" name="Questions" />
            <div className="fc-unit-body">
              <h2 id="faq-title">Questions people ask first</h2>
              <div className="fc-faq-list">
                {fastCastFaqs.map(({ question, answer }) => (
                  <details key={question}>
                    <summary>{question}</summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="fc-unit fc-end">
          <div className="fc-unit-inner">
            <RailLabel code="REC" name="Ready" />
            <div className="fc-unit-body fc-end-body">
              <h2>Press record in ten seconds</h2>
              <p className="fc-unit-lede">FastCast v{currentVersion} for Windows 10 and 11, 64-bit.
                Free 1080p60, no account, no watermark, and no telemetry.</p>
              <div className="fc-actions">
                <a
                  className="fc-btn fc-btn-primary fc-btn-lg"
                  href={installerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDownload('final')}
                >
                  Download FastCast
                </a>
                <a
                  className="fc-btn fc-btn-ghost fc-btn-lg"
                  href={allReleasesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  All releases <span aria-hidden="true">→</span>
                </a>
                <a
                  className="fc-btn fc-btn-ghost fc-btn-lg"
                  href={portableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDownload('final_portable', portableUrl)}
                >
                  Portable ZIP
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fc-foot">
        <div className="fc-unit-inner">
          <p>
            <b>FastCast</b> · Native Windows screen recording and streaming · Sturm Technologies LLC
          </p>
          <nav aria-label="FastCast footer links">
            <a href="/fastcast/guides">Guides</a>
            <a href="/fast-series">Fast Series</a>
            <a href="/roadmap">Roadmap</a>
            <a href={supportUrl}>Support</a>
            <a href="/fastcast/privacy">Privacy Policy</a>
            <a href={latestReleaseUrl} target="_blank" rel="noopener noreferrer">Release notes</a>
            <a href={allReleasesUrl} target="_blank" rel="noopener noreferrer">All releases</a>
          </nav>
        </div>
      </footer>

      <div className="fc-floating-cta">
        <span><CircleDot size={14} /> FastCast <b>v{currentVersion}</b></span>
        <a
          href={installerUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDownload('floating')}
        >
          Download <Download size={14} />
        </a>
      </div>
    </div>
  );
}
