import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'fastplay-steps', label: 'Change speed in FastPlay' },
  { id: 'speed-means', label: 'What playback rates mean' },
  { id: 'choose-speed', label: 'Choose the right speed' },
  { id: 'common-problems', label: 'Fix common speed problems' },
  { id: 'playback-vs-export', label: 'Playback speed versus editing' },
  { id: 'faster-review', label: 'Use speed for faster review' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="change-video-playback-speed-windows"
      toc={toc}
      lede={
        <>
          To change video playback speed on a Windows PC, open the video in a player with speed
          controls and select a rate above 1x to play faster or below 1x to play slower. In
          FastPlay, press <code>]</code> to increase speed, <code>[</code> to decrease it, and{' '}
          <code>\</code> to return instantly to normal 1x playback. This changes how you watch the
          video without modifying the original file.
        </>
      }
      topCtaNote="FastPlay puts playback speed on three keyboard controls: the left bracket slows down, the right bracket speeds up, and backslash resets to 1x. The original local video is never changed."
      finalCtaHeading="Control playback speed from the keyboard"
      finalCtaBody="FastPlay is a free, open-source Windows player with keyboard speed controls, responsive seeking, frame stepping, loop ranges, and per-file resume."
    >
      <GuideSection id="fastplay-steps" title="How to change playback speed in FastPlay">
        <ol>
          <li>
            Open a local video in FastPlay by choosing the file, dragging it onto the player, or
            double-clicking it if FastPlay is your default video app.
          </li>
          <li>
            Press <code>]</code> to increase the playback speed. Press it again when you want the
            video to run faster.
          </li>
          <li>
            Press <code>[</code> to decrease the playback speed. Use slower playback when you need
            to inspect motion, read a brief screen, or follow a difficult section.
          </li>
          <li>
            Press <code>\</code> at any time to reset the video to normal 1x speed.
          </li>
        </ol>
        <p>
          The bracket keys are next to the letter P on a standard U.S. keyboard. Hold <code>H</code>
          in FastPlay if you want to see the controls overlay while the video is open.
        </p>
        <InlineCta>
          The quickest pattern is simple: tap <code>]</code> while skimming, then press{' '}
          <code>\</code> as soon as you reach a section that deserves normal-speed attention.
        </InlineCta>
      </GuideSection>

      <GuideSection id="speed-means" title="What 0.5x, 1x, 1.5x, and 2x mean">
        <p>
          Playback rate is a multiplier applied to the video timeline. Normal playback is 1x. A
          higher number shortens the viewing time, while a lower number stretches it:
        </p>
        <ul>
          <li><strong>0.5x:</strong> half speed, so a 10-minute video takes about 20 minutes.</li>
          <li><strong>1x:</strong> the video's normal recorded speed.</li>
          <li><strong>1.5x:</strong> 50 percent faster, so a 30-minute video takes about 20 minutes.</li>
          <li><strong>2x:</strong> double speed, so a 30-minute video takes about 15 minutes.</li>
        </ul>
        <p>
          Changing this setting during playback does not alter the video's resolution, frame rate,
          file size, or duration on disk. Close the player and the original media remains exactly
          as it was.
        </p>
      </GuideSection>

      <GuideSection id="choose-speed" title="Choose the right playback speed">
        <p>There is no single best rate. Match the speed to what you are trying to do:</p>
        <ul>
          <li>
            <strong>Use faster playback for lectures, meetings, podcasts, interviews, and long
            recordings.</strong> Start with a modest increase so speech stays easy to follow, then
            raise it for familiar or repetitive sections.
          </li>
          <li>
            <strong>Use slower playback for sports, tutorials, animation, and troubleshooting.</strong>
            Slowing the timeline can make a fast movement, mouse action, editing cut, or visual bug
            easier to inspect.
          </li>
          <li>
            <strong>Return to 1x when timing matters.</strong> Music, comedy, dramatic scenes, and
            edits built around precise rhythm are usually best judged at their intended speed.
          </li>
          <li>
            <strong>Pause and frame-step for exact moments.</strong> Slow playback helps you approach
            an event, but frame-by-frame controls are better for finding one exact frame.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="common-problems" title="Fix common playback-speed problems">
        <p>
          Faster or slower playback asks the player to schedule audio and video differently. If the
          result is hard to watch, the symptom usually identifies the problem:
        </p>
        <ul>
          <li>
            <strong>The video stutters at higher speed:</strong> the PC now has to decode more video
            in less time. Enable hardware decoding, close heavy background programs, test the file
            from an internal SSD, or use a smaller speed increase. See the{' '}
            <a href={guidePath('video-stuttering-windows')}>Windows video stuttering guide</a> for
            a full diagnostic checklist.
          </li>
          <li>
            <strong>Slow motion looks stepped instead of fluid:</strong> playback controls do not
            create new frames. A 30 FPS recording still contains only 30 unique frames per second,
            so very slow playback will expose the gaps between them.
          </li>
          <li>
            <strong>The controls are missing:</strong> speed options vary by player. Try its Playback
            menu, settings, or keyboard-shortcut list, or open the local file in a player that
            exposes speed control directly.
          </li>
          <li>
            <strong>Subtitles appear out of sync:</strong> reset to 1x and confirm the subtitle file
            is synchronized at normal speed first. If it is already early or late at 1x, changing
            speed is not the underlying cause. The{' '}
            <a href={guidePath('add-srt-subtitles-video-windows')}>SRT subtitle guide</a> covers file
            matching and troubleshooting.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="playback-vs-export" title="Playback speed is not the same as editing a video">
        <p>
          A player's speed control is temporary. It changes the viewing session, not the saved
          video. Sending the original file to another person will not preserve the faster or slower
          rate you selected.
        </p>
        <p>
          To create a new fast-motion or slow-motion video, use a video editor or transcoder and
          export a new file. That process changes timestamps, may resample audio, and can re-encode
          the media. Keep the original file until you have watched and verified the export. If you
          only want to watch, study, or review footage at a different rate, player controls are
          faster and avoid generation loss from re-encoding.
        </p>
      </GuideSection>

      <GuideSection id="faster-review" title="Combine speed controls with a faster review workflow">
        <p>
          Speed control is most useful when it works with seeking rather than replacing it. Increase
          the rate through useful but repetitive material, seek across sections you do not need,
          return to 1x near an important moment, then pause and step frame by frame when precision
          matters.
        </p>
        <p>
          FastPlay also provides in/out points and range looping, so you can mark a short section and
          replay it at different speeds without manually seeking back each time. Its per-file resume
          remembers where you stopped in a long recording. For the complete process, read the{' '}
          <a href={guidePath('video-review-workflow')}>faster video review workflow for Windows</a>.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
