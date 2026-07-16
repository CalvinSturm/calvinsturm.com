import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'test-first', label: 'Run a 30-second test first' },
  { id: 'black-screen', label: 'Black screen: causes and fixes' },
  { id: 'no-audio', label: 'Missing audio: causes and fixes' },
  { id: 'huge-files', label: 'Recordings that are too large' },
  { id: 'fastcast-preflight', label: 'The FastCast pre-flight check' },
  { id: 'limits', label: 'Limits and honest caveats' },
];

function Article() {
  return (
    <GuideLayout
      slug="screen-recording-black-screen-no-audio"
      toc={toc}
      lede={
        <>
          A black recording almost always means the recorder captured the wrong thing: protected
          content, a minimized window, the wrong monitor, or a game in exclusive fullscreen.
          Silent recordings almost always mean the wrong audio device or a muted source. Both are
          catchable in a 30-second test recording before the take that matters, and both have
          specific fixes.
        </>
      }
      topCtaNote="FastCast shows a live preview of the selected screen or window and live level meters for microphone and desktop audio before you record, so black-screen and no-audio surprises show up before the take instead of after it."
      finalCtaHeading="Record a take you can trust"
      finalCtaBody="FastCast is free during Open Beta: pick your screen or window, watch the preview and the audio meters, and press Record knowing what the file will contain."
    >
      <GuideSection id="test-first" title="Run a 30-second test first">
        <p>
          Every fix below is faster to apply before a real take than after a ruined one. Record 30
          seconds of your actual setup (the real app, the real mic, the real monitor), play it
          back, and check three things: the picture shows what you expect, your voice is on the
          track, and any on-screen sound made it in. If all three pass, a longer recording will
          almost certainly pass too.
        </p>
      </GuideSection>

      <GuideSection id="black-screen" title="Black screen: causes and fixes">
        <ul>
          <li>
            <strong>Protected (DRM) content is blanked by design.</strong> Streaming apps and
            browser tabs playing DRM-protected video (Netflix, Disney+, and similar) tell Windows
            to exclude their pixels from capture, so the recording shows black where the video
            was. No recorder setting fixes this; it is intentional platform behavior, not a bug.
          </li>
          <li>
            <strong>The wrong monitor is selected.</strong> On multi-monitor setups it is easy to
            record Display 1 while the action happens on Display 2. Check the capture source
            (and the preview, if your recorder has one) before starting.
          </li>
          <li>
            <strong>Window capture of a minimized window.</strong> A minimized window stops
            drawing, so its capture goes black or freezes. Keep the captured window restored and
            visible for the whole take, even if you are working elsewhere.
          </li>
          <li>
            <strong>Games in exclusive fullscreen.</strong> Exclusive fullscreen can bypass window
            capture entirely. Two reliable fixes: switch the game to borderless windowed mode, or
            capture the whole monitor instead of the game window.
          </li>
          <li>
            <strong>Laptop hybrid graphics.</strong> On laptops with both integrated and discrete
            GPUs, an app rendering on one GPU while capture runs on the other can produce black
            frames. Updating GPU drivers and setting the recorded app and the recorder to the same
            GPU (Windows Settings &gt; System &gt; Display &gt; Graphics) usually resolves it.
          </li>
          <li>
            <strong>Secure prompts never appear.</strong> UAC elevation prompts render on a secure
            desktop that capture cannot see; the recording goes dark for a moment by design.
          </li>
        </ul>
        <p>
          In FastCast, the live preview shows the selected monitor or window before you record, so
          a wrong source or a minimized window is visible before the take instead of after it. The
          preview is a lightweight snapshot path rather than the recording pipeline itself, which
          is why the 30-second test recording above is still the final word.
        </p>
      </GuideSection>

      <GuideSection id="no-audio" title="Missing audio: causes and fixes">
        <p>Silent recordings split into two cases: no microphone, or no system sound.</p>
        <ul>
          <li>
            <strong>Wrong microphone selected.</strong> Laptops, webcams, and headsets each bring
            their own mic, and Windows or the recorder can be pointed at the dead one. Pick the
            device explicitly and watch the level meter move while you speak; a meter that stays
            flat means the wrong device, not a quiet voice.
          </li>
          <li>
            <strong>The mic is muted somewhere.</strong> Check three places: a hardware mute
            switch on the headset, the recorder's own mute control, and Windows Settings &gt;
            System &gt; Sound &gt; Input. Any one of them silences the track.
          </li>
          <li>
            <strong>Desktop audio is capturing the wrong output.</strong> System-sound capture
            follows a specific output device. If Windows plays through your headset while the
            recorder captures the speakers, the track is silent. Match the capture device to
            where the sound actually plays.
          </li>
          <li>
            <strong>Nothing was playing.</strong> A desktop-audio meter shows signal only while
            sound plays. FastCast marks this state explicitly ("No signal" on the desktop level),
            which distinguishes "wrong device" from "nothing to hear yet."
          </li>
          <li>
            <strong>Bluetooth headsets switch profiles.</strong> When a Bluetooth headset's mic
            activates, many switch from high-quality stereo to a low-quality headset profile, and
            captured desktop audio can drop or degrade. A wired headset or separate USB mic avoids
            the problem entirely.
          </li>
        </ul>
        <InlineCta>
          FastCast shows live microphone and desktop-audio levels before you record: if the meters
          move, the sound is being captured. That one glance replaces most audio troubleshooting.
        </InlineCta>
      </GuideSection>

      <GuideSection id="huge-files" title="Recordings that are too large">
        <p>
          File size scales with resolution, frame rate, and duration, so the fixes are the same
          levers in the other direction:
        </p>
        <ul>
          <li>
            <strong>Downscale the output.</strong> Recording a 1440p or 4K monitor at passthrough
            keeps every pixel and pays for it in size. FastCast can downscale output to 1080p or
            720p, which is plenty for most tutorials and bug reports.
          </li>
          <li>
            <strong>Record 30 fps unless motion needs 60.</strong> Halving the frame rate roughly
            halves the encoding work and substantially shrinks the file.
          </li>
          <li>
            <strong>Record shorter takes.</strong> Several focused clips beat one marathon file,
            for size and for editing.
          </li>
          <li>
            <strong>Compress after recording.</strong> If a finished MP4 still misses a Discord or
            email limit, a compressor like <a href="/fastcompress">FastCompress</a> can hit a
            target size without re-recording.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="fastcast-preflight" title="The FastCast pre-flight check">
        <p>FastCast puts the whole checklist on one screen before you record:</p>
        <ol>
          <li>Pick the monitor or window and confirm the live preview shows it.</li>
          <li>Speak and watch the microphone level move; check the mute state.</li>
          <li>
            Play a second of sound and confirm the desktop level reacts instead of reading
            &quot;No signal.&quot;
          </li>
          <li>If you use the webcam overlay, confirm the camera preview is live.</li>
          <li>Record the 30-second test, play it back, then record for real.</li>
        </ol>
        <p>
          If something still goes wrong, FastCast's Save Support Bundle button collects redacted
          local logs you can send with a bug report; nothing is uploaded automatically.
        </p>
      </GuideSection>

      <GuideSection id="limits" title="Limits and honest caveats">
        <ul>
          <li>
            No recorder can capture DRM-protected video or secure desktops; black frames there are
            platform policy, not a recorder defect.
          </li>
          <li>
            FastCast records the microphone and desktop audio you select before recording; it does
            not remix or recover audio that was never captured.
          </li>
          <li>
            FastCast's hardware encoding is tested on NVIDIA and AMD GPUs. Intel hardware encoding
            is not broadly validated yet, and the software fallback is much slower; if recordings
            stutter rather than go black, see{' '}
            <a href={guidePath('screen-recording-without-lag')}>reducing lag while screen recording</a>.
          </li>
          <li>
            The Open Beta build is unsigned, so SmartScreen may warn on first run.
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
