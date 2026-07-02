import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FastCastProductPage } from './FastSeriesShared.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FastCastProductPage />
  </StrictMode>,
);
