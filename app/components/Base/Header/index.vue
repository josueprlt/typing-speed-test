<template>
  <header class="flex justify-between">
    <div class="flex gap-2.5">
      <img src="/icons/logo.svg" alt="Logo" class="w-6.25 md:w-7.5"/>
      <NuxtLink to="/info" class="hidden md:block">
        <h1 class="text-[#ffffff] text-[28px] font-bold">Typing Speed Test</h1>
        <h2 class="text-[#949497] text-sm">Type as fast as you can in 60 seconds</h2>
      </NuxtLink>
    </div>
    <div class="flex gap-2.5 items-center">
      <img src="/icons/trophy.svg" alt="Trophy" class="w-4.5"/>
      <p class="text-[#949497] flex gap-1 text-[16px] md:text-[18px]"><span class="hidden md:block">Personal </span>Best:
        <span
            class="text-[#ffffff]">{{ bestWpm }} WPM</span></p>
    </div>
  </header>
</template>

<script setup>
import {onMounted} from 'vue'
import {useBestWpm} from '~/composables/useGameData'

const bestWpm = useBestWpm();

onMounted(() => {
  const data = localStorage.getItem('bestWpm')
  if (data) {
    bestWpm.value = data
  } else {
    bestWpm.value = 0
  }
})
</script>