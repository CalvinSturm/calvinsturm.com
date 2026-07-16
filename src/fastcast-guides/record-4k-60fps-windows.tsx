import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'what-it-takes', label: 'What 4K 60 FPS actually demands' },
  { id: 'hardware', label: 'Hardware and encoder requirements' },
  { id: 'storage', label: 'Storage and file sizes' },
  { id: 'settings', label: 'Settings that matter' },
  { id: 'test-procedure', label: 'Run a test recording first' },
  { id: 'fastcast-support', label: 'FastCast support and tiers' },
  { id: 'limits', label: 'Limitations' },
];

function Article() {
  return (
    <GuideLayout
      slug="record-4k-60fps-windows"
      toc={toc}
      lede={
        <>
          Recording 4K at 60 FPS on Windows means encoding roughly eight times the pixel
          throughput of 1080p30 in real time, so success depends on three things: a GPU with a
          capable hardware H.264 encoder, a disk fast enough to swallow the output, and headroom
          left over for whatever you are recording. In FastCast, 4K and 60 FPS capture are
          FastCast Pro features, and results genuinely depend on your hardware.
        </>
      }
      topCtaNote="FastCast records with hardware H.264 encoding on supported NVIDIA and AMD GPUs. The free tier covers 1080p30; FastCast Pro unlocks 1440p/4K and 60 FPS capture where your hardware supports them."
      finalCtaHeading="Start with the free tier, then step up"
      finalCtaBody="Download FastCast, confirm smooth 1080p30 recording on your machine, and if you need more, FastCast Pro unlocks 1440p/4K and 60 FPS capture with advanced encoder controls, activated inside the app."
    >
      <GuideSection id="what-it-takes" title="What 4K 60 FPS actually demands">
        <p>
          A 3840×2160 frame has four times the pixels of 1080p, and 60 FPS doubles the frame
          count. Every one of those frames has to be captured, encoded, and written to disk in
          under 17 milliseconds, continuously, while the thing you are recording keeps running.
          That is why 4K60 capture fails in ways 1080p30 never does: the encoder falls behind, the
          disk cannot keep up, or the recorded application loses the GPU headroom it needed.
        </p>
        <p>
          None of this means you need exotic hardware. It means you should know which of the three
          budgets (encoder, disk, GPU headroom) you are spending, and test before the recording
          that matters.
        </p>
      </GuideSection>

      <GuideSection id="hardware" title="Hardware and encoder requirements">
        <ul>
          <li>
            <strong>A hardware H.264 encoder is effectively required.</strong> Modern NVIDIA and
            AMD GPUs include dedicated encoding hardware that compresses video with minimal impact
            on the cores running your game or app. FastCast's hardware encoding is tested on
            NVIDIA and AMD; Intel hardware encoding is not broadly validated yet, and its software
            encoder, while functional, is much slower and not realistic for 4K60.
          </li>
          <li>
            <strong>A 4K source.</strong> To record 4K you need 4K pixels to capture: a 4K monitor
            (or a game rendering at 4K on one).
          </li>
          <li>
            <strong>Thermal and power headroom.</strong> Encoding adds sustained GPU load. Laptops
            that boost briefly and then throttle will show it as stutter that starts minutes into
            a recording.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="storage" title="Storage and file sizes">
        <ul>
          <li>
            <strong>Write speed.</strong> High-resolution, high-framerate H.264 produces a heavy
            sustained stream. An SSD handles it comfortably; a fragmented or nearly full hard
            drive is a common cause of dropped frames that people misdiagnose as an encoder
            problem.
          </li>
          <li>
            <strong>File size.</strong> Recording size scales with resolution, frame rate, and
            bitrate, so 4K60 files are several times larger than 1080p30 for the same duration.
            Check free space before long sessions.
          </li>
          <li>
            <strong>Plan for delivery.</strong> If the recording's destination is Discord or
            email, a compressor like <a href="/fastcompress">FastCompress</a> can shrink the
            finished file to a target size afterward; recording at 4K60 only pays off when the
            destination keeps the quality.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="settings" title="Settings that matter">
        <ul>
          <li>
            <strong>Resolution: record at the source's native size or deliberately below it.</strong>{' '}
            FastCast offers passthrough output (native resolution) plus 1080p and 720p downscales.
            Passthrough on a 4K monitor is what makes the recording 4K; downscaling to 1080p cuts
            the encoding and disk load to a fraction.
          </li>
          <li>
            <strong>Frame rate: 60 FPS only when motion needs it.</strong> Gameplay and fast
            motion benefit; slides and code do not. 30 FPS halves the work.
          </li>
          <li>
            <strong>Audio is cheap.</strong> Mic and desktop audio add little load; set them up
            normally as described in{' '}
            <a href={guidePath('how-to-record-screen-windows')}>the screen recording guide</a>.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="test-procedure" title="Run a test recording first">
        <ol>
          <li>Set your intended resolution and frame rate.</li>
          <li>
            Record two to three minutes of the real workload, not a desktop sitting idle; an
            actual game scene or busy timeline is what stresses the encoder.
          </li>
          <li>
            Play the result back and scrub through it, checking for skipped frames, stutter, and
            audio drift. A player with responsive frame stepping, like{' '}
            <a href="/fastplay">FastPlay</a>, makes this check quick, and it handles 4K60 files
            with hardware decode.
          </li>
          <li>
            If the test shows problems, drop one variable at a time: 60 to 30 FPS, or 4K to
            1080p, and retest. The troubleshooting sequence is in{' '}
            <a href={guidePath('screen-recording-without-lag')}>reducing lag while screen recording</a>.
          </li>
        </ol>
      </GuideSection>

      <GuideSection id="fastcast-support" title="FastCast support and tiers">
        <p>
          FastCast Free records and streams at 1080p30. A one-time FastCast Pro license unlocks
          1440p and 4K recording plus 60 FPS capture where your hardware supports them, along with
          advanced encoder controls. Activation happens inside the app (via Lemon Squeezy) with no
          account and no subscription, and an offline grace period covers activated devices.
        </p>
        <InlineCta>
          Not sure your machine can sustain 4K60? Download FastCast free, run the test procedure
          above at 1080p30, and you will know exactly how much headroom you have before paying for
          anything.
        </InlineCta>
      </GuideSection>

      <GuideSection id="limits" title="Limitations">
        <ul>
          <li>
            No recorder can promise universal 4K60 capture. Results depend on your GPU's encoder,
            what the machine is doing while recording, disk throughput, and thermals.
          </li>
          <li>
            FastCast's hardware encoding is tested on NVIDIA and AMD GPUs. On Intel-only machines,
            hardware encoding is not broadly validated yet, and the software fallback is not
            suited to high-resolution, high-framerate capture.
          </li>
          <li>
            FastCast records H.264 MP4. Other codecs (HEVC, AV1) are not encoder options.
          </li>
          <li>
            FastCast is in Open Beta and the build is unsigned; SmartScreen may warn on first run.
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
