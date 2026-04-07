<template>
  <footer class="flex justify-center mt-8 border border-[#3A3A3A]">
    <BaseButton name="Restart Test" color="primary" :clickFunction="() => resetGame()" icon="light_retry"/>
  </footer>
</template>

<script setup>
import resetGame from "~/utils/resetGame.js";
</script>