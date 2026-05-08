import {useDifficulty} from "~/composables/useGameData.js";

export default async function () {
    const difficulty = useDifficulty();

    try {
        console.log(difficulty.value)
        const data = await $fetch(`/api/text/${difficulty.value}`);

        if (data) {
            console.log("Texte reçu :", data);
        }
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération du paragraphe :", error);
        return null;
    }
}