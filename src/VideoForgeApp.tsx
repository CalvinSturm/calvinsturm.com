import {
  ArrowRight,
  Box,
  CheckCircle2,
  Cpu,
  Crop,
  FileSearch,
  Film,
  Gauge,
  Github,
  Import,
  Mail,
  Move3d,
  Palette,
  Sparkles,
  Upload,
  Wand2,
  Wrench,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HomeHeader, HomeFooter } from './HomeChrome.tsx';

const statusChips = ['Windows 10/11', 'NVIDIA CUDA 11.7+', 'Local-only', 'Deterministic modes', 'In development'] as const;

type PipelineStage = {
  num: string;
  name: string;
  badge?: string;
  desc: string;
  Icon: LucideIcon;
};

const pipelineStages: PipelineStage[] = [
  { num: '1', name: 'Import Source', Icon: Import, desc: 'Drop in a local video or image. Resolution, aspect, and format are probed on the spot.' },
  { num: '2', name: 'Media Inspector', Icon: FileSearch, desc: 'Container, codec, frame rate, and stream details, read locally with FFprobe.' },
  { num: '3', name: 'Source Repair', badge: 'BYPASS', Icon: Wrench, desc: 'Denoise, deblock, deband, deflicker, deinterlace, and chroma noise cleanup before upscaling.' },
  { num: '4', name: 'AI Upscale', badge: 'CNN', Icon: Sparkles, desc: 'CNN, GAN, Transformer, Diffusion, and Lightweight model families with 2x to 4x scale factors.' },
  { num: '5', name: 'Crop & Frame', Icon: Crop, desc: 'Interactive crop overlay on the preview, with black bar detection.' },
  { num: '6', name: 'Transform', Icon: Move3d, desc: 'Rotation and flip or mirror, applied in the export chain.' },
  { num: '7', name: 'Color Grading', badge: 'AUTO', Icon: Palette, desc: 'Brightness, contrast, saturation, and hue, plus an auto-grade analysis flow.' },
  { num: '8', name: 'Final Sharpen', Icon: Gauge, desc: 'Output sharpening tuned after the upscale, not before it.' },
  { num: '9', name: 'Export Output', Icon: Upload, desc: 'Hardware NVENC H.264/H.265 encode straight to MP4 on your disk.' },
];

type RepairControl = {
  label: string;
  levels: readonly string[];
  active: number;
};

const repairControls: RepairControl[] = [
  { label: 'Denoise', levels: ['OFF', 'LOW', 'MED', 'HIGH'], active: 2 },
  { label: 'Deblock', levels: ['OFF', 'LOW', 'MED', 'HIGH'], active: 1 },
  { label: 'Deband', levels: ['OFF', 'LOW', 'MED', 'HIGH'], active: 0 },
  { label: 'Deflicker', levels: ['OFF', 'LOW', 'MED', 'HIGH'], active: 0 },
  { label: 'Deinterlace', levels: ['OFF', 'AUTO', 'ON'], active: 1 },
  { label: 'Chroma noise', levels: ['OFF', 'LOW', 'MED', 'HIGH'], active: 3 },
];

type ArchCard = {
  name: string;
  models: string;
  deterministic: boolean;
  desc: string;
};

const archCards: ArchCard[] = [
  { name: 'CNN', models: 'RCAN, EDSR', deterministic: true, desc: 'Classic convolutional networks. Deterministic, bit-identical output across runs. Best for archival work.' },
  { name: 'GAN', models: 'RealESRGAN', deterministic: false, desc: 'Generative detail synthesis for heavier restoration, clearly labeled as non-deterministic.' },
  { name: 'Transformer', models: 'SwinIR, HAT, Swin2SR', deterministic: false, desc: 'Attention-based models for the full pipeline plus secondary model blending.' },
  { name: 'Diffusion', models: 'Diffusion SR', deterministic: false, desc: 'Diffusion-based enhancement for cases where synthesis quality matters most.' },
  { name: 'Lightweight', models: 'Fast preview models', deterministic: false, desc: 'Small CNNs for quick previews before committing to a long render.' },
];

type EngineRoute = {
  name: string;
  tag: string;
  media: string;
  formats: string;
  desc: string;
};

const engineRoutes: EngineRoute[] = [
  {
    name: 'Python sidecar',
    tag: 'DEFAULT',
    media: 'Image + video',
    formats: 'PyTorch weights',
    desc: 'The broadest-compatibility route: FFmpeg decode, shared-memory ring buffer, PyTorch inference, FFmpeg encode. Also carries the research layer: multi-model blending, frequency band analysis, and hallucination detection.',
  },
  {
    name: 'Native direct',
    tag: 'FASTEST',
    media: 'Video only',
    formats: 'ONNX only',
    desc: 'In-process engine-v2: NVDEC decode, CUDA preprocessing, TensorRT or ONNX Runtime inference, NVENC encode. Fully GPU-resident with no CPU round-trips.',
  },
  {
    name: 'Native CLI-backed',
    tag: 'FALLBACK',
    media: 'Video only',
    formats: 'ONNX only',
    desc: 'The native-family compatibility route through the rave adapter, used when the direct path is not the right fit.',
  },
];

