import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GuidesIndexPage } from './GuideLayout.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GuidesIndexPage />
  </StrictMode>,
);
