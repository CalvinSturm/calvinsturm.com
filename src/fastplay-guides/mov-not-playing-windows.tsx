import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'container-vs-codec', label: 'MOV is a container, not a codec' },
  { id: 'common-causes', label: 'Common causes' },
  { id: 'fixes', label: 'Fixes you can try' },
  { id: 'how-fastplay-helps', label: 'How FastPlay helps' },
  { id: 'limits', label: 'Limits and caveats' },
];

function Article() {
  return (
    <GuideLayout
      slug="mov-not-playing-windows"
      toc={toc}
      lede={
        <>
          A .MOV file that will not play on Windows is almost never broken. MOV is just a
          container, and the real question is what codec is inside it. Most failures come down to
          HEVC video that Windows cannot decode out of the box, HDR footage that renders washed
          out, or a professional codec the player does not know. Identify the codec and the fix
          follows.
        </>
      }
      topCtaNote="FastPlay opens .MOV files directly with its own FFmpeg-based decoding: no QuickTime, no Store codec purchase, and HDR recordings are tone-mapped so they do not look gray."
      finalCtaHeading="Open that MOV file"
      finalCtaBody="FastPlay is a free, open-source Windows player that handles common MOV recordings from iPhones, cameras, and screen capture, with hardware-accelerated decode and automatic software fallback."
    >
      <GuideSection id="container-vs-codec" title="MOV is a container, not a codec">
        <p>
          A .MOV file is a QuickTime container: a wrapper that can hold video and audio encoded in
          many different ways. Two MOV files from two devices can have nothing in common inside.
          Typical contents:
        </p>
        <ul>
          <li>
            <strong>H.264 video.</strong> The old default for phones and cameras. Plays almost
            anywhere, including the built-in Windows apps.
          </li>
          <li>
            <strong>HEVC (H.265) video.</strong> What iPhones record by default (the &quot;High
            Efficiency&quot; camera setting) and what most 4K and HDR footage uses. Windows does
            not include an HEVC decoder by default.
          </li>
          <li>
            <strong>Professional codecs like ProRes.</strong> Common in editing workflows. Consumer
            players frequently cannot decode these at all.
          </li>
        </ul>
        <p>
          So &quot;Windows cannot play MOV&quot; is usually really &quot;this player cannot decode
          the codec inside this MOV.&quot;
        </p>
      </GuideSection>

      <GuideSection id="common-causes" title="Common causes">
        <ul>
          <li>
            <strong>Missing HEVC decoder.</strong> Media Player and Movies &amp; TV need the paid
            HEVC Video Extensions from the Microsoft Store to decode HEVC. Without them, an iPhone
            MOV either refuses to open or plays audio with no video. See{' '}
            <a href={guidePath('hevc-player-windows')}>how to play HEVC video on Windows</a>.
          </li>
          <li>
            <strong>HDR footage.</strong> Recent iPhones record HDR video. Players that decode it
            but do not tone-map show gray, flat color. See{' '}
            <a href={guidePath('hdr-looks-washed-out')}>why HDR video looks washed out on Windows</a>.
          </li>
          <li>
            <strong>No QuickTime on Windows.</strong> Apple discontinued QuickTime for Windows
            years ago, so anything that still depends on it fails. Modern players decode MOV
            themselves.
          </li>
          <li>
            <strong>An exotic or professional codec.</strong> ProRes and other production codecs
            need a player or editor that specifically supports them.
          </li>
          <li>
            <strong>An incomplete transfer.</strong> A MOV cut short during copying, AirDrop, or
            download can be unplayable everywhere. If the file size looks too small, re-transfer
            it first.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="fixes" title="Fixes you can try">
        <ol>
          <li>
            <strong>Identify the codec.</strong> Open the file in a free tool like MediaInfo and
            look at the video track format (H.264, HEVC, ProRes) and whether it is HDR (PQ or HLG
            transfer). This tells you which fix applies.
          </li>
          <li>
            <strong>Try a player with built-in decoding.</strong> FastPlay, VLC, and mpv all ship
            their own decoders, so the Store extensions are not needed.
          </li>
          <li>
            <strong>Or add HEVC support to Windows itself.</strong> Buying the HEVC Video
            Extensions makes the built-in apps and thumbnails work for HEVC MOVs.
          </li>
          <li>
            <strong>Change the iPhone camera setting.</strong> Settings &gt; Camera &gt; Formats
            &gt; Most Compatible records H.264 going forward, which plays everywhere (at larger
            file sizes).
          </li>
          <li>
            <strong>Convert stubborn files.</strong> HandBrake (free) converts a MOV to an H.264
            MP4 that anything can play. This is also the practical route for professional codecs
            your player does not support.
          </li>
        </ol>
        <InlineCta>
          Step 2 is the fastest test: if a MOV opens in FastPlay but not in your usual player, the
          file is fine and the codec was the problem all along.
        </InlineCta>
      </GuideSection>

      <GuideSection id="how-fastplay-helps" title="How FastPlay helps">
        <p>
          FastPlay is a native Windows player built on FFmpeg demux and decode, and .mov is one of
          its supported everyday containers alongside .mp4, .mkv, .avi, .webm, .m4v, and .wmv. In
          practice that means:
        </p>
        <ul>
          <li>
            Common MOV recordings (H.264 and HEVC from phones, cameras, and screen capture) open
            directly, with D3D11 hardware decode where the GPU supports the codec and automatic
            software fallback where it does not.
          </li>
          <li>
            HDR10 (PQ) and HLG recordings are tone-mapped to SDR in a pixel shader, so iPhone HDR
            clips look natural on a normal monitor instead of washed out.
          </li>
          <li>
            No codec packs, no Store purchases, no QuickTime. One MSI installer, free and open
            source under the MIT License.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="limits" title="Limits and caveats">
        <ul>
          <li>
            FastPlay covers common formats via FFmpeg; uncommon or exotic codecs may not play. A
            MOV holding an unusual production codec may still need conversion or an editor that
            supports it.
          </li>
          <li>
            FastPlay plays local files only. It will not fix a file that was truncated during
            transfer; re-copy the original first.
          </li>
          <li>
            Windows Explorer thumbnails and the built-in apps are unaffected by what FastPlay can
            decode. If you want those to handle HEVC too, you still need the Store extensions.
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
