<script setup lang="ts">
import { ArrowUp } from "lucide-vue-next";
import { t } from "@/i18n";

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <footer class="card-glass border-t border-white/5">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8"
    >
      <p class="text-center text-sm text-slate-400">
        © {{ new Date().getFullYear() }}
        <span class="font-semibold text-slate-200">Abdulroufjon Moydinov</span>
        — {{ t("role") }}
      </p>

      <button
        @click="scrollTop"
        class="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-xs font-medium text-slate-300 transition-all hover:border-blue-500/50 hover:text-blue-400"
      >
        {{ t("footer.top") }}
        <ArrowUp
          class="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5"
        />
      </button>
    </div>
  </footer>
</template>

<style scoped></style>