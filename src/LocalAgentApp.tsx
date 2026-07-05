import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Compass,
  Cpu,
  FileSearch,
  FlaskConical,
  Github,
  History,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HomeHeader, HomeFooter } from './HomeChrome.tsx';

const repoUrl = 'https://github.com/CalvinSturm/LocalAgent';
const releasesUrl = 'https://github.com/CalvinSturm/LocalAgent/releases';
const installGuideUrl = 'https://github.com/CalvinSturm/LocalAgent/blob/main/docs/guides/INSTALL.md';

const statusChips = ['Public repo', 'Rust', 'MCP workflows', 'Local-first', 'Alpha'] as const;

/* ---- Live run console (decorative, looping event stream) ---- */
type LogKind = 'boot' | 'scan' | 'ok' | 'idle' | 'plan' | 'tool' | 'warn' | 'hold' | 'artifact' | 'done';

const runLog: Array<{ t: string; kind: LogKind; tag: string; msg: string }> = [
  { t: '09:24:01', kind: 'boot', tag: 'boot', msg: 'localagent v0.6.0-alpha.1' },
  { t: '09:24:01', kind: 'scan', tag: 'detect', msg: 'scanning local providers' },
  { t: '09:24:02', kind: 'ok', tag: 'provider', msg: 'ollama reachable · llama3.1:8b' },
  { t: '09:24:02', kind: 'ok', tag: 'provider', msg: 'lm studio reachable' },
  { t: '09:24:02', kind: 'idle', tag: 'provider', msg: 'llama.cpp not running' },
  { t: '09:24:03', kind: 'plan', tag: 'plan', msg: '4 steps · read → edit → validate → report' },
  { t: '09:24:03', kind: 'tool', tag: 'tool', msg: 'read_file  src/runtime/mod.rs' },
  { t: '09:24:04', kind: 'tool', tag: 'tool', msg: 'lsp.hover  RunContext' },
  { t: '09:24:05', kind: 'warn', tag: 'trust gate', msg: 'shell.write requested by step 3' },
  { t: '09:24:05', kind: 'hold', tag: 'approval', msg: 'awaiting operator' },
  { t: '09:24:08', kind: 'ok', tag: 'approved', msg: 'workdir-scoped · cargo check' },
  { t: '09:24:12', kind: 'ok', tag: 'validate', msg: 'rustc 0 errors · clippy clean' },
  { t: '09:24:12', kind: 'artifact', tag: 'artifact', msg: 'run/2026-07-05T09-24/events.jsonl' },
  { t: '09:24:12', kind: 'artifact', tag: 'replay', msg: '12 events · fully reconstructable' },
  { t: '09:24:12', kind: 'done', tag: 'done', msg: 'run complete · exit 0' },
];

const glyph: Record<LogKind, string> = {
  boot: '●',
  scan: '⤢',
  ok: '✓',
  idle: '○',
  plan: '◇',
  tool: '→',
  warn: '⚠',
  hold: '⏸',
  artifact: '⭑',
  done: '◼',
};

const providers: Array<{ Icon: LucideIcon; name: string; detail: string; state: 'ready' | 'idle' }> = [
  { Icon: Server, name: 'Ollama', detail: 'llama3.1:8b · localhost:11434', state: 'ready' },
  { Icon: Cpu, name: 'LM Studio', detail: 'OpenAI-compatible · localhost:1234', state: 'ready' },
  { Icon: Terminal, name: 'llama.cpp server', detail: 'OpenAI-compatible endpoint', state: 'idle' },
];

const whyCards: Array<{ Icon: LucideIcon; title: string; body: string }> = [
  {
    Icon: Compass,
    title: 'Guided startup',
    body: 'Detects supported local providers and gives a clearer path from setup to a working run.',
  },
  {
    Icon: ShieldCheck,
    title: 'Explicit trust controls',
    body: 'Shell and write access stay gated. Side effects require intentional configuration and approval paths.',
  },
  {
    Icon: History,
    title: 'Replayable runs',
    body: 'Artifacts, event logs, and tool outputs are preserved so runs can be inspected instead of guessed at.',
  },
  {
    Icon: FlaskConical,
    title: 'Built-in evaluation workflows',
    body: 'LocalAgent includes evaluation and validation paths to make agent behavior easier to test and improve.',
  },
];

const safetyBullets = [
  'Shell and write access disabled unless explicitly enabled',
  'Narrower workdir-scoped shell mode available',
  'Approval and audit paths for trusted operation',
  'Persistent run artifacts and inspectable logs',
  'Conservative validation and repair behavior',
] as const;

const goodFits: Array<{ Icon: LucideIcon; title: string }> = [
  { Icon: Code2, title: 'Developers experimenting with local coding agents' },
  { Icon: Workflow, title: 'Builders testing MCP tool workflows' },
  { Icon: FileSearch, title: 'People who want inspectable agent runs' },
  { Icon: ShieldCheck, title: 'Local-first AI workflows where trust and reproducibility matter' },
];

