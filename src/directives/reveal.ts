import type { Directive } from "vue";

type RevealElement = HTMLElement & {
  _revealObserver?: IntersectionObserver;
};

/**
 * v-reveal — animates an element into view the first time it scrolls into
 * the viewport. Variants and delay are set via HTML attributes:
 *   <div v-reveal data-reveal="left" data-delay="150">...</div>
 */
export const reveal: Directive<RevealElement, undefined> = {
  mounted(el) {
    el.classList.add("reveal");

    const delay = Number(el.dataset.delay ?? 0);
    if (delay > 0) el.style.animationDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(el);
    el._revealObserver = observer;
  },
  unmounted(el) {
    el._revealObserver?.disconnect();
  },
};