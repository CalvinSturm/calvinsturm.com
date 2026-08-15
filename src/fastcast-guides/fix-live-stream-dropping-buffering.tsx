import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'identify', label: 'Identify the failing side' },
  { id: 'network', label: 'Fix upload instability' },
  { id: 'encoder', label: 'Reduce encoder load' },
  { id: 'destination', label: 'Check destination settings' },
  { id: 'audio-video', label: 'Fix black or silent output' },
  { id: 'test-order', label: 'Change settings in order' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="fix-live-stream-dropping-buffering"
      toc={toc}
      lede={
        <>
          A live stream usually drops or buffers because the upload cannot sustain the selected
          bitrate, the PC cannot encode each frame in time, or the destination rejects or loses
          the feed. Check platform health data first, then lower bitrate, stabilize the network,
          and reduce encoder load one change at a time.
        </>
      }
      topCtaNote="FastCast keeps capture, audio, webcam, encoder, and RTMP/RTMPS destination settings together so you can isolate a problem without rebuilding a scene."
      finalCtaHeading="Retest with a smaller, steadier stream"
      finalCtaBody="Start with Ethernet and a conservative bitrate, then test the exact FastCast capture and audio setup before the next public broadcast."
    >
      <GuideSection id="identify" title="Separate network trouble from encoder trouble">
        <ul>
          <li><strong>Dropped network frames, bitrate swings, reconnects, or platform ingest warnings</strong> point to upload capacity, Wi-Fi, routing, or the server connection.</li>
          <li><strong>Encoder lag, skipped frames, a frozen preview, or high GPU/CPU load</strong> point to resolution, frame rate, webcam composition, or another demanding app.</li>
          <li><strong>A stable encoder and upload but buffering on one viewer device</strong> may be a playback connection or platform delivery issue.</li>
          <li><strong>Immediate authentication failure</strong> points to the stream key, server URL, or destination settings rather than bandwidth.</li>
        </ul>
        <p>Write down which signal fails. Solving all four categories at once makes the cause harder to see.</p>
      </GuideSection>

      <GuideSection id="network" title="Stabilize the Windows PC's upload">
        <ol>
          <li>Connect by Ethernet. If Wi-Fi is unavoidable, move closer to the access point and use an uncongested band.</li>
          <li>Pause cloud sync, backups, file transfers, game downloads, and uploads from other devices.</li>
          <li>Run several upload tests and use the lower sustained result.</li>
          <li>Lower video bitrate and retest. Do not set bitrate equal to the full measured upload speed.</li>
          <li>Restart the modem or router if the connection has become unstable across devices.</li>
          <li>Try the platform&apos;s current recommended or alternate ingest path when it offers one.</li>
        </ol>
        <p>
          Kick&apos;s current troubleshooting guidance recommends upload speed at least twice the
          stream bitrate and suggests reducing bitrate in 1,000 kbps steps when buffering persists.
          Other platforms may publish different current guidance.
        </p>
      </GuideSection>

      <GuideSection id="encoder" title="Reduce capture and encoder load">
        <ol>
          <li>Close games, browsers, video editors, and GPU-heavy apps that are not part of the stream.</li>
          <li>Lower 60 fps to 30 fps, especially for presentations, tutorials, and static desktop work.</li>
          <li>Lower 1080p to 720p when the PC or connection still cannot hold real time.</li>
          <li>Disable the webcam temporarily to see whether camera capture or composition is the trigger.</li>
          <li>Capture one window instead of an entire high-resolution display when that still shows the required content.</li>
          <li>Use hardware H.264 encoding on supported hardware; software encoding is more CPU intensive.</li>
        </ol>
        <InlineCta>
          The local performance checks in{' '}
          <a href={guidePath('screen-recording-without-lag')}>reducing screen-recording lag</a>{' '}
          also help separate capture load from a network problem.
        </InlineCta>
      </GuideSection>

      <GuideSection id="destination" title="Check the stream key, server URL, and platform limits">
        <ul>
          <li>Copy the key again and remove spaces or accidental punctuation.</li>
          <li>Use the server URL currently shown by the same platform and channel.</li>
          <li>Do not pair one platform&apos;s URL with another platform&apos;s key.</li>
          <li>Use RTMPS when the platform provides it.</li>
          <li>Confirm codec, CBR or other rate-control requirements, keyframe interval, maximum bitrate, resolution, frame rate, and audio format against current official guidance.</li>
          <li>Reset the stream key immediately if it was exposed. The old value should then be replaced in FastCast.</li>
        </ul>
        <p>
          Use the platform guides for{' '}
          <a href={guidePath('stream-to-youtube-rtmps-windows')}>YouTube</a>,{' '}
          <a href={guidePath('stream-to-twitch-windows')}>Twitch</a>, or{' '}
          <a href={guidePath('stream-to-kick-windows')}>Kick</a> rather than assuming their settings are identical.
        </p>
      </GuideSection>

      <GuideSection id="audio-video" title="Fix a live stream that is black or silent">
        <ul>
          <li><strong>Black video:</strong> reselect the monitor or app window, make sure it is visible, and test a local recording. DRM-protected content may be blank by design.</li>
          <li><strong>No microphone:</strong> select the intended input, check Windows microphone permission, and confirm the input meter moves.</li>
          <li><strong>No desktop audio:</strong> select the correct output device and play a test sound before connecting.</li>
          <li><strong>Echo:</strong> use headphones or mute the delayed platform preview so it is not captured again.</li>
          <li><strong>Audio but frozen video:</strong> lower encoder load and restart the stream after checking resolution, frame rate, and hardware encoding.</li>
        </ul>
        <p>
          For the capture side, see the{' '}
          <a href={guidePath('screen-recording-black-screen-no-audio')}>Windows black-screen and no-audio checklist</a>.
        </p>
      </GuideSection>

      <GuideSection id="test-order" title="Change settings in a useful order">
        <ol>
          <li>Record locally with the same sources. If it fails, fix capture or encoder load first.</li>
          <li>Use Ethernet and stop other uploads.</li>
          <li>Lower bitrate.</li>
          <li>Lower frame rate, then resolution, if the encoder or connection still fails.</li>
          <li>Re-copy destination details and check current platform requirements.</li>
          <li>Run the destination&apos;s safest available test and watch its health report.</li>
          <li>Restore quality only after the smaller stream remains stable.</li>
        </ol>
        <p>
          Return to the{' '}
          <a href={guidePath('how-to-stream-on-windows')}>main Windows streaming guide</a>{' '}
          once the test holds steady.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
