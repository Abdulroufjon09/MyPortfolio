<script setup lang="ts">
import { t } from "@/i18n";
import pythonLogo from "@/assets/images/tech/python.svg";
import djangoLogo from "@/assets/images/tech/django.svg";
import javascriptLogo from "@/assets/images/tech/javascript.svg";
import vuejsLogo from "@/assets/images/tech/vuejs.svg";
import html5Logo from "@/assets/images/tech/html5.svg";
import css3Logo from "@/assets/images/tech/css3.svg";
import telegramLogo from "@/assets/images/tech/telegram.svg";

const skills = [
  { categoryKey: "skills.backend", details: "Python • Django", level: 90 },
  {
    categoryKey: "skills.frontend",
    details: "HTML • CSS • JavaScript • Vue.js",
    level: 85,
  },
  { categoryKey: "skills.integration", details: "Telegram bot", level: 75 },
];

// Framework/language logos — local SVGs (no runtime CDN dependency)
const technologies = [
  { name: "Python", img: pythonLogo },
  { name: "Django", img: djangoLogo },
  { name: "JavaScript", img: javascriptLogo },
  { name: "Vue.js", img: vuejsLogo },
  { name: "HTML", img: html5Logo },
  { name: "CSS", img: css3Logo },
  { name: "Telegram Bot", img: telegramLogo },
];
</script>

<template>
  <section
    id="skills"
    v-reveal
    class="rounded-2xl border border-white/5 bg-[#0d1117] p-6 sm:p-8"
  >
    <!-- Sarlavha -->
    <div class="flex items-center gap-3">
      <span class="font-mono text-sm font-semibold text-blue-500">04.</span>
      <h2
        class="text-xl font-bold uppercase tracking-widest text-white sm:text-2xl"
      >
        {{ t("skills.title") }}
      </h2>
      <span
        class="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"
      ></span>
    </div>

    <ul class="mt-7 space-y-6">
      <li
        v-for="(skill, index) in skills"
        :key="skill.categoryKey"
        v-reveal
        data-reveal="up"
        :data-delay="String(index * 120)"
      >
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span
            class="font-mono text-sm font-bold uppercase tracking-wider text-blue-500"
          >
            {{ t(skill.categoryKey) }}
          </span>
          <span class="text-sm font-medium text-slate-200">
            {{ skill.details }}
          </span>
        </div>
        <div class="mt-2.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            class="skill-bar h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400"
            :style="{ '--level': skill.level + '%' }"
          ></div>
        </div>
      </li>
    </ul>

    <!-- Texnologiyalar -->
    <div v-reveal class="mt-10 flex items-center gap-3">
      <span class="font-mono text-sm font-semibold text-blue-500">05.</span>
      <h2
        class="text-xl font-bold uppercase tracking-widest text-white sm:text-2xl"
      >
        {{ t("skills.techsTitle") }}
      </h2>
      <span
        class="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"
      ></span>
    </div>

    <div class="mt-6 flex flex-wrap gap-2.5">
      <span
        v-for="(tech, index) in technologies"
        :key="tech.name"
        v-reveal
        data-reveal="zoom"
        :data-delay="String(index * 70)"
        class="flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-sm font-medium text-slate-200 transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/10"
      >
        <img
          :src="tech.img"
          :alt="tech.name"
          loading="lazy"
          class="h-4 w-4 shrink-0 object-contain"
        />
        {{ tech.name }}
      </span>
    </div>
  </section>
</template>

<style scoped></style>