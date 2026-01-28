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

                    <UTooltip v-if="charObj.status === 'incorrect'" :text="'You - ' + charObj.incorrectChar"
                        :delay-duration="0" arrow>
                        <span>{{ charObj.char }}</span>
                    </UTooltip>

                    <span v-else>{{ charObj.char }}</span>

                </span>
            </span>
        </section>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';

const characterStyle = {
    correct: "text-green-500",
    incorrect: "text-red-500 underline",
    current: "animate-[cursorAnimation_0.5s_infinite_alternate] rounded-[2px]"
}


const text = ref("");
const words = ref([]);
const index = ref(0);
const isLoading = ref(true);

async function fetchParagraph() {
    try {
        const data = await $fetch('http://metaphorpsum.com/paragraphs/1', {
            parseResponse: (txt) => txt
        });
        return data + ' ';
    } catch (e) {
        console.error("API Error, fallback used");
        return "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do.";
    }
}

function generateJson(paragraph) {
    let globalCharIndex = 0;
    const wordStrings = paragraph.split(' ');

    return wordStrings.map((wordStr, wIdx) => {
        const chars = wordStr.split('').map(char => ({
            char: char,
            id: globalCharIndex++,
            status: null,
            incorrectChar: null
        }));

        if (wIdx < wordStrings.length - 1) {
            chars.push({ char: ' ', id: globalCharIndex++, status: null });
        }
        return chars;
    });
}

let interval = null;
let correctStreak = 0;
let incorrectStreak = 0;



onMounted(async () => {
    interval = setInterval(() => {
        correctStreak = 0;
        incorrectStreak = 0;
        for (const word of words.value) {
            for (const char of word) {
                if (char.status === "correct") {
                    correctStreak++;
                }
                else if (char.status === "incorrect") {
                    incorrectStreak++;
                }
            }
        }

        const pourcentageCalcul = 100 * correctStreak / (correctStreak + incorrectStreak);
        // console.log(pourcentageCalcul ? pourcentageCalcul + '%' : '0%');
        // console.log(correctStreak + '/' + incorrectStreak);
    }, 1000);


    // Remplace ton bloc test2 = setInterval(...) par ce watch :
    watch(index, async () => {
        // On attend que Vue mette à jour le DOM (pour que le curseur soit à la bonne place)
        await nextTick();

        const parentElt = document.querySelector('#sectionId');
        const actualCarac = document.querySelector(`#char-${index.value}`);

        if (!actualCarac || !parentElt) return;

        // Utilisation de scrollIntoView : c'est BEAUCOUP plus simple
        // block: 'center' force le caractère à rester au milieu du parent
        actualCarac.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
        });
    });

    watch(index, async () => {
        await nextTick();

        const containerElt = document.querySelector('#containerId');
        const parentElt = document.querySelector('#sectionId');

        if (!containerElt || !parentElt) return;

        const containerRect = containerElt.getBoundingClientRect();
        const parentRect = parentElt.getBoundingClientRect();

        if (parentRect.bottom <= containerRect.bottom) {
            const paragraph = await fetchParagraph();
            console.log(paragraph);
            const wordsArray = generateJson(paragraph);
            console.log(wordsArray);
            words.value = words.value.concat(wordsArray);
            console.log(words.value);
        }
    });

    isLoading.value = true;
    text.value = await fetchParagraph();
    words.value = generateJson(text.value);
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    clearInterval(interval);
});

function handleKeydown(event) {
    const key = event.key;
    // console.log(`Key pressed: ${key}`);

    if (key === 'Shift' || key === 'CapsLock' || key === 'Tab' || key === 'Alt' || key === 'Control' || key === 'Meta' || key === 'Dead' || key === 'Escape' || key === 'AltGraph') {
        return;
    }
    const flatChars = words.value.flat();
    const currentChar = flatChars[index.value];

    if (!currentChar) return;

    if (key === text.value[index.value]) {
        // console.log(`✅ Matched character: ${text.value[index.value]} at index ${index.value}`);
        currentChar.status = 'correct';
    } else {
        console.log(`💥 Mismatched character: expected ${text.value[index.value]}, got ${key}`);
        currentChar.status = 'incorrect';
        currentChar.incorrectChar = (key === ' ') ? '␣' : key;
    }

    index.value++;
}
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