import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'prepare', label: 'Before you stream' },
  { id: 'connection', label: 'Get Kick connection details' },
  { id: 'settings', label: 'Use current Kick settings' },
  { id: 'fastcast', label: 'Configure FastCast' },
  { id: 'test-live', label: 'Test and go live' },
  { id: 'troubleshoot', label: 'Troubleshooting' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="stream-to-kick-windows"
      toc={toc}
      lede={
        <>
          To stream on Kick from Windows, copy the Stream URL and Key from Kick&apos;s Creator
          Dashboard, configure the screen and audio in FastCast, and check the resulting channel
          from a second device. Kick&apos;s current encoder requirements are specific, so verify them
          before every important broadcast.
        </>
      }
      topCtaNote="FastCast combines monitor or window capture, microphone, desktop audio, optional webcam, and Kick streaming in one native Windows app."
      finalCtaHeading="Connect one Kick stream"
      finalCtaBody="Download the FastCast Open Beta, paste the current Kick connection details, and run a short controlled check before the real broadcast. 1080p30 streaming will stay free."
    >
      <GuideSection id="prepare" title="Prepare the Kick channel and Windows PC">
        <ul>
          <li>Confirm the Kick account can stream and complete any requirements currently shown in the Creator Dashboard.</li>
          <li>Use Edit Stream Info to set the title and category before going live.</li>
          <li>Use Ethernet where possible and pause other uploads.</li>
          <li>Close private windows, messages, and notifications visible on the capture source.</li>
          <li>Use headphones when checking the channel so its delayed audio does not loop into the stream.</li>
        </ul>
        <p>
          Start with the{' '}
          <a href={guidePath('how-to-stream-on-windows')}>complete Windows live-streaming workflow</a>{' '}
          if this is your first encoder-based broadcast.
        </p>
      </GuideSection>

      <GuideSection id="connection" title="Get the Kick Stream URL and Key">
        <ol>
          <li>Open Kick and enter the Creator Dashboard.</li>
          <li>Open Channel.</li>
          <li>Copy the Stream URL and Stream Key shown there.</li>
          <li>Keep the key hidden. Reset or replace it immediately if it appears in a screenshot, recording, or message.</li>
        </ol>
        <p>
          Copy both values from the same Kick channel and session. A correct key paired with the
          wrong platform or server URL will not authenticate.
        </p>
      </GuideSection>

      <GuideSection id="settings" title="Use Kick's current encoder requirements">
        <p>Kick&apos;s official setup guide currently specifies:</p>
        <ul>
          <li>H.264 or x264 video encoding, with constant bitrate (CBR).</li>
          <li>A 2-second keyframe interval.</li>
          <li>A maximum video bitrate of 8,000 kbps.</li>
          <li>A maximum output of 1920 × 1080 at 60 fps.</li>
          <li>Stereo audio at 48 kHz or lower.</li>
        </ul>
        <p>
          These are platform limits, not a recommendation to use the maximum. Choose a lower
          bitrate, resolution, or frame rate when the upload connection or PC cannot hold the
          maximum steadily. Recheck{' '}
          <a href="https://help.kick.com/en/articles/7066931-how-to-stream-on-kick-com">Kick&apos;s official setup guide</a>{' '}
          because platform requirements can change.
        </p>
      </GuideSection>

      <GuideSection id="fastcast" title="Configure Kick in FastCast">
        <ol>
          <li>Choose the monitor or individual window to capture.</li>
          <li>Select the microphone and desktop-audio devices needed for the stream.</li>
          <li>Add the optional webcam and choose the screen/camera layout.</li>
          <li>Choose the Kick destination and verify that its server URL matches Kick&apos;s current Stream URL.</li>
          <li>Paste the Stream Key into the separate key field.</li>
          <li>Choose output settings that meet Kick&apos;s current requirements and leave upload headroom.</li>
        </ol>
        <InlineCta>
          If the connection is the uncertain part, use the guide to{' '}
          <a href={guidePath('choose-live-streaming-bitrate')}>choosing a sustainable streaming bitrate</a>.
        </InlineCta>
      </GuideSection>

      <GuideSection id="test-live" title="Test the Kick stream and go live">
        <p>
          The official Kick documentation reviewed for this guide does not describe a private,
          unlisted, or Inspector-style encoder test. Do not assume a hidden mode exists.
        </p>
        <ol>
          <li>First make a short local recording with the same capture, microphone, desktop audio, webcam, resolution, and frame rate.</li>
          <li>Review that file for black capture, missing sound, clipped speech, and layout problems.</li>
          <li>Confirm the Kick title and category, then start a short controlled live check.</li>
          <li>Open the channel on a second device with headphones and verify the live result.</li>
          <li>Stop promptly if the channel, picture, or sound is wrong, then correct one setting at a time.</li>
        </ol>
        <p>
          See <a href={guidePath('test-live-stream-without-going-public')}>safe live-stream testing options</a>{' '}
          for the differences among YouTube, Twitch, and Kick.
        </p>
      </GuideSection>

      <GuideSection id="troubleshoot" title="Troubleshoot Kick streaming on Windows">
        <ul>
          <li><strong>Cannot connect:</strong> re-copy both values from Creator Dashboard &gt; Channel, remove stray spaces, and confirm the key was not reset.</li>
          <li><strong>Kick rejects the feed:</strong> check H.264/x264, CBR, the 2-second keyframe interval, and the current resolution, frame-rate, bitrate, and audio limits.</li>
          <li><strong>Stream buffers or lags:</strong> Kick recommends upload capacity of at least twice the stream bitrate. Its troubleshooting guide suggests lowering bitrate in 1,000 kbps steps when needed.</li>
          <li><strong>Black or silent stream:</strong> test a local recording, reselect the monitor or window, and verify both audio meters before reconnecting.</li>
          <li><strong>Repeated disconnects:</strong> use Ethernet, stop competing uploads, and follow the <a href={guidePath('fix-live-stream-dropping-buffering')}>dropping and buffering diagnosis</a>.</li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
