import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FastClipProductPage } from './FastSeriesShared.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FastClipProductPage />
  </StrictMode>,
);
