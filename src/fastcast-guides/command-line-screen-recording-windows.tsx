import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuideLayout, GuideSection, InlineCta } from './GuideLayout.tsx';
import { guidePath } from './guides-data';
import '../index.css';

const toc = [
  { id: 'requirements', label: 'What you need' },
  { id: 'start', label: 'Start a recording' },
  { id: 'monitor', label: 'Choose a monitor' },
  { id: 'stop', label: 'Stop and check the result' },
  { id: 'scripts', label: 'Use commands in scripts' },
  { id: 'troubleshoot', label: 'Troubleshooting' },
];

export function GuidePage() {
  return (
    <GuideLayout
      slug="command-line-screen-recording-windows"
      toc={toc}
      lede={
        <>
          FastCast&apos;s console controller lets a PowerShell script, scheduled workflow, macro pad,
          or automation tool start and stop a screen recording. The main FastCast window remains
          responsible for capture settings; <code>fastcastc.exe</code> sends a guarded command to
          that already-running instance and returns an exit code your script can inspect.
        </>
      }
      topCtaNote="FastCast includes fastcastc.exe beside the main app, with commands to start recording, select Display N, and stop the active recording."
      finalCtaHeading="Automate your next screen recording"
      finalCtaBody="Download the FastCast portable ZIP, configure the main app once, and use fastcastc from PowerShell whenever a script needs deterministic Start and Stop actions."
    >
      <GuideSection id="requirements" title="What you need before using the controller">
        <ol>
          <li>Download and extract the current FastCast portable ZIP.</li>
          <li>Keep <code>fastcast.exe</code> and <code>fastcastc.exe</code> together.</li>
          <li>Open <code>fastcast.exe</code> and choose capture, audio, quality, and output settings.</li>
          <li>Leave the FastCast window running; the controller does not launch it automatically.</li>
          <li>Open PowerShell in the extracted FastCast folder.</li>
        </ol>
        <p>
          The controller uses the same validation and state guards as the Record button and the
          global <code>Ctrl+Alt+F9</code> hotkey. It will not bypass a missing source or invalid
          configuration.
        </p>
      </GuideSection>

      <GuideSection id="start" title="Start a recording from PowerShell">
        <p>Run:</p>
        <pre><code>{`.\\fastcastc.exe --start-record`}</code></pre>
        <p>
          FastCast starts with the source and settings currently selected in its window. Keeping
          configuration in the GUI makes the automation command short and prevents scripts from
          silently changing audio, quality, or output choices.
        </p>
      </GuideSection>

      <GuideSection id="monitor" title="Choose which monitor to record">
        <p>To select Display 2 as the command starts the recording:</p>
        <pre><code>{`.\\fastcastc.exe --start-record --monitor 2`}</code></pre>
        <p>
          The number maps to the display numbering FastCast receives from Windows. Verify the
          selected screen in the FastCast preview before relying on it for unattended capture.
          An unknown monitor number is rejected rather than silently recording a different screen.
        </p>
      </GuideSection>

      <GuideSection id="stop" title="Stop the recording and check the result">
        <p>Run:</p>
        <pre><code>{`.\\fastcastc.exe --stop-record`}</code></pre>
        <p>
          Wait for FastCast to finalize the MP4. Its Last recording panel reports the file,
          validation result, size, and any warning, with Open and Show in folder actions. For the
          full manual workflow, see{' '}
          <a href={guidePath('how-to-record-screen-windows')}>how to record your screen on Windows</a>.
        </p>
      </GuideSection>

      <GuideSection id="scripts" title="Check exit codes in a PowerShell script">
        <pre><code>{`& .\\fastcastc.exe --start-record --monitor 2
if ($LASTEXITCODE -ne 0) {
  throw "FastCast could not start recording."
}

# Run the task you need to capture here.

& .\\fastcastc.exe --stop-record
if ($LASTEXITCODE -ne 0) {
  throw "FastCast could not stop recording."
}`}</code></pre>
        <p>
          Harmless no-ops return exit code 0. For example, asking an already-recording instance to
          start again. Invalid arguments, an unavailable monitor, or a real control failure return
          nonzero. Separate Start and Stop calls are safer for automation than a toggle because the
          desired end state is explicit.
        </p>
        <InlineCta>
          The same commands can be assigned to Stream Deck system actions, macro software, test
          harnesses, or any Windows tool that can run a program.
        </InlineCta>
      </GuideSection>

      <GuideSection id="troubleshoot" title="Troubleshooting command-line recording">
        <ul>
          <li>
            <strong>FastCast is not running:</strong> launch <code>fastcast.exe</code>, finish setup,
            and retry. The controller intentionally leaves nothing running in the background.
          </li>
          <li>
            <strong>Command not found:</strong> run it as <code>.\fastcastc.exe</code> from the
            extracted folder or provide the complete quoted path.
          </li>
          <li>
            <strong>Monitor rejected:</strong> confirm the display number in the FastCast Screen
            list and reconnect or enable any missing monitor.
          </li>
          <li>
            <strong>Recording will not start:</strong> inspect the FastCast window for its validation
            message. Source, output folder, encoder, or audio setup may need attention.
          </li>
          <li>
            <strong>Recording stutters:</strong> test hardware encoding and lower resolution or
            frame rate using the{' '}
            <a href={guidePath('screen-recording-without-lag')}>recording performance guide</a>.
          </li>
        </ul>
      </GuideSection>
    </GuideLayout>
  );
}

mountGuide(<GuidePage />);
