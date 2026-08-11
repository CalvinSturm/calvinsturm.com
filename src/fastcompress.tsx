import { mountPage } from './lib/mountPage.tsx';
import { FastCompressProductPage } from './FastSeriesShared.tsx';
import './index.css';

export function Page() {
  return <FastCompressProductPage />;
}

mountPage(<Page />);
