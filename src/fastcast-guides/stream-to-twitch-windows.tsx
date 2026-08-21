import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'prepare', label: 'Before you stream' },
  { id: 'connection', label: 'Get Twitch connection details' },
  { id: 'fastcast', label: 'Configure FastCast' },
  { id: 'test', label: 'Test with Twitch Inspector' },
  { id: 'live', label: 'Go live' },
  { id: 'troubleshoot', label: 'Troubleshooting' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="stream-to-twitch-windows"
      toc={toc}
      lede={
        <>
          To stream on Twitch from Windows, get the channel&apos;s primary stream key, choose what
          FastCast should capture, connect the stream, and test the upload with Twitch Inspector
          before announcing it. Keep the key private: it authorizes software to broadcast to your channel.
        </>
      }
      topCtaNote="FastCast sends a monitor or window, microphone, desktop audio, and optional webcam to Twitch from one focused Windows setup. 1080p30 streaming will stay free."
      finalCtaHeading="Test the Twitch connection"
      finalCtaBody="Download the FastCast Open Beta, configure your Twitch destination, and run a bandwidth test before the real broadcast. FastCast keeps your stream key for the session only unless you opt in to storing it in Windows Credential Manager."
    >
      <GuideSection id="prepare" title="Prepare the Twitch channel and Windows PC">
        <ul>
          <li>Confirm the Twitch account can broadcast and complete any requirements shown by Twitch.</li>
          <li>Set the stream title, category, tags, and other channel details in Twitch&apos;s Creator Dashboard.</li>
          <li>Use Ethernet if possible, stop large uploads, and close private windows or notifications.</li>
          <li>Choose headphones for monitoring so the Twitch preview does not feed back into desktop audio.</li>
        </ul>
        <p>
          If server URLs, stream keys, and RTMP are unfamiliar, read{' '}
          <a href={guidePath('how-to-stream-on-windows')}>how live streaming on Windows works</a>{' '}
          before continuing.
        </p>
      </GuideSection>

      <GuideSection id="connection" title="Get the Twitch stream key and server details">
        <ol>
          <li>Open the Twitch Creator Dashboard.</li>
          <li>Go to Settings, then Stream.</li>
          <li>Find the Primary Stream Key and copy it only when you are ready to paste it into the encoder.</li>
          <li>Use FastCast&apos;s Twitch destination, which fills the platform server URL, or use the current Twitch ingest URL if you are configuring a custom destination.</li>
        </ol>
        <p>
          Twitch&apos;s official{' '}
          <a href="https://help.twitch.tv/s/article/twitch-stream-key-faq?language=en_US">stream-key FAQ</a>{' '}
          describes the key as the identifier that lets an encoder send a stream to your channel.
          Never display it in a capture, support post, or screenshot. Reset it in the dashboard if
          it is exposed.
        </p>
      </GuideSection>

      <GuideSection id="fastcast" title="Configure screen, audio, and Twitch in FastCast">
        <ol>
          <li>Choose the monitor or individual window viewers should see.</li>
          <li>Select the microphone and confirm its input meter responds.</li>
          <li>Select desktop audio only when the stream needs app, game, or presentation sound.</li>
          <li>Add the optional webcam overlay and place it away from important content.</li>
          <li>Choose the Twitch destination and paste the Primary Stream Key.</li>
          <li>Set a resolution, frame rate, and bitrate that stay within Twitch&apos;s current guidance and your stable upload capacity.</li>
        </ol>
        <InlineCta>
          Need help balancing the picture and connection? See{' '}
          <a href={guidePath('choose-live-streaming-bitrate')}>how to choose a live-stream bitrate</a>.
        </InlineCta>
      </GuideSection>

      <GuideSection id="test" title="Run a Twitch Inspector bandwidth test">
        <p>
          Twitch Inspector can test connection quality without a normal public broadcast. Twitch&apos;s
          documented bandwidth-test mode appends <code>?bandwidthtest=true</code> to the stream key.
          Keep the base key secret even when adding that parameter.
        </p>
        <ol>
          <li>Sign in to <a href="https://inspector.twitch.tv/">Twitch Inspector</a>.</li>
          <li>Temporarily add <code>?bandwidthtest=true</code> to the end of the key pasted into FastCast.</li>
          <li>Start streaming and let the test run through real motion, microphone speech, and desktop audio.</li>
          <li>Watch Inspector for unstable bitrate or connection interruptions.</li>
          <li>Stop the test and remove the bandwidth-test parameter before the real broadcast.</li>
        </ol>
        <p>
          Twitch&apos;s{' '}
          <a href="https://help.twitch.tv/s/article/guide-to-using-twitch-inspector">Inspector guide</a>{' '}
          says this mode prevents the channel from appearing online and prevents normal live
          notifications, but no video is viewable. Use a short normal stream as well when you must
          confirm the final picture and audio reaching viewers.
        </p>
      </GuideSection>

      <GuideSection id="live" title="Go live on Twitch">
        <ol>
          <li>Verify the title, category, and channel information in Twitch.</li>
          <li>Make sure the key in FastCast no longer contains the Inspector test parameter.</li>
          <li>Start streaming in FastCast.</li>
          <li>Open the channel from a second device with headphones and confirm picture, sound, and layout.</li>
          <li>When finished, stop the stream in FastCast and confirm the channel is offline.</li>
        </ol>
      </GuideSection>

      <GuideSection id="troubleshoot" title="Troubleshoot a Twitch stream from Windows">
        <ul>
          <li><strong>Authentication failed:</strong> copy the Primary Stream Key again, remove spaces, and reset it if there is any chance it was exposed.</li>
          <li><strong>Inspector sees no stream:</strong> confirm the Twitch server selection and place <code>?bandwidthtest=true</code> after the complete key.</li>
          <li><strong>Channel never goes live:</strong> remove the bandwidth-test parameter; it is deliberately a non-public test mode.</li>
          <li><strong>Unstable bitrate or dropped frames:</strong> use Ethernet, stop other uploads, and lower bitrate. Continue with the <a href={guidePath('fix-live-stream-dropping-buffering')}>stream stability checklist</a>.</li>
          <li><strong>Black or silent output:</strong> reselect the capture and audio sources, check Windows permissions, and test locally before reconnecting.</li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
