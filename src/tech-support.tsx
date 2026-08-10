import { mountPage } from './lib/mountPage.tsx';
import App from './App.tsx';
import './index.css';

export function Page() {
  return <App />;
}

mountPage(<Page />);
