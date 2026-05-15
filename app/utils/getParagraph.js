import {useDifficulty} from "~/composables/useGameData.js";
import texts from "~/data/texts.json";

export default async function () {
    const difficulty = useDifficulty();

    try {
        const paragraph = await $fetch(`/api/text/${difficulty.value}`);
        return paragraph.text;
    } catch (error) {
        console.error("Erreur lors de la récupération du paragraphe :", error);
        return texts[Math.floor(Math.random() * texts.length)];
    }
}