export default function LocalAgentApp() {
  return (
    <div className="home-landing la-page">
      <HomeHeader />

      <main id="main-content">
        {/* ---- Hero ---- */}
        <section className="home-shell la-hero">
          <div className="la-hero-grid">
            <div className="la-hero-copy">
              <div className="la-status-line">
                <span className="la-status-dot" />
                <span>runtime</span>
                <span className="la-status-sep">/</span>
                <span>local-first</span>
                <span className="la-status-sep">/</span>
                <span>MCP</span>
              </div>
              <h1>LocalAgent</h1>
              <p className="home-hero-sub">
                A local-first agent runtime for MCP workflows with explicit trust controls, replayable runs, and
                inspectable logs.
              </p>
              <p className="la-hero-body">
                LocalAgent is built for the hard part of local agents: connecting on-machine LLMs to tools in a way
                that stays guided, auditable, and operationally clear. It is designed for developers who want local
                model workflows without handing side effects to a black box.
              </p>
              <div className="home-hero-actions">
                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="la-run-btn">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
                <a href={releasesUrl} target="_blank" rel="noopener noreferrer" className="home-btn home-btn-ghost">
                  Releases
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="/projects" className="home-btn home-btn-ghost">
                  Back to Projects
                </a>
              </div>
              <ul className="home-spot-chips la-chips">
                {statusChips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
              <p className="home-hero-meta">Alpha-stage developer tooling · MIT License · Built in Rust</p>
            </div>

            {/* Live run console */}
            <div className="la-console" aria-hidden="true">
              <div className="la-console-bar">
                <span className="home-console-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="la-console-title">localagent · run</span>
                <span className="la-console-live">
                  <span className="la-live-dot" />
                  LIVE
                </span>
              </div>
              <div className="la-console-scroll">
                <div className="la-console-feed">
                  {[...runLog, ...runLog].map((line, i) => (
                    <div key={i} className={`la-line la-line-${line.kind}`}>
                      <span className="la-line-t">{line.t}</span>
                      <span className="la-line-g">{glyph[line.kind]}</span>
                      <span className="la-line-tag">{line.tag}</span>
                      <span className="la-line-msg">{line.msg}</span>
                    </div>
                  ))}
                </div>
                <div className="la-console-fade" />
              </div>
              <div className="la-console-prompt">
                <span className="la-prompt-sign">localagent&nbsp;›</span>
                <span className="la-prompt-caret" />
              </div>
            </div>
          </div>
        </section>

        {/* ---- Why it exists ---- */}
        <section className="home-section home-shell" aria-labelledby="why-heading">
          <div className="home-section-head">
            <p className="la-eyebrow">Why it exists</p>
            <h2 id="why-heading">The friction is operational, not the model</h2>
            <p className="pj-section-sub">
              Most local-agent friction is not the model. It is setup, trust, tool access, recovery, and knowing
              what actually happened after a run. LocalAgent focuses on those operational edges: provider
              detection, guided startup, explicit approvals, replayable artifacts, and logs that can be inspected
              after the fact.
            </p>
          </div>
          <div className="home-trust-grid la-why-grid">
            {whyCards.map(({ Icon, title, body }) => (
              <article key={title} className="home-trust-card la-why-card">
                <Icon className="home-trust-icon h-5 w-5" />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Supported providers ---- */}
        <section className="home-section home-shell" aria-labelledby="providers-heading">
          <div className="home-section-head">
            <p className="la-eyebrow">Supported local providers</p>
            <h2 id="providers-heading">Built around local and OpenAI-compatible providers</h2>
            <p className="pj-section-sub">
              On startup LocalAgent probes for on-machine model servers, so you know what is reachable before a run
              begins.
            </p>
          </div>
          <div className="la-provider-panel">
            <div className="la-provider-head">
              <span>
                <Terminal className="h-3.5 w-3.5" /> localagent doctor
              </span>
              <span className="la-provider-scanning">
                <span className="la-scan-dot" />
                probing endpoints
              </span>
            </div>
            <ul className="la-provider-list">
              {providers.map(({ Icon, name, detail, state }) => (
                <li key={name} className={`la-provider la-provider-${state}`}>
                  <span className="home-grid-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="la-provider-name">
                    {name}
                    <span className="la-provider-detail">{detail}</span>
                  </span>
                  <span className="la-provider-state">
                    <span className="la-provider-pulse" />
                    {state === 'ready' ? 'reachable' : 'not running'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- Safety model + trust gate ---- */}
        <section className="home-section home-shell" aria-labelledby="safety-heading">
          <div className="home-section-head">
            <p className="la-eyebrow">Safety model</p>
            <h2 id="safety-heading">Useful without hiding risk</h2>
            <p className="pj-section-sub">
              The goal is not to remove every restriction. The goal is to make local agents useful without hiding
              risk. LocalAgent keeps dangerous capabilities explicit, routes tool access through gates, and
              preserves evidence from runs so the operator can review what happened.
            </p>
          </div>
          <div className="la-safety-grid">
            <ul className="la-bullets">
              {safetyBullets.map((bullet) => (
                <li key={bullet}>
                  <CheckCircle2 className="h-4 w-4" />
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Animated trust gate */}
            <div className="la-gate" aria-hidden="true">
              <div className="la-gate-head">
                <ShieldCheck className="h-4 w-4" />
                trust gate
              </div>
              <p className="la-gate-req">
                step 3 requests <code>shell.write</code>
                <br />
                scope <code>workdir</code> · cmd <code>cargo check</code>
              </p>
              <div className="la-gate-bar">
                <span className="la-gate-fill" />
              </div>
              <div className="la-gate-status">
                <span className="la-gate-pending">⏸ awaiting operator</span>
                <span className="la-gate-approved">✓ approved · scoped</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Developer workflow ---- */}
        <section className="home-section home-shell" aria-labelledby="workflow-heading">
          <div className="home-section-head">
            <p className="la-eyebrow">Developer workflow</p>
            <h2 id="workflow-heading">Install, run, and check your provider</h2>
          </div>
          <div className="la-term">
            <div className="la-term-bar">
              <span className="home-console-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="la-term-title">localagent</span>
            </div>
            <pre className="la-term-body">
              <span className="la-cmt"># install from a cloned repo</span>
              {'\n'}
              <span className="la-cmd">cargo install --path . --force</span>
              {'\n'}
              <span className="la-cmd">localagent</span>
              {'\n\n'}
              <span className="la-cmt"># verify a provider is reachable</span>
              {'\n'}
              <span className="la-cmd">localagent doctor --provider ollama</span>
              {'\n'}
              <span className="la-cmd">localagent doctor --provider lmstudio</span>
              {'\n'}
              <span className="la-cmd">localagent doctor --provider llamacpp</span>
            </pre>
          </div>
          <a
            href={installGuideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="home-inline-link la-guide-link"
          >
            <BookOpen className="h-4 w-4" />
            Read the install guide
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

        {/* ---- Current release focus ---- */}
        <section className="home-section home-shell" aria-labelledby="release-heading">
          <div className="home-section-head">
            <p className="la-eyebrow">Current release focus</p>
            <h2 id="release-heading">Reliable, inspectable coding-agent runs</h2>
            <p className="pj-section-sub">
              Recent LocalAgent work focuses on making coding-agent runs more reliable and inspectable: structured
              planning, replayable tool-result artifacts, read-only LSP tools, bounded validator-driven repair,
              and ordered Rust validation outcomes. The latest tagged release is v0.6.0-alpha.1, an alpha
              prerelease.
            </p>
          </div>
          <a href={releasesUrl} target="_blank" rel="noopener noreferrer" className="home-inline-link">
            <Github className="h-4 w-4" />
            Release feed on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

        {/* ---- Good fit for ---- */}
        <section className="home-section home-shell" aria-labelledby="fit-heading">
          <div className="home-section-head">
            <p className="la-eyebrow">Good fit for</p>
            <h2 id="fit-heading">Who gets the most out of it</h2>
          </div>
          <ul className="la-fit-grid">
            {goodFits.map(({ Icon, title }) => (
              <li key={title} className="la-fit">
                <span className="home-grid-icon">
                  <Icon className="h-5 w-5" />
                </span>
                {title}
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Not trying to be ---- */}
        <section className="home-section home-shell" aria-labelledby="not-heading">
          <div className="home-section-head">
            <p className="la-eyebrow">Not trying to be</p>
            <h2 id="not-heading">Scope, stated plainly</h2>
          </div>
          <div className="la-not">
            <p>
              LocalAgent is not a hosted SaaS agent, not an unrestricted autonomous background worker, and not a
              replacement for judgment. It is a runtime for controlled local workflows where the operator can see,
              approve, replay, and debug what happened.
            </p>
          </div>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="home-final home-shell" aria-labelledby="final-heading">
          <div className="home-final-panel la-final-panel">
            <Cpu className="home-final-icon h-6 w-6" aria-hidden="true" />
            <h2 id="final-heading">Run local agents with more control</h2>
            <p>
              LocalAgent is public, actively developed, and built around practical trust boundaries for local AI
              tooling.
            </p>
            <div className="home-hero-actions home-final-actions">
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="la-run-btn">
                <Github className="h-4 w-4" />
                View LocalAgent on GitHub
              </a>
              <a href="/projects" className="home-btn home-btn-ghost">
                Browse all projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
