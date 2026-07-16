import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'before-you-record', label: 'Before you record' },
  { id: 'choose-source', label: 'Choosing what to capture' },
  { id: 'audio-setup', label: 'Setting up audio' },
  { id: 'webcam', label: 'Adding a webcam' },
  { id: 'quality-settings', label: 'Resolution and frame rate' },
  { id: 'start-stop-find', label: 'Recording and finding the file' },
  { id: 'fastcast-workflow', label: 'The FastCast workflow' },
  { id: 'limits', label: 'Limitations and compatibility' },
];

function Article() {
  return (
    <GuideLayout
      slug="how-to-record-screen-windows"
      toc={toc}
      lede={
        <>
          To record your screen on Windows, you need a recorder that can capture the right source
          (a full monitor or a single window), the right audio (microphone, system sound, or both),
          and save a file you can actually use, which usually means MP4. Windows ships Game Bar
          (Win+G) for basic app capture, but it cannot record the whole desktop; a dedicated
          recorder like FastCast covers the full job.
        </>
      }
      topCtaNote="FastCast is a native Windows screen recorder: pick a monitor or window, choose mic and desktop audio, optionally add a webcam overlay, and press Record to get a local MP4. One portable ZIP, no runtime to install."
      finalCtaHeading="Ready to record?"
      finalCtaBody="Download FastCast, unzip it, and you are recording in under a minute: choose a screen or window, pick your audio, press Record. Free during Open Beta."
    >
      <GuideSection id="before-you-record" title="Before you record">
        <p>Five minutes of preparation prevents most ruined recordings:</p>
        <ul>
          <li>
            <strong>Clean up the capture area.</strong> Close anything you do not want on video:
            notifications, chat apps, personal tabs. Windows Focus Assist (Do Not Disturb) silences
            popup notifications while you record.
          </li>
          <li>
            <strong>Check disk space.</strong> Screen recordings grow with length, resolution, and
            frame rate. Make sure the drive you are saving to has comfortable headroom before a
            long session.
          </li>
          <li>
            <strong>Test the microphone.</strong> Windows Settings &gt; System &gt; Sound shows a
            live input meter. Confirm the right mic is selected and the level moves when you talk.
          </li>
          <li>
            <strong>Decide the take length.</strong> Short takes are easier to redo and edit than
            one marathon capture.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="choose-source" title="Choosing what to capture">
        <p>Windows recorders generally offer two kinds of source, and the choice matters:</p>
        <ul>
          <li>
            <strong>A full monitor.</strong> Captures everything on that display, including app
            switching, the taskbar, and popups. Best for demos that move between programs. On
            multi-monitor setups, record the monitor where the action happens and keep notes or
            chat on the other one.
          </li>
          <li>
            <strong>A single window.</strong> Captures one application and keeps everything else
            private. Best for tutorials focused on one program.
          </li>
        </ul>
        <p>
          FastCast supports both: you choose a screen or a specific window when you set up the
          recording. Note that Windows Game Bar cannot capture the desktop or File Explorer at
          all, which is the usual reason people outgrow it.
        </p>
      </GuideSection>

      <GuideSection id="audio-setup" title="Setting up audio">
        <p>There are two audio streams to think about, and good recordings usually plan both:</p>
        <ul>
          <li>
            <strong>Microphone.</strong> Your narration. Position the mic close, do a short test,
            and listen back once; a bad mic level is the most common reason a take gets thrown
            away.
          </li>
          <li>
            <strong>Desktop (system) audio.</strong> The sound the computer itself makes: app
            audio, alerts, game sound, video playback. Capture it when the on-screen sound matters;
            leave it off for silent UI walkthroughs so stray notification sounds do not sneak in.
          </li>
        </ul>
        <p>
          FastCast captures microphone and desktop audio, and you pick your sources before
          recording. If you plan to narrate over game or app audio, do a short combined test first
          to confirm the balance sounds right.
        </p>
      </GuideSection>

      <GuideSection id="webcam" title="Adding a webcam">
        <p>
          A webcam track turns a screen capture into a presentation: viewers follow better when
          they can see you. FastCast can place your webcam as a picture-in-picture overlay on top
          of the screen capture, which is the standard look for tutorials and commentary.
        </p>
        <p>
          Keep the overlay in a corner that does not cover the interface you are demonstrating.
          There is a full guide to layouts, framing, and lighting in{' '}
          <a href={guidePath('record-screen-and-webcam')}>
            how to record your screen and webcam at the same time
          </a>.
        </p>
      </GuideSection>

      <GuideSection id="quality-settings" title="Resolution and frame rate">
        <ul>
          <li>
            <strong>Resolution.</strong> Recording at the source's native size (passthrough) keeps
            text sharpest, which matters for code and UI detail. Downscaling to 1080p or 720p
            produces smaller files and is plenty for most tutorials. FastCast offers passthrough,
            1080p, or 720p output.
          </li>
          <li>
            <strong>Frame rate.</strong> 30 fps is smooth enough for demos, slides, and most
            software walkthroughs. 60 fps matters for fast motion like gameplay, at roughly double
            the encoding and file-size cost. FastCast Free records 1080p30; a FastCast Pro license
            unlocks 1440p/4K and 60 fps capture where your hardware supports them.
          </li>
        </ul>
        <p>
          If your machine struggles while recording, lowering these two settings is the first fix;
          see <a href={guidePath('screen-recording-without-lag')}>reducing lag while screen recording</a>.
        </p>
      </GuideSection>

      <GuideSection id="start-stop-find" title="Recording and finding the file">
        <ol>
          <li>
            <strong>Start.</strong> Press Record. In FastCast you can leave the duration blank to
            record until you stop (this uses its crash-safe segmented mode), or set a fixed number
            of seconds for a timed clip.
          </li>
          <li>
            <strong>Stop without fumbling.</strong> Use a hotkey so the last seconds of your video
            are not you hunting for a stop button. FastCast's global start/stop hotkey is{' '}
            <code>Ctrl+Alt+F9</code>.
          </li>
          <li>
            <strong>Find the file.</strong> Recorders save to a fixed default folder unless you
            change it. FastCast saves MP4 files to its <code>recordings</code> folder by default,
            and a Browse control lets you pick a different destination before recording.
          </li>
        </ol>
        <p>
          From there, the MP4 plays anywhere. If the file is too large to share, a compressor like{' '}
          <a href="/fastcompress">FastCompress</a> can shrink it to Discord or email limits; for
          reviewing long takes efficiently, a keyboard-first player like{' '}
          <a href="/fastplay">FastPlay</a> makes the pass much faster.
        </p>
      </GuideSection>

      <GuideSection id="fastcast-workflow" title="The FastCast workflow">
        <p>FastCast compresses all of the above into one screen with no scene setup:</p>
        <ol>
          <li>Unzip and run <code>fastcast.exe</code>; it is a single self-contained program.</li>
          <li>Choose your screen or window and your audio sources.</li>
          <li>Toggle the webcam overlay if you want it.</li>
          <li>Press Record, do the take, stop with <code>Ctrl+Alt+F9</code>.</li>
          <li>Grab the MP4 from your recordings folder.</li>
        </ol>
        <InlineCta>
          FastCast is free during Open Beta and records with hardware H.264 encoding on supported
          GPUs. Download, unzip, record.
        </InlineCta>
      </GuideSection>

      <GuideSection id="limits" title="Limitations and compatibility">
        <ul>
          <li>
            FastCast runs on Windows 10 (version 20H1 or later) and Windows 11, 64-bit only.
          </li>
          <li>
            It is a focused single-scene recorder: no scene system, multiple mixed sources, chroma
            key, or filters. If you need full production compositing, see{' '}
            <a href={guidePath('obs-alternative-windows')}>the honest FastCast vs OBS comparison</a>.
          </li>
          <li>
            A GPU with hardware H.264 encoding (NVIDIA or AMD are the tested paths) is strongly
            recommended; the software encoder works but is much slower. Intel hardware encoding is
            not broadly validated yet.
          </li>
          <li>
            The Open Beta build is unsigned, so Windows SmartScreen may show an &quot;unknown
            publisher&quot; warning the first time you run it (More info, then Run anyway).
          </li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Article />
  </StrictMode>,
);
