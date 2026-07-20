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
          fastcastGuides: path.resolve(__dirname, 'fastcast/guides.html'),
          fastcastGuideRecordScreen: path.resolve(__dirname, 'fastcast/guides/how-to-record-screen-windows.html'),
          fastcastGuideObsAlt: path.resolve(__dirname, 'fastcast/guides/obs-alternative-windows.html'),
          fastcastGuideWebcam: path.resolve(__dirname, 'fastcast/guides/record-screen-and-webcam.html'),
          fastcastGuide4k: path.resolve(__dirname, 'fastcast/guides/record-4k-60fps-windows.html'),
          fastcastGuideNoLag: path.resolve(__dirname, 'fastcast/guides/screen-recording-without-lag.html'),
          fastcastGuideBlackScreen: path.resolve(__dirname, 'fastcast/guides/screen-recording-black-screen-no-audio.html'),
          fastcastGuideCommandLine: path.resolve(__dirname, 'fastcast/guides/command-line-screen-recording-windows.html'),
          fastcastGuideYouTubeRtmps: path.resolve(__dirname, 'fastcast/guides/stream-to-youtube-rtmps-windows.html'),
          fastplay: path.resolve(__dirname, 'fastplay.html'),
          fastplayGuides: path.resolve(__dirname, 'fastplay/guides.html'),
          fastplayGuideVideosNotPlaying: path.resolve(__dirname, 'fastplay/guides/videos-not-playing-on-pc.html'),
          fastplayGuidePlaybackSpeed: path.resolve(__dirname, 'fastplay/guides/change-video-playback-speed-windows.html'),
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
