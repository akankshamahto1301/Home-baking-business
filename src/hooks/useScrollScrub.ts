import { useEffect, useRef } from 'react';

/**
 * Maps the element's travel through the viewport to --scrub (0 → 1).
 */
export function useScrollScrub<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      const raw = span <= 0 ? 0 : (window.innerHeight - rect.top) / span;
      const progress = Math.min(1, Math.max(0, raw));
      el.style.setProperty('--scrub', String(reduced ? progress * 0.4 : progress));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return ref;
}
