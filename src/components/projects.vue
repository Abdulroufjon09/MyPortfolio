<script setup>
import { reactive } from "vue";
import project_1 from "@/assets/images/logo.jpg";

let projects = reactive([
  {
    img: project_1,
    name: "Online Register for Excellence School",
    link: "https://excellece-school.vercel.app/",
  },
  {
    img: project_1,
    name: "Online Register for Excellence School",
    link: "https://excellece-school.vercel.app/",
  },
  {
    img: project_1,
    name: "Online Register for Excellence School",
    link: "https://excellece-school.vercel.app/",
  },
]);
</script>

<template>
  <div
    class="flex justify-center bg-blue-50 w-full py-8 font-mono"
    id="projects"
  >
    <div class="w-3/6 flex flex-col justify-center gap-4 rounded p-8">
      <div class="">
        <p class="font-mono font-semibold text-2xl text-blue-950 animate-bounce">Projects</p>
      </div>
      <div class="grid grid-cols-3 gap-12">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="flex flex-col items-center rounded-2xl cursor-pointer hover:shadow-2xl transition-shadow"
        >
          <a :href="project.link" target="_blank">
            <img :src="project.img" alt="" class="w-full rounded-2xl" />
            <p class="mt-2 text-center font-medium">
              {{ project.name }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>