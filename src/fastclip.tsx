import { mountPage } from './lib/mountPage.tsx';
import { FastClipProductPage } from './FastSeriesShared.tsx';
import './index.css';

export function Page() {
  return <FastClipProductPage />;
}

mountPage(<Page />);
