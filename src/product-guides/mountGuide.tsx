// The guide entries were the first pages to be prerendered and still import
// mountGuide. The implementation is now shared with every other route.
export { mountPage as mountGuide } from '../lib/mountPage.tsx';
