import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import VideoForgeApp from './VideoForgeApp.tsx';
import './index.css';

document.documentElement.classList.add('home-page');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VideoForgeApp />
  </StrictMode>,
);
