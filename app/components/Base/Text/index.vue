<template>
    <section class="flex flex-wrap gap-x-2 gap-y-1 mt-[32px] text-[32px]">
        <span v-for="(word, wIdx) in words" :key="`word-${wIdx}`" class="word">
            <span v-for="charObj in word" :key="`char-${charObj.id}`" :id="`char-${charObj.id}`"
                :class="`${index === charObj.id ? characterStyle.current : ''}`">
                {{ charObj.char }}
            </span>
        </span>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const text = ref("");
const words = ref([]);
let index = ref(0);

const characterStyle = {
    correct: "text-green-500",
    incorrect: "text-red-500",
    current: "underline"
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
    const rawWords = paragraph.match(/[a-zA-Z0-9à-ÿÀ-ß]+(?:[''\-][a-zA-Z0-9à-ÿÀ-ß]+)*|[^a-zA-Z0-9à-ÿÀ-ß\s]/g) || [];

    let globalCharIndex = 0;

    return rawWords.map(word => {
        return word.split('').map(char => {
            return {
                char: char,
                id: globalCharIndex++
            };
        });
    });
}


onMounted(async () => {
    text.value = await generateParagraphs();
    words.value = generateJson(text.value);
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});

function handleKeydown(event) {
    const key = event.key;
    console.log(`Key pressed: ${key}`);

    if (key === 'Shift' || key === 'CapsLock' || key === 'Tab' || key === 'Alt' || key === 'Control' || key === 'Meta') {
        return;
    }

    if (key === text.value[index.value]) {
        console.log(`✅ Matched character: ${text.value[index.value]} at index ${index.value}`);
        index.value++;
    } else {
        console.log(`💥 Mismatched character: expected ${text.value[index.value]}, got ${key}`);
    }
}
</script>