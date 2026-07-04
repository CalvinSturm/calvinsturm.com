import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import BuildApp from './BuildApp.tsx';
import './index.css';

document.documentElement.classList.add('home-page');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BuildApp />
  </StrictMode>,
);
