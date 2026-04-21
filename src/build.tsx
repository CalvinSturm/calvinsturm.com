import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import BuildApp from './BuildApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BuildApp />
  </StrictMode>,
);
