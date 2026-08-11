import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'limits', label: 'What the Discord limits actually are' },
  { id: 'why-hard', label: 'Why hitting 10 MB is harder than it looks' },
  { id: 'trim-first', label: 'Step 1: trim before you compress' },
  { id: 'three-ways', label: 'Three ways to get under the cap' },
  { id: 'fastcompress-workflow', label: 'The FastCompress workflow' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="compress-video-for-discord"
      toc={toc}
      lede={
        <>
          Discord rejects uploads over 10 MB on a free account, and a phone or gameplay recording
          blows past that in seconds. The fix is to re-encode the video at a bitrate calculated
          from its length so the file lands just under the cap. You can do that by hand with
          HandBrake or FFmpeg, or let FastCompress&apos;s Discord preset do the math for you.
        </>
      }
      topCtaNote="FastCompress has a Discord preset with an editable target size: pick the file, pick Discord, and get a clip that uploads. Everything runs locally, with no watermark."
      finalCtaHeading="Stop re-exporting until it fits"
      finalCtaBody="FastCompress is a local Windows compressor built for exactly this: pick the Discord preset, adjust the target if your server allows bigger files, and send the result. Free during beta."
    >
      <GuideSection id="limits" title="What the Discord limits actually are">
        <p>
          The upload cap depends on who is uploading and where (numbers as of mid-2026; Discord
          adjusts them occasionally, and the upload error message always shows your current cap):
        </p>
        <ul>
          <li>
            <strong>Free account: 10 MB</strong> per file, in any server or DM.
          </li>
          <li>
            <strong>Nitro Basic: 50 MB.</strong> <strong>Nitro: 500 MB.</strong> These follow your
            account everywhere.
          </li>
          <li>
            <strong>Boosted servers</strong> raise the cap for everyone in that server: 50 MB at
            boost level 2 and 100 MB at level 3, but only inside that server.
          </li>
        </ul>
        <p>
          So the honest target for a video you want to share anywhere, with anyone, is
          <strong> under 10 MB</strong>. Aim for 9.5 MB rather than 9.99: some tools measure
          megabytes slightly differently than Discord does, and a small margin avoids a second
          attempt.
        </p>
      </GuideSection>

      <GuideSection id="why-hard" title="Why hitting 10 MB is harder than it looks">
        <p>
          File size is roughly <strong>bitrate × duration</strong>. Ten megabytes is about 80
          megabits, so a 60-second clip can spend ~1.3 Mbps on video and audio combined, a
          two-minute clip ~0.65 Mbps, and a ten-minute recording ~0.13 Mbps, which is less than a
          1998 dial-up stream. That is the whole game:
        </p>
        <ul>
          <li>
            <strong>Short clips compress fine.</strong> Under a minute of 1080p gameplay at ~1.2
            Mbps looks acceptable.
          </li>
          <li>
            <strong>Long videos cannot look good at 10 MB.</strong> No encoder setting fixes the
            arithmetic. If the video is more than a few minutes, trim it or upload it somewhere
            without the cap (YouTube unlisted, a Drive link) and paste the link in Discord instead.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="trim-first" title="Step 1: trim before you compress">
        <p>
          Every second you keep costs bitrate everywhere else. Before compressing, cut the video
          down to the moment that matters: the kill, the bug, the goal, the reaction. The built-in
          Windows tools are enough: open the file in the Photos app (or Clipchamp) and use Trim,
          then save the shorter copy. Ten seconds of sharp video beats two minutes of smear.
        </p>
      </GuideSection>

      <GuideSection id="three-ways" title="Three ways to get under the cap">
        <p>
          All three of these produce an MP4 (H.264 + AAC), which Discord plays inline on every
          platform.
        </p>
        <ol>
          <li>
            <strong>FastCompress (one-click preset).</strong> Pick the file, choose the Discord
            preset, press Compress. It calculates the bitrate from the clip&apos;s duration to land
            under the 10 MB default, and the target is editable if you have Nitro or a boosted
            server. Runs locally through FFmpeg, no watermark, no account.
          </li>
          <li>
            <strong>HandBrake (free, manual).</strong> Solid if you are comfortable choosing
            settings yourself. There is no target-size mode, so you have to do the bitrate math
            yourself: (target size in kilobits ÷ seconds) − audio bitrate, entered as Avg Bitrate
            in the Video tab.
          </li>
          <li>
            <strong>FFmpeg (free, command line).</strong> The classic two-pass recipe for a
            60-second clip targeting ~9.5 MB:
            <br />
            <code>
              ffmpeg -i in.mp4 -c:v libx264 -b:v 1100k -pass 1 -an -f mp4 NUL &amp;&amp; ffmpeg -i
              in.mp4 -c:v libx264 -b:v 1100k -pass 2 -c:a aac -b:a 96k out.mp4
            </code>
            <br />
            Recalculate <code>-b:v</code> for every different duration.
          </li>
        </ol>
        <InlineCta>
          The Discord preset in FastCompress does the duration-to-bitrate math automatically and
          shows a before-and-after size summary, so you know it fits before you switch back to
          Discord.
        </InlineCta>
      </GuideSection>

      <GuideSection id="fastcompress-workflow" title="The FastCompress workflow">
        <ol>
          <li>Open FastCompress and select the video (MP4, MOV, MKV, AVI, WebM, FLV, or WMV).</li>
          <li>
            Choose the <strong>Discord</strong> preset. The default target is 10 MB; edit the
            target number if your account or server allows more.
          </li>
          <li>
            Press Compress. FFmpeg runs locally on your machine; nothing is uploaded anywhere.
          </li>
          <li>
            Check the result summary (for example: <code>212.4 MB → 9.8 MB</code>), then drag the
            new file into Discord.
          </li>
        </ol>
        <p>
          The free version does one video at a time with every preset and no watermark. Batch
          compression and GPU encoding are planned for a one-time Pro license.
        </p>
      </GuideSection>

      <GuideSection id="troubleshooting" title="Troubleshooting">
        <ul>
          <li>
            <strong>Discord still rejects the file.</strong> You are probably a fraction over the
            cap. Re-run with a lower target (9.5 MB) so rounding differences cannot bite.
          </li>
          <li>
            <strong>The result looks blocky or smeared.</strong> The clip is too long for the
            budget. Trim harder, or lower the resolution: 720p at a starved bitrate looks better
            than 1080p at the same bitrate.
          </li>
          <li>
            <strong>Audio matters more than video?</strong> For music or voice clips, a lower
            resolution buys back audio quality inside the same 10 MB.
          </li>
          <li>
            <strong>The video is 20+ minutes.</strong> Do not compress it to 10 MB at all; upload
            it somewhere without the cap and share the link. For email limits specifically, see{' '}
            <a href={guidePath('compress-video-for-email')}>compressing a video for email</a>.
          </li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
