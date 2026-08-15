import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FastPlayV3 } from './FastPlayV3.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FastPlayV3 />
  </StrictMode>,
);
