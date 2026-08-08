import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'find-the-lag', label: 'First: find out where the lag is' },
  { id: 'hardware-encoding', label: 'Use hardware encoding' },
  { id: 'reduce-load', label: 'Reduce resolution and frame rate' },
  { id: 'gpu-headroom', label: 'Leave the GPU headroom' },
  { id: 'disk-and-background', label: 'Disk speed and background load' },
  { id: 'test', label: 'Prove it with a test recording' },
  { id: 'fastcast-settings', label: 'FastCast settings that help' },
  { id: 'limits', label: 'Known limits' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="screen-recording-without-lag"
      toc={toc}
      lede={
        <>
          Recording lag comes from asking one machine to do two heavy jobs at once: run your
          application and encode video of it in real time. You reduce it by moving encoding onto
          the GPU's dedicated hardware, cutting the pixels and frames you capture, and making sure
          the disk and CPU are not already saturated. No recorder eliminates that cost, but the
          right settings shrink it dramatically.
        </>
      }
      topCtaNote="FastCast uses hardware H.264 encoding on supported NVIDIA and AMD GPUs and offers 1080p and 720p downscaled output, which are the two levers that matter most for smooth recording."
      finalCtaHeading="Record a smooth take"
      finalCtaBody="FastCast is in Open Beta, and 1080p30 recording and streaming will stay free. Pick a screen, use hardware encoding on a supported GPU, and run a short test recording; two minutes tells you everything about your headroom."
    >
      <GuideSection id="find-the-lag" title="First: find out where the lag is">
        <p>&quot;Lag while recording&quot; is actually two different problems with different fixes:</p>
        <ul>
          <li>
            <strong>The live application stutters</strong> while you record: the game drops frames,
            the UI feels sluggish. The machine is out of headroom; encoding is competing with the
            workload. Fixes: hardware encoding, lower capture settings, fewer background loads.
          </li>
          <li>
            <strong>The recording itself stutters</strong> but the app felt fine live: the encoder
            or the disk could not keep pace, so frames were dropped on the way to the file.
            Fixes: lower resolution or frame rate, faster disk, hardware encoding.
          </li>
        </ul>
        <p>
          Watch your finished file once before changing anything; knowing which symptom you have
          cuts the troubleshooting in half.
        </p>
      </GuideSection>

      <GuideSection id="hardware-encoding" title="Use hardware encoding">
        <p>
          Modern GPUs contain a dedicated encoding block that compresses video largely
          independently of the cores rendering your game or app. Software (CPU) encoding, by
          contrast, fights your workload for the same cores, which is exactly what produces both
          kinds of lag. This is the single most important setting in any recorder.
        </p>
        <p>
          FastCast uses hardware H.264 encoding, tested on NVIDIA and AMD GPUs, and falls back to
          a software encoder that works but is much slower. FastCast 0.5.0 made that software
          conversion path roughly five times faster than 0.4.0 on AVX2-capable systems, but it
          still cannot match supported hardware encoding. Without a supported hardware encoder,
          keep expectations modest and keep resolution down.
        </p>
      </GuideSection>

      <GuideSection id="reduce-load" title="Reduce resolution and frame rate">
        <p>
          Encoding cost scales with pixels per second, so these two settings are your volume knob:
        </p>
        <ul>
          <li>
            <strong>Downscale the output.</strong> Recording a 4K screen at 1080p quarters the
            pixels the encoder must handle. FastCast offers passthrough (native), 1080p, and 720p
            output; drop one step and retest.
          </li>
          <li>
            <strong>Record 30 FPS unless motion demands 60.</strong> Halving frame rate halves
            encoding work. Tutorials, slides, and code reviews lose nothing at 30 FPS.
          </li>
          <li>
            <strong>Capture a window instead of a monitor</strong> when the demo allows it; a
            smaller source region is less to encode than a full 4K desktop.
          </li>
        </ul>
        <p>
          If you specifically need high-resolution, high-framerate capture, that has its own
          checklist: <a href={guidePath('record-4k-60fps-windows')}>recording 4K 60 FPS on Windows</a>.
        </p>
      </GuideSection>

      <GuideSection id="gpu-headroom" title="Leave the GPU headroom">
        <p>
          A game running uncapped will happily use 100% of the GPU, leaving capture and encoding
          to fight for scraps; that contention shows up as stutter in both the game and the file.
          Defensible fixes:
        </p>
        <ul>
          <li>Cap the game's frame rate (in-game limiter or vsync) slightly below what it can max.</li>
          <li>Lower one or two GPU-heavy quality settings while recording.</li>
          <li>Close GPU-accelerated apps you are not recording (browsers with video playing, editors).</li>
        </ul>
      </GuideSection>

      <GuideSection id="disk-and-background" title="Disk speed and background load">
        <ul>
          <li>
            <strong>Record to an SSD</strong> where possible, and not to a drive that is nearly
            full. Sustained video writes on a busy or fragmented hard drive are a classic source
            of dropped frames.
          </li>
          <li>
            <strong>Do not record over the network.</strong> Save locally, move the file after.
          </li>
          <li>
            <strong>Close what you are not using.</strong> Sync clients, indexing, and updaters
            create bursts of CPU and disk activity that land in the middle of takes. Focus Assist
            also keeps notification popups out of the recording.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="test" title="Prove it with a test recording">
        <p>
          Record two or three minutes of the real workload at your intended settings, then play it
          back and scrub through it. Stepping through frame by frame in a player like{' '}
          <a href="/fastplay">FastPlay</a> makes skipped frames obvious. If the test is clean, the
          long take will almost certainly be clean; if not, change one variable and repeat.
        </p>
      </GuideSection>

      <GuideSection id="fastcast-settings" title="FastCast settings that help">
        <ul>
          <li>
            <strong>Hardware encoding on supported GPUs.</strong> On NVIDIA and AMD machines,
            FastCast's H.264 hardware path keeps encoding off your CPU.
          </li>
          <li>
            <strong>Output downscaling.</strong> Switch passthrough to 1080p or 720p to cut
            encoder and disk load without touching the app you are recording.
          </li>
          <li>
            <strong>Window capture.</strong> Record just the window that matters instead of a
            whole monitor.
          </li>
          <li>
            <strong>Free-tier ceiling as a sanity check.</strong> FastCast Free records 1080p30,
            which is a modest, widely achievable load; if 1080p30 stutters, fix the environment
            (encoder, disk, background load) before considering higher settings, which require
            Pro and more headroom.
          </li>
          <li>
            <strong>Untimed recordings use a crash-safe segmented mode</strong>, so a long take
            interrupted by a crash or power loss is recoverable instead of lost.
          </li>
        </ul>
        <InlineCta>
          FastCast is a small portable download, so testing whether your machine records smoothly
          takes about five minutes.
        </InlineCta>
      </GuideSection>

      <GuideSection id="limits" title="Known limits">
        <ul>
          <li>
            Recording always costs something. These steps reduce the cost; on a machine that is
            already at its limit, some stutter may remain at any setting.
          </li>
          <li>
            FastCast's hardware encoding is tested on NVIDIA and AMD; Intel hardware encoding is
            not broadly validated yet, and the software fallback is much slower.
          </li>
          <li>
            FastCast has no per-encoder tuning UI in the free tier; advanced encoder controls are
            part of FastCast Pro.
          </li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
