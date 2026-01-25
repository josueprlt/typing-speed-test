<template>
    <div class="container">
        <h1>Typing Speed Test</h1>
        <section class="flex flex-wrap whitespace-pre-wrap text-[24px]">
            <span v-for="(word, wIdx) in words" :key="`word-${wIdx}`" class="word">
                <span v-for="charObj in word" :key="`char-${charObj.id}`" :id="`char-${charObj.id}`" :class="[
                    index === charObj.id ? characterStyle.current : '',
                    charObj.status === 'correct' ? characterStyle.correct : '',
                    charObj.status === 'incorrect' ? characterStyle.incorrect : ''
                ]">
                    {{ charObj.char }}
                </span>
            </span>
        </section>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const text = ref("J'aime le chocolat, et vous ? Je suis fan des gâteaux, des meringues, des éclairs au chocolat. Je suis un grand gourmand.");
const words = ref([]);
let index = ref(0);

const characterStyle = {
    correct: "text-green-500",
    incorrect: "text-red-500 underline",
    current: "animate-[cursorAnimation_0.5s_infinite_alternate] rounded-[2px]"
}

async function generateParagraphs() {
    let para = "";
    try {
        for (let i = 0; i < 5; i++) {
            const data = await $fetch('https://api.adviceslip.com/advice');
            const response = await JSON.parse(data);
            para += response.slip.advice + " ";
        }
        return para.trim();
    } catch (error) {
        console.error('Error fetching paragraphs:', error);
        return "";
    }
}

function generateJson(paragraph) {
    let globalCharIndex = 0;
    const wordStrings = paragraph.split(' ');

    return wordStrings.map((wordStr, wIdx) => {
        const chars = wordStr.split('').map(char => ({
            char: char,
            id: globalCharIndex++,
            status: null
        }));

        if (wIdx < wordStrings.length - 1) {
            chars.push({ char: ' ', id: globalCharIndex++, status: null });
        }
        return chars;
    });
}


onMounted(async () => {
    // text.value = await generateParagraphs();
    words.value = generateJson(text.value);
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});

function handleKeydown(event) {
    const key = event.key;
    console.log(`Key pressed: ${key}`);

    if (key === 'Shift' || key === 'CapsLock' || key === 'Tab' || key === 'Alt' || key === 'Control' || key === 'Meta' || key === 'Dead' || key === 'Escape' || key === 'AltGraph') {
        return;
    }
    const flatChars = words.value.flat();
    const currentChar = flatChars[index.value];

    if (!currentChar) return;

    if (key === text.value[index.value]) {
        console.log(`✅ Matched character: ${text.value[index.value]} at index ${index.value}`);
        currentChar.status = 'correct';
    } else {
        console.log(`💥 Mismatched character: expected ${text.value[index.value]}, got ${key}`);
        currentChar.status = 'incorrect';
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