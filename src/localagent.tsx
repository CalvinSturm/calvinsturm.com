import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LocalAgentApp from './LocalAgentApp.tsx';
import './index.css';

document.documentElement.classList.add('home-page');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalAgentApp />
  </StrictMode>,
);
