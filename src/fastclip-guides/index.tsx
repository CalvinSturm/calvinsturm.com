import { mountGuide } from '../product-guides/mountGuide.tsx';
import { GuidesIndexPage } from './GuideLayout.tsx';
import '../index.css';

export function GuidePage() {
  return <GuidesIndexPage />;
}

mountGuide(<GuidePage />);
