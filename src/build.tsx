import { mountPage } from './lib/mountPage.tsx';
import BuildApp from './BuildApp.tsx';
import './index.css';

export function Page() {
  return <BuildApp />;
}

mountPage(<Page />);
