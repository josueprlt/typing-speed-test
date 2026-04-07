<template>
  <div class="flex flex-col h-screen max-h-screen overflow-y-hidden px-4 md:px-8">
    <p>Information</p>
  </div>
</template>

<script setup>
import {useWpm, useAccuracy, useIsStarted} from "~/composables/useGameData.js";

const wpm = useWpm();
const accuracy = useAccuracy();
const isStarted = useIsStarted();
const timer = useState('timer', () => 0);
const isLoading = useState('isLoading', () => true);
</script>