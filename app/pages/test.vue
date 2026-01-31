<template>
  <div id="containerId" class="container overflow-hidden">
    <h1>Typing Speed Test</h1>
    <section id="sectionId" class="h-auto whitespace-pre-wrap text-[60px] text-white">
            <span v-for="(word, wIdx) in words" :key="`word-${wIdx}`" class="word">
                <span v-for="charObj in word" :key="`char-${charObj.id}`" :id="`char-${charObj.id}`" :class="[
                    index === charObj.id ? characterStyle.current : '',
                    charObj.status === 'correct' ? characterStyle.correct : '',
                    charObj.status === 'incorrect' ? characterStyle.incorrect : ''
                ]">

<!--                    <UTooltip v-if="charObj.status === 'incorrect'" :text="'You - ' + charObj.incorrectChar"
                              :delay-duration="0" arrow>
                        <span>{{ charObj.char }}</span>
                    </UTooltip>-->

                    <span>{{ charObj.char }}</span>

                </span>
            </span>
    </section>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';
import handleKeydown from "~/utils/handleKeydown.js";

const text = ref("");
const words = ref([]);
const index = ref(0);
const isLoading = ref(true);
const globalCharIndex = ref(0);
const startTime = ref(null);
const wpm = ref(0);

let generateScores = null;
let keydownWrapper = null;

const characterStyle = {
  correct: "text-green-500",
  incorrect: "text-red-500 underline",
  current: "animate-[cursorAnimation_0.5s_infinite_alternate] rounded-[2px]"
}

onMounted(async () => {

  generateScores = setInterval(() => {
    if (!startTime.value) return;

    let correctStreak = 0;
    let incorrectStreak = 0;

    for (const word of words.value) {
      for (const char of word) {
        if (char.status === "correct") {
          correctStreak++;
        } else if (char.status === "incorrect") {
          incorrectStreak++;
        }
      }
    }

    const WPM = calculateWPM(Date.now(), startTime, correctStreak);
    console.log(WPM);
    const accuracyPercentage = 100 * correctStreak / (correctStreak + incorrectStreak);
    console.log(accuracyPercentage ? Math.round(accuracyPercentage) + '%' : '0%');
    const timer = new Date() - new Date(startTime.value);
    console.log('Timer: ' + new Date(timer).getSeconds() + 's');

    console.log(correctStreak + '/' + incorrectStreak);
  }, 1000);


  isLoading.value = true;
  text.value = await getParagraph(1);
  words.value = generateJson(text.value, globalCharIndex);

  keydownWrapper = (event) => {
    handleKeydown(event, startTime, index, words);
  };
  window.addEventListener('keydown', keydownWrapper);

  watch(index, async () => {
    await automatiseScroll(index);
    await generateText(text, words, globalCharIndex);
  });
});

onUnmounted(() => {
  if (keydownWrapper) {
    window.removeEventListener('keydown', keydownWrapper);
  }
  clearInterval(generateScores);
});

</script>

<style>
@keyframes cursorAnimation {

  0% {
    background: #414141;
  }

  50% {
    background: #414141;
  }

  51% {
    background: #121212;
  }

  100% {
    background: #121212;
  }
}
</style>