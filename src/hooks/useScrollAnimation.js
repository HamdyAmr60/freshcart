
import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('.fade-in-section, .slide-in-left, .slide-in-right, .stagger-animation');
    elements.forEach((el, index) => {
      // Add staggered delay for elements with stagger-animation class
      if (el.classList.contains('stagger-animation')) {
        el.style.transitionDelay = `${index * 0.1}s`;
      }
      observer.observe(el);
    });

    elementsRef.current = elements;

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return elementsRef;
};
