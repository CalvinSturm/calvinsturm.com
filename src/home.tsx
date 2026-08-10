import { mountPage } from './lib/mountPage.tsx';
import HomeApp from './HomeApp.tsx';
import './index.css';

export function Page() {
  return <HomeApp />;
}

mountPage(<Page />);
