import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'meaning', label: 'What bitrate changes' },
  { id: 'limits', label: 'Start with platform limits' },
  { id: 'upload', label: 'Leave upload headroom' },
  { id: 'resolution', label: 'Match resolution and frame rate' },
  { id: 'test-adjust', label: 'Test and adjust' },
  { id: 'symptoms', label: 'Signs bitrate is wrong' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="choose-live-streaming-bitrate"
      toc={toc}
      lede={
        <>
          The right live-stream bitrate is high enough to preserve useful detail but low enough to
          remain stable through ordinary upload fluctuations. Start inside the destination&apos;s
          current limits, leave substantial upload headroom, then test sustained motion instead of
          choosing the largest number available.
        </>
      }
      topCtaNote="FastCast exposes resolution, frame rate, and streaming bitrate in one Windows setup. Choose settings your connection can sustain rather than chasing the platform maximum."
      finalCtaHeading="Choose stability before maximum quality"
      finalCtaBody="Set a conservative FastCast bitrate, run a real platform test, and increase only when the connection stays steady. 1080p30 streaming will stay free."
    >
      <GuideSection id="meaning" title="Understand what streaming bitrate changes">
        <p>
          Video bitrate is the amount of video data sent each second. More data can preserve motion,
          fine text, and texture, but it also demands a faster, steadier upload and gives viewers a
          heavier stream to receive. Audio uses additional bandwidth, and normal network overhead
          means the video setting should never consume the whole connection.
        </p>
        <p>
          Bitrate is not a quality guarantee. A higher value cannot fix a poor source, an overloaded
          encoder, or a resolution that the PC cannot process in real time.
        </p>
      </GuideSection>

      <GuideSection id="limits" title="Start with the destination's current encoder guidance">
        <ul>
          <li><strong>YouTube:</strong> its official encoder settings page publishes ranges by resolution and frame rate and recommends a 2-second keyframe interval.</li>
          <li><strong>Twitch:</strong> check the current Twitch broadcasting guidance and Inspector results rather than copying an old preset from a forum.</li>
          <li><strong>Kick:</strong> its current official guide caps video bitrate at 8,000 kbps and requires CBR, but that maximum is not the right choice for every connection.</li>
        </ul>
        <p>
          Platform limits and recommendations change. Recheck{' '}
          <a href="https://support.google.com/youtube/answer/2853702">YouTube&apos;s encoder settings</a>{' '}
          and <a href="https://help.kick.com/en/articles/7066931-how-to-stream-on-kick-com">Kick&apos;s setup requirements</a>{' '}
          before an important event.
        </p>
      </GuideSection>

      <GuideSection id="upload" title="Leave room for upload-speed changes">
        <ol>
          <li>Test upload speed at the location and time of day you plan to stream.</li>
          <li>Run more than one test. Use the lower sustained result, not the highest momentary result.</li>
          <li>Leave capacity for audio, protocol overhead, Wi-Fi variation, and other devices.</li>
          <li>Prefer Ethernet and stop cloud sync, backups, file uploads, and game downloads.</li>
        </ol>
        <p>
          As one concrete platform rule, Kick&apos;s current buffering guidance recommends upload speed
          of at least twice the streaming bitrate. Treat that as a useful stability check, not a
          universal guarantee for every network or destination.
        </p>
      </GuideSection>

      <GuideSection id="resolution" title="Match bitrate to resolution, frame rate, and content">
        <ul>
          <li><strong>720p30</strong> is easier on the connection and computer and can be the better choice for a limited upload.</li>
          <li><strong>1080p30</strong> gives UI text more room while avoiding the extra motion data of 60 fps.</li>
          <li><strong>60 fps</strong> helps fast gameplay or motion but requires more encoding work and usually more bitrate than 30 fps.</li>
          <li><strong>Static slides and software demos</strong> compress more easily than games, camera noise, foliage, or constant movement.</li>
        </ul>
        <p>
          Lower resolution or frame rate when the needed bitrate exceeds the connection&apos;s stable
          capacity. A clean 720p stream is more useful than a nominal 1080p stream that repeatedly buffers.
        </p>
      </GuideSection>

      <GuideSection id="test-adjust" title="Test the exact setting and change one variable">
        <ol>
          <li>Start with a conservative bitrate inside the platform&apos;s current range.</li>
          <li>Test with motion, microphone speech, desktop audio, and the optional webcam.</li>
          <li>Watch platform health data and the viewer result on another device.</li>
          <li>If stable, raise bitrate only when the picture has a visible problem worth solving.</li>
          <li>If unstable, lower bitrate first. Kick&apos;s current troubleshooting guidance suggests reducing it in 1,000 kbps steps.</li>
          <li>Lower resolution or frame rate if bitrate reductions make the picture too soft.</li>
        </ol>
        <InlineCta>
          Platform-specific test methods are covered in{' '}
          <a href={guidePath('test-live-stream-without-going-public')}>how to test a live stream safely</a>.
        </InlineCta>
      </GuideSection>

      <GuideSection id="symptoms" title="Recognize a bitrate or performance problem">
        <ul>
          <li><strong>Dropped network frames, buffering, or reconnects:</strong> bitrate may exceed stable upload capacity. Lower it and use Ethernet.</li>
          <li><strong>Blocky motion with a stable connection:</strong> bitrate may be too low for the chosen resolution, frame rate, and content.</li>
          <li><strong>Encoder lag while network health is good:</strong> the PC or hardware encoder is overloaded. Lower frame rate or resolution and close GPU-heavy apps.</li>
          <li><strong>Only viewers on slower connections buffer:</strong> the platform&apos;s available playback options and the selected source quality may be too demanding.</li>
        </ul>
        <p>
          Continue with{' '}
          <a href={guidePath('fix-live-stream-dropping-buffering')}>the full live-stream stability diagnosis</a>{' '}
          or return to the{' '}
          <a href={guidePath('how-to-stream-on-windows')}>Windows streaming setup</a>.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
