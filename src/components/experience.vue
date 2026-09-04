<script setup lang="ts">
import { FolderGit2 } from "lucide-vue-next";
import { t } from "@/i18n";

const projectTech = ["Python", "Django", "Vue.js", "Telegram Bot"];
</script>

<template>
  <section
    id="experience"
    v-reveal
    class="scroll-mt-24 rounded-2xl border border-white/5 bg-[#0d1117] p-6 sm:p-8"
  >
    <!-- Sarlavha -->
    <div class="flex items-center gap-3">
      <span class="font-mono text-sm font-semibold text-blue-500">02.</span>
      <h2
        class="text-xl font-bold uppercase tracking-widest text-white sm:text-2xl"
      >
        {{ t("exp.title") }}
      </h2>
      <span
        class="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"
      ></span>
    </div>

    <!-- ITLINE -->
    <div class="relative mt-7 border-l border-white/10 pl-6">
      <span
        class="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20"
      ></span>

      <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 class="text-lg font-bold text-white">ITLINE</h3>
        <span class="flex items-center gap-2 font-mono text-sm">
          <span class="text-slate-300">{{ t("exp.role") }}</span>
          <span class="text-blue-500">•</span>
          <span class="font-semibold text-blue-500">{{ t("exp.duration") }}</span>
        </span>
      </div>

      <p class="mt-3 text-[15px] leading-relaxed text-slate-300">
        {{ t("exp.text") }}
      </p>
    </div>

    <!-- Asosiy loyiha -->
    <div v-reveal data-reveal="up" class="mt-10 flex items-center gap-3">
      <span class="font-mono text-sm font-semibold text-blue-500">03.</span>
      <h2
        class="text-xl font-bold uppercase tracking-widest text-white sm:text-2xl"
      >
        {{ t("exp.projectTitle") }}
      </h2>
      <span
        class="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"
      ></span>
    </div>

    <div
      v-reveal
      data-reveal="up"
      data-delay="120"
      class="group mt-6 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.07] to-transparent p-5 transition-colors hover:border-blue-500/40 sm:p-6"
    >
      <div class="flex items-center gap-3">
        <span
          class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 transition-colors group-hover:bg-blue-500/20"
        >
          <FolderGit2 class="h-5 w-5 text-blue-500" />
        </span>
        <h3 class="text-lg font-bold text-white">
          {{ t("exp.projectName") }}
        </h3>
      </div>

      <p class="mt-4 text-[15px] leading-relaxed text-slate-300">
        {{ t("exp.projectText") }}
      </p>

      <div class="mt-5 flex flex-wrap gap-2">
        <span
          v-for="tech in projectTech"
          :key="tech"
          class="rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 font-mono text-xs font-medium text-blue-400"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped></style>