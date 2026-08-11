import { mountPage } from './lib/mountPage.tsx';
import { FastPlayProductPage } from './FastSeriesShared.tsx';
import './index.css';

export function Page() {
  return <FastPlayProductPage />;
}

mountPage(<Page />);
