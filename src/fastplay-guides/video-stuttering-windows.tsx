import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'triage', label: 'Narrow it down first' },
  { id: 'decode', label: 'Cause 1: the decoder cannot keep up' },
  { id: 'storage', label: 'Cause 2: the file is on slow storage' },
  { id: 'display', label: 'Cause 3: display judder, not dropped frames' },
  { id: 'system', label: 'Cause 4: the system is busy or throttled' },
  { id: 'how-fastplay-helps', label: 'How FastPlay keeps playback smooth' },
  { id: 'limits', label: 'Limits and caveats' },
];

function Article() {
  return (
    <GuideLayout
      slug="video-stuttering-windows"
      toc={toc}
      lede={
        <>
          Video stutters on Windows for four distinct reasons: the machine cannot decode the file
          fast enough (heavy HEVC or 4K60 footage in software), the file is being read from slow
          storage, the video's frame rate fights the monitor's refresh rate, or the system is
          busy doing something else. Each has a different fix, and the first step is telling them
          apart.
        </>
      }
      topCtaNote="FastPlay uses D3D11 hardware decode with a GPU-resident video path and automatic software fallback, and its title bar shows which decode mode is active, which answers the most common stutter question in one glance."
      finalCtaHeading="Try the file in FastPlay"
      finalCtaBody="FastPlay is a free, open-source Windows player built for smooth local playback: hardware decode where your GPU supports it, responsive seeking, and audio that stays steady even when video decode is under pressure."
    >
      <GuideSection id="triage" title="Narrow it down first">
        <p>Three questions separate the four causes:</p>
        <ol>
          <li>
            <strong>Does every video stutter, or just this one?</strong> One heavy file (4K, 60
            fps, HEVC, high bitrate) points at decoding. Everything stuttering points at the
            display, drivers, or system load.
          </li>
          <li>
            <strong>Where does the file live?</strong> If it plays from an internal drive but
            stutters from a NAS, USB stick, or SD card, storage is the bottleneck, not the player.
          </li>
          <li>
            <strong>Is it stutter or judder?</strong> Random hitches and freezes are dropped
            frames. A subtle, regular unevenness in smooth motion (panning shots especially) is
            usually judder from the frame-rate/refresh-rate mismatch, which is a display issue,
            not a performance one.
          </li>
        </ol>
      </GuideSection>

      <GuideSection id="decode" title="Cause 1: the decoder cannot keep up">
        <p>
          Modern footage is compressed with codecs (HEVC especially) that are expensive to decode
          in software. GPUs ship dedicated decode hardware precisely for this; when a player uses
          it, 4K HEVC plays smoothly at a few percent CPU. When the GPU lacks support for the
          codec (or its 10-bit variant) and the player falls back to software decoding, heavy
          files can outrun the CPU, and playback hitches.
        </p>
        <ul>
          <li>
            <strong>Check whether hardware decode is active.</strong> In FastPlay, the title bar
            shows the decode mode, and the backtick key (<code>`</code>) toggles between hardware
            and software decode, so you can see immediately whether the smooth path is in use.
          </li>
          <li>
            <strong>Know your GPU's limits.</strong> Older GPUs often decode H.264 in hardware
            but not HEVC, or HEVC 8-bit but not the 10-bit variant that 4K and HDR footage uses.
            Background on the codec side is in{' '}
            <a href={guidePath('hevc-player-windows')}>how to play HEVC video on Windows</a>.
          </li>
          <li>
            <strong>Convert as a last resort.</strong> If the machine simply cannot decode a
            file smoothly, HandBrake can transcode it once (to H.264, or to a lower resolution)
            and every future playback is cheap.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="storage" title="Cause 2: the file is on slow storage">
        <p>
          High-bitrate video is a sustained read load. Network shares over Wi-Fi, USB sticks, and
          SD cards can all deliver less than a heavy file needs, and the result looks exactly like
          a decoding problem: hitches, freezes, and audio running ahead of video.
        </p>
        <ul>
          <li>Copy the file to an internal drive and play it from there; if the stutter disappears, storage was the whole problem.</li>
          <li>Card readers and USB hubs can be slower than the card or drive itself; try a direct port.</li>
          <li>FastPlay is built for local files, so footage on a network share is best copied locally before review.</li>
        </ul>
      </GuideSection>

      <GuideSection id="display" title="Cause 3: display judder, not dropped frames">
        <p>
          Most film and phone footage is 24 or 30 fps; most monitors refresh at 60 Hz or above.
          24 does not divide into 60, so some frames display longer than others; that is judder,
          and every player on the same monitor shows it to some degree. It is most visible in slow
          panning shots.
        </p>
        <ul>
          <li>
            If your monitor supports a matching refresh rate (or variable refresh), setting it
            reduces judder at the source: Windows Settings &gt; System &gt; Display &gt; Advanced
            display.
          </li>
          <li>
            Judder is constant and rhythmic; dropped frames are random. If motion is uniformly
            slightly uneven but nothing freezes, you are likely looking at judder, and no player
            change will eliminate it.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="system" title="Cause 4: the system is busy or throttled">
        <ul>
          <li>
            <strong>Background load.</strong> Sync clients, indexing, updates, and a browser full
            of tabs compete for the same CPU, GPU, and disk. Close what you are not using during
            playback of demanding files.
          </li>
          <li>
            <strong>Laptop power saving.</strong> On battery, Windows power modes can cap CPU and
            GPU clocks enough to turn borderline files into stuttering ones. Plug in, or set the
            power mode to Best Performance while reviewing footage.
          </li>
          <li>
            <strong>Stale GPU drivers.</strong> Hardware decode runs through the GPU driver;
            updating it fixes a surprising share of playback complaints.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="how-fastplay-helps" title="How FastPlay keeps playback smooth">
        <p>
          FastPlay's playback pipeline is built around the smooth path: FFmpeg demux and decode
          with D3D11 hardware decode preferred, decoded frames staying on the GPU through a DXGI
          flip-model swap chain (no CPU copy-back during normal playback), and automatic software
          fallback when the hardware path is unavailable.
        </p>
        <ul>
          <li>
            <strong>Seeking never queues stale work.</strong> Scrubbing drops outdated frames
            instead of letting them delay new ones, so seeking stays responsive even in heavy
            files.
          </li>
          <li>
            <strong>Audio stays steady under pressure.</strong> Since v0.4.1, audio decoding runs
            on an independent worker, so a demanding 4K60 file that falls back to software video
            decode keeps realtime audio instead of stuttering sound.
          </li>
          <li>
            <strong>The decode mode is visible.</strong> The title bar shows whether hardware or
            software decode is active, which turns &quot;why is this file struggling&quot; from a
            mystery into a diagnosis.
          </li>
        </ul>
        <InlineCta>
          The quickest test of a stuttering file: open it in FastPlay and check the title bar. If
          software decode is active on a 4K HEVC file, you have found the cause.
        </InlineCta>
      </GuideSection>

      <GuideSection id="limits" title="Limits and caveats">
        <ul>
          <li>
            No player makes an underpowered machine decode 4K60 HEVC in software smoothly.
            Hardware decode support on your GPU, or a one-time conversion, is the real fix there.
          </li>
          <li>
            Frame-rate/refresh-rate judder is a property of the display pipeline; FastPlay does
            not interpolate frames to hide it.
          </li>
          <li>
            FastPlay plays local files only and covers common formats via FFmpeg; uncommon codecs
            may not play. For container-specific failures, see{' '}
            <a href={guidePath('mov-not-playing-windows')}>MOV file not playing on Windows</a>.
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
