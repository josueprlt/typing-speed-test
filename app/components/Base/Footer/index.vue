<template>
  <footer class="flex justify-center pt-4 mt-4" :class="{ 'border-t border-[#3A3A3A]': isStarted }">
    <BaseButton v-if="isStarted" name="Restart Test" color="primary" :clickFunction="() => resetGame()" icon="light_retry" :is-loading="isLoading"/>
  </footer>
</template>

<script setup>
import resetGame from "~/utils/resetGame.js";
import {useIsStarted, useIsLoading} from "~/composables/useGameData.js";

const isStarted = useIsStarted();
const isLoading = useIsLoading();
</script>