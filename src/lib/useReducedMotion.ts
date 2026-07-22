import { useEffect, useState } from 'react';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function getReducedMotionPreference(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(reducedMotionQuery).matches;
}

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(getReducedMotionPreference);

  useEffect(() => {
    const mediaQuery = window.matchMedia(reducedMotionQuery);
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
}
