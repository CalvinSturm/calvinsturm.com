import { mountPage } from './lib/mountPage.tsx';
import HomeApp from './HomeApp.tsx';
import './index.css';
import './home.css';

export function Page() {
  return <HomeApp />;
}

mountPage(<Page />);
