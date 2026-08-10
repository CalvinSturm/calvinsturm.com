import { mountPage } from './lib/mountPage.tsx';
import FaceForgeApp from './FaceForgeApp.tsx';
import './index.css';

export function Page() {
  return <FaceForgeApp />;
}

mountPage(<Page />);
