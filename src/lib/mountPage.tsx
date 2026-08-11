import { StrictMode, type ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

/**
 * Mount a page entry in the browser, hydrating build-time HTML when present.
 *
 * Every route is prerendered by scripts/prerender.mjs, so #root normally
 * arrives already filled and this hydrates it. The createRoot branch is the
 * fallback for a shell that was not prerendered. During build-time SSR there
 * is no document, so importing an entry module is side-effect free.
 */
export function mountPage(page: ReactNode): void {
  if (typeof document === 'undefined') return;

  const container = document.getElementById('root');
  if (!container) throw new Error('Page root element was not found');

  const app = <StrictMode>{page}</StrictMode>;
  if (container.hasChildNodes()) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}
