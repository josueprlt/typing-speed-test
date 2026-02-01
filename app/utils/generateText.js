import {nextTick} from "vue";

export default async function (text, words, globalCharIndex) {
    await nextTick();

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