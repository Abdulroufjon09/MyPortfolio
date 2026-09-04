<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";
import { t } from "@/i18n";
import project_1 from "@/assets/images/logo.jpg";
import project_2 from "@/assets/images/chocolate.svg";
import project_3 from "@/assets/images/marketplace.webp";

const projects = [
  {
    img: project_1,
    name: "Excellence School",
    descKey: "projects.p1.desc",
    tech: ["Vue.js", "Tailwind CSS"],
    link: "https://excellece-school.vercel.app/",
  },
  {
    img: project_3,
    name: "Market Place",
    descKey: "projects.p2.desc",
    tech: ["Vue.js", "JavaScript"],
    link: "https://chocolate-beta.vercel.app/",
  },
  {
    img: project_2,
    name: "Chocolate Page",
    descKey: "projects.p3.desc",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://chocolate-beta.vercel.app/",
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
        class="group overflow-hidden rounded-2xl border border-white/5 bg-[#0d1117] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
      >
        <a :href="project.link" target="_blank" rel="noopener noreferrer" class="block">
          <div class="relative aspect-[16/10] overflow-hidden bg-white/5">
            <img
              :src="project.img"
              :alt="project.name"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
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