'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * A custom hook to easily apply GSAP ScrollTrigger animations to elements.
 * @param {Object} options Configuration parameters.
 * @param {string} options.animationType 'fade-up' | 'fade-in' | 'scale' | 'stagger'
 * @param {number} options.duration Animation duration in seconds.
 * @param {number} options.delay Initial delay in seconds.
 * @param {string} options.start ScrollTrigger start trigger point (e.g. 'top 85%')
 * @param {number} options.y Distance for translate animations.
 * @param {number} options.scale Starting scale for scaling animations.
 * @param {number} options.stagger Stagger duration for child elements.
 */
export default function useGsapAnimation(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const {
      animationType = 'fade-up',
      duration = 0.8,
      delay = 0,
      start = 'top 85%',
      toggleActions = 'play none none none',
      y = 40,
      scale = 0.95,
      stagger = 0.1,
    } = options;

    let ctx = gsap.context(() => {
      if (animationType === 'fade-up') {
        gsap.fromTo(el,
          { opacity: 0, y: y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions,
            }
          }
        );
      } else if (animationType === 'fade-in') {
        gsap.fromTo(el,
          { opacity: 0 },
          {
            opacity: 1,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions,
            }
          }
        );
      } else if (animationType === 'scale') {
        gsap.fromTo(el,
          { opacity: 0, scale: scale },
          {
            opacity: 1,
            scale: 1,
            duration,
            delay,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions,
            }
          }
        );
      } else if (animationType === 'stagger') {
        const targets = el.children;
        if (targets.length > 0) {
          gsap.fromTo(targets,
            { opacity: 0, y: y },
            {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions,
              }
            }
          );
        }
      }
    }, el);

    return () => ctx.revert();
  }, [options]);

  return elementRef;
}
