import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'quick-diagnosis', label: 'Quick diagnosis' },
  { id: 'cause-tone-mapping', label: 'Cause 1: the player is not tone mapping' },
  { id: 'cause-windows-hdr', label: 'Cause 2: the Windows HDR toggle' },
  { id: 'cause-display', label: 'Cause 3: display and driver limits' },
  { id: 'how-fastplay-helps', label: 'How FastPlay handles it' },
  { id: 'limits', label: 'Limits and caveats' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="hdr-looks-washed-out"
      toc={toc}
      lede={
        <>
          HDR video looks washed out on Windows when the pixels are HDR (PQ or HLG, in BT.2020
          color) but they are drawn as if they were ordinary SDR. Nothing is wrong with the file:
          the conversion step is missing. The fix depends on where the conversion broke down: the
          player, the Windows HDR toggle, or the display itself.
        </>
      }
      topCtaNote="FastPlay presents HDR10 and HLG natively on an HDR-active display and tone-maps them automatically on SDR, avoiding the raw-HDR-on-SDR washed-out failure."
      finalCtaHeading="Stop squinting at gray footage"
      finalCtaBody="FastPlay is a free, open-source Windows player that chooses native HDR or SDR tone mapping for the monitor containing the player when the file opens."
    >
      <GuideSection id="quick-diagnosis" title="Quick diagnosis">
        <p>Three questions separate the causes:</p>
        <ol>
          <li>
            <strong>Is only this video washed out?</strong> If the desktop looks normal and one
            video looks gray in your player, the player is not tone mapping. Most common case.
          </li>
          <li>
            <strong>Is everything on screen washed out?</strong> If the whole desktop looks faded,
            the Windows HDR toggle and the SDR brightness slider are the issue, not the video.
          </li>
          <li>
            <strong>Does HDR look dim rather than gray?</strong> If playback is correct but
            underwhelming on an &quot;HDR&quot; monitor, the display probably lacks the brightness
            HDR needs.
          </li>
        </ol>
        <p>
          To confirm a file really is HDR, check it in MediaInfo: HDR footage shows PQ or HLG
          transfer characteristics and BT.2020 primaries. Background on the pipeline is in{' '}
          <a href={guidePath('hdr-video-windows')}>how to play HDR video on Windows</a>.
        </p>
      </GuideSection>

      <GuideSection id="cause-tone-mapping" title="Cause 1: the player is not tone mapping">
        <p>
          HDR stores brightness and color differently from SDR. PQ and HLG curves spread values
          across a much larger brightness range, and BT.2020 places the color primaries further
          apart than the BT.709 space your SDR monitor uses. A player that decodes those pixels
          and draws them unconverted produces the signature look: low contrast, gray blacks, and
          desaturated color.
        </p>
        <p>
          The fix is tone mapping: compressing HDR brightness into the SDR range and converting
          the gamut. Some players do this automatically, some need configuration, and some do not
          do it at all. Switching players is a legitimate fix, not a workaround.
        </p>
        <InlineCta>
          FastPlay chooses automatically: native output when the destination display is HDR-active,
          or pixel-shader tone mapping when it is SDR. Open the same file and compare.
        </InlineCta>
      </GuideSection>

      <GuideSection id="cause-windows-hdr" title="Cause 2: the Windows HDR toggle">
        <p>
          Windows renders the whole desktop in HDR when &quot;Use HDR&quot; is enabled (Settings
          &gt; System &gt; Display). Two washed-out situations come from this toggle:
        </p>
        <ul>
          <li>
            <strong>HDR on, desktop faded.</strong> SDR apps and content are remapped into the HDR
            signal, and the default can look flat. Adjust &quot;SDR content brightness&quot; (in
            HDR settings) until the desktop looks right.
          </li>
          <li>
            <strong>HDR off, HDR video stuck in SDR.</strong> With the toggle off, no app can output
            true HDR, so players that rely on OS HDR output fall back to (or fail at) SDR
            presentation. Either enable the toggle for real HDR output or use a player that
            tone-maps.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="cause-display" title="Cause 3: display and driver limits">
        <ul>
          <li>
            <strong>Low-brightness HDR monitors.</strong> Many entry-level monitors advertise HDR
            but peak far below what HDR content is mastered for. Correctly played HDR then looks
            dim or lifeless. On such displays, tone-mapped SDR playback often looks better than
            &quot;real&quot; HDR.
          </li>
          <li>
            <strong>Limited vs. full RGB range.</strong> A GPU driver outputting limited-range RGB
            to a monitor expecting full range washes out everything, video and desktop alike.
            Check the range setting in your GPU control panel if blacks always look gray.
          </li>
          <li>
            <strong>Cables and modes.</strong> HDR at higher refresh rates needs enough link
            bandwidth; an old HDMI cable or port can silently drop the display out of HDR.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="how-fastplay-helps" title="How FastPlay handles it">
        <p>
          FastPlay takes the most common failure off the table by selecting a presentation path
          when the file opens. On an HDR-capable display with Windows HDR enabled, HDR10 (PQ) and
          HLG present natively through a 10-bit PQ swapchain. On SDR, highlights are tone-mapped
          instead of clipped and BT.2020 is converted to BT.709. Full-range PQ files—including
          some Topaz Video AI HDR Enhanced exports—are supported as of version 0.4.4.
        </p>
        <p>
          Since HDR files are usually HEVC, it also matters that FastPlay decodes HEVC itself with
          D3D11 hardware acceleration and software fallback, without Store codec add-ons. See{' '}
          <a href={guidePath('hevc-player-windows')}>how to play HEVC video on Windows</a>.
        </p>
      </GuideSection>

      <GuideSection id="limits" title="Limits and caveats">
        <ul>
          <li>
            FastPlay chooses HDR or SDR when the file opens, using the monitor containing its
            window. If you move the window to another monitor, reopen the file to reevaluate the
            display; otherwise the image can look wrong.
          </li>
          <li>
            SDR tone mapping is fixed, with no exposure or curve controls. Native HDR uses the
            stream's static metadata, but FastPlay is built for playback rather than reference
            grading.
          </li>
          <li>
            FastPlay cannot fix desktop-wide washout. If everything looks faded, work through the
            Windows HDR toggle, SDR brightness slider, and GPU range settings above.
          </li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
