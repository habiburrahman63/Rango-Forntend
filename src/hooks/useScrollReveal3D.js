import { useRef, useEffect } from 'react';

/**
 * useScrollReveal3D
 * Lightweight IntersectionObserver hook for smooth 3D perspective scroll reveals.
 */
export function useScrollReveal3D(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      if (el) el.classList.add('is-revealed-3d');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed-3d');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, rootMargin]);

  return ref;
}
