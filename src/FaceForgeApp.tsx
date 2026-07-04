import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Download,
  Eye,
  EyeOff,
  GraduationCap,
  HardDrive,
  Mail,
  MousePointerClick,
  ScanFace,
  Sparkles,
  Users,
  Video,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HomeHeader, HomeFooter } from './HomeChrome.tsx';

const releaseHref = 'https://github.com/CalvinSturm/FaceForge-Releases/releases/latest';
const contactHref = 'mailto:calvinsturm@gmail.com?subject=FaceForge%20release%20updates';

const statusChips = ['Windows 10/11', 'NVIDIA RTX + CUDA', 'Local-only', 'Blur-first', 'Public alpha'] as const;

const whyCards: Array<{ Icon: LucideIcon; title: string; body: string }> = [
  {
    Icon: EyeOff,
    title: 'Blur-first by default',
    body: 'The default workflow detects faces and blurs them for local video redaction. Open a video, keep the default, export.',
  },
  {
    Icon: Cpu,
    title: 'GPU acceleration',
    body: 'Optimized for NVIDIA RTX GPUs with CUDA so longer videos process on your own hardware instead of a render queue.',
  },
  {
    Icon: Sparkles,
    title: 'Optional face enhancement',
    body: 'GFPGAN or CodeFormer enhancement can be enabled for higher quality results when a workflow needs it.',
  },
  {
    Icon: Eye,
    title: 'Live preview, responsive UI',
    body: 'Real-time preview during processing, with an interface that stays responsive through long exports.',
  },
];

const faceModes: Array<{ Icon: LucideIcon; title: string; body: string }> = [
  {
    Icon: ScanFace,
    title: 'Auto',
    body: 'Zero-friction default: acts on the largest detected face in each frame.',
  },
  {
    Icon: Users,
    title: 'All Faces',
    body: 'Covers every detected face in each frame, for group shots where everyone should be anonymized.',
  },
  {
    Icon: MousePointerClick,
    title: 'Locked Face',
    body: 'Advanced mode for multi-person scenes: pick one person in the preview and only they are followed.',
  },
];

const processSteps = [
  ['01', 'Add a video', 'Drop a local file into the app. Nothing is uploaded anywhere.'],
  ['02', 'Keep the default workflow', 'Blur Faces / Privacy is the default. Adjust blur strength if needed.'],
  ['03', 'Start Export', 'The redacted video renders on your GPU and lands next to your files.'],
] as const;

const safetyBullets = [
  'Footage, logs, and diagnostics stay on your machine',
  'Blur and redaction is the default, beginner-facing workflow',
  'Face replacement is an advanced Pro workflow, blocked in the Free tier',
  'Replacement requires consent acknowledgement before export',
  'Diagnostics and repro bundles are exported locally, only when you ask',
] as const;

const requirements = [
  'Windows 10 or 11',
  'NVIDIA RTX GPU (tested on an RTX 3080 Ti with 12GB VRAM)',
  'CUDA Toolkit 11.8 or 12.x with matching cuDNN',
  '16GB RAM minimum, 32GB recommended',
] as const;

const goodFits: Array<{ Icon: LucideIcon; title: string }> = [
  { Icon: Video, title: 'Creators and editors blurring bystanders in footage' },
  { Icon: GraduationCap, title: 'Educators and researchers sharing classroom or study video' },
  { Icon: Users, title: 'Businesses and agencies redacting client media' },
  { Icon: HardDrive, title: 'Anyone anonymizing local video without cloud uploads' },
];

