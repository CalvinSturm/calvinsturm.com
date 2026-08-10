import { mountPage } from './lib/mountPage.tsx';
import LocalAgentApp from './LocalAgentApp.tsx';
import './index.css';

export function Page() {
  return <LocalAgentApp />;
}

mountPage(<Page />);