const privacyBullets = [
  'Video processing happens locally on your PC and GPU, footage is never uploaded for processing',
  'Supported models (RCAN, EDSR) produce bit-identical output across runs',
  'A deterministic precision mode forces cudnn.deterministic and disables TF32',
  'Full user control over trim, crop, grading, model selection, and precision, with preview before commit',
  'Optional per-run artifact bundles record exactly what settings produced an output',
] as const;

const stackChips = [
  'Tauri 2.0',
  'Rust + Tokio',
  'React 19',
  'Zustand',
  'PyTorch + CUDA',
  'FFmpeg NVDEC/NVENC',
  'TensorRT / ONNX Runtime',
  'Zenoh + shared memory',
] as const;

const requirements = [
  'Windows 10 or 11',
  'NVIDIA GPU with CUDA 11.7+ and NVENC support',
  'Model weights load from a local weights folder, scanned automatically at startup',
] as const;

const relatedRepos = [
  { name: 'rave', desc: 'The Rust-native, GPU-resident AI video engine the native path builds on.', href: 'https://github.com/CalvinSturm/rave' },
  { name: 'VideoForge-Native', desc: 'Local-first image and video enhancement with deterministic execution paths.', href: 'https://github.com/CalvinSturm/VideoForge-Native' },
  { name: 'runscope', desc: 'The run-comparison dashboard that ingests VideoForge run artifacts.', href: 'https://github.com/CalvinSturm/runscope' },
] as const;

