import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'identify-symptom', label: 'Start with the symptom' },
  { id: 'quick-fixes', label: '9 fixes to try in order' },
  { id: 'codec-or-container', label: 'Codec or container problems' },
  { id: 'black-screen', label: 'Black screen or audio only' },
  { id: 'stuttering-color', label: 'Stuttering or wrong colors' },
  { id: 'how-fastplay-helps', label: 'How FastPlay helps' },
  { id: 'when-player-cannot-fix', label: 'What a player cannot fix' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="videos-not-playing-on-pc"
      toc={toc}
      lede={
        <>
          If videos are not playing on your PC, the cause is usually one of five things: the app
          cannot decode the video codec, the file is incomplete or damaged, hardware acceleration
          is failing, the storage device is too slow, or the video uses color and display features
          your current player is handling incorrectly. Use the symptom and checklist below to find
          the cause without installing random codec packs.
        </>
      }
      topCtaNote="FastPlay is a free Windows player with built-in FFmpeg decoding, D3D11 hardware acceleration, automatic software fallback, and HDR-to-SDR tone mapping. It is a quick way to test whether your usual player is the problem."
      finalCtaHeading="Test the video in a self-contained player"
      finalCtaBody="FastPlay is free and open source. Open the local file directly, without an account, codec pack, or system-wide decoder changes."
    >
      <GuideSection id="identify-symptom" title="Start with the symptom">
        <p>
          &quot;Not playing&quot; can describe several different failures. The exact symptom points to
          a much smaller set of likely causes:
        </p>
        <ul>
          <li>
            <strong>The file will not open:</strong> the player may not recognize its container or
            video codec, the download may be incomplete, or the file may not really be a video.
          </li>
          <li>
            <strong>You hear audio but see a black screen:</strong> the audio codec works, but the
            video decoder or hardware-acceleration path is failing.
          </li>
          <li>
            <strong>The picture freezes or stutters:</strong> the PC may be decoding a demanding
            codec in software, reading from slow storage, or competing with other heavy programs.
          </li>
          <li>
            <strong>The picture looks gray, faded, or too dark:</strong> an HDR video is probably
            being shown without correct HDR output or tone mapping.
          </li>
          <li>
            <strong>Only browser videos fail:</strong> focus on the browser, extensions, DRM, and
            network connection. This guide is for local files saved on the PC.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="quick-fixes" title="9 fixes to try in order">
        <ol>
          <li>
            <strong>Try one known-good video.</strong> Open a small MP4 that has played before. If
            every video fails, repair or update the player and graphics driver. If only one file
            fails, investigate that file instead of changing the whole PC.
          </li>
          <li>
            <strong>Check the file size and source.</strong> A zero-byte, unusually small, or partly
            downloaded file cannot play. Re-download it or copy it again from the phone, camera,
            cloud drive, or memory card.
          </li>
          <li>
            <strong>Copy the file to a local drive.</strong> Test from the internal SSD rather than
            a slow USB drive, network share, cloud placeholder, or damaged memory card. Wait for
            cloud files to finish downloading before opening them.
          </li>
          <li>
            <strong>Try a player with built-in decoding.</strong> FastPlay, VLC, and mpv include
            their own decoders. If the file works there, the original app probably lacks the codec
            or is using a broken playback path.
          </li>
          <li>
            <strong>Identify the codec.</strong> A tool such as MediaInfo can show whether the file
            contains H.264, HEVC/H.265, AV1, VP9, or another format. The extension alone does not
            tell you this.
          </li>
          <li>
            <strong>Update the graphics driver.</strong> Install the current driver from Intel,
            AMD, NVIDIA, or your PC manufacturer, then restart Windows. Video decoding relies on
            the driver even when games and the desktop look normal.
          </li>
          <li>
            <strong>Test software decoding.</strong> If your player offers a hardware-acceleration
            switch, turn it off temporarily. A picture that returns in software mode points to a
            GPU, driver, or unsupported hardware-codec path—not a missing audio track.
          </li>
          <li>
            <strong>Close heavy background programs.</strong> Browsers, games, editors, screen
            recorders, and updates can consume the CPU, GPU, or disk bandwidth needed for 4K and
            high-frame-rate playback.
          </li>
          <li>
            <strong>Convert a valid but incompatible file.</strong> If the file plays in one app
            but must work everywhere, convert a copy to H.264 video with AAC audio in an MP4
            container. Keep the original until you verify the converted copy.
          </li>
        </ol>
        <InlineCta>
          A useful first test is to open the same file in FastPlay. If it plays, you know the file
          contains readable media and can focus on the original app or its codec support.
        </InlineCta>
      </GuideSection>

      <GuideSection id="codec-or-container" title="Codec or container problems">
        <p>
          A video file has a container and one or more encoded streams. MP4, MOV, MKV, AVI, and
          WebM are containers; H.264, HEVC, AV1, and VP9 are video codecs. Two files ending in
          .MP4 can therefore need completely different decoders. Renaming a file extension does
          not convert the video inside it.
        </p>
        <p>
          HEVC is a common reason that 4K phone, drone, action-camera, and HDR footage will not play
          in a default Windows setup. Read <a href={guidePath('hevc-player-windows')}>how to play
          HEVC video on Windows</a> for decoder and hardware-support options. QuickTime MOV files can
          contain HEVC, H.264, or professional camera codecs, so the MOV extension is not a diagnosis;
          use the <a href={guidePath('mov-not-playing-windows')}>MOV troubleshooting guide</a> for
          that case.
        </p>
        <p>
          Avoid downloading an old system-wide codec pack from an unknown site. A maintained,
          self-contained player is easier to remove and does not replace media components used by
          unrelated Windows apps.
        </p>
      </GuideSection>

      <GuideSection id="black-screen" title="Black screen, green video, or audio only">
        <p>
          Hearing audio proves that the player can open at least part of the file. It does not prove
          that the video stream is supported. Audio-only playback often means the video codec is
          missing; a black or green picture can also mean the hardware decoder created a frame that
          the graphics driver failed to display correctly.
        </p>
        <p>
          Try the same file in a self-contained player, update the GPU driver, and test with hardware
          acceleration disabled. If software decoding works, leave it as a temporary fallback, but
          expect higher CPU use on 4K, 60 FPS, 10-bit, or HEVC files. If no player can show a picture,
          inspect the codec and test another file from the same device before assuming Windows is
          broken.
        </p>
      </GuideSection>

      <GuideSection id="stuttering-color" title="When video plays but stutters or looks wrong">
        <p>
          Choppy playback is different from a file that will not open. Check Task Manager while the
          video runs: high CPU usage can indicate software decoding, while high disk activity can
          indicate slow storage. Move the file to an SSD, close background work, and confirm that
          hardware decode is active. The full <a href={guidePath('video-stuttering-windows')}>Windows
          video stuttering guide</a> also covers display refresh-rate mismatch and demanding 4K or
          high-frame-rate media.
        </p>
        <p>
          If the video looks washed out, gray, or too dark but otherwise plays, it is probably an HDR
          presentation problem rather than corruption. Windows HDR mode, the display, and the player
          all affect the result. See <a href={guidePath('hdr-looks-washed-out')}>why HDR video looks
          washed out</a> and <a href={guidePath('hdr-video-windows')}>how to play HDR video on
          Windows</a> before converting the file.
        </p>
      </GuideSection>

      <GuideSection id="how-fastplay-helps" title="How FastPlay helps diagnose local videos">
        <p>
          FastPlay is a free, open-source player for local video files on Windows. Its FFmpeg-based
          playback pipeline handles common MP4, MOV, MKV, AVI, WebM, M4V, and WMV containers without
          installing a system codec pack. It prefers D3D11 hardware decoding where the GPU supports
          the codec and falls back to software decoding when that path is unavailable.
        </p>
        <p>
          FastPlay also tone-maps HDR10 and HLG video for an SDR display, which helps distinguish a
          color-management problem from a damaged file. Because it is self-contained, a successful
          FastPlay test does not change the codecs used by other Windows apps; it simply shows that
          the file can be demuxed and decoded by a different playback pipeline.
        </p>
      </GuideSection>

      <GuideSection id="when-player-cannot-fix" title="What a video player cannot fix">
        <ul>
          <li>
            <strong>Incomplete or corrupted files:</strong> a player may recover around small errors,
            but it cannot recreate missing video data or a missing recording index.
          </li>
          <li>
            <strong>DRM-protected downloads:</strong> video saved by a streaming service may require
            that service's app, account, and license. FastPlay is for ordinary local media files.
          </li>
          <li>
            <strong>Unsupported hardware:</strong> software decoding may be too slow for 4K60,
            8K, 10-bit, or newer codecs on an older CPU. Converting the file on a capable machine
            may be the practical answer.
          </li>
          <li>
            <strong>Professional or unusual formats:</strong> some camera, editing, scientific, or
            proprietary codecs need the vendor's software or a transcoding step.
          </li>
        </ul>
        <p>
          The safest troubleshooting rule is to preserve the original. Re-copy or convert to a new
          file instead of overwriting the only copy of important footage.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
