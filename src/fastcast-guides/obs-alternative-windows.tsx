import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'summary', label: 'The comparison in short' },
  { id: 'what-obs-is-for', label: 'What OBS is designed for' },
  { id: 'what-fastcast-is-for', label: 'What FastCast is designed for' },
  { id: 'workflows', label: 'Recording and streaming workflows' },
  { id: 'features', label: 'Scenes, encoders, and tiers' },
  { id: 'which-to-choose', label: 'Which one should you choose?' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="obs-alternative-windows"
      toc={toc}
      lede={
        <>
          OBS Studio is the most capable free recording and streaming tool on Windows, and nothing
          here argues otherwise. But its power comes with scene collections, source lists, mixers,
          and settings pages that many people never need. If your entire job is &quot;record this
          screen, maybe with a webcam, maybe stream it,&quot; a focused single-scene recorder like
          FastCast covers it with far less to configure.
        </>
      }
      topCtaNote="FastCast is a native Windows recorder and streamer built around the common case: choose a monitor or window, pick audio, optionally add a webcam overlay, then record MP4 or go live over RTMP. No scenes to set up."
      finalCtaHeading="Try the simpler path first"
      finalCtaBody="FastCast is in Open Beta, and 1080p30 recording and streaming will stay free. It takes about a minute to try: download the ZIP, run it, record. If you outgrow it, OBS will still be there."
    >
      <GuideSection id="summary" title="The comparison in short">
        <ul>
          <li>
            <strong>Choose OBS</strong> if you need scenes, multiple composited sources, filters,
            chroma key, plugins, platform integrations, or fine-grained production control. It is
            the stronger tool, full stop.
          </li>
          <li>
            <strong>Consider FastCast</strong> if OBS feels like a broadcast studio when you just
            need a recording: one screen or window, mic and desktop audio, four focused
            screen/camera layouts, and an MP4 (or a simple RTMP stream) at the end.
          </li>
        </ul>
        <p>
          FastCast's own release notes describe it as &quot;a focused single-scene Windows
          recorder/streamer, not a full OBS replacement,&quot; and that framing is accurate.
        </p>
      </GuideSection>

      <GuideSection id="what-obs-is-for" title="What OBS is designed for">
        <p>
          OBS Studio is free, open source, cross-platform, and built for production: you compose
          scenes from any number of sources (captures, cameras, images, browser overlays), switch
          between them live, apply filters and chroma key, mix audio per source, and extend
          everything with plugins. Streamers running overlays and alerts, multi-camera setups, and
          anyone building a repeatable broadcast rig are squarely its audience.
        </p>
        <p>
          The cost is complexity. Scenes and sources have to be created and arranged before you
          can record anything, the settings surface is large, and small misconfigurations (wrong
          audio device, wrong canvas size) are easy to make and notice only after a take.
        </p>
      </GuideSection>

      <GuideSection id="what-fastcast-is-for" title="What FastCast is designed for">
        <p>
          FastCast starts from the opposite end: the common path should not require setup. There
          is one focused capture session, and the choices are the ones the job actually requires:
        </p>
        <ul>
          <li>Capture a monitor or a specific window.</li>
          <li>Capture microphone and desktop audio.</li>
          <li>
            Use screen only, screen with camera inset, camera with screen inset, or camera only;
            switch among them live with the configured layout hotkeys.
          </li>
          <li>Record a local MP4, or stream to a custom RTMP/RTMPS endpoint.</li>
          <li>Start and stop globally with <code>Ctrl+Alt+F9</code>.</li>
        </ul>
        <p>
          The portable ZIP contains the GUI and its small command-line controller, with no runtime
          to install. FastCast is deliberately quiet: no telemetry, no accounts, no background
          polling, and stream keys are session-only unless you opt in to storing them in Windows
          Credential Manager.
        </p>
      </GuideSection>

      <GuideSection id="workflows" title="Recording and streaming workflows">
        <p>
          <strong>Recording.</strong> In OBS you create a scene, add a display or window capture
          source, check the audio mixer, then record. In FastCast you choose the screen or window
          and audio sources directly and press Record; leaving the duration blank records until
          you stop, using a crash-safe segmented mode, and files land in a recordings folder as
          MP4. The step-by-step is in{' '}
          <a href={guidePath('how-to-record-screen-windows')}>how to record your screen on Windows</a>.
        </p>
        <p>
          <strong>Streaming.</strong> Both tools stream over RTMP. OBS adds platform integrations,
          service presets, and login-based setup. FastCast keeps it manual but simple: click your
          platform (YouTube, Twitch, or Kick) to fill in the server URL, paste your stream key,
          and go live. FastCast has no platform OAuth login; if you need one, that is an OBS job.
          FastCast Pro streams to up to three destinations at once. For the focused path, follow
          the{' '}
          <a href={guidePath('how-to-stream-on-windows')}>Windows live-streaming guide</a>.
        </p>
      </GuideSection>

      <GuideSection id="features" title="Scenes, encoders, and tiers">
        <ul>
          <li>
            <strong>Scenes and compositing.</strong> OBS: full scene system, unlimited sources,
            filters, chroma key, transitions. FastCast: four live screen/camera layouts that can
            switch during a take, but no arbitrary sources, filters, or chroma key. This is the
            single biggest difference.
          </li>
          <li>
            <strong>Encoders.</strong> Both use hardware H.264 encoding. FastCast's hardware path
            is tested on NVIDIA and AMD GPUs, with a software fallback that works but is much
            slower; Intel hardware encoding is not broadly validated yet. OBS exposes far more
            encoder tuning out of the box.
          </li>
          <li>
            <strong>Price and tiers.</strong> OBS is entirely free. FastCast Free covers 1080p30
            recording and streaming, and that tier will stay free; a one-time FastCast Pro license unlocks
            1440p/4K recording, 60 fps capture where hardware supports it, and advanced encoder
            controls. Pro is activated inside the app; there is no subscription and no account.
            High-resolution capture details are in{' '}
            <a href={guidePath('record-4k-60fps-windows')}>recording 4K 60 FPS on Windows</a>.
          </li>
          <li>
            <strong>Maturity.</strong> OBS is a mature project used by millions. FastCast is an
            open beta and currently unsigned, so SmartScreen may warn on first run.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="which-to-choose" title="Which one should you choose?">
        <p><strong>Choose OBS if you:</strong></p>
        <ul>
          <li>Stream with overlays, alerts, or scene switching</li>
          <li>Composite multiple sources or cameras</li>
          <li>Need filters, chroma key, plugins, or a virtual camera</li>
          <li>Want maximum control over encoders and output settings for free</li>
          <li>Work across Windows, macOS, and Linux</li>
        </ul>
        <p><strong>FastCast may fit better if you:</strong></p>
        <ul>
          <li>Record tutorials, demos, bug reports, or meetings with one screen and one camera</li>
          <li>Stream occasionally to one platform and are happy pasting a stream key</li>
          <li>Prefer a portable two-executable bundle over an installed production suite</li>
          <li>Want the recording workflow to be a few clicks with nothing to pre-build</li>
        </ul>
        <InlineCta>
          The honest test is ten minutes with each. FastCast is a small download and free during
          the beta, so trying it costs nothing.
        </InlineCta>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
