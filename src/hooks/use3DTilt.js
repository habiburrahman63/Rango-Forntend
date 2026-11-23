import { useRef, useEffect } from 'react';

/**
 * use3DTilt
 * High-performance, 60/120 FPS 3D perspective tilt hook.
 * Attaches passive event listeners automatically to ref.current.
 * Uses requestAnimationFrame and hardware-accelerated transforms.
 * Automatically deactivates on touch-only devices for optimal performance.
 */
export function use3DTilt(options = {}) {
  const {
    maxTilt = 7, // max tilt angle in degrees
    perspective = 900, // 3D perspective depth in px
    scale = 1.02, // subtle scale on hover
    speed = 400, // reset transition speed in ms
    glare = true, // dynamic specular light sheen
    disabled = false
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    let frameId = null;
    let isHovered = false;

    // Only perform 3D tilt on devices with fine pointer (mouse / trackpad)
    if (window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const onMouseEnter = () => {
      isHovered = true;
      el.style.willChange = 'transform';
    };

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const normX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
        const normY = Math.max(-1, Math.min(1, (y - centerY) / centerY));

        const rotateX = (-(normY * maxTilt)).toFixed(2);
        const rotateY = (normX * maxTilt).toFixed(2);

        el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
        el.style.transition = 'transform 0.08s ease-out, box-shadow 0.2s ease-out';

        if (glare) {
          const glareX = ((x / rect.width) * 100).toFixed(1);
          const glareY = ((y / rect.height) * 100).toFixed(1);
          el.style.setProperty('--glare-x', `${glareX}%`);
          el.style.setProperty('--glare-y', `${glareY}%`);
          el.style.setProperty('--glare-opacity', '0.15');
        }
      });
    };

    const onMouseLeave = () => {
      isHovered = false;
      if (frameId) cancelAnimationFrame(frameId);

      el.style.transition = `transform ${speed}ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow ${speed}ms ease`;
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

      if (glare) {
        el.style.setProperty('--glare-opacity', '0');
      }

      setTimeout(() => {
        if (!isHovered && el) {
          el.style.willChange = 'auto';
        }
      }, speed);
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [disabled, maxTilt, perspective, scale, speed, glare]);

  return ref;
}