export default function FaceForgeApp() {
  return (
    <div className="home-landing">
      <HomeHeader />

      <main id="main-content">
        {/* ---- Hero ---- */}
        <section className="home-shell pj-hero">
          <p className="home-eyebrow">Privacy-first video tools</p>
          <div className="ff-hero-brand">
            <img src="/assets/FaceForge/FaceForge_icon.png" alt="FaceForge app icon" width={64} height={64} />
            <h1>FaceForge</h1>
          </div>
          <p className="home-hero-sub">
            A privacy-first, local-only Windows app for AI face blur and video redaction, optimized for NVIDIA RTX
            GPUs.
          </p>
          <p className="la-hero-body">
            FaceForge is built for people who need to anonymize faces in local media without uploading footage
            anywhere. The default workflow is blur and redaction. Face replacement exists as an advanced,
            consent-based Pro workflow, and it is not positioned as a generic deepfake tool.
          </p>
          <div className="home-hero-actions">
            <a href={releaseHref} target="_blank" rel="noopener noreferrer" className="home-btn home-btn-primary">
              <Download className="h-4 w-4" />
              Download FaceForge
            </a>
            <a href={contactHref} className="home-btn home-btn-ghost">
              <Mail className="h-4 w-4" />
              Release updates
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
          <p className="home-hero-meta">
            Public alpha download · Source private during development · Hosted on GitHub Releases
          </p>
        </section>

        {/* ---- Why it exists ---- */}
        <section className="home-section home-shell" aria-labelledby="why-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Why it exists</p>
            <h2 id="why-heading">Redaction without uploads</h2>
            <p className="pj-section-sub">
              Most face-blur tools are cloud services: you hand over the footage to protect the people in it.
              FaceForge takes the opposite approach. Detection, blurring, enhancement, and export all run on your
              own GPU, so the media that needs protecting never leaves the machine.
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

        {/* ---- How it works ---- */}
        <section className="home-section home-shell" aria-labelledby="workflow-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">How it works</p>
            <h2 id="workflow-heading">Video in, redacted video out</h2>
          </div>
          <ol className="svc-steps">
            {processSteps.map(([step, title, desc]) => (
              <li key={step} className="svc-step">
                <span className="svc-step-num">{step}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---- Face selection modes ---- */}
        <section className="home-section home-shell" aria-labelledby="modes-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Face selection</p>
            <h2 id="modes-heading">Three modes, from zero-friction to precise</h2>
          </div>
          <div className="home-grid">
            {faceModes.map(({ Icon, title, body }) => (
              <article key={title} className="home-grid-card">
                <div className="home-grid-top">
                  <span className="home-grid-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Consent and privacy model ---- */}
        <section className="home-section home-shell" aria-labelledby="safety-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Consent and privacy model</p>
            <h2 id="safety-heading">Local by default, consent-gated by design</h2>
            <p className="pj-section-sub">
              App state, logs, cache, and support artifacts live in local per-user folders, and diagnostics are
              exported only when you choose to. The capable-but-risky feature, face replacement, is deliberately
              gated rather than deliberately easy.
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

        {/* ---- System requirements ---- */}
        <section className="home-section home-shell" aria-labelledby="requirements-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">System requirements</p>
            <h2 id="requirements-heading">Built for RTX-class Windows machines</h2>
          </div>
          <ul className="la-bullets">
            {requirements.map((req) => (
              <li key={req}>
                <CheckCircle2 className="h-4 w-4" />
                {req}
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Current status ---- */}
        <section className="home-section home-shell" aria-labelledby="status-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Current status</p>
            <h2 id="status-heading">Public alpha available</h2>
            <p className="pj-section-sub">
              FaceForge is in active development, and the latest public Windows build is available on GitHub
              Releases. The current release tier is FaceForge Free: a portable desktop bundle centered on the
              privacy-first blur flow, with face replacement, enhancement, and alternate-backend controls kept as
              advanced and Pro surfaces. Source is private during development, and public builds are distributed
              from the release feed.
            </p>
          </div>
          <div className="home-hero-actions">
            <a href={releaseHref} target="_blank" rel="noopener noreferrer" className="home-btn home-btn-primary">
              <Download className="h-4 w-4" />
              Download latest release
            </a>
          </div>
        </section>

        {/* ---- Good fit for ---- */}
        <section className="home-section home-shell" aria-labelledby="fit-heading">
          <div className="home-section-head">
            <p className="home-eyebrow">Good fit for</p>
            <h2 id="fit-heading">Who it is for</h2>
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
              FaceForge is not a cloud service and not a generic deepfake tool. Face replacement stays behind
              consent acknowledgement and rights to the media involved, and the free tier is about hiding faces,
              not swapping them. The operator keeps control of the footage from start to finish.
            </p>
          </div>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="home-final home-shell" aria-labelledby="final-heading">
          <div className="home-final-panel">
            <EyeOff className="home-final-icon h-6 w-6" aria-hidden="true" />
            <h2 id="final-heading">Redact faces without uploading footage</h2>
            <p>
              FaceForge is being built in the open enough to hold it accountable: privacy-first defaults, local
              processing, and honest limits. The latest public build is available from the FaceForge release feed.
            </p>
            <div className="home-hero-actions home-final-actions">
              <a href={releaseHref} target="_blank" rel="noopener noreferrer" className="home-btn home-btn-primary">
                <Download className="h-4 w-4" />
                Download FaceForge
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
