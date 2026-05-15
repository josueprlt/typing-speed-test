<template>
  <div class="flex flex-col justify-start gap-5 my-10 pb-10 border-b border-[#3A3A3A] md:flex-row md:justify-between md:items-end">
    <div>
      <h1 class="text-[24px] font-bold md:text-[40px]">Achievements</h1>
      <p class="text-[#949497] text-[16px] md:text-[18px]">Track your milestones and master your typing skills.</p>
    </div>
    <div class="flex items-center gap-2">
      <p class="text-[#949497] text-[14px] md:text-[16px]"><span class="font-bold">{{successUnlocked}}</span> / <span class="font-bold">{{successStorage.length}}</span></p>
      <img src="/icons/trophy.svg" alt="Trophy" />
    </div>
  </div>

  <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <BaseSuccessCard
        v-for="success in successStorage"
        :key="success.id"
        :title="success.title"
        :description="success.description"
        :theme="success.theme"
        :isUnlocked="success.isUnlocked"
        :currentScore="success.currentScore"
        :achieveScore="success.achieveScore"
        :currentScoreWpm="success.currentScoreWpm"
        :achieveScoreWpm="success.achieveScoreWpm"
        :currentScoreAccuracy="success.currentScoreAccuracy"
        :achieveScoreAccuracy="success.achieveScoreAccuracy"
    ></BaseSuccessCard>
  </section>

  <footer class="flex justify-center pt-10 mt-10 border-t border-[#3A3A3A]">
    <BaseButton name="Return to Test" color="primary" :clickFunction="() => resetGame('/')" icon="back"/>
  </footer>
</template>

<script setup>
import resetGame from "~/utils/resetGame.js";
import {onMounted, ref} from "vue";
import {useSuccessStorage} from "~/composables/useGameData.js";
import success from "~/data/success.json";

const successStorage = useSuccessStorage();
const successUnlocked = ref(0);

onMounted(() => {
  successStorage.value = localStorage.getItem('success') ? JSON.parse(localStorage.getItem('success')) : success;
  successUnlocked.value = successStorage.value.filter(success => success.isUnlocked).length;
})
</script>