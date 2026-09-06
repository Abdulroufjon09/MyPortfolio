<script setup lang="ts">
import { Candy, ExternalLink, GraduationCap, ShoppingCart } from "lucide-vue-next";
import { t } from "@/i18n";

const projects = [
  {
    name: "School Landing",
    descKey: "projects.p1.desc",
    tech: ["Vue.js", "Tailwind CSS"],
    link: "https://excellece-school.vercel.app/",
    icon: GraduationCap,
    accent: "#2dd4bf",
  },
  {
    name: "Market Place",
    descKey: "projects.p2.desc",
    tech: ["Vue.js", "JavaScript"],
    link: "",
    icon: ShoppingCart,
    accent: "#60a5fa",
  },
  {
    name: "Chocolate Page",
    descKey: "projects.p3.desc",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://chocolate-beta.vercel.app/",
    icon: Candy,
    accent: "#fb923c",
  },
];
</script>

<template>
  <section id="projects" class="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
    <div v-reveal class="flex items-center gap-3">
      <span class="font-mono text-sm font-semibold text-blue-500">06.</span>
      <h2
        class="text-xl font-bold uppercase tracking-widest text-white sm:text-2xl"
      >
        {{ t("projects.title") }}
      </h2>
      <span
        class="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"
      ></span>
    </div>

    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(project, index) in projects"
        :key="project.name"
        v-reveal
        data-reveal="up"
        :data-delay="String(index * 120)"
        class="card-glass group overflow-hidden rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
      >
        <a :href="project.link" target="_blank" rel="noopener noreferrer" class="block">
          <div
            class="relative aspect-[16/10] overflow-hidden"
            :style="{
              background: `radial-gradient(circle at 50% 38%, ${project.accent}1c, transparent 72%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`,
            }"
          >
            <!-- Dekorativ doiralar -->
            <div
              class="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-transform duration-500 group-hover:scale-110"
              :style="{ borderColor: `${project.accent}26` }"
            ></div>
            <div
              class="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 transition-transform duration-500 group-hover:scale-125"
            ></div>

            <!-- Loyihaga mos ikonka (dekorativ — o'quvchi uchun yashirin) -->
            <div
              aria-hidden="true"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div
                class="relative flex h-20 w-20 items-center justify-center rounded-2xl border bg-[#0b0f15]/70 backdrop-blur transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-110"
                :style="{
                  borderColor: `${project.accent}40`,
                  boxShadow: `0 0 46px -8px ${project.accent}66`,
                }"
              >
                <component
                  :is="project.icon"
                  class="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
                  :style="{ color: project.accent }"
                  :stroke-width="1.75"
                />
              </div>
            </div>

            <div
              class="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            ></div>
            <span
              class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b0f15]/80 text-blue-400 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100"
            >
              <ExternalLink class="h-4 w-4" />
            </span>
          </div>

          <div class="p-5">
            <h3
              class="text-lg font-bold text-white transition-colors group-hover:text-blue-400"
            >
              {{ project.name }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-400">
              {{ t(project.descKey) }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-300"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </a>
      </article>
    </div>
  </section>
</template>

<style scoped></style>