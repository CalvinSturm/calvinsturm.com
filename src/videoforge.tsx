import { mountPage } from './lib/mountPage.tsx';
import VideoForgeApp from './VideoForgeApp.tsx';
import './index.css';

export function Page() {
  return <VideoForgeApp />;
}

mountPage(<Page />);
