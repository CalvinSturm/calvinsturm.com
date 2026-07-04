import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProjectsApp from './ProjectsApp.tsx';
import './index.css';

document.documentElement.classList.add('home-page');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectsApp />
  </StrictMode>,
);
