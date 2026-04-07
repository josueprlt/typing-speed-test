<template>
  <div class="container">
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
import {
  useWpm,
  useAccuracy,
  useIsStarted,
  useCorrectStreak,
  useIncorrectStreak,
  useGamemode, useText, useWords, useIndex, useGlobalCharIndex
} from "~/composables/useGameData.js";

const wpm = useWpm()
const accuracy = useAccuracy();
const correctStreak = useCorrectStreak();
const incorrectStreak = useIncorrectStreak();
const isStarted = useIsStarted();
const gamemode = useGamemode();
const timer = useState('timer');
const isLoading = useState('isLoading');

const text = useText();
const words = useWords();
const index = useIndex();
const globalCharIndex = useGlobalCharIndex();

const startTime = ref(null);
const endTime = ref(null);

let generateScores = null;
let keydownWrapper = null;

const characterStyle = {
  correct: "text-green-500",
  incorrect: "text-red-500 underline",
  current: "animate-[cursorAnimation_0.5s_infinite_alternate] rounded-[2px]"
}

onMounted(async () => {
  wpm.value = 0
  accuracy.value = 100
  correctStreak.value = 0
  incorrectStreak.value = 0
  timer.value = 0

  isLoading.value = true;
  generateScores = setInterval(() => {
    if (!startTime.value || !isStarted.value) return;

    let localCorrect = 0;
    let localIncorrect = 0;

    for (const word of words.value) {
      for (const char of word) {
        if (char.status === 'correct') {
          localCorrect++;
        } else if (char.status === 'incorrect') {
          localIncorrect++;
        }
      }
    }

    correctStreak.value = localCorrect;
    incorrectStreak.value = localIncorrect;

    wpm.value = calculateWPM(Date.now(), startTime, correctStreak.value);
    if ((correctStreak.value + incorrectStreak.value) === 0) {
      accuracy.value = 100;
    } else {
      accuracy.value = 100 * correctStreak.value / (correctStreak.value + incorrectStreak.value);
    }

    // Timer
    console.log("gamemode.value : " + gamemode.value)
    if (gamemode.value === 'Timed (60s)') {
      timer.value = new Date() - new Date(startTime.value);

      endTime.value = 1;
      if (new Date(timer.value).getMinutes() >= endTime.value) {
        isStarted.value = false;
        navigateTo('/result');
      }
    }
  }, 1000);

  for (let i = 1; i <= 2; i++) {
    await generateText(text, words, globalCharIndex);
  }

  keydownWrapper = (event) => {
    handleKeydown(event, startTime, index, words);
  };

  window.addEventListener('keydown', keydownWrapper);

  watch(index, async () => {
    await automatiseScroll(index);
    await generateText(text, words, globalCharIndex, index);
  });
  
  isLoading.value = false;
  document.querySelector('#sectionId').addEventListener('click', () => isStarted.value = true);
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
