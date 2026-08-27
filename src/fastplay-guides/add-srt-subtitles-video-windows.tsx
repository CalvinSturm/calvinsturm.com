import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'quick-setup', label: 'Quick SRT setup' },
  { id: 'filename', label: 'Match the filenames' },
  { id: 'toggle', label: 'Show or hide subtitles' },
  { id: 'troubleshoot', label: 'Troubleshoot missing subtitles' },
  { id: 'limits', label: 'FastPlay subtitle limits' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="add-srt-subtitles-video-windows"
      toc={toc}
      lede={
        <>
          You do not need to re-encode a video to watch it with subtitles. Put an external{' '}
          <code>.srt</code> file beside the video, give both files the same base name, and open the
          video in a player that loads sidecar subtitles. The original MP4 or MOV stays unchanged.
        </>
      }
      topCtaNote="FastPlay automatically finds a same-name SRT file beside a local video. Press S during playback to show or hide it."
      finalCtaHeading="Play the video with its SRT file"
      finalCtaBody="Place both files in one folder, match their names, and open the video in FastPlay. No subtitle installation or video conversion is required."
    >
      <GuideSection id="quick-setup" title="Quick SRT subtitle setup">
        <ol>
          <li>Move the video and subtitle file into the same folder.</li>
          <li>Rename the SRT to match the video&apos;s filename before the extension.</li>
          <li>Open the video in FastPlay.</li>
          <li>Press <code>S</code> if you need to toggle the subtitles on.</li>
        </ol>
        <p>For example:</p>
        <pre><code>{`vacation.mp4
vacation.srt`}</code></pre>
        <p>
          The extensions stay different. Only <code>vacation</code> must match exactly.
        </p>
      </GuideSection>

      <GuideSection id="filename" title="Make the video and SRT filenames match">
        <p>
          Windows often hides known file extensions, which can accidentally produce a name such
          as <code>vacation.srt.txt</code>. In File Explorer, open View &gt; Show and enable File name
          extensions before renaming. Then confirm the pair looks like this:
        </p>
        <ul>
          <li><code>lesson-03.mov</code> and <code>lesson-03.srt</code>: loads automatically.</li>
          <li><code>lesson-03.mov</code> and <code>lesson-03-english.srt</code>: does not match.</li>
          <li><code>lesson-03.mov</code> and <code>lesson-03.srt.txt</code>: still a text file, not an SRT.</li>
        </ul>
        <p>
          Keep the files together if you move or copy the video. Sidecar subtitles are separate
          files; they are not embedded into the video container.
        </p>
      </GuideSection>

      <GuideSection id="toggle" title="Show or hide subtitles during playback">
        <p>
          Open the video rather than the SRT file. FastPlay looks beside it for the matching
          subtitle file and renders cues at their timestamps. Press <code>S</code> to toggle the
          subtitle layer without stopping playback or changing the original file.
        </p>
        <InlineCta>
          This is useful for checking subtitle timing: combine <code>S</code> with pause, seeking,
          and the frame controls described in the{' '}
          <a href={guidePath('video-review-workflow')}>FastPlay review workflow</a>.
        </InlineCta>
      </GuideSection>

      <GuideSection id="troubleshoot" title="Troubleshoot subtitles that do not appear">
        <ol>
          <li>Confirm both files are in the same folder and their base names match.</li>
          <li>Enable file extensions and make sure the subtitle is really <code>.srt</code>.</li>
          <li>Open the SRT in Notepad and confirm it contains numbered, timestamped cues.</li>
          <li>Save unusual text as UTF-8 if accented or non-English characters display incorrectly.</li>
          <li>Press <code>S</code> once in case subtitles were toggled off.</li>
          <li>Check the first cue&apos;s timestamp; the subtitles may simply begin later in the video.</li>
        </ol>
        <p>
          FastPlay accepts UTF-8 with a byte-order mark and falls back to Windows-1252 for common
          legacy subtitle files. Converting an uncertain file to UTF-8 is the safest option.
        </p>
      </GuideSection>

      <GuideSection id="limits" title="FastPlay subtitle limits">
        <ul>
          <li>FastPlay currently loads external sidecar SRT files, not embedded subtitle tracks.</li>
          <li>It does not provide a track picker for multiple languages.</li>
          <li>SRT styling support is intentionally minimal; advanced ASS/SSA positioning and effects are not supported.</li>
          <li>This workflow adds subtitles for playback only. It does not burn them permanently into an exported video.</li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
