import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'before-you-start', label: 'Before you start' },
  { id: 'youtube', label: 'Create the YouTube Live stream' },
  { id: 'fastcast', label: 'Configure FastCast' },
  { id: 'test', label: 'Run a private test' },
  { id: 'security', label: 'Protect the stream key' },
  { id: 'troubleshoot', label: 'Troubleshooting' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="stream-to-youtube-rtmps-windows"
      toc={toc}
      lede={
        <>
          Connect FastCast to YouTube Live securely using RTMPS and your stream key, then run a
          private test before broadcasting publicly. You create the broadcast in YouTube Studio;
          FastCast sends the selected Windows screen, audio, and optional webcam to it without
          logging into your YouTube account.
        </>
      }
      topCtaNote="FastCast supports encrypted RTMPS streaming to YouTube. Paste the server URL and key, choose a focused screen and camera layout, and test the feed without building an OBS scene."
      finalCtaHeading="Run a private YouTube Live test"
      finalCtaBody="Configure the stream in YouTube Studio, paste the RTMPS details into FastCast, and verify motion and audio in the Live Control Room before broadcasting publicly."
    >
      <GuideSection id="before-you-start" title="Before you start">
        <ul>
          <li>Make sure live streaming is enabled on the YouTube channel; first-time activation can require a wait.</li>
          <li>Use a wired connection where possible and stop large uploads or cloud sync.</li>
          <li>Choose a resolution, frame rate, and bitrate your upload connection can sustain.</li>
          <li>Close notifications, private windows, and anything else the selected monitor could reveal.</li>
          <li>Prepare headphones so the YouTube preview does not feed back into desktop audio.</li>
        </ul>
        <p>
          YouTube publishes current encoder recommendations for resolution, frame rate, bitrate,
          keyframe interval, and codecs in its{' '}
          <a href="https://support.google.com/youtube/answer/2853702">
            live encoder settings guide
          </a>.
        </p>
        <p>
          New to server URLs and stream keys? Start with the plain-language{' '}
          <a href={guidePath('how-to-stream-on-windows')}>Windows live-streaming workflow</a>.
        </p>
      </GuideSection>

      <GuideSection id="youtube" title="Create or select a YouTube Live stream">
        <ol>
          <li>Open YouTube Studio, choose Create, then choose Go Live to enter the Live Control Room.</li>
          <li>Create a stream or select a reusable stream configuration.</li>
          <li>For the first test, set visibility to Private or Unlisted rather than Public.</li>
          <li>Find the stream URL and stream key in the encoder setup area.</li>
          <li>Choose the RTMPS URL when YouTube provides it, then copy the URL and key separately.</li>
        </ol>
        <p>
          Treat the key as a password. Anyone who has it may be able to broadcast to the channel
          until the key is reset.
        </p>
      </GuideSection>

      <GuideSection id="fastcast" title="Configure the YouTube stream in FastCast">
        <ol>
          <li>Open FastCast and choose the monitor or window to capture.</li>
          <li>Select microphone and desktop-audio sources.</li>
          <li>Choose screen only, screen with camera, camera with screen, or camera only.</li>
          <li>Set output resolution and frame rate to match the YouTube plan and available bandwidth.</li>
          <li>Select the YouTube preset or paste the copied RTMPS server URL.</li>
          <li>Paste the stream key into its separate field.</li>
          <li>Start streaming, then watch for the preview in YouTube&apos;s Live Control Room.</li>
        </ol>
        <p>
          FastCast uses the YouTube endpoint rather than a YouTube account login. You still
          control the title, visibility, audience, scheduling, and final Go Live action in YouTube.
        </p>
      </GuideSection>

      <GuideSection id="test" title="Run a private or unlisted test first">
        <ol>
          <li>Include real motion, microphone speech, and a section with desktop audio.</li>
          <li>Watch the YouTube preview for dropped frames, delay, incorrect layout, or silence.</li>
          <li>Listen on a second device or through headphones to verify both audio sources.</li>
          <li>Stop after two or three minutes and review YouTube&apos;s processed result.</li>
          <li>Change one setting at a time if the test is unstable.</li>
        </ol>
        <InlineCta>
          If the computer slows down, reduce resolution or frame rate and work through the{' '}
          <a href={guidePath('screen-recording-without-lag')}>FastCast performance checklist</a>.
        </InlineCta>
      </GuideSection>

      <GuideSection id="security" title="Protect your YouTube stream key">
        <ul>
          <li>Prefer <code>rtmps://</code>; plain RTMP does not encrypt the key in transit.</li>
          <li>Do not show the key in screenshots, tutorials, logs, support requests, or screen shares.</li>
          <li>Reset the key in YouTube Studio immediately if it is exposed.</li>
          <li>FastCast keeps the stream key for the session only; paste it again after restarting, or turn on Remember stream keys in Advanced to store it in Windows Credential Manager.</li>
        </ul>
      </GuideSection>

      <GuideSection id="troubleshoot" title="Troubleshooting YouTube RTMPS streaming">
        <ul>
          <li>
            <strong>No preview:</strong> re-copy both values, confirm the stream is configured for
            encoder input, and wait briefly for YouTube to detect the connection.
          </li>
          <li>
            <strong>Authentication or connection error:</strong> check for spaces in the key,
            confirm the URL begins with <code>rtmps://</code>, and reset a revoked key.
          </li>
          <li>
            <strong>Unstable stream:</strong> lower bitrate, resolution, or frame rate and stop other uploads.
          </li>
          <li>
            <strong>Black screen or no audio:</strong> verify the selected capture and audio sources
            with the{' '}
            <a href={guidePath('screen-recording-black-screen-no-audio')}>black-screen and audio checklist</a>.
          </li>
          <li>
            <strong>Need overlays, alerts, scenes, or multiple simultaneous destinations:</strong>{' '}
            FastCast is not a full broadcast suite; see the{' '}
            <a href={guidePath('obs-alternative-windows')}>FastCast and OBS comparison</a>.
          </li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
