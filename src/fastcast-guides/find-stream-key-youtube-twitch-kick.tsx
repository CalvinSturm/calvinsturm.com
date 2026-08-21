import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'what-it-is', label: 'What a stream key does' },
  { id: 'youtube', label: 'YouTube stream key' },
  { id: 'twitch', label: 'Twitch stream key' },
  { id: 'kick', label: 'Kick stream key' },
  { id: 'fastcast', label: 'Use the key in FastCast' },
  { id: 'protect', label: 'Protect and reset the key' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="find-stream-key-youtube-twitch-kick"
      toc={toc}
      lede={
        <>
          A stream key is the private credential that lets streaming software broadcast to your
          channel. YouTube shows it in the Live Control Room, Twitch in Creator Dashboard &gt;
          Settings &gt; Stream, and Kick in Creator Dashboard &gt; Channel. Copy it only into trusted
          software and never share it.
        </>
      }
      topCtaNote="FastCast accepts a server URL and stream key for YouTube, Twitch, Kick, or a custom RTMP/RTMPS destination. Keys are session-only unless you opt in to storing them in Windows Credential Manager."
      finalCtaHeading="Keep the connection simple and private"
      finalCtaBody="Choose a FastCast destination, verify its server URL, and paste the key only when you are ready to test. 1080p30 streaming will stay free."
    >
      <GuideSection id="what-it-is" title="Know the difference between a stream key and server URL">
        <p>
          The <strong>server or ingest URL</strong> is an address for the platform&apos;s receiving
          server. The <strong>stream key</strong> identifies and authorizes your channel. Streaming
          software needs both, although a YouTube, Twitch, or Kick preset may fill the server URL for you.
        </p>
        <p>
          A key is not the public channel URL. Anyone who obtains it may be able to broadcast to
          the channel until it is reset. If a guide, video, or support form asks you to reveal the
          full key, stop.
        </p>
      </GuideSection>

      <GuideSection id="youtube" title="Find a YouTube stream key">
        <ol>
          <li>Open YouTube Studio.</li>
          <li>Choose Create, then Go Live.</li>
          <li>Open the Stream view or select the scheduled stream you want to configure.</li>
          <li>Find the stream settings and copy the stream URL and stream key.</li>
          <li>Prefer the RTMPS server URL YouTube provides.</li>
        </ol>
        <p>
          YouTube can reuse a stream configuration, but confirm the selected key belongs to the
          intended broadcast. Follow the{' '}
          <a href={guidePath('stream-to-youtube-rtmps-windows')}>complete YouTube setup for Windows</a>{' '}
          before going live.
        </p>
      </GuideSection>

      <GuideSection id="twitch" title="Find a Twitch stream key">
        <ol>
          <li>Open Twitch and enter the Creator Dashboard.</li>
          <li>Open Settings, then Stream.</li>
          <li>Find Primary Stream Key and copy it.</li>
          <li>Leave the key hidden while recording screenshots or sharing the dashboard.</li>
        </ol>
        <p>
          Twitch&apos;s official{' '}
          <a href="https://help.twitch.tv/s/article/twitch-stream-key-faq?language=en_US">stream-key FAQ</a>{' '}
          explains its role. The{' '}
          <a href={guidePath('stream-to-twitch-windows')}>Windows Twitch guide</a>{' '}
          covers FastCast and Inspector testing.
        </p>
      </GuideSection>

      <GuideSection id="kick" title="Find a Kick stream key">
        <ol>
          <li>Open Kick and enter the Creator Dashboard.</li>
          <li>Open Channel.</li>
          <li>Copy both Stream URL and Stream Key from that page.</li>
          <li>Set the title and category separately with Edit Stream Info.</li>
        </ol>
        <p>
          Kick&apos;s current locations and encoder requirements are documented in its{' '}
          <a href="https://help.kick.com/en/articles/7066931-how-to-stream-on-kick-com">official setup guide</a>.
          Use the <a href={guidePath('stream-to-kick-windows')}>Kick streaming walkthrough</a>{' '}
          for the Windows capture and test steps.
        </p>
      </GuideSection>

      <GuideSection id="fastcast" title="Paste the connection details into FastCast">
        <ol>
          <li>Choose the matching YouTube, Twitch, or Kick destination, or choose custom RTMP/RTMPS.</li>
          <li>Compare the server URL with the current value in the platform dashboard.</li>
          <li>Paste the stream key in its own field. Do not include labels, spaces, or quotation marks.</li>
          <li>Choose the monitor or window, microphone, desktop audio, and optional webcam.</li>
          <li>Test the connection before a public broadcast.</li>
        </ol>
        <InlineCta>
          Continue with the{' '}
          <a href={guidePath('how-to-stream-on-windows')}>full Windows live-streaming checklist</a>{' '}
          for sources, bitrate, testing, and troubleshooting.
        </InlineCta>
      </GuideSection>

      <GuideSection id="protect" title="Protect the key and reset it after exposure">
        <ul>
          <li>Never put a key in a screenshot, screen share, recording, chat message, source repository, or support ticket.</li>
          <li>Use RTMPS when the platform offers it so the credential is encrypted in transit.</li>
          <li>FastCast uses the key while open and forgets it on exit, unless you turn on Remember stream keys in Advanced.</li>
          <li>If the key is exposed, stop streaming and reset or regenerate it in the platform dashboard immediately.</li>
          <li>Replace the old key in every encoder after resetting it; the previous value should no longer work.</li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
