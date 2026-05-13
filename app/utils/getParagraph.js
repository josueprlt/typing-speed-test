import {useDifficulty} from "~/composables/useGameData.js";

export default async function () {
    const difficulty = useDifficulty();

    try {
        return await $fetch(`/api/text/${difficulty.value}`);
    } catch (error) {
        console.error("Erreur lors de la récupération du paragraphe :", error);
        return null;
    }
}