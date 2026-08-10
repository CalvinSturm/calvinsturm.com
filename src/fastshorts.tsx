import { mountPage } from './lib/mountPage.tsx';
import { FastShortsProductPage } from './FastSeriesShared.tsx';
import './index.css';

export function Page() {
  return <FastShortsProductPage />;
}

mountPage(<Page />);
