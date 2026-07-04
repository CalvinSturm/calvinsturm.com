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

const providers: Array<{ Icon: LucideIcon; name: string }> = [
  { Icon: Server, name: 'Ollama' },
  { Icon: Cpu, name: 'LM Studio' },
  { Icon: Terminal, name: 'llama.cpp server' },
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
    <div className="home-landing">
      <HomeHeader />

      <main id="main-content">
        {/* ---- Hero ---- */}
        <section className="home-shell pj-hero">
          <p className="home-eyebrow">Local-first AI systems</p>
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
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="home-btn home-btn-primary">
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
        </section>

        {/* ---- Why it exists ---- */}
        <section className="home-section home-shell" aria-labelledby="why-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Why it exists</p>
            <h2 id="why-heading">The friction is operational, not the model</h2>
            <p className="pj-section-sub">
              Most local-agent friction is not the model. It is setup, trust, tool access, recovery, and knowing
              what actually happened after a run. LocalAgent focuses on those operational edges: provider
              detection, guided startup, explicit approvals, replayable artifacts, and logs that can be inspected
              after the fact.
            </p>
          </div>
          <div className="home-trust-grid">
            {whyCards.map(({ Icon, title, body }) => (
              <article key={title} className="home-trust-card">
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
            <p className="home-eyebrow">Supported local providers</p>
            <h2 id="providers-heading">Built around local and OpenAI-compatible providers</h2>
            <p className="pj-section-sub">
              LocalAgent is designed around local and OpenAI-compatible provider workflows, including:
            </p>
          </div>
          <ul className="pj-cap-grid">
            {providers.map(({ Icon, name }) => (
              <li key={name} className="pj-cap">
                <span className="home-grid-icon">
                  <Icon className="h-5 w-5" />
                </span>
                {name}
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Safety model ---- */}
        <section className="home-section home-shell" aria-labelledby="safety-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Safety model</p>
            <h2 id="safety-heading">Useful without hiding risk</h2>
            <p className="pj-section-sub">
              The goal is not to remove every restriction. The goal is to make local agents useful without hiding
              risk. LocalAgent keeps dangerous capabilities explicit, routes tool access through gates, and
              preserves evidence from runs so the operator can review what happened.
            </p>
          </div>
          <ul className="la-bullets">
            {safetyBullets.map((bullet) => (
              <li key={bullet}>
                <CheckCircle2 className="h-4 w-4" />
                {bullet}
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Developer workflow ---- */}
        <section className="home-section home-shell" aria-labelledby="workflow-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Developer workflow</p>
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
            <p className="home-eyebrow">Current release focus</p>
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
            <p className="home-eyebrow">Good fit for</p>
            <h2 id="fit-heading">Who gets the most out of it</h2>
          </div>
          <ul className="pj-cap-grid la-grid-2">
            {goodFits.map(({ Icon, title }) => (
              <li key={title} className="pj-cap">
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
            <p className="home-eyebrow">Not trying to be</p>
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
          <div className="home-final-panel">
            <Cpu className="home-final-icon h-6 w-6" aria-hidden="true" />
            <h2 id="final-heading">Run local agents with more control</h2>
            <p>
              LocalAgent is public, actively developed, and built around practical trust boundaries for local AI
              tooling.
            </p>
            <div className="home-hero-actions home-final-actions">
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="home-btn home-btn-primary">
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
