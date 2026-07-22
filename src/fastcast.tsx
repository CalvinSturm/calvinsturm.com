import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FastCastV2 } from './FastCastV2.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FastCastV2 />
  </StrictMode>,
);
