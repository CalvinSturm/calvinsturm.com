import { mountPage } from './lib/mountPage.tsx';
import { FastPlayV3 } from './FastPlayV3.tsx';

export function Page() {
  return <FastPlayV3 />;
}

mountPage(<Page />);
