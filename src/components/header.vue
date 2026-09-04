<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Menu, Terminal, X } from "lucide-vue-next";
import { locale, SUPPORTED_LOCALES, setLocale, t } from "@/i18n";

const links = [
  { key: "nav.home", target: "home" },
  { key: "nav.about", target: "about" },
  { key: "nav.experience", target: "experience" },
  { key: "nav.projects", target: "projects" },
  { key: "nav.contact", target: "contact" },
];

const active = ref("home");
const menuOpen = ref(false);
const scrolled = ref(false);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
  menuOpen.value = false;
};

const switchLocale = (code: (typeof SUPPORTED_LOCALES)[number]) => {
  setLocale(code);
};

// Must match the scroll-mt-24 (96px) clearance on the section elements,
// otherwise the spy highlights a section before it actually clears the
// sticky header (e.g. "Men haqimda" while still at the top of the page).
const SPY_OFFSET = 96;

// Sections are looked up on every scroll (instead of once on mount): the
// header mounts before the sibling sections below it, so a one-time capture
// can miss sections and leave the highlight stuck on an earlier link.
const onScroll = () => {
  scrolled.value = window.scrollY > 10;
  const pos = window.scrollY + SPY_OFFSET;
  let current = "home";

  for (const link of links) {
    const section = document.getElementById(link.target);
    if (section) {
      // +1px epsilon: section tops are fractional, an exact <= comparison can
      // fall short and leave the highlight on the previous link.
      const top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= pos + 1) current = link.target;
    }
  }

  // The last section usually cannot clear the full SPY_OFFSET: scrolling stops
  // at the page bottom, so force the final link when we are (almost) there.
  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (scrolledToBottom) current = links[links.length - 1]!.target;

  active.value = current;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b rounded-b-2xl backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300"
    :class="
      scrolled
        ? 'border-white/10 bg-[#0b0f15]/95 shadow-lg shadow-black/40'
        : 'border-white/5 bg-[#0b0f15]/80'
    "
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <button
        @click="scrollTo('home')"
        class="group flex items-center gap-2.5"
        :aria-label="t('a11y.home')"
      >
        <span class="logo-box">
          <span class="logo-box-inner">
            <Terminal class="h-5 w-5 text-white" />
          </span>
        </span>
        <span class="font-mono text-sm font-semibold tracking-wide text-slate-100">
          Abdulroufjon<span class="text-blue-400">.dev</span><span class="logo-cursor"></span>
        </span>
      </button>

      <div class="flex items-center gap-1 sm:gap-2">
        <!-- Desktop menu -->
        <ul class="hidden items-center gap-1 md:flex">
          <li
            v-for="(link, index) in links"
            :key="link.target"
            class="nav-item"
            :style="{ '--i': index }"
          >
            <button
              @click="scrollTo(link.target)"
              class="nav-btn"
              :class="{ active: active === link.target }"
            >
              <span class="nav-num">{{ index + 1 }}</span>
              {{ t(link.key) }}
            </button>
          </li>
        </ul>

        <!-- Language switcher -->
        <div class="lang-switch" role="group" :aria-label="t('a11y.lang')">
          <button
            v-for="code in SUPPORTED_LOCALES"
            :key="code"
            @click="switchLocale(code)"
            class="cursor-pointer"
            :class="['lang-btn', { active: locale === code }]"
            :aria-pressed="locale === code"
          >
            {{ code.toUpperCase() }}
          </button>
        </div>

        <!-- Mobile toggle -->
        <button
          @click="menuOpen = !menuOpen"
          class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-200 transition-colors hover:border-blue-500/50 hover:text-blue-400 md:hidden"
          :aria-expanded="menuOpen"
          :aria-label="t('a11y.menu')"
        >
          <X v-if="menuOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <ul
        v-if="menuOpen"
        class="card-glass space-y-1 border-t border-white/5 px-4 py-3 md:hidden"
      >
        <li v-for="(link, index) in links" :key="link.target">
          <button
            @click="scrollTo(link.target)"
            :class="[
              'w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
              active === link.target
                ? 'bg-blue-500/10 text-blue-400'
                : 'text-slate-300 hover:bg-white/5 hover:text-white',
            ]"
            :style="{ animationDelay: index * 40 + 'ms' }"
          >
            <span class="mr-2 font-mono text-xs text-blue-500/70">{{ index + 1 }}</span>
            {{ t(link.key) }}
          </button>
        </li>
      </ul>
    </transition>
  </header>
</template>

<style scoped>
/* ---------- entrance: nav items cascade in on load ---------- */
@keyframes nav-in {
  from {
    opacity: 0;
    transform: translateY(-14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.nav-item {
  animation: nav-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(0.15s + var(--i) * 70ms);
}
.nav-btn {
  position: relative;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  color: #94a3b8;
  transition: color 0.2s ease, text-shadow 0.2s ease;
}
.nav-btn::after {
  content: "";
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: -0.3rem;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, #3b82f6, #22d3ee);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-btn:hover {
  color: #f1f5f9;
}
.nav-btn:hover::after {
  transform: scaleX(1);
}
.nav-btn.active {
  color: #60a5fa;
  text-shadow: 0 0 14px rgba(59, 130, 246, 0.55);
}
.nav-btn.active::after {
  transform: scaleX(1);
  animation: underline-glow 2.2s ease-in-out infinite;
}
.nav-num {
  margin-right: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: rgba(59, 130, 246, 0.75);
  transition: color 0.2s ease;
}
.nav-btn.active .nav-num,
.nav-btn:hover .nav-num {
  color: #22d3ee;
}

@keyframes underline-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 2px rgba(34, 211, 238, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 7px rgba(34, 211, 238, 0.95));
  }
}

/* ---------- logo: gradient box + sweeping shine ---------- */
@keyframes logo-shine {
  0% {
    transform: translateX(-130%) skewX(-20deg);
  }
  55%,
  100% {
    transform: translateX(220%) skewX(-20deg);
  }
}
.logo-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.35);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.logo-box::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 40%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.45),
    transparent
  );
  animation: logo-shine 3.2s ease-in-out infinite;
}
.logo-box-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}
.group:hover .logo-box {
  transform: rotate(-6deg) scale(1.08);
  box-shadow: 0 0 24px 2px rgba(59, 130, 246, 0.55);
}

/* blinking code cursor next to the logo text */
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
.logo-cursor {
  display: inline-block;
  width: 0.15em;
  height: 0.70em;
  margin-left: 0.15em;
  margin-bottom: 0.20em;
  vertical-align: text-bottom;
  border-radius: 1px;
  background: #22d3ee;
  animation: blink 1.1s steps(1) infinite;
}

/* ---------- language switcher ---------- */
.lang-switch {
  display: flex;
  gap: 2px;
  margin-left: 0.25rem;
  padding: 3px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
}
.lang-btn {
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #94a3b8;
  transition: color 0.2s ease, background 0.25s ease, box-shadow 0.25s ease;
}
.lang-btn:hover {
  color: #e2e8f0;
}
.lang-btn.active {
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.45);
}

@media (prefers-reduced-motion: reduce) {
  .nav-item,
  .logo-box::before,
  .logo-cursor,
  .nav-btn.active::after {
    animation: none;
  }
}
</style>