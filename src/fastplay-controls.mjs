/* FastPlay keyboard controls, shared by the v2 and v3 pages.
 *
 * Mirrors the controls overlay in the player (hold H), and must stay in the
 * same order the overlay uses. FastSeriesShared.tsx keeps its own copy for
 * the live /fastplay page, the same way fastplay-faqs.mjs works today.
 */
export const fastPlayControls = [
  ['Space', 'Pause / resume / replay'],
  ['Left / Right', 'Seek 5s, hold for 15s steps'],
  ['Ctrl+F / Ctrl+B', 'Move one frame forward / backward'],
  ['Ctrl+O (letter O)', 'Open media file'],
  ['Ctrl+Shift+O (letter O)', 'Recent files overlay'],
  ['PageUp / PageDown', 'Previous / next file in the play queue'],
  ['Ctrl+S', 'Save screenshot'],
  ['Ctrl+Shift+S', 'Toggle framed/frameless windowed mode'],
  ['[ / ]', 'Decrease / increase playback speed'],
  ['\\', 'Reset speed to 1x'],
  ['I / O', 'Set in-point / out-point'],
  ['Shift+I / Shift+O', 'Clear in-point / out-point'],
  ['R', 'Toggle loop range or auto-replay'],
  ['S', 'Toggle subtitles'],
  ['Mouse wheel', 'Volume'],
  ['Ctrl+Mouse wheel', 'Zoom at cursor'],
  ['Ctrl+Drag', 'Pan when zoomed'],
  ['Ctrl+0 (zero)', 'Reset zoom, pan, rotation'],
  ['Ctrl+R / Ctrl+E', 'Rotate CW / CCW'],
  ['Ctrl+H', 'Borderless fullscreen'],
  ['Esc', 'Exit fullscreen'],
  ['Ctrl+W', 'Fit window to video'],
  ['Ctrl+Q', 'Half-resolution window'],
  ['Backspace', 'Cancel scrub'],
  ['H (hold)', 'Show controls overlay'],
  ['`', 'Toggle HW/SW decode mode in title bar'],
];
