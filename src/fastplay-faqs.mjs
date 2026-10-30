export const fastPlayFaqs = [
  {
    question: 'What is FastPlay?',
    answer:
      'FastPlay is a fast, lightweight native Windows video player built for local video playback, responsive seeking, hardware-accelerated decode, and simple controls.',
  },
  {
    question: 'Is FastPlay a VLC alternative?',
    answer:
      'FastPlay can be used as a lightweight VLC alternative for Windows users who mainly want simple local file playback, fast startup, smooth scrubbing, and responsive controls. VLC is still better for advanced streaming, disc playback, filters, plugins, and cross-platform use.',
  },
  {
    question: 'What platforms does FastPlay support?',
    answer: 'FastPlay is built for Windows 10 and later, 64-bit.',
  },
  {
    question: 'Is FastPlay free?',
    answer: 'Yes. FastPlay is free and open source under the MIT License.',
  },
  {
    question: 'What makes FastPlay fast?',
    answer:
      'FastPlay is built around native Windows playback, FFmpeg demux and decode, D3D11 hardware decode, DXGI presentation, bounded queues, stale-work dropping during seek, and WASAPI audio.',
  },
  {
    question: 'Does FastPlay support subtitles?',
    answer:
      'FastPlay supports external sidecar .srt subtitle files placed next to the media file. Embedded subtitle tracks and other subtitle formats are not loaded, and styling is intentionally minimal.',
  },
  {
    question: 'Can FastPlay cut or export a clip?',
    answer:
      'Yes. Since v0.5.0, set an in point with I and an out point with O, then press Ctrl+Shift+E to save that range as an MP4. MP4 files cut on a keyframe are copied without re-encoding; otherwise FastPlay re-encodes to H.264/AAC so the clip matches your marks exactly. FFmpeg is included, so nothing else needs installing.',
  },
  {
    question: 'Is FastPlay the fastest video player?',
    answer:
      'FastPlay is built for fast local playback, but it does not claim to be the fastest. A local benchmark harness measures open and seek times, and cross-player comparisons will only be claimed once measured results are published.',
  },
];
