import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'what-120-fps-needs', label: 'What 120 FPS playback needs' },
  { id: 'check-refresh-rate', label: 'Check the display refresh rate' },
  { id: 'separate-causes', label: 'Separate display and decode problems' },
  { id: 'fixes', label: 'Fix choppy 120 FPS playback' },
  { id: 'fastplay', label: 'How FastPlay handles 120 FPS' },
  { id: 'limits', label: 'Limits and caveats' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="play-120-fps-video-windows"
      toc={toc}
      lede={
        <>
          Smooth 120 FPS video playback needs the whole chain to keep up: the file must really
          contain 120 frames per second, the decoder must deliver them on time, and the display
          must refresh fast enough to show them. A 60 Hz screen can play the file at normal speed,
          but it cannot visibly present all 120 unique frames each second.
        </>
      }
      topCtaNote="FastPlay 0.4.4 corrected high-frame-rate scheduling so 120 FPS files present nearly every frame on a sufficiently fast display, with hardware decoding and automatic software fallback."
      finalCtaHeading="Test the file in a 120 FPS-aware player"
      finalCtaBody="FastPlay is free and open source for Windows. Open the original file, verify your display refresh rate, and compare motion without converting the video."
    >
      <GuideSection id="what-120-fps-needs" title="What 120 FPS playback actually needs">
        <ul>
          <li>
            <strong>A true high-frame-rate file.</strong> Check the frame rate in MediaInfo or the
            camera&apos;s recording details. A file labeled slow motion may be captured at 120 FPS but
            authored to play back at 30 FPS intentionally.
          </li>
          <li>
            <strong>A display running at 120 Hz or faster.</strong> Frame rate belongs to the video;
            refresh rate belongs to the monitor. Both must be high enough to see every frame.
          </li>
          <li>
            <strong>Enough decode throughput.</strong> 4K, HEVC, 10-bit, and HDR each add work. A
            hardware decoder that supports the file&apos;s codec and profile usually matters more than
            raw CPU speed.
          </li>
          <li>
            <strong>Reliable timing.</strong> The player must schedule frames smoothly instead of
            releasing them in bursts or dropping frames that arrive together.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="check-refresh-rate" title="Check the display refresh rate in Windows">
        <ol>
          <li>Open Settings &gt; System &gt; Display.</li>
          <li>Select the monitor where the video will play.</li>
          <li>Open Advanced display.</li>
          <li>Under Choose a refresh rate, select 120 Hz, 144 Hz, 165 Hz, 240 Hz, or the fastest stable option.</li>
        </ol>
        <p>
          Windows can leave a fast monitor at 60 Hz after a driver change, cable swap, or display
          reset. If the higher option is missing, check the monitor port, cable bandwidth, display
          mode, and GPU driver. Microsoft&apos;s{' '}
          <a href="https://support.microsoft.com/en-us/windows/change-the-refresh-rate-on-your-monitor-in-windows-c8ea729e-0678-015c-c415-f806f04aae5a">
            refresh-rate instructions
          </a>{' '}
          show the current Windows controls.
        </p>
      </GuideSection>

      <GuideSection id="separate-causes" title="Separate display limits from playback problems">
        <ul>
          <li>
            <strong>Motion is consistent but no smoother than 60 FPS:</strong> the display is likely
            running at 60 Hz, or the source was authored at a lower playback rate.
          </li>
          <li>
            <strong>Motion hitches at irregular intervals:</strong> suspect dropped frames, software
            decoding, background load, or a timing problem in the player.
          </li>
          <li>
            <strong>Audio stays smooth while video falls behind:</strong> the video decode or
            presentation path is not keeping pace.
          </li>
          <li>
            <strong>Every player struggles with the same file:</strong> test from a local SSD and
            check whether the GPU supports the exact codec, bit depth, and profile.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="fixes" title="Fix choppy 120 FPS playback">
        <ol>
          <li>Set the correct refresh rate and play full-screen on that monitor.</li>
          <li>Close GPU-heavy games, editors, browser video, and background recording tools.</li>
          <li>Copy the file to a local SSD before blaming the decoder or player.</li>
          <li>Try a player with hardware decoding for the file&apos;s codec and software fallback.</li>
          <li>Test a lower-resolution 120 FPS sample to separate resolution load from frame-rate load.</li>
          <li>Update the GPU driver if hardware decode fails or produces corruption.</li>
        </ol>
        <p>
          For broader causes such as thermal throttling, slow storage, display judder, and codec
          fallback, use the full{' '}
          <a href={guidePath('video-stuttering-windows')}>Windows video stuttering checklist</a>.
        </p>
      </GuideSection>

      <GuideSection id="fastplay" title="How FastPlay handles 120 FPS">
        <p>
          FastPlay uses FFmpeg decoding with a D3D11 hardware path where supported and automatic
          software fallback. Version 0.4.4 fixed a scheduler problem that structurally discarded
          about one frame in six at 120 FPS. In the release validation, a synthetic 120 FPS clip
          improved from 405 dropped frames to 6 out of 2,400 on a 240 Hz display.
        </p>
        <InlineCta>
          Open the original file in FastPlay with no transcoding, then compare it on the monitor&apos;s highest
          refresh-rate setting.
        </InlineCta>
      </GuideSection>

      <GuideSection id="limits" title="Limits and caveats">
        <ul>
          <li>A 60 Hz display cannot show 120 unique frames each second, regardless of player.</li>
          <li>Presenting 120 FPS requires a display running faster than 120 Hz in FastPlay&apos;s current implementation.</li>
          <li>Unsupported hardware-decode profiles fall back to the CPU and may not sustain heavy 4K120 files.</li>
          <li>Variable-frame-rate footage can report an average near 120 FPS without delivering evenly spaced frames.</li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
