import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FastSeriesHub } from './FastSeriesShared.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FastSeriesHub />
  </StrictMode>,
);
