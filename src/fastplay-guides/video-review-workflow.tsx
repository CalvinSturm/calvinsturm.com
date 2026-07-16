import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'why-review-is-slow', label: 'Why reviewing footage is slow' },
  { id: 'workflow', label: 'A keyboard-first review pass' },
  { id: 'fastplay-keys', label: 'The FastPlay keys that make it work' },
  { id: 'resume-and-queue', label: 'Resuming and reviewing in batches' },
  { id: 'limits', label: 'Limits and caveats' },
];

function Article() {
  return (
    <GuideLayout
      slug="video-review-workflow"
      toc={toc}
      lede={
        <>
          Reviewing a long recording does not have to mean dragging a scrub bar with a mouse for an
          hour. With a keyboard-first player you skim at higher speed, mark an in and out point
          around anything interesting, loop that range until you have seen what you need, step
          through it frame by frame, and grab a screenshot. FastPlay is built around exactly this
          loop.
        </>
      }
      topCtaNote="FastPlay is a free, open-source Windows player where every review action has a keybind: frame stepping, in/out loop ranges, speed control, screenshots, and per-file resume."
      finalCtaHeading="Review your next recording faster"
      finalCtaBody="FastPlay opens fast, seeks responsively, and keeps your hands on the keyboard. Free, MIT licensed, one MSI installer for Windows 10 and later."
    >
      <GuideSection id="why-review-is-slow" title="Why reviewing footage is slow">
        <p>
          Most players are optimized for watching, not reviewing. The pain points are familiar to
          anyone who checks game film, lecture recordings, screen captures, dashcam clips, or raw
          camera footage:
        </p>
        <ul>
          <li>Scrubbing with a mouse is imprecise, and every overshoot costs another drag.</li>
          <li>Seeking lags: you press a key and the picture catches up seconds later.</li>
          <li>Rewatching one moment means manually seeking back to it, every time.</li>
          <li>Finding the exact frame of an event is nearly impossible at normal speed.</li>
          <li>Coming back tomorrow means remembering where you stopped.</li>
        </ul>
        <p>
          A review-friendly player fixes these mechanically: responsive seeking, frame stepping,
          repeatable loop ranges, playback speed control, and automatic resume.
        </p>
      </GuideSection>

      <GuideSection id="workflow" title="A keyboard-first review pass">
        <p>The pass that works for most long recordings:</p>
        <ol>
          <li>
            <strong>Skim fast.</strong> Raise playback speed and let it run. Drop back to normal
            speed the moment something looks interesting. Hold the arrow keys to jump in larger
            steps through dead sections.
          </li>
          <li>
            <strong>Fence the moment.</strong> When you find something, set an in point just before
            it and an out point just after. Now the moment has boundaries you can return to
            instantly instead of a vague &quot;somewhere around minute 40.&quot;
          </li>
          <li>
            <strong>Loop and study.</strong> Turn on loop so the range repeats hands-free. Watch it
            as many times as the call requires.
          </li>
          <li>
            <strong>Step to the exact frame.</strong> Pause and step forward or backward one frame
            at a time to find the precise moment of contact, the exact UI state, or the first
            corrupted frame.
          </li>
          <li>
            <strong>Capture evidence.</strong> Save a screenshot of the frame. Note the timestamp
            shown on the timeline in whatever document or ticket you are already writing.
          </li>
          <li>
            <strong>Clear and continue.</strong> Clear the in/out points and resume skimming until
            the next moment.
          </li>
        </ol>
        <InlineCta>
          Every step above maps to a single keystroke in FastPlay, and the seek engine is built so
          old frames never delay new ones while you skim.
        </InlineCta>
      </GuideSection>

      <GuideSection id="fastplay-keys" title="The FastPlay keys that make it work">
        <p>The review-relevant subset of FastPlay&apos;s controls:</p>
        <ul>
          <li>
            <code>[</code> and <code>]</code> lower or raise playback speed, and <code>\</code>{' '}
            resets to 1x.
          </li>
          <li>
            <code>Left</code> / <code>Right</code> seek 5 seconds, growing to 15-second steps when
            held.
          </li>
          <li>
            <code>I</code> and <code>O</code> set the in and out point; <code>Shift+I</code> /{' '}
            <code>Shift+O</code> clear them. <code>R</code> toggles looping the range, and with a
            range set, <code>Space</code> at the end jumps back to the in point.
          </li>
          <li>
            <code>Ctrl+F</code> / <code>Ctrl+B</code> step one frame forward or backward.
          </li>
          <li>
            <code>Ctrl+S</code> saves a screenshot of the current frame.
          </li>
          <li>
            <code>Ctrl+MouseWheel</code> zooms at the cursor and <code>Ctrl+Drag</code> pans, for
            inspecting detail inside the frame.
          </li>
          <li>
            Hold <code>H</code> anytime to see the full controls overlay.
          </li>
        </ul>
        <p>
          The full list, and the rest of the player, is on the{' '}
          <a href="/fastplay">FastPlay product page</a>.
        </p>
      </GuideSection>

      <GuideSection id="resume-and-queue" title="Resuming and reviewing in batches">
        <p>
          Long reviews rarely finish in one sitting. FastPlay remembers your position per file:
          close the player mid-review and reopening the file resumes near where you stopped. The
          recent-files overlay (<code>Ctrl+Shift+O</code>) gets you back into yesterday&apos;s
          footage in two keystrokes.
        </p>
        <p>
          For a folder of clips, drop several files or the folder itself onto the player to build a
          temporary queue, then move through it with <code>PageUp</code> / <code>PageDown</code>.
          When one file ends, playback advances to the next, so batch-checking a card of recordings
          is continuous instead of open-file, close-file, repeat.
        </p>
        <p>
          Recordings in tricky formats stay in the same workflow: HEVC screen and camera captures
          decode without codec packs (see{' '}
          <a href={guidePath('hevc-player-windows')}>playing HEVC on Windows</a>), and{' '}
          <a href={guidePath('mov-not-playing-windows')}>MOV files from phones and cameras</a> open
          directly.
        </p>
      </GuideSection>

      <GuideSection id="limits" title="Limits and caveats">
        <ul>
          <li>
            FastPlay does not keep annotations. There are no named timestamp markers, no notes, and
            no export of marker lists; the in/out range is a playback tool, not a logging system.
            Keep notes in the document or ticket where the review results are going anyway.
          </li>
          <li>
            The play queue is in-memory and session-only. There are no persistent playlist files,
            and folder scanning is non-recursive.
          </li>
          <li>
            FastPlay is Windows 10+ x64 only and plays local files: point it at footage on disk,
            not at network streams.
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
