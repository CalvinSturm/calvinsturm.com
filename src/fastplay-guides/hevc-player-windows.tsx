import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'why-hevc-fails', label: 'Why HEVC fails on Windows' },
  { id: 'hardware-decode', label: 'Hardware decode and your GPU' },
  { id: 'fixes', label: 'Ways to get HEVC playing' },
  { id: 'how-fastplay-helps', label: 'How FastPlay plays HEVC' },
  { id: 'limits', label: 'Limits and caveats' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="hevc-player-windows"
      toc={toc}
      lede={
        <>
          HEVC (H.265) video fails on Windows because Windows does not include an HEVC decoder by
          default: the built-in players need a paid Microsoft Store add-on before they can open it.
          The fastest fix is a player that ships its own decoding, such as FastPlay, VLC, or mpv.
          The alternative is buying the HEVC Video Extensions so the built-in apps work too.
        </>
      }
      topCtaNote="FastPlay decodes HEVC through its built-in FFmpeg pipeline with D3D11 hardware acceleration, so H.265 files play on Windows without codec packs or Store purchases."
      finalCtaHeading="Play HEVC without the setup"
      finalCtaBody="FastPlay is a free, open-source Windows video player. Install the MSI, open your H.265 file, and hardware decode kicks in automatically where your GPU supports it."
    >
      <GuideSection id="why-hevc-fails" title="Why HEVC fails on Windows">
        <p>
          HEVC (High Efficiency Video Coding, also called H.265) is the codec behind most 4K, HDR,
          and modern phone footage. It compresses roughly twice as well as H.264, which is why
          iPhones, drones, action cameras, and screen recorders default to it.
        </p>
        <p>
          The catch is licensing. HEVC carries patent royalties, so Microsoft does not bundle a
          decoder with Windows. Instead, Media Player and the Movies &amp; TV app depend on the
          &quot;HEVC Video Extensions&quot; package sold in the Microsoft Store. On a fresh Windows
          install, double-clicking an HEVC file gets you an error, a codec prompt, or video-less
          audio.
        </p>
        <p>
          Because HEVC commonly travels inside .MOV and .MKV containers, this same missing decoder
          is behind many &quot;file will not open&quot; reports. If your problem file is a MOV,
          see <a href={guidePath('mov-not-playing-windows')}>MOV file not playing on Windows</a>.
        </p>
      </GuideSection>

      <GuideSection id="hardware-decode" title="Hardware decode and your GPU">
        <p>
          Decoding HEVC in software is CPU-intensive, especially for 4K 10-bit footage. Modern GPUs
          include dedicated HEVC decode hardware, and players use it through APIs like D3D11 on
          Windows. Two practical consequences:
        </p>
        <ul>
          <li>
            On a reasonably recent GPU, HEVC playback should be smooth and low-power in any player
            that uses hardware decode.
          </li>
          <li>
            On older GPUs without HEVC decode support (or without 10-bit support), players fall
            back to software decoding. Heavy files like 4K60 can then tax the CPU, and weaker
            machines may struggle no matter which player you use.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="fixes" title="Ways to get HEVC playing">
        <ol>
          <li>
            <strong>Use a player with built-in HEVC decoding.</strong> FastPlay, VLC, and mpv all
            decode HEVC themselves. Nothing else to install, and this leaves your system untouched.
          </li>
          <li>
            <strong>Buy the HEVC Video Extensions.</strong> The Store add-on makes the built-in
            Windows apps, and Explorer thumbnails, work with HEVC. Worth it if you live in Media
            Player.
          </li>
          <li>
            <strong>Avoid legacy codec packs.</strong> Old-style system codec packs can conflict
            with modern apps. Self-contained players solve the same problem without touching
            system decoders.
          </li>
          <li>
            <strong>Convert when compatibility matters more than size.</strong> HandBrake can
            transcode HEVC to H.264 for old devices or software that will never support H.265.
          </li>
        </ol>
        <InlineCta>
          Option 1 takes about a minute: download FastPlay, open the file, and confirm the codec
          was the problem.
        </InlineCta>
      </GuideSection>

      <GuideSection id="how-fastplay-helps" title="How FastPlay plays HEVC">
        <p>
          FastPlay ships its own FFmpeg-based demux and decode, so HEVC plays without any Store
          add-on. Video decode prefers the D3D11 hardware path (FFmpeg to D3D11 hardware decode to
          DXGI presentation), which keeps 4K HEVC smooth and efficient on GPUs that support it.
          When the hardware path is unavailable, FastPlay falls back to software decode
          automatically.
        </p>
        <p>
          Heavy files are handled deliberately: since v0.4.1, audio decoding runs on an
          independent worker, so on demanding 4K60 files that fall back to software video decode,
          the audio stays realtime instead of stuttering. And because much HEVC footage is also
          HDR, FastPlay tone-maps HDR10 and HLG to SDR so the picture does not come out gray
          (details in <a href={guidePath('hdr-video-windows')}>how to play HDR video on Windows</a>).
        </p>
      </GuideSection>

      <GuideSection id="limits" title="Limits and caveats">
        <ul>
          <li>
            FastPlay covers common formats via FFmpeg; uncommon or exotic codec variants may not
            play.
          </li>
          <li>
            Hardware decode depends on your GPU. Without HEVC decode support, software fallback
            works but is CPU-heavy for high-resolution, high-framerate files.
          </li>
          <li>
            FastPlay plays local files only, and it does not change what Windows itself can decode:
            Explorer thumbnails and built-in apps still need the Store extensions for HEVC.
          </li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