export default function VideoForgeApp() {
  return (
    <div className="home-landing vf-page">
      <HomeHeader />

      <main id="main-content">
        {/* ---- Hero ---- */}
        <section className="home-shell vf-hero">
          <div className="vf-titlebar">
            <img src="/assets/VideoForge/VideoForge_icon.png" alt="" width={18} height={18} />
            <span className="vf-titlebar-name">VIDEOFORGE</span>
            <span className="vf-titlebar-sub">AI UPSCALER</span>
            <span className="vf-titlebar-stat">GPU LOCAL</span>
          </div>
          <div className="vf-hero-brand">
            <img src="/assets/VideoForge/VideoForge_icon.png" alt="VideoForge app icon" width={72} height={72} />
            <h1>VideoForge</h1>
          </div>
          <p className="home-hero-sub">
            Clean up, upscale, crop, and export videos locally on Windows. Your GPU does the rendering, your footage
            never leaves the machine.
          </p>
          <p className="vf-hero-body">
            VideoForge is a local-first desktop app that runs old, soft, or low-resolution video through a nine-stage
            processing pipeline: repair the source, upscale it with the right AI model for the job, reframe it, grade
            it, and export it with hardware NVENC encoding. A Rust orchestration layer, a Python inference engine, and
            an optional GPU-native video engine sit behind one Tauri app.
          </p>
          <div className="home-hero-actions">
            <a href="#pipeline" className="vf-render-btn">
              <Zap className="h-4 w-4" />
              RENDER: SEE THE PIPELINE
            </a>
            <a href="/projects" className="home-btn home-btn-ghost">
              Back to Projects
            </a>
          </div>
          <ul className="vf-chips">
            {statusChips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <p className="vf-hero-meta">
            v0.1.0, in active development. Not publicly downloadable yet; the engine work is public in the related
            repos below.
          </p>
        </section>

        {/* ---- Pipeline ---- */}
        <section id="pipeline" className="home-section home-shell" aria-labelledby="pipeline-heading">
          <div className="home-section-head">
            <p className="vf-eyebrow">Processing pipeline</p>
            <h2 id="pipeline-heading">Nine stages, import to export</h2>
            <p className="vf-section-sub">
              The app is organized the way the work actually flows. Every stage is a panel in the settings rail:
              inspect it, enable it, or bypass it, then hit render.
            </p>
          </div>
          <ol className="vf-pipeline">
            {pipelineStages.map(({ num, name, badge, desc, Icon }) => (
              <li key={num} className="vf-stage">
                <span className="vf-stage-num">{num}</span>
                <span className="vf-stage-icon">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="vf-stage-body">
                  <h3>
                    {name}
                    {badge && <span className="vf-badge">{badge}</span>}
                  </h3>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---- Source repair ---- */}
        <section className="home-section home-shell" aria-labelledby="repair-heading">
          <div className="home-section-head">
            <p className="vf-eyebrow">Source repair</p>
            <h2 id="repair-heading">Fix the source before you upscale it</h2>
            <p className="vf-section-sub">
              Upscaling a noisy, blocky source just gives you sharper noise. VideoForge puts cleanup ahead of
              inference, each pass with its own level control.
            </p>
          </div>
          <div className="vf-repair-grid" aria-hidden="true">
            {repairControls.map(({ label, levels, active }) => (
              <div key={label} className="vf-repair">
                <span className="vf-repair-label">{label}</span>
                <div className="vf-seg">
                  {levels.map((level, i) => (
                    <span key={level} className={i === active ? 'vf-seg-on' : undefined}>
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="vf-note">
            Denoise, deblock, deband, deflicker, deinterlace, chroma noise cleanup, pre-upscale sharpening, and black
            bar detection, all previewable per frame or per clip range.
          </p>
        </section>

        {/* ---- Model architectures ---- */}
        <section className="home-section home-shell" aria-labelledby="models-heading">
          <div className="home-section-head">
            <p className="vf-eyebrow">AI upscale</p>
            <h2 id="models-heading">Five model families, honestly labeled</h2>
            <p className="vf-section-sub">
              Pick the architecture that matches the job. Deterministic models are marked, because for archival work
              the same input should always produce the same output.
            </p>
          </div>
          <div className="vf-arch-grid">
            {archCards.map(({ name, models, deterministic, desc }) => (
              <article key={name} className="vf-arch-card">
                <div className="vf-arch-top">
                  <h3>{name}</h3>
                  {deterministic ? (
                    <span className="vf-badge vf-badge-solid">DETERMINISTIC</span>
                  ) : (
                    <span className="vf-badge vf-badge-dim">NON-DET</span>
                  )}
                </div>
                <p className="vf-arch-models">{models}</p>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Engine routes ---- */}
        <section className="home-section home-shell" aria-labelledby="engines-heading">
          <div className="home-section-head">
            <p className="vf-eyebrow">Engine routes</p>
            <h2 id="engines-heading">One app, three execution paths</h2>
            <p className="vf-section-sub">
              Jobs route to the engine that fits the model and media. Eligibility is checked up front, and the Python
              path remains the default when the native family is not the right match.
            </p>
          </div>
          <div className="vf-engine-grid">
            {engineRoutes.map(({ name, tag, media, formats, desc }) => (
              <article key={name} className="vf-engine-card">
                <div className="vf-arch-top">
                  <h3>{name}</h3>
                  <span className="vf-badge">{tag}</span>
                </div>
                <div className="vf-engine-meta">
                  <span><Film className="h-3.5 w-3.5" /> {media}</span>
                  <span><Box className="h-3.5 w-3.5" /> {formats}</span>
                </div>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Local-first principles ---- */}
        <section className="home-section home-shell" aria-labelledby="privacy-heading">
          <div className="home-section-head">
            <p className="vf-eyebrow">Core philosophy</p>
            <h2 id="privacy-heading">Local, deterministic, under your control</h2>
          </div>
          <ul className="vf-bullets">
            {privacyBullets.map((bullet) => (
              <li key={bullet}>
                <CheckCircle2 className="h-4 w-4" />
                {bullet}
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Tech stack + requirements ---- */}
        <section className="home-section home-shell" aria-labelledby="stack-heading">
          <div className="vf-split">
            <div>
              <p className="vf-eyebrow">Under the hood</p>
              <h2 id="stack-heading">The stack</h2>
              <ul className="vf-chips vf-chips-static">
                {stackChips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
              <p className="vf-note">
                Frames move between Rust and Python through a zero-copy shared-memory ring buffer with Zenoh
                signaling. The native engine-v2 path keeps the whole pipeline resident on the GPU.
              </p>
            </div>
            <div>
              <p className="vf-eyebrow">Requirements</p>
              <h2>Built for NVIDIA Windows machines</h2>
              <ul className="vf-bullets">
                {requirements.map((req) => (
                  <li key={req}>
                    <Cpu className="h-4 w-4" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---- Status ---- */}
        <section className="home-section home-shell" aria-labelledby="status-heading">
          <div className="home-section-head">
            <p className="vf-eyebrow">Current status</p>
            <h2 id="status-heading">VideoForge v0.1.0, in development</h2>
            <p className="vf-section-sub">
              VideoForge is being built in the open where it can be: the GPU engine work, the run-artifact tooling,
              and the deterministic execution research are public repos. The app itself is pre-release and not yet
              downloadable. It will ship as a freemium desktop app: a Free tier for previews and watermarked sample
              exports, and VideoForge Pro for full-length, full-resolution work.
            </p>
          </div>
          <div className="vf-repo-grid">
            {relatedRepos.map(({ name, desc, href }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="vf-repo-card">
                <div className="vf-repo-top">
                  <Github className="h-4 w-4" />
                  <span>{name}</span>
                </div>
                <p>{desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="home-final home-shell" aria-labelledby="final-heading">
          <div className="vf-final-panel">
            <Wand2 className="vf-final-icon h-6 w-6" aria-hidden="true" />
            <h2 id="final-heading">Old footage in, clean footage out</h2>
            <p>
              VideoForge is the deep end of the same idea behind the Fast Series: practical Windows tools that do the
              heavy lifting on your own hardware. Want to know when it ships, or want early access as a tester?
            </p>
            <div className="home-hero-actions home-final-actions">
              <a href="mailto:calvinsturm@gmail.com?subject=VideoForge%20early%20access" className="vf-render-btn">
                <Mail className="h-4 w-4" />
                RENDER: REQUEST EARLY ACCESS
              </a>
              <a href="/roadmap" className="home-btn home-btn-ghost">
                View the roadmap
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
