// Shared eased smooth-scroll, used by the header nav and in-page CTAs so the
// booking section scroll feels the same everywhere. Honors reduced-motion.

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function smoothScrollTo(targetY: number, duration = 800): void {
  if (typeof window === "undefined") return;

  const prefersReduced = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

/**
 * Scroll to an in-page anchor (e.g. "#contact"). Treats "#home"/"#"/"" as the
 * top of the page. No-op if the target element isn't on the current page.
 */
export function scrollToHash(hash: string, duration = 800): void {
  if (typeof document === "undefined") return;

  if (hash === "#home" || hash === "#" || hash === "") {
    smoothScrollTo(0, duration);
    return;
  }

  const el = document.querySelector(hash);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(top, duration);
  }
}
