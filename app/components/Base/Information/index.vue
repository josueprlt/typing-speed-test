<template>
  <div class="flex justify-around md:justify-start md:gap-6">
    <div class="flex flex-col items-center gap-2 md:flex-row md:gap-3">
      <p class="text-[#949497] text-[16px] md:text-[20px]">WPM:</p>
      <p class="text-[24px] font-bold">{{ wpm }}</p>
    </div>
    <span class="border border-l border-[#3A3A3A] inline-block height-full"></span>
    <div class="flex flex-col items-center gap-2 md:flex-row md:gap-3">
      <p class="text-[#949497] text-[16px] md:text-[20px]">Accuracy:</p>
      <p class="text-[24px] font-bold">{{ Math.trunc(accuracy) }}%</p>
    </div>
    <span class="border border-l border-[#3A3A3A] inline-block height-full"></span>
    <div class="flex flex-col items-center gap-2 md:flex-row md:gap-3">
      <p class="text-[#949497] text-[16px] md:text-[20px]">Time:</p>
      <p class="text-[24px] font-bold">{{ displayTime }}</p>
    </div>
  </div>
</template>

<script setup>
const wpm = useState('wpm');
const accuracy = useState('accuracy');
const timer = useState('timer');

const displayTime = computed(() => {
  if (!timer.value || timer.value < 0) return '00:00';

  const totalSeconds = Math.floor(timer.value / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');

  return `${displayMinutes}:${displaySeconds}`;
});
</script>