import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'how-streaming-works', label: 'How live streaming works' },
  { id: 'prepare', label: 'Prepare the Windows PC' },
  { id: 'sources', label: 'Choose screen, audio, and webcam' },
  { id: 'connect', label: 'Connect the streaming platform' },
  { id: 'platforms', label: 'YouTube, Twitch, and Kick' },
  { id: 'test', label: 'Test before going public' },
  { id: 'troubleshoot', label: 'Troubleshooting' },
  { id: 'software', label: 'FastCast or other software' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="how-to-stream-on-windows"
      toc={toc}
      lede={
        <>
          To live stream from a Windows PC, choose what viewers should see and hear, connect your
          streaming software to YouTube, Twitch, or Kick with the platform&apos;s server URL and stream
          key, and test the feed before making it public. FastCast puts screen, audio, webcam, and
          RTMP streaming in one focused Windows app, but the same basic workflow applies to other
          encoders too.
        </>
      }
      topCtaNote="FastCast is a native Windows screen recorder and live streamer. Choose a monitor or window, microphone, desktop audio, and optional webcam, then stream over RTMP or encrypted RTMPS."
      finalCtaHeading="Set up one stream, then test it"
      finalCtaBody="Download the FastCast Open Beta for Windows 10/11 x64. Pick your sources, connect one destination, and run a short test. 1080p30 recording and streaming will stay free."
    >
      <GuideSection id="how-streaming-works" title="How live streaming from a PC works">
        <p>Four pieces connect your Windows PC to an audience:</p>
        <ul>
          <li><strong>The platform</strong> hosts the broadcast and viewer page. YouTube, Twitch, and Kick each manage titles, visibility, chat, and channel permissions in their own dashboard.</li>
          <li><strong>Streaming software</strong> captures the picture and sound, compresses them in real time, and sends the result to the platform.</li>
          <li><strong>The ingest or server URL</strong> tells the software which platform server should receive the feed.</li>
          <li><strong>The stream key</strong> identifies and authorizes your channel. Treat it like a password: never show it on screen, paste it into chat, or include it in a screenshot.</li>
        </ul>
        <p>
          RTMP is the common delivery protocol between an encoder and a streaming platform. RTMPS
          is the encrypted form. Use an <code>rtmps://</code> server URL when the platform provides
          one so the connection, including the key, is protected in transit.
        </p>
      </GuideSection>

      <GuideSection id="prepare" title="Prepare the Windows PC and connection">
        <ol>
          <li>Confirm the channel is allowed to stream. YouTube says first-time activation can take up to 24 hours, so do this before the planned broadcast.</li>
          <li>Use Ethernet when possible. Pause cloud backups, game downloads, and other large uploads.</li>
          <li>Close messages, password managers, private tabs, and notifications that the selected monitor could expose.</li>
          <li>Test the microphone in Windows Settings &gt; System &gt; Sound.</li>
          <li>Keep headphones ready so the platform preview does not loop back through desktop audio.</li>
        </ol>
        <p>
          Measure upload speed more than once. A connection that briefly reaches a high number can
          still be unstable. Leave headroom instead of setting video bitrate at the full measured
          upload rate; the guide to{' '}
          <a href={guidePath('choose-live-streaming-bitrate')}>choosing a live-stream bitrate</a>{' '}
          explains the tradeoff.
        </p>
      </GuideSection>

      <GuideSection id="sources" title="Choose the screen, microphone, desktop audio, and webcam">
        <ol>
          <li><strong>Choose a monitor</strong> when viewers need to follow work across several apps. Everything visible on that display can appear in the stream.</li>
          <li><strong>Choose an individual window</strong> for one application and a tighter privacy boundary.</li>
          <li><strong>Select the microphone</strong> for narration, then speak normally and confirm its meter moves without clipping.</li>
          <li><strong>Select desktop audio</strong> when viewers need to hear a game, presentation, browser, or app. Turn it off when computer sound adds nothing.</li>
          <li><strong>Add the optional webcam</strong> and place it where it does not cover controls, captions, or the task you are demonstrating.</li>
        </ol>
        <InlineCta>
          For layout and framing details, use the focused guide to{' '}
          <a href={guidePath('stream-screen-webcam-windows')}>streaming a screen and webcam together</a>.
        </InlineCta>
      </GuideSection>

      <GuideSection id="connect" title="Connect FastCast to the streaming platform">
        <ol>
          <li>Open the platform&apos;s creator or live dashboard and create or select a broadcast.</li>
          <li>Copy its server or ingest URL and stream key. The fields may be shown together, separately, or partly filled by a platform preset.</li>
          <li>In FastCast, choose YouTube, Twitch, Kick, or the custom RTMP/RTMPS destination.</li>
          <li>Check the server URL. Then paste the key into the separate stream-key field.</li>
          <li>Choose resolution, frame rate, and bitrate within that platform&apos;s current guidance and your connection&apos;s stable capacity.</li>
          <li>Start the stream in FastCast and confirm the preview or connection status in the platform dashboard.</li>
          <li>Complete the platform&apos;s own Go Live step when it requires one.</li>
        </ol>
        <p>
          FastCast does not log into the platform, and stream keys are session-only unless you
          opt in to storing them in Windows Credential Manager. Titles,
          categories, audience controls, scheduling, and final publication remain in the platform
          dashboard.
        </p>
      </GuideSection>

      <GuideSection id="platforms" title="YouTube, Twitch, and Kick are not identical">
        <ul>
          <li>
            <strong>YouTube:</strong> configure the stream in YouTube Studio, prefer the supplied
            RTMPS URL, and use Private or Unlisted visibility for a controlled rehearsal. Follow{' '}
            <a href={guidePath('stream-to-youtube-rtmps-windows')}>the Windows YouTube streaming guide</a>.
          </li>
          <li>
            <strong>Twitch:</strong> get the primary stream key from the Creator Dashboard. Twitch
            Inspector provides a bandwidth-test mode that does not send normal live notifications.
            Follow <a href={guidePath('stream-to-twitch-windows')}>the Windows Twitch setup</a>.
          </li>
          <li>
            <strong>Kick:</strong> copy the current Stream URL and Key from Kick&apos;s Creator
            Dashboard and keep its required encoder settings in mind. Follow{' '}
            <a href={guidePath('stream-to-kick-windows')}>the Windows Kick setup</a>.
          </li>
        </ul>
        <p>
          Dashboard labels, requirements, and encoder limits can change. Use the current official
          platform guidance instead of assuming settings that work on one service are valid on all three.
        </p>
      </GuideSection>

      <GuideSection id="test" title="Test video, audio, and stability before going public">
        <ol>
          <li>Use the safest test mode the platform offers: YouTube Private or Unlisted, Twitch Inspector bandwidth test, or a short controlled Kick check after verifying locally.</li>
          <li>Show real motion, speak into the microphone, and play a short desktop-audio sample.</li>
          <li>Watch from a second device with headphones. Confirm framing, sound balance, delay, and readable text.</li>
          <li>Let the test run long enough to expose unstable upload speed or heat-related encoder trouble.</li>
          <li>Stop, review the platform health report or replay, and change one setting at a time.</li>
        </ol>
        <p>
          The platform-specific differences matter. See{' '}
          <a href={guidePath('test-live-stream-without-going-public')}>how to test a live stream without going public</a>{' '}
          before relying on a hidden test mode that may not exist on your destination.
        </p>
      </GuideSection>

      <GuideSection id="troubleshoot" title="Fix common Windows live-streaming problems">
        <ul>
          <li><strong>Invalid stream key:</strong> copy it again without spaces. Make sure it belongs to the intended channel and reset it if it was revoked or exposed.</li>
          <li><strong>Wrong ingest URL:</strong> use the URL currently shown by the same platform dashboard. Do not mix a YouTube URL with a Twitch or Kick key.</li>
          <li><strong>Missing microphone or desktop audio:</strong> select each source explicitly, check Windows privacy and device settings, then verify meters before streaming.</li>
          <li><strong>Black capture:</strong> reselect the monitor or window, make sure the app is visible, and remember that DRM-protected video can be blank by design.</li>
          <li><strong>Buffering or dropped frames:</strong> lower bitrate first, then resolution or frame rate; stop other uploads and use Ethernet. Work through the <a href={guidePath('fix-live-stream-dropping-buffering')}>dropping and buffering checklist</a>.</li>
          <li><strong>Exposed stream key:</strong> stop streaming, reset the key in the platform dashboard immediately, and replace it anywhere it was configured.</li>
        </ul>
      </GuideSection>

      <GuideSection id="software" title="Use FastCast for a focused stream, OBS for advanced production">
        <p>
          This workflow is useful with any Windows live-streaming software. FastCast simplifies a
          common single-scene job: one monitor or window, microphone and desktop audio, an optional
          webcam, and one RTMP/RTMPS destination. You can record locally, stream, or do both without
          building an OBS scene first.
        </p>
        <p>
          OBS remains the better choice for advanced scene collections, multiple layered sources,
          plugins, filters, chroma key, alerts, and complex productions. FastCast is not positioned
          as a complete OBS replacement. Read the{' '}
          <a href={guidePath('obs-alternative-windows')}>honest FastCast and OBS comparison</a>{' '}
          if those needs are part of the broadcast.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
