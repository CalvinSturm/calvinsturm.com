import { mountPage } from './lib/mountPage.tsx';
import ProjectsApp from './ProjectsApp.tsx';
import './index.css';

export function Page() {
  return <ProjectsApp />;
}

mountPage(<Page />);
