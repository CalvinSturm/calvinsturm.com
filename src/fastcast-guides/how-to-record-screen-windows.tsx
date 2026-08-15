import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'before-you-record', label: 'Before you record' },
  { id: 'windows-options', label: 'Windows recording options' },
  { id: 'choose-source', label: 'Choosing what to capture' },
  { id: 'audio-setup', label: 'Setting up audio' },
  { id: 'webcam', label: 'Adding a webcam' },
  { id: 'quality-settings', label: 'Resolution and frame rate' },
  { id: 'start-stop-find', label: 'Recording and finding the file' },
  { id: 'fastcast-workflow', label: 'The FastCast workflow' },
  { id: 'limits', label: 'Limitations and compatibility' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="how-to-record-screen-windows"
      toc={toc}
      lede={
        <>
          To record your screen on a Windows 11 or Windows 10 PC, choose a full monitor or one app
          window, select microphone and desktop audio, then record to a usable local file such as
          MP4. Built-in Windows tools can handle basic captures. A dedicated recorder such as
          FastCast adds one place for full-display or window capture, both audio sources, and an
          optional webcam.
        </>
      }
      topCtaNote="FastCast is a native Windows screen recorder: pick a monitor or window, choose mic and desktop audio, optionally add a webcam overlay, and press Record to get a local MP4. One portable ZIP, no runtime to install."
      finalCtaHeading="Ready to record?"
      finalCtaBody="Download FastCast, unzip it, and you are recording in under a minute: choose a screen or window, pick your audio, press Record. 1080p30 recording and streaming will stay free."
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

      <GuideSection id="windows-options" title="Choose a Windows 11 screen recorder for the job">
        <p>Windows users have three practical starting points:</p>
        <ul>
          <li>
            <strong>Snipping Tool:</strong> useful for a quick selected-area capture when you do
            not need a full recording-and-streaming setup. Its available audio options can depend
            on the installed Windows version, so check the controls shown on your PC.
          </li>
          <li>
            <strong>Xbox Game Bar:</strong> press <code>Win+G</code> for basic app recording. It is
            designed around application capture rather than every desktop and File Explorer workflow.
          </li>
          <li>
            <strong>A dedicated recorder:</strong> use FastCast or another recorder when you need
            a specific monitor or window, desktop audio and microphone together, an optional
            webcam, or the same setup for live streaming.
          </li>
        </ul>
        <p>
          The right choice depends on the source and sound, not simply whether the PC says Windows
          11. For a narrated tutorial or product demo, confirm the microphone and desktop-audio
          sources separately before recording the full take.
        </p>
      </GuideSection>

      <GuideSection id="choose-source" title="Choosing what to capture">
        <p>Windows PC screen recorders generally offer two kinds of source, and the choice matters:</p>
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
          FastCast supports both: choose a screen or a specific window when you set up the
          recording. A dedicated capture source is useful when built-in app recording does not
          cover the desktop or File Explorer workflow you need.
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
          recording. Watch the live mic meter, adjust the persisted gain control from -12 dB to
          +12 dB, and back it down if the clipping warning appears. If you plan to narrate over
          game or app audio, do a short combined test first to confirm the balance sounds right.
        </p>
        <p>
          That is the basic answer to recording a Windows screen with audio: enable the microphone
          for your voice, desktop audio for computer sound, or both when viewers need narration and
          the app. Listen to a short MP4 before committing to a long recording.
        </p>
      </GuideSection>

      <GuideSection id="webcam" title="Adding a webcam">
        <p>
          A webcam track turns a screen capture into a presentation: viewers follow better when
          they can see you. FastCast can place your webcam as a picture-in-picture overlay on top
          of the screen capture, which is the standard look for tutorials and commentary, and
          since v0.5.0 you can switch between screen and camera layouts mid-recording with{' '}
          <code>Ctrl+Alt+1-4</code>.
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
            and a Browse control lets you pick a different destination before recording. After
            stopping, the Last recording panel shows validation status, file size, and any warning;
            use Open or Show in folder without hunting through File Explorer.
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
          <li>
            Unzip and run <code>fastcast.exe</code>. The portable ZIP also includes{' '}
            <code>fastcastc.exe</code> for scripted control.
          </li>
          <li>Choose your screen or window and your audio sources.</li>
          <li>Toggle the webcam overlay if you want it.</li>
          <li>Press Record, do the take, stop with <code>Ctrl+Alt+F9</code>.</li>
          <li>Grab the MP4 from your recordings folder.</li>
        </ol>
        <p>
          For automation, keep FastCast running and call{' '}
          <code>fastcastc --start-record</code> or <code>fastcastc --stop-record</code> from
          PowerShell. The controller uses the same guarded action as the Record button and global
          hotkey.
        </p>
        <InlineCta>
          FastCast records with hardware H.264 encoding on supported GPUs. Its 1080p30 recording
          and streaming will stay free. Download, unzip, record.
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

mountGuide(<GuidePage />);
