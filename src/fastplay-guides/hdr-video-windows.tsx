import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'what-hdr-needs', label: 'What HDR playback actually needs' },
  { id: 'why-it-fails', label: 'Why HDR video fails on Windows' },
  { id: 'fixes', label: 'Fixes you can try' },
  { id: 'how-fastplay-helps', label: 'How FastPlay plays HDR' },
  { id: 'limits', label: 'Limits and caveats' },
];

function Article() {
  return (
    <GuideLayout
      slug="hdr-video-windows"
      toc={toc}
      lede={
        <>
          To play HDR video correctly on Windows you need two things: a decoder for the codec the
          file uses (usually HEVC) and a player that either outputs real HDR to an HDR display or
          tone-maps the video down to SDR. When either piece is missing, the file refuses to open
          or plays with gray, flat, washed-out color.
        </>
      }
      topCtaNote="FastPlay is a free, open-source Windows player that decodes HDR10 and HLG video and tone-maps it to SDR, so HDR footage looks right on a normal monitor with no codec packs and no settings."
      finalCtaHeading="Play your HDR footage now"
      finalCtaBody="Download the MSI, open the file, and FastPlay handles decode and tone mapping automatically. If it does not work for your footage, it cost you nothing."
    >
      <GuideSection id="what-hdr-needs" title="What HDR playback actually needs">
        <p>
          An HDR video file differs from a normal (SDR) file in three ways: it stores brightness
          with an HDR transfer function (PQ for HDR10, or HLG), it uses the wider BT.2020 color
          space, and it is almost always encoded as 10-bit HEVC (H.265). That means correct
          playback is really two separate problems:
        </p>
        <ul>
          <li>
            <strong>Decoding.</strong> The player has to decode 10-bit HEVC. Windows does not ship
            an HEVC decoder by default, which is why HDR files often fail before color is even a
            factor. That problem has its own guide:{' '}
            <a href={guidePath('hevc-player-windows')}>how to play HEVC video on Windows</a>.
          </li>
          <li>
            <strong>Presentation.</strong> The decoded image is in PQ or HLG and BT.2020. Something
            has to convert it for your screen: either pass it through as true HDR to an HDR-capable
            display, or tone-map it to SDR for a regular monitor. If nothing does this conversion,
            you get the classic washed-out look.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="why-it-fails" title="Why HDR video fails on Windows">
        <p>Nearly every HDR playback complaint on Windows traces back to one of these causes:</p>
        <ul>
          <li>
            <strong>No HEVC decoder.</strong> Media Player and the Movies &amp; TV app rely on the
            HEVC Video Extensions from the Microsoft Store, which are a paid add-on. Without them,
            HDR files will not open at all in the built-in apps.
          </li>
          <li>
            <strong>No tone mapping.</strong> The player decodes the file but draws the raw PQ/HLG
            image on an SDR desktop. Colors look gray and flat because BT.2020 values are being
            displayed as if they were regular sRGB. This is the most common failure, covered in
            detail in <a href={guidePath('hdr-looks-washed-out')}>why HDR looks washed out on Windows</a>.
          </li>
          <li>
            <strong>Windows HDR mode confusion.</strong> True HDR output needs an HDR-capable
            display and the Windows &quot;Use HDR&quot; toggle turned on (Settings &gt; System &gt;
            Display). With it off, no app can output real HDR. With it on, SDR content can look
            washed out instead until you adjust the SDR brightness balance.
          </li>
          <li>
            <strong>Display limits.</strong> Many budget monitors accept an HDR signal but cannot
            reach the brightness HDR is mastered for, so even correct playback looks dim or muted.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="fixes" title="Fixes you can try">
        <ol>
          <li>
            <strong>Confirm the file is actually HDR.</strong> A free tool like MediaInfo will show
            the transfer characteristics (PQ or HLG) and color primaries (BT.2020). If the file is
            plain BT.709 SDR, your problem is a codec or display issue instead.
          </li>
          <li>
            <strong>Use a player that tone-maps.</strong> The simplest fix on an ordinary SDR
            monitor. FastPlay does this automatically; VLC and mpv can also tone-map, though they
            may need configuration.
          </li>
          <li>
            <strong>For true HDR output, use the built-in path.</strong> If you have an HDR display
            and want real HDR, enable &quot;Use HDR&quot; in Windows display settings and install
            the HEVC Video Extensions so Media Player / Movies &amp; TV can decode the file. Those
            apps can pass HDR through to the display.
          </li>
          <li>
            <strong>Balance the desktop.</strong> With Windows HDR on, use the &quot;SDR content
            brightness&quot; slider so the rest of the desktop does not look faded.
          </li>
          <li>
            <strong>Convert as a last resort.</strong> HandBrake can transcode HDR HEVC to an SDR
            H.264 file for maximum compatibility, at the cost of time and some quality.
          </li>
        </ol>
        <InlineCta>
          If you just need HDR files to look correct on a normal monitor, a tone-mapping player is
          the one-step fix. FastPlay ships its own FFmpeg-based decoding, so no Store codecs are
          needed either.
        </InlineCta>
      </GuideSection>

      <GuideSection id="how-fastplay-helps" title="How FastPlay plays HDR">
        <p>
          FastPlay treats HDR as a solved presentation problem rather than a settings page. When it
          detects HDR10 (PQ) or HLG content, it tone-maps to SDR in a pixel shader: highlights
          above diffuse white are rolled off instead of clipping, and the BT.2020 gamut is
          converted to BT.709 for your display. The result is footage that looks like footage, not
          gray haze, on any monitor and regardless of the Windows HDR toggle.
        </p>
        <p>
          Decoding is handled the same way as everything else in FastPlay: FFmpeg demux and decode
          with D3D11 hardware decode on the preferred path and automatic software fallback, so HDR
          HEVC files from phones, cameras, and screen recorders open without installing anything
          extra.
        </p>
      </GuideSection>

      <GuideSection id="limits" title="Limits and caveats">
        <ul>
          <li>
            FastPlay does not do native HDR passthrough. Even on an HDR monitor, playback is
            tone-mapped SDR. If you want true HDR output on an HDR display, use the Windows
            built-in players with the HEVC extensions installed.
          </li>
          <li>
            The tone mapping is fixed. There are no exposure or curve controls, and
            mastering-display and content-light metadata are ignored. For critical color work,
            evaluate on a reference setup.
          </li>
          <li>
            FastPlay plays local files only and covers common formats via FFmpeg; uncommon or
            exotic codecs may not play.
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
