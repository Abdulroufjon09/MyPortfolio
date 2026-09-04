<script setup lang="ts">
import { Github, Instagram, Mail, Send } from "lucide-vue-next";
import { t } from "@/i18n";

const contacts = [
  {
    label: "Telegram",
    value: "@Abdulroufjon1",
    href: "https://t.me/Abdulroufjon1",
    icon: Send,
  },
  {
    label: "Email",
    value: "abdulroufjonm0@gmail.com",
    href: "mailto:abdulroufjonm0@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "Abdulroufjon9",
    href: "https://github.com/Abdulroufjon9",
    icon: Github,
  },
  {
    label: "Instagram",
    value: "_Abdulroufjon_",
    href: "https://instagram.com/_Abdulroufjon_",
    icon: Instagram,
  },
];

const openInNewTab = (href: string) => href.startsWith("http");
</script>

<template>
  <section id="contact" class="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
    <div v-reveal class="flex items-center gap-3">
      <span class="font-mono text-sm font-semibold text-blue-500">07.</span>
      <h2
        class="text-xl font-bold uppercase tracking-widest text-white sm:text-2xl"
      >
        {{ t("contact.title") }}
      </h2>
      <span
        class="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"
      ></span>
    </div>

    <p v-reveal data-reveal="up" class="mt-4 text-[15px] text-slate-400">
      {{ t("contact.intro") }}
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <a
        v-for="(contact, index) in contacts"
        :key="contact.label"
        :href="contact.href"
        :target="openInNewTab(contact.href) ? '_blank' : undefined"
        :rel="openInNewTab(contact.href) ? 'noopener noreferrer' : undefined"
        v-reveal
        data-reveal="up"
        :data-delay="String(index * 100)"
        class="card-glass group flex flex-col items-start gap-4 rounded-2xl border border-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10"
      >
        <span
          class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-500/10"
        >
          <component
            :is="contact.icon"
            class="h-5 w-5 text-blue-500 transition-transform group-hover:scale-110"
          />
        </span>
        <span>
          <span
            class="block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-500/90"
          >
            {{ contact.label }}
          </span>
          <span
            class="mt-1 block break-all text-sm font-medium text-slate-200 transition-colors group-hover:text-white"
          >
            {{ contact.value }}
          </span>
        </span>
      </a>
    </div>
  </section>
</template>

<style scoped></style>