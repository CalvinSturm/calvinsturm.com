import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'test-plan', label: 'Build a useful test' },
  { id: 'youtube', label: 'Test on YouTube' },
  { id: 'twitch', label: 'Test on Twitch' },
  { id: 'kick', label: 'Test on Kick' },
  { id: 'check', label: 'What to check' },
  { id: 'after', label: 'After the test' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="test-live-stream-without-going-public"
      toc={toc}
      lede={
        <>
          Test a live stream with the safest method the destination supports: Private or Unlisted
          visibility on YouTube, Twitch Inspector&apos;s bandwidth-test mode on Twitch, or a local
          recording followed by a short controlled check on Kick. The test should include real
          motion and both audio sources, not just a static preview.
        </>
      }
      topCtaNote="FastCast can record and stream from the same screen, audio, and webcam setup, making a short local recording a useful first check before connecting a platform."
      finalCtaHeading="Rehearse the exact stream"
      finalCtaBody="Use FastCast to check capture and audio locally, then use the destination's safest supported test. Keep stream keys out of screenshots and recordings."
    >
      <GuideSection id="test-plan" title="Build a test that can reveal real problems">
        <ol>
          <li>Use the same monitor or window, microphone, desktop audio, webcam layout, resolution, frame rate, and bitrate planned for the broadcast.</li>
          <li>Show motion, scroll text, speak at normal volume, and play a short desktop-audio sample.</li>
          <li>Run long enough to reveal upload fluctuations and sustained encoder load.</li>
          <li>Watch from a second device with headphones rather than trusting only the encoder preview.</li>
          <li>Keep the key and other private dashboard details outside the capture area.</li>
        </ol>
      </GuideSection>

      <GuideSection id="youtube" title="Test privately or unlisted on YouTube">
        <ol>
          <li>Create or select the broadcast in YouTube Studio&apos;s Live Control Room.</li>
          <li>Set visibility to Private for the narrowest test, or Unlisted when a collaborator needs the link.</li>
          <li>Connect the RTMPS server URL and stream key in FastCast.</li>
          <li>Start the encoder and inspect the preview and stream health before choosing YouTube&apos;s Go Live action.</li>
          <li>After the test, stop both sides and review the processed replay.</li>
        </ol>
        <p>
          Use the <a href={guidePath('stream-to-youtube-rtmps-windows')}>YouTube Live guide for Windows</a>{' '}
          for the complete RTMPS setup.
        </p>
      </GuideSection>

      <GuideSection id="twitch" title="Test bandwidth with Twitch Inspector">
        <p>
          Twitch documents an Inspector mode that tests stream stability without setting the
          channel online or sending normal live notifications. Append{' '}
          <code>?bandwidthtest=true</code> to the stream key used for the test.
        </p>
        <ol>
          <li>Sign in at <a href="https://inspector.twitch.tv/">Twitch Inspector</a>.</li>
          <li>Add the bandwidth-test parameter to the end of the key in FastCast.</li>
          <li>Stream for several minutes and watch Inspector&apos;s connection data.</li>
          <li>Remove the parameter before a real broadcast.</li>
        </ol>
        <p>
          This mode tests transport health but does not provide viewable video. Make a local
          recording or controlled normal stream when you also need to confirm final picture and sound.
        </p>
      </GuideSection>

      <GuideSection id="kick" title="Use a local rehearsal before a controlled Kick check">
        <p>
          The official Kick guides reviewed here do not document a private, unlisted, or
          Inspector-style encoder test. Avoid claiming the stream is hidden when the platform has
          not confirmed that behavior.
        </p>
        <ol>
          <li>Record locally in FastCast with the exact capture, audio, webcam, resolution, and frame-rate plan.</li>
          <li>Review the MP4 and fix black capture, missing audio, or layout problems first.</li>
          <li>Verify Kick&apos;s current Stream URL, Key, title, category, and encoder requirements.</li>
          <li>Run a brief live check while monitoring the channel on a second device.</li>
          <li>Stop promptly if anything is wrong.</li>
        </ol>
      </GuideSection>

      <GuideSection id="check" title="Check picture, sound, delay, and stability">
        <ul>
          <li><strong>Picture:</strong> correct source, readable text, smooth motion, no private content, and a webcam that does not cover the task.</li>
          <li><strong>Sound:</strong> clear speech, audible desktop sound when needed, no echo, clipping, or doubled monitoring.</li>
          <li><strong>Connection:</strong> stable bitrate, no repeated reconnects, and no growing dropped-frame count.</li>
          <li><strong>Delay:</strong> enough awareness to manage chat and cues without assuming the preview is real time.</li>
          <li><strong>Platform page:</strong> correct channel, title, category, visibility, and audience settings.</li>
        </ul>
        <InlineCta>
          If stability fails, continue with{' '}
          <a href={guidePath('fix-live-stream-dropping-buffering')}>the dropping and buffering checklist</a>.
        </InlineCta>
      </GuideSection>

      <GuideSection id="after" title="Reset the room after the test">
        <ol>
          <li>Stop the encoder and confirm the platform is no longer receiving video.</li>
          <li>Remove Twitch&apos;s bandwidth-test suffix if it was used.</li>
          <li>Delete or retain the test replay according to its visibility and purpose.</li>
          <li>Write down the settings that worked, but never record the stream key.</li>
          <li>Reset the key immediately if it appeared in the capture or was shared during troubleshooting.</li>
        </ol>
        <p>
          Return to the{' '}
          <a href={guidePath('how-to-stream-on-windows')}>main Windows live-streaming guide</a>{' '}
          for the complete go-live sequence.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
