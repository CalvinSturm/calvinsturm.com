import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'the-job', label: 'What "long video to shorts" actually involves' },
  { id: 'find-moments', label: 'Step 1: find the moments' },
  { id: 'reframe', label: 'Step 2: reframe for 9:16' },
  { id: 'captions-and-export', label: 'Step 3: captions and export' },
  { id: 'local-vs-cloud', label: 'Local tools vs upload-based clippers' },
  { id: 'fastclip-workflow', label: 'The FastClip workflow' },
  { id: 'limits', label: 'Limitations' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="long-video-into-vertical-clips"
      toc={toc}
      lede={
        <>
          Turning a long recording into vertical clips means three jobs: finding the worthwhile
          moments, reframing 16:9 footage into 9:16, and exporting each clip at 1080×1920 with
          captions. You can do all three by hand in an editor, upload the footage to a cloud
          clipping service, or run a local tool like FastClip that proposes the moments and
          handles the reframe and export on your own machine.
        </>
      }
      topCtaNote="FastClip imports a long local video, proposes ranked highlight candidates, and exports 1080×1920 vertical MP4s with optional captions. Your footage never leaves your machine."
      finalCtaHeading="Clip the good parts, skip the scrubbing"
      finalCtaBody="FastClip is a local Windows app for exactly this workflow: import, review ranked candidates, export vertical clips. Open beta, free to try, no uploads and no monthly credits."
    >
      <GuideSection id="the-job" title='What "long video to shorts" actually involves'>
        <p>
          A two-hour stream, match, podcast, or lecture might contain five clips worth posting.
          Getting them out takes:
        </p>
        <ul>
          <li>
            <strong>Selection.</strong> Finding those five moments. Done by hand this is the slow
            part: scrubbing the timeline for an hour to remember where things happened.
          </li>
          <li>
            <strong>Reframing.</strong> Shorts, Reels, and TikTok are 9:16. Horizontal footage has
            to be cropped, and the crop has to follow the action or the subject wanders out of
            frame.
          </li>
          <li>
            <strong>Packaging.</strong> Each clip needs to be exported at 1080×1920, usually with
            captions, since most short-form viewing starts muted.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="find-moments" title="Step 1: find the moments">
        <p>Three honest options, in increasing order of automation:</p>
        <ol>
          <li>
            <strong>Manual scrubbing.</strong> Free and precise, but slow. If you go this route, a
            player with keyboard-driven seeking, speed control, and in/out points makes it far less
            painful; that is the{' '}
            <a href="/fastplay/guides/video-review-workflow">review workflow FastPlay is built for</a>.
          </li>
          <li>
            <strong>Chat or note timestamps.</strong> If the source was a stream, chat spikes and
            your own markers are a decent map of where the energy was.
          </li>
          <li>
            <strong>Automated analysis.</strong> Tools score the footage and propose candidates.
            FastClip does this on-device with acoustic and structural signals: speech density,
            audio energy spikes, dead air, and hook openings. It shows a ranked list of candidate
            clips with time ranges, and you approve or adjust each one. Automation gets you to
            review faster; it does not replace your judgment about what is actually worth posting.
          </li>
        </ol>
      </GuideSection>

      <GuideSection id="reframe" title="Step 2: reframe for 9:16">
        <ul>
          <li>
            <strong>Center-crop is the workhorse.</strong> It suits centered subjects: a speaker,
            a streamer cam, most single-subject action. FastClip exports a deterministic
            center-crop to 1080×1920, so the same clip renders the same way every time.
          </li>
          <li>
            <strong>Off-center action needs a different framing decision.</strong> Subject-tracking
            crops exist in cloud clippers and full editors; FastClip deliberately does not guess.
            If the action lives at the edge of frame, adjust the clip range to a moment where it is
            centered, or finish that one clip in an editor.
          </li>
          <li>
            <strong>Check the edges.</strong> Scoreboards, HUDs, and slide content often live in
            the 16:9 margins that a 9:16 crop removes. Preview every clip before exporting; if the
            context is in the margins, that moment may simply not work vertical.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="captions-and-export" title="Step 3: captions and export">
        <p>
          Most short-form viewing starts with the sound off, so burned-in captions are close to
          mandatory for talk-heavy clips. The export target for every major platform is the same:
          <strong> 1080×1920 MP4, H.264 with AAC audio</strong>. FastClip transcribes speech
          locally with whisper.cpp and burns captions in at export; the details of that caption
          workflow are covered in{' '}
          <a href={guidePath('auto-captions-without-uploading')}>
            adding auto-generated captions without uploading
          </a>
          .
        </p>
      </GuideSection>

      <GuideSection id="local-vs-cloud" title="Local tools vs upload-based clippers">
        <p>
          Most well-known clipping products (Opus Clip, Vizard, and similar) are cloud services:
          you upload the footage, their servers process it, and you pay monthly or in credits.
          That model has real costs:
        </p>
        <ul>
          <li>
            <strong>Upload time.</strong> A two-hour 1080p recording is many gigabytes; on a
            typical home upload connection, the upload alone can take longer than local analysis.
          </li>
          <li>
            <strong>Privacy.</strong> Unreleased, client, or personal footage leaves your control.
          </li>
          <li>
            <strong>Recurring pricing.</strong> Subscriptions and credit meters, priced for the
            vendor&apos;s GPU bill.
          </li>
        </ul>
        <p>
          Cloud clippers earn their keep with features local tools do not have yet, like AI virality
          scoring tuned on platform data and team workflows. But if the job is &quot;get the good
          moments out of my footage as vertical clips,&quot; a local tool does it without the
          upload, the subscription, or the privacy trade.
        </p>
        <InlineCta>
          FastClip runs analysis, transcription, and export entirely on your Windows machine. No
          uploads, no account, no credits.
        </InlineCta>
      </GuideSection>

      <GuideSection id="fastclip-workflow" title="The FastClip workflow">
        <ol>
          <li>Import a long local video (it is referenced in place, never copied or modified).</li>
          <li>Pick the workflow mode that matches the footage, like ActionSports or podcast-style.</li>
          <li>Let analysis run on-device; FastClip proposes ranked candidate clips with time ranges.</li>
          <li>Review each candidate, adjust ranges, and select the keepers.</li>
          <li>Export selected clips as 1080×1920 MP4s, with optional burned-in captions.</li>
        </ol>
      </GuideSection>

      <GuideSection id="limits" title="Limitations">
        <ul>
          <li>
            <strong>FastClip is not an editor.</strong> There is no multi-track timeline, no
            compositing, no B-roll insertion. If a clip needs editing beyond trim, captions, and
            reframe, finish it in an editor.
          </li>
          <li>
            <strong>Highlight scoring is signal-based, not clairvoyant.</strong> It ranks moments
            by on-device signals; it does not know your audience. Review is part of the workflow by
            design.
          </li>
          <li>
            <strong>Open beta.</strong> Expect rough edges; builds ship on GitHub Releases and the
            planned model is a free tier plus a one-time Pro license for bulk export.
          </li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
