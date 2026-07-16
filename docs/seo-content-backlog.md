# SEO content backlog

Status of the problem-focused guide strategy as of 2026-07-16. The guide
architecture is `src/product-guides/ProductGuides.tsx` bound per product
(`src/<product>-guides/`); each guide needs an HTML shell, a `.tsx` article, a
`guides-data.ts` entry, a Vite input, and a sitemap entry.

## Published guide hubs

| Hub | Guides | Target intents |
| --- | --- | --- |
| `/fastcast/guides` | 6 | record screen Windows, OBS alternative, screen+webcam, 4K 60fps, recording lag, black screen / no audio troubleshooting |
| `/fastplay/guides` | 6 | HDR on Windows, HEVC player, MOV not playing, HDR washed out, review workflow, stuttering playback |
| `/fastcompress/guides` | 2 (new) | compress video for Discord, compress video for email |
| `/fastclip/guides` | 2 (new) | long video to vertical clips, local auto captions |

## Backlog (in priority order)

1. **FaceForge: "How to blur faces in a video without uploading it"**
   (`/faceforge` has no guide hub yet). Strong privacy intent, matches queries
   the page already gets 41 impressions for. Blocked-ish: FaceForge is a
   v0.1.0 alpha with strict hardware requirements (NVIDIA RTX + CUDA), so an
   honest guide must present it as an alpha for RTX owners and give the
   cloud/editor alternatives equal weight. Needs a `faceforge-guides` hub or a
   standalone article shell; consider waiting for a beta with wider hardware
   support before investing.
2. **LocalAgent: "How to run a local AI coding agent on Windows"** (68
   impressions, weakest CTR on the site). Honest content exists (install via
   cargo, Ollama/LM Studio/llama.cpp setup, trust gates), but the audience is
   small and the product is alpha developer tooling. Publish as a technical
   guide once the install story is less source-build-centric.
3. **FastCompress: "Compress a video without losing (visible) quality"** -
   broader head term than the Discord/email guides; write only with a clearly
   distinct angle (CRF vs target-size encoding) to avoid overlapping the two
   published guides.
4. **FastPlay: "Best lightweight video player for Windows"** - comparison-style
   page; risky to write honestly without benchmarks. The FastPlay FAQ already
   commits to benchmark data before "fastest" claims; hold until benchmarks
   exist.

## Covered by existing articles (do not duplicate)

- "Record without configuring OBS" and "OBS alternatives": both map to
  `obs-alternative-windows` plus the main recording guide; a separate article
  would cannibalize them.
- "iPhone videos not playing on Windows": `mov-not-playing-windows` already
  targets this (iPhone MOV/HEVC/HDR are its core examples); a dedicated iPhone
  page would split the same intent.
- "Audio plays without video / video without audio": covered as symptoms
  inside `hevc-player-windows` and `mov-not-playing-windows` (missing decoder)
  and `video-stuttering-windows` (decode pressure).
- "Record system audio and microphone together": covered by the audio-setup
  section of `how-to-record-screen-windows`; split out only if search data
  shows it deserves its own page.
- "Timestamp markers and notes review": FastPlay has no markers/notes feature;
  `video-review-workflow` honestly positions in/out points instead. Blocked on
  product capability.

## Rejected

- Per-platform duplicates of the Discord guide (WhatsApp, Slack, etc.):
  doorway-page risk; the email guide already covers the generic
  "attachment limit" pattern and the Discord guide covers the calculation.
- FastShorts guides: product is experimental with no public download; a guide
  would have no honest CTA.
