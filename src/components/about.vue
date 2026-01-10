<script setup>
import { Check } from "lucide";
</script>

<template>
  <div class="flex justify-center mt-2" id="about">
    <div class="w-3/6 flex flex-col justify-center gap-4 rounded p-8">
      <div>
        <p class="font-mono font-semibold text-2xl text-blue-950">About Me</p>
      </div>
      <hr
        class="w-full h-0.5 my-2 bg-gray-200 border-0 animate-pulse shadow-2xl"
      />
      <div class="flex justify-center text-center">
        <p>
          I'm a passiionate
          <span class="font-mono font-semibold">frontend developer</span> with
          experince building applications using HTML, CSS, JavaScript and Vue. I
          love creating interactive and use-friendly websites that make
          difference
        </p>
      </div>
      <div>
        <ul>
          <p class="font-mono font-semibold text-2xl text-blue-950">Skills</p>
        </ul>
        <hr class="w-full h-0.5 my-2 bg-gray-200 border-0 animate-pulse" />

        <div class="flex items-center justify-around gap-2">
          <img
            class="w-8 h-8"
            src="https://icons.iconarchive.com/icons/cornmanthe3rd/plex/512/Other-html-5-icon.png"
            alt=""
          />
          <img
            class="w-6 h-6"
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/css-icon.png"
            alt=""
          />
          <img
            class="w-8 h-8"
            src="https://static.vecteezy.com/system/resources/previews/027/127/463/non_2x/javascript-logo-javascript-icon-transparent-free-png.png"
            alt=""
          />
          <img
            class="w-8 h-8"
            src="https://images.icon-icons.com/2107/PNG/512/file_type_tailwind_icon_130128.png"
            alt=""
          />
          <img
            class="w-8 h-8"
            src="https://images.icon-icons.com/2108/PNG/512/vue_icon_130791.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>