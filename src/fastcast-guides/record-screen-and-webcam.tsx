import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'when-it-helps', label: 'When screen plus webcam is worth it' },
  { id: 'prepare', label: 'Camera and microphone preparation' },
  { id: 'layout', label: 'Choosing and placing the overlay' },
  { id: 'craft', label: 'Lighting, framing, and delivery' },
  { id: 'fastcast-workflow', label: 'The FastCast workflow' },
  { id: 'limits', label: 'Limitations' },
];

function Article() {
  return (
    <GuideLayout
      slug="record-screen-and-webcam"
      toc={toc}
      lede={
        <>
          Recording your screen and webcam at the same time takes a recorder that can composite
          both into one video, usually as a picture-in-picture overlay: the screen fills the frame
          and your camera sits in a corner. FastCast does this natively: choose your screen or
          window, turn on the webcam overlay, pick your audio, and record a single MP4.
        </>
      }
      topCtaNote="FastCast records a monitor or window with an optional webcam picture-in-picture overlay, plus microphone and desktop audio, straight to MP4. No scene building required."
      finalCtaHeading="Record your first screen-and-camera take"
      finalCtaBody="FastCast is free during Open Beta: unzip, choose your screen and webcam, press Record. The result is one MP4 with you and your screen in the same frame."
    >
      <GuideSection id="when-it-helps" title="When screen plus webcam is worth it">
        <p>
          A face on screen is not decoration; it changes how a video reads. Worth the overlay:
        </p>
        <ul>
          <li>
            <strong>Tutorials and courses.</strong> Learners stay engaged longer when the
            instructor is visible, and your expressions carry emphasis that narration alone loses.
          </li>
          <li>
            <strong>Product demos and pitches.</strong> A visible presenter reads as accountable
            and prepared, which matters when the video is doing sales work.
          </li>
          <li>
            <strong>Commentary and reactions.</strong> The reaction is the content; the screen is
            context.
          </li>
        </ul>
        <p>
          Skip the webcam for silent UI walkthroughs, bug reproductions, and documentation
          recordings, where a face only covers pixels. That simpler workflow is covered in{' '}
          <a href={guidePath('how-to-record-screen-windows')}>how to record your screen on Windows</a>.
        </p>
      </GuideSection>

      <GuideSection id="prepare" title="Camera and microphone preparation">
        <ol>
          <li>
            <strong>Close other apps that use the camera.</strong> Video-call apps holding the
            webcam are the usual reason a camera fails to appear in a recorder.
          </li>
          <li>
            <strong>Check Windows camera permissions.</strong> Settings &gt; Privacy &amp;
            security &gt; Camera must allow desktop apps to use the camera.
          </li>
          <li>
            <strong>Pick the right microphone.</strong> Headsets and USB mics usually beat the
            webcam's built-in mic. Confirm the input in Settings &gt; System &gt; Sound and watch
            the level meter while you speak.
          </li>
          <li>
            <strong>Decide about desktop audio.</strong> If the video you are commenting on has
            sound, capture desktop audio too; if not, leave it off so notifications cannot leak in.
          </li>
        </ol>
      </GuideSection>

      <GuideSection id="layout" title="Choosing and placing the overlay">
        <p>
          The standard layout is picture-in-picture: screen full-frame, camera in a corner. Which
          corner matters more than people expect:
        </p>
        <ul>
          <li>
            <strong>Bottom-right</strong> is the convention viewers expect, and most software
            keeps important UI away from it.
          </li>
          <li>
            <strong>Check what you will cover.</strong> Terminals write to the bottom of the
            screen; slide decks put speaker content bottom-left; video timelines live at the
            bottom edge. Walk through your actual demo once and watch where the action goes.
          </li>
          <li>
            <strong>Plan the opening layout, then switch freely.</strong> Since v0.5.0, FastCast
            has four live layouts (screen only, screen + camera, camera + screen, and camera
            only) and you can switch between them at any moment, even mid-recording or
            mid-stream, with <code>Ctrl+Alt+1-4</code>. Start the take in the layout the
            intro needs and change it as the content shifts.
          </li>
        </ul>
        <p>
          The camera-first &quot;Camera + screen&quot; layout puts your webcam full-frame with
          the screen as the inset, which suits commentary and reaction takes where you are the
          main content. The live preview updates as you switch layouts and drag the inset, and
          your layout and webcam placement are remembered across restarts.
        </p>
      </GuideSection>

      <GuideSection id="craft" title="Lighting, framing, and delivery">
        <ul>
          <li>
            <strong>Light from the front.</strong> A window or lamp in front of you (behind the
            camera) beats any amount of post-processing. Avoid a bright window behind you; it
            turns you into a silhouette.
          </li>
          <li>
            <strong>Camera at eye level.</strong> Prop the laptop or adjust the mount so the lens
            meets your eyes; looking down at a low camera reads badly at small overlay sizes.
          </li>
          <li>
            <strong>Frame tight.</strong> The overlay is small, so compose head-and-shoulders, not
            half the room.
          </li>
          <li>
            <strong>Look at the screen area you are demonstrating.</strong> In a PIP layout,
            viewers follow your attention; glancing at the camera occasionally is enough.
          </li>
          <li>
            <strong>Do a 30-second test take.</strong> Check that the overlay covers nothing
            important, both audio streams are present, and the mic level is right, then record for
            real.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="fastcast-workflow" title="The FastCast workflow">
        <ol>
          <li>Run <code>fastcast.exe</code> from the portable ZIP; nothing needs installing.</li>
          <li>Choose the monitor or window to capture.</li>
          <li>Enable the webcam picture-in-picture overlay.</li>
          <li>Select microphone and, if needed, desktop audio.</li>
          <li>
            Press Record, deliver the take, and stop with <code>Ctrl+Alt+F9</code>. The finished
            MP4 lands in your recordings folder with screen, camera, and audio already combined.
          </li>
        </ol>
        <p>
          Because everything is burned into one file, there is no post-recording compositing step:
          the MP4 is ready to upload, or to trim in any editor.
        </p>
        <InlineCta>
          FastCast's webcam overlay is on the free tier, along with 1080p30 recording, during the
          Open Beta.
        </InlineCta>
      </GuideSection>

      <GuideSection id="limits" title="Limitations">
        <ul>
          <li>
            The overlay is composited at recording time. A separate webcam track for independent
            editing later is not something FastCast produces; if you need separately editable
            tracks, record with a multi-track tool like OBS instead (see{' '}
            <a href={guidePath('obs-alternative-windows')}>the FastCast vs OBS comparison</a>).
          </li>
          <li>
            FastCast has no scene system with multiple mixed sources. The four built-in
            screen/camera layouts switch live, but you cannot compose custom scenes from
            arbitrary sources the way OBS does.
          </li>
          <li>
            Advanced camera looks (chroma key backgrounds, filters, color correction) are not
            included.
          </li>
          <li>
            Adding a webcam adds encoding work. If the recording stutters with the camera on, see{' '}
            <a href={guidePath('screen-recording-without-lag')}>reducing lag while screen recording</a>.
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
