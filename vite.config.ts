import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          build: path.resolve(__dirname, 'build.html'),
          techSupport: path.resolve(__dirname, 'tech-support.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          localagent: path.resolve(__dirname, 'localagent.html'),
          faceforge: path.resolve(__dirname, 'faceforge.html'),
          videoforge: path.resolve(__dirname, 'videoforge.html'),
          fastSeries: path.resolve(__dirname, 'fast-series.html'),
          roadmap: path.resolve(__dirname, 'roadmap.html'),
          fastcast: path.resolve(__dirname, 'fastcast.html'),
          fastcastPrivacy: path.resolve(__dirname, 'fastcast/privacy.html'),
          fastcastGuides: path.resolve(__dirname, 'fastcast/guides.html'),
          fastcastGuideRecordScreen: path.resolve(__dirname, 'fastcast/guides/how-to-record-screen-windows.html'),
          fastcastGuideHdrCapture: path.resolve(__dirname, 'fastcast/guides/hdr-screen-recording-screenshots-windows.html'),
          fastcastGuideObsAlt: path.resolve(__dirname, 'fastcast/guides/obs-alternative-windows.html'),
          fastcastGuideWebcam: path.resolve(__dirname, 'fastcast/guides/record-screen-and-webcam.html'),
          fastcastGuide4k: path.resolve(__dirname, 'fastcast/guides/record-4k-60fps-windows.html'),
          fastcastGuideNoLag: path.resolve(__dirname, 'fastcast/guides/screen-recording-without-lag.html'),
          fastcastGuideBlackScreen: path.resolve(__dirname, 'fastcast/guides/screen-recording-black-screen-no-audio.html'),
          fastcastGuideCommandLine: path.resolve(__dirname, 'fastcast/guides/command-line-screen-recording-windows.html'),
          fastcastGuideStreamingWindows: path.resolve(__dirname, 'fastcast/guides/how-to-stream-on-windows.html'),
          fastcastGuideYouTubeRtmps: path.resolve(__dirname, 'fastcast/guides/stream-to-youtube-rtmps-windows.html'),
          fastcastGuideTwitch: path.resolve(__dirname, 'fastcast/guides/stream-to-twitch-windows.html'),
          fastcastGuideKick: path.resolve(__dirname, 'fastcast/guides/stream-to-kick-windows.html'),
          fastcastGuideStreamKeys: path.resolve(__dirname, 'fastcast/guides/find-stream-key-youtube-twitch-kick.html'),
          fastcastGuidePrivateTest: path.resolve(__dirname, 'fastcast/guides/test-live-stream-without-going-public.html'),
          fastcastGuideBitrate: path.resolve(__dirname, 'fastcast/guides/choose-live-streaming-bitrate.html'),
          fastcastGuideScreenWebcam: path.resolve(__dirname, 'fastcast/guides/stream-screen-webcam-windows.html'),
          fastcastGuideStreamStability: path.resolve(__dirname, 'fastcast/guides/fix-live-stream-dropping-buffering.html'),
          fastplay: path.resolve(__dirname, 'fastplay.html'),
          fastplayPrivacy: path.resolve(__dirname, 'fastplay/privacy.html'),
          fastplayV2: path.resolve(__dirname, 'fastplay-v2.html'),
          fastplayV3: path.resolve(__dirname, 'fastplay-v3.html'),
          fastplayGuides: path.resolve(__dirname, 'fastplay/guides.html'),
          fastplayGuideHdrVideo: path.resolve(__dirname, 'fastplay/guides/hdr-video-windows.html'),
          fastplayGuideMov: path.resolve(__dirname, 'fastplay/guides/mov-not-playing-windows.html'),
          fastplayGuideHevc: path.resolve(__dirname, 'fastplay/guides/hevc-player-windows.html'),
          fastplayGuideWashedOut: path.resolve(__dirname, 'fastplay/guides/hdr-looks-washed-out.html'),
          fastplayGuideReview: path.resolve(__dirname, 'fastplay/guides/video-review-workflow.html'),
          fastplayGuideStuttering: path.resolve(__dirname, 'fastplay/guides/video-stuttering-windows.html'),
          fastplayGuide120Fps: path.resolve(__dirname, 'fastplay/guides/play-120-fps-video-windows.html'),
          fastplayGuideSrt: path.resolve(__dirname, 'fastplay/guides/add-srt-subtitles-video-windows.html'),
          fastclip: path.resolve(__dirname, 'fastclip.html'),
          fastclipGuides: path.resolve(__dirname, 'fastclip/guides.html'),
          fastclipGuideVerticalClips: path.resolve(__dirname, 'fastclip/guides/long-video-into-vertical-clips.html'),
          fastclipGuideAutoCaptions: path.resolve(__dirname, 'fastclip/guides/auto-captions-without-uploading.html'),
          fastcompress: path.resolve(__dirname, 'fastcompress.html'),
          fastcompressGuides: path.resolve(__dirname, 'fastcompress/guides.html'),
          fastcompressGuideDiscord: path.resolve(__dirname, 'fastcompress/guides/compress-video-for-discord.html'),
          fastcompressGuideEmail: path.resolve(__dirname, 'fastcompress/guides/compress-video-for-email.html'),
          fastshorts: path.resolve(__dirname, 'fastshorts.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
