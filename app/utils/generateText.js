//import {nextTick} from "vue";

export default async function generateText(text, words, globalCharIndex, index = null) {
    // Only check DOM metrics purely every 15 chars to avoid layout thrashing on every keypress
    if (index && index.value > 0 && index.value % 15 !== 0) return;

    const containerElt = document.querySelector('#containerId');
    const parentElt = document.querySelector('#sectionId');

    if (!containerElt || !parentElt) return;

    const containerRect = containerElt.getBoundingClientRect();
    const parentRect = parentElt.getBoundingClientRect();

    if ((parentRect.bottom - 200) <= containerRect.bottom) {
        const paragraph = await getParagraph();
        text.value += paragraph;
        const wordsArray = generateJson(paragraph, globalCharIndex);
        words.value = words.value.concat(wordsArray);
    }
}