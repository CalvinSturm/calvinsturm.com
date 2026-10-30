import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'how-it-works', label: 'How instant replay works' },
  { id: 'built-in-options', label: 'What your PC may already have' },
  { id: 'fastcast', label: 'Instant Replay in FastCast' },
  { id: 'limits', label: 'What FastCast Replay does not do yet' },
  { id: 'which-to-use', label: 'Which one should you use?' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="clip-last-30-seconds-pc"
      toc={toc}
      lede={
        <>
          The best moment in a game is never the one you were recording. Instant replay fixes that:
          your PC keeps the last few seconds or minutes in memory, and one hotkey saves them as a
          video after the moment has happened. NVIDIA and AMD both ship this in their graphics
          software, and Windows has a version in Game Bar. Each comes with a catch, and the right
          choice depends on your GPU and on what you want to capture.
        </>
      }
      topCtaNote="FastCast keeps the last 30 seconds to 5 minutes of your screen in memory and saves it as an MP4 when you press Ctrl+Alt+F8. Instant Replay is free, and it is the same app on an NVIDIA or AMD PC."
      finalCtaHeading="Clip it after it happens"
      finalCtaBody="FastCast is in Open Beta and Instant Replay is part of the free version. Install it, turn Replay on, and press Ctrl+Alt+F8 the next time something is worth keeping."
    >
      <GuideSection id="how-it-works" title="How instant replay works">
        <p>
          A normal recording starts when you press Record and you decide afterward what to keep.
          Instant replay runs the other way round. Once it is on, your screen is encoded into a
          rolling buffer in memory that always holds the most recent stretch, say the last 30
          seconds. Nothing is saved until you press the save hotkey. Then that stretch is written
          out as a video file, and the buffer keeps rolling so you can save again.
        </p>
        <p>
          Because the work is done by the hardware video encoder on your graphics card, a buffer
          running in the background costs very little performance. The memory it uses grows with
          the length you choose and the quality you record at.
        </p>
      </GuideSection>

      <GuideSection id="built-in-options" title="What your PC may already have">
        <ul>
          <li>
            <strong>NVIDIA app.</strong> Instant Replay is built in if you have an NVIDIA GeForce
            or RTX graphics card. It is a good option on those PCs, and it only works on them.
          </li>
          <li>
            <strong>AMD Software: Adrenalin Edition.</strong> Radeon graphics cards get their own
            Instant Replay in AMD's driver software. Like NVIDIA's, it is tied to that brand of
            GPU.
          </li>
          <li>
            <strong>Xbox Game Bar.</strong> Every Windows 10 and 11 PC has it. Turn on background
            recording in Settings under Gaming and Captures, then press <code>Win+Alt+G</code> to
            save what just happened. Game Bar captures one game or app at a time and cannot
            capture the Windows desktop or File Explorer.
          </li>
        </ul>
        <p>
          If you have one PC with one graphics card and you only clip games, the tool from your GPU
          maker is often all you need. The gaps show up elsewhere: a laptop and a desktop with
          different GPUs that each need their own app and hotkeys, moments that happen on the
          desktop or across several windows, or wanting the same app for clips, recordings, and
          streams.
        </p>
      </GuideSection>

      <GuideSection id="fastcast" title="Instant Replay in FastCast">
        <p>
          FastCast is a Windows screen recorder and live streamer, and Instant Replay is part of its
          free version. The setup takes three steps:
        </p>
        <ol>
          <li>
            Pick the display you want to capture, plus your microphone and desktop audio.
          </li>
          <li>
            Turn <strong>Replay</strong> on in the strip under the preview and choose how far back
            it reaches: 30 seconds, 1 minute, 2 minutes, or 5 minutes.
          </li>
          <li>
            Carry on playing or working. Press <code>Ctrl+Alt+F8</code> when something is worth
            keeping. The clip is saved as an MP4 in your output folder and shows up in Recent files,
            and the buffer keeps running so you can save again straight away.
          </li>
        </ol>
        <p>
          Nothing is written to disk until you press the hotkey, and saving does not encode the
          video a second time, so a save is quick. The hotkey works from inside a game. If you turn
          on the notification-area icon, FastCast and its Replay buffer keep running with the window
          closed, and you can turn Replay on, save a clip, or bring the window back from the icon's
          menu. Replay always starts off, even when FastCast launches with Windows.
        </p>
        <p>
          Hardware encoding is tested on NVIDIA and AMD graphics cards. Intel hardware encoding is
          still being tested during the beta, and if your hardware cannot take it FastCast falls
          back to a software encoder and tells you so. A FastCast Pro license adds custom lengths,
          any window from 15 seconds to 5 minutes. The four preset lengths stay free.
        </p>
        <p>
          The same app also records full sessions and streams to YouTube, Twitch, or Kick. See{' '}
          <a href={guidePath('how-to-record-screen-windows')}>how to record your screen on Windows</a>{' '}
          and <a href={guidePath('how-to-stream-on-windows')}>how to stream on Windows</a>.
        </p>
      </GuideSection>

      <GuideSection id="limits" title="What FastCast Replay does not do yet">
        <ul>
          <li>
            <strong>It captures a whole display.</strong> Replay records the selected monitor and
            its audio. A single app window and the webcam overlay are left out of Replay clips for
            now, and FastCast tells you when it drops them.
          </li>
          <li>
            <strong>Replay and recording do not run together.</strong> Pressing Start recording
            turns the buffer off and says so, and Replay will not turn on during a recording rather
            than interrupt it.
          </li>
          <li>
            <strong>Clips can run slightly long.</strong> A clip has to start on a keyframe, so it
            can be up to a couple of seconds longer than the length you chose.
          </li>
          <li>
            <strong>It is an unsigned beta.</strong> Windows SmartScreen shows an unknown publisher
            warning on first install. Choose More info, then Run anyway.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="which-to-use" title="Which one should you use?">
        <p><strong>Keep using your GPU maker's tool if you:</strong></p>
        <ul>
          <li>Clip games on a single PC and are happy with its hotkeys and settings</li>
          <li>Already use the NVIDIA app or AMD Software for driver updates and game settings</li>
        </ul>
        <p><strong>Keep using Game Bar if you:</strong></p>
        <ul>
          <li>Only clip games and want nothing extra installed</li>
        </ul>
        <p><strong>FastCast may fit better if you:</strong></p>
        <ul>
          <li>Want the same app and the same hotkey on PCs with different graphics cards</li>
          <li>Want to clip things that happen on the desktop, not only inside a game</li>
          <li>Want one app for replay clips, full recordings, and streams</li>
          <li>Want no account and no telemetry</li>
        </ul>
        <InlineCta>
          The quickest test is to install FastCast, turn Replay on, and save a clip of the next thing
          that happens on your screen. If you want the full session instead, start with{' '}
          <a href={guidePath('screen-recording-without-lag')}>reducing screen-recording lag</a>.
        </InlineCta>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
