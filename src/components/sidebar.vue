<script setup lang="ts">
import { Github, Mail, MapPin, Phone, Send } from "lucide-vue-next";
import { t } from "@/i18n";

interface ContactRow {
  labelKey?: string;
  label?: string;
  value: string;
  href: string;
  icon: typeof Phone;
}

const contacts: ContactRow[] = [
  {
    label: "Email",
    value: "abdulroufjonm0@gmail.com",
    href: "mailto:abdulroufjonm0@gmail.com",
    icon: Mail,
  },
  {
    labelKey: "side.manzil",
    value: "Qo'qon, Farg'ona, O'zbekiston",
    href: "https://maps.google.com/?q=Qo'qon, Farg'ona, O'zbekiston",
    icon: MapPin,
  },
  {
    label: "Telegram",
    value: "@Abdulroufjon1",
    href: "https://t.me/Abdulroufjon1",
    icon: Send,
  },
  {
    label: "GitHub",
    value: "Abdulroufjon9",
    href: "https://github.com/Abdulroufjon9",
    icon: Github,
  },
];

// Only http(s) links should open a new tab; tel:/mailto: stay in place.
const openInNewTab = (href: string) => href.startsWith("http");

const directionKeys = ["dir1", "dir2", "dir3", "dir4"] as const;
</script>

<template>
  <aside class="self-start lg:sticky lg:top-24">
    <div
      v-reveal
      class="card-glass overflow-hidden rounded-2xl border border-white/5 shadow-2xl shadow-black/40"
    >
      <!-- Profil -->
      <div class="flex flex-col items-center px-6 pb-7 pt-10 text-center">
        <div class="relative">
          <div
            class="absolute -inset-1.5 animate-pulse rounded-full bg-gradient-to-tr  from-blue-600 via-cyan-400 to-blue-600 opacity-70 blur-md"
          ></div>
          <!-- O'z rasmingizni shu yerga qo'ying -->
          <img
            src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
            alt="Abdulroufjon Moydinov"
            class="relative h-32 w-32 object-cover "
          />
        </div>

        <h1 class="mt-6 text-2xl font-extrabold tracking-wider text-white">
          ABDULROUFJON
        </h1>
        <h2 class="text-2xl font-extrabold tracking-wider text-blue-500">
          MO'YDINOV
        </h2>
        <p
          class="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-300"
        >
          {{ t("role") }}
        </p>

        <div
          class="mt-7 h-px w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
        ></div>
      </div>

      <!-- ALOQA -->
      <div class="px-6 pb-2">
        <h3
          class="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] text-white"
        >
          <span class="h-4 w-1 rounded-full bg-blue-500"></span>
          {{ t("side.contact") }}
        </h3>

        <ul class="mt-5 space-y-4">
          <li v-for="contact in contacts" :key="contact.href">
            <a
              :href="contact.href"
              :target="openInNewTab(contact.href) ? '_blank' : undefined"
              :rel="openInNewTab(contact.href) ? 'noopener noreferrer' : undefined"
              class="group flex items-start gap-3"
            >
              <span
                class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-500/10"
              >
                <component
                  :is="contact.icon"
                  class="h-4 w-4 text-blue-500 transition-transform group-hover:scale-110"
                />
              </span>
      <span class="min-w-0">
        <span
          class="block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-500/90"
        >
          {{ contact.labelKey ? t(contact.labelKey) : contact.label }}
        </span>
                <span
                  class="block truncate text-sm text-slate-200 transition-colors group-hover:text-white"
                >
                  {{ contact.value }}
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <!-- YO'NALISH -->
      <div class="border-t border-white/5 px-6 py-6">
        <h3
          class="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] text-white"
        >
          <span class="h-4 w-1 rounded-full bg-blue-500"></span>
          {{ t("side.direction") }}
        </h3>

        <ul class="mt-5 space-y-3">
          <li
            v-for="key in directionKeys"
            :key="key"
            class="flex items-center gap-3 text-sm text-slate-300"
          >
            <span
              class="h-1.5 w-1.5 shrink-0 rotate-45 rounded-[2px] bg-blue-500"
            ></span>
            {{ t(key) }}
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style scoped></style>