import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import FastPlayV2 from './FastPlayV2.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FastPlayV2 />
  </StrictMode>,
);
