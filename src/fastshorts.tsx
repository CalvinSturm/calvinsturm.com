import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProductPage, productBySlug } from './FastSeriesShared.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductPage product={productBySlug.fastshorts} />
  </StrictMode>,
);
