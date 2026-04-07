<template>
  <div class="flex justify-around md:justify-start md:gap-6">
    <div class="flex flex-col items-center gap-2 md:flex-row md:gap-3">
      <p class="text-[#949497] text-[16px] md:text-[20px]">WPM:</p>
      <p class="text-[24px] font-bold">{{ wpm }}</p>
    </div>
    <span class="border border-l border-[#3A3A3A] inline-block height-full"></span>
    <div class="flex flex-col items-center gap-2 md:flex-row md:gap-3">
      <p class="text-[#949497] text-[16px] md:text-[20px]">Accuracy:</p>
      <p class="text-[24px] font-bold"
         :class="isStarted && (accuracy < 95 ? 'text-[#D64D5B]' : 'text-white')">
        {{ Math.trunc(accuracy) ? Math.trunc(accuracy) : '100' }}%</p>
    </div>
    <span class="border border-l border-[#3A3A3A] inline-block height-full"></span>
    <div class="flex flex-col items-center gap-2 md:flex-row md:gap-3">
      <p class="text-[#949497] text-[16px] md:text-[20px]">Time:</p>
      <p v-if="gamemode === 'Timed (60s)'" class="text-[24px] font-bold"
         :class="seconds >= 50 ? 'text-[#D64D5B]' : seconds >= 40 ? 'text-[#F4DC73]' : 'text-white'">{{
          displayTime
        }}</p>
      <p v-if="gamemode === 'Sandbox'" class="text-[24px] font-bold">∞</p>
    </div>
  </div>
</template>

<script setup>
import {useWpm, useAccuracy, useIsStarted, useGamemode} from "~/composables/useGameData.js";

const wpm = useWpm();
const accuracy = useAccuracy();
const gamemode = useGamemode();
const timer = useState('timer');
const isStarted = useIsStarted();

const seconds = ref(0);

const displayTime = computed(() => {
  if (!timer.value || timer.value < 0) return '00:00';

  const totalSeconds = Math.floor(timer.value / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');

  return `${displayMinutes}:${displaySeconds}`;
});

watch(timer, () => {
  if (!timer.value) return;
  seconds.value = new Date(timer.value).getSeconds()
})
</script>