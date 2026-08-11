import { mountPage } from './lib/mountPage.tsx';
import { FastCastV2 } from './FastCastV2.tsx';
import './index.css';

export function Page() {
  return <FastCastV2 />;
}

mountPage(<Page />);
