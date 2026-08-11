import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'limits', label: 'Email attachment limits, honestly' },
  { id: 'attach-or-link', label: 'Attach it or link it?' },
  { id: 'quality', label: 'Where the quality actually goes' },
  { id: 'how-to', label: 'How to compress for an attachment' },
  { id: 'fastcompress-workflow', label: 'The FastCompress workflow' },
  { id: 'faq', label: 'Common questions' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="compress-video-for-email"
      toc={toc}
      lede={
        <>
          Most email providers advertise a 25 MB attachment limit, but encoding overhead means the
          real ceiling for a video attachment is roughly 18 MB. To send a video by email, either
          compress it to an attachment-safe size or, for anything long, send a link instead.
          FastCompress&apos;s Email Safe preset targets the attachment case directly.
        </>
      }
      topCtaNote="FastCompress has an Email Safe preset with an editable target size: pick the file, pick the preset, attach the result. Local processing, no watermark, no account."
      finalCtaHeading="Send the video, not the apology email"
      finalCtaBody="FastCompress is a local Windows compressor with plain-English presets for email, Discord, and YouTube. Pick where the video is going and get a file that fits. Free during beta."
    >
      <GuideSection id="limits" title="Email attachment limits, honestly">
        <ul>
          <li>
            <strong>Gmail: 25 MB</strong> per message. <strong>Outlook.com: 20 MB.</strong>{' '}
            Corporate mail servers are often stricter (10 MB limits are common), and the limit that
            matters is whichever is smaller between you and the recipient.
          </li>
          <li>
            <strong>The advertised number is not what you get.</strong> Attachments are encoded for
            transport (base64), which inflates them by about a third. A 24 MB video becomes a ~32
            MB message and bounces off a 25 MB limit.
          </li>
          <li>
            <strong>Practical rule: keep the file under ~18 MB for Gmail</strong>, under ~14 MB for
            Outlook.com, and under ~7 MB if you suspect a strict corporate server on either end.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="attach-or-link" title="Attach it or link it?">
        <p>Compressing is not always the right answer.</p>
        <ul>
          <li>
            <strong>Attach</strong> when the video is short (a couple of minutes), the recipient is
            not technical, or the email needs to be self-contained: inspection clips, kids&apos;
            moments for family, a bug recording for support.
          </li>
          <li>
            <strong>Link</strong> when the video is long or quality matters: upload to Google
            Drive, OneDrive, or unlisted YouTube and paste the link. An 18 MB budget spread over
            fifteen minutes of video cannot look good, the same duration arithmetic covered in{' '}
            <a href={guidePath('compress-video-for-discord')}>the Discord guide</a>.
          </li>
        </ul>
        <p>
          Rough guide: at ~18 MB, up to two minutes can stay 1080p-decent, five minutes is
          watchable at 720p, and beyond ten minutes you should be sending a link.
        </p>
      </GuideSection>

      <GuideSection id="quality" title="Where the quality actually goes">
        <p>
          &quot;Without destroying quality&quot; is mostly about spending a fixed byte budget where
          it is visible:
        </p>
        <ul>
          <li>
            <strong>Resolution.</strong> Dropping 4K or 1440p footage to 1080p, or 1080p to 720p,
            frees an enormous share of the budget and is barely visible on the phone or laptop
            screen where email attachments get watched.
          </li>
          <li>
            <strong>Duration.</strong> Trim ruthlessly first; every trimmed second raises the
            bitrate of every remaining second.
          </li>
          <li>
            <strong>Codec efficiency.</strong> A properly encoded H.264 MP4 at a calculated bitrate
            looks far better than a screen recording or camera original chopped down by a generic
            &quot;reduce file size&quot; button. MP4 with H.264 and AAC also plays everywhere,
            which matters when you cannot control the recipient&apos;s device.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="how-to" title="How to compress for an attachment">
        <ol>
          <li>
            <strong>Trim first.</strong> Windows Photos or Clipchamp can cut the video to just the
            part the recipient needs.
          </li>
          <li>
            <strong>Pick a target size</strong> from the limits above: 18 MB for Gmail-to-Gmail,
            smaller when in doubt.
          </li>
          <li>
            <strong>Re-encode to that target.</strong> With FastCompress, choose the Email Safe
            preset (the target is editable). With FFmpeg or HandBrake, compute the video bitrate as
            (target size in kilobits ÷ duration in seconds) minus ~96 kbps for audio, and consider
            720p output for anything over a couple of minutes.
          </li>
          <li>
            <strong>Watch the result before sending.</strong> Thirty seconds of checking beats a
            follow-up email asking why the video is unwatchable.
          </li>
        </ol>
        <InlineCta>
          FastCompress shows a before-and-after summary, so you know the attachment fits before
          you open your email client.
        </InlineCta>
      </GuideSection>

      <GuideSection id="fastcompress-workflow" title="The FastCompress workflow">
        <ol>
          <li>Open FastCompress and select the video.</li>
          <li>
            Choose <strong>Email Safe</strong>. Edit the target size if you know the recipient&apos;s
            limit is tighter or looser than the default.
          </li>
          <li>Press Compress; FFmpeg runs locally and nothing uploads anywhere.</li>
          <li>Attach the output file from the result summary.</li>
        </ol>
        <p>
          The free version handles one video at a time with all presets, editable targets, and no
          watermark. Batch compression, saved presets, and GPU encoding are planned for a one-time
          FastCompress Pro license.
        </p>
      </GuideSection>

      <GuideSection id="faq" title="Common questions">
        <ul>
          <li>
            <strong>Why did my email bounce when the file was under the limit?</strong> Transport
            encoding inflated it past the cap, or the recipient&apos;s server has a lower limit
            than yours. Compress smaller and resend.
          </li>
          <li>
            <strong>Should I zip the video instead?</strong> No. Video is already compressed;
            zipping an MP4 saves a few percent at best and makes it harder for the recipient to
            watch.
          </li>
          <li>
            <strong>Gmail turned my attachment into a Drive link.</strong> That is Gmail&apos;s
            fallback for oversized files. It works, but it requires the recipient to have access
            and it may expire from your storage; an under-limit attachment or a deliberate link is
            more predictable.
          </li>
          <li>
            <strong>Does compressing twice make it worse?</strong> Yes, each re-encode loses
            quality. Always compress from the original file, not from a previously compressed copy.
          </li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
