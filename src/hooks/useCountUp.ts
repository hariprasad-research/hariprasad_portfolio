import { useEffect, useState } from 'react';

/**
 * Counts from 0 up to `target` with an ease-out curve once `start` is true.
 * Used for animated metric numbers that trigger on scroll reveal.
 */
const useCountUp = (target: number, start: boolean, duration = 1600) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
};

export default useCountUp;
