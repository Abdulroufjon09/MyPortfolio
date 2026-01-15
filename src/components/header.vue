<script setup>
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div class="flex justify-between items-center px-8 pt-2">
    <div>
      <p class="text-blue-400 cursor-pointer transition-colors font-mono">
        My Portfolio
      </p>
    </div>
    <div>
      <ul class="flex items-center gap-2">
        <li>
          <a
            @click="scrollTo('home')"
            class="text-blue-300 hover:text-blue-400 hover:underline cursor-pointer transition-colors font-mono"
            >Home</a
          >
        </li>
        <li>
          <a
            @click="scrollTo('about')"
            class="text-blue-300 hover:text-blue-400 hover:underline cursor-pointer transition-colors font-mono"
            >About</a
          >
        </li>
        <li>
          <a
            @click="scrollTo('contact')"
            class="text-blue-300 hover:text-blue-400 hover:underline cursor-pointer transition-colors font-mono"
            >Contact</a
          >
        </li>
        <li>
          <a
            @click="scrollTo('projects')"
            class="text-blue-300 hover:text-blue-400 hover:underline cursor-pointer transition-colors font-mono"
            >My Projects</a
          >
        </li>
      </ul>
    </div>
  </div>

  <div class="flex justify-center bg-blue-50 w-full py-8">
    <div
      class="flex justify-center items-center gap-4 rounded p-8 bg-blue-100 shadow-2xl"
    >
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
          class="w-32 h-32"
        />
      </div>
      <div>
        <ul>
          <li class="font-mono font-bold text-blue-400">
            Hi, I'm
            <span class="text-blue-400 animate-pulse">Abdulroufjon</span>
          </li>
          <li class="font-mono font-bold text-blue-400">Frontend Developer</li>
          <hr class="w-full h-0.5 my-2 bg-gray-400 border-0 animate-bounce" />
          <li class="font-mono font-bold text-blue-400">
            I build responsive and reactive web applications
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>