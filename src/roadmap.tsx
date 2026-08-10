import { mountPage } from './lib/mountPage.tsx';
import RoadmapApp from './RoadmapApp.tsx';
import './index.css';

export function Page() {
  return <RoadmapApp />;
}

mountPage(<Page />);
