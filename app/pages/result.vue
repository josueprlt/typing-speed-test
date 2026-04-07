<template>
  <BaseHeader/>

  <section class="relative flex flex-col items-center gap-6 mt-17.5 md:mt-20 md:gap-8 xl:mt-16">
    <img class="absolute top-7 left-2 size-5.25 md:size-8" src="/icons/asterix.svg" alt="Asterix Icon">
    <img class="absolute -bottom-14 right-6 size-9.75 md:size-18.5" src="/icons/star.svg" alt="Star Icon">
    <div
        :class="result !== 'best' && 'size-12 rounded-full ring-10 ring-[#18281C] ring-offset-10 ring-offset-[#23492F] flex items-center justify-center'">
      <img :src="`/icons/${icons[result].url}`" :alt="icons[result].label"/>
    </div>

    <div class="flex flex-col items-center gap-2.5 mt-4">
      <h1 class="text-[24px] font-bold md:text-[40px]">{{ isStarted ? "--" : title[result] }}</h1>
      <p class="text-[#949497] text-[16px] text-center md:text-[18px] mt-2">{{
          isStarted ? "--" : sousTitle[result]
        }}</p>
    </div>

    <div class="flex flex-col justify-center items-center w-full gap-4 md:flex-row md:gap-5 md:mb-8 md:mt-5">
      <div class="flex flex-col w-full gap-3 px-6 py-4 rounded-[8px] border border-[#3A3A3A] max-w-87.5">
        <p class="text-[20px] text-[#949497]">WPM:</p>
        <p class="text-[24px] font-bold">{{ isStarted ? "--" : wpm }}</p>
      </div>
      <div class="flex flex-col w-full gap-3 px-6 py-4 rounded-[8px] border border-[#3A3A3A] max-w-87.5">
        <p class="text-[20px] text-[#949497]">Accuracy:</p>
        <p class="text-[24px] font-bold text-[#D64D5B]">{{ isStarted ? "--" : Math.trunc(accuracy) }}%</p>
      </div>
      <div class="flex flex-col w-full gap-3 px-6 py-4 rounded-[8px] border border-[#3A3A3A] max-w-87.5">
        <p class="text-[20px] text-[#949497]">Characters:</p>
        <p class="text-[24px] font-bold text-[#717178]"><span class="text-[#4DD67B]">{{
            isStarted ? "--" : correctStreak
          }}</span>/<span
            class="text-[#D64D5B]">{{ isStarted ? "--" : incorrectStreak }}</span></p>
      </div>
    </div>

    <BaseButton :name="buttonText[result]" icon="dark_retry" color="third" :clickFunction="() => navigateTo('/')"/>
  </section>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import generateParticle from "~/utils/generateParticle.js";
import {
  useWpm,
  useBestWpm,
  useAccuracy,
  useCorrectStreak,
  useIncorrectStreak,
  useIsStarted
} from "~/composables/useGameData.js";

let interval = null;
const result = ref('current');

const title = {
  'current': 'Test Complete!',
  'first': 'Baseline Established!',
  'best': 'High Score Smashed!'
}
const sousTitle = {
  'current': 'Solid run. Keep pushing to beat your high score.',
  'first': 'You’ve set the bar. Now the real challenge begins—time to beat it.',
  'best': 'You’re getting faster. That was incredible typing.'
}
const icons = {
  'current': {url: 'check_circle.svg', label: 'Check Circle Icon'},
  'first': {url: 'check_circle.svg', label: 'Check Circle Icon'},
  'best': {url: 'party.svg', label: 'Party Popper Icon'},
}
const buttonText = {
  'current': 'Go Again',
  'first': 'Beat This Score',
  'best': 'Beat This Score',
}

const isStarted = useIsStarted()
const wpm = useWpm()
const bestWpm = useBestWpm()
const accuracy = useAccuracy()
const correctStreak = useCorrectStreak();
const incorrectStreak = useIncorrectStreak();

onMounted(() => {
  if (isStarted.value) return;

  if (bestWpm.value) {
    if (wpm.value > bestWpm.value) {
      localStorage.setItem('bestWpm', wpm.value);
      result.value = 'best';
      bestWpm.value = wpm.value;
    } else {
      result.value = 'current';
    }
  } else {
    localStorage.setItem('bestWpm', wpm.value);
    result.value = 'first';
    bestWpm.value = wpm.value;
  }

  if (result.value === 'best' || result.value === 'first') {
    generateParticle(interval);
  }
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>