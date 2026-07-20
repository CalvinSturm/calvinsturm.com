import { StrictMode, type ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

/**
 * Mount a guide entry in the browser and hydrate build-time HTML when present.
 * During build-time SSR there is no document, so importing an entry is safe.
 */
export function mountGuide(page: ReactNode): void {
  if (typeof document === 'undefined') return;

  const container = document.getElementById('root');
  if (!container) throw new Error('Guide root element was not found');

  const app = <StrictMode>{page}</StrictMode>;
  if (container.hasChildNodes()) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}
