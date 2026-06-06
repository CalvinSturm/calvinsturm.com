import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProjectsApp from './ProjectsApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectsApp />
  </StrictMode>,
);
