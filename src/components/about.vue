<script setup>
import { Check } from "lucide";
import { reactive } from "vue";
let images = reactive([
  {
    img_url:
      "https://icons.iconarchive.com/icons/cornmanthe3rd/plex/512/Other-html-5-icon.png",
  },
  {
    img_url:
      "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
  },
  {
    img_url:
      "https://static.vecteezy.com/system/resources/previews/027/127/463/non_2x/javascript-logo-javascript-icon-transparent-free-png.png",
  },
  {
    img_url:
      "https://images.icon-icons.com/2107/PNG/512/file_type_tailwind_icon_130128.png",
  },
  { img_url: "https://images.icon-icons.com/2108/PNG/512/vue_icon_130791.png" },
]);
</script>

<template>
  <div class="flex justify-center mt-2" id="about">
    <div class="w-3/6 flex flex-col justify-center gap-4 rounded p-8">
      <div>
        <p
          class="font-mono font-semibold text-2xl text-blue-950 animate-bounce"
        >
          About Me
        </p>
      </div>
      <hr
        class="w-full h-0.5 my-2 bg-gray-200 border-0 animate-pulse shadow-2xl"
      />
      <div class="flex justify-center text-center">
        <p>
          I'm a passiionate
          <span class="font-mono font-semibold animate-pulse"
            >frontend developer</span
          >
          with experince building applications using HTML, CSS, JavaScript and
          Vue. I love creating interactive and use-friendly websites that make
          difference
        </p>
      </div>
      <div>
        <ul>
          <p
            class="font-mono font-semibold text-2xl text-blue-950 animate-bounce"
          >
            Skills
          </p>
        </ul>
        <hr class="w-full h-0.5 my-2 bg-gray-200 border-0 animate-pulse" />

        <div class="flex items-center justify-around gap-2">
          <span v-for="(img_url, index) in images" :key="index">
            <img :src="img_url.img_url" alt="" class="w-8" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>