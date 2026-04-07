<template>
  <div class="flex flex-nowrap justify-between gap-2.5 md:hidden">
    <BaseSelect v-model="selectedDifficult" :options="difficultOptions" @update:modelValue="onDifficultChange"/>
    <BaseSelect v-model="selectedMode" :options="modeOptions" @update:modelValue="onModeChange"/>
  </div>
  <div class="hidden md:flex md:gap-4">
    <div class="flex items-center gap-3">
      <p class="text-[16px] text-[#949497]">Difficulty:</p>
      <div class="flex items-center gap-1.5">
        <BaseRadio v-model="selectedDifficultRadio" :options="difficultOptions" @update:modelValue="onDifficultChange"/>
      </div>
    </div>
    <span class="border border-l border-[#3A3A3A] inline-block height-full"></span>
    <div class="flex items-center gap-3">
      <p class="text-[16px] text-[#949497]">Mode:</p>
      <div class="flex items-center gap-1.5">
        <BaseRadio v-model="selectedModeRadio" :options="modeOptions" @update:modelValue="onModeChange"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useGamemode, useDifficulty, useIsStarted, useWpm, useAccuracy} from "~/composables/useGameData.js";
import resetGame from "~/utils/resetGame.js";

const difficultOptions = [
  {id: 1, label: 'Easy'},
  {id: 2, label: 'Medium'},
  {id: 3, label: 'Hard'}
]
const modeOptions = [
  {id: 1, label: 'Timed (60s)'},
  {id: 2, label: 'Sandbox'}
]

const gamemode = useGamemode();
const difficulty = useDifficulty();
const isStarted = useIsStarted();
const wpm = useWpm();
const accuracy = useAccuracy();

const selectedDifficult = ref(difficultOptions.find(d => d.label === difficulty.value) || difficultOptions[0]);
const selectedMode = ref(modeOptions.find(m => m.label === gamemode.value) || modeOptions[0]);

const selectedDifficultRadio = ref(difficultOptions.find(d => d.label === difficulty.value) || difficultOptions[0]);
const selectedModeRadio = ref(modeOptions.find(m => m.label === gamemode.value) || modeOptions[0]);

function onDifficultChange(option) {
  resetGame();
  difficulty.value = option.label;
  selectedDifficult.value = option;
  selectedDifficultRadio.value = option;
}

function onModeChange(option) {
  resetGame();
  gamemode.value = option.label;
  selectedMode.value = option;
  selectedModeRadio.value = option;
}
</script>