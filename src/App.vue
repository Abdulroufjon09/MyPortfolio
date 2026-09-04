<script setup lang="ts">
import Header from "./components/header.vue";
import Sidebar from "./components/sidebar.vue";
import About from "./components/about.vue";
import Experience from "./components/experience.vue";
import Skills from "./components/skills.vue";
import Projects from "./components/projects.vue";
import Contact from "./components/contact.vue";
import Footer from "./components/footer.vue";
</script>

<template>
  <div class="min-h-screen bg-[#0b0f15] font-sans text-slate-200 selection:bg-blue-500/30 selection:text-white">
    <!-- Yuqori chegara chizig'i -->
    <div class="animate-gradient h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"></div>

    <Header />

    <!-- CV layout: chap ustun (sidebar) + o'ng ustun (asosiy ma'lumotlar) -->
    <main id="home" class="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
      <div class="grid gap-10 py-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12 lg:py-14">
        <Sidebar />
        <div class="min-w-0 space-y-10 lg:space-y-14">
          <About />
          <Experience />
          <Skills />
        </div>
      </div>
    </main>

    <Projects />
    <Contact />
    <Footer />
  </div>
</template>

<style scoped></style>