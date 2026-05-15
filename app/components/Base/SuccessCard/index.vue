<script setup>
import calculateCrossProduct from "~/utils/calculateCrossProduct.js";

defineProps({
  title: {type: String, required: true},
  description: {type: String, required: true},
  theme: {type: String, required: true},
  isUnlocked: {type: String, required: true},
  currentScore: {type: String, required: false},
  achieveScore: {type: String, required: false},
  currentScoreWpm: {type: String, required: false},
  achieveScoreWpm: {type: String, required: false},
  currentScoreAccuracy: {type: String, required: false},
  achieveScoreAccuracy: {type: String, required: false},
  clickFunction: {type: Function, required: false, default: null},
})

const icons = {
  'wpm': {source: 'tachometer.svg', label: 'Tachometer Icon'},
  'accuracy': {source: 'target.svg', label: 'Target Icon'},
  'wpm-accuracy': {source: 'hexagon.svg', label: 'Hexagon Icon'},
  'timer': {source: 'hourglass.svg', label: 'Hourglass Icon'}
}
</script>

<template>
  <article class="relative flex items-start gap-4 rounded-lg p-4 bg-[#171717] overflow-hidden border"
           :class="isUnlocked ? 'border-green-500 before:absolute before:w-1/4 before:h-full before:top-0 before:right-0 before:z-0 before:bg-linear-to-l before:from-[#1E2B22] before:to-[#171717]' : 'border-[#262626]'">
    <section>
      <div class="w-12 h-12 flex items-center justify-center rounded-full"
           :class="isUnlocked ? 'bg-[#1E2B22]' : 'bg-[#262626]'">
        <img :src="'/icons/' + (isUnlocked ? 'green_' + icons[theme].source : icons[theme].source)"
             :alt="isUnlocked ? 'Green ' + icons[theme].label : icons[theme].label">
      </div>
    </section>
    <section class="w-full h-full flex flex-col justify-between gap-4 z-10">
      <div>
        <h2 class="text-[18px] font-bold md:text-[20px]">{{ title }}</h2>
        <p class="text-[#949497] text-[14px] md:text-[16px]">{{ description }}</p>
      </div>
      <span v-if="isUnlocked" class="w-min px-2 py-1 bg-[#1E2B22] text-green-500 rounded-sm">Unlocked</span>

      <div v-else-if="theme === 'wpm-accuracy'" class="w-full flex items-center gap-4">
        <div class="flex-1 flex items-center gap-1">
          <div class="w-full h-2 rounded-full bg-[#262626]">
            <div class="h-2 rounded-full bg-green-500"
                 :style="'width:' + calculateCrossProduct(currentScoreWpm, achieveScoreWpm) + '%;'"></div>
          </div>
          <span class="text-[#949497] text-[12px] md:text-[14px]">{{currentScoreWpm}}/{{achieveScoreWpm}}</span>
        </div>
        <div class="flex-1 flex items-center gap-1">
          <div class="w-full h-2 rounded-full bg-[#262626]">
            <div class="h-2 rounded-full bg-green-500"
                 :style="'width:' + calculateCrossProduct(currentScoreAccuracy, achieveScoreAccuracy) + '%;'"></div>
          </div>
          <span class="text-[#949497] text-[12px] md:text-[14px]">{{Math.trunc(currentScoreAccuracy)}}%</span>
        </div>
      </div>

      <div v-else class="flex items-center gap-2">
        <div class="w-full h-2 rounded-full bg-[#262626]">
          <div class="h-2 rounded-full bg-green-500"
               :style="'width:' + calculateCrossProduct(currentScore, achieveScore) + '%;'"></div>
        </div>
        <span v-if="theme === 'wpm'" class="text-[#949497] text-[12px] md:text-[14px]">{{
            currentScore
          }}/{{ achieveScore }}</span>
        <span v-if="theme === 'accuracy'" class="text-[#949497] text-[12px] md:text-[14px]">{{
            Math.trunc(currentScore)
          }}%</span>
        <span v-if="theme === 'timer'" class="text-[#949497] text-[12px] md:text-[14px]">{{
            calculateCrossProduct(currentScore, achieveScore)
          }}%</span>
      </div>
    </section>
  </article>
</template>