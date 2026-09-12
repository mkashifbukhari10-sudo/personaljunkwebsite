'use client';

import { useEffect, useRef } from 'react';

/**
 * One-pass fade-and-rise on first scroll into view.
 *
 * Content is visible by default (server HTML, no-JS, and the pre-hydration paint),
 * so LCP and crawlers are never blocked. After hydration, only sections still
 * below the fold are hidden and then revealed as they scroll in. Reduced motion
 * and missing IntersectionObserver leave everything visible.
 */
export default function Reveal({ as: Tag = 'section', delay = 0, style, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) return;

    // Already on screen: leave it visible, no animation.
    if (el.getBoundingClientRect().top < (window.innerHeight || 800) * 0.92) return;

    el.classList.add('jk-reveal-hidden');
    const show = () => el.classList.remove('jk-reveal-hidden');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    io.observe(el);
    const failsafe = setTimeout(show, 9000);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
      show();
    };
  }, []);

  return (
    <Tag ref={ref} className="jk-reveal" style={{ transitionDelay: delay + 'ms', ...style }} {...rest}>
      {children}
    </Tag>
  );
}
