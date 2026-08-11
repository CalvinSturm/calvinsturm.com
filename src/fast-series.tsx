import { mountPage } from './lib/mountPage.tsx';
import FastSeriesApp from './FastSeriesApp.tsx';
import './index.css';

export function Page() {
  return <FastSeriesApp />;
}

mountPage(<Page />);
