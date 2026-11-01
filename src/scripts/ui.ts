/**
 * Общие эффекты всех страниц: блоки плавно появляются при прокрутке,
 * а числа с атрибутом data-count «набегают» от нуля.
 */

declare global {
  interface Window {
    /** Флаг для скрипта в <head>: основной скрипт загрузился. */
    __ysUi?: boolean;
  }
}

window.__ysUi = true;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(element: HTMLElement) {
  const target = Number(element.dataset.count);
  if (!Number.isFinite(target) || reduceMotion) return;

  const duration = 1200;
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };
  element.textContent = '0';
  requestAnimationFrame(tick);
}

function reveal(element: Element) {
  element.classList.add('is-visible');
  element.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
}

const items = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  );
  items.forEach((element) => observer.observe(element));
} else {
  items.forEach(reveal);
}

export {};
