import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FastCompressProductPage } from './FastSeriesShared.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FastCompressProductPage />
  </StrictMode>,
);
