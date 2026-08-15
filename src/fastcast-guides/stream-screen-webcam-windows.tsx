import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'plan', label: 'Plan the layout' },
  { id: 'prepare', label: 'Prepare camera and audio' },
  { id: 'fastcast', label: 'Configure FastCast' },
  { id: 'test', label: 'Test the combined feed' },
  { id: 'problems', label: 'Common problems' },
  { id: 'advanced', label: 'When you need more control' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="stream-screen-webcam-windows"
      toc={toc}
      lede={
        <>
          To stream your screen and webcam at the same time on Windows, select a monitor or app
          window as the main capture, enable a webcam layout, choose microphone and desktop audio,
          then test the combined frame on the destination. Keep your face visible without covering
          the task viewers came to see.
        </>
      }
      topCtaNote="FastCast includes four focused screen-and-camera layouts. Choose the capture, audio, and webcam in one window, then record, stream, or do both."
      finalCtaHeading="Put the screen first and the camera where it helps"
      finalCtaBody="Try the FastCast Open Beta on Windows 10/11 x64. Choose one focused layout, test the audio balance, and connect YouTube, Twitch, Kick, or another RTMP destination."
    >
      <GuideSection id="plan" title="Choose a layout around the content">
        <ul>
          <li><strong>Screen with camera:</strong> use the screen as the main view and place your camera over a quiet corner. This fits tutorials, games, and product demos.</li>
          <li><strong>Camera with screen:</strong> make the presenter primary and keep the screen visible as supporting context.</li>
          <li><strong>Screen only:</strong> remove the camera when it covers detail or adds nothing to the explanation.</li>
          <li><strong>Camera only:</strong> use it for a direct introduction or discussion without screen content.</li>
        </ul>
        <p>
          Inspect the application before choosing a corner. Chat, minimaps, slide captions, menus,
          and confirmation buttons often occupy the edges. A webcam that covers them makes a stream
          harder to follow even when the camera framing looks good.
        </p>
      </GuideSection>

      <GuideSection id="prepare" title="Prepare the webcam, microphone, and room">
        <ol>
          <li>Close other apps that may be using the webcam.</li>
          <li>Place the camera near eye level and light your face from the front rather than from a bright window behind you.</li>
          <li>Select the intended microphone in Windows Settings and speak at normal volume.</li>
          <li>Decide whether viewers need desktop audio. Leave it off for silent software walkthroughs.</li>
          <li>Use headphones when the stream includes a monitored preview or call audio.</li>
          <li>Close notifications and private content visible on the monitor.</li>
        </ol>
      </GuideSection>

      <GuideSection id="fastcast" title="Configure the screen and webcam in FastCast">
        <ol>
          <li>Choose a monitor when viewers need to follow several applications, or an individual window for one focused app.</li>
          <li>Choose the webcam device and enable the desired screen/camera layout.</li>
          <li>Select the microphone and watch its meter for silence or clipping.</li>
          <li>Select desktop audio when the app or game sound belongs in the broadcast.</li>
          <li>Choose resolution, frame rate, and a sustainable streaming bitrate.</li>
          <li>Connect the destination with its server URL and private stream key.</li>
          <li>Start a test and inspect the final platform preview, not only the local view.</li>
        </ol>
        <InlineCta>
          The complete platform connection sequence is in{' '}
          <a href={guidePath('how-to-stream-on-windows')}>how to stream on Windows</a>.
        </InlineCta>
      </GuideSection>

      <GuideSection id="test" title="Test the combined picture and sound">
        <ul>
          <li>Move the cursor and open menus near the webcam corner to make sure it hides nothing essential.</li>
          <li>Speak while desktop audio plays. Your voice should remain understandable without the computer sound disappearing entirely.</li>
          <li>Move naturally and watch for camera or screen stutter.</li>
          <li>Check the stream on a phone or second computer with headphones.</li>
          <li>Verify that the selected monitor contains no private notifications, tabs, or account details.</li>
        </ul>
        <p>
          Use the destination-specific options in{' '}
          <a href={guidePath('test-live-stream-without-going-public')}>the private stream-testing guide</a>{' '}
          before inviting viewers.
        </p>
      </GuideSection>

      <GuideSection id="problems" title="Fix common screen-and-webcam problems">
        <ul>
          <li><strong>Webcam is missing:</strong> close video-call or camera apps, reselect the device, and check Windows camera permissions.</li>
          <li><strong>Camera covers important content:</strong> change the layout or reorganize the captured window before streaming.</li>
          <li><strong>Echo or doubled sound:</strong> mute the platform preview or use headphones; do not feed monitored audio back into desktop capture.</li>
          <li><strong>Voice is buried:</strong> lower app volume at the source and move the microphone closer before adding excessive gain.</li>
          <li><strong>Stream stutters after enabling the webcam:</strong> reduce frame rate or resolution and close GPU-heavy applications.</li>
          <li><strong>Black application capture:</strong> reselect the window or monitor and remember that protected video may be blank by design.</li>
        </ul>
      </GuideSection>

      <GuideSection id="advanced" title="Use a production suite when the layout needs more">
        <p>
          FastCast is designed for four focused screen-and-camera layouts, not arbitrary scene
          composition. It does not currently provide chroma key, filters, alert widgets, plugins,
          or complex multi-source scenes. OBS remains a better fit for those advanced productions.
        </p>
        <p>
          Read the <a href={guidePath('obs-alternative-windows')}>FastCast and OBS comparison</a>{' '}
          before choosing software. If the job is a local file instead of a live stream, use the
          separate guide to{' '}
          <a href={guidePath('record-screen-and-webcam')}>recording a screen and webcam together</a>.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
