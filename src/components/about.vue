<script setup lang="ts">
import { Sparkles } from "lucide-vue-next";
import { t } from "@/i18n";

const highlightKeys = ["about.hl1", "about.hl2", "about.hl3"] as const;
</script>

<template>
  <section
    id="about"
    v-reveal
    class="card-glass scroll-mt-24 rounded-2xl border border-white/5 p-6 sm:p-8"
  >
    <!-- Sarlavha -->
    <div class="flex items-center gap-3">
      <span class="font-mono text-sm font-semibold text-blue-500">01.</span>
      <h2
        class="text-xl font-bold uppercase tracking-widest text-white sm:text-2xl"
      >
        {{ t("about.title") }}
      </h2>
      <span
        class="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"
      ></span>
    </div>

    <p
      class="mt-6 border-l-2 border-blue-500/60 pl-4 text-[15px] leading-relaxed text-slate-300"
    >
      {{ t("about.text") }}
    </p>

    <ul class="mt-6 grid gap-3 sm:grid-cols-3">
      <li
        v-for="(key, index) in highlightKeys"
        :key="key"
        v-reveal
        data-reveal="up"
        :data-delay="String(150 + index * 100)"
        class="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition-colors hover:border-blue-500/30"
      >
        <Sparkles class="h-4 w-4 shrink-0 text-blue-500" />
        {{ t(key) }}
      </li>
    </ul>
  </section>
</template>

<style scoped></style>