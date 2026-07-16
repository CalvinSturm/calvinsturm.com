import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'why-captions', label: 'Why captions are non-negotiable for shorts' },
  { id: 'how-local-works', label: 'How captions work without a cloud service' },
  { id: 'options', label: 'Local caption options on Windows' },
  { id: 'fastclip-workflow', label: 'The FastClip caption workflow' },
  { id: 'quality-tips', label: 'Getting accurate transcriptions' },
  { id: 'limits', label: 'Limitations' },
];

function Article() {
  return (
    <GuideLayout
      slug="auto-captions-without-uploading"
      toc={toc}
      lede={
        <>
          Auto-generated captions no longer require uploading your video to a cloud service.
          Speech-recognition models like Whisper run well on an ordinary Windows PC, so a local
          tool can transcribe your clip and burn the captions in without the footage ever leaving
          your machine. FastClip does this with whisper.cpp as part of its vertical-clip export.
        </>
      }
      topCtaNote="FastClip transcribes speech locally with whisper.cpp and burns captions into exported 9:16 clips. No uploads, no account, no per-minute transcription fees."
      finalCtaHeading="Captioned clips, straight from your machine"
      finalCtaBody="FastClip finds highlights in long local videos and exports vertical clips with optional burned-in captions, all processed on-device. Open beta, free to try."
    >
      <GuideSection id="why-captions" title="Why captions are non-negotiable for shorts">
        <ul>
          <li>
            <strong>Muted autoplay.</strong> Feeds start videos silent; captions are what make a
            talk-heavy clip survive its first two seconds.
          </li>
          <li>
            <strong>Retention.</strong> Word-by-word captions give viewers something to track and
            make jokes and punchlines land even at speed.
          </li>
          <li>
            <strong>Accessibility.</strong> Captions are simply how a meaningful share of your
            audience watches everything.
          </li>
        </ul>
        <p>
          For short-form, captions are usually <em>burned in</em> (rendered into the pixels) rather
          than attached as a subtitle track, because vertical platforms do not reliably show
          uploaded subtitle files in the feed.
        </p>
      </GuideSection>

      <GuideSection id="how-local-works" title="How captions work without a cloud service">
        <p>
          The piece that used to require a cloud API is speech-to-text. That changed when OpenAI
          released the Whisper model openly, and projects like <strong>whisper.cpp</strong>{' '}
          reimplemented it to run efficiently on consumer CPUs and GPUs. A local caption pipeline
          is:
        </p>
        <ol>
          <li>Extract the clip&apos;s audio.</li>
          <li>Run it through a local Whisper model, producing text with word-level timestamps.</li>
          <li>Render the words as styled captions synced to those timestamps.</li>
          <li>Burn the rendered captions into the exported video.</li>
        </ol>
        <p>
          Everything happens on your hardware. Nothing is uploaded, there is no per-minute fee, and
          unreleased or sensitive footage stays private.
        </p>
      </GuideSection>

      <GuideSection id="options" title="Local caption options on Windows">
        <ol>
          <li>
            <strong>FastClip</strong>: transcription and caption burn-in are built into the
            clip-export workflow, so captioning is a checkbox rather than a separate tool chain.
          </li>
          <li>
            <strong>Standalone Whisper tools</strong> (whisper.cpp builds, Buzz, and similar
            front-ends): produce an .srt subtitle file locally. Good when you want the text itself,
            but you still need an editor or FFmpeg pass to style and burn the captions in.
          </li>
          <li>
            <strong>Editors with built-in transcription</strong> (DaVinci Resolve, Premiere):
            powerful styling control, heavier workflow, and in some products the transcription is a
            cloud feature, so check where the audio goes if privacy matters.
          </li>
        </ol>
      </GuideSection>

      <GuideSection id="fastclip-workflow" title="The FastClip caption workflow">
        <ol>
          <li>
            Import a long video and let FastClip propose highlight candidates (covered in{' '}
            <a href={guidePath('long-video-into-vertical-clips')}>
              turning a long video into vertical clips
            </a>
            ).
          </li>
          <li>Select the clips to export and enable captions.</li>
          <li>
            FastClip runs whisper.cpp on the clip audio locally and burns the captions into the
            1080×1920 MP4 at export.
          </li>
        </ol>
        <p>
          The free beta includes the clean_white caption style; premium caption styles are part of
          the planned one-time Pro license.
        </p>
        <InlineCta>
          Captioning happens during export, so a reviewed candidate becomes a ready-to-post,
          captioned vertical clip in one step.
        </InlineCta>
      </GuideSection>

      <GuideSection id="quality-tips" title="Getting accurate transcriptions">
        <ul>
          <li>
            <strong>Clean audio in, clean text out.</strong> Whisper is impressively robust, but
            crosstalk, heavy game audio under speech, and clipped microphones are what produce
            garbled captions.
          </li>
          <li>
            <strong>Proper nouns and slang miss most often.</strong> Player names, channel in-jokes,
            and game terms are worth a quick proofread; a wrong name in a burned-in caption cannot
            be fixed after posting.
          </li>
          <li>
            <strong>Watch the clip once before posting.</strong> Caption errors cluster at exactly
            the moments that made the clip worth posting: shouting, overlap, chaos.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="limits" title="Limitations">
        <ul>
          <li>
            <strong>Burned-in means permanent.</strong> Once exported, the captions are pixels.
            Keep the source clip if you might want a different style later.
          </li>
          <li>
            <strong>FastClip captions FastClip&apos;s clips.</strong> It is not a general-purpose
            subtitle editor for arbitrary videos; for that, a standalone Whisper front-end plus an
            editor is the better fit.
          </li>
          <li>
            <strong>English-heavy accuracy.</strong> Whisper supports many languages, but accuracy
            varies; test on your language and audio before committing to a batch.
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
