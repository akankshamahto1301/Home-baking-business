import { useEffect, useRef } from 'react';

/**
 * Lerped pointer tilt. Sets --tilt-x, --tilt-y, --px, --py on the element.
 */
export function usePointerTilt<T extends HTMLElement = HTMLDivElement>(
  options?: { max?: number }
) {
  const ref = useRef<T>(null);
  const max = options?.max ?? 8;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const amp = reduced ? max * 0.35 : max;

    const target = { x: 0, y: 0, px: 50, py: 50 };
    const current = { x: 0, y: 0, px: 50, py: 50 };
    let hovering = false;
    let raf = 0;

    const tick = () => {
      const k = hovering ? 0.14 : 0.1;
      current.x += (target.x - current.x) * k;
      current.y += (target.y - current.y) * k;
      current.px += (target.px - current.px) * k;
      current.py += (target.py - current.py) * k;
      el.style.setProperty('--tilt-x', `${current.x.toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${current.y.toFixed(2)}deg`);
      el.style.setProperty('--px', `${current.px.toFixed(1)}%`);
      el.style.setProperty('--py', `${current.py.toFixed(1)}%`);
      raf = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      hovering = true;
      target.x = -ny * amp * 2;
      target.y = nx * amp * 2;
      target.px = (nx + 0.5) * 100;
      target.py = (ny + 0.5) * 100;
    };

    const onLeave = () => {
      hovering = false;
      target.x = 0;
      target.y = 0;
      target.px = 50;
      target.py = 50;
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [max]);

  return ref;
}
