<script setup>
import { reactive } from "vue";

let contacts = reactive([
  {
    name: "@Abdulroufjon1",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/512px-Telegram_2019_Logo.svg.png",
  },
  {
    name: "abdulroufjon726@gmail.com",
    img: "https://images.icon-icons.com/2642/PNG/512/google_mail_gmail_logo_icon_159346.png",
  },
  {
    name: "_Abdulroufjon_",
    img: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
  },
]);
</script>

<template>
  <div class="flex justify-center w-full py-8" id="contact">
    <div class="w-3/6 flex flex-col justify-center gap-4 rounded p-8">
      <div class="">
        <p class="font-mono font-semibold text-2xl text-blue-950 animate-bounce">
          Get In Touch
        </p>
      </div>
      <hr
        class="w-full h-0.5 my-2 bg-gray-200 border-0 animate-pulse shadow-2xl"
      />
      <div class="">
        <p class="font-mono text-blue-400">
          Feel free to contact me for any opportunities or questions
        </p>
      </div>
      <div class="flex items-center border-l-2 border-gray-200 mt-10">
        <div
          v-for="contact in contacts"
          :key="contact.id"
          class="flex flex-col items-center border-r-2 border-gray-200 p-2 w-7/10  "
        >
          <img
            :src="contact.img"
            :alt="contact.name"
            class="w-8 h-8 animate-pulse"
            loading="lazy"
          />
          <a :href="contact.link" target="_blank" class="cursor-pointer">
            {{ contact.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